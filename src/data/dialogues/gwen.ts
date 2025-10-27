import { Dialogue } from "./index";

export const gwenDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "gwen_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Gwen",
        text: "{playerName}! Perfect timing!",
        expression: "happy",
      },
      { speaker: "You", text: "What's going on, Gwen?" },
      {
        speaker: "Gwen",
        text: "I found this awesome new place we should all check out this weekend!",
        expression: "happy",
      },
      { speaker: "You", text: "Sounds fun! Who's coming?" },
      {
        speaker: "Gwen",
        text: "Well, I was thinking just the two of us actually. Unless you'd rather bring Dawn?",
        expression: "neutral",
        choices: [
          { text: "Just us sounds great!", affectionChange: 5, moodChange: 5 },
          {
            text: "Yeah, let's invite Dawn too.",
            affectionChange: -2,
            moodChange: -2,
          },
          {
            text: "Maybe we could all go - you, me, Dawn, and anyone else?",
            affectionChange: 1,
            moodChange: 1,
          },
        ],
      },
      {
        speaker: "Gwen",
        text: "Awesome! I'll plan everything!",
        expression: "love",
      },
    ],
  },
};
