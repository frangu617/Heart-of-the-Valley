import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Quick Apology
// Description: Gwen stops by after the door mixup.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: gwen_event_3_apology  (Hallway, 8-20h, gwenDoorMixupDone)
//   [inline choices — no nextDialogueId, stat changes only]
//   └─ second choice set:
//        ├─ ["Be warm. You are good."]     → gwen_event_3_apology_warm     END [gwenApologyDone]
//        ├─ ["Be curious. Rough shift?"]   → gwen_event_3_apology_curious  END [gwenApologyDone]
//        └─ ["Set a boundary. Not again."] → gwen_event_3_apology_firm     END [gwenApologyDone]
// Rewards: gwenApologyDone
// ─────────────────────────────────────────────────────────────────────────────

// FROM: gwen_event_3_apology → ["Be warm. You are good."]
const gwenEvent3ApologyWarm: Dialogue = {
  id: "gwen_event_3_apology_warm",
  lines: [
    { speaker: "You", text: "You're good. Rough nights happen." },
    {
      speaker: "Gwen",
      text: "Thanks. I hate messy exits.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "You handled it better than most people would.",
      expression: "neutral",
    },
    { speaker: "You", text: "Call it even." },
    { speaker: "Gwen", text: "Even, then.", expression: "happy" },
    {
      speaker: null,
      text: "She lifts her coffee like a peace offering, shoulders finally relaxing.",
    },
    {
      speaker: "You",
      text: "How do you leave the reset?",
      choices: [
        {
          text: "Offer to grab real coffee later.",
          affectionChange: 2,
          dominanceChange: -1,
        },
        {
          text: "Check in. You looked rattled last night.",
          affectionChange: 1,
          moodChange: 1,
        },
        {
          text: "Tease lightly. We survived the door boss fight.",
          affectionChange: 0,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "I can work with that. Thanks for not making it weird.",
      expression: "happy",
    },
  ],
};

// FROM: gwen_event_3_apology → ["Be curious. Rough shift?"]
const gwenEvent3ApologyCurious: Dialogue = {
  id: "gwen_event_3_apology_curious",
  lines: [
    { speaker: "You", text: "We're fine. But that looked like one hell of a shift." },
    {
      speaker: "Gwen",
      text: "It was loud, long, and profitable.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Music, lights, too many people pretending they know me.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Maybe one day you get the full story. Not in the hallway, though.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you follow that?",
      choices: [
        {
          text: "What part of it do you actually enjoy?",
          affectionChange: 1,
          lustChange: 1,
        },
        {
          text: "What part drains you most?",
          affectionChange: 1,
          moodChange: 1,
        },
        {
          text: "No pressure. You can tell me when you want.",
          affectionChange: 2,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "Good answer. Curiosity I can handle. Interrogation, not so much.",
      expression: "happy",
    },
  ],
};

// FROM: gwen_event_3_apology → ["Set a boundary. Not again."]
const gwenEvent3ApologyFirm: Dialogue = {
  id: "gwen_event_3_apology_firm",
  lines: [
    { speaker: "You", text: "We are good. But do not hit my door like that again." },
    {
      speaker: "Gwen",
      text: "Fair boundary.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "I keep my chaos on my side of the hall from now on.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How firm do you stay?",
      choices: [
        {
          text: "Keep it strict. No more late-night knocks.",
          affectionChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Soften it. Boundaries, not hostility.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Set process. Text before you knock next time.",
          affectionChange: 1,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "Fair. I can do rules when the rules make sense.",
      expression: "neutral",
    },
  ],
};

export const gwenEvent3Dialogues: Record<string, Dialogue> = {
  gwen_event_3_apology_warm: gwenEvent3ApologyWarm,
  gwen_event_3_apology_curious: gwenEvent3ApologyCurious,
  gwen_event_3_apology_firm: gwenEvent3ApologyFirm,
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
      minAffection: 0,
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
          text: "Gwen stands there in sunglasses, hair up, a coffee in hand, a trace of glitter still at her temple.",
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
          text: "How do you hold this moment?",
          choices: [
            {
              text: "Step into the hallway so she doesn't feel cornered.",
              affectionChange: 1,
              dominanceChange: -1,
            },
            {
              text: "Stay in the doorway and keep it brief.",
              affectionChange: 0,
              dominanceChange: 1,
            },
            {
              text: "Offer five minutes and fresh coffee inside.",
              affectionChange: 1,
              lustChange: 1,
            },
          ],
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Be warm. You are good.",
              affectionChange: 2,
              dominanceChange: -1,
              nextDialogueId: "gwen_event_3_apology_warm",
            },
            {
              text: "Be curious. Rough shift?",
              affectionChange: 1,
              lustChange: 1,
              nextDialogueId: "gwen_event_3_apology_curious",
            },
            {
              text: "Set a boundary. Not again.",
              affectionChange: 0,
              dominanceChange: 1,
              nextDialogueId: "gwen_event_3_apology_firm",
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
