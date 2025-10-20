import { Dialogue } from "./index";

export const dawnFirstMeeting: Dialogue = {
  id: "dawn_first_meeting",
  lines: [
    {
      speaker: null,
      text: "A familiar energetic voice calls out to you.",
    },
    { speaker: "Dawn", text: "Frank! Hey!", expression: "happy" },
    {
      speaker: null,
      text: "Dawn - Iris's daughter. You've known her since she was a kid. She just turned 18.",
    },
    {
      speaker: "Dawn",
      text: "What are you doing here?",
      expression: "happy",
      choices: [
        { text: "I'm here to meet you!", affectionChange: 10, trustChange: 10 },
        { text: "I'm here to ask you a question.", affectionChange: 0, trustChange: 0 },
      ]
    },
    {
      speaker: "You",
      text: "Hey Dawn! Yeah, I've been coming here for a while.",
    },
    {
      speaker: "Dawn",
      text: "We should work out together sometime! It'll be fun!",
      expression: "happy",
    },
    {
      speaker: null,
      text: "There's something different about how she looks at you now. Not quite the same as before...",
    },
  ],
};

export const dawnDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "dawn_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Dawn",
        text: "Uncle Frank! There you are!",
        expression: "happy",
      },
      { speaker: "You", text: "Hey Dawn, what's up?" },
      {
        speaker: "Dawn",
        text: "I... I wanted to ask you something...",
        expression: "neutral",
      },
      {
        speaker: "Dawn",
        text: "Do you think I'm still just a kid to you?",
        expression: "sad",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "Of course! You'll always be my little niece.",
            affectionChange: -5,
            moodChange: -10,
            trustChange: -2,
          },
          {
            text: "You've grown up a lot. I've noticed.",
            affectionChange: 5,
            moodChange: 5,
            trustChange: 3,
          },
          {
            text: "Why do you ask? Is something bothering you?",
            affectionChange: 3,
            moodChange: 3,
            trustChange: 4,
          },
        ],
      },
      {
        speaker: "Dawn",
        text: "I... never mind. Thanks for talking with me.",
        expression: "neutral",
      },
    ],
  },
  Hug: {
    id: "dawn_hug",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: "Dawn", text: "Can I... get a hug?", expression: "neutral" },
      {
        speaker: null,
        text: "Dawn looks at you expectantly, her expression more serious than usual.",
      },
      { speaker: "You", text: "Of course, come here." },
      {
        speaker: null,
        text: "You hug Dawn. She holds on a little longer than usual.",
      },
      {
        speaker: "Dawn",
        text: "Thanks, Uncle Frank... you're the best.",
        expression: "love",
      },
      { speaker: null, text: "You notice she's trembling slightly." },
    ],
  },
};
