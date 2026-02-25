import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: The Rumor
// Description: You hear about a dancer at the strip club.

const gwenEvent4RumorRespect: Dialogue = {
  id: "gwen_event_4_rumor_respect",
  lines: [
    { speaker: "You", text: "People can talk. She can tell me when she wants to." },
    {
      speaker: null,
      text: "You finish your drink and leave the rumor where you found it, deciding not to treat Gwen like a puzzle to solve.",
    },
    {
      speaker: "You",
      text: "Do you reach out at all?",
      choices: [
        {
          text: "Send a simple text: Hope your shift went okay.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Say nothing and let her set the timing.",
          affectionChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Leave it alone for now and keep things normal.",
          affectionChange: 0,
          lustChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "Whatever you pick, the night ends with restraint, not speculation.",
    },
  ],
};

const gwenEvent4RumorCurious: Dialogue = {
  id: "gwen_event_4_rumor_curious",
  lines: [
    { speaker: "You", text: "One way to find out." },
    {
      speaker: null,
      text: "You file away the club name. It is not about gossip now. It is about context.",
    },
    {
      speaker: null,
      text: "If Gwen is living two lives, you want to understand both on purpose.",
    },
    {
      speaker: "You",
      text: "How do you plan your visit?",
      choices: [
        {
          text: "Sit in back and observe quietly.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Take a closer seat and own the choice.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Go once, then decide if this world is for you.",
          affectionChange: 1,
          lustChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "Curiosity settles into intent. You are not drifting into this anymore.",
    },
  ],
};

const gwenEvent4RumorDetached: Dialogue = {
  id: "gwen_event_4_rumor_detached",
  lines: [
    { speaker: "You", text: "If I check it out, I keep it simple. No drama." },
    {
      speaker: null,
      text: "You decide that if this is Gwen's world too, you will treat it like adult territory, not gossip fuel.",
    },
    {
      speaker: null,
      text: "Interest stays, but you keep your expectations low and your boundaries clear.",
    },
    {
      speaker: "You",
      text: "What does detached look like?",
      choices: [
        {
          text: "No names, no assumptions, just observe.",
          affectionChange: 0,
          dominanceChange: 1,
        },
        {
          text: "If she notices you, be direct and adult.",
          affectionChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Treat it as one-night curiosity, nothing more.",
          affectionChange: 0,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "You finish your drink with the decision made: stay clean, stay clear, stay honest.",
    },
  ],
};

export const gwenEvent4Dialogues: Record<string, Dialogue> = {
  gwen_event_4_rumor_respect: gwenEvent4RumorRespect,
  gwen_event_4_rumor_curious: gwenEvent4RumorCurious,
  gwen_event_4_rumor_detached: gwenEvent4RumorDetached,
};

export const gwenEvent4Events: CharacterEvent[] = [
  {
    id: "gwen_event_4_rumor",
    name: "The Rumor",
    description: "You hear about a dancer at the strip club.",
    quest: {
      title: "A Bar Rumor",
      description: "Visit the bar in the evening (6 PM–midnight).",
    },
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 6,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["gwenApologyDone"],
    },
    dialogue: {
      id: "gwen_event_4_rumor",
      lines: [
        {
          speaker: null,
          text: "Later that week, you are at the bar when two regulars lean in over their drinks, trading club stories.",
        },
        {
          speaker: null,
          text: "They talk about a dancer at Velvet Rope who only does short sets, sets her own boundaries, and still owns the room.",
        },
        {
          speaker: null,
          text: "One of them says she goes by G and shuts down anyone who confuses confidence for access.",
        },
        {
          speaker: null,
          text: "Then you hear her laugh described, bright and cutting in the same way you have heard in your hallway.",
        },
        {
          speaker: null,
          text: "The bartender tops off your drink and gives you a look that says he knows exactly why you suddenly care.",
        },
        {
          speaker: "You",
          text: "What do you do in the moment?",
          choices: [
            {
              text: "Ask where Velvet Rope is.",
              affectionChange: 0,
              lustChange: 1,
            },
            {
              text: "Keep quiet and just listen.",
              affectionChange: 1,
              dominanceChange: -1,
            },
            {
              text: "Change the subject, then look it up later.",
              affectionChange: 0,
              dominanceChange: 1,
            },
          ],
        },
        {
          speaker: "You",
          text: "What do you do with the rumor?",
          choices: [
            {
              text: "Respect her privacy and wait.",
              affectionChange: 2,
              dominanceChange: -1,
              nextDialogueId: "gwen_event_4_rumor_respect",
            },
            {
              text: "Follow the lead and check it yourself.",
              affectionChange: 1,
              lustChange: 1,
              nextDialogueId: "gwen_event_4_rumor_curious",
            },
            {
              text: "Go, but keep it detached and casual.",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 1,
              nextDialogueId: "gwen_event_4_rumor_detached",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwenRumorHeard"],
    },
  },
];
