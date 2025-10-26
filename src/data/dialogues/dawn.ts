import { Dialogue } from "./index";

export const dawnFirstMeeting: Dialogue = {
  id: "dawn_first_meeting",
  lines: [
    {
      speaker: null,
      text: "A familiar energetic voice calls out to you.",
    },
    { speaker: "Dawn", text: "{playerName}! Hey!", expression: "happy" },
    {
      speaker: null,
      text: "Dawn - Iris's daughter. You've known her since she was a kid. She just turned 18.",
    },
    {
      speaker: "Dawn",
      text: "What are you doing here?",
      expression: "happy",
      choices: [
        { text: "I'm here to meet you!", affectionChange: 10, trustChange: 10 },
        {
          text: "I'm checking out the 'student body'",
          affectionChange: -10,
          trustChange: -10,
          nextDialogueId: "checking_out_the_student_body",
        },
        {
          text: "I work here. I'm here to work.",
          affectionChange: 10,
          trustChange: 10,
          condition: {
            location: [
              "University",
              "University Hallway",
              "Classroom",
              "Office",
              "Iris' Office",
              "Men's Bathroom",
              "Women's Bathroom",
              "University Parking Lot",
            ],
          },
          nextDialogueId: "i_work_here",
        },
      ],
    },
    {
      speaker: "Dawn",
      text: "Why? are going to fuck today?",
    },
    {
      speaker: null,
      text: "She walks away motioning obscene gestures.",
      choices: [
        { text: "follow her", affectionChange: 0, trustChange: 0 },
        { text: "ignore her", affectionChange: 0, trustChange: 0 },
      ],
    },
    {
      speaker: "Dawn",
      text: "Good, you came, 'Daddy'",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Fuck! I've missed this cock!",
      imageSlide: "/images/events/dawn_school_bj.png",
    },
  ],
};
export const iWorkHere: Dialogue = {
  id: "i_work_here",
  lines: [
    {
      speaker: "You",
      text: "Hey Dawn! Yeah, I work here, don't you remember?",
      imageSlide: "/images/locations/office/afternoon.png",
    },
    {
      speaker: "Dawn",
      text: "Cool!",
      expression: "happy",
    },
    {
      speaker: "Dawn",
      text: "What do you teach?",
      choices: [
        {
          text: "I'm a programming professor.",
          affectionChange: 5,
          trustChange: 5,
          nextDialogueId: "told_teaching_programming",
        },
        {
          text: "I'm a sex-ed professor.",
          affectionChange: -5,
          trustChange: -5,
          nextDialogueId: "dawn_sex_ed_joke",
        },
      ],
    },
  ],
};
export const checkingOutTheStudentBody: Dialogue = {
  id: "checking_out_the_student_body",
  lines: [
    {
      speaker: "Dawn",
      text: "Eww {playerName}, don't be gross.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She walks away from you.",
    },
  ],
};
export const dawnSexEdJoke: Dialogue = {
  id: "dawn_sex_ed_joke",
  lines: [
    {
      speaker: "You",
      text: "I'm a sex-ed professor.",
    },
    {
      speaker: "Dawn",
      text: "I see. I'm sure you are a great teacher.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "W-Why do you say that?",
    },
    {
      speaker: "Dawn",
      text: "Oh... no reason, just pulling your leg.",
      expression: "happy",
      choices: [
        {
          text: "O-Okay... I'm actually a programming professor.",
          affectionChange: 5,
          trustChange: 5,
          nextDialogueId: "told_teaching_programming",
        },
        {
          text: "I'm really just checking out the 'student body'.",
          affectionChange: -5,
          trustChange: -5,
          nextDialogueId: "dawn_sex_ed_joke",
        },
        {
          text: "I gotta go, I have sex to teach.",
          affectionChange: -5,
          trustChange: -5,
        },
      ],
    },
    {
      speaker: null,
      text: "You wave goodbye to Dawn.",
    },
  ],
};

export const toldTeachingProgramming: Dialogue = {
  id: "told_teaching_programming",
  lines: [
    {
      speaker: "Dawn",
      text: "I know, mom already told me *tee hee hee*.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Were you just messing with me?",
    },
    {
      speaker: "Dawn",
      text: "Maybe...",
      expression: "happy",
    },
    {
      speaker: "Dawn",
      text: "Anyway, don't you have a class to get to?",
      expression: "happy",
    },
    {
      speaker: "Dawn",
      text: "I would know, I signed up for it.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Oh, I see.",
      expression: "happy",
    },
    {
      speaker: "Dawn",
      text: "I'll see you in class!",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She walks ahead of you towards the classroom.",
    },
  ],
};

