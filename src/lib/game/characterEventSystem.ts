// lib/game/characterEventSystem.ts
/**
 * Character-specific event system built on top of generic event system
 * Eliminates redundancy while maintaining all game-specific functionality
 */

import {
  BaseEvent,
  EventContext,
  EventManager,
  createEventFactory,
} from "../core/eventSystem";
import { ConditionalRule, ConditionHelpers } from "../utils/conditionChecker";
import type { GameplayFlag } from "../../data/events/types";

// Game-specific types (reusing canonical flags from data types)

export interface PlayerStats {
  name: string;
  energy: number;
  mood: number;
  hunger: number;
  fitness: number;
  intelligence: number;
  style: number;
  money: number;
  inventory: string[];
}

export interface GirlStats {
  affection: number;
  lust: number;
  mood: number;
  trust: number;
  love: number;
}

export interface Girl {
  name: string;
  stats: GirlStats;
  location: string;
  relationship: "Single" | "DatingMC" | "DatingJohn" | "DatingRick";
  personality: string;
}

export interface Dialogue {
  id: string;
  lines: any[]; // Simplified for now
  requiresFirstTimeOnly?: boolean;
}

// Character event-specific types
export interface CharacterEventRewards {
  playerMoney?: number;
  playerStats?: Partial<Omit<PlayerStats, "name" | "inventory">>;
  girlStats?: Partial<GirlStats>;
  setFlags?: GameplayFlag[];
  unlockCharacters?: string[];
}

export interface CharacterEvent
  extends BaseEvent<CharacterEventContext, CharacterEventRewards> {
  dialogue: Dialogue;
  characterName?: string; // The character this event belongs to
}

export interface CharacterEventContext extends EventContext {
  girl: Girl;
  player: PlayerStats;
  currentLocation: string;
  day: string;
  hour: number;
  completedEvents: string[];
  flags: Set<GameplayFlag>;
}

/**
 * Character Event Manager with game-specific logic
 */
export class CharacterEventManager extends EventManager<
  CharacterEvent,
  CharacterEventContext
> {
  /**
   * Find triggered event for a specific character
   */
  findCharacterEvent(
    characterName: string,
    context: CharacterEventContext
  ): CharacterEvent | null {
    return this.findTriggeredEvent(
      context,
      (event) => event.characterName === characterName
    );
  }

  /**
   * Get all events for a character
   */
  getCharacterEvents(characterName: string): CharacterEvent[] {
    return this.getAllEvents().filter((e) => e.characterName === characterName);
  }

  /**
   * Get events by multiple characters
   */
  getEventsByCharacters(
    characterNames: string[]
  ): Record<string, CharacterEvent[]> {
    const result: Record<string, CharacterEvent[]> = {};

    for (const name of characterNames) {
      result[name] = this.getCharacterEvents(name);
    }

    return result;
  }
}

/**
 * Helper builders for common character event conditions
 */
