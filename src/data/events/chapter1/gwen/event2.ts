import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: Door Mixup
// Description: Gwen mistakes your door for hers after a late night.

const gwenEvent2DoorSupportive: Dialogue = {
  id: "gwen_event_2_door_supportive",
  lines: [
    { speaker: "You", text: "Come on. Let's get you to the right door." },
    {
      speaker: "Gwen",
      text: "You're annoyingly helpful, you know that?",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Don't tell anyone about this. I have a reputation to maintain.",
      expression: "neutral",
    },
    { speaker: "You", text: "Your secret's safe." },
    {
      speaker: null,
      text: "She gets her key into the right lock on the first try this time, shooting you a quick, triumphant grin before slipping inside.",
    },
  ],
};

const gwenEvent2DoorAngry: Dialogue = {
  id: "gwen_event_2_door_angry",
  lines: [
    { speaker: "You", text: "You just woke me up. Don't do that again." },
    {
      speaker: "Gwen",
      text: "Yeah. Fine.",
      expression: "annoyed",
    },
    {
      speaker: "Gwen",
      text: "We're square.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She gets her key into the right lock on the first try this time and slips inside without looking back.",
    },
  ],
};

export const gwenEvent2Dialogues: Record<string, Dialogue> = {
  gwen_event_2_door_supportive: gwenEvent2DoorSupportive,
  gwen_event_2_door_angry: gwenEvent2DoorAngry,
};

export const gwenEvent2Events: CharacterEvent[] = [
  {
    id: "gwen_event_2_door_mixup",
    name: "Door Mixup",
    description: "Gwen mistakes your door for hers after a late night.",
    quest: {
      title: "Late-Night Mixup",
      description: "Be in the hallway late at night (10 PM–midnight).",
    },
    priority: 235,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minHour: 22,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenIntroDone"],
    },
    dialogue: {
      id: "gwen_event_2_door_mixup",
      lines: [
        {
          speaker: null,
          text: "A heavy thud jars you awake. Another. Then a frustrated sigh outside your door.",
        },
        {
          speaker: null,
          text: "You crack it open to find Gwen swaying slightly, purse on one arm, keys in the other, squinting at your lock like it owes her money.",
        },
        { speaker: "Gwen", text: "Okay, door. Don't do this to me right now.", expression: "annoyed" },
        { speaker: "You", text: "Uh... Gwen?" },
        {
          speaker: "Gwen",
          text: "Why are you in my apartment?",
          expression: "annoyed",
        },
        { speaker: "You", text: "I'm not. This is my door." },
        {
          speaker: "Gwen",
          text: "No, it isn't. My door does this sticky thing. It's... a feature.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She leans in, peering past you like she's expecting to see her living room behind you.",
        },
        { speaker: "You", text: "You're on the wrong side of the hall." },
        {
          speaker: "Gwen",
          text: "I'm on the right side of the night.",
          expression: "happy",
        },
        { speaker: "You", text: "You're also a little drunk." },
        {
          speaker: "Gwen",
          text: "I'm... socially lubricated. There's a difference.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She frowns at the number on the door, then at you, then at the number again.",
        },
        {
          speaker: "Gwen",
          text: "Fine. Maybe you're in my apartment adjacent.",
          expression: "annoyed",
        },
        { speaker: "You", text: "Close enough. Let me walk you to the right one." },
        {
          speaker: null,
          text: "She hesitates, then allows it, letting you guide her two steps down the hall.",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Be understanding and walk her to the right door.",
              affectionChange: 1,
              nextDialogueId: "gwen_event_2_door_supportive",
            },
            {
              text: "Get on her for waking you up.",
              affectionChange: -1,
              nextDialogueId: "gwen_event_2_door_angry",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwenDoorMixupDone"],
    },
  },
];