export const fuckMe: Dialogue = {
  id: "dawn_fuck_me",
  lines: [
    {
      speaker: "Dawn",
      text: "You're not supposed to touch me!",
      expression: "angry",
    },
    { speaker: "You", text: "I'm sorry, I didn't mean to..." },
    { speaker: "Dawn", text: "But I liked it!", expression: "happy" },
  ],
};
export const dawnGrown: Dialogue = {
  id: "dawn_grown_up",
  requiresFirstTimeOnly: true,
  lines: [
    {
      speaker: "Dawn",
      text: "{playerName}! There you are!",
      expression: "happy",
    },
    { speaker: "You", text: "Hey Dawn, what's up?" },
    {
      speaker: "Dawn",
      text: "I... I wanted to ask you something...",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "Do you think I'm still just a kid to you?",
      expression: "sad",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Of course! You'll always be my little niece.",
          affectionChange: -5,
          moodChange: -10,
          trustChange: -2,
        },
        {
          text: "You've grown up a lot. I've noticed.",
          affectionChange: 5,
          moodChange: 5,
          trustChange: 3,
        },
        {
          text: "Why do you ask? Is something bothering you?",
          affectionChange: 3,
          moodChange: 3,
          trustChange: 4,
        },
      ],
    },
    {
      speaker: "Dawn",
      text: "I... never mind. Thanks for talking with me.",
      expression: "neutral",
    },
  ],
};
export const cocksucker: Dialogue = {
  id: "cocksucker",
  lines: [
    {
      speaker: "You",
      text: "I-Is that... Dawn?",
      imageSlide: "/images/events/dawn_school_bj.png",
    },
    {
      speaker: "You",
      text: "... HOT!!",
      imageSlide: "/images/events/dawn_school_bj.png",
    },
  ],
};

export const dawnDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "dawn_grown_up",
    requiresFirstTimeOnly: true,

    lines: [
      {
        speaker: null,
        text: "You enjoy a friendly chat with Dawn",
        expression: "happy",
        imageSlide: "/images/events/dawn_school_chat.png",
      },
      // { speaker: "You", text: "Hey Dawn, what's up?" },
      // {
      //   speaker: "Dawn",
      //   text: "I... I wanted to ask you something...",
      //   expression: "neutral",
      // },
      // {
      //   speaker: "Dawn",
      //   text: "Do you think I'm still just a kid to you?",
      //   expression: "sad",
      // },
      // {
      //   speaker: "You",
      //   text: "How do you respond?",
      //   choices: [
      //     {
      //       text: "Of course! You'll always be my little niece.",
      //       affectionChange: -5,
      //       moodChange: -10,
      //       trustChange: -2,
      //     },
      //     {
      //       text: "You've grown up a lot. I've noticed.",
      //       affectionChange: 5,
      //       moodChange: 5,
      //       trustChange: 3,
      //     },
      //     {
      //       text: "Why do you ask? Is something bothering you?",
      //       affectionChange: 3,
      //       moodChange: 3,
      //       trustChange: 4,
      //     },
      // ],
      // },
      // {
      //   speaker: "Dawn",
      //   text: "I... never mind. Thanks for talking with me.",
      //   expression: "neutral",
      // },
    ],
  },
  Hug: {
    id: "dawn_hug",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: "Dawn", text: "Can I... get a hug?", expression: "neutral" },
      {
        speaker: null,
        text: "Dawn looks at you expectantly, her expression more serious than usual.",
      },
      { speaker: "You", text: "Of course, come here." },
      {
        speaker: null,
        text: "You hug Dawn. She holds on a little longer than usual.",
      },
      {
        speaker: "Dawn",
        text: "Thanks, {playerName}... you're the best.",
        expression: "happy",
      },
      { speaker: null, text: "You notice she's trembling slightly." },
    ],
  },

  i_work_here: iWorkHere,
  dawn_fuck_me: fuckMe,
  dawn_grown_up: dawnGrown,
  checking_out_the_student_body: checkingOutTheStudentBody,
  dawn_sex_ed_joke: dawnSexEdJoke,
  told_teaching_programming: toldTeachingProgramming,
  cocksucker: cocksucker,
};
