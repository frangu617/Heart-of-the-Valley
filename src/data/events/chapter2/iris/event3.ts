import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: No More Hiding
// Description: Iris forces a decision about keeping things secret at school.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: iris_ch2_ev3_sub     (University Hallway, 9–17h, dominance ≤ -10, irisCh2Ev2_Done)
//   → iris_ch2_ev3_sub_dialogue     (fully inline — two choice forks, no nextDialogueId)
//        Final choice sets: irisSchoolKissUnlocked  OR  irisPublicRefused
//        END [irisCh2Ev3_Done]
//
// EVENT START: iris_ch2_ev3_dom     (University Hallway, 9–17h, dominance ≥ 10, irisCh2Ev2_Done)
//   → iris_ch2_ev3_dom_dialogue     (fully inline — two choice forks, no nextDialogueId)
//        Final choice sets: irisSchoolKissUnlocked  OR  irisPublicRefused
//        END [irisCh2Ev3_Done]
//
// EVENT START: iris_ch2_ev3_neutral (University Hallway, 9–17h, dominance -9 to 9, irisCh2Ev2_Done)
//   → iris_ch2_ev3_neutral_dialogue (fully inline — two choice forks, no nextDialogueId)
//        Final choice sets: irisSchoolKissUnlocked  OR  irisPublicRefused
//        END [irisCh2Ev3_Done]
// ─────────────────────────────────────────────────────────────────────────────

// EVENT ENTRY: iris_ch2_ev3_sub (SUB PATH — University Hallway)
const iris_ch2_ev3_sub_dialogue: Dialogue = {
  id: "iris_ch2_ev3_sub_dialogue",
  lines: [
    {
      speaker: null,
      text: "You catch Iris in the faculty corridor between classes. She hesitates, then pulls you toward an empty classroom door.",
    },
    {
      speaker: null,
      text: "She checks both ends of the hall before she lets herself stand close.",
    },
    {
      speaker: "Iris",
      text: "We have to be careful. This place is all eyes and rumors.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But I am tired of hiding. I do not want to pretend you are just a colleague.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I want to be able to look at you without flinching.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I can handle judgment about me. I cannot handle a rumor reaching Dawn before I can explain anything.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you give her first?",
      choices: [
        {
          text: "Reassure her. We set boundaries together.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Take control. We follow your rules and keep moving.",
          affectionChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Stay practical. We map risks and avoid easy mistakes.",
          affectionChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "So... what do we do?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "We stop hiding. Quiet, but not secret.",
          affectionChange: 1,
          dominanceChange: 1,
          setFlags: ["irisSchoolKissUnlocked"],
        },
        {
          text: "We keep it quiet. Not at school.",
          affectionChange: -1,
          dominanceChange: -1,
          setFlags: ["irisPublicRefused"],
        },
      ],
    },
  ],
};

// EVENT ENTRY: iris_ch2_ev3_dom (DOM PATH — University Hallway)
const iris_ch2_ev3_dom_dialogue: Dialogue = {
  id: "iris_ch2_ev3_dom_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris stops you in the hallway with a look that does not ask permission.",
    },
    { speaker: "Iris", text: "I am done sneaking.", expression: "seductive" },
    {
      speaker: "Iris",
      text: "I crossed the line with you and I am not walking it back because a hallway makes me nervous.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "We stop hiding what this is, or we stop this entirely.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "No half-claims. No pretending in public and honesty in private.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you steady the moment?",
      choices: [
        {
          text: "Match her intensity. Then we own it.",
          affectionChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Push back. You do not get to corner me.",
          affectionChange: -1,
          dominanceChange: -1,
        },
        {
          text: "Cool it down. We decide this without pressure.",
          affectionChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Pick one.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Agree. No more hiding.",
          affectionChange: 1,
          dominanceChange: -1,
          setFlags: ["irisSchoolKissUnlocked"],
        },
        {
          text: "No. Not here.",
          affectionChange: -2,
          dominanceChange: 1,
          setFlags: ["irisPublicRefused"],
        },
      ],
    },
  ],
};

// EVENT ENTRY: iris_ch2_ev3_neutral (NEUTRAL PATH — Quiet Office)
const iris_ch2_ev3_neutral_dialogue: Dialogue = {
  id: "iris_ch2_ev3_neutral_dialogue",
  lines: [
    {
      speaker: null,
      text: "You and Iris end up alone in a quiet office, the door half shut and the campus hum muted outside.",
    },
    {
      speaker: "Iris",
      text: "We keep circling the same problem. It is dangerous here.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am tired of hiding, but I am also not ready to be official.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I want to keep exploring this... without pretending it is nothing.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You can hear students laughing down the hall, the sound reminding you both exactly where you are.",
    },
    {
      speaker: "Iris",
      text: "I do not want to be reckless, but I also do not want to be erased.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "If we keep this hidden forever, it turns into shame. I do not want that.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you offer her first?",
      choices: [
        {
          text: "Soft promise. We can be honest without being loud.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Firm frame. We move when I say it is safe.",
          affectionChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Balanced. We plan this together, step by step.",
          affectionChange: 1,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "So maybe it is simple. We are honest with each other. We are careful with everyone else.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You sit with that for a moment, the two of you balancing on a line between fear and wanting.",
    },
    {
      speaker: "Iris",
      text: "Maybe we do this carefully. No labels yet. Just honesty.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "If we keep exploring, it has to mean something.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Keep exploring. No labels yet.",
          affectionChange: 1,
          dominanceChange: 0,
          setFlags: ["irisSchoolKissUnlocked"],
        },
        {
          text: "This is too risky. We should pull back.",
          affectionChange: -2,
          dominanceChange: 1,
          setFlags: ["irisPublicRefused"],
        },
      ],
    },
  ],
};

export const irisEvent3Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev3_sub_dialogue: iris_ch2_ev3_sub_dialogue,
  iris_ch2_ev3_dom_dialogue: iris_ch2_ev3_dom_dialogue,
  iris_ch2_ev3_neutral_dialogue: iris_ch2_ev3_neutral_dialogue,
};

export const irisEvent3Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev3_sub",
    name: "No More Hiding",
    description: "Iris wants to stop hiding at school.",
    quest: {
      title: "No More Hiding",
      description: "Talk to Iris at the university and decide how public this should be.",
    },
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev2_Done"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 17,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev3_sub_dialogue,
    rewards: { setFlags: ["irisCh2Ev3_Done"] },
  },
  {
    id: "iris_ch2_ev3_dom",
    name: "No More Hiding",
    description: "Iris wants to stop hiding at school.",
    quest: {
      title: "No More Hiding",
      description: "Talk to Iris at the university and decide how public this should be.",
    },
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev2_Done"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 17,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev3_dom_dialogue,
    rewards: { setFlags: ["irisCh2Ev3_Done"] },
  },
  {
    id: "iris_ch2_ev3_neutral",
    name: "No More Hiding",
    description: "Iris wants to stop hiding at school.",
    quest: {
      title: "No More Hiding",
      description: "Talk to Iris at the university and decide how public this should be.",
    },
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev2_Done"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 17,
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: iris_ch2_ev3_neutral_dialogue,
    rewards: { setFlags: ["irisCh2Ev3_Done"] },
  },
];
