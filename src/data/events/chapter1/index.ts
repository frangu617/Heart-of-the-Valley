// src/data/events/index.ts
import { CharacterEvent } from "../types";
import { irisEvents } from "./iris";
import { irisEvents as irisEventsChapter2 } from "../chapter2/iris";
// Import other character events as you create them
import { gwenEvents } from "./gwen";
import { yumiEvents } from "./yumi";
import { yumiEvents as yumiEventsChapter2 } from "../chapter2/yumi";
import { rubyEvents } from "./ruby";

export * from "../types";

// Map character names to their events
export const characterEvents: Record<string, CharacterEvent[]> = {
  Iris: [...irisEvents, ...irisEventsChapter2],
  Dawn: [],
  Gwen: gwenEvents,
  Yumi: [...yumiEvents, ...yumiEventsChapter2],
  Ruby: rubyEvents,
};

// Get events for a specific character
export function getCharacterEvents(characterName: string): CharacterEvent[] {
  return characterEvents[characterName] || [];
}
