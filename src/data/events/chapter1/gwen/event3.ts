import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Quick Apology
// Description: Gwen stops by after the door mixup.

const gwenEvent3ApologySupportive: Dialogue = {
  id: "gwen_event_3_apology_supportive",
  lines: [
    { speaker: "You", text: "You're good. It was a weird night." },
    {
      speaker: "Gwen",
      text: "Good. I don't like owing people.",
      expression: "neutral",
    },
    { speaker: "You", text: "Call it even." },
    { speaker: "Gwen", text: "It is now.", expression: "happy" },
  ],
};

const gwenEvent3ApologyIrritated: Dialogue = {
  id: "gwen_event_3_apology_irritated",
  lines: [
    { speaker: "You", text: "You woke me up. Don't do that again." },
    {
      speaker: "Gwen",
      text: "Noted.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Won't happen.",
      expression: "neutral",
    },
  ],
};

export const gwenEvent3Dialogues: Record<string, Dialogue> = {
  gwen_event_3_apology_supportive: gwenEvent3ApologySupportive,
  gwen_event_3_apology_irritated: gwenEvent3ApologyIrritated,
};

export const gwenEvent3Events: CharacterEvent[] = [
  {
    id: "gwen_event_3_apology",
    name: "Quick Apology",
    description: "Gwen stops by after the door mixup.",
    quest: {
      title: "Gwen's Apology",
      description: "Check the hallway during the day (8 AM–8 PM).",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minHour: 8,
      maxHour: 20,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenDoorMixupDone"],
    },
    dialogue: {
      id: "gwen_event_3_apology",
      lines: [
        {
          speaker: null,
          text: "A soft knock in the afternoon pulls you to the door.",
        },
        {
          speaker: null,
          text: "Gwen stands there in sunglasses, hair up, a coffee in hand.",
        },
        {
          speaker: "Gwen",
          text: "About the other night. I woke you up.",
          expression: "neutral",
        },
        { speaker: "You", text: "You were trying to open my door." },
        {
          speaker: "Gwen",
          text: "Yeah. That one's on me.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "Just making sure we're good.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "We're good.",
              affectionChange: 1,
              nextDialogueId: "gwen_event_3_apology_supportive",
            },
            {
              text: "Don't let it happen again.",
              affectionChange: -1,
              nextDialogueId: "gwen_event_3_apology_irritated",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwenApologyDone"],
    },
  },
];
