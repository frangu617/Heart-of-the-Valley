import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Switch Flip
// Description: Ruby's mood shifts mid-session.

const rubyCh1Ev3SubFollow: Dialogue = {
  id: "ruby_ch1_ev3_sub_follow",
  lines: [
    { speaker: "You", text: "Okay. Call it. I'll follow." },
    { speaker: "Ruby", text: "Good.", expression: "neutral" },
    { speaker: null, text: "She counts you through the set, voice tight but steady." },
    { speaker: "Ruby", text: "Don't drift.", expression: "angry" },
    { speaker: null, text: "You lock in and finish." },
    { speaker: "Ruby", text: "There. That's better.", expression: "neutral" },
    { speaker: null, text: "Her shoulders drop a fraction." },
    {
      speaker: "Ruby",
      text: "Thanks for not making it a thing.",
      expression: "shy",
      nextDialogueId: "ruby_ch1_ev3_sub_after",
    },
  ],
};

const rubyCh1Ev3SubTease: Dialogue = {
  id: "ruby_ch1_ev3_sub_tease",
  lines: [
    { speaker: "You", text: "Yes, coach." },
    { speaker: "Ruby", text: "Don't make me smile right now.", expression: "annoyed" },
    { speaker: null, text: "She tries not to, fails." },
    { speaker: "Ruby", text: "Five more. Earn it.", expression: "angry" },
    { speaker: null, text: "You move. She counts under her breath." },
    { speaker: "Ruby", text: "Good. Again.", expression: "neutral" },
    { speaker: null, text: "She shakes out her hands." },
    {
      speaker: "Ruby",
      text: "Okay. That helped.",
      expression: "shy",
      nextDialogueId: "ruby_ch1_ev3_sub_after",
    },
  ],
};

const rubyCh1Ev3SubTimeout: Dialogue = {
  id: "ruby_ch1_ev3_sub_timeout",
  lines: [
    { speaker: "You", text: "Time out. Breathe." },
    { speaker: "Ruby", text: "I'm fine.", expression: "annoyed" },
    { speaker: "You", text: "You're not. Reset with me." },
    { speaker: null, text: "She exhales and nods once." },
    { speaker: "Ruby", text: "Sorry. I snapped.", expression: "sad" },
    { speaker: "You", text: "We can slow it down." },
    { speaker: "Ruby", text: "Yeah. Let's... fix it.", expression: "neutral" },
    {
      speaker: null,
      text: "She adjusts the plates, a little gentler now.",
      nextDialogueId: "ruby_ch1_ev3_sub_after",
    },
  ],
};

const rubyCh1Ev3SubAfter: Dialogue = {
  id: "ruby_ch1_ev3_sub_after",
  lines: [
    { speaker: null, text: "The session winds down in sweat and silence." },
    { speaker: "Ruby", text: "I shouldn't take it out on you.", expression: "sad" },
    { speaker: "Ruby", text: "I'm trying to be better at... everything.", expression: "neutral" },
    { speaker: "You", text: "You don't have to be perfect." },
    { speaker: "Ruby", text: "Feels like I do.", expression: "sad" },
    { speaker: null, text: "She forces a grin that does not quite land." },
    { speaker: "Ruby", text: "Same time next week?", expression: "neutral" },
    { speaker: "You", text: "Yeah." },
  ],
};

const rubyCh1Ev3DomFollow: Dialogue = {
  id: "ruby_ch1_ev3_dom_follow",
  lines: [
    { speaker: "You", text: "Lead it. I'll keep up." },
    { speaker: "Ruby", text: "Good.", expression: "neutral" },
    { speaker: null, text: "She counts you through the set, voice sharp and sure." },
    { speaker: "Ruby", text: "Don't drift.", expression: "angry" },
    { speaker: null, text: "You lock in and finish." },
    { speaker: "Ruby", text: "There. That's the line.", expression: "neutral" },
    { speaker: null, text: "She exhales slowly." },
    {
      speaker: "Ruby",
      text: "Thanks for keeping up.",
      expression: "shy",
      nextDialogueId: "ruby_ch1_ev3_dom_after",
    },
  ],
};

const rubyCh1Ev3DomChallenge: Dialogue = {
  id: "ruby_ch1_ev3_dom_challenge",
  lines: [
    { speaker: "You", text: "Make me earn it." },
    { speaker: "Ruby", text: "Don't tempt me.", expression: "angry" },
    { speaker: null, text: "Her eyes flash, then soften for a beat." },
    { speaker: "Ruby", text: "Five more. No excuses.", expression: "angry" },
    { speaker: null, text: "You grind them out." },
    { speaker: "Ruby", text: "Good. Again.", expression: "neutral" },
    { speaker: null, text: "She shakes out her hands, tension easing." },
    {
      speaker: "Ruby",
      text: "Okay. That helped.",
      expression: "shy",
      nextDialogueId: "ruby_ch1_ev3_dom_after",
    },
  ],
};

const rubyCh1Ev3DomReset: Dialogue = {
  id: "ruby_ch1_ev3_dom_reset",
  lines: [
    { speaker: "You", text: "You're off. Breathe." },
    { speaker: "Ruby", text: "I'm fine.", expression: "annoyed" },
    { speaker: "You", text: "You're not. Reset with me." },
    { speaker: null, text: "She exhales and nods once." },
    { speaker: "Ruby", text: "Sorry. I'm pushing too hard.", expression: "sad" },
    { speaker: "You", text: "We can slow it down." },
    { speaker: "Ruby", text: "Yeah. Let's clean it up.", expression: "neutral" },
    {
      speaker: null,
      text: "She adjusts the plates, a little gentler now.",
      nextDialogueId: "ruby_ch1_ev3_dom_after",
    },
  ],
};

const rubyCh1Ev3DomAfter: Dialogue = {
  id: "ruby_ch1_ev3_dom_after",
  lines: [
    { speaker: null, text: "The session winds down in sweat and silence." },
    { speaker: "Ruby", text: "I shouldn't take it out on you.", expression: "sad" },
    { speaker: "Ruby", text: "I'm trying to be better at... everything.", expression: "neutral" },
    { speaker: "You", text: "You don't have to be perfect." },
    { speaker: "Ruby", text: "Feels like I do.", expression: "sad" },
    { speaker: null, text: "She forces a grin that does not quite land." },
    { speaker: "Ruby", text: "Same time next week?", expression: "neutral" },
    { speaker: "You", text: "Yeah." },
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