export const CharacterEventConditions = {
  /**
   * Minimum girl stat requirements
   */
  minGirlStats(
    stats: Partial<GirlStats>
  ): ConditionalRule<CharacterEventContext> {
    const conditions = [];
    if (stats.affection !== undefined) {
      conditions.push(
        ConditionHelpers.minStat("girl.stats.affection", stats.affection)
      );
    }
    if (stats.lust !== undefined) {
      conditions.push(ConditionHelpers.minStat("girl.stats.lust", stats.lust));
    }
    if (stats.trust !== undefined) {
      conditions.push(
        ConditionHelpers.minStat("girl.stats.trust", stats.trust)
      );
    }
    if (stats.love !== undefined) {
      conditions.push(ConditionHelpers.minStat("girl.stats.love", stats.love));
    }
    if (stats.mood !== undefined) {
      conditions.push(ConditionHelpers.minStat("girl.stats.mood", stats.mood));
    }
    return { conditions };
  },

  /**
   * Maximum girl stat requirements
   */
  maxGirlStats(
    stats: Partial<GirlStats>
  ): ConditionalRule<CharacterEventContext> {
    const conditions = [];
    if (stats.affection !== undefined) {
      conditions.push(
        ConditionHelpers.maxStat("girl.stats.affection", stats.affection)
      );
    }
    if (stats.lust !== undefined) {
      conditions.push(ConditionHelpers.maxStat("girl.stats.lust", stats.lust));
    }
    return { conditions };
  },

  /**
   * Minimum player stat requirements
   */
  minPlayerStats(
    stats: Partial<PlayerStats>
  ): ConditionalRule<CharacterEventContext> {
    const conditions = [];
    if (stats.intelligence !== undefined) {
      conditions.push(
        ConditionHelpers.minStat("player.intelligence", stats.intelligence)
      );
    }
    if (stats.fitness !== undefined) {
      conditions.push(
        ConditionHelpers.minStat("player.fitness", stats.fitness)
      );
    }
    if (stats.style !== undefined) {
      conditions.push(ConditionHelpers.minStat("player.style", stats.style));
    }
    if (stats.money !== undefined) {
      conditions.push(ConditionHelpers.minStat("player.money", stats.money));
    }
    return { conditions };
  },

  /**
   * Time range condition
   */
  timeRange(
    minHour: number,
    maxHour: number
  ): ConditionalRule<CharacterEventContext> {
    return ConditionHelpers.timeRange(minHour, maxHour);
  },

  /**
   * Location condition
   */
  atLocation(
    location: string | string[]
  ): ConditionalRule<CharacterEventContext> {
    return { conditions: [ConditionHelpers.inLocation(location)] };
  },

  /**
   * Required flags
   */
  hasFlags(...flags: GameplayFlag[]): ConditionalRule<CharacterEventContext> {
    return {
      conditions: flags.map((flag) => ConditionHelpers.hasFlag([], flag)),
    };
  },

  /**
   * Blocked by flags
   */
  blockedByFlags(
    ...flags: GameplayFlag[]
  ): ConditionalRule<CharacterEventContext> {
    return {
      noneOf: flags.map((flag) => ({
        conditions: [ConditionHelpers.hasFlag([], flag)],
      })),
    };
  },

  /**
   * Required previous events
   */
  afterEvents(...eventIds: string[]): ConditionalRule<CharacterEventContext> {
    return {
      conditions: eventIds.map((id) => ConditionHelpers.hasCompletedEvent(id)),
    };
  },

  /**
   * Blocked by events
   */
  beforeEvents(...eventIds: string[]): ConditionalRule<CharacterEventContext> {
    return {
      conditions: eventIds.map((id) =>
        ConditionHelpers.hasNotCompletedEvent(id)
      ),
    };
  },

  /**
   * First meeting pattern (common across all characters)
   */
  firstMeeting(
    location: string,
    requiredFlags: GameplayFlag[] = []
  ): ConditionalRule<CharacterEventContext> {
    return {
      allOf: [
        this.atLocation(location),
        this.timeRange(0, 24),
        this.minGirlStats({ affection: 0, trust: 0 }),
        ...(requiredFlags.length > 0 ? [this.hasFlags(...requiredFlags)] : []),
      ],
    };
  },

/** 
 * Confession event pattern
 * @param location - The location of the event
 * @param requiredFlags - The flags that are required for the event
 * @param minAffection - The minimum affection required for the event
 * @param minTrust - The minimum trust required for the event
 * @param minLove - The minimum love required for the event
 * @param requiredPreviousEvents - The events that are required to be completed before this event
 * @returns The conditional rule for the event
*/
  confession(
    location: string,
    requiredFlags: GameplayFlag[] = [],
    minAffection: number,
    minTrust: number,
    minLove: number,
    requiredPreviousEvents?: string[]
  ): ConditionalRule<CharacterEventContext> {
    return {
      allOf: [
        this.atLocation(location),
        this.timeRange(0, 24),
        this.minGirlStats({
          affection: minAffection,
          trust: minTrust,
          love: minLove,
        }),
        ...(requiredFlags.length > 0 ? [this.hasFlags(...requiredFlags)] : []),
        ...(requiredPreviousEvents
          ? [this.afterEvents(...requiredPreviousEvents)]
          : []),
      ],
    };
  },

  /**
   * Jealous Event pattern
   * @param location - The location of the event
   * @param requiredFlags - The flags that are required for the event
   * @param minAffection - The minimum affection required for the event
   * @param minTrust - The minimum trust required for the event
   * @param minLove - The minimum love required for the event
   * @param requiredPreviousEvents - The events that are required to be completed before this event
   * @returns The conditional rule for the event
   */
  jealousEvent(
    location: string,
    requiredFlags: GameplayFlag[] = [],
    minAffection: number,
    maxTrust: number,
    minLove: number,
    requiredPreviousEvents?: string[],
  ): ConditionalRule<CharacterEventContext> {
    return {
      allOf: [
        this.atLocation(location),
        this.hasFlags(...requiredFlags),
        this.timeRange(0, 24),
        this.minGirlStats({ affection: minAffection, trust: maxTrust }),
      ],
    };
  },
  /**
   * Repeatable encounter pattern
   */
  repeatableEncounter(
    location: string,
    minAffection: number,
    minTrust: number,
    minHour = 6,
    maxHour = 20
  ): ConditionalRule<CharacterEventContext> {
    return {
      allOf: [
        this.atLocation(location),
        this.timeRange(minHour, maxHour),
        this.minGirlStats({ affection: minAffection, trust: minTrust }),
      ],
    };
  },
};

/**
 * Factory for creating character events with less boilerplate
 */
export const createCharacterEvent = createEventFactory<CharacterEvent>({
  priority: 50,
  repeatable: false,
  tags: ["character"],
  dialogue: { id: "", lines: [] },
});

/**
 * Batch create multiple character events
 */
export function createCharacterEvents(
  characterName: string,
  eventConfigs: Array<
    Partial<CharacterEvent> & Pick<CharacterEvent, "id" | "name" | "dialogue">
  >
): CharacterEvent[] {
  return eventConfigs.map((config) =>
    createCharacterEvent({
      ...config,
      characterName,
      tags: [...(config.tags || []), characterName.toLowerCase()],
    })
  );
}

/**
 * Calculate game time in hours
 */
export function calculateGameTime(
  days: string[],
  currentDay: string,
  hour: number
): number {
  const dayIndex = days.indexOf(currentDay);
  return (dayIndex >= 0 ? dayIndex : 0) * 24 + hour;
}
