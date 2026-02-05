import type { Dialogue } from "./index";

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
        text: "I found a new place we should check out this weekend. Loud, late, my kind of problem.",
        expression: "happy",
      },
      { speaker: "You", text: "Sounds fun! Who's coming?" },
      {
        speaker: "Gwen",
        text: "I was thinking just the two of us. Unless you'd rather make it a group?",
        expression: "neutral",
        choices: [
          { text: "Just us sounds great!", affectionChange: 5, moodChange: 5 },
          {
            text: "Yeah, let's make it a group.",
            affectionChange: -2,
            moodChange: -2,
          },
          {
            text: "Maybe we could bring a few people.",
            affectionChange: 1,
            moodChange: 1,
          },
        ],
      },
      {
        speaker: "Gwen",
        text: "Awesome. I'll plan it.",
        expression: "happy",
      },
    ],
  },
};
