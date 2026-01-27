// src/data/events/index.ts
import { CharacterEvent } from "../types";
import { irisEvents } from "./iris";
// Import other character events as you create them
import { gwenEvents } from "./gwen";
import { yumiEvents } from "./yumi";
import { rubyEvents } from "./ruby";

export * from "../types";

// Map character names to their events
export const characterEvents: Record<string, CharacterEvent[]> = {
  Iris: irisEvents,
  Dawn: [],
  Gwen: gwenEvents,
  Yumi: yumiEvents,
  Ruby: rubyEvents,
};

// Get events for a specific character
export function getCharacterEvents(characterName: string): CharacterEvent[] {
  return characterEvents[characterName] || [];
}
