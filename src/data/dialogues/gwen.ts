import { Dialogue } from "./index";

export const gwenFirstMeeting: Dialogue = {
  id: "gwen_first_meeting",
  lines: [
    {
      speaker: null,
      text: "As you're heading back to your apartment, you hear footsteps behind you in the hallway.",
    },
    {
      speaker: "Gwen",
      text: "Hey! Are you the new neighbor?",
      expression: "happy",
    },
    { speaker: null, text: "A woman with an energetic smile approaches you." },
    {
      speaker: "You",
      text: "Not exactly new - I've been here about a year. Frank.",
    },
    {
      speaker: "Gwen",
      text: "Oh wow, really? I'm Gwen! I can't believe we haven't met sooner!",
      expression: "happy",
    },
    { speaker: "You", text: "Nice to meet you, Gwen." },
    {
      speaker: "Gwen",
      text: "I live just down the hall. We should hang out sometime! I know all the fun spots around here.",
      expression: "love",
    },
    {
      speaker: null,
      text: "She's already bubbling with ideas, her enthusiasm filling the hallway.",
    },
  ],
};

export const gwenDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "gwen_chat",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: "Gwen", text: "Frank! Perfect timing!", expression: "happy" },
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
