import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 5: The Reveal
// Description: The dancer turns out to be Gwen.

const gwenEvent5Discreet: Dialogue = {
  id: "gwen_event_5_discreet",
  lines: [
    { speaker: "You", text: "Easy. Your work stays yours." },
    {
      speaker: "Gwen",
      text: "Good. Then listen.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "In here, I am G. In the hallway, I am Gwen.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Keep those lines clean and we are fine.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you reinforce that?",
      choices: [
        {
          text: "Keep your eyes on her face and lower your voice.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Tip, nod, and keep it brief.",
          affectionChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Ask if she wants space tonight.",
          affectionChange: 1,
          lustChange: 0,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "Good. Most people fail this part in under thirty seconds.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She studies your face for a beat, then nods like a contract just got signed.",
      nextDialogueId: "gwen_event_5_after",
    },
  ],
};

const gwenEvent5Lead: Dialogue = {
  id: "gwen_event_5_lead",
  lines: [
    { speaker: "You", text: "Then give me the rules." },
    {
      speaker: "Gwen",
      text: "No scene. No rescue fantasy. No assumptions.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "If I want you closer, I will make that choice.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Outside this club, we decide what this is like adults.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you set from your side?",
      choices: [
        {
          text: "Mutual check-ins after nights like this.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "No public scenes from either of us.",
          affectionChange: 0,
          dominanceChange: 1,
        },
        {
          text: "If either wants more, we say it directly.",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "Good. Structure without control issues. I can work with that.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She tilts her chin, waiting to see if you flinch. You do not.",
      nextDialogueId: "gwen_event_5_after",
    },
  ],
};

const gwenEvent5Casual: Dialogue = {
  id: "gwen_event_5_casual",
  lines: [
    { speaker: "You", text: "Then let's keep this simple. No labels, no pressure." },
    {
      speaker: "Gwen",
      text: "That is better than pretending we are suddenly soulmates.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "If we keep it casual, we still keep it respectful.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "No games. No ownership. Just honesty.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you define casual?",
      choices: [
        {
          text: "Consistent, but not clingy.",
          affectionChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Chemistry first, expectations low.",
          affectionChange: 0,
          lustChange: 1,
        },
        {
          text: "Space during workdays, time when it fits.",
          affectionChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "That is adult enough for me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She watches for your reaction, then gives a short nod when you do not push.",
      nextDialogueId: "gwen_event_5_after_casual",
    },
  ],
};

const gwenEvent5After: Dialogue = {
  id: "gwen_event_5_after",
  lines: [
    {
      speaker: null,
      text: "Her voice drops, the performer fading into something more direct.",
    },
    {
      speaker: "Gwen",
      text: "I like fun, not drama.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Respect my boundary and maybe you get the version of me off the clock.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "I want Gwen, not just G.",
          affectionChange: 2,
          dominanceChange: -1,
        },
        {
          text: "I want both, if you trust me with both.",
          affectionChange: 1,
          lustChange: 1,
        },
        {
          text: "Then I will earn off-the-clock access.",
          affectionChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She taps your table once, then slips backstage before the next song starts.",
    },
  ],
};

const gwenEvent5AfterCasual: Dialogue = {
  id: "gwen_event_5_after_casual",
  lines: [
    {
      speaker: "Gwen",
      text: "If this is casual, it is still deliberate.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "You do not get to claim me, and I do not get to vanish when it is inconvenient.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "If that works for you, knock tomorrow. We start clean.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you leave it?",
      choices: [
        {
          text: "Tomorrow, then. No expectations, no games.",
          affectionChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Tomorrow. Keep it hot, keep it honest.",
          affectionChange: 0,
          lustChange: 1,
        },
        {
          text: "Tomorrow. We start with rules before chemistry.",
          affectionChange: 1,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She flicks your glass once with her nail, then turns and disappears backstage.",
    },
  ],
};

export const gwenEvent5Dialogues: Record<string, Dialogue> = {
  gwen_event_5_discreet: gwenEvent5Discreet,
  gwen_event_5_lead: gwenEvent5Lead,
  gwen_event_5_casual: gwenEvent5Casual,
  gwen_event_5_after: gwenEvent5After,
  gwen_event_5_after_casual: gwenEvent5AfterCasual,
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
      minAffection: 7,
      minLust: 0,
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
          text: "Velvet Rope is all neon and bass, a low thrum in your ribs.",
        },
        {
          speaker: null,
          text: "You take a seat near the runway as the lights cut down for the next set.",
        },
        {
          speaker: null,
          text: "The dancer who takes the stage moves like she owns the room. Half a smile, shoulder roll, easy command.",
        },
        {
          speaker: null,
          text: "You recognize her before the song ends.",
        },
        {
          speaker: "You",
          text: "How do you hold yourself when she notices you?",
          choices: [
            {
              text: "Stay composed and let her approach first.",
              affectionChange: 1,
              dominanceChange: -1,
            },
            {
              text: "Hold eye contact and own being here.",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 1,
            },
            {
              text: "Look away, then reset before she reaches you.",
              affectionChange: 0,
              dominanceChange: 0,
            },
          ],
        },
        {
          speaker: null,
          text: "After the set, she appears at your table in a robe, makeup still sharp, expression controlled.",
        },
        {
          speaker: "Gwen",
          text: "{playerName}. Did not expect to see you here.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "I heard about G. I did not expect G to be you.",
        },
        {
          speaker: "Gwen",
          text: "It is me. I do not hide it. I just do not advertise it in the hallway.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "If we are going to exist in both worlds, we keep them clean. Can you do that?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Yes. Your work stays yours.",
              affectionChange: 2,
              dominanceChange: -1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_event_5_discreet",
            },
            {
              text: "Give me the rules. I can follow them.",
              affectionChange: 1,
              lustChange: 2,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_event_5_lead",
            },
            {
              text: "Keep this casual. No labels, no pressure.",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 0,
              setFlags: ["gwenSubPath"],
              nextDialogueId: "gwen_event_5_casual",
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
