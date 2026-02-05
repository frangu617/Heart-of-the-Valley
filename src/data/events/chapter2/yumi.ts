import type { Dialogue } from "../../dialogues";
import type { CharacterEvent } from "../types";

const yumiC2Ev1Sub: Dialogue = {
  id: "yumi_c2_ev1_sub",
  lines: [
    {
      speaker: null,
      text: "I see Yumi down the hall. She sees me and her cheeks flush. She quickly looks down at her books, trying to seem busy.",
    },
    {
      speaker: null,
      text: "She's avoiding my eyes, but I can see a small, almost imperceptible smile on her face. She's waiting for me to make the first move.",
    },
  ],
};

const yumiC2Ev1Dom: Dialogue = {
  id: "yumi_c2_ev1_dom",
  lines: [
    {
      speaker: null,
      text: "I spot Yumi by her locker. Our eyes meet, and her expression is unreadable, almost cold. All business.",
    },
    {
      speaker: null,
      text: "She gives me a slight nod, a clear signal. A moment later, my phone buzzes. \"Empty classroom. 3rd floor. After this class. Be there.\"",
    },
  ],
};

const yumiC2Ev1Neutral: Dialogue = {
  id: "yumi_c2_ev1_neutral",
  lines: [
    {
      speaker: null,
      text: "There's Yumi. She sees me and offers a small, uncertain smile before turning away. It's impossible to tell what she's thinking.",
    },
    {
      speaker: null,
      text: "It's tense. The air is thick with unspoken words. Later, my phone vibrates. A text from her: \"We should talk.\"",
    },
  ],
};

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

const yumiC2Ev3Sub: Dialogue = {
  id: "yumi_c2_ev3_sub",
  lines: [
    {
      speaker: null,
      text: "My phone buzzes. It's a long message from Yumi, outlining a plan.",
    },
    {
      speaker: "Yumi",
      text: "(Phone) \"Okay, so I was thinking... maybe we shouldn't talk in the hallways? And we can use a special emoji to signal when we want to meet privately? Let me know what you think! :)\"",
    },
    {
      speaker: null,
      text: "It's a list of rules, disguised as suggestions. She's meticulously planning how to keep us secret. It's... surprisingly thorough.",
    },
  ],
};

const yumiC2Ev3Dom: Dialogue = {
  id: "yumi_c2_ev3_dom",
  lines: [
    {
      speaker: null,
      text: "A new text from Yumi arrives. It's a list.",
    },
    {
      speaker: "Yumi",
      text: "(Phone) \"Rules. 1: You don't initiate contact. I do. 2: We are never seen arriving or leaving a location together. 3: Delete our chats at the end of each day. Acknowledge.\"",
    },
    {
      speaker: null,
      text: "They're not suggestions; they're orders. She's taking control of every aspect of this. I can't help but feel a thrill.",
    },
  ],
};

const yumiC2Ev3Neutral: Dialogue = {
  id: "yumi_c2_ev3_neutral",
  lines: [
    {
      speaker: null,
      text: "I get a text from Yumi with a link to a shared document.",
    },
    {
      speaker: "Yumi",
      text: "(Phone) \"Drafting some ground rules for us to stay safe. Please add your thoughts. I figured this is the most organized way to handle it.\"",
    },
    {
      speaker: null,
      text: "It's a collaboratively-edited document titled 'Operational Secrecy'. She's treating this like a project. It's surprisingly thorough.",
    },
  ],
};

const yumiC2Ev4: Dialogue = {
  id: "yumi_c2_ev4",
  lines: [
    {
      speaker: null,
      text: "Following her instructions, I arrive at an off-campus cafe. She's already in a corner booth, looking out the window.",
    },
    {
      speaker: "Yumi",
      text: "You made it. Good.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "We spend the next hour just talking. Not about the rules, or the university, but about us. Our lives, our hobbies. It's... nice. Normal, even.",
    },
  ],
};

