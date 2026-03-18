import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Tutor Request
// Description: Yumi asks for extra tutoring after class.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: yumi_tutor_request_event  (Classroom, minAffection: 0)
//   ├─ [Tell her to stick to regular office hours.]  → yumi_tutor_request_office_hours    END [hasMetYumi]
//   └─ [Offer her private tutoring.]                 → yumi_tutor_request_private          END [hasMetYumi]
// Rewards: hasMetYumi, unlockCharacters: Yumi
// ─────────────────────────────────────────────────────────────────────────────

// FROM: yumi_tutor_request_event → [Tell her to stick to regular office hours.]
const yumiTutorRequestOfficeHours: Dialogue = {
  id: "yumi_tutor_request_office_hours",
  lines: [
    {
      speaker: "You",
      text: "I appreciate the enthusiasm, Yumi. It's good to see.",
    },
    {
      speaker: "You",
      text: "My office hours are listed on the syllabus. If you get stuck, just drop by then.",
    },
    {
      speaker: null,
      text: "She looks a little disappointed she didn't get a more personal commitment, but she nods politely.",
    },
    {
      speaker: "Yumi",
      text: "Oh. Okay. I'll make sure to check the schedule.",
      expression: "sad",
    },
    {
      speaker: "You",
      text: "Don't worry. If you work hard, you'll do fine.",
    },
    {
      speaker: "Yumi",
      text: "Right. Thank you, Professor. Welcome to the school.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She gives you a small bow and heads out the door.",
    },
  ],
};

// FROM: yumi_tutor_request_event → [Offer her private tutoring.]
const yumiTutorRequestPrivate: Dialogue = {
  id: "yumi_tutor_request_private",
  lines: [
    {
      speaker: "You",
      text: "You know, it's rare to see someone who actually wants to learn the craft, not just pass the test.",
    },
    {
      speaker: "You",
      text: "If you're really serious about becoming a pro, I can help you out.",
    },
    {
      speaker: "You",
      text: "I can set aside some time for one-on-one tutoring in my office so you stay ahead of the curve.",
    },
    {
      speaker: "Yumi",
      text: "Really? You'd do that? That would be amazing!",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Her face lights up completely.",
    },
    {
      speaker: "You",
      text: "Just bring your notes and come by my office whenever you're free.",
    },
    {
      speaker: "Yumi",
      text: "I will! Thank you so much, Professor.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "She beams at you, looking genuinely happy.",
    },
    {
      speaker: "Yumi",
      text: "I promise I won't waste your time. I'm going to be your best student.",
      expression: "happy",
    },
    {
      speaker: "Yumi",
      text: "My evenings are a little strange. I do some online work too, so I might be late sometimes.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She walks out of the classroom with a bounce in her step, clutching her notebook like it's a prize.",
    },
    {
      speaker: null,
      text: "She seems sharp. Hopefully, she keeps that energy up for the rest of the semester.",
    },
  ],
};

export const yumiEvent1Dialogues: Record<string, Dialogue> = {
  yumi_tutor_request_office_hours: yumiTutorRequestOfficeHours,
  yumi_tutor_request_private: yumiTutorRequestPrivate,
};

export const yumiEvent1Events: CharacterEvent[] = [
  {
    id: "yumi_tutor_request_event",
    name: "Tutor Request",
    description: "Yumi asks for extra tutoring after class.",
    priority: 240,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Classroom",
    },
    dialogue: {
      id: "yumi_tutor_request_event",
      lines: [
        {
          speaker: null,
          text: "The first lecture of the semester finally winds down.",
        },
        {
          speaker: null,
          text: "You shut down the projector. The room, which was buzzing with nervous energy an hour ago, is now empty.",
        },
        {
          speaker: null,
          text: "You start packing your laptop into your bag, ready to head back to your office.",
        },
        {
          speaker: null,
          text: "A timid voice breaks the silence. \"Excuse me? Professor?\"",
        },
        {
          speaker: null,
          text: "You look up. There is still one student left.",
        },
        {
          speaker: null,
          text: "She's standing near the front row, holding a notebook close to her chest.",
        },
        { speaker: "You", text: "Yes? Can I help you with something?" },
        {
          speaker: "Yumi",
          text: "I'm Yumi. I just wanted to introduce myself since I'll be in your class this semester.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Nice to meet you, Yumi. I'm {playerName}. Did everything make sense today? I know the syllabus review can be a bit boring.",
        },
        {
          speaker: "Yumi",
          text: "Oh, no! It wasn't boring at all.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She stays near the front row, eyes bright with admiration.",
        },
        {
          speaker: "Yumi",
          text: "When you started talking about the core concept, you made it sound so simple. Like it was a language you speak fluently.",
          expression: "excited",
        },
        {
          speaker: "Yumi",
          text: "I've had other teachers before, but they just read from the book. You actually sound like a real pro. Like you've lived it.",
          expression: "excited",
        },
        {
          speaker: "You",
          text: "Well... I spent a lot of time in the trenches before I started teaching. Old habits die hard.",
        },
        {
          speaker: "Yumi",
          text: "That's exactly what I want to be.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "Her expression turns serious, determined.",
        },
        {
          speaker: "Yumi",
          text: "I want to be that good one day. I want to be able to just look at a problem and know the answer, like you do.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "It just takes practice, Yumi. And a lot of late nights.",
        },
        {
          speaker: "Yumi",
          text: "I know. And I'm willing to work hard.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She hesitates, shifting her weight. The confidence wavers just a little.",
        },
        {
          speaker: "Yumi",
          text: "But... I also know I'm a little slower than some of the other students. Sometimes I get stuck on the basics.",
          expression: "shy",
        },
        {
          speaker: "Yumi",
          text: "I really don't want to fall behind. I want to be the best in the class.",
          expression: "shy",
        },
        {
          speaker: "Yumi",
          text: "I was wondering... if you had any office hours? Or maybe... if you could help me with some extra tutoring?",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She seems genuinely motivated. It's rare to see a student this enthusiastic on day one.",
        },
        {
          speaker: "You",
          text: "What do you tell her?",
          choices: [
            {
              text: "Tell her to stick to regular office hours.",
              affectionChange: 1,
              nextDialogueId: "yumi_tutor_request_office_hours",
            },
            {
              text: "Offer her private tutoring.",
              affectionChange: 3,
              nextDialogueId: "yumi_tutor_request_private",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetYumi"],
      unlockCharacters: ["Yumi"],
    },
  },
];
