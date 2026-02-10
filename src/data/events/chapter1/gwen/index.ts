import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { gwenEvent1Events, gwenEvent1Dialogues } from "./event1";
import { gwenEvent2Events, gwenEvent2Dialogues } from "./event2";
import { gwenEvent3Events, gwenEvent3Dialogues } from "./event3";
import { gwenEvent4Events, gwenEvent4Dialogues } from "./event4";
import { gwenEvent5Events, gwenEvent5Dialogues } from "./event5";
import { gwenEvent6Events, gwenEvent6Dialogues } from "./event6";

export const gwenEvents: CharacterEvent[] = [
  ...gwenEvent1Events,
  ...gwenEvent2Events,
  ...gwenEvent3Events,
  ...gwenEvent4Events,
  ...gwenEvent5Events,
  ...gwenEvent6Events,
];

export const gwenStoryDialogues: Record<string, Dialogue> = {
  ...gwenEvent1Dialogues,
  ...gwenEvent2Dialogues,
  ...gwenEvent3Dialogues,
  ...gwenEvent4Dialogues,
  ...gwenEvent5Dialogues,
  ...gwenEvent6Dialogues,
};
