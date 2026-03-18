import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: First Tutoring Session
// Description: Yumi arrives for one-on-one tutoring in your office.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: yumi_private_tutoring_event  (Office, minAffection: 5, after yumi_tutor_request_event)
//   ├─ [Be gentle and encouraging (Nice Teacher)]  → yumi_tutor1_gentle    END [yumiDomPath]
//   └─ [Be stern and critical (Mean Teacher)]      → yumi_tutor1_stern     END [yumiSubPath]
// Rewards: playerMoney: 15, intelligence +1
// ─────────────────────────────────────────────────────────────────────────────

// FROM: yumi_private_tutoring_event → [Be gentle and encouraging (Nice Teacher)]
const yumiTutor1Gentle: Dialogue = {
  id: "yumi_tutor1_gentle",
  lines: [
    {
      speaker: "You",
      text: "Hey, don't panic. It's a common mistake. You're just overthinking it.",
    },
    {
      speaker: "You",
      text: "Think of it like writing a rough draft. You got the ideas down, now we just need to polish it.",
    },
    {
      speaker: "Yumi",
      text: "Oh. Okay. A rough draft. That makes me feel better.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She relaxes, her shoulders dropping. She smiles at you, feeling safe to make mistakes.",
    },
    {
      speaker: "Yumi",
      text: "So... how do we polish it?",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Look at this section here. If we simplify this logic, everything else falls into place.",
    },
    {
      speaker: null,
      text: "She nods intently, wiping away her earlier hesitation. She leans over the keyboard.",
    },
    {
      speaker: "Yumi",
      text: "Okay. I think I see it. I just need to move this...",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She starts typing. It's instantaneous. Her fingers fly across the keys in a rhythmic blur.",
    },
    {
      speaker: null,
      text: "She isn't hunting and pecking; she's executing commands with the muscle memory of someone who lives on a computer.",
    },
    { speaker: "You", text: "You're surprisingly fast." },
    {
      speaker: "Yumi",
      text: "Gotta go fast, right? Efficiency.",
      expression: "neutral",
    },
    { speaker: "You", text: "It's fine. Just... impressive." },
    {
      speaker: null,
      text: "The session continues for another twenty minutes until the code finally runs clean.",
    },
    {
      speaker: "Yumi",
      text: "It worked! It's running!",
      expression: "excited",
    },
    {
      speaker: null,
      text: "She throws her hands up, almost doing a victory pose before remembering where she is.",
    },
    {
      speaker: "Yumi",
      text: "I mean... good. That is... acceptable.",
      expression: "shy",
    },
    { speaker: "You", text: "You did good work today, Yumi." },
    {
      speaker: null,
      text: "She beams, closing her laptop with a satisfying snap.",
    },
    {
      speaker: "Yumi",
      text: "Thanks, Professor! I knew I could get it. I just needed a little backup.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She packs up her things and leaves. You have a feeling she's going to be a regular in your office.",
    },
    {
      speaker: null,
      text: "You finish the session and get back to work.",
      choices: [
        {
          text: "Wrap up for today",
          affectionChange: 0,
          setFlags: ["yumiDomPath"],
        },
      ],
    },
  ],
};

// FROM: yumi_private_tutoring_event → [Be stern and critical (Mean Teacher)]
const yumiTutor1Stern: Dialogue = {
  id: "yumi_tutor1_stern",
  lines: [
    {
      speaker: "You",
      text: "Yumi, this is inefficient. You're cluttering the whole thing.",
    },
    {
      speaker: "You",
      text: "If you want to be a professional, you can't write sloppy code like this. You need to focus.",
    },
    {
      speaker: "Yumi",
      text: "I... I'm sorry. I didn't realize it was that bad.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She looks down at her lap, her face flushing with embarrassment. She seems smaller, more meek.",
    },
    {
      speaker: "Yumi",
      text: "I'll fix it. Just tell me what to do.",
      expression: "sad",
    },
    {
      speaker: "You",
      text: "Look at this section here. If we simplify this logic, everything else falls into place.",
    },
    {
      speaker: null,
      text: "She nods intently, wiping away her earlier hesitation. She leans over the keyboard.",
    },
    {
      speaker: "Yumi",
      text: "Okay. I think I see it. I just need to move this...",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She starts typing. It's instantaneous. Her fingers fly across the keys in a rhythmic blur.",
    },
    {
      speaker: null,
      text: "She isn't hunting and pecking; she's executing commands with the muscle memory of someone who lives on a computer.",
    },
    { speaker: "You", text: "You're surprisingly fast." },
    {
      speaker: "Yumi",
      text: "Sorry. Is it too loud? I can keep it quiet.",
      expression: "shy",
    },
    { speaker: "You", text: "It's fine. Just... impressive." },
    {
      speaker: null,
      text: "The session continues for another twenty minutes until the code finally runs clean.",
    },
    {
      speaker: "Yumi",
      text: "It worked! It's running!",
      expression: "excited",
    },
    {
      speaker: null,
      text: "She throws her hands up, almost doing a victory pose before remembering where she is.",
    },
    {
      speaker: "Yumi",
      text: "I mean... good. That is... acceptable.",
      expression: "shy",
    },
    { speaker: "You", text: "You did good work today, Yumi." },
    {
      speaker: null,
      text: "She offers a small, obedient bow from her chair.",
    },
    {
      speaker: "Yumi",
      text: "Thank you, Professor. I'll try to be less sloppy next time. I promise.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She packs up her things and leaves. You have a feeling she's going to be a regular in your office.",
    },
    {
      speaker: null,
      text: "You finish the session and get back to work.",
      choices: [
        {
          text: "Wrap up for today",
          affectionChange: 0,
          setFlags: ["yumiSubPath"],
        },
      ],
    },
  ],
};

export const yumiEvent2Dialogues: Record<string, Dialogue> = {
  yumi_tutor1_gentle: yumiTutor1Gentle,
  yumi_tutor1_stern: yumiTutor1Stern,
};

export const yumiEvent2Events: CharacterEvent[] = [
  {
    id: "yumi_private_tutoring_event",
    name: "First Tutoring Session",
    description: "Yumi arrives for one-on-one tutoring in your office.",
    priority: 230,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Office",
      requiredPreviousEvents: ["yumi_tutor_request_event"],
    },
    dialogue: {
      id: "yumi_private_tutoring_event",
      lines: [
        {
          speaker: null,
          text: "Yumi arrives on time, though she hesitates for a second before knocking. She seems eager to learn but nervous about the one-on-one setting.",
        },
        {
          speaker: "Yumi",
          text: "I'm ready, Professor. I brought the assignment.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Have a seat. Let's see where you're getting stuck.",
        },
        {
          speaker: null,
          text: "She pulls up a chair and opens her laptop. You lean in, scanning the work she's done so far.",
        },
        {
          speaker: "You",
          text: "I see what you're doing here. You're trying to force the solution, and it's making the code messy.",
        },
        {
          speaker: null,
          text: "She shrinks back slightly, looking worried that she's already failing.",
        },
        {
          speaker: "You",
          text: "How do you correct her?",
          choices: [
            {
              text: "Be gentle and encouraging (Nice Teacher)",
              affectionChange: 2,
              nextDialogueId: "yumi_tutor1_gentle",
            },
            {
              text: "Be stern and critical (Mean Teacher)",
              affectionChange: -1,
              nextDialogueId: "yumi_tutor1_stern",
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
