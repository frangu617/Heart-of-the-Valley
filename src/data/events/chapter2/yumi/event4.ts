import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: A Secret Meeting
// Description: You meet Yumi off campus.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// Fully inline, no sub-dialogues. Single CharacterEvent for all paths.
//
// EVENT START: yumi_c2_event_4  (Cafe, yumi_c2_event_3_completed)
//   └─ [auto]  → yumi_c2_ev4    END [yumi_c2_event_4_completed]
//
// Rewards: yumi_c2_event_4_completed
// ─────────────────────────────────────────────────────────────────────────────

const yumiC2Ev4: Dialogue = {
  id: "yumi_c2_ev4",
  lines: [
    {
      speaker: null,
      text: "Following her instructions, I arrive at an off-campus cafe. She's already in a corner booth, looking out the window.",
    },
    {
      speaker: "Yumi",
      text: "You made it. Good.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "We spend the next hour just talking. Not about the rules, or the university, but about us. Our lives, our hobbies. It's... nice. Normal, even.",
    },
  ],
};

export const yumiEvent4Dialogues: Record<string, Dialogue> = {
  yumi_c2_ev4: yumiC2Ev4,
};

export const yumiEvent4Events: CharacterEvent[] = [
  {
    id: "yumi_c2_event_4",
    name: "A Secret Meeting",
    description: "You meet Yumi off campus.",
    priority: 160,
    repeatable: false,
    conditions: {
      requiredLocation: "Cafe",
      requiredFlags: ["yumi_c2_event_3_completed"],
      blockedByFlags: ["yumi_c2_event_4_completed"],
    },
    dialogue: yumiC2Ev4,
    rewards: {
      setFlags: ["yumi_c2_event_4_completed"],
    },
  },
];
