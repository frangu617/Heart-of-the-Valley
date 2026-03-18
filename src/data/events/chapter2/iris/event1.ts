import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: The Morning After
// Description: You see Iris for the first time since the kiss.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: iris_ch2_ev1  (University, irisCh1FinaleComplete, aff≥10, lust≥10)
//   Entry: iris_ch2_ev1_intro
//   ├─ [Take the lead]       → iris_ch2_ev1_sub_intro        (SUB PATH)
//   │    ├─ [Be warm]        → iris_ch2_ev1_sub_reassure
//   │    │    ├─ [Be kind]   → iris_ch2_ev1_sub_final_nice   END [irisCh2Ev1_Done]
//   │    │    ├─ [Be sharp]  → iris_ch2_ev1_sub_final_mean   END [irisCh2Ev1_Done]
//   │    │    └─ [Laugh off] → iris_ch2_ev1_sub_final_laugh  END [irisCh2Ev1_Done]
//   │    ├─ [Neg her]        → iris_ch2_ev1_sub_give_space
//   │    │    ├─ [Be kind]   → iris_ch2_ev1_sub_final_nice   END [irisCh2Ev1_Done]
//   │    │    ├─ [Be harsh]  → iris_ch2_ev1_sub_final_mean   END [irisCh2Ev1_Done]
//   │    │    └─ [Laugh off] → iris_ch2_ev1_sub_final_laugh  END [irisCh2Ev1_Done]
//   │    └─ [Stay neutral]   → iris_ch2_ev1_sub_react_neutral
//   │         ├─ [Be kind]   → iris_ch2_ev1_sub_final_nice   END [irisCh2Ev1_Done]
//   │         ├─ [Be sharp]  → iris_ch2_ev1_sub_final_mean   END [irisCh2Ev1_Done]
//   │         └─ [Laugh off] → iris_ch2_ev1_sub_final_laugh  END [irisCh2Ev1_Done]
//   ├─ [Offer her control]   → iris_ch2_ev1_dom_intro        (DOM PATH)
//   │    ├─ [Encourage her]  → iris_ch2_ev1_dom_playful
//   │    │    ├─ [Be kind]   → iris_ch2_ev1_dom_final_nice   END [irisCh2Ev1_Done]
//   │    │    ├─ [Be sharp]  → iris_ch2_ev1_dom_final_mean   END [irisCh2Ev1_Done]
//   │    │    └─ [Laugh off] → iris_ch2_ev1_dom_final_laugh  END [irisCh2Ev1_Done]
//   │    ├─ [Push back]      → iris_ch2_ev1_dom_direct
//   │    │    ├─ [Be kind]   → iris_ch2_ev1_dom_final_nice   END [irisCh2Ev1_Done]
//   │    │    ├─ [Be sharp]  → iris_ch2_ev1_dom_final_mean   END [irisCh2Ev1_Done]
//   │    │    └─ [Laugh off] → iris_ch2_ev1_dom_final_laugh  END [irisCh2Ev1_Done]
//   │    └─ [Stay neutral]   → iris_ch2_ev1_dom_react_neutral
//   │         ├─ [Be kind]   → iris_ch2_ev1_dom_final_nice   END [irisCh2Ev1_Done]
//   │         ├─ [Be sharp]  → iris_ch2_ev1_dom_final_mean   END [irisCh2Ev1_Done]
//   │         └─ [Laugh off] → iris_ch2_ev1_dom_final_laugh  END [irisCh2Ev1_Done]
//   └─ [Be calm and adult]   → iris_ch2_ev1_neutral_dialogue (NEUTRAL PATH)
//        ├─ [Be warm]        → iris_ch2_ev1_neutral_react_nice
//        │    ├─ [Be kind]   → iris_ch2_ev1_neutral_final_nice   END [irisCh2Ev1_Done]
//        │    ├─ [Be sharp]  → iris_ch2_ev1_neutral_final_mean   END [irisCh2Ev1_Done]
//        │    └─ [Laugh off] → iris_ch2_ev1_neutral_final_laugh  END [irisCh2Ev1_Done]
//        ├─ [Be mean]        → iris_ch2_ev1_neutral_react_mean
//        │    ├─ [Be kind]   → iris_ch2_ev1_neutral_final_nice   END [irisCh2Ev1_Done]
//        │    ├─ [Be sharp]  → iris_ch2_ev1_neutral_final_mean   END [irisCh2Ev1_Done]
//        │    └─ [Laugh off] → iris_ch2_ev1_neutral_final_laugh  END [irisCh2Ev1_Done]
//        └─ [Be neutral]     → iris_ch2_ev1_neutral_react_neutral
//             ├─ [Be kind]   → iris_ch2_ev1_neutral_final_nice   END [irisCh2Ev1_Done]
//             ├─ [Be sharp]  → iris_ch2_ev1_neutral_final_mean   END [irisCh2Ev1_Done]
//             └─ [Laugh off] → iris_ch2_ev1_neutral_final_laugh  END [irisCh2Ev1_Done]
// Rewards: irisCh2Ev1_Done
// ─────────────────────────────────────────────────────────────────────────────

