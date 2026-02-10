// src/lib/randomEventSystem.ts
import { RandomEvent, randomEvents } from "@/data/events/chapter1/randomEvents";
import { PlayerStats } from "@/data/characters";
import { DayOfWeek } from "@/data/gameConstants";
import type { GameplayFlag } from "@/data/events/types";

export type RandomEventTriggerResult = {
  triggered: boolean;
  event: RandomEvent | null;
};

/**
 * Check if a random event's conditions are met
 */
function checkRandomEventConditions(
  event: RandomEvent,
  location: string,
  hour: number,
  day: DayOfWeek,
  player: PlayerStats,
  gameplayFlags?: Set<GameplayFlag>
): boolean {
  const { conditions } = event;

  // Check location
  if (!conditions.locations.includes(location)) {
    return false;
  }

  // Check hour range
  if (
    conditions.hourRange &&
    (hour < conditions.hourRange.min || hour >= conditions.hourRange.max)
  ) {
    return false;
  }

  // Check day specific
  if (conditions.daySpecific && !conditions.daySpecific.includes(day)) {
    return false;
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

  return true;
}

/**
 * Calculate luck-based chance (0-100)
 * Can be influenced by player stats like intelligence, style, or fitness
 */
function calculateRandomChance(
  event: RandomEvent,
  player: PlayerStats
): number {
  if (event.probabilityByNeeds) {
    const avg = (player.energy + player.hunger + player.mood) / 3;
    const scaled = (avg / 100) * event.probability;
    return Math.min(100, Math.round(scaled));
  }

  // Add a small luck boost based on player stats
  let boost = 0;

  // Higher intelligence = better luck reading situations
  boost += Math.floor(player.intelligence / 10);
  // Higher style = attracts attention
  boost += Math.floor(player.style / 15);
  // Higher mood = more good things happen
  boost += Math.floor(player.mood / 20);

  return Math.min(100, event.probability + boost);
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
  gameplayFlags?: Set<GameplayFlag>
): RandomEvent | null {
  // Get eligible events for this location
  const eligibleEvents = randomEvents.filter((event) =>
    checkRandomEventConditions(event, location, hour, day, player, gameplayFlags)
  );

  if (eligibleEvents.length === 0) {
    return null;
  }

  // For each eligible event, roll the dice
  for (const event of eligibleEvents) {
    const adjustedChance = calculateRandomChance(event, player);
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
