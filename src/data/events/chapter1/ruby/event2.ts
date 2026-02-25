import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: First Session
// Description: Ruby runs your first full training session.

const rubyCh1Ev2Lead: Dialogue = {
  id: "ruby_ch1_ev2_lead",
  lines: [
    { speaker: "You", text: "You lead. I keep up." },
    { speaker: "Ruby", text: "That's what I like to hear.", expression: "happy" },
    { speaker: null, text: "She steps close and nudges your hips into position." },
    { speaker: "Ruby", text: "Follow my count.", expression: "neutral" },
    { speaker: null, text: "Her voice stays steady as you move with her rhythm." },
    { speaker: "Ruby", text: "Good. Strong. Again.", expression: "happy" },
    { speaker: null, text: "She beams like you just won something." },
    {
      speaker: "Ruby",
      text: "You're easier to teach than you look.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev2_after",
    },
  ],
};

const rubyCh1Ev2Challenge: Dialogue = {
  id: "ruby_ch1_ev2_challenge",
  lines: [
    { speaker: "You", text: "Only if you can keep up with me." },
    { speaker: "Ruby", text: "Oh, you want a race?", expression: "happy" },
    { speaker: null, text: "She laughs, eyes bright." },
    { speaker: "Ruby", text: "Five rounds. Winner picks the finisher.", expression: "happy" },
    { speaker: "You", text: "You're on." },
    { speaker: null, text: "She claps and bounces on her toes." },
    { speaker: "Ruby", text: "Try not to cry when I smoke you.", expression: "happy" },
    {
      speaker: null,
      text: "She starts the timer with a grin.",
      nextDialogueId: "ruby_ch1_ev2_after",
    },
  ],
};

const rubyCh1Ev2Gentle: Dialogue = {
  id: "ruby_ch1_ev2_gentle",
  lines: [
    { speaker: "You", text: "Take it slow. I'm here to learn." },
    { speaker: "Ruby", text: "Smart. Ego lifting gets people hurt.", expression: "happy" },
    { speaker: null, text: "She nods, approving." },
    { speaker: "Ruby", text: "We'll build you right, not fast.", expression: "neutral" },
    { speaker: null, text: "Her voice softens, but her eyes stay sharp." },
    { speaker: "Ruby", text: "Promise me you'll tell me if it feels off.", expression: "neutral" },
    { speaker: "You", text: "I will." },
    {
      speaker: "Ruby",
      text: "Good. Then trust me.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev2_after",
    },
  ],
};

const rubyCh1Ev2After: Dialogue = {
  id: "ruby_ch1_ev2_after",
  lines: [
    { speaker: null, text: "Time passes in sets and reps." },
    { speaker: "Ruby", text: "Not bad for day one.", expression: "happy" },
    { speaker: "Ruby", text: "I hate wasting effort. You didn't.", expression: "neutral" },
    { speaker: null, text: "She hands you a bottle of water." },
    { speaker: "Ruby", text: "Come back in two days. Same time.", expression: "happy" },
    { speaker: "You", text: "That's a command?" },
    { speaker: "Ruby", text: "It's a plan. Big difference.", expression: "happy" },
    { speaker: null, text: "Her phone buzzes. She flips it face down without looking." },
    { speaker: "Ruby", text: "Anyway. You did good.", expression: "happy" },
    { speaker: null, text: "She bumps your shoulder and heads off to coach another client." },
  ],
};

export const rubyEvent2Dialogues: Record<string, Dialogue> = {
  ruby_ch1_ev2_lead: rubyCh1Ev2Lead,
  ruby_ch1_ev2_challenge: rubyCh1Ev2Challenge,
  ruby_ch1_ev2_gentle: rubyCh1Ev2Gentle,
  ruby_ch1_ev2_after: rubyCh1Ev2After,
};

export const rubyEvent2Events: CharacterEvent[] = [
  {
    id: "ruby_ch1_ev2_first_session",
    name: "First Session",
    description: "Ruby runs your first full training session.",
    priority: 230,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredPreviousEvents: ["ruby_trainer_offer_event"],
      requiredFlags: ["rubyTrainerAccepted"],
    },
    dialogue: {
      id: "ruby_ch1_ev2_first_session",
      lines: [
        {
          speaker: null,
          text: "Two days later, you catch Ruby near the free weights, clipboard in hand.",
        },
        { speaker: "Ruby", text: "You showed. I'm proud. Most people vanish.", expression: "happy" },
        { speaker: null, text: "She flicks a resistance band toward you." },
        { speaker: "Ruby", text: "Warm-up first. No shortcuts.", expression: "neutral" },
        { speaker: "You", text: "Yes, coach." },
        { speaker: "Ruby", text: "Good. I like when people listen.", expression: "happy" },
        { speaker: null, text: "She runs you through quick mobility work, counting under her breath." },
        { speaker: "Ruby", text: "We fix form, then we build.", expression: "neutral" },
        { speaker: null, text: "She watches your squat like a hawk." },
        { speaker: "Ruby", text: "Knees out. Chest proud.", expression: "neutral" },
        { speaker: "You", text: "Like that?" },
        { speaker: "Ruby", text: "Better. Again.", expression: "happy" },
        { speaker: null, text: "She claps once, bubbly and loud." },
        { speaker: "Ruby", text: "You can handle more than you think.", expression: "happy" },
        { speaker: "You", text: "I thought this was light." },
        { speaker: "Ruby", text: "It is. For me.", expression: "happy" },
        { speaker: null, text: "She grins and gestures to the rack." },
        { speaker: "Ruby", text: "How do you want this to go?", expression: "neutral" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "You lead. I keep up.",
              affectionChange: 1,
              lustChange: 0,
              dominanceChange: 2,
              nextDialogueId: "ruby_ch1_ev2_lead",
            },
            {
              text: "Only if you can keep up with me.",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 1,
              nextDialogueId: "ruby_ch1_ev2_challenge",
            },
            {
              text: "Take it slow. I'm here to learn.",
              affectionChange: 1,
              lustChange: 0,
              dominanceChange: -1,
              nextDialogueId: "ruby_ch1_ev2_gentle",
            },
          ],
        },
      ],
    },
    rewards: {
      girlStats: { affection: 2 },
      setFlags: ["rubyCh1Ev2Done"],
    },
  },
];
