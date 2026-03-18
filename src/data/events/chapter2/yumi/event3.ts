import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Rules of Engagement
// Description: Yumi sends you a plan to keep things quiet.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// Three separate CharacterEvents fire based on relationship flag; each uses
// its own fully inline dialogue const — narrator-only, no player choices.
//
// EVENT START: yumi_c2_event_3_sub  (no location, yumi_relationship_secret)
//   └─ [auto]  → yumi_c2_ev3_sub    END [yumi_c2_event_3_completed]
//
// EVENT START: yumi_c2_event_3_dom  (no location, yumi_relationship_secret_dom)
//   └─ [auto]  → yumi_c2_ev3_dom    END [yumi_c2_event_3_completed]
//
// EVENT START: yumi_c2_event_3_neutral  (no location, yumi_relationship_secret_neutral)
//   └─ [auto]  → yumi_c2_ev3_neutral   END [yumi_c2_event_3_completed]
//
// Rewards: yumi_c2_event_3_completed
// ─────────────────────────────────────────────────────────────────────────────

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

export const yumiEvent3Dialogues: Record<string, Dialogue> = {
  yumi_c2_ev3_sub: yumiC2Ev3Sub,
  yumi_c2_ev3_dom: yumiC2Ev3Dom,
  yumi_c2_ev3_neutral: yumiC2Ev3Neutral,
};

export const yumiEvent3Events: CharacterEvent[] = [
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
];