// EVENT ENTRY POINT
const iris_ch2_ev1_intro: Dialogue = {
  id: "iris_ch2_ev1_intro",
  lines: [
    {
      speaker: null,
      text: "Late morning in the university hallway, you round a corner and almost bump into Iris.",
    },
    { speaker: null, text: "She looks like she has been waiting for you." },
    { speaker: "Iris", text: "Oh. I was actually looking for you.", expression: "neutral" },
    { speaker: "Iris", text: "About last night.", expression: "shy" },
    {
      speaker: "Iris",
      text: "I keep replaying it and I do not know if I am relieved or terrified.",
      expression: "neutral",
    },
    { speaker: "Iris", text: "I do not usually do impulsive.", expression: "neutral" },
    { speaker: "Iris", text: "It felt good. It also felt reckless.", expression: "shy" },
    {
      speaker: "Iris",
      text: "I had a little wine in me last night. Not enough to blame, but enough to be braver than usual.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I wanted you, but I am still sorry if I came at you too hard.",
      expression: "neutral",
    },
    { speaker: "Iris", text: "So tell me the truth.", expression: "neutral" },
    { speaker: "Iris", text: "What did it feel like to you?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Take the lead. \"It felt right, and I want more.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_intro",
        },
        {
          text: "Offer her control. \"If you want to lead, I am listening.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 2,
          nextDialogueId: "iris_ch2_ev1_dom_intro",
        },
        {
          text: "Be calm and adult. \"I do not regret it, but we should be smart.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_dialogue",
        },
      ],
    },
  ],
};

