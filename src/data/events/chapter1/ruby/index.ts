import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { rubyEvent1Events, rubyEvent1Dialogues } from "./event1";
import { rubyEvent2Events, rubyEvent2Dialogues } from "./event2";
import { rubyEvent3Events, rubyEvent3Dialogues } from "./event3";
import { rubyEvent4Events, rubyEvent4Dialogues } from "./event4";
import { rubyEvent5Events, rubyEvent5Dialogues } from "./event5";

export const rubyEvents: CharacterEvent[] = [
  ...rubyEvent1Events,
  ...rubyEvent2Events,
  ...rubyEvent3Events,
  ...rubyEvent4Events,
  ...rubyEvent5Events,
];

export const rubyStoryDialogues: Record<string, Dialogue> = {
  ...rubyEvent1Dialogues,
  ...rubyEvent2Dialogues,
  ...rubyEvent3Dialogues,
  ...rubyEvent4Dialogues,
  ...rubyEvent5Dialogues,
};
