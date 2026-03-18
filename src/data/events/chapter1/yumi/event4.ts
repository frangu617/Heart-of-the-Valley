import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: Classroom Flirt (Bold)
// Descriptions: Yumi flirts openly after class. | You tease a shy Yumi after class.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: yumi_classroom_flirt_dom  (Classroom, minAffection: 15, flag: yumiDomPath)
//   ├─ [Let her continue (Enjoy it).]        → yumi_classroom_flirt_dom_enjoy   END
//   └─ [Check her behavior (Tease back).]    → yumi_classroom_flirt_dom_tease   END
//
// EVENT START: yumi_classroom_flirt_sub  (Classroom, minAffection: 15, flag: yumiSubPath)
//   ├─ [Push it a little further.]           → yumi_classroom_flirt_sub_push    END
//   └─ [Keep it sweet.]                      → yumi_classroom_flirt_sub_sweet   END
// ─────────────────────────────────────────────────────────────────────────────

// FROM: yumi_classroom_flirt_dom → [Let her continue (Enjoy it).]
const yumiClassroomFlirtDomEnjoy: Dialogue = {
  id: "yumi_classroom_flirt_dom_enjoy",
  lines: [
    { speaker: "You", text: "Is that so? And what else do you notice?" },
    {
      speaker: null,
      text: "You take the tissue and wipe the dust away, letting her watch.",
    },
    {
      speaker: null,
      text: "Yumi's smile widens. Her gaze lingers on your collar.",
    },
    { speaker: "Yumi", text: "I notice that you're not stopping me.", expression: "happy" },
    {
      speaker: "Yumi",
      text: "Maybe I should stay after class more often. Help you... decompress.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She eases back, smoothing her own skirt, looking thoroughly pleased with herself.",
    },
    {
      speaker: "Yumi",
      text: "Get some rest, Professor. You look better when you're not frowning.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Yumi heads to the door with a composed stride, glancing back once to make sure you're watching her leave.",
    },
    {
      speaker: null,
      text: "That student is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

// FROM: yumi_classroom_flirt_dom → [Check her behavior (Tease back).]
const yumiClassroomFlirtDomTease: Dialogue = {
  id: "yumi_classroom_flirt_dom_tease",
  lines: [
    {
      speaker: "You",
      text: "Careful, Yumi. People might think you're teacher's pet.",
    },
    {
      speaker: null,
      text: "You keep your tone light, but you don't invite her any closer.",
    },
    {
      speaker: "Yumi",
      text: "Oh, Professor. I aim much higher than pet.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She finally steps back, smoothing her own skirt, looking thoroughly pleased with herself.",
    },
    {
      speaker: "Yumi",
      text: "Get some rest, Professor. You look better when you're not frowning.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Yumi heads to the door with a composed stride, glancing back once to make sure you're watching her leave.",
    },
    {
      speaker: null,
      text: "That student is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

// FROM: yumi_classroom_flirt_sub → [Push it a little further.]
const yumiClassroomFlirtSubPush: Dialogue = {
  id: "yumi_classroom_flirt_sub_push",
  lines: [
    {
      speaker: "You",
      text: "You were very focused today. I caught you staring at me quite a few times.",
    },
    { speaker: "You", text: "I didn't mind it." },
    {
      speaker: "Yumi",
      text: "I-I wasn't staring! I mean... I was looking at the board! Mostly!",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She looks down, fidgeting with her hands, clearly happy that you noticed her.",
    },
    {
      speaker: "Yumi",
      text: "I just... like listening to you talk.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She grabs her bag, steadying herself under the attention.",
    },
    {
      speaker: "Yumi",
      text: "I... I should go before it gets too late.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Yumi hurries out of the room, glancing back once with a small, shy smile before disappearing into the hallway.",
    },
    {
      speaker: null,
      text: "That student is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

// FROM: yumi_classroom_flirt_sub → [Keep it sweet.]
const yumiClassroomFlirtSubSweet: Dialogue = {
  id: "yumi_classroom_flirt_sub_sweet",
  lines: [
    {
      speaker: "You",
      text: "You look nice today, Yumi. The color suits you.",
    },
    {
      speaker: "Yumi",
      text: "Th-thank you, Professor! I... I tried to dress up a little.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She grabs her bag, steadying herself under the attention.",
    },
    {
      speaker: "Yumi",
      text: "I... I should go before it gets too late.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Yumi hurries out of the room, glancing back once with a small, shy smile before disappearing into the hallway.",
    },
    {
      speaker: null,
      text: "That student is going to be the death of my tenure if I'm not careful.",
    },
    {
      speaker: null,
      text: "You gather your notes and head out.",
      choices: [
        { text: "Wrap up for today", affectionChange: 5 },
      ],
    },
  ],
};

export const yumiEvent4Dialogues: Record<string, Dialogue> = {
  yumi_classroom_flirt_dom_enjoy: yumiClassroomFlirtDomEnjoy,
  yumi_classroom_flirt_dom_tease: yumiClassroomFlirtDomTease,
  yumi_classroom_flirt_sub_push: yumiClassroomFlirtSubPush,
  yumi_classroom_flirt_sub_sweet: yumiClassroomFlirtSubSweet,
};

export const yumiEvent4Events: CharacterEvent[] = [
  {
    id: "yumi_classroom_flirt_dom",
    name: "Classroom Flirt (Bold)",
    description: "Yumi flirts openly after class.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 15,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Classroom",
      requiredPreviousEvents: ["yumi_tutoring_event_2_dom"],
      requiredFlags: ["yumiDomPath"],
    },
    dialogue: {
      id: "yumi_classroom_flirt_dom",
      lines: [
        {
          speaker: null,
          text: "The lecture is over. The students have filed out, leaving the room in a sudden, heavy silence.",
        },
        {
          speaker: null,
          text: "You are at the whiteboard, erasing a complex logic diagram.",
        },
        {
          speaker: null,
          text: "You put the eraser down and turn around, dusting the chalk from your hands.",
        },
        {
          speaker: null,
          text: "You aren't alone. Yumi is still there, leaning against the front row desk, watching you.",
        },
        {
          speaker: "Yumi",
          text: "You work too hard, Professor. You look tense.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "It comes with the territory, Yumi. Did you have a question?",
        },
        {
          speaker: null,
          text: "She pushes off the desk and walks up the aisle, stopping just short of the podium.",
        },
        {
          speaker: "Yumi",
          text: "No question. I just noticed something.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She tilts her head toward your lapel, then taps her pen lightly against her notebook.",
        },
        {
          speaker: "Yumi",
          text: "You have marker dust on your lapel. It looks messy.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She holds out a clean tissue, waiting to see if you'll take it.",
        },
        { speaker: "You", text: "Yumi..." },
        {
          speaker: "Yumi",
          text: "I like a man who takes care of his appearance. You should let me look after you more often.",
          expression: "happy",
        },
        {
          speaker: "Yumi",
          text: "I'm very detail-oriented. I notice things other people miss.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you respond to her boldness?",
          choices: [
            {
              text: "Let her continue (Enjoy it).",
              affectionChange: 2,
              nextDialogueId: "yumi_classroom_flirt_dom_enjoy",
            },
            {
              text: "Check her behavior (Tease back).",
              affectionChange: 3,
              nextDialogueId: "yumi_classroom_flirt_dom_tease",
            },
          ],
        },
      ],
    },
  },
  {
    id: "yumi_classroom_flirt_sub",
    name: "Classroom Flirt (Shy)",
    description: "You tease a shy Yumi after class.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 15,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Classroom",
      requiredPreviousEvents: ["yumi_tutoring_event_2_sub"],
      requiredFlags: ["yumiSubPath"],
    },
    dialogue: {
      id: "yumi_classroom_flirt_sub",
      lines: [
        {
          speaker: null,
          text: "The lecture is over. The students have filed out, leaving the room in a sudden, heavy silence.",
        },
        {
          speaker: null,
          text: "You are at the whiteboard, erasing a complex logic diagram.",
        },
        {
          speaker: null,
          text: "You put the eraser down and turn around, dusting the chalk from your hands.",
        },
        {
          speaker: null,
          text: "You aren't alone. Yumi is still there, packing her bag slowly and glancing at you every few seconds.",
        },
        {
          speaker: "You",
          text: "Yumi?",
        },
        {
          speaker: "Yumi",
          text: "Oh! Yes, Professor? I was just leaving! I didn't mean to loiter.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "You're fine. Actually, hold still for a second.",
        },
        {
          speaker: "Yumi",
          text: "H-hold still?",
          expression: "shy",
        },
        {
          speaker: null,
          text: "You take a small step closer, leaving a polite gap. She freezes, her eyes widening, her breath catching.",
        },
        {
          speaker: null,
          text: "You reach out and gently brush a stray lock of hair behind her ear, careful and quick.",
        },
        { speaker: "You", text: "There. Your hair was in your eyes." },
        {
          speaker: null,
          text: "Her face turns a brilliant shade of crimson. She steadies herself and steps back half a pace.",
        },
        {
          speaker: "Yumi",
          text: "Oh... I... thank you.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Push it a little further.",
              affectionChange: 3,
              nextDialogueId: "yumi_classroom_flirt_sub_push",
            },
            {
              text: "Keep it sweet.",
              affectionChange: 2,
              nextDialogueId: "yumi_classroom_flirt_sub_sweet",
            },
          ],
        },
      ],
    },
  },
];
