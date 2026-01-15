// src/data/events/types.ts
import { Dialogue } from "../../dialogues";
// import { GirlStats } from "../characters";

export type GameplayFlag =
  | "hasMetIris"
  | "hasMetDawn"
  | "hasMetGwen"
  | "hasMetYumi"
  | "hasMetRuby"
  | "firstWorkout"
  | "firstTimeWorked"
  | "firstTimeCookedMeal"
  | "firstTimeStudied"
  | "firstDateCompleted"
  | "irisNeedsNewShirt"
  | "irisCoffeeAccepted"
  | "irisCoffeeDeclined"
  | "irisCoffeeMet"
  | "irisDomPath"
  | "irisSubPath";

export type EventConditions = {
  // Minimum stat requirements
  minAffection?: number;
  minLust?: number;
  minTrust?: number;
  minLove?: number;
  minMood?: number;

  // Maximum stat requirements (for specific scenarios)
  maxAffection?: number;
  maxLust?: number;

  // Player requirements
  minPlayerIntelligence?: number;
  minPlayerFitness?: number;
  minPlayerStyle?: number;
  minPlayerMoney?: number;

  // Time requirements
  minHour?: number; // Event only triggers after this hour
  maxHour?: number; // Event only triggers before this hour
  specificDay?: string; // Event only on specific day

  // Location requirements
  requiredLocation?: string;

  // Story requirements
  requiredPreviousEvents?: string[]; // Must have completed these events first
  blockedByEvents?: string[]; // Cannot have completed these events

  // Flag requirements
  requiredFlags?: GameplayFlag[];
  blockedByFlags?: GameplayFlag[];
};

export type CharacterEvent = {
  id: string;
  name: string;
  description: string; // For debugging/admin

  // Requirements to trigger
  conditions: EventConditions;

  // Cooldown in game hours before this event can trigger again
  cooldownHours?: number;

  // Can this event repeat, or is it one-time only?
  repeatable: boolean;

  // Priority (higher priority events check first)
  priority: number;

  // The actual dialogue/content
  dialogue: Dialogue;

  // Optional: Rewards or stat changes after completing event
  rewards?: {
    playerMoney?: number;
    playerStats?: {
      intelligence?: number;
      fitness?: number;
      style?: number;
    };
    setFlags?: GameplayFlag[];
    unlockCharacters?: string[];
  };
};

export type EventHistory = {
  eventId: string;
  lastTriggered: {
    day: string;
    hour: number;
    gameTime: number; // Total game hours elapsed
  };
  timesTriggered: number;
};

export type CharacterEventState = {
  characterName: string;
  eventHistory: EventHistory[];
  lastInteractionTime: number; // Total game hours
};
