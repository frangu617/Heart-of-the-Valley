import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { dawnCh1Ev1Dialogues } from "./event1";

// Dawn Chapter 1 events
// Note: event1 (First Introduction) is time-triggered and handled in page.tsx,
// not as a location-based CharacterEvent.
export const dawnEvents: CharacterEvent[] = [];

export const dawnStoryDialogues: Record<string, Dialogue> = {
  ...dawnCh1Ev1Dialogues,
};
