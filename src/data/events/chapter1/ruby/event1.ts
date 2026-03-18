import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Trainer Offer
// Description: Ruby offers to train you after spotting your form.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: ruby_trainer_offer_event  (Gym, any hour)
//   ├─ [Let's do it. You lead.]        → ruby_ch1_ev1_accept    END [rubyTrainerAccepted]
//   ├─ [Fine, coach me. But I get a say.] → ruby_ch1_ev1_accept END [rubyTrainerAccepted]
//   └─ [Not today. Maybe later.]        → ruby_ch1_ev1_decline   END [rubyTrainerDeclined]
// Rewards: hasMetRuby, unlocks Ruby
// ─────────────────────────────────────────────────────────────────────────────

// FROM: ruby_ch1_ev1_intro → [Let's do it. You lead.] / [Fine, coach me. But I get a say.]
const rubyCh1Ev1Accept: Dialogue = {
  id: "ruby_ch1_ev1_accept",
  lines: [
    { speaker: "Ruby", text: "Yes. Good.", expression: "happy" },
    {
      speaker: "Ruby",
      text: "We start light. I'm not breaking you on day one.",
      expression: "neutral",
    },
    { speaker: null, text: "She taps her clipboard against her palm, already planning." },
    { speaker: "Ruby", text: "Meet me by the squat rack next time.", expression: "happy" },
    { speaker: "Ruby", text: "Hydrate. You look like a desert.", expression: "neutral" },
    { speaker: "You", text: "Yes, coach." },
    { speaker: "Ruby", text: "Don't make me regret it.", expression: "happy" },
    { speaker: null, text: "She jogs back to her station with energy to burn." },
  ],
};

// FROM: ruby_ch1_ev1_intro → [Not today. Maybe later.]
const rubyCh1Ev1Decline: Dialogue = {
  id: "ruby_ch1_ev1_decline",
  lines: [
    { speaker: "Ruby", text: "Fair. I'm not for everyone.", expression: "neutral" },
    {
      speaker: "Ruby",
      text: "If you change your mind, I'm here most days.",
      expression: "happy",
    },
    {
      speaker: "Ruby",
      text: "And yes, I will keep asking until you give me one real session.",
      expression: "happy",
    },
    {
      speaker: "Ruby",
      text: "Try not to wreck your shoulders before that.",
      expression: "neutral",
    },
    { speaker: null, text: "She taps your elbow with two fingers." },
    { speaker: "Ruby", text: "You're strong. Just stubborn.", expression: "happy" },
    { speaker: "You", text: "I'll survive." },
    { speaker: "Ruby", text: "We'll see.", expression: "neutral" },
    { speaker: null, text: "She turns back to her set, humming to herself." },
  ],
};

export const rubyEvent1Dialogues: Record<string, Dialogue> = {
  ruby_ch1_ev1_accept: rubyCh1Ev1Accept,
  ruby_ch1_ev1_decline: rubyCh1Ev1Decline,
};

export const rubyEvent1Events: CharacterEvent[] = [
  {
    id: "ruby_trainer_offer_event",
    name: "Trainer Offer",
    description: "Ruby offers to train you after spotting your form.",
    priority: 240,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
    },
    dialogue: {
      id: "ruby_ch1_ev1_intro",
      lines: [
        {
          speaker: null,
          text: "The gym hums with low music and the steady rhythm of clanking metal.",
        },
        {
          speaker: null,
          text: "You rerack a set and roll your shoulders, catching your breath.",
        },
        {
          speaker: "Ruby",
          text: "Nice control. Also, your wrists are trying to betray you.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You turn to see a toned woman with a towel over her shoulder and a grin that is all energy.",
        },
        { speaker: "Ruby", text: "I'm Ruby. I coach here.", expression: "neutral" },
        {
          speaker: "Ruby",
          text: "Mind if I fix that before you hurt yourself?",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She steps in and adjusts your grip, quick and practiced.",
        },
        { speaker: "Ruby", text: "There. Stronger already.", expression: "happy" },
        { speaker: "You", text: "Are you always this blunt?" },
        {
          speaker: "Ruby",
          text: "Only when I like what I'm seeing.",
          expression: "happy",
        },
        { speaker: null, text: "She laughs, bright and unbothered." },
        { speaker: "Ruby", text: "You new?", expression: "neutral" },
        { speaker: "You", text: "First week." },
        { speaker: "Ruby", text: "Then you're in luck. I collect rookies.", expression: "happy" },
        { speaker: null, text: "She tosses you your towel like it is a ribbon." },
        {
          speaker: "Ruby",
          text: "If you keep training like that, your shoulders will hate you.",
          expression: "neutral",
        },
        { speaker: "Ruby", text: "I can fix it.", expression: "neutral" },
        { speaker: null, text: "Her phone buzzes. She ignores it without looking." },
        {
          speaker: "Ruby",
          text: "I promised myself I'd stop working for free.",
          expression: "neutral",
        },
        {
          speaker: "Ruby",
          text: "But I hate watching bad form.",
          expression: "neutral",
        },
        { speaker: "You", text: "So what is the pitch?" },
        {
          speaker: "Ruby",
          text: "Let me train you. One session. If you hate me, you can walk.",
          expression: "neutral",
        },
        { speaker: null, text: "She plants a hand on the bench, leaning in." },
        { speaker: "Ruby", text: "I lead. You listen. Deal?", expression: "happy" },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Let's do it. You lead.",
              affectionChange: 1,
              lustChange: 0,
              dominanceChange: 2,
              setFlags: ["rubyTrainerAccepted"],
              nextDialogueId: "ruby_ch1_ev1_accept",
            },
            {
              text: "Fine, coach me. But I get a say.",
              affectionChange: 1,
              lustChange: 1,
              dominanceChange: 1,
              setFlags: ["rubyTrainerAccepted"],
              nextDialogueId: "ruby_ch1_ev1_accept",
            },
            {
              text: "Not today. Maybe later.",
              affectionChange: 0,
              lustChange: 0,
              dominanceChange: -1,
              setFlags: ["rubyTrainerDeclined"],
              nextDialogueId: "ruby_ch1_ev1_decline",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetRuby"],
      unlockCharacters: ["Ruby"],
    },
  },
];
