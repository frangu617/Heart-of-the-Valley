import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { yumiEvent1Events, yumiEvent1Dialogues } from "./event1";
import { yumiEvent2Events, yumiEvent2Dialogues } from "./event2";
import { yumiEvent3Events, yumiEvent3Dialogues } from "./event3";
import { yumiEvent4Events, yumiEvent4Dialogues } from "./event4";
import { yumiEvent5Events, yumiEvent5Dialogues } from "./event5";

export const yumiEvents: CharacterEvent[] = [
  ...yumiEvent1Events,
  ...yumiEvent2Events,
  ...yumiEvent3Events,
  ...yumiEvent4Events,
  ...yumiEvent5Events,
];

export const yumiStoryDialogues: Record<string, Dialogue> = {
  ...yumiEvent1Dialogues,
  ...yumiEvent2Dialogues,
  ...yumiEvent3Dialogues,
  ...yumiEvent4Dialogues,
  ...yumiEvent5Dialogues,
};
