import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: The Talk
// Description: Yumi wants to talk about what happened.

const yumiC2Ev2SubStart: Dialogue = {
  id: "yumi_c2_ev2_sub_start",
  lines: [
    {
      speaker: null,
      text: "She was already here, waiting. \"Hi...\"",
    },
    {
      speaker: "Yumi",
      text: "About the other night... I...",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "I want more of what happened.",
          affectionChange: 0,
          dominanceChange: -1,
          setFlags: ["yumi_relationship_secret"],
          nextDialogueId: "yumi_c2_ev2_sub_push",
        },
        {
          text: "Are you okay? I'm worried about you.",
          affectionChange: 0,
          moodChange: 1,
          setFlags: ["yumi_relationship_secret"],
          nextDialogueId: "yumi_c2_ev2_sub_caring",
        },
      ],
    },
  ],
};

const yumiC2Ev2SubPush: Dialogue = {
  id: "yumi_c2_ev2_sub_push",
  lines: [
    {
      speaker: "Yumi",
      text: "Oh... M-me too. I really do. But we have to be... careful.",
      expression: "blushing",
    },
    {
      speaker: "You",
      text: "We will be. This will be our secret.",
    },
  ],
};

const yumiC2Ev2SubCaring: Dialogue = {
  id: "yumi_c2_ev2_sub_caring",
  lines: [
    {
      speaker: "Yumi",
      text: "I'm... confused. But not scared. I liked it. I just don't know what this means for us.",
      expression: "sad",
    },
    {
      speaker: "You",
      text: "It means we can explore it, together. As long as we keep it secret.",
    },
  ],
};

const yumiC2Ev2DomStart: Dialogue = {
  id: "yumi_c2_ev2_dom_start",
  lines: [
    {
      speaker: "Yumi",
      text: "Shut the door.",
      expression: "angry",
    },
    {
      speaker: null,
      text: "I do as she says. She has her arms crossed, her eyes are like ice.",
    },
    {
      speaker: "Yumi",
      text: "Do you have any idea how much trouble you could be in? I'm a student. You're faculty. I could ruin your career with a single word.",
      expression: "angry",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Is that a threat, or are you enjoying the power?",
          affectionChange: 0,
          dominanceChange: 1,
          setFlags: ["yumi_relationship_secret_dom"],
          nextDialogueId: "yumi_c2_ev2_dom_challenge",
        },
        {
          text: "You're right. I'm sorry.",
          affectionChange: 0,
          dominanceChange: -1,
          setFlags: ["yumi_relationship_stalled"],
          nextDialogueId: "yumi_c2_ev2_dom_apology",
        },
      ],
    },
  ],
};

const yumiC2Ev2DomChallenge: Dialogue = {
  id: "yumi_c2_ev2_dom_challenge",
  lines: [
    {
      speaker: "Yumi",
      text: "A small, dangerous smile plays on her lips. \"Maybe a little of both.\"",
      expression: "smug",
    },
    {
      speaker: "Yumi",
      text: "From now on, we do things my way. This stays between us. No one knows. Clear?",
      expression: "smug",
    },
    { speaker: "You", text: "Crystal." },
  ],
};

const yumiC2Ev2DomApology: Dialogue = {
  id: "yumi_c2_ev2_dom_apology",
  lines: [
    {
      speaker: "Yumi",
      text: "Her face falls, the fire in her eyes replaced by disappointment. \"Fine. Forget it ever happened.\"",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She turns and walks out before I can say another word. I messed that up.",
    },
  ],
};

const yumiC2Ev2NeutralStart: Dialogue = {
  id: "yumi_c2_ev2_neutral_start",
  lines: [
    {
      speaker: "Yumi",
      text: "Thanks for meeting me. We need to talk about what happened.",
      expression: "neutral",
    },
    {
      speaker: "Yumi",
      text: "It was... intense. And we both know it could cause problems for both of us if anyone found out.",
      expression: "worried",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "I don't want to forget it. I want to see where this goes.",
          affectionChange: 0,
          setFlags: ["yumi_relationship_secret_neutral"],
          nextDialogueId: "yumi_c2_ev2_neutral_continue",
        },
        {
          text: "Maybe we should just forget it happened.",
          affectionChange: 0,
          setFlags: ["yumi_romance_ended"],
          nextDialogueId: "yumi_c2_ev2_neutral_end",
        },
      ],
    },
  ],
};

const yumiC2Ev2NeutralContinue: Dialogue = {
  id: "yumi_c2_ev2_neutral_continue",
  lines: [
    {
      speaker: "Yumi",
      text: "Okay. Me too. But we have to be smart about this. No labels. Extreme discretion. Can you agree to that?",
      expression: "hopeful",
    },
    { speaker: "You", text: "I can." },
  ],
};

const yumiC2Ev2NeutralEnd: Dialogue = {
  id: "yumi_c2_ev2_neutral_end",
  lines: [
    {
      speaker: "Yumi",
      text: "A flash of hurt crosses her face before she masks it. \"Yeah. Maybe that's for the best.\" She leaves without looking back.",
      expression: "sad",
    },
  ],
};

export const yumiEvent2Dialogues: Record<string, Dialogue> = {
  yumi_c2_ev2_sub_start: yumiC2Ev2SubStart,
  yumi_c2_ev2_sub_push: yumiC2Ev2SubPush,
  yumi_c2_ev2_sub_caring: yumiC2Ev2SubCaring,
  yumi_c2_ev2_dom_start: yumiC2Ev2DomStart,
  yumi_c2_ev2_dom_challenge: yumiC2Ev2DomChallenge,
  yumi_c2_ev2_dom_apology: yumiC2Ev2DomApology,
  yumi_c2_ev2_neutral_start: yumiC2Ev2NeutralStart,
  yumi_c2_ev2_neutral_continue: yumiC2Ev2NeutralContinue,
  yumi_c2_ev2_neutral_end: yumiC2Ev2NeutralEnd,
};

export const yumiEvent2Events: CharacterEvent[] = [
  {
    id: "yumi_c2_event_2_sub",
    name: "The Talk",
    description: "Yumi wants to talk about what happened.",
    priority: 180,
    repeatable: false,
    conditions: {
      requiredLocation: "Classroom",
      requiredFlags: ["yumi_chapter_2_started", "yumiSubPath"],
      blockedByFlags: ["yumi_c2_event_2_completed"],
    },
    dialogue: yumiC2Ev2SubStart,
    rewards: {
      setFlags: ["yumi_c2_event_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_2_dom",
    name: "The Talk",
    description: "Yumi wants to talk about what happened.",
    priority: 180,
    repeatable: false,
    conditions: {
      requiredLocation: "Classroom",
      requiredFlags: ["yumi_chapter_2_started", "yumiDomPath"],
      blockedByFlags: ["yumi_c2_event_2_completed"],
    },
    dialogue: yumiC2Ev2DomStart,
    rewards: {
      setFlags: ["yumi_c2_event_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_2_neutral",
    name: "The Talk",
    description: "Yumi wants to talk about what happened.",
    priority: 180,
    repeatable: false,
    conditions: {
      requiredLocation: "Classroom",
      requiredFlags: ["yumi_chapter_2_started"],
      blockedByFlags: ["yumi_c2_event_2_completed", "yumiDomPath", "yumiSubPath"],
    },
    dialogue: yumiC2Ev2NeutralStart,
    rewards: {
      setFlags: ["yumi_c2_event_2_completed"],
    },
  },
];
