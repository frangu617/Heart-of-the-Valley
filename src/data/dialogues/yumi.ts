import type { Dialogue } from "./index";

export const yumiDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "yumi_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Yumi",
        text: "Professor {playerName}, do you have a moment?",
        expression: "neutral",
      },
      { speaker: "You", text: "Of course, Yumi. What can I help you with?" },
      {
        speaker: "Yumi",
        text: "I was wondering if you'd be willing to mentor me outside of class.",
        expression: "neutral",
      },
      {
        speaker: "Yumi",
        text: "I want to learn more about advanced programming, and you're one of the best teachers I know.",
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
          },
          {
            text: "Sure, I can spare some time. Let's set up a schedule.",
            affectionChange: 5,
            moodChange: 5,
          },
          {
            text: "That depends. What exactly are you looking to learn?",
            affectionChange: 2,
            moodChange: 2,
          },
        ],
      },
      {
        speaker: "Yumi",
        text: "Thank you, Professor. I appreciate it.",
        expression: "shy",
      },
    ],
  },
};
