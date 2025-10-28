import { CharacterEvent } from "./types";

export const gwenEvents: CharacterEvent[] = [
  {
    id: "gwen_first_meeting",
    name: "First Meeting with Gwen",
    description: "First Meeting with Gwen",
    priority: 100,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["firstTimeWorked"],
    },
    dialogue: {
      id: "gwen_first_meeting",

      lines: [
        {
          speaker: null,
          text: "As you're heading back to your apartment, you hear footsteps behind you in the hallway.",
        },
        {
          speaker: "Gwen",
          text: "Hey! Are you the new neighbor?",
          expression: "happy",
        },
        {
          speaker: null,
          text: "A woman with an energetic smile approaches you.",
        },
        {
          speaker: "You",
          text: "Not exactly new - I've been here about a year. {playerName}.",
        },
        {
          speaker: "Gwen",
          text: "Oh wow, really? I'm Gwen! I can't believe we haven't met sooner!",
          expression: "happy",
        },
        { speaker: "You", text: "Nice to meet you, Gwen." },
        {
          speaker: "Gwen",
          text: "I live just down the hall. We should hang out sometime! I know all the fun spots around here.",
          expression: "love",
        },
        {
          speaker: null,
          text: "She's already bubbling with ideas, her enthusiasm filling the hallway.",
        },
      ],
    },
  },
];
