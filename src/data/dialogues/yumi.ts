import { Dialogue } from "./index";

export const yumiDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "yumi_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Yumi",
        text: "Professor {playerName}! Do you have a moment?",
        expression: "neutral",
      },
      { speaker: "You", text: "Of course, Yumi. What can I help you with?" },
      {
        speaker: "Yumi",
        text: "I was wondering... would you be willing to mentor me outside of class?",
        expression: "neutral",
      },
      {
        speaker: "Yumi",
        text: "I want to learn more about advanced programming, and you're the best teacher I know.",
        expression: "happy",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "I'm flattered, but I don't do private tutoring.",
            affectionChange: -3,
            moodChange: -5,
            trustChange: -2,
          },
          {
            text: "Sure, I can spare some time. Let's set up a schedule.",
            affectionChange: 5,
            moodChange: 5,
            trustChange: 5,
          },
          {
            text: "That depends. What exactly are you looking to learn?",
            affectionChange: 2,
            moodChange: 2,
            trustChange: 3,
          },
        ],
      },
      {
        speaker: "Yumi",
        text: "Thank you so much, Professor! I really appreciate it.",
        expression: "shy",
      },
    ],
  },
};
