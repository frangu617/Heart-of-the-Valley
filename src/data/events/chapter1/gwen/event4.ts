import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: The Rumor
// Description: You hear about a dancer at the strip club.

export const gwenEvent4Dialogues: Record<string, Dialogue> = {
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
      minAffection: 10,
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
          text: "Later that week, you're at the bar when a pair of patrons lean in, whispering over their drinks.",
        },
        {
          speaker: null,
          text: "They talk about a dancer at the Strip Club who 'owns the room' and doesn't even have to try.",
        },
        {
          speaker: null,
          text: "Someone mentions she goes by G and only does a couple sets a night.",
        },
        {
          speaker: null,
          text: "The name sticks. So does the image of Gwen in heels, moving like she owns the hallway.",
        },
        {
          speaker: null,
          text: "Curiosity scratches at you the rest of the night.",
        },
      ],
    },
    rewards: {
      setFlags: ["gwenRumorHeard"],
    },
  },
];
