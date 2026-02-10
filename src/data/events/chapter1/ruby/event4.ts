import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: Extra Shift
// Description: You find Ruby bartending at night.

const rubyCh1Ev4SubCare: Dialogue = {
  id: "ruby_ch1_ev4_sub_care",
  lines: [
    { speaker: "You", text: "You don't have to earn kindness, Ruby." },
    { speaker: "Ruby", text: "I know. I just...", expression: "sad" },
    { speaker: null, text: "She stops, searching for the right words." },
    { speaker: "Ruby", text: "I want things to be good.", expression: "neutral" },
    { speaker: "You", text: "They should be good without you breaking yourself." },
    { speaker: null, text: "She nods, but the habit of smiling stays." },
    { speaker: "Ruby", text: "You're sweet. Don't get used to it.", expression: "happy" },
    {
      speaker: null,
      text: "She sets a glass in front of you.",
      nextDialogueId: "ruby_ch1_ev4_sub_after",
    },
  ],
};

const rubyCh1Ev4SubTease: Dialogue = {
  id: "ruby_ch1_ev4_sub_tease",
  lines: [
    { speaker: "You", text: "So you moonlight as a bartender too?" },
    { speaker: "Ruby", text: "Hey, I contain multitudes.", expression: "happy" },
    { speaker: null, text: "She smirks, a little lighter." },
    { speaker: "Ruby", text: "It pays, and I can handle a crowd.", expression: "neutral" },
    { speaker: "You", text: "You can handle anything." },
    { speaker: "Ruby", text: "That's the goal.", expression: "neutral" },
    { speaker: null, text: "The smile fades as quickly as it came." },
    {
      speaker: "Ruby",
      text: "Thanks for the distraction.",
      expression: "shy",
      nextDialogueId: "ruby_ch1_ev4_sub_after",
    },
  ],
};

const rubyCh1Ev4SubRespect: Dialogue = {
  id: "ruby_ch1_ev4_sub_respect",
  lines: [
    { speaker: "You", text: "If you want to work, I won't stop you." },
    { speaker: "Ruby", text: "Yeah. I just need to do more.", expression: "neutral" },
    { speaker: null, text: "She looks down at the bar, jaw tight." },
    { speaker: "Ruby", text: "More shifts. More effort. More everything.", expression: "neutral" },
    { speaker: "You", text: "Just don't burn out." },
    { speaker: "Ruby", text: "I can handle it.", expression: "neutral" },
    { speaker: null, text: "Her smile wavers." },
    {
      speaker: "Ruby",
      text: "I have to.",
      expression: "sad",
      nextDialogueId: "ruby_ch1_ev4_sub_after",
    },
  ],
};

const rubyCh1Ev4SubAfter: Dialogue = {
  id: "ruby_ch1_ev4_sub_after",
  lines: [
    { speaker: null, text: "She pours the drink and slides it over." },
    { speaker: "Ruby", text: "Don't tell anyone I'm soft tonight.", expression: "shy" },
    { speaker: "You", text: "Your secret is safe." },
    { speaker: "Ruby", text: "Good. I have a reputation.", expression: "happy" },
    { speaker: null, text: "She turns to the next customer, but glances back." },
    { speaker: null, text: "The smile does not quite reach her eyes." },
  ],
};

const rubyCh1Ev4DomCare: Dialogue = {
  id: "ruby_ch1_ev4_dom_care",
  lines: [
    { speaker: "You", text: "You don't have to earn kindness, Ruby." },
    { speaker: "Ruby", text: "Maybe. But I still want to.", expression: "neutral" },
    { speaker: null, text: "She shrugs like it is obvious." },
    { speaker: "Ruby", text: "Effort is clean. Effort makes sense.", expression: "neutral" },
    { speaker: "You", text: "So does resting." },
    { speaker: "Ruby", text: "Rest is for when I'm done.", expression: "neutral" },
    { speaker: null, text: "She slides a drink over with a practiced grin." },
    {
      speaker: "Ruby",
      text: "You're sweet. Don't get used to it.",
      expression: "happy",
      nextDialogueId: "ruby_ch1_ev4_dom_after",
    },
  ],
};

const rubyCh1Ev4DomTease: Dialogue = {
  id: "ruby_ch1_ev4_dom_tease",
  lines: [
    { speaker: "You", text: "So you moonlight as a bartender too?" },
    { speaker: "Ruby", text: "Hey, I contain multitudes.", expression: "happy" },
    { speaker: null, text: "She smirks, a little lighter." },
    { speaker: "Ruby", text: "It pays, and I can handle a crowd.", expression: "neutral" },
    { speaker: "You", text: "You can handle anything." },
    { speaker: "Ruby", text: "That's the goal.", expression: "neutral" },
    { speaker: null, text: "The smile fades as quickly as it came." },
    {
      speaker: "Ruby",
      text: "Thanks for the distraction.",
      expression: "shy",
      nextDialogueId: "ruby_ch1_ev4_dom_after",
    },
  ],
};

const rubyCh1Ev4DomRespect: Dialogue = {
  id: "ruby_ch1_ev4_dom_respect",
  lines: [
    { speaker: "You", text: "If you want to work, I won't stop you." },
    { speaker: "Ruby", text: "Exactly.", expression: "neutral" },
    { speaker: null, text: "She nods once, approval flickering." },
    { speaker: "Ruby", text: "I can handle it. I just need the hours.", expression: "neutral" },
    { speaker: "You", text: "Just don't burn out." },
    { speaker: "Ruby", text: "I won't.", expression: "neutral" },
    { speaker: null, text: "Her smile wavers for a beat." },
    {
      speaker: "Ruby",
      text: "I can't.",
      expression: "sad",
      nextDialogueId: "ruby_ch1_ev4_dom_after",
    },
  ],
};

