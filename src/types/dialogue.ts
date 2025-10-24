import type { MixBlendMode } from "./media";

export type DialogueChoiceCondition = {
    location?: string | string[];  
  minAffection?: number;
  minTrust?: number;
  minLove?: number;
  minPlayerStat?: {
    stat: "intelligence" | "fitness" | "style" | "money";
    value: number;
  };
  hasItem?: string;
  timeOfDay?: "morning" | "afternoon" | "evening" | "night";
  dayOfWeek?: string;
  flag?: string;
};

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
  };
};

export type DialogueLine = {
  speaker: string | null;
  text: string;
  expression?: string;
  imageSlide?: string;
  choices?: DialogueChoice[];
  videoSlide?: string;
  videoAutoPlay?: boolean;
  videoBoomerang?: boolean;
  condition?: DialogueChoiceCondition;

  // Midground event media
  midgroundImage?: string;
  midgroundVideo?: string;
  midgroundOpacity?: number;
  midgroundBlend?: MixBlendMode; // <-- use CSS mix-blend-mode type
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
};

export type Dialogue = {
  id: string;
  lines: DialogueLine[];
  requiresFirstTimeOnly?: boolean;
};