// ─── SUB PATH ────────────────────────────────────────────────────────────────
// FROM: iris_ch2_ev1_intro → [Take the lead. "It felt right, and I want more."]
const iris_ch2_ev1_sub_intro: Dialogue = {
  id: "iris_ch2_ev1_sub_intro",
  lines: [
    { speaker: null, text: "She swallows, then nods once." },
    { speaker: "Iris", text: "Direct. I can work with direct.", expression: "neutral" },
    {
      speaker: "Iris",
      text: "Part of me wanted you to take the lead.",
      expression: "shy",
    },
    { speaker: "Iris", text: "It made me feel... chosen.", expression: "shy" },
    {
      speaker: "Iris",
      text: "But I need to know if that is real or just heat.",
      expression: "neutral",
    },
    { speaker: "Iris", text: "Say it clearly.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Be warm. \"It felt right, and I want it again.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_reassure",
        },
        {
          text: "Neg her. \"You were a mess, but I could work with it.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_give_space",
        },
        {
          text: "Stay neutral. \"It happened. We can keep control.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_react_neutral",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_sub_intro → [Be warm. "It felt right, and I want it again."]
const iris_ch2_ev1_sub_reassure: Dialogue = {
  id: "iris_ch2_ev1_sub_reassure",
  lines: [
    { speaker: "Iris", text: "That helps.", expression: "happy" },
    { speaker: "Iris", text: "I was worried you would laugh it off.", expression: "shy" },
    { speaker: null, text: "She fidgets with her keys, then starts talking too fast." },
    { speaker: "Iris", text: "I have a lot to juggle. Students. Papers. A kid at home.", expression: "neutral" },
    { speaker: "Iris", text: "If this becomes gossip, it stops being ours.", expression: "neutral" },
    { speaker: "Iris", text: "And I hate that I even have to say that.", expression: "shy" },
    { speaker: "Iris", text: "But I also do not want to pretend nothing happened.", expression: "neutral" },
    { speaker: "Iris", text: "So I am talking too much. Sorry.", expression: "shy" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond to the ramble?",
      choices: [
        {
          text: "Be kind. \"You are allowed to want this.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be sharp. \"Stop overthinking. Just trust me.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you ramble.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_sub_intro → [Neg her. "You were a mess, but I could work with it."]
const iris_ch2_ev1_sub_give_space: Dialogue = {
  id: "iris_ch2_ev1_sub_give_space",
  lines: [
    { speaker: "Iris", text: "That is... blunt.", expression: "neutral" },
    { speaker: "Iris", text: "I can take blunt, but do not make me feel small.", expression: "neutral" },
    { speaker: null, text: "She straightens, steadying herself." },
    { speaker: "Iris", text: "I am not a toy you pick up when convenient.", expression: "neutral" },
    { speaker: "Iris", text: "I still have rules. I still have a life.", expression: "neutral" },
    { speaker: "Iris", text: "If this happens again, it has to mean something.", expression: "shy" },
    { speaker: "Iris", text: "I am rambling because I am nervous.", expression: "shy" },
    { speaker: "Iris", text: "And because I want this and that scares me.", expression: "shy" },
    { speaker: "Iris", text: "So say what you actually want.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"You are not small. I want you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be harsh. \"Then stop wobbling and decide.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Call it cute. \"You are adorable when you spiral.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_sub_intro → [Stay neutral. "It happened. We can keep control."]
const iris_ch2_ev1_sub_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_sub_react_neutral",
  lines: [
    { speaker: "Iris", text: "Step by step. That is fair.", expression: "neutral" },
    { speaker: "Iris", text: "That is probably the smartest answer in the building.", expression: "happy" },
    { speaker: null, text: "She exhales, then keeps talking anyway." },
    { speaker: "Iris", text: "I am juggling a lot. Students, grading, home.", expression: "neutral" },
    { speaker: "Iris", text: "If this turns into gossip, it gets messy.", expression: "neutral" },
    { speaker: "Iris", text: "But I also do not want to pretend it never happened.", expression: "shy" },
    { speaker: "Iris", text: "So I am stuck between careful and honest.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me where you want this to go.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want you, and I will be careful.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be sharp. \"Then let me decide and follow.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you plan.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_sub_reassure / _give_space / _react_neutral → [Be kind]
const iris_ch2_ev1_sub_final_nice: Dialogue = {
  id: "iris_ch2_ev1_sub_final_nice",
  lines: [
    { speaker: "Iris", text: "Okay. Carefully, then.", expression: "happy" },
    { speaker: "Iris", text: "But if you are taking the lead, then take it.", expression: "shy" },
    { speaker: null, text: "You close the distance." },
    {
      speaker: null,
      text: "You steal a kiss, slow and certain.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "Okay.", expression: "shy" },
    { speaker: null, text: "She leans into you, breathless." },
  ],
};

// FROM: iris_ch2_ev1_sub_reassure / _give_space / _react_neutral → [Be sharp / Be harsh]
const iris_ch2_ev1_sub_final_mean: Dialogue = {
  id: "iris_ch2_ev1_sub_final_mean",
  lines: [
    { speaker: "Iris", text: "Then be consistent.", expression: "neutral" },
    { speaker: "Iris", text: "No games. No disappearing.", expression: "neutral" },
    { speaker: null, text: "You lift her chin and close the gap." },
    {
      speaker: null,
      text: "You take a kiss, firm and unapologetic.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "Do not make me regret that.", expression: "neutral" },
    { speaker: null, text: "She does not pull away." },
  ],
};

// FROM: iris_ch2_ev1_sub_reassure / _give_space / _react_neutral → [Laugh it off]
const iris_ch2_ev1_sub_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_sub_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute is... one way to put it.", expression: "happy" },
    { speaker: "Iris", text: "Fine. I will take cute.", expression: "happy" },
    { speaker: null, text: "You grin and pull her close." },
    {
      speaker: null,
      text: "You steal a quick kiss that turns slower.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "We should not do this in the hallway.", expression: "happy" },
    { speaker: null, text: "You agree and let her go." },
  ],
};

// ─── DOM PATH ────────────────────────────────────────────────────────────────
// FROM: iris_ch2_ev1_intro → [Offer her control. "If you want to lead, I am listening."]
const iris_ch2_ev1_dom_intro: Dialogue = {
  id: "iris_ch2_ev1_dom_intro",
  lines: [
    { speaker: null, text: "She studies you, a spark of approval in her eyes." },
    { speaker: "Iris", text: "So you want me to lead.", expression: "neutral" },
    { speaker: "Iris", text: "I did not hate taking control.", expression: "seductive" },
    { speaker: "Iris", text: "It felt... honest.", expression: "neutral" },
    { speaker: "Iris", text: "But I will not do it if you are going to flinch.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Encourage her. \"I liked you taking control.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_playful",
        },
        {
          text: "Push back. \"You were too much.\"",
          affectionChange: -1,
          lustChange: -1,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_direct",
        },
        {
          text: "Stay neutral. \"I want clarity, not a power trip.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_dom_react_neutral",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_dom_intro → [Encourage her. "I liked you taking control."]
const iris_ch2_ev1_dom_playful: Dialogue = {
  id: "iris_ch2_ev1_dom_playful",
  lines: [
    { speaker: "Iris", text: "Good. I do not want to pretend I am timid.", expression: "happy" },
    { speaker: "Iris", text: "I like when you listen.", expression: "seductive" },
    { speaker: null, text: "She steps closer, voice low." },
    { speaker: "Iris", text: "I have limits. Work is work.", expression: "neutral" },
    { speaker: "Iris", text: "If we do this, it is on our terms.", expression: "neutral" },
    { speaker: "Iris", text: "And I will not chase you.", expression: "neutral" },
    { speaker: "Iris", text: "That is me rambling again.", expression: "shy" },
    { speaker: "Iris", text: "Tell me if that scares you.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"It does not scare me. I trust you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Do not push too far.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"You are scary and cute.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_dom_intro → [Push back. "You were too much."]
const iris_ch2_ev1_dom_direct: Dialogue = {
  id: "iris_ch2_ev1_dom_direct",
  lines: [
    { speaker: "Iris", text: "Too much?", expression: "neutral" },
    { speaker: "Iris", text: "Then say that before you let me get that close.", expression: "neutral" },
    { speaker: null, text: "Her expression hardens for a moment." },
    { speaker: "Iris", text: "I am not apologizing for wanting you.", expression: "neutral" },
    { speaker: "Iris", text: "But I will not push someone who does not want it.", expression: "neutral" },
    { speaker: "Iris", text: "So be clear.", expression: "neutral" },
    { speaker: "Iris", text: "Do you want this, or do you want distance?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want it. Just slower.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Do not test me.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"Distance is not what I want.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_dom_intro → [Stay neutral. "I want clarity, not a power trip."]
const iris_ch2_ev1_dom_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_dom_react_neutral",
  lines: [
    { speaker: "Iris", text: "Clarity. I can do that.", expression: "neutral" },
    { speaker: "Iris", text: "I do not want a power trip either.", expression: "neutral" },
    { speaker: null, text: "She nods, thinking." },
    { speaker: "Iris", text: "I want something honest, not performative.", expression: "neutral" },
    { speaker: "Iris", text: "If we do this, it is because we both want it.", expression: "neutral" },
    { speaker: "Iris", text: "And because we can handle it.", expression: "neutral" },
    { speaker: "Iris", text: "So tell me where you stand.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want it. And I trust you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Then do not push your luck.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"I stand right here.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_dom_playful / _direct / _react_neutral → [Be kind]
const iris_ch2_ev1_dom_final_nice: Dialogue = {
  id: "iris_ch2_ev1_dom_final_nice",
  lines: [
    { speaker: "Iris", text: "Then listen.", expression: "seductive" },
    { speaker: "Iris", text: "We keep it discreet, and I take the lead when we are alone.", expression: "neutral" },
    { speaker: null, text: "She hooks a finger under your collar." },
    {
      speaker: null,
      text: "She steals a kiss, slow and deliberate.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "That is ours.", expression: "happy" },
    { speaker: null, text: "She pulls back with a satisfied smile." },
  ],
};

// FROM: iris_ch2_ev1_dom_playful / _direct / _react_neutral → [Be sharp]
const iris_ch2_ev1_dom_final_mean: Dialogue = {
  id: "iris_ch2_ev1_dom_final_mean",
  lines: [
    { speaker: "Iris", text: "Do not provoke me and then act surprised.", expression: "neutral" },
    { speaker: "Iris", text: "If you want distance, ask. If you want me, be honest.", expression: "neutral" },
    {
      speaker: null,
      text: "She closes the gap and kisses you anyway, testing your reaction.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "That is your warning.", expression: "neutral" },
    { speaker: null, text: "You do not stop her." },
    { speaker: null, text: "She leaves you a little breathless." },
  ],
};

// FROM: iris_ch2_ev1_dom_playful / _direct / _react_neutral → [Laugh it off]
const iris_ch2_ev1_dom_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_dom_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute, huh?", expression: "happy" },
    { speaker: "Iris", text: "Then you will survive this.", expression: "happy" },
    {
      speaker: null,
      text: "She steps in, taking a kiss while you laugh.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "We are not doing this in the hallway again.", expression: "neutral" },
    { speaker: null, text: "She brushes her thumb over your lip." },
    { speaker: null, text: "She walks away like she owns the moment." },
  ],
};

// ─── NEUTRAL PATH ────────────────────────────────────────────────────────────
// FROM: iris_ch2_ev1_intro → [Be calm and adult. "I do not regret it, but we should be smart."]
const iris_ch2_ev1_neutral_dialogue: Dialogue = {
  id: "iris_ch2_ev1_neutral_dialogue",
  lines: [
    { speaker: null, text: "She lets out a slow breath." },
    { speaker: "Iris", text: "Thank you for saying it like an adult.", expression: "neutral" },
    { speaker: "Iris", text: "I liked the kiss. That is the truth.", expression: "shy" },
    { speaker: "Iris", text: "I also like my job and my sanity.", expression: "neutral" },
    { speaker: "Iris", text: "So I want something careful and real.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Be warm. \"I liked it. I want more.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_react_nice",
        },
        {
          text: "Be mean. \"Do not make a big deal of it.\"",
          affectionChange: -1,
          lustChange: -1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_react_mean",
        },
        {
          text: "Be neutral. \"I want us to be careful.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_react_neutral",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_neutral_dialogue → [Be warm. "I liked it. I want more."]
const iris_ch2_ev1_neutral_react_nice: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_nice",
  lines: [
    { speaker: "Iris", text: "I am glad you said that.", expression: "happy" },
    { speaker: "Iris", text: "I was worried it would sound needy.", expression: "shy" },
    { speaker: null, text: "She laughs softly, then keeps talking." },
    { speaker: "Iris", text: "I overthink everything.", expression: "neutral" },
    { speaker: "Iris", text: "If this becomes a rumor, it hurts both of us.", expression: "neutral" },
    { speaker: "Iris", text: "But pretending it did not happen feels worse.", expression: "shy" },
    { speaker: "Iris", text: "So I am trying to be honest without being reckless.", expression: "neutral" },
    { speaker: "Iris", text: "Does that make sense?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"It makes sense. I am with you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"Then stop spinning it out.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you worry.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_neutral_dialogue → [Be mean. "Do not make a big deal of it."]
const iris_ch2_ev1_neutral_react_mean: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_mean",
  lines: [
    { speaker: "Iris", text: "Ouch.", expression: "neutral" },
    { speaker: "Iris", text: "You could have said that without the sting.", expression: "neutral" },
    { speaker: null, text: "She steadies her breath." },
    { speaker: "Iris", text: "I am not asking for a declaration. I am asking for respect.", expression: "neutral" },
    { speaker: "Iris", text: "If you do not want this, say so.", expression: "neutral" },
    { speaker: "Iris", text: "If you do, do not make me feel foolish.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"You are not foolish. I want this.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"Then toughen up.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"I am not trying to be cruel.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_neutral_dialogue → [Be neutral. "I want us to be careful."]
const iris_ch2_ev1_neutral_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_neutral",
  lines: [
    { speaker: "Iris", text: "Fair.", expression: "neutral" },
    { speaker: "Iris", text: "That is probably the right speed.", expression: "neutral" },
    { speaker: null, text: "She starts to ramble anyway." },
    { speaker: "Iris", text: "I do not want to hide, but I also do not want a scene.", expression: "neutral" },
    { speaker: "Iris", text: "I want it to feel like ours.", expression: "neutral" },
    { speaker: "Iris", text: "Not a secret, just private.", expression: "neutral" },
    { speaker: "Iris", text: "So... where do we land?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"We land together.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"We land if you stop hesitating.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"We land somewhere nice.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

// FROM: iris_ch2_ev1_neutral_react_nice / _mean / _neutral → [Be kind]
const iris_ch2_ev1_neutral_final_nice: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_nice",
  lines: [
    { speaker: "Iris", text: "Okay. We take it slow.", expression: "happy" },
    { speaker: "Iris", text: "No sneaking, just choices.", expression: "neutral" },
    { speaker: null, text: "You lean in together." },
    {
      speaker: null,
      text: "The kiss is mutual and unhurried.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "We will figure it out.", expression: "happy" },
    { speaker: null, text: "You both step back, a little lighter." },
  ],
};

// FROM: iris_ch2_ev1_neutral_react_nice / _mean / _neutral → [Be sharp]
const iris_ch2_ev1_neutral_final_mean: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_mean",
  lines: [
    { speaker: "Iris", text: "Then we set a boundary.", expression: "neutral" },
    { speaker: "Iris", text: "No games. No half answers.", expression: "neutral" },
    { speaker: null, text: "You still close the distance, careful." },
    {
      speaker: null,
      text: "The kiss is brief, like a promise and a warning.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "Do not make me regret being honest.", expression: "neutral" },
    { speaker: null, text: "You nod." },
  ],
};

// FROM: iris_ch2_ev1_neutral_react_nice / _mean / _neutral → [Laugh it off]
const iris_ch2_ev1_neutral_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute is acceptable.", expression: "happy" },
    { speaker: "Iris", text: "I can live with cute.", expression: "happy" },
    { speaker: null, text: "You both laugh, then lean in at the same time." },
    {
      speaker: null,
      text: "The kiss is mutual and a little shy.",
      expression: "kissingMC",
    },
    { speaker: "Iris", text: "We should go before someone sees.", expression: "happy" },
    { speaker: null, text: "You agree." },
  ],
};

export const irisEvent1Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev1_intro: iris_ch2_ev1_intro,
  iris_ch2_ev1_sub_intro: iris_ch2_ev1_sub_intro,
  iris_ch2_ev1_sub_reassure: iris_ch2_ev1_sub_reassure,
  iris_ch2_ev1_sub_give_space: iris_ch2_ev1_sub_give_space,
  iris_ch2_ev1_sub_react_neutral: iris_ch2_ev1_sub_react_neutral,
  iris_ch2_ev1_sub_final_nice: iris_ch2_ev1_sub_final_nice,
  iris_ch2_ev1_sub_final_mean: iris_ch2_ev1_sub_final_mean,
  iris_ch2_ev1_sub_final_laugh: iris_ch2_ev1_sub_final_laugh,
  iris_ch2_ev1_dom_intro: iris_ch2_ev1_dom_intro,
  iris_ch2_ev1_dom_playful: iris_ch2_ev1_dom_playful,
  iris_ch2_ev1_dom_direct: iris_ch2_ev1_dom_direct,
  iris_ch2_ev1_dom_react_neutral: iris_ch2_ev1_dom_react_neutral,
  iris_ch2_ev1_dom_final_nice: iris_ch2_ev1_dom_final_nice,
  iris_ch2_ev1_dom_final_mean: iris_ch2_ev1_dom_final_mean,
  iris_ch2_ev1_dom_final_laugh: iris_ch2_ev1_dom_final_laugh,
  iris_ch2_ev1_neutral_dialogue: iris_ch2_ev1_neutral_dialogue,
  iris_ch2_ev1_neutral_react_nice: iris_ch2_ev1_neutral_react_nice,
  iris_ch2_ev1_neutral_react_mean: iris_ch2_ev1_neutral_react_mean,
  iris_ch2_ev1_neutral_react_neutral: iris_ch2_ev1_neutral_react_neutral,
  iris_ch2_ev1_neutral_final_nice: iris_ch2_ev1_neutral_final_nice,
  iris_ch2_ev1_neutral_final_mean: iris_ch2_ev1_neutral_final_mean,
  iris_ch2_ev1_neutral_final_laugh: iris_ch2_ev1_neutral_final_laugh,
};

export const irisEvent1Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev1",
    name: "The Morning After",
    description: "You see Iris for the first time since the kiss.",
    quest: { title: "The Morning After", description: "Find Iris at the university to clear the air." },
    priority: 190, repeatable: false,
    conditions: { requiredFlags: ["irisCh1FinaleComplete"], minAffection: 10, minLust: 10 },
    dialogue: iris_ch2_ev1_intro,
    rewards: { setFlags: ["irisCh2Ev1_Done"] },
  },
];
