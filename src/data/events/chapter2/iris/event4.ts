import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 4: The Turning Point
// Description: Route-specific fallout after "No More Hiding", before the nightclub date.

const iris_ch2_ev4_sub_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_sub_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "You find Iris in the hallway between classes. She is smiling before you even reach her.",
    },
    {
      speaker: "Iris",
      text: "I have been lighter all day. I keep catching myself looking for you.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I know that sounds dangerous. I just... like what we are when you are near.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Then let me make this simple. We are not circling this forever.",
    },
    {
      speaker: "You",
      text: "You and me. Date. Soon.",
    },
    {
      speaker: "Iris",
      text: "That almost sounded like an order.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "It was.",
    },
    {
      speaker: "Iris",
      text: "Good. Then I accept.",
      expression: "happy",
    },
  ],
};

const iris_ch2_ev4_sub_denied_dialogue: Dialogue = {
  id: "iris_ch2_ev4_sub_denied_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris meets you at the edge of the faculty hall, hands clasped around her coffee cup.",
    },
    {
      speaker: "Iris",
      text: "About before... I know you said no to public. I heard you.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am not asking for drama. Just one clean chance.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "Take me out. One date. Let us do this right.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I can do one real date.",
    },
    {
      speaker: "Iris",
      text: "That is all I asked for.",
      expression: "happy",
    },
  ],
};

const iris_ch2_ev4_dom_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_dom_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris catches your sleeve and pulls you just out of traffic in the hallway.",
    },
    {
      speaker: "Iris",
      text: "We skipped a step.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "We kissed first and pretended that counted as planning.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "It does not. We are doing this properly now.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "You are taking me on a date. No delays.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "You are really not asking.",
    },
    {
      speaker: "Iris",
      text: "Correct.",
      expression: "happy",
    },
  ],
};

const iris_ch2_ev4_dom_denied_start_dialogue: Dialogue = {
  id: "iris_ch2_ev4_dom_denied_start_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris stops beside you after class, posture controlled, voice low.",
    },
    {
      speaker: "Iris",
      text: "I am not here to argue about your boundary.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But that kiss woke up a part of me I kept sealed for years.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I can feel it everywhere now. In every room.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am trying not to make this your problem.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "And if it already is?",
    },
    {
      speaker: "Iris",
      text: "Then we will have that conversation when I can say it clearly.",
      expression: "neutral",
    },
  ],
};

export const irisEvent4Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev4_sub_accepted_dialogue,
  iris_ch2_ev4_sub_denied_dialogue,
  iris_ch2_ev4_dom_accepted_dialogue,
  iris_ch2_ev4_dom_denied_start_dialogue,
};

export const irisEvent4Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev4_sub_accepted",
    name: "The Turning Point",
    description: "Sub route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSubPath", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
    },
    dialogue: iris_ch2_ev4_sub_accepted_dialogue,
    rewards: {
      girlStats: { affection: 2, love: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_sub_denied",
    name: "The Turning Point",
    description: "Sub route denied branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSubPath", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
    },
    dialogue: iris_ch2_ev4_sub_denied_dialogue,
    rewards: {
      girlStats: { affection: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_dom_accepted",
    name: "The Turning Point",
    description: "Dom route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisDomPath", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
    },
    dialogue: iris_ch2_ev4_dom_accepted_dialogue,
    rewards: {
      girlStats: { lust: 1, affection: 1 },
      setFlags: [
        "irisCh2Ev4_Done",
        "irisDatePlanned",
        "irisDomAcceptedKissLoopActive",
      ],
    },
  },
  {
    id: "iris_ch2_ev4_dom_denied_start",
    name: "The Turning Point",
    description: "Dom route denied branch starts the unresolved loop before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisDomPath", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
    },
    dialogue: iris_ch2_ev4_dom_denied_start_dialogue,
    rewards: {
      girlStats: { lust: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDomDeniedKissLoopActive"],
    },
  },
];
