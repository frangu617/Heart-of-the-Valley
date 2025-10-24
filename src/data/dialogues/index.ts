import type {
  Dialogue,
  // DialogueLine,
  // DialogueChoice,
  // DialogueChoiceCondition,
} from "@/types/dialogue";

import { irisDialogues, irisFirstMeeting } from "./iris";
import { dawnDialogues, dawnFirstMeeting } from "./dawn";
import { gwenDialogues, gwenFirstMeeting } from "./gwen";
import { yumiDialogues, yumiFirstMeeting } from "./yumi";
import { rubyDialogues, rubyFirstMeeting } from "./ruby";
import { introDialogue } from "./intro";

export { introDialogue };

export const firstMeetingDialogues: Record<string, Dialogue> = {
  Iris: irisFirstMeeting,
  Dawn: dawnFirstMeeting,
  Gwen: gwenFirstMeeting,
  Yumi: yumiFirstMeeting,
  Ruby: rubyFirstMeeting,
};

export const characterDialogues: Record<string, Record<string, Dialogue>> = {
  Iris: irisDialogues,
  Dawn: dawnDialogues,
  Gwen: gwenDialogues,
  Yumi: yumiDialogues,
  Ruby: rubyDialogues,
};

export const getDefaultDialogue = (
  characterName: string,
  actionLabel: string
): Dialogue => ({
  id: `${characterName}_${actionLabel}_default`,
  requiresFirstTimeOnly: true,
  lines: [
    {
      speaker: null,
      text: `You ${actionLabel.toLowerCase()} with ${characterName}.`,
    },
    {
      speaker: characterName,
      text: "Thanks for spending time with me!",
      expression: "happy",
    },
  ],
});
