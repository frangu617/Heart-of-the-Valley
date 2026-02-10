import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Hallway Intro
// Description: Meet Gwen for the first time in the hallway.

const gwenIntroPlayAlong: Dialogue = {
  id: "gwen_intro_play_along",
  lines: [
    { speaker: "You", text: "I was going to ask what the price was." },
    { speaker: "Gwen", text: "See? It's working already.", expression: "annoyed" },
    { speaker: null, text: "She checks you with a quick, appraising look." },
    {
      speaker: "Gwen",
      text: "Alright, mystery neighbor. You're a good sport.",
      expression: "happy",
      nextDialogueId: "gwen_intro_after_choice",
    },
  ],
};

const gwenIntroCallOut: Dialogue = {
  id: "gwen_intro_call_out",
  lines: [
    { speaker: "You", text: "You don't have to run a line on me. Just tell me what you need." },
    {
      speaker: "Gwen",
      text: "I do what works. Saves time and gets answers.",
      expression: "annoyed",
    },
    {
      speaker: "Gwen",
      text: "I keep weird hours. I prefer the neighbor knowing that up front.",
      expression: "neutral",
      nextDialogueId: "gwen_intro_after_choice",
    },
  ],
};

const gwenIntroNeighborly: Dialogue = {
  id: "gwen_intro_neighborly",
  lines: [
    { speaker: "You", text: "No worries. I'm not the complaint type." },
    { speaker: "Gwen", text: "Good. I'll keep the power tools to a minimum.", expression: "happy" },
    {
      speaker: "Gwen",
      text: "You and I will get along just fine.",
      expression: "neutral",
      nextDialogueId: "gwen_intro_after_choice",
    },
  ],
};

const gwenIntroAfterChoice: Dialogue = {
  id: "gwen_intro_after_choice",
  lines: [
    {
      speaker: "Gwen",
      text: "Let's reset. Neighborly help is free. The other stuff depends on my mood.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "And what do you do when you're not rescuing neighbors?",
    },
    {
      speaker: "Gwen",
      text: "Night shift work. Lots of music. Lots of lights.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Lot of people who don't know how to look without staring.",
      expression: "annoyed",
    },
    { speaker: "You", text: "That sounds... busy." },
    {
      speaker: "Gwen",
      text: "Oh, it is. But it pays the rent and the weird hobbies.",
      expression: "excited",
    },
    {
      speaker: "Gwen",
      text: "You'll probably hear me coming home at dumb hours sometimes. Just pretend I'm a very normal, very responsible adult.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I won't judge your hours if you don't judge mine.",
    },
    { speaker: "Gwen", text: "Deal.", expression: "happy" },
    {
      speaker: "Gwen",
      text: "Anyway... welcome to the building, mystery neighbor.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Try not to stay one for too long.",
      expression: "happy",
    },
  ],
};

export const gwenEvent1Dialogues: Record<string, Dialogue> = {
  gwen_intro_play_along: gwenIntroPlayAlong,
  gwen_intro_call_out: gwenIntroCallOut,
  gwen_intro_neighborly: gwenIntroNeighborly,
  gwen_intro_after_choice: gwenIntroAfterChoice,
};

export const gwenEvent1Events: CharacterEvent[] = [
  {
    id: "gwen_hallway_intro_event",
    name: "Hallway Intro",
    description: "Meet Gwen for the first time in the hallway.",
    quest: {
      title: "Meet the Neighbor",
      description:
        "Check the hallway after you've met Iris, Yumi, and Ruby.",
    },
    priority: 240,
    repeatable: false,
    conditions: {
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["hasMetIris", "hasMetYumi", "hasMetRuby"],
    },
    dialogue: {
      id: "gwen_hallway_intro_event",
      lines: [
        {
          speaker: null,
          text: "You push open the door to your building's hallway and nearly collide with someone stepping out at the same time.",
        },
        {
          speaker: "Gwen",
          text: "Whoa--! Hey--sorry! That was almost a full-on hallway tackle.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "You must be the new guy. I thought I heard someone moving in.",
          expression: "happy",
        },
        { speaker: "You", text: "Yeah. Just getting settled." },
        {
          speaker: "Gwen",
          text: "Nice. Fresh blood. That's always fun.",
          expression: "excited",
        },
        {
          speaker: null,
          text: "She says it a little too brightly, like she's testing a line.",
        },
        {
          speaker: "Gwen",
          text: "I mean--new neighbors are good. For the building. Strong start, Gwen.",
          expression: "neutral",
        },
        { speaker: "You", text: "I'll pretend I didn't hear that." },
        { speaker: "Gwen", text: "Appreciated. I'm Gwen.", expression: "happy" },
        {
          speaker: "Gwen",
          text: "I live right down the hall. If you get lost, locked out... lonely...",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "Her smile goes a touch too polished, like she wants the line to land.",
        },
        {
          speaker: "Gwen",
          text: "I'm an occasional rescuer of lone neighbors.",
          expression: "excited",
        },
        { speaker: "Gwen", text: "For a price.", expression: "happy" },
        {
          speaker: null,
          text: "She holds your gaze, the flirt settling into place.",
        },
        {
          speaker: "Gwen",
          text: "It's my job to make first impressions land.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "Truth is, I keep weird hours. Better you know that now.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Play along with the flirt.",
              affectionChange: 1,
              nextDialogueId: "gwen_intro_play_along",
            },
            {
              text: "Call it out gently.",
              affectionChange: 0,
              nextDialogueId: "gwen_intro_call_out",
            },
            {
              text: "Keep it neighborly.",
              affectionChange: 0,
              nextDialogueId: "gwen_intro_neighborly",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetGwen", "gwenIntroDone"],
      unlockCharacters: ["Gwen"],
    },
  },
];
