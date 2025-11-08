import { Dialogue } from "./index";

export const rubyFirstMeeting: Dialogue = {
  id: "ruby_first_meeting",
  lines: [
    {
      speaker: null,
      text: "Your personal trainer approaches with her usual confident stride.",
    },
    {
      speaker: "Ruby",
      text: "{playerName}! Ready for today's session?",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Ruby - your personal trainer for the past two years. Tough, dedicated, and surprisingly caring.",
    },
    { speaker: "You", text: "Ready to get destroyed, as usual." },
    {
      speaker: "Ruby",
      text: "That's the spirit! Let's go!",
      expression: "happy",
    },
    {
      speaker: null,
      text: "During your workout, she spots you on the bench press.",
    },
    {
      speaker: "Ruby",
      text: "You know, {playerName}... you're one of my favorite clients.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "For a moment, something flickers in her expression before she quickly looks away.",
    },
  ],
};

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
