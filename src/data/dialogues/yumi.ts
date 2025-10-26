import { Dialogue } from "./index";

export const yumiFirstMeeting: Dialogue = {
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
};

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
        expression: "love",
      },
    ],
  },
};
