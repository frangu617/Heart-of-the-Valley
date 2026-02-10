import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Tutoring, Round Two (Teasing)
// Descriptions: Yumi pushes your boundaries during a late session. | Yumi looks for approval during a late session.

const yumiTutor2DomPlay: Dialogue = {
  id: "yumi_tutor2_dom_play",
  lines: [
    {
      speaker: "You",
      text: "Well, maybe you are. You're certainly the only one bold enough to invade my personal space like this.",
    },
    {
      speaker: null,
      text: "You turn your chair slightly to face her, meeting her challenge head-on.",
    },
    {
      speaker: "Yumi",
      text: "Good. I like being special. It motivates me to work harder.",
      expression: "happy",
    },
    {
      speaker: "Yumi",
      text: "Maybe if I get an A on this assignment, you can show me what other special privileges I get?",
      expression: "happy",
    },
    { speaker: "You", text: "Focus on the code first, Yumi." },
    { speaker: "Yumi", text: "Fine. But I'm holding you to that.", expression: "happy" },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "See you in class, Professor. Try not to miss me too much.",
      expression: "happy",
    },
    { speaker: null, text: "She winks, then slips out the door." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiTutor2DomBoundaries: Dialogue = {
  id: "yumi_tutor2_dom_boundaries",
  lines: [
    {
      speaker: "You",
      text: "Yumi, you're crowding me. I can't grade if you're hovering.",
    },
    {
      speaker: null,
      text: "You slide your chair back, creating a deliberate gap between you two.",
    },
    {
      speaker: "Yumi",
      text: "Okay, okay. Message received. Just checking if you were paying attention.",
      expression: "neutral",
    },
    { speaker: "You", text: "I'm always paying attention. Now look at the screen." },
    { speaker: "Yumi", text: "Right. The screen.", expression: "neutral" },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "See you in class, Professor. Try not to miss me too much.",
      expression: "happy",
    },
    { speaker: null, text: "She winks, then slips out the door." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiTutor2SubPraise: Dialogue = {
  id: "yumi_tutor2_sub_praise",
  lines: [
    { speaker: "You", text: "You're doing very well, Yumi." },
    {
      speaker: null,
      text: "You don't move away. Instead, you lean back, letting your arm rest against hers.",
    },
    {
      speaker: "You",
      text: "You're smart, obedient, and you listen to instructions. That's a rare combination.",
    },
    {
      speaker: null,
      text: "Her face turns a bright shade of red. She looks down, biting her lip, clearly enjoying the praise.",
    },
    {
      speaker: "Yumi",
      text: "Thank you... I... I really like hearing you say that.",
      expression: "shy",
    },
    {
      speaker: "Yumi",
      text: "I'll keep being good. I promise. Just tell me what you need me to do.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "I'll study hard for the next one. I won't let you down.",
      expression: "shy",
    },
    { speaker: null, text: "She gives a small, respectful bow before quietly leaving the room." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

const yumiTutor2SubCorrect: Dialogue = {
  id: "yumi_tutor2_sub_correct",
  lines: [
    {
      speaker: "You",
      text: "You're doing fine, but you're too close. Take a step back so we can focus.",
    },
    {
      speaker: null,
      text: "She flinches as if you scolded her. She immediately steps back, clasping her hands behind her back.",
    },
    {
      speaker: "Yumi",
      text: "I'm sorry! I didn't mean to... I'll stand here. Sorry.",
      expression: "sad",
    },
    { speaker: "You", text: "It's fine. Just pay attention to the logic." },
    { speaker: "Yumi", text: "Yes, sir.", expression: "sad" },
    {
      speaker: "You",
      text: "Anyway, let's fix this last error. You need a clean check here, not a quick hack.",
    },
    {
      speaker: null,
      text: "Yumi leans over to type the fix. Her hands move quickly, but her mood has clearly shifted based on your earlier reaction.",
    },
    { speaker: "Yumi", text: "Fixed. It's running now.", expression: "happy" },
    { speaker: "You", text: "Good work. You're improving fast." },
    {
      speaker: "Yumi",
      text: "Thanks to you. I wouldn't be able to do this alone.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her laptop. Before she leaves, she pauses at the door.",
    },
    {
      speaker: "Yumi",
      text: "I'll study hard for the next one. I won't let you down.",
      expression: "shy",
    },
    { speaker: null, text: "She gives a small, respectful bow before quietly leaving the room." },
    {
      speaker: null,
      text: "You settle back into your chair, replaying the moment.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

export const yumiEvent3Dialogues: Record<string, Dialogue> = {
  yumi_tutor2_dom_play: yumiTutor2DomPlay,
  yumi_tutor2_dom_boundaries: yumiTutor2DomBoundaries,
  yumi_tutor2_sub_praise: yumiTutor2SubPraise,
  yumi_tutor2_sub_correct: yumiTutor2SubCorrect,
};

export const yumiEvent3Events: CharacterEvent[] = [
  {
    id: "yumi_tutoring_event_2_dom",
    name: "Tutoring, Round Two (Teasing)",
    description: "Yumi pushes your boundaries during a late session.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_private_tutoring_event"],
      requiredFlags: ["yumiDomPath"],
    },
    dialogue: {
      id: "yumi_tutoring_event_2_dom",
      lines: [
        {
          speaker: null,
          text: "It's late afternoon. The hallway outside is quiet, most of the faculty having gone home for the day.",
        },
        {
          speaker: null,
          text: "You hear a soft knock, and before you can even answer, the door opens.",
        },
        {
          speaker: "Yumi",
          text: "Hi, Professor. Ready for round two?",
          expression: "happy",
        },
        {
          speaker: null,
          text: "Yumi slips inside. There's a faint, alluring scent clinging to her--something new.",
        },
        {
          speaker: null,
          text: "She closes the door behind her and checks the latch.",
        },
        {
          speaker: "You",
          text: "You're eager today, Yumi. Did you bring the new assignment?",
        },
        {
          speaker: "Yumi",
          text: "I did. But I think I messed up the logic again.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She walks over to your desk. Instead of pulling up the chair across from you like last time, she stands right next to your chair.",
        },
        { speaker: "You", text: "Do you want to pull up a seat?" },
        {
          speaker: "Yumi",
          text: "It's okay. I can see better from here.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She leans over your shoulder to place her laptop on your desk. She is close. You can feel the warmth radiating from her arm, and a lock of her hair brushes against your sleeve.",
        },
        {
          speaker: "Yumi",
          text: "See? This section. The logic is flawed.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "You try to focus on the code, but her proximity is distracting. She isn't pulling away.",
        },
        {
          speaker: "Yumi",
          text: "I bet you don't let other students get this close to your work.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She turns her head, looking at you through her lashes with a confident, challenging grin.",
        },
        {
          speaker: "Yumi",
          text: "I feel like I'm getting special treatment. Am I?",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Play along (Flirt back).",
              affectionChange: 3,
              nextDialogueId: "yumi_tutor2_dom_play",
            },
            {
              text: "Establish boundaries (Professional).",
              affectionChange: -1,
              nextDialogueId: "yumi_tutor2_dom_boundaries",
            },
          ],
        },
      ],
    },
    rewards: {
      playerMoney: 15,
      playerStats: {
        intelligence: 1,
      },
    },
  },
  {
    id: "yumi_tutoring_event_2_sub",
    name: "Tutoring, Round Two (Seeking Praise)",
    description: "Yumi looks for approval during a late session.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_private_tutoring_event"],
      requiredFlags: ["yumiSubPath"],
    },
    dialogue: {
      id: "yumi_tutoring_event_2_sub",
      lines: [
        {
          speaker: null,
          text: "It's late afternoon. The hallway outside is quiet, most of the faculty having gone home for the day.",
        },
        {
          speaker: null,
          text: "You hear a soft knock, and before you can even answer, the door opens.",
        },
        {
          speaker: "Yumi",
          text: "Hi, Professor. Ready for round two?",
          expression: "shy",
        },
        {
          speaker: null,
          text: "Yumi slips inside. There's a faint, alluring scent clinging to her--something new.",
        },
        {
          speaker: null,
          text: "She closes the door behind her and checks the latch.",
        },
        {
          speaker: "You",
          text: "You're eager today, Yumi. Did you bring the new assignment?",
        },
        {
          speaker: "Yumi",
          text: "I did. But I think I messed up the logic again.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She walks over to your desk. Instead of pulling up the chair across from you like last time, she stands right next to your chair.",
        },
        { speaker: "You", text: "Do you want to pull up a seat?" },
        {
          speaker: "Yumi",
          text: "It's okay. I can see better from here.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She leans over your shoulder to place her laptop on your desk. She is close. You can feel the warmth radiating from her arm, and a lock of her hair brushes against your sleeve.",
        },
        {
          speaker: "Yumi",
          text: "See? This section. The logic is flawed.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "You try to focus on the code, but her proximity is distracting. She isn't pulling away.",
        },
        {
          speaker: "Yumi",
          text: "I really focused this time. I checked it three times before I came in.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She shifts her weight, her hip bumping gently against your shoulder. She doesn't pull away, as if she's waiting to see if you'll allow it.",
        },
        {
          speaker: "Yumi",
          text: "I want to be a good student for you, Professor. Am I doing okay?",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Praise her (You take the lead).",
              affectionChange: 3,
              nextDialogueId: "yumi_tutor2_sub_praise",
            },
            {
              text: "Correct her posture (Stern/Professional).",
              affectionChange: -1,
              nextDialogueId: "yumi_tutor2_sub_correct",
            },
          ],
        },
      ],
    },
    rewards: {
      playerMoney: 15,
      playerStats: {
        intelligence: 1,
      },
    },
  },
];
