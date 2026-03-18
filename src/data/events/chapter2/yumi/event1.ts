import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: The Morning After
// Description: You see Yumi for the first time since the kiss.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// Three separate CharacterEvents fire based on path flag; each uses its own
// fully inline dialogue const — no player choices, no sub-dialogues.
//
// EVENT START: yumi_c2_event_1_sub  (University Hallway, yumiSubPath)
//   └─ [auto]  → yumi_c2_ev1_sub    END [yumi_chapter_2_started]
//
// EVENT START: yumi_c2_event_1_dom  (University Hallway, yumiDomPath)
//   └─ [auto]  → yumi_c2_ev1_dom    END [yumi_chapter_2_started]
//
// EVENT START: yumi_c2_event_1_neutral  (University Hallway, no path flag)
//   └─ [auto]  → yumi_c2_ev1_neutral   END [yumi_chapter_2_started]
//
// Rewards: yumi_chapter_2_started
// ─────────────────────────────────────────────────────────────────────────────

const yumiC2Ev1Sub: Dialogue = {
  id: "yumi_c2_ev1_sub",
  lines: [
    {
      speaker: null,
      text: "I see Yumi down the hall. She sees me and her cheeks flush. She quickly looks down at her books, trying to seem busy.",
    },
    {
      speaker: null,
      text: "She's avoiding my eyes, but I can see a small, almost imperceptible smile on her face. She's waiting for me to make the first move.",
    },
  ],
};

const yumiC2Ev1Dom: Dialogue = {
  id: "yumi_c2_ev1_dom",
  lines: [
    {
      speaker: null,
      text: "I spot Yumi by her locker. Our eyes meet, and her expression is unreadable, almost cold. All business.",
    },
    {
      speaker: null,
      text: "She gives me a slight nod, a clear signal. A moment later, my phone buzzes. \"Empty classroom. 3rd floor. After this class. Be there.\"",
    },
  ],
};

const yumiC2Ev1Neutral: Dialogue = {
  id: "yumi_c2_ev1_neutral",
  lines: [
    {
      speaker: null,
      text: "There's Yumi. She sees me and offers a small, uncertain smile before turning away. It's impossible to tell what she's thinking.",
    },
    {
      speaker: null,
      text: "It's tense. The air is thick with unspoken words. Later, my phone vibrates. A text from her: \"We should talk.\"",
    },
  ],
};

export const yumiEvent1Dialogues: Record<string, Dialogue> = {
  yumi_c2_ev1_sub: yumiC2Ev1Sub,
  yumi_c2_ev1_dom: yumiC2Ev1Dom,
  yumi_c2_ev1_neutral: yumiC2Ev1Neutral,
};

export const yumiEvent1Events: CharacterEvent[] = [
  {
    id: "yumi_c2_event_1_sub",
    name: "The Morning After",
    description: "You see Yumi for the first time since the kiss.",
    priority: 190,
    repeatable: false,
    conditions: {
      requiredLocation: "University Hallway",
      requiredFlags: ["yumi_chapter_1_completed", "yumiSubPath"],
      blockedByFlags: ["yumi_chapter_2_started"],
    },
    dialogue: yumiC2Ev1Sub,
    rewards: {
      setFlags: ["yumi_chapter_2_started"],
    },
  },
  {
    id: "yumi_c2_event_1_dom",
    name: "The Morning After",
    description: "You see Yumi for the first time since the kiss.",
    priority: 190,
    repeatable: false,
    conditions: {
      requiredLocation: "University Hallway",
      requiredFlags: ["yumi_chapter_1_completed", "yumiDomPath"],
      blockedByFlags: ["yumi_chapter_2_started"],
    },
    dialogue: yumiC2Ev1Dom,
    rewards: {
      setFlags: ["yumi_chapter_2_started"],
    },
  },
  {
    id: "yumi_c2_event_1_neutral",
    name: "The Morning After",
    description: "You see Yumi for the first time since the kiss.",
    priority: 190,
    repeatable: false,
    conditions: {
      requiredLocation: "University Hallway",
      requiredFlags: ["yumi_chapter_1_completed"],
      blockedByFlags: ["yumi_chapter_2_started", "yumiDomPath", "yumiSubPath"],
    },
    dialogue: yumiC2Ev1Neutral,
    rewards: {
      setFlags: ["yumi_chapter_2_started"],
    },
  },
];