const yumiC2Ev5: Dialogue = {
  id: "yumi_c2_ev5",
  lines: [
    {
      speaker: "Yumi",
      text: "(Phone) \"Dress up. There's a bar downtown I want to show you. 9 PM. Don't be late.\"",
    },
    {
      speaker: null,
      text: "She chose a stylish, low-key place. A private booth in the back. It feels like a real date.",
    },
    {
      speaker: "Yumi",
      text: "I'm glad you came. I... I'm enjoying this. Us.",
      expression: "happy",
    },
  ],
};

const yumiC2Ev5MetDawn: Dialogue = {
  id: "yumi_c2_ev5_met_dawn",
  lines: [
    {
      speaker: "Yumi",
      text: "(Phone) \"Dress up. There's a bar downtown I want to show you. 9 PM. Don't be late.\"",
    },
    {
      speaker: null,
      text: "She chose a stylish, low-key place. A private booth in the back. It feels like a real date.",
    },
    {
      speaker: "Yumi",
      text: "I'm glad you came. I... I'm enjoying this. Us.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "As we talk, I get that strange feeling again... of being watched.",
    },
    {
      speaker: null,
      text: "I subtly scan the room, and for a split second, I think I see her. That girl from the nightclub. Dawn. But she's gone before I can be sure.",
    },
    {
      speaker: "Yumi",
      text: "Is something wrong?",
      expression: "worried",
    },
    {
      speaker: "You",
      text: "No, nothing. Just thought I saw someone I knew.",
    },
    {
      speaker: null,
      text: "Yumi accepts the answer, but I see a flicker of something in her eyes. Concern? Or something else?",
    },
  ],
};

export const yumiStoryDialogues: Record<string, Dialogue> = {
  yumi_c2_ev1_sub: yumiC2Ev1Sub,
  yumi_c2_ev1_dom: yumiC2Ev1Dom,
  yumi_c2_ev1_neutral: yumiC2Ev1Neutral,
  yumi_c2_ev2_sub_start: yumiC2Ev2SubStart,
  yumi_c2_ev2_sub_push: yumiC2Ev2SubPush,
  yumi_c2_ev2_sub_caring: yumiC2Ev2SubCaring,
  yumi_c2_ev2_dom_start: yumiC2Ev2DomStart,
  yumi_c2_ev2_dom_challenge: yumiC2Ev2DomChallenge,
  yumi_c2_ev2_dom_apology: yumiC2Ev2DomApology,
  yumi_c2_ev2_neutral_start: yumiC2Ev2NeutralStart,
  yumi_c2_ev2_neutral_continue: yumiC2Ev2NeutralContinue,
  yumi_c2_ev2_neutral_end: yumiC2Ev2NeutralEnd,
  yumi_c2_ev3_sub: yumiC2Ev3Sub,
  yumi_c2_ev3_dom: yumiC2Ev3Dom,
  yumi_c2_ev3_neutral: yumiC2Ev3Neutral,
  yumi_c2_ev4: yumiC2Ev4,
  yumi_c2_ev5: yumiC2Ev5,
  yumi_c2_ev5_met_dawn: yumiC2Ev5MetDawn,
};

