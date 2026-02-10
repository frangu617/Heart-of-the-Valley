import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 5: The Reveal
// Description: The dancer turns out to be Gwen.

const gwenEvent5Discreet: Dialogue = {
  id: "gwen_event_5_discreet",
  lines: [
    { speaker: "You", text: "Your secret's safe." },
    {
      speaker: "Gwen",
      text: "Good. Then listen.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "In here, I'm working. Out there, we're neighbors.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Keep it that clean and we're fine.",
      expression: "annoyed",
    },
    {
      speaker: null,
      text: "She studies you for a beat, then nods.",
      nextDialogueId: "gwen_event_5_after",
    },
  ],
};

const gwenEvent5Lead: Dialogue = {
  id: "gwen_event_5_lead",
  lines: [
    { speaker: "You", text: "Give me the rules." },
    {
      speaker: "Gwen",
      text: "Smart answer. I call the shots.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "In here, I'm working. Out there, we talk if I say so.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She tilts her chin, waiting to see if you flinch.",
      nextDialogueId: "gwen_event_5_after",
    },
  ],
};

const gwenEvent5Blackmail: Dialogue = {
  id: "gwen_event_5_blackmail",
  lines: [
    { speaker: "You", text: "Maybe. Depends what I get out of it." },
    {
      speaker: "Gwen",
      text: "That's what we're doing? Seriously?",
      expression: "annoyed",
    },
    {
      speaker: "Gwen",
      text: "Fine. You want leverage, you got it. But don't push it.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her stare is steady, the smile gone.",
      nextDialogueId: "gwen_event_5_after_blackmail",
    },
  ],
};

const gwenEvent5After: Dialogue = {
  id: "gwen_event_5_after",
  lines: [
    {
      speaker: null,
      text: "Her voice drops, the performer gone.",
    },
    {
      speaker: "Gwen",
      text: "I'm not looking for a savior. I just need discretion.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "If you can do that, maybe we can talk when I'm off the clock.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She taps your chest once, then slips backstage.",
    },
  ],
};

const gwenEvent5AfterBlackmail: Dialogue = {
  id: "gwen_event_5_after_blackmail",
  lines: [
    {
      speaker: "Gwen",
      text: "You keep quiet, we both keep breathing. That's the deal.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She turns to leave, then pauses.",
    },
    {
      speaker: "Gwen",
      text: "Don't make me regret letting you in on this.",
      expression: "neutral",
    },
  ],
};

export const gwenEvent5Dialogues: Record<string, Dialogue> = {
  gwen_event_5_discreet: gwenEvent5Discreet,
  gwen_event_5_lead: gwenEvent5Lead,
  gwen_event_5_blackmail: gwenEvent5Blackmail,
  gwen_event_5_after: gwenEvent5After,
  gwen_event_5_after_blackmail: gwenEvent5AfterBlackmail,
};

export const gwenEvent5Events: CharacterEvent[] = [
  {
    id: "gwen_event_5_reveal",
    name: "The Reveal",
    description: "The dancer turns out to be Gwen.",
    quest: {
      title: "Strip Club Visit",
      description: "Go to the strip club late (8 PM–midnight).",
    },
    priority: 205,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 5,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Strip Club",
      requiredFlags: ["gwenRumorHeard"],
    },
    dialogue: {
      id: "gwen_event_5_reveal",
      lines: [
        {
          speaker: null,
          text: "The Strip Club is all neon and bass, a low thrum in your ribs.",
        },
        {
          speaker: null,
          text: "You take a seat, half-expecting to leave bored. Then she steps on stage.",
        },
        {
          speaker: null,
          text: "The dancer moves like she owns the light. And then you recognize her.",
        },
        {
          speaker: null,
          text: "After the set, she appears at your table in a robe, makeup still sharp, eyes sharper.",
        },
        { speaker: "Gwen", text: "{playerName}? What are you doing here?", expression: "annoyed" },
        { speaker: "You", text: "I didn't know it was you." },
        {
          speaker: "Gwen",
          text: "Keep your voice down. This is my work.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "Are you going to make this a problem?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Your secret's safe.",
              affectionChange: 2,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_event_5_discreet",
            },
            {
              text: "Give me the rules.",
              affectionChange: 1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_event_5_lead",
            },
            {
              text: "Maybe. Depends what I get out of it.",
              affectionChange: -2,
              setFlags: ["gwenSubPath"],
              nextDialogueId: "gwen_event_5_blackmail",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwenRevealDone"],
    },
  },
];
