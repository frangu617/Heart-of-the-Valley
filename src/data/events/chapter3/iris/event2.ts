import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 2: The Callout
// Description: Dawn reveals herself after class and proves she knows the MC's ledger.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// Two CharacterEvents; no player choices in any dialogue — all chains are
// automatic (nextDialogueId on a narrator line = Continue to advance).
//
// EVENT START: iris_c3_ev2_dawn_callout
//   (University Hallway 8-19h, irisCh3Ev1_Done + metMysteryGirl, !dawnSummonTriggered)
//   └─ iris_c3_ev2_dawn_callout
//        └─ (auto, nextDialogueId) → iris_c3_ev2_dawn_callout_reveal    END [irisCh3Ev2_Done, hasSeenDawn]
//                                                                             unlockCharacters: Dawn
//   Note: iris_c3_ev2_dawn_summon_call is NOT used by this event — it is
//         exported for use by the Dawn character's own summon trigger once
//         dawnSummonQueued / dawnSummonQueuedTonight are set.
//
// EVENT START: iris_c3_ev2_dawn_callout_fallback  (priority 146, fires after dawnFallbackReady)
//   (irisCh3Ev2_Done + dawnFallbackReady, !dawnSummonQueued / !dawnSummonTriggered)
//   └─ iris_c3_ev2_dawn_callout_fallback    END [dawnIrritatedFallbackSeen, dawnSummonQueued,
//                                                dawnSummonQueuedTonight, hasSeenDawn]
//                                               unlockCharacters: Dawn
//   Note: fallback sets dawnSummonQueued + dawnSummonQueuedTonight to trigger
//         iris_c3_ev2_dawn_summon_call at Velvet that same night.
//
// Rewards (callout): irisCh3Ev2_Done, hasSeenDawn
// Rewards (fallback): dawnIrritatedFallbackSeen, dawnSummonQueued, dawnSummonQueuedTonight, hasSeenDawn
// ─────────────────────────────────────────────────────────────────────────────

const iris_c3_ev2_dawn_callout: Dialogue = {
  id: "iris_c3_ev2_dawn_callout",
  lines: [
    {
      speaker: null,
      text: "You catch Iris between classes. The conversation is short, warm, and careful.",
    },
    {
      speaker: "Iris",
      text: "I have ten minutes before my next lecture. Rain check?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Go save the freshmen.",
    },
    {
      speaker: null,
      text: "Iris squeezes your wrist once and disappears into the classroom corridor. Before you can move, a calm voice behind you says one word.",
      nextDialogueId: "iris_c3_ev2_dawn_callout_reveal",
    },
  ],
};

// FROM: iris_c3_ev2_dawn_callout → (auto nextDialogueId on narrator line)
const iris_c3_ev2_dawn_callout_reveal: Dialogue = {
  id: "iris_c3_ev2_dawn_callout_reveal",
  lines: [
    {
      speaker: "????",
      text: "Professor.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You turn. The same younger woman from Velvet is watching you with an amused, patient smile.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    {
      speaker: "????",
      text: "You have been busy.",
      expression: "smug",
    },
    {
      speaker: "????",
      text: "__DAWN_INTEL_LINES__",
    },
    {
      speaker: "You",
      text: "Who are you?",
    },
    {
      speaker: "????",
      text: "You'll find out when I think you deserve it.",
      expression: "smile",
    },
    {
      speaker: null,
      text: "She brushes past you, close enough for perfume and a warning smile, then vanishes into the hallway traffic.",
      imageSlide: "/images/characters/dawn/date/happy.webp",
    },
  ],
};

const iris_c3_ev2_dawn_callout_fallback: Dialogue = {
  id: "iris_c3_ev2_dawn_callout_fallback",
  lines: [
    {
      speaker: "????",
      text: "Three days. No movement. No decision. Impressive avoidance, Professor.",
      expression: "annoyed",
    },
    {
      speaker: "????",
      text: "__DAWN_INTEL_LINES__",
    },
    {
      speaker: "????",
      text: "You stalled long enough. Tonight. 23:00. Velvet.",
      expression: "angry",
    },
    {
      speaker: "????",
      text: "Do not make me repeat myself.",
      expression: "neutral",
    },
  ],
};

// FROM: external Dawn summon trigger (dawnSummonQueued / dawnSummonQueuedTonight flags)
//       — not attached to any CharacterEvent in this file; exported for Dawn's summon system
export const iris_c3_ev2_dawn_summon_call: Dialogue = {
  id: "iris_c3_ev2_dawn_summon_call",
  lines: [
    {
      speaker: null,
      text: "Your phone vibrates with a blocked caller ID. You answer before it stops.",
    },
    {
      speaker: "Unknown Caller",
      text: "You are late already. Velvet. Right now.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You do not even tell me your name?",
    },
    {
      speaker: "Unknown Caller",
      text: "You already know enough. Move.",
      expression: "smug",
    },
    {
      speaker: null,
      text: "The line goes dead. You head to the nightclub anyway.",
    },
    {
      speaker: null,
      text: "At the edge of the crowd, she steps into view and finally meets your eyes without looking away.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    {
      speaker: "Dawn",
      text: "Good. Now we can start for real.",
      expression: "happy",
    },
  ],
};

export const irisEvent2Dialogues: Record<string, Dialogue> = {
  iris_c3_ev2_dawn_callout,
  iris_c3_ev2_dawn_callout_reveal,
  iris_c3_ev2_dawn_callout_fallback,
  iris_c3_ev2_dawn_summon_call,
};

export const irisEvent2Events: CharacterEvent[] = [
  {
    id: "iris_c3_ev2_dawn_callout",
    name: "Unknown Voice",
    description: "After class, the mystery girl stops you in the hallway.",
    quest: {
      title: "Unknown Voice",
      description: "Someone from Velvet has decided to stop hiding.",
    },
    priority: 143,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh3Ev1_Done", "metMysteryGirl"],
      blockedByFlags: ["irisCh3Ev2_Done", "dawnSummonTriggered"],
      requiredLocation: "University Hallway",
      minHour: 8,
      maxHour: 19,
      minAffection: 20,
    },
    dialogue: iris_c3_ev2_dawn_callout,
    rewards: {
      setFlags: ["irisCh3Ev2_Done", "hasSeenDawn", "dawnSummonQueued", "dawnSummonQueuedTonight"],
      unlockCharacters: ["Dawn"],
    },
  },
  {
    id: "iris_c3_ev2_dawn_callout_fallback",
    name: "No More Stalling",
    description: "Dawn appears irritated that you still have not moved forward.",
    quest: {
      title: "No More Stalling",
      description: "Dawn forces the next step when you drag your feet.",
    },
    priority: 146,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh3Ev2_Done", "dawnFallbackReady"],
      blockedByFlags: [
        "dawnSummonQueued",
        "dawnSummonTriggered",
        "dawnIrritatedFallbackSeen",
      ],
      minAffection: 20,
    },
    dialogue: iris_c3_ev2_dawn_callout_fallback,
    rewards: {
      setFlags: [
        "hasSeenDawn",
        "dawnIrritatedFallbackSeen",
        "dawnSummonQueued",
        "dawnSummonQueuedTonight",
      ],
      unlockCharacters: ["Dawn"],
    },
  },
];