export const yumiEvents: CharacterEvent[] = [
  {
    id: "yumi_c2_event_1_sub",
    name: "The Morning After",
    description: "You see Yumi for the first time since the kiss.",
    priority: 190,
    repeatable: false,
    conditions: {
      requiredLocation: "University Hallway",
      requiredFlags: ["yumi_chapter_1_completed", "yumiSubPath"],
      blockedByFlags: ["yumi_chapter_2_started"],
    },
    dialogue: yumiC2Ev1Sub,
    rewards: {
      setFlags: ["yumi_chapter_2_started"],
    },
  },
  {
    id: "yumi_c2_event_1_dom",
    name: "The Morning After",
    description: "You see Yumi for the first time since the kiss.",
    priority: 190,
    repeatable: false,
    conditions: {
      requiredLocation: "University Hallway",
      requiredFlags: ["yumi_chapter_1_completed", "yumiDomPath"],
      blockedByFlags: ["yumi_chapter_2_started"],
    },
    dialogue: yumiC2Ev1Dom,
    rewards: {
      setFlags: ["yumi_chapter_2_started"],
    },
  },
  {
    id: "yumi_c2_event_1_neutral",
    name: "The Morning After",
    description: "You see Yumi for the first time since the kiss.",
    priority: 190,
    repeatable: false,
    conditions: {
      requiredLocation: "University Hallway",
      requiredFlags: ["yumi_chapter_1_completed"],
      blockedByFlags: ["yumi_chapter_2_started", "yumiDomPath", "yumiSubPath"],
    },
    dialogue: yumiC2Ev1Neutral,
    rewards: {
      setFlags: ["yumi_chapter_2_started"],
    },
  },
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
  {
    id: "yumi_c2_event_3_sub",
    name: "Rules of Engagement",
    description: "Yumi sends you a plan to keep things quiet.",
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["yumi_relationship_secret"],
      blockedByFlags: ["yumi_c2_event_3_completed"],
    },
    dialogue: yumiC2Ev3Sub,
    rewards: {
      setFlags: ["yumi_c2_event_3_completed"],
    },
  },
  {
    id: "yumi_c2_event_3_dom",
    name: "Rules of Engagement",
    description: "Yumi sends you a plan to keep things quiet.",
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["yumi_relationship_secret_dom"],
      blockedByFlags: ["yumi_c2_event_3_completed"],
    },
    dialogue: yumiC2Ev3Dom,
    rewards: {
      setFlags: ["yumi_c2_event_3_completed"],
    },
  },
  {
    id: "yumi_c2_event_3_neutral",
    name: "Rules of Engagement",
    description: "Yumi sends you a plan to keep things quiet.",
    priority: 170,
    repeatable: false,
    conditions: {
      requiredFlags: ["yumi_relationship_secret_neutral"],
      blockedByFlags: ["yumi_c2_event_3_completed"],
    },
    dialogue: yumiC2Ev3Neutral,
    rewards: {
      setFlags: ["yumi_c2_event_3_completed"],
    },
  },
  {
    id: "yumi_c2_event_4",
    name: "A Secret Meeting",
    description: "You meet Yumi off campus.",
    priority: 160,
    repeatable: false,
    conditions: {
      requiredLocation: "Cafe",
      requiredFlags: ["yumi_c2_event_3_completed"],
      blockedByFlags: ["yumi_c2_event_4_completed"],
    },
    dialogue: yumiC2Ev4,
    rewards: {
      setFlags: ["yumi_c2_event_4_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_sub",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiSubPath"],
      blockedByFlags: ["yumi_chapter_2_date", "metDawn"],
    },
    dialogue: yumiC2Ev5,
    rewards: {
      girlStats: { love: 10, dominance: -1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_dom",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiDomPath"],
      blockedByFlags: ["yumi_chapter_2_date", "metDawn"],
    },
    dialogue: yumiC2Ev5,
    rewards: {
      girlStats: { love: 10, dominance: 1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_neutral",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed"],
      blockedByFlags: ["yumi_chapter_2_date", "metDawn", "yumiDomPath", "yumiSubPath"],
    },
    dialogue: yumiC2Ev5,
    rewards: {
      girlStats: { love: 10 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_sub_met_dawn",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiSubPath", "metDawn"],
      blockedByFlags: ["yumi_chapter_2_date"],
    },
    dialogue: yumiC2Ev5MetDawn,
    rewards: {
      girlStats: { love: 10, dominance: -1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_dom_met_dawn",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "yumiDomPath", "metDawn"],
      blockedByFlags: ["yumi_chapter_2_date"],
    },
    dialogue: yumiC2Ev5MetDawn,
    rewards: {
      girlStats: { love: 10, dominance: 1 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
  {
    id: "yumi_c2_event_5_neutral_met_dawn",
    name: "The First Date",
    description: "You meet Yumi for a real date.",
    priority: 150,
    repeatable: false,
    conditions: {
      requiredLocation: "Bar",
      minHour: 20,
      maxHour: 24,
      requiredFlags: ["yumi_c2_event_4_completed", "metDawn"],
      blockedByFlags: ["yumi_chapter_2_date", "yumiDomPath", "yumiSubPath"],
    },
    dialogue: yumiC2Ev5MetDawn,
    rewards: {
      girlStats: { love: 10 },
      setFlags: ["yumi_chapter_2_date", "yumi_chapter_2_completed"],
    },
  },
];
