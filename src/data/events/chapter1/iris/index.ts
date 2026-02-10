import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { irisEvent1Events, irisEvent1Dialogues } from "./event1";
import { irisEvent2Events, irisEvent2Dialogues } from "./event2";
import { irisEvent3Events, irisEvent3Dialogues } from "./event3";
import { irisEvent4Events, irisEvent4Dialogues } from "./event4";
import { irisEvent5Events, irisEvent5Dialogues } from "./event5";
import { irisEvent6Events, irisEvent6Dialogues } from "./event6";

export const irisEvents: CharacterEvent[] = [
  ...irisEvent1Events,
  ...irisEvent2Events,
  ...irisEvent3Events,
  ...irisEvent4Events,
  ...irisEvent5Events,
  ...irisEvent6Events,
];

export const irisStoryDialogues: Record<string, Dialogue> = {
  ...irisEvent1Dialogues,
  ...irisEvent2Dialogues,
  ...irisEvent3Dialogues,
  ...irisEvent4Dialogues,
  ...irisEvent5Dialogues,
  ...irisEvent6Dialogues,
};
