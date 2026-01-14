import { CharacterEvent } from "./types";

export const yumiEvents: CharacterEvent[] = [
  {
    id: "yumi_first_meeting",
    name: "First Meeting with Yumi",
    description: "First Meeting with Yumi",
    priority: 100,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 10,
      maxHour: 14,
      requiredLocation: "Classroom",
    },
    dialogue: {
      id: "yumi_first_meeting",
      lines: [
        {
          speaker: null,
          text: "After dismissing your programming class, one of your students lingers behind.",
        },
        {
          speaker: "Yumi",
          text: "Professor {playerName}? Do you have a moment?",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "It's Yumi - she always sits in the front row, taking meticulous notes.",
        },
        { speaker: "You", text: "Of course, Yumi. What's on your mind?" },
        {
          speaker: "Yumi",
          text: "I wanted to ask about today's algorithm lecture...",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She pulls out her notebook, filled with detailed annotations and questions.",
        },
        {
          speaker: "Yumi",
          text: "Your approach to optimization was fascinating. Have you considered applying it to machine learning models?",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "That's an excellent connection. You're really thinking beyond the curriculum.",
        },
        {
          speaker: "Yumi",
          text: "I just... I really enjoy how you teach, Professor. Everything makes so much sense when you explain it.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "There's genuine admiration in her eyes as she speaks.",
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetYumi"],
      unlockCharacters: ["Yumi"],
    },
  },
];
