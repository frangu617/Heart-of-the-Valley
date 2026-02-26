import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: Extra Shift
// Description: You find Ruby bartending at night.

const rubyCh1Ev4SubCare: Dialogue = {
  id: "ruby_ch1_ev4_sub_care",
  lines: [
    { speaker: "You", text: "Sit for two minutes. No customers, no fixing anything." },
    { speaker: "Ruby", text: "Two minutes?" },
    { speaker: "You", text: "Two." },
    { speaker: null, text: "She hesitates, then finally drops onto the stool beside you." },
    { speaker: "Ruby", text: "I don't really stop moving. Ever.", expression: "sad" },
    { speaker: "You", text: "Maybe start tonight." },
    { speaker: null, text: "She rubs at a water ring on the bar and nods." },
    { speaker: "Ruby", text: "Tomorrow I talk to him. For real this time.", expression: "neutral" },
    { speaker: "Ruby", text: "If I do it... will you still show up after?", expression: "shy" },
    { speaker: "You", text: "Yes." },
    {
      speaker: null,
      text: "She exhales like she has been holding that question for weeks.",
      nextDialogueId: "ruby_ch1_ev4_sub_after",
    },
  ],
};

const rubyCh1Ev4SubTease: Dialogue = {
  id: "ruby_ch1_ev4_sub_tease",
  lines: [
    { speaker: "You", text: "You deserve one night that's not damage control." },
    { speaker: "Ruby", text: "Sounds fake. I don't even remember what that looks like.", expression: "sad" },
    { speaker: "You", text: "Easy. You ask me out and stop apologizing for existing." },
    { speaker: null, text: "She barks out a surprised laugh." },
    { speaker: "Ruby", text: "Wow. Bold.", expression: "happy" },
    { speaker: "You", text: "Try it." },
    { speaker: "Ruby", text: "Fine. Date me tomorrow night.", expression: "happy" },
    { speaker: null, text: "She says it fast, then blushes." },
    { speaker: "Ruby", text: "Assuming tomorrow goes... okay.", expression: "neutral" },
    {
      speaker: "Ruby",
      text: "I need to end something first.",
      expression: "sad",
      nextDialogueId: "ruby_ch1_ev4_sub_after",
    },
  ],
};

const rubyCh1Ev4SubRespect: Dialogue = {
  id: "ruby_ch1_ev4_sub_respect",
  lines: [
    { speaker: "You", text: "If he keeps cutting you down, you can walk." },
    { speaker: "Ruby", text: "Walk. Just like that?", expression: "surprised" },
    { speaker: "You", text: "Yeah. You don't owe endless chances to someone hurting you." },
    { speaker: null, text: "Ruby stares at the liquor shelf, quiet for a long beat." },
    { speaker: "Ruby", text: "I keep waiting for the version of him from the beginning.", expression: "sad" },
    { speaker: "You", text: "How long has that version been gone?" },
    { speaker: null, text: "She does not answer, which is answer enough." },
    { speaker: "Ruby", text: "Tomorrow. I'll talk to him tomorrow.", expression: "neutral" },
    {
      speaker: "Ruby",
      text: "And then maybe I finally choose me.",
      expression: "neutral",
      nextDialogueId: "ruby_ch1_ev4_sub_after",
    },
  ],
};

const rubyCh1Ev4SubAfter: Dialogue = {
  id: "ruby_ch1_ev4_sub_after",
  lines: [
    { speaker: null, text: "She pours you a soda and keeps one for herself." },
    { speaker: "Ruby", text: "Tomorrow night. After I handle him.", expression: "neutral" },
    { speaker: "Ruby", text: "Real date. No panic spiral. No emergency rescue.", expression: "shy" },
    { speaker: "You", text: "I'll be there." },
    { speaker: "Ruby", text: "Good. Hold me to it.", expression: "happy" },
    { speaker: null, text: "She heads back to the rush, but her smile looks genuine this time." },
  ],
};

