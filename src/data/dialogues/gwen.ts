import { Dialogue } from "./index";

const gwenEvent2Help: Dialogue = {
  id: "gwen_event_2_help",
  lines: [
    { speaker: "You", text: "Here, let me hold that before you wear it." },
    {
      speaker: null,
      text: "You take the cup from her hand. She flashes you a grateful, slightly superior smile.",
    },
    {
      speaker: "Gwen",
      text: "My hero. Careful, it's a double shot. Don't spill it.",
      expression: "happy",
    },
    { speaker: null, text: "She unlocks the door quickly, then reclaims her drink." },
    { speaker: "Gwen", text: "Thanks. You're handy to have around.", expression: "happy" },
    {
      speaker: "Gwen",
      text: "Anyway, I gotta run. Catch you later, {playerName}.",
      expression: "happy",
    },
  ],
};

const gwenEvent2Tease: Dialogue = {
  id: "gwen_event_2_tease",
  lines: [
    { speaker: "You", text: "You look like a juggling act gone wrong. Need me to spot you?" },
    { speaker: null, text: "She rolls her eyes, but there's a smirk playing on her lips." },
    {
      speaker: "Gwen",
      text: "I have it under control, thanks. I'm a professional.",
      expression: "annoyed",
    },
    { speaker: null, text: "She manages to unlock the door with a dramatic flourish." },
    { speaker: "Gwen", text: "See? Flawless execution.", expression: "happy" },
    {
      speaker: "Gwen",
      text: "Anyway, I gotta run. Catch you later, {playerName}.",
      expression: "happy",
    },
  ],
};

const gwenEvent3Sheer: Dialogue = {
  id: "gwen_event_3_sheer",
  lines: [
    { speaker: "You", text: "The sheer one. Definitely." },
    { speaker: "You", text: "If you've got it, flaunt it. And you definitely have it." },
    {
      speaker: null,
      text: "Gwen lowers the top, looking at you with a new spark of interest.",
    },
    {
      speaker: "Gwen",
      text: "Bold choice. I like it. I didn't think you noticed those kinds of things.",
      expression: "seductive",
    },
    {
      speaker: "Gwen",
      text: "Maybe I'll wear it just for you sometime.",
      expression: "seductive",
    },
  ],
};

const gwenEvent3Blouse: Dialogue = {
  id: "gwen_event_3_blouse",
  lines: [
    { speaker: "You", text: "The blouse. Leave a little mystery." },
    { speaker: "You", text: "You don't need the sheer top to be the best thing in the room." },
    {
      speaker: null,
      text: "She blinks, actually looking a little flustered by the compliment.",
    },
    {
      speaker: "Gwen",
      text: "Oh. Well... okay then. Mystery it is.",
      expression: "surprised",
    },
    { speaker: null, text: "She tosses the sheer top onto the couch, smiling at you softly." },
    { speaker: "Gwen", text: "You're surprisingly good at this.", expression: "happy" },
  ],
};

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
  gwen_event_2_help: gwenEvent2Help,
  gwen_event_2_tease: gwenEvent2Tease,
  gwen_event_3_sheer: gwenEvent3Sheer,
  gwen_event_3_blouse: gwenEvent3Blouse,
};
