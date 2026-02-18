// src/lib/randomEventSystem.ts
import { RandomEvent, randomEvents } from "@/data/events/chapter1/randomEvents";
import { PlayerStats, type Girl } from "@/data/characters";
import { DayOfWeek } from "@/data/gameConstants";
import type { GameplayFlag } from "@/data/events/types";

export type RandomEventTriggerResult = {
  triggered: boolean;
  event: RandomEvent | null;
};

type CheckRandomEventConditionOptions = {
  ignoreLocation?: boolean;
  ignoreHourRange?: boolean;
  ignoreRequiredCharacters?: boolean;
};

type CheckRandomEventOptions = {
  includeStoryRelated?: boolean;
  includeNonStoryRelated?: boolean;
};

type RollDailyNonStoryRandomEventsOptions = {
  day: DayOfWeek;
  player: PlayerStats;
  gameplayFlags?: Set<GameplayFlag>;
  girls?: Girl[];
  cooldownByEventId?: Record<string, number>;
  currentDayCount: number;
  maxEventsPerDay?: number;
  cooldownDays?: number;
};

const DEFAULT_NON_STORY_MAX_EVENTS_PER_DAY = 2;
const DEFAULT_NON_STORY_COOLDOWN_DAYS = 7;

export function isStoryRelatedRandomEvent(event: RandomEvent): boolean {
  const { requiredFlags, blockedFlags } = event.conditions;
  return Boolean(
    (requiredFlags && requiredFlags.length > 0) ||
      (blockedFlags && blockedFlags.length > 0)
  );
}

/**
 * Check if a random event's conditions are met
 */
