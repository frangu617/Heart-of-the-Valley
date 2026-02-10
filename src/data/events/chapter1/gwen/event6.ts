import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 6: Chapter 1 Finale (Gwen Leads)
// Descriptions: Gwen sets the terms. | Gwen keeps it transactional.

const gwenFinaleSupportive: Dialogue = {
  id: "gwen_finale_supportive",
  lines: [
    {
      speaker: "You",
      text: "You can trust me.",
    },
    {
      speaker: "Gwen",
      text: "I didn't think I could, but... I do.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She closes the space and kisses you. It's quick, real, and not for show.",
    },
  ],
};

const gwenFinaleHush: Dialogue = {
  id: "gwen_finale_hush",
  lines: [
    { speaker: "You", text: "Then show me you mean it." },
    {
      speaker: "Gwen",
      text: "Clear enough.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She kisses you once, controlled and transactional.",
    },
    {
      speaker: "Gwen",
      text: "Now keep your word.",
      expression: "neutral",
    },
  ],
};

export const gwenEvent6Dialogues: Record<string, Dialogue> = {
  gwen_finale_supportive: gwenFinaleSupportive,
  gwen_finale_hush: gwenFinaleHush,
};

export const gwenEvent6Events: CharacterEvent[] = [
  {
    id: "gwen_chapter_1_finale",
    name: "Chapter 1 Finale (Gwen Leads)",
    description: "Gwen sets the terms.",
    quest: {
      title: "Gwen's Terms",
      description: "Check the hallway late (8 PM–midnight).",
    },
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 10,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenDomPath", "gwenRevealDone"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale",
      lines: [
        {
          speaker: null,
          text: "A late-night knock pulls you to the door.",
        },
        {
          speaker: null,
          text: "Gwen stands there in a hoodie, hair damp, the edge gone from her voice.",
        },
        {
          speaker: "Gwen",
          text: "You kept your mouth shut. That buys trust.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "If this is a thing, I set the pace.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "And... I'm starting to like you more than a neighbor should.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "You can trust me.",
              affectionChange: 2,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_finale_supportive",
            },
            {
              text: "Whatever you need, I'm here.",
              affectionChange: 1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_finale_supportive",
            },
          ],
        },
      ],
    },
  },
  {
    id: "gwen_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Keep Quiet)",
    description: "Gwen keeps it transactional.",
    quest: {
      title: "Keep Quiet",
      description: "Check the hallway late (8 PM–midnight).",
    },
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 10,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenSubPath", "gwenRevealDone"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale_sub",
      lines: [
        {
          speaker: null,
          text: "You hear a knock and open the door to find Gwen, jaw tight, eyes level.",
        },
        {
          speaker: "Gwen",
          text: "You wanted something for your silence. Here it is.",
          expression: "neutral",
          nextDialogueId: "gwen_finale_hush",
        },
      ],
    },
  },
];
