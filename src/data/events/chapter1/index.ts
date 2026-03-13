// src/data/events/index.ts
import { CharacterEvent } from "../types";
import { irisEvents } from "./iris";
import { irisEvents as irisEventsChapter2 } from "../chapter2/iris";
import { irisEvents as irisEventsChapter3 } from "../chapter3/iris";
// Import other character events as you create them
import { dawnEvents } from "./dawn";
import { gwenEvents } from "./gwen";
import { yumiEvents } from "./yumi";
import { yumiEvents as yumiEventsChapter2 } from "../chapter2/yumi";
import { rubyEvents } from "./ruby";

export * from "../types";

// Map character names to their events
export const characterEvents: Record<string, CharacterEvent[]> = {
  Iris: [...irisEvents, ...irisEventsChapter2, ...irisEventsChapter3],
  Dawn: dawnEvents,
  Gwen: gwenEvents,
  Yumi: [...yumiEvents, ...yumiEventsChapter2],
  Ruby: rubyEvents,
};

// Get events for a specific character
export function getCharacterEvents(characterName: string): CharacterEvent[] {
  return characterEvents[characterName] || [];
}
