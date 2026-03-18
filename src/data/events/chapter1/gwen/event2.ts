import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: Door Mixup
// Description: Gwen mistakes your door for hers after a late night.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: gwen_event_2_door_mixup  (Hallway, 22-24h, gwenIntroDone)
//   [inline choices — no nextDialogueId, stat changes only]
//   └─ second choice set:
//        ├─ ["Keep it private and walk her to her door"] → gwen_event_2_door_private_help  END [gwenDoorMixupDone]
//        ├─ ["Steady her, but tease her through it"]     → gwen_event_2_door_teasing_help  END [gwenDoorMixupDone]
//        └─ ["Set a hard boundary about the noise"]      → gwen_event_2_door_hard_line     END [gwenDoorMixupDone]
// Rewards: gwenDoorMixupDone
// ─────────────────────────────────────────────────────────────────────────────

// FROM: gwen_event_2_door_mixup → ["Keep it private and walk her to her door"]
const gwenEvent2DoorPrivateHelp: Dialogue = {
  id: "gwen_event_2_door_private_help",
  lines: [
    { speaker: "You", text: "Come on. Quietly. Let's get you to the right door before anyone sees this." },
    {
      speaker: null,
      text: "You take her key ring and guide her two doors down while she steadies herself with one hand on your sleeve.",
    },
    {
      speaker: "Gwen",
      text: "You are annoyingly decent, you know that?",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Thank you for keeping this private. I really do not need hallway gossip on top of my shift.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer her?",
      choices: [
        {
          text: "Your secret is safe with me.",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Fine, but you owe me coffee tomorrow.",
          affectionChange: 1,
          lustChange: 1,
        },
        {
          text: "Then next time, call a ride before this point.",
          affectionChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "Deal. And... thank you, seriously.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "At her actual door, she gets the lock on the second try, then gives you a grateful look before slipping inside.",
    },
  ],
};

// FROM: gwen_event_2_door_mixup → ["Steady her, but tease her through it"]
const gwenEvent2DoorTeasingHelp: Dialogue = {
  id: "gwen_event_2_door_teasing_help",
  lines: [
    { speaker: "You", text: "Come on, superstar. Wrong stage. Right door is two down." },
    {
      speaker: null,
      text: "She laughs under her breath and lets you steer her down the hall, shoulder brushing yours.",
    },
    {
      speaker: "Gwen",
      text: "You are kind and obnoxious. That is a dangerous combination.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "I owe you one. And yes, I will remember this in the morning.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you throw back?",
      choices: [
        {
          text: "Great. Breakfast debt, 9 AM.",
          affectionChange: 1,
        },
        {
          text: "Just avoid trying to seduce the wrong door next time.",
          affectionChange: 0,
          lustChange: 1,
        },
        {
          text: "Text first before midnight chaos.",
          affectionChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Gwen",
      text: "I cannot promise graceful, but I can promise I will text.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She catches the frame before she falls into her apartment, flashes you a crooked grin, then disappears inside.",
    },
  ],
};

// FROM: gwen_event_2_door_mixup → ["Set a hard boundary about the noise"]
const gwenEvent2DoorHardLine: Dialogue = {
  id: "gwen_event_2_door_hard_line",
  lines: [
    { speaker: "You", text: "You woke me up. Get it together and keep it down." },
    {
      speaker: null,
      text: "The humor drains from her face as she straightens, visibly sobering.",
    },
    {
      speaker: "Gwen",
      text: "Fair. I crossed a line tonight.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "It will not happen again.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you leave it?",
      choices: [
        {
          text: "Good. That is all I needed.",
          affectionChange: 0,
          dominanceChange: 1,
        },
        {
          text: "You okay to get inside?",
          affectionChange: 1,
          dominanceChange: -1,
        },
        {
          text: "Drink water and sleep. We reset tomorrow.",
          affectionChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "She moves to the correct door on her own and slips inside without another word.",
    },
  ],
};

export const gwenEvent2Dialogues: Record<string, Dialogue> = {
  gwen_event_2_door_private_help: gwenEvent2DoorPrivateHelp,
  gwen_event_2_door_teasing_help: gwenEvent2DoorTeasingHelp,
  gwen_event_2_door_hard_line: gwenEvent2DoorHardLine,
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
      minAffection: 0,
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
          text: "You crack it open to find Gwen in yesterday's makeup and a half-zipped jacket, heels dangling from one hand, squinting at your lock like it owes her rent.",
        },
        { speaker: "Gwen", text: "Okay, door. Don't do this to me right now.", expression: "annoyed" },
        { speaker: "You", text: "Uh... Gwen?" },
        {
          speaker: "Gwen",
          text: "Please tell me this is my door and reality is broken.",
          expression: "neutral",
        },
        { speaker: "You", text: "I'm not. This is my door." },
        {
          speaker: null,
          text: "A folded wad of cash peeks from her purse before she shoves it deeper inside.",
        },
        {
          speaker: "Gwen",
          text: "Right. Great. So I am doing this in front of the one neighbor I actually like.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond first?",
          choices: [
            {
              text: "Keep your voice low. You are okay.",
              affectionChange: 1,
              dominanceChange: -1,
            },
            {
              text: "You are kind of adorable when your guard drops.",
              affectionChange: 0,
              lustChange: 1,
            },
            {
              text: "Focus. Wrong door, two down.",
              affectionChange: 0,
              dominanceChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "She studies the number on your door, grimaces, then gestures vaguely down the hall.",
        },
        { speaker: "Gwen", text: "Can we pretend this never happened?", expression: "shy" },
        {
          speaker: "You",
          text: "How do you handle her?",
          choices: [
            {
              text: "Keep it private and walk her to her door.",
              affectionChange: 2,
              nextDialogueId: "gwen_event_2_door_private_help",
            },
            {
              text: "Steady her, but tease her through it.",
              affectionChange: 1,
              lustChange: 1,
              nextDialogueId: "gwen_event_2_door_teasing_help",
            },
            {
              text: "Set a hard boundary about the noise.",
              affectionChange: -1,
              dominanceChange: 1,
              nextDialogueId: "gwen_event_2_door_hard_line",
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
