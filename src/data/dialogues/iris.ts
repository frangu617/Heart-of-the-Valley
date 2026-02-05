import type { Dialogue } from "./index";

export const irisDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "iris_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Iris",
        text: "Oh, {playerName}. I didn't expect to run into you here.",
        expression: "neutral",
      },
      {
        speaker: "Iris",
        text: "How was your morning class?",
        expression: "neutral",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "It was great! The students were really engaged today.",
            affectionChange: 2,
            moodChange: 1,
          },
          {
            text: "Same as always. Nothing special.",
            affectionChange: -1,
            moodChange: -1,
          },
          {
            text: "It would be better if I could spend more time with you.",
            affectionChange: 3,
            moodChange: 2,
          },
        ],
      },
      {
        speaker: "Iris",
        text: "I see. That's good to hear.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "Iris seems pleased with your answer. Her smile lingers for a beat.",
      },
    ],
  },
  Hug: {
    id: "iris_hug",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: "You", text: "Can I give you a hug?" },
      { speaker: "Iris", text: "A hug? Here?", expression: "neutral" },
      {
        speaker: null,
        text: "Iris glances around the hallway, weighing the moment.",
      },
      {
        speaker: "Iris",
        text: "All right.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "You embrace Iris gently. She relaxes a fraction, then steps back.",
      },
      {
        speaker: "Iris",
        text: "Thank you, {playerName}. That was nice.",
        expression: "love",
      },
    ],
  },
  Kiss: {
    id: "iris_kiss",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: null, text: "You lean in closer to Iris." },
      {
        speaker: "Iris",
        text: "{playerName}, what are you doing?",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "You kiss her softly. She freezes, then exhales.",
      },
      {
        speaker: "Iris",
        text: "We shouldn't. Dawn might see.",
        expression: "sad",
      },
      {
        speaker: "You",
        text: "What do you say?",
        choices: [
          {
            text: "You're right, I'm sorry. This was a mistake.",
            affectionChange: -5,
            moodChange: -10,
          },
          {
            text: "Don't worry about Dawn. This is about us.",
            affectionChange: 5,
            moodChange: 5,
          },
          {
            text: "We can take this slow. No pressure.",
            affectionChange: 8,
            moodChange: 8,
          },
        ],
      },
    ],
  },
};
