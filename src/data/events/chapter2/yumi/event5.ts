import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 5: The First Date
// Description: You meet Yumi for a real date.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// Six CharacterEvents share two fully inline dialogue consts (no player choices
// inside either). Variant selection is driven by path flag + metDawn flag.
//
// Without metDawn flag:
//   EVENT START: yumi_c2_event_5_sub      (Bar 20-24h, yumiSubPath, !metDawn)
//   EVENT START: yumi_c2_event_5_dom      (Bar 20-24h, yumiDomPath, !metDawn)
//   EVENT START: yumi_c2_event_5_neutral  (Bar 20-24h, no path flag, !metDawn)
//     └─ [auto]  → yumi_c2_ev5    END [yumi_chapter_2_date, yumi_chapter_2_completed]
//
// With metDawn flag:
//   EVENT START: yumi_c2_event_5_sub_met_dawn      (Bar 20-24h, yumiSubPath, metDawn)
//   EVENT START: yumi_c2_event_5_dom_met_dawn      (Bar 20-24h, yumiDomPath, metDawn)
//   EVENT START: yumi_c2_event_5_neutral_met_dawn  (Bar 20-24h, no path flag, metDawn)
//     └─ [auto]  → yumi_c2_ev5_met_dawn    END [yumi_chapter_2_date, yumi_chapter_2_completed]
//
// Rewards: yumi_chapter_2_date, yumi_chapter_2_completed
// ─────────────────────────────────────────────────────────────────────────────

const yumiC2Ev5: Dialogue = {
  id: "yumi_c2_ev5",
  lines: [
    {
      speaker: "Yumi",
      text: "(Phone) \"Dress up. There's a bar downtown I want to show you. 9 PM. Don't be late.\"",
    },
    {
      speaker: null,
      text: "She chose a stylish, low-key place. A private booth in the back. It feels like a real date.",
    },
    {
      speaker: "Yumi",
      text: "I'm glad you came. I... I'm enjoying this. Us.",
      expression: "happy",
    },
  ],
};

// FROM: yumi_c2_event_5_sub_met_dawn / yumi_c2_event_5_dom_met_dawn / yumi_c2_event_5_neutral_met_dawn → [metDawn flag set]
const yumiC2Ev5MetDawn: Dialogue = {
  id: "yumi_c2_ev5_met_dawn",
  lines: [
    {
      speaker: "Yumi",
      text: "(Phone) \"Dress up. There's a bar downtown I want to show you. 9 PM. Don't be late.\"",
    },
    {
      speaker: null,
      text: "She chose a stylish, low-key place. A private booth in the back. It feels like a real date.",
    },
    {
      speaker: "Yumi",
      text: "I'm glad you came. I... I'm enjoying this. Us.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "As we talk, I get that strange feeling again... of being watched.",
    },
    {
      speaker: null,
      text: "I subtly scan the room, and for a split second, I think I see her. That girl from the nightclub. Dawn. But she's gone before I can be sure.",
    },
    {
      speaker: "Yumi",
      text: "Is something wrong?",
      expression: "worried",
    },
    {
      speaker: "You",
      text: "No, nothing. Just thought I saw someone I knew.",
    },
    {
      speaker: null,
      text: "Yumi accepts the answer, but I see a flicker of something in her eyes. Concern? Or something else?",
    },
  ],
};

export const yumiEvent5Dialogues: Record<string, Dialogue> = {
  yumi_c2_ev5: yumiC2Ev5,
  yumi_c2_ev5_met_dawn: yumiC2Ev5MetDawn,
};

export const yumiEvent5Events: CharacterEvent[] = [
  {
    id: "yumi_c2_event_5_sub",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiSubPath"],
      blockedByFlags: ["yumi_chapter_2_date", "metDawn"],
    },
    dialogue: yumiC2Ev5,
    rewards: {
      girlStats: { love: 10, dominance: -1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_dom",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiDomPath"],
      blockedByFlags: ["yumi_chapter_2_date", "metDawn"],
    },
    dialogue: yumiC2Ev5,
    rewards: {
      girlStats: { love: 10, dominance: 1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_neutral",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed"],
      blockedByFlags: ["yumi_chapter_2_date", "metDawn", "yumiDomPath", "yumiSubPath"],
    },
    dialogue: yumiC2Ev5,
    rewards: {
      girlStats: { love: 10 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_sub_met_dawn",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiSubPath", "metDawn"],
      blockedByFlags: ["yumi_chapter_2_date"],
    },
    dialogue: yumiC2Ev5MetDawn,
    rewards: {
      girlStats: { love: 10, dominance: -1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_dom_met_dawn",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiDomPath", "metDawn"],
      blockedByFlags: ["yumi_chapter_2_date"],
    },
    dialogue: yumiC2Ev5MetDawn,
    rewards: {
      girlStats: { love: 10, dominance: 1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_neutral_met_dawn",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "metDawn"],
      blockedByFlags: ["yumi_chapter_2_date", "yumiDomPath", "yumiSubPath"],
    },
    dialogue: yumiC2Ev5MetDawn,
    rewards: {
      girlStats: { love: 10 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
];