const rubyCh1Ev4DomCare: Dialogue = {
  id: "ruby_ch1_ev4_dom_care",
  lines: [
    { speaker: "You", text: "You're done auditioning for his approval." },
    { speaker: "Ruby", text: "Straight to the point, huh?", expression: "surprised" },
    { speaker: "You", text: "You already know this is broken." },
    { speaker: null, text: "She studies your face, then gives a small, tense nod." },
    { speaker: "Ruby", text: "He wants to talk tomorrow before my shift.", expression: "neutral" },
    { speaker: "Ruby", text: "Part of me wants to cave before it even starts.", expression: "sad" },
    { speaker: "You", text: "Don't cave." },
    { speaker: null, text: "Her eyes sharpen at the command in your tone." },
    {
      speaker: "Ruby",
      text: "Okay. Tomorrow, I end it.",
      expression: "neutral",
      nextDialogueId: "ruby_ch1_ev4_dom_after",
    },
  ],
};

const rubyCh1Ev4DomTease: Dialogue = {
  id: "ruby_ch1_ev4_dom_tease",
  lines: [
    { speaker: "You", text: "Clock out after this round. We're taking the night back." },
    { speaker: "Ruby", text: "Bossy.", expression: "happy" },
    { speaker: "You", text: "Effective." },
    { speaker: null, text: "She laughs, bright and breathless." },
    { speaker: "Ruby", text: "You know I still have responsibilities, right?", expression: "neutral" },
    { speaker: "You", text: "Then finish this set and choose yourself for once." },
    { speaker: null, text: "She bites her lip, considering." },
    { speaker: "Ruby", text: "Tomorrow. I handle him, then I want that night.", expression: "neutral" },
    {
      speaker: "Ruby",
      text: "No backing out.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev4_dom_after",
    },
  ],
};

const rubyCh1Ev4DomRespect: Dialogue = {
  id: "ruby_ch1_ev4_dom_respect",
  lines: [
    { speaker: "You", text: "Ask me out right now. No maybes." },
    { speaker: "Ruby", text: "Right now?" },
    { speaker: "You", text: "Right now." },
    { speaker: null, text: "She leans on the bar, staring at you with a slow grin." },
    { speaker: "Ruby", text: "Okay. Date tomorrow night.", expression: "happy" },
    { speaker: "Ruby", text: "But first I end it with him. No half-step this time.", expression: "neutral" },
    { speaker: "You", text: "Good." },
    {
      speaker: "Ruby",
      text: "You really don't let me hide, do you?",
      expression: "shy",
      nextDialogueId: "ruby_ch1_ev4_dom_after",
    },
  ],
};

const rubyCh1Ev4DomAfter: Dialogue = {
  id: "ruby_ch1_ev4_dom_after",
  lines: [
    { speaker: null, text: "She slides a drink over, fingers brushing yours for a beat." },
    { speaker: "Ruby", text: "Tomorrow night. After I cut him loose.", expression: "neutral" },
    { speaker: "Ruby", text: "Then we celebrate. Loudly.", expression: "happy" },
    { speaker: "You", text: "I'll hold you to that." },
    { speaker: "Ruby", text: "Please do.", expression: "happy" },
    { speaker: null, text: "She turns back to the crowd, moving with new purpose." },
  ],
};

export const rubyEvent4Dialogues: Record<string, Dialogue> = {
  ruby_ch1_ev4_sub_care: rubyCh1Ev4SubCare,
  ruby_ch1_ev4_sub_tease: rubyCh1Ev4SubTease,
  ruby_ch1_ev4_sub_respect: rubyCh1Ev4SubRespect,
  ruby_ch1_ev4_sub_after: rubyCh1Ev4SubAfter,
  ruby_ch1_ev4_dom_care: rubyCh1Ev4DomCare,
  ruby_ch1_ev4_dom_tease: rubyCh1Ev4DomTease,
  ruby_ch1_ev4_dom_respect: rubyCh1Ev4DomRespect,
  ruby_ch1_ev4_dom_after: rubyCh1Ev4DomAfter,
};

