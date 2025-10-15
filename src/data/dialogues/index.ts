// Main dialogue types and exports
export type DialogueChoice = {
  text: string;
  affectionChange: number;
  moodChange?: number;
  trustChange?: number;
  nextDialogueId?: string;
};

export type DialogueLine = {
  speaker: string | null;
  text: string;
  expression?: string;
  imageSlide?: string;
  choices?: DialogueChoice[];
  videoSlide?: string; // e.g. "/video/characters/gwen/club_sex.mp4"
  videoAutoPlay?: boolean; // default true if you want
  videoBoomerang?: boolean; // if true, loop and auto-reverse effect
};

export type Dialogue = {
  id: string;
  lines: DialogueLine[];
  requiresFirstTimeOnly?: boolean;
};

// Import all character dialogues
import { irisDialogues, irisFirstMeeting } from "./iris";
import { dawnDialogues, dawnFirstMeeting } from "./dawn";
import { gwenDialogues, gwenFirstMeeting } from "./gwen";
import { yumiDialogues, yumiFirstMeeting } from "./yumi";
import { rubyDialogues, rubyFirstMeeting } from "./ruby";
import { introDialogue } from "./intro";

// Export intro
export { introDialogue };

// Combine first meetings
export const firstMeetingDialogues: Record<string, Dialogue> = {
  Iris: irisFirstMeeting,
  Dawn: dawnFirstMeeting,
  Gwen: gwenFirstMeeting,
  Yumi: yumiFirstMeeting,
  Ruby: rubyFirstMeeting,
};

// Combine character dialogues
export const characterDialogues: Record<string, Record<string, Dialogue>> = {
  Iris: irisDialogues,
  Dawn: dawnDialogues,
  Gwen: gwenDialogues,
  Yumi: yumiDialogues,
  Ruby: rubyDialogues,
};

// Default dialogue helper
export const getDefaultDialogue = (
  characterName: string,
  actionLabel: string
): Dialogue => {
  return {
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
  };
};
