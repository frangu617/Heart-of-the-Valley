// src/data/events/chapter2/index.ts
import { CharacterEvent } from "../types";
import { irisEvents } from "./iris";
import { gwenEvents } from "./gwen";
import { yumiEvents } from "./yumi";
import { rubyEvents } from "./ruby";

export * from "../types";

// Map character names to their events for Chapter 2
export const characterEventsChapter2: Record<string, CharacterEvent[]> = {
  Iris: irisEvents,
  Dawn: [], // Assuming Dawn might have events in Chapter 2
  Gwen: gwenEvents,
  Yumi: yumiEvents,
  Ruby: rubyEvents,
};

// Get events for a specific character for Chapter 2
export function getCharacterEventsChapter2(characterName: string): CharacterEvent[] {
  return characterEventsChapter2[characterName] || [];
}
