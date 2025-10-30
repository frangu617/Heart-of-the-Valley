// src/data/events/index.ts
import type { CharacterEvent } from "../../lib/game/characterEventSystem";
import { irisEvents } from "./iris";
// Import other character events as you create them
import { dawnEvents } from "@/data/events/dawn";
// import { gwenEvents } from "./gwen";
// import { yumiEvents } from "./yumi";
import { rubyEvents } from "./ruby";

export * from "../../lib/game/characterEventSystem";

// Map character names to their events
export const characterEvents: Record<string, CharacterEvent[]> = {
  Iris: irisEvents,
  Dawn: dawnEvents,
  // Gwen: gwenEvents,
  // Yumi: yumiEvents,
  Ruby: rubyEvents,
};

// Get events for a specific character
export function getCharacterEvents(characterName: string): CharacterEvent[] {
  return characterEvents[characterName] || [];
}
