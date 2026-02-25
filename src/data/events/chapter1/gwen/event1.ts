import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Hallway Intro
// Description: Meet Gwen for the first time in the hallway.

const gwenIntroHelpFirst: Dialogue = {
  id: "gwen_intro_help_first",
  lines: [
    { speaker: null, text: "You crouch first, collecting keys and receipts before they slide under the radiator." },
    {
      speaker: "Gwen",
      text: "Wow. Most people just watch the chaos and pretend they were never here.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "You might actually be useful to have across the hall.",
      expression: "happy",
      nextDialogueId: "gwen_intro_after_first",
    },
  ],
};

const gwenIntroPlayfulFirst: Dialogue = {
  id: "gwen_intro_playful_first",
  lines: [
    { speaker: null, text: "You catch one heel before it hits the floor and offer it back with a small grin." },
    {
      speaker: "Gwen",
      text: "Careful. You make that look practiced.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Rough shift, loud night, still standing. I call that a win.",
      expression: "neutral",
      nextDialogueId: "gwen_intro_after_first",
    },
  ],
};

const gwenIntroWatchfulFirst: Dialogue = {
  id: "gwen_intro_watchful_first",
  lines: [
    { speaker: null, text: "You step back and let her gather herself before moving in." },
    {
      speaker: "Gwen",
      text: "Thanks for not crowding me. Not everyone gets that hint.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Quiet neighbors are underrated.",
      expression: "neutral",
      nextDialogueId: "gwen_intro_after_first",
    },
  ],
};

const gwenIntroAfterFirst: Dialogue = {
  id: "gwen_intro_after_first",
  lines: [
    { speaker: "Gwen", text: "I am Gwen, by the way. Down the hall, right side.", expression: "happy" },
    {
      speaker: null,
      text: "Up close, you notice faint glitter at her collarbone, stage makeup not fully scrubbed, and a garment bag zipped tight.",
    },
    {
      speaker: "Gwen",
      text: "If you hear me coming in late, I am not dying. Just weird shifts.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "I try to keep it quiet in the building. Emphasis on try.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "No judgment. Your hours are your business.",
          affectionChange: 2,
          dominanceChange: -1,
          nextDialogueId: "gwen_intro_respectful",
        },
        {
          text: "I am curious, but I can mind my lane.",
          affectionChange: 1,
          lustChange: 1,
          nextDialogueId: "gwen_intro_curious",
        },
        {
          text: "Just keep it quiet after midnight and we are good.",
          affectionChange: 0,
          dominanceChange: 1,
          nextDialogueId: "gwen_intro_boundary",
        },
      ],
    },
  ],
};

const gwenIntroRespectful: Dialogue = {
  id: "gwen_intro_respectful",
  lines: [
    { speaker: "You", text: "No judgment. We are neighbors, not parole officers." },
    {
      speaker: "Gwen",
      text: "That is weirdly refreshing.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Most people start playing detective by day two.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Maybe we will get along just fine.",
      expression: "happy",
    },
  ],
};

const gwenIntroCurious: Dialogue = {
  id: "gwen_intro_curious",
  lines: [
    { speaker: "You", text: "I am curious, but I can mind my lane." },
    {
      speaker: "Gwen",
      text: "Curious is fine. Entitled is where people fail.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Ask me on an easy day and I might answer more than you expect.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Welcome to the building, mystery neighbor.",
      expression: "happy",
    },
  ],
};

const gwenIntroBoundary: Dialogue = {
  id: "gwen_intro_boundary",
  lines: [
    { speaker: "You", text: "Just keep it quiet after midnight and we are good." },
    {
      speaker: "Gwen",
      text: "Fair line. I can work with fair.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "I run loud outside these walls, not in them.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Deal?",
      expression: "neutral",
    },
    { speaker: "You", text: "Deal." },
  ],
};

export const gwenEvent1Dialogues: Record<string, Dialogue> = {
  gwen_intro_help_first: gwenIntroHelpFirst,
  gwen_intro_playful_first: gwenIntroPlayfulFirst,
  gwen_intro_watchful_first: gwenIntroWatchfulFirst,
  gwen_intro_after_first: gwenIntroAfterFirst,
  gwen_intro_respectful: gwenIntroRespectful,
  gwen_intro_curious: gwenIntroCurious,
  gwen_intro_boundary: gwenIntroBoundary,
};

export const gwenEvent1Events: CharacterEvent[] = [
  {
    id: "gwen_hallway_intro_event",
    name: "Hallway Intro",
    description: "Meet Gwen for the first time in the hallway.",
    quest: {
      title: "Meet the Neighbor",
      description:
        "Check the hallway after you've met Iris, Yumi, and Ruby.",
    },
    priority: 240,
    repeatable: false,
    conditions: {
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["hasMetIris", "hasMetYumi", "hasMetRuby"],
    },
    dialogue: {
      id: "gwen_hallway_intro_event",
      lines: [
        {
          speaker: null,
          text: "You push into the hallway and nearly collide with a woman balancing a tote bag, a garment bag, and a shoe box at the same time.",
        },
        {
          speaker: "Gwen",
          text: "Whoa, hey! Sorry. That was almost a full hallway wipeout.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "One heel drops out of the box, her keys slip, and everything starts sliding in different directions.",
        },
        {
          speaker: "Gwen",
          text: "Oh no. Not like this. First impression disaster.",
          expression: "surprised",
        },
        {
          speaker: "You",
          text: "How do you handle it?",
          choices: [
            {
              text: "Step in and help her gather the mess.",
              affectionChange: 2,
              dominanceChange: 1,
              nextDialogueId: "gwen_intro_help_first",
            },
            {
              text: "Hand her the heel with a grin. Rough shift?",
              affectionChange: 1,
              lustChange: 1,
              nextDialogueId: "gwen_intro_playful_first",
            },
            {
              text: "Give her space and let her reset.",
              affectionChange: 0,
              nextDialogueId: "gwen_intro_watchful_first",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetGwen", "gwenIntroDone"],
      unlockCharacters: ["Gwen"],
    },
  },
];
