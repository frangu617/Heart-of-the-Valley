import type { Dialogue } from "./index";

export const rubyDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "ruby_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Ruby",
        text: "{playerName}! Time for your session!",
        expression: "happy",
      },
      { speaker: "You", text: "Hey Ruby, ready to kick my ass today?" },
      {
        speaker: "Ruby",
        text: "You know it! But hey... can I ask you something personal?",
        expression: "neutral",
      },
      { speaker: "You", text: "Sure, what's up?" },
      {
        speaker: "Ruby",
        text: "Do you ever... think about us? Like, not just as trainer and client?",
        expression: "sad",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "Not really, you're like a sister to me.",
            affectionChange: -8,
            moodChange: -15,
            trustChange: -5,
          },
          {
            text: "Sometimes. Why do you ask?",
            affectionChange: 5,
            moodChange: 5,
            trustChange: 8,
          },
          {
            text: "I value our friendship too much to complicate it.",
            affectionChange: -3,
            moodChange: -5,
            trustChange: 2,
          },
        ],
      },
      {
        speaker: "Ruby",
        text: "Just... curious. Let's get to work.",
        expression: "neutral",
      },
    ],
  },
};
