import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Switch Flip
// Description: Ruby's mood shifts mid-session.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: ruby_ch1_ev3_switch_sub  (Gym, affection≥3, dominance≤3, rubyCh1Ev2Done)
//   ├─ [Okay. Call it. I'll follow.]   → ruby_ch1_ev3_sub_follow  → ruby_ch1_ev3_sub_after  END
//   ├─ [Yes, coach.]                   → ruby_ch1_ev3_sub_tease   → ruby_ch1_ev3_sub_after  END
//   └─ [Time out. Breathe.]            → ruby_ch1_ev3_sub_timeout → ruby_ch1_ev3_sub_after  END
//
// EVENT START: ruby_ch1_ev3_switch_dom  (Gym, affection≥3, dominance≥4, rubyCh1Ev2Done)
//   ├─ [Lead it. I'll keep up.]        → ruby_ch1_ev3_dom_follow  → ruby_ch1_ev3_dom_after  END
//   ├─ [Make me earn it.]              → ruby_ch1_ev3_dom_challenge → ruby_ch1_ev3_dom_after END
//   └─ [You're off. Breathe.]          → ruby_ch1_ev3_dom_reset   → ruby_ch1_ev3_dom_after  END
// Rewards: affection +1, rubyCh1Ev3Done
// ─────────────────────────────────────────────────────────────────────────────

// FROM: ruby_ch1_ev3_switch_sub → [Okay. Call it. I'll follow.]
const rubyCh1Ev3SubFollow: Dialogue = {
  id: "ruby_ch1_ev3_sub_follow",
  lines: [
    { speaker: "You", text: "Set the pace. I'll follow your count." },
    { speaker: "Ruby", text: "Yeah. Good.", expression: "neutral" },
    { speaker: null, text: "She nods once and squares up in front of you." },
    { speaker: "Ruby", text: "Four clean reps. Breathe on my count.", expression: "neutral" },
    { speaker: null, text: "You match her rhythm. Her breathing slowly syncs with yours." },
    { speaker: "Ruby", text: "There. That's clean.", expression: "happy" },
    { speaker: null, text: "The tension in her jaw finally eases." },
    {
      speaker: "Ruby",
      text: "Thanks for not turning that into drama.",
      expression: "neutral",
      nextDialogueId: "ruby_ch1_ev3_sub_after",
    },
  ],
};

// FROM: ruby_ch1_ev3_switch_sub → [Yes, coach.]
const rubyCh1Ev3SubTease: Dialogue = {
  id: "ruby_ch1_ev3_sub_tease",
  lines: [
    { speaker: "You", text: "Yes, coach. Boss me around if it helps." },
    { speaker: "Ruby", text: "You are impossible.", expression: "annoyed" },
    { speaker: null, text: "She tries not to smile, then gives up and smirks." },
    { speaker: "Ruby", text: "Fine. Eight reps. No whining.", expression: "happy" },
    { speaker: null, text: "You push through. She stays close, focused, steady." },
    { speaker: "Ruby", text: "Good. You listen better than most.", expression: "neutral" },
    { speaker: null, text: "By the last rep, her voice sounds more like herself again." },
    {
      speaker: "Ruby",
      text: "Okay... that actually helped.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev3_sub_after",
    },
  ],
};

// FROM: ruby_ch1_ev3_switch_sub → [Time out. Breathe.]
const rubyCh1Ev3SubTimeout: Dialogue = {
  id: "ruby_ch1_ev3_sub_timeout",
  lines: [
    { speaker: "You", text: "Pause. Water. Thirty seconds." },
    { speaker: "Ruby", text: "I'm fine.", expression: "annoyed" },
    { speaker: "You", text: "No. You're overloaded." },
    { speaker: null, text: "She stares at you, then surrenders with a tired exhale." },
    { speaker: "Ruby", text: "Yeah. Okay. Maybe a little.", expression: "sad" },
    { speaker: "You", text: "You don't have to power through every crack." },
    { speaker: "Ruby", text: "Habit. Bad one.", expression: "sad" },
    { speaker: "You", text: "Let's train clean, not frantic." },
    { speaker: "Ruby", text: "Clean. Right.", expression: "neutral" },
    {
      speaker: null,
      text: "She resets the weight lighter and nods for you to continue.",
      nextDialogueId: "ruby_ch1_ev3_sub_after",
    },
  ],
};

// FROM: ruby_ch1_ev3_sub_follow / ruby_ch1_ev3_sub_tease / ruby_ch1_ev3_sub_timeout → [auto-chain on Continue]
const rubyCh1Ev3SubAfter: Dialogue = {
  id: "ruby_ch1_ev3_sub_after",
  lines: [
    { speaker: null, text: "The session ends quieter than it started." },
    { speaker: null, text: "Ruby's phone lights up again on the bench. She flips it over." },
    { speaker: "Ruby", text: "I hate that one text can wreck my whole head.", expression: "sad" },
    { speaker: "You", text: "You noticed it. That's progress." },
    { speaker: "Ruby", text: "Maybe.", expression: "neutral" },
    { speaker: "Ruby", text: "Thanks for staying steady with me.", expression: "shy" },
    { speaker: "You", text: "Any time." },
    { speaker: null, text: "She bumps her shoulder lightly against yours." },
    { speaker: "Ruby", text: "Come by the bar sometime this week.", expression: "neutral" },
    { speaker: "Ruby", text: "I owe you one that doesn't involve burpees.", expression: "happy" },
  ],
};

