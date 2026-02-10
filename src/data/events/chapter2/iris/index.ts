import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { irisEvent1Events, irisEvent1Dialogues } from "./event1";
import { irisEvent2Events, irisEvent2Dialogues } from "./event2";
import { irisEvent3Events, irisEvent3Dialogues } from "./event3";

export const irisEvents: CharacterEvent[] = [
  ...irisEvent1Events,
  ...irisEvent2Events,
  ...irisEvent3Events,
];

export const irisStoryDialogues: Record<string, Dialogue> = {
  ...irisEvent1Dialogues,
  ...irisEvent2Dialogues,
  ...irisEvent3Dialogues,
};