export const rubyEvent4Events: CharacterEvent[] = [
  {
    id: "ruby_ch1_ev4_bar_sub",
    name: "Extra Shift",
    description: "You find Ruby bartending at night.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minHour: 22,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev3Done"],
      maxDominance: 3,
    },
    dialogue: {
      id: "ruby_ch1_ev4_bar_sub",
      lines: [
        { speaker: null, text: "The bar is warm and noisy, packed with post-work regulars." },
        { speaker: null, text: "Ruby moves behind the counter in a black apron, all practiced speed." },
        { speaker: "Ruby", text: "Hey. You made it.", expression: "happy" },
        { speaker: null, text: "She smiles, but her eyes look tired." },
        { speaker: "You", text: "Long shift?" },
        { speaker: "Ruby", text: "Gym in the morning, here at night. Normal week.", expression: "neutral" },
        { speaker: null, text: "Her phone buzzes. She glances down and her smile thins." },
        { speaker: "Ruby", text: "He wants to 'review my priorities' tomorrow.", expression: "sad" },
        { speaker: "You", text: "Your boyfriend?" },
        { speaker: "Ruby", text: "Yeah.", expression: "neutral" },
        { speaker: "Ruby", text: "I keep trying to be easier to love. It never sticks.", expression: "sad" },
        { speaker: null, text: "She sets a water in front of you, hand shaking just slightly." },
        {
          speaker: "Ruby",
          text: "What do you think I should do?",
          expression: "neutral",
          choices: [
            {
              text: "Sit down and breathe with me for two minutes.",
              affectionChange: 2,
              lustChange: 0,
              dominanceChange: -1,
              nextDialogueId: "ruby_ch1_ev4_sub_care",
            },
            {
              text: "You deserve a night that is not damage control.",
              affectionChange: 1,
              lustChange: 1,
              dominanceChange: 0,
              nextDialogueId: "ruby_ch1_ev4_sub_tease",
            },
            {
              text: "If he keeps cutting you down, you can walk.",
              affectionChange: 1,
              lustChange: 0,
              dominanceChange: 1,
              nextDialogueId: "ruby_ch1_ev4_sub_respect",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["rubyCh1Ev4Done"],
    },
  },
  {
    id: "ruby_ch1_ev4_bar_dom",
    name: "Extra Shift",
    description: "You find Ruby bartending at night.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minHour: 22,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev3Done"],
      minDominance: 4,
    },
    dialogue: {
      id: "ruby_ch1_ev4_bar_dom",
      lines: [
        { speaker: null, text: "The bar is packed and loud, lights strobing across polished bottles." },
        { speaker: null, text: "Ruby owns the room until her phone buzzes and her posture tightens." },
        { speaker: "Ruby", text: "Hey. You picked a chaotic night.", expression: "happy" },
        { speaker: "You", text: "You look wired." },
        { speaker: "Ruby", text: "Tomorrow he wants to meet before my shift.", expression: "neutral" },
        { speaker: "Ruby", text: "His words, not mine: 'You owe me a reset.'", expression: "annoyed" },
        { speaker: null, text: "She laughs, but there is no humor in it." },
        { speaker: "Ruby", text: "Part of me still wants to fix it. That's the worst part.", expression: "sad" },
        {
          speaker: "Ruby",
          text: "Say something before I talk myself out of it.",
          expression: "neutral",
          choices: [
            {
              text: "You're done auditioning for him.",
              affectionChange: 1,
              lustChange: 0,
              dominanceChange: 2,
              nextDialogueId: "ruby_ch1_ev4_dom_care",
            },
            {
              text: "Clock out after this round. We take the night back.",
              affectionChange: 0,
              lustChange: 2,
              dominanceChange: 1,
              nextDialogueId: "ruby_ch1_ev4_dom_tease",
            },
            {
              text: "Ask me out right now. No maybes.",
              affectionChange: 1,
              lustChange: 1,
              dominanceChange: 2,
              nextDialogueId: "ruby_ch1_ev4_dom_respect",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["rubyCh1Ev4Done"],
    },
  },
];