// FROM: ruby_ch1_ev3_switch_dom → [Lead it. I'll keep up.]
const rubyCh1Ev3DomFollow: Dialogue = {
  id: "ruby_ch1_ev3_dom_follow",
  lines: [
    { speaker: "You", text: "Then control it. Start over and call every rep." },
    { speaker: "Ruby", text: "Right. Eyes up.", expression: "neutral" },
    { speaker: null, text: "She steps in close, voice low and exact." },
    { speaker: "Ruby", text: "Down. Hold. Drive.", expression: "angry" },
    { speaker: null, text: "You execute cleanly. She nods, satisfied." },
    { speaker: "Ruby", text: "That. That's what I needed.", expression: "happy" },
    { speaker: null, text: "Her intensity sharpens into focus instead of panic." },
    {
      speaker: "Ruby",
      text: "You don't flinch when I push. I like that.",
      expression: "neutral",
      nextDialogueId: "ruby_ch1_ev3_dom_after",
    },
  ],
};

// FROM: ruby_ch1_ev3_switch_dom → [Make me earn it.]
const rubyCh1Ev3DomChallenge: Dialogue = {
  id: "ruby_ch1_ev3_dom_challenge",
  lines: [
    { speaker: "You", text: "Push me harder. I can take it." },
    { speaker: "Ruby", text: "Careful what you ask for.", expression: "happy" },
    { speaker: null, text: "She adds weight with a quick, decisive motion." },
    { speaker: "Ruby", text: "Three heavy reps. Perfect form or we reset.", expression: "angry" },
    { speaker: null, text: "You grind through it. She doesn't look away once." },
    { speaker: "Ruby", text: "Good. Again.", expression: "angry" },
    { speaker: null, text: "By the final rep, both of you are breathing hard." },
    {
      speaker: "Ruby",
      text: "Yeah. That burned off the noise.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev3_dom_after",
    },
  ],
};

// FROM: ruby_ch1_ev3_switch_dom → [You're off. Breathe.]
const rubyCh1Ev3DomReset: Dialogue = {
  id: "ruby_ch1_ev3_dom_reset",
  lines: [
    { speaker: "You", text: "Stop. You're running hot." },
    { speaker: "Ruby", text: "I said I'm fine.", expression: "annoyed" },
    { speaker: "You", text: "No. Look at me and reset." },
    { speaker: null, text: "She freezes, then obeys, taking a slow breath." },
    { speaker: "Ruby", text: "Okay. Resetting.", expression: "neutral" },
    { speaker: "You", text: "Good. Now coach me, not your stress." },
    { speaker: "Ruby", text: "Right. Clean coaching.", expression: "neutral" },
    {
      speaker: null,
      text: "She strips one plate and motions for you to step back under the bar.",
      nextDialogueId: "ruby_ch1_ev3_dom_after",
    },
  ],
};

// FROM: ruby_ch1_ev3_dom_follow / ruby_ch1_ev3_dom_challenge / ruby_ch1_ev3_dom_reset → [auto-chain on Continue]
const rubyCh1Ev3DomAfter: Dialogue = {
  id: "ruby_ch1_ev3_dom_after",
  lines: [
    { speaker: null, text: "The workout ends with both of you flushed and keyed up." },
    { speaker: null, text: "Her phone buzzes again. She silences it without reading." },
    { speaker: "Ruby", text: "I hate that I let that get in my head.", expression: "annoyed" },
    { speaker: "You", text: "Then stop giving it power." },
    { speaker: "Ruby", text: "Working on it.", expression: "neutral" },
    { speaker: null, text: "She steps in close enough that her shoulder brushes yours." },
    { speaker: "Ruby", text: "Come find me at the bar this week.", expression: "happy" },
    { speaker: "Ruby", text: "Off the clock, I might even be fun.", expression: "happy" },
  ],
};

export const rubyEvent3Dialogues: Record<string, Dialogue> = {
  ruby_ch1_ev3_sub_follow: rubyCh1Ev3SubFollow,
  ruby_ch1_ev3_sub_tease: rubyCh1Ev3SubTease,
  ruby_ch1_ev3_sub_timeout: rubyCh1Ev3SubTimeout,
  ruby_ch1_ev3_sub_after: rubyCh1Ev3SubAfter,
  ruby_ch1_ev3_dom_follow: rubyCh1Ev3DomFollow,
  ruby_ch1_ev3_dom_challenge: rubyCh1Ev3DomChallenge,
  ruby_ch1_ev3_dom_reset: rubyCh1Ev3DomReset,
  ruby_ch1_ev3_dom_after: rubyCh1Ev3DomAfter,
};

