import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";
import { irisEvent1Dialogues, irisEvent1Events } from "./event1";

export const irisEvents: CharacterEvent[] = [...irisEvent1Events];

export const irisStoryDialogues: Record<string, Dialogue> = {
  ...irisEvent1Dialogues,
};