function checkRandomEventConditions(
  event: RandomEvent,
  location: string,
  hour: number,
  day: DayOfWeek,
  player: PlayerStats,
  gameplayFlags?: Set<GameplayFlag>,
  girls?: Girl[],
  options: CheckRandomEventConditionOptions = {}
): boolean {
  const { conditions } = event;
  const {
    ignoreLocation = false,
    ignoreHourRange = false,
    ignoreRequiredCharacters = false,
  } = options;

  // Check location
  if (!ignoreLocation && !conditions.locations.includes(location)) {
    return false;
  }

  // Check hour range
  if (
    !ignoreHourRange &&
    conditions.hourRange &&
    (hour < conditions.hourRange.min || hour >= conditions.hourRange.max)
  ) {
    return false;
  }

  // Check day specific
  if (conditions.daySpecific && !conditions.daySpecific.includes(day)) {
    return false;
  }

  if (!ignoreRequiredCharacters && conditions.requiredCharactersPresent?.length) {
    if (!girls) return false;
    for (const characterName of conditions.requiredCharactersPresent) {
      const character = girls.find((girl) => girl.name === characterName);
      if (!character || character.location !== location) {
        return false;
      }
    }
  }

  if (conditions.requiredFlags && conditions.requiredFlags.length > 0) {
    if (!gameplayFlags) return false;
    for (const flag of conditions.requiredFlags) {
      if (!gameplayFlags.has(flag)) return false;
    }
  }

  if (conditions.blockedFlags && conditions.blockedFlags.length > 0) {
    if (gameplayFlags) {
      for (const flag of conditions.blockedFlags) {
        if (gameplayFlags.has(flag)) return false;
      }
    }
  }

  // Check player stat requirements (min)
  if (conditions.minPlayerStat) {
    const statValue = player[conditions.minPlayerStat.stat];
    if (
      typeof statValue === "number" &&
      statValue < conditions.minPlayerStat.value
    ) {
      return false;
    }
  }

  // Check player stat requirements (max)
  if (conditions.maxPlayerStat) {
    const statValue = player[conditions.maxPlayerStat.stat];
    if (
      typeof statValue === "number" &&
      statValue > conditions.maxPlayerStat.value
    ) {
      return false;
    }
  }

  if (conditions.minGirlStat) {
    if (!girls) return false;
    const girl = girls.find((g) => g.name === conditions.minGirlStat?.girlName);
    const stat = girl?.stats[conditions.minGirlStat.stat];
    if (typeof stat !== "number" || stat < conditions.minGirlStat.value) {
      return false;
    }
  }

  if (conditions.minGirlStats?.length) {
    if (!girls) return false;
    for (const requirement of conditions.minGirlStats) {
      const girl = girls.find((g) => g.name === requirement.girlName);
      const stat = girl?.stats[requirement.stat];
      if (typeof stat !== "number" || stat < requirement.value) {
        return false;
      }
    }
  }

  if (conditions.maxGirlStat) {
    if (!girls) return false;
    const girl = girls.find((g) => g.name === conditions.maxGirlStat?.girlName);
    const stat = girl?.stats[conditions.maxGirlStat.stat];
    if (typeof stat !== "number" || stat > conditions.maxGirlStat.value) {
      return false;
    }
  }

  if (conditions.maxGirlStats?.length) {
    if (!girls) return false;
    for (const requirement of conditions.maxGirlStats) {
      const girl = girls.find((g) => g.name === requirement.girlName);
      const stat = girl?.stats[requirement.stat];
      if (typeof stat !== "number" || stat > requirement.value) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Calculate luck-based chance (0-100)
 * Can be influenced by player stats like intelligence, style, or fitness
 */
function calculateRandomChance(
  event: RandomEvent,
  player: PlayerStats,
  girls?: Girl[]
): number {
  let chance = event.probability;

  if (event.probabilityByNeeds) {
    const avg = (player.energy + player.hunger + player.mood) / 3;
    const scaled = (avg / 100) * event.probability;
    chance = scaled;
  } else {
    // Add a small luck boost based on player stats
    let boost = 0;

    // Higher intelligence = better luck reading situations
    boost += Math.floor(player.intelligence / 10);
    // Higher style = attracts attention
    boost += Math.floor(player.style / 15);
    // Higher mood = more good things happen
    boost += Math.floor(player.mood / 20);
    chance += boost;
  }

  if (event.probabilityByGirlStat && girls) {
    const { girlName, stat, multiplier, min, max } = event.probabilityByGirlStat;
    const girl = girls.find((g) => g.name === girlName);
    const statValue = girl?.stats[stat];
    if (typeof statValue === "number") {
      chance += statValue * multiplier;
      if (min !== undefined) {
        chance = Math.max(min, chance);
      }
      if (max !== undefined) {
        chance = Math.min(max, chance);
      }
    }
  }

  return Math.min(100, Math.max(0, Math.round(chance)));
}

/**
 * Try to trigger a random event for the current location
 * Returns the event that triggered, or null
 */
export function checkRandomEvent(
  location: string,
  hour: number,
  day: DayOfWeek,
  player: PlayerStats,
  gameplayFlags?: Set<GameplayFlag>,
  girls?: Girl[],
  eventTriggerCountsToday?: Record<string, number>,
  options: CheckRandomEventOptions = {}
): RandomEvent | null {
  const {
    includeStoryRelated = true,
    includeNonStoryRelated = true,
  } = options;

  // Get eligible events for this location
  const eligibleEvents = randomEvents.filter((event) => {
    const storyRelated = isStoryRelatedRandomEvent(event);
    if (storyRelated && !includeStoryRelated) {
      return false;
    }
    if (!storyRelated && !includeNonStoryRelated) {
      return false;
    }

    return checkRandomEventConditions(
      event,
      location,
      hour,
      day,
      player,
      gameplayFlags,
      girls
    );
  });

  if (eligibleEvents.length === 0) {
    return null;
  }

  // For each eligible event, roll the dice
  for (const event of eligibleEvents) {
    const triggerCount = eventTriggerCountsToday?.[event.id] ?? 0;
    if (
      event.maxTriggersPerDay !== undefined &&
      triggerCount >= event.maxTriggersPerDay
    ) {
      continue;
    }

    const adjustedChance = calculateRandomChance(event, player, girls);
    const roll = Math.random() * 100;

    if (roll < adjustedChance) {
      return event;
    }
  }

  return null;
}

/**
 * Get all possible random events for a location (for debugging/UI)
 */
export function getRandomEventsForLocation(location: string): RandomEvent[] {
  return randomEvents.filter((event) =>
    event.conditions.locations.includes(location)
  );
}

export function getScheduledNonStoryRandomEventForContext(
  eventIds: string[],
  location: string,
  hour: number,
  day: DayOfWeek,
  player: PlayerStats,
  gameplayFlags?: Set<GameplayFlag>,
  girls?: Girl[]
): RandomEvent | null {
  for (const eventId of eventIds) {
    const event = randomEvents.find((candidate) => candidate.id === eventId);
    if (!event) continue;
    if (isStoryRelatedRandomEvent(event)) continue;

    if (
      checkRandomEventConditions(
        event,
        location,
        hour,
        day,
        player,
        gameplayFlags,
        girls
      )
    ) {
      return event;
    }
  }

  return null;
}

export function rollDailyNonStoryRandomEventIds({
  day,
  player,
  gameplayFlags,
  girls,
  cooldownByEventId = {},
  currentDayCount,
  maxEventsPerDay = DEFAULT_NON_STORY_MAX_EVENTS_PER_DAY,
  cooldownDays = DEFAULT_NON_STORY_COOLDOWN_DAYS,
}: RollDailyNonStoryRandomEventsOptions): string[] {
  const candidates = randomEvents.filter((event) => {
    if (isStoryRelatedRandomEvent(event)) {
      return false;
    }

    const lastTriggeredDay = cooldownByEventId[event.id];
    if (
      typeof lastTriggeredDay === "number" &&
      currentDayCount - lastTriggeredDay < cooldownDays
    ) {
      return false;
    }

    return checkRandomEventConditions(
      event,
      event.conditions.locations[0] ?? "",
      12,
      day,
      player,
      gameplayFlags,
      girls,
      {
        ignoreLocation: true,
        ignoreHourRange: true,
        ignoreRequiredCharacters: true,
      }
    );
  });

  if (candidates.length === 0 || maxEventsPerDay <= 0) {
    return [];
  }

  // Shuffle to avoid deterministic bias toward earlier array entries.
  const shuffledCandidates = [...candidates].sort(() => Math.random() - 0.5);
  const selectedEventIds: string[] = [];

  for (const event of shuffledCandidates) {
    if (selectedEventIds.length >= maxEventsPerDay) {
      break;
    }

    const adjustedChance = calculateRandomChance(event, player, girls);
    const roll = Math.random() * 100;
    if (roll < adjustedChance) {
      selectedEventIds.push(event.id);
    }
  }

  return selectedEventIds;
}
