import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 5: Mall Bump
// Descriptions: Run into Iris at the mall when she's feeling bold. | Run into Iris at the mall when she's flustered.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: iris_mall_bump_dom  (Mall, any time, irisDomPath + irisNeedsNewShirt)
//   ├─ [Tease her back (Flirty)]   → (continues inline)   END
//   └─ [Just help her (Friendly)]  → (continues inline)   END
// No sub-dialogues — single event, both choices merge into the same closing lines.
//
// EVENT START: iris_mall_bump_sub  (Mall, any time, irisSubPath + irisNeedsNewShirt)
//   ├─ [Take charge and help (Dominant/Flirty)] → (continues inline)   END
//   └─ [Be gentle (Friendly)]                   → (continues inline)   END
// No sub-dialogues — single event, both choices merge into the same closing lines.
// ─────────────────────────────────────────────────────────────────────────────

export const irisEvent5Dialogues: Record<string, Dialogue> = {
};

export const irisEvent5Events: CharacterEvent[] = [
  {
    id: "iris_mall_bump_dom",
    name: "Mall Bump (Confident Iris)",
    description: "Run into Iris at the mall when she's feeling bold.",
    quest: {
      title: "A Day Out",
      description:
        "It's a good day to get out of the apartment. You never know who you might run into at the Mall.",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredPreviousEvents: ["iris_hallway_invite_event"],
      requiredFlags: ["irisNeedsNewShirt", "irisDomPath"],
    },
    dialogue: {
      id: "iris_mall_bump_dom",
      lines: [
        {
          speaker: null,
          text: "The mall is busy today, a wash of noise and fluorescent light.",
        },
        {
          speaker: null,
          text: "You're navigating the crowd near the fountain when you spot a familiar figure wrestling with too many shopping bags.",
        },
        {
          speaker: null,
          text: "Even from the back, the curve of her hips in those jeans is unmistakable.",
        },
        {
          speaker: null,
          text: "She turns, a bag slipping from her grip just as you step in to catch it. Your hands brush against hers--her skin is warm.",
        },
        { speaker: "You", text: "Careful. You're dropping the goods." },
        {
          speaker: "Iris",
          text: "I knew someone would come to my rescue if I looked helpless enough.",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "Didn't expect it to be you, though. That's a nice bonus.",
          expression: "happy",
        },
        { speaker: "You", text: "So this was a trap?" },
        { speaker: "Iris", text: "Let's call it a strategy. I bought way too much.", expression: "happy" },
        {
          speaker: null,
          text: "She glances at the bag you caught. It has a distinct lace pattern on the packaging.",
        },
        { speaker: "Iris", text: "Especially that one. You have good reflexes.", expression: "happy" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Tease her back (Flirty)",
              affectionChange: 2,
              moodChange: 1,
            },
            {
              text: "Just help her (Friendly)",
              affectionChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "You walk together towards the exit. She walks close to you, her shoulder brushing yours intentionally.",
        },
        { speaker: "Iris", text: "You know... since you've already handled the merchandise...", expression: "seductive" },
        {
          speaker: "Iris",
          text: "I bought something a little impractical. Very expensive.",
          expression: "seductive",
        },
        {
          speaker: "Iris",
          text: "I might ask for a second opinion later.",
          expression: "seductive",
        },
        { speaker: "You", text: "I'm available for consultations." },
        {
          speaker: "Iris",
          text: "See, that is exactly the problem. I flirt, you flirt back, and I act like that is enough.",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "I do want you. I just do not want this to be another impulsive loop.",
          expression: "shy",
        },
        { speaker: "Iris", text: "Next time, I want to do this on purpose.", expression: "neutral" },
      ],
    },
  },
  {
    id: "iris_mall_bump_sub",
    name: "Mall Bump (Shy Iris)",
    description: "Run into Iris at the mall when she's flustered.",
    quest: {
      title: "A Day Out",
      description:
        "It's a good day to get out of the apartment. You never know who you might run into at the Mall.",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredPreviousEvents: ["iris_hallway_invite_event"],
      requiredFlags: ["irisNeedsNewShirt", "irisSubPath"],
    },
    dialogue: {
      id: "iris_mall_bump_sub",
      lines: [
        {
          speaker: null,
          text: "The mall is busy today, a wash of noise and fluorescent light.",
        },
        {
          speaker: null,
          text: "You're navigating the crowd near the fountain when you spot a familiar figure wrestling with too many shopping bags.",
        },
        {
          speaker: null,
          text: "Even from the back, the curve of her hips in those jeans is unmistakable.",
        },
        {
          speaker: null,
          text: "She turns, a bag slipping from her grip just as you step in to catch it. Your hands brush against hers--her skin is warm.",
        },
        { speaker: "You", text: "Careful. You're dropping the goods." },
        {
          speaker: "Iris",
          text: "Oh! {playerName}! I... I didn't see you there!",
          expression: "surprised",
        },
        {
          speaker: null,
          text: "She scrambles to adjust her grip, looking mortified that you caught her struggling.",
        },
        {
          speaker: "Iris",
          text: "I thought I could manage all this in one trip. Hubris, clearly.",
          expression: "shy",
        },
        { speaker: "You", text: "What did you buy? The whole store?" },
        { speaker: "Iris", text: "Just... things. Retail therapy got out of hand.", expression: "shy" },
        {
          speaker: null,
          text: "She notices you holding the bag you caught--the one with the lingerie logo--and her eyes go wide. She quickly tries to snatch it back.",
        },
        { speaker: "Iris", text: "That one isn't... it's just socks! Boring socks!", expression: "shy" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Take charge and help (Dominant/Flirty)",
              affectionChange: 2,
              moodChange: 1,
            },
            {
              text: "Be gentle (Friendly)",
              affectionChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "You walk towards the exit. She stays close to your side, seemingly grateful for the protection from the crowd.",
        },
        { speaker: "Iris", text: "Thanks for the rescue. Again.", expression: "shy" },
        {
          speaker: "Iris",
          text: "Um... about that bag you caught...",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "It wasn't socks. It's... something for special occasions.",
          expression: "shy",
        },
        { speaker: null, text: "She glances up at you, then quickly away." },
        {
          speaker: "Iris",
          text: "Maybe... if you're lucky... you'll find out what it is someday.",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "I keep hiding behind teasing and then pretending I did not mean it.",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "If this goes somewhere, I want it to be real. Not just nerves and impulse.",
          expression: "neutral",
        },
      ],
    },
  },
];
