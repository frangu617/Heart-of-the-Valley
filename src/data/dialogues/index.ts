import type { CSSProperties } from "react";
// Main dialogue types and exports
export type DialogueChoice = {
  text: string;
  affectionChange: number;
  moodChange?: number;
  trustChange?: number;
  nextDialogueId?: string;
  condition?: DialogueChoiceCondition;
  scheduleEncounter?: {
    characterName: string;
    location: string;
    eventId: string;
    label?: string;
  }
  setFlags?: GameplayFlag[];
  unlockCharacters?: string[];
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
  condition?: DialogueChoiceCondition;

  //Midground event media
  midgroundImage?: string;
  midgroundVideo?: string;
  midgroundOpacity?: number;
  midgroundBlend?: CSSProperties["mixBlendMode"];
  midgroundFit?: "cover" | "contain";
  midgroundBlurPx?: number;
  midgroundBrightness?: number;
  midgroundScale?: number;
  midgroundWidthPct?: number;
  midgroundHeightPct?: number;
  midgroundPosition2?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  //Foreground event media
  foregroundImage?: string;
  foregroundVideo?: string;
  foregroundPosition?: "center" | "left" | "right";
  foregroundSize?: "full" | "large" | "medium";

  nextDialogueId?: string;
  setFlags?: GameplayFlag[];
  unlockCharacters?: string[];
};

export type Dialogue = {
  id: string;
  lines: DialogueLine[];
  requiresFirstTimeOnly?: boolean;
};

// Import all character dialogues
import { irisDialogues } from "./iris";
import { dawnDialogues } from "./dawn";
import { gwenDialogues } from "./gwen";
import { yumiDialogues } from "./yumi";
import { rubyDialogues } from "./ruby";
import { introDialogue } from "./intro";
import { GameplayFlag } from "@/data/events/types";

// Export intro
export { introDialogue };

// Combine first meetings
// export const firstMeetingDialogues: Record<string, Dialogue> = {
//   // Iris: irisFirstMeeting,
//   // Dawn: dawnFirstMeeting,
//   // Gwen: gwenFirstMeeting,
//   // Yumi: yumiFirstMeeting,
//   // Ruby: rubyFirstMeeting,
// };

// Combine character dialogues
export const characterDialogues: Record<string, Record<string, Dialogue>> = {
  Iris: irisDialogues,
  Dawn: dawnDialogues,
  Gwen: gwenDialogues,
  Yumi: yumiDialogues,
  Ruby: rubyDialogues,
};

// Condition for type of dialogue choices
export type DialogueChoiceCondition = {
  location?: string | string[]; // Only show if at this location
  minAffection?: number; // Only show if girl's affection is at least this
  minTrust?: number;
  minLove?: number;
  minPlayerStat?: {
    stat: "intelligence" | "fitness" | "style" | "money";
    value: number;
  };
  hasItem?: string; // Only show if player has this item
  timeOfDay?: "morning" | "afternoon" | "evening" | "night"; // Only show at certain times
  dayOfWeek?: string; // Only show on certain days
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