const rubyCh1Ev4DomAfter: Dialogue = {
  id: "ruby_ch1_ev4_dom_after",
  lines: [
    { speaker: null, text: "She pours the drink and slides it over." },
    { speaker: "Ruby", text: "Don't tell anyone I'm soft tonight.", expression: "shy" },
    { speaker: "You", text: "Your secret is safe." },
    { speaker: "Ruby", text: "Good. I have a reputation.", expression: "happy" },
    { speaker: null, text: "She turns to the next customer, but glances back." },
    { speaker: null, text: "The smile does not quite reach her eyes." },
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
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev3Done"],
      maxDominance: 3,
    },
    dialogue: {
      id: "ruby_ch1_ev4_bar_sub",
      lines: [
        { speaker: null, text: "The bar is loud and warm, all neon and chatter." },
        { speaker: null, text: "Ruby is behind the counter in a black apron, shaking a mixer." },
        { speaker: "Ruby", text: "Hey! What are you doing here?", expression: "happy" },
        { speaker: "You", text: "You work here?" },
        { speaker: "Ruby", text: "Tonight, yeah.", expression: "neutral" },
        {
          speaker: "Ruby",
          text: "Gym pay is fine, but not enough if I want to do everything right.",
          expression: "neutral",
        },
        { speaker: null, text: "She tries to laugh it off, but the smile is thin." },
        { speaker: "Ruby", text: "I like keeping busy.", expression: "neutral" },
        { speaker: "You", text: "You look tired." },
        { speaker: "Ruby", text: "I'm fine. Just a long week.", expression: "neutral" },
        { speaker: null, text: "She slides you a water without asking." },
        { speaker: "Ruby", text: "He says I mess up the little stuff.", expression: "sad" },
        { speaker: "Ruby", text: "If I pick up more shifts, maybe he relaxes.", expression: "sad" },
        { speaker: null, text: "She stares at the glass like it has answers." },
        { speaker: "Ruby", text: "That sounds dumb when I say it.", expression: "sad" },
        { speaker: "You", text: "It doesn't." },
        { speaker: "Ruby", text: "It kind of does.", expression: "sad" },
        { speaker: null, text: "She straightens, bright smile back in place." },
        {
          speaker: "Ruby",
          text: "So, what do you want?",
          expression: "happy",
          choices: [
            {
              text: "You don't have to earn kindness, Ruby.",
              affectionChange: 2,
              lustChange: 0,
              dominanceChange: -1,
              nextDialogueId: "ruby_ch1_ev4_sub_care",
            },
            {
              text: "So you moonlight as a bartender too?",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 1,
              nextDialogueId: "ruby_ch1_ev4_sub_tease",
            },
            {
              text: "If you want to work, I won't stop you.",
              affectionChange: 0,
              lustChange: 0,
              dominanceChange: 2,
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
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["rubyTrainerAccepted", "rubyCh1Ev3Done"],
      minDominance: 4,
    },
    dialogue: {
      id: "ruby_ch1_ev4_bar_dom",
      lines: [
        { speaker: null, text: "The bar is loud and warm, all neon and chatter." },
        { speaker: null, text: "Ruby is behind the counter in a black apron, shaking a mixer." },
        { speaker: "Ruby", text: "Hey! What are you doing here?", expression: "happy" },
        { speaker: "You", text: "You work here?" },
        { speaker: "Ruby", text: "Tonight, yeah.", expression: "neutral" },
        {
          speaker: "Ruby",
          text: "Gym pay is fine, but not enough if I want to do everything right.",
          expression: "neutral",
        },
        { speaker: null, text: "She tries to laugh it off, but the smile is thin." },
        { speaker: "Ruby", text: "I like keeping busy.", expression: "neutral" },
        { speaker: "You", text: "You look tired." },
        { speaker: "Ruby", text: "I'm fine. Just a long week.", expression: "neutral" },
        { speaker: null, text: "She slides you a water without asking." },
        { speaker: "Ruby", text: "He says I mess up the little stuff.", expression: "sad" },
        { speaker: "Ruby", text: "If I pick up more shifts, maybe he relaxes.", expression: "sad" },
        { speaker: null, text: "She stares at the glass like it has answers." },
        { speaker: "Ruby", text: "That sounds dumb when I say it.", expression: "sad" },
        { speaker: "You", text: "It doesn't." },
        { speaker: "Ruby", text: "It kind of does.", expression: "sad" },
        { speaker: null, text: "She straightens, bright smile back in place." },
        {
          speaker: "Ruby",
          text: "So, what do you want?",
          expression: "happy",
          choices: [
            {
              text: "You don't have to earn kindness, Ruby.",
              affectionChange: 2,
              lustChange: 0,
              dominanceChange: -1,
              nextDialogueId: "ruby_ch1_ev4_dom_care",
            },
            {
              text: "So you moonlight as a bartender too?",
              affectionChange: 0,
              lustChange: 1,
              dominanceChange: 1,
              nextDialogueId: "ruby_ch1_ev4_dom_tease",
            },
            {
              text: "If you want to work, I won't stop you.",
              affectionChange: 0,
              lustChange: 0,
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
