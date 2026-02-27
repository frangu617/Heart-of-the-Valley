import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { irisEvent1Dialogues, irisEvent1Events } from "./event1";
import { irisEvent2Dialogues, irisEvent2Events } from "./event2";

export const irisEvents: CharacterEvent[] = [...irisEvent1Events, ...irisEvent2Events];

export const irisStoryDialogues: Record<string, Dialogue> = {
  ...irisEvent1Dialogues,
  ...irisEvent2Dialogues,
};