export const rubyEvent3Events: CharacterEvent[] = [
  {
    id: "ruby_ch1_ev3_switch_sub",
    name: "Switch Flip",
    description: "Ruby's mood shifts mid-session.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 3,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev2Done"],
      maxDominance: 3,
    },
    dialogue: {
      id: "ruby_ch1_ev3_switch_sub",
      lines: [
        { speaker: null, text: "The gym is quieter today. Ruby is already there, moving fast." },
        { speaker: "Ruby", text: "You're late.", expression: "annoyed" },
        { speaker: null, text: "You are not, but she does not smile." },
        { speaker: "Ruby", text: "Warm up. Now.", expression: "angry" },
        { speaker: null, text: "Her phone sits face down on a bench, screen lighting up every few seconds." },
        { speaker: "You", text: "Rough day?" },
        { speaker: "Ruby", text: "Just work. Let's go.", expression: "neutral" },
        { speaker: null, text: "She loads the bar heavier than last session." },
        { speaker: "Ruby", text: "Under it.", expression: "angry" },
        { speaker: null, text: "Her cues are sharp and clipped." },
        { speaker: "Ruby", text: "Down. Up. Again.", expression: "angry" },
        { speaker: "You", text: "Ruby, that's heavy." },
        { speaker: "Ruby", text: "Then get stronger.", expression: "angry" },
        { speaker: null, text: "The edge in her voice is new." },
        { speaker: null, text: "You finish the rep and rack the bar." },
        { speaker: "Ruby", text: "Again.", expression: "angry" },
        { speaker: null, text: "She stops herself, jaw tight." },
        { speaker: "Ruby", text: "Sorry. I'm... not great today.", expression: "sad" },
        { speaker: null, text: "She grips the rack like it is holding her up." },
        { speaker: "Ruby", text: "I just need this to be right.", expression: "neutral" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Okay. Call it. I'll follow.",
              affectionChange: 0,
              lustChange: 0,
              dominanceChange: 1,
              nextDialogueId: "ruby_ch1_ev3_sub_follow",
            },
            {
              text: "Yes, coach.",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 2,
              nextDialogueId: "ruby_ch1_ev3_sub_tease",
            },
            {
              text: "Time out. Breathe.",
              affectionChange: 1,
              lustChange: 0,
              dominanceChange: -1,
              nextDialogueId: "ruby_ch1_ev3_sub_timeout",
            },
          ],
        },
      ],
    },
    rewards: {
      girlStats: { affection: 1 },
      setFlags: ["rubyCh1Ev3Done"],
    },
  },
  {
    id: "ruby_ch1_ev3_switch_dom",
    name: "Switch Flip",
    description: "Ruby's mood shifts mid-session.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 3,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev2Done"],
      minDominance: 4,
    },
    dialogue: {
      id: "ruby_ch1_ev3_switch_dom",
      lines: [
        { speaker: null, text: "Ruby meets you at the rack, hair tied back, eyes sharp." },
        { speaker: "Ruby", text: "No warm-up talk today. We work.", expression: "angry" },
        { speaker: null, text: "Her phone buzzes in her bag. She ignores it." },
        { speaker: "Ruby", text: "Under the bar.", expression: "angry" },
        { speaker: null, text: "She sets the weight heavier than usual." },
        { speaker: "You", text: "That is a jump." },
        { speaker: "Ruby", text: "You can take it.", expression: "angry" },
        { speaker: null, text: "Her tone is commanding, not playful." },
        { speaker: "Ruby", text: "Down. Up. Again.", expression: "angry" },
        { speaker: null, text: "The set burns. She does not ease off." },
        { speaker: "Ruby", text: "Don't drift. Focus.", expression: "angry" },
        { speaker: "You", text: "You are intense today." },
        { speaker: "Ruby", text: "Good. I need you focused.", expression: "neutral" },
        { speaker: null, text: "Her jaw is tight." },
        { speaker: "Ruby", text: "Just do it right.", expression: "angry" },
        { speaker: null, text: "You rack the bar and breathe." },
        { speaker: "Ruby", text: "Again.", expression: "angry" },
        { speaker: null, text: "She catches herself, eyes flashing." },
        { speaker: "Ruby", text: "Sorry. I'm pushing too hard.", expression: "sad" },
        { speaker: null, text: "She shakes out her hands, trying to reset." },
        { speaker: "Ruby", text: "I just... need it clean.", expression: "neutral" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Lead it. I'll keep up.",
              affectionChange: 0,
              lustChange: 0,
              dominanceChange: 1,
              nextDialogueId: "ruby_ch1_ev3_dom_follow",
            },
            {
              text: "Make me earn it.",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 2,
              nextDialogueId: "ruby_ch1_ev3_dom_challenge",
            },
            {
              text: "You're off. Breathe.",
              affectionChange: 1,
              lustChange: 0,
              dominanceChange: -1,
              nextDialogueId: "ruby_ch1_ev3_dom_reset",
            },
          ],
        },
      ],
    },
    rewards: {
      girlStats: { affection: 1 },
      setFlags: ["rubyCh1Ev3Done"],
    },
  },
];
