import { Dialogue } from "./index";

export const irisFirstMeeting: Dialogue = {
  id: "iris_first_meeting",
  lines: [
    {
      speaker: null,
      text: "You're walking down the university hallway when you notice a colleague at her office door.",
    },
    {
      speaker: "Iris",
      text: "Oh! Frank... good morning.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Professor Iris - she teaches literature. You've known her for a while, and you are good friends.",
    },
    {
      speaker: "Iris",
      text: "I was just heading to grab some coffee. Would you... like to join me?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Sure, I could use some coffee.",
          affectionChange: 3,
          moodChange: 2,
          nextDialogueId: "iris intro choice yes",
        },
        {
          text: "Maybe another time. I have work to do.",
          affectionChange: -2,
          moodChange: -3,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I understand. Have a good day, Frank.",
      expression: "neutral",
    },
  ],
  // id: "iris intro choice yes",
// lines[
//   {
//     speaker:"Iris",
//     text:"Great, I'll see you later then!",
//     expression: "excited",
  
//   }
// ]
};


export const irisDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "iris_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Iris",
        text: "Oh, Frank! I didn't expect to see you here...",
        expression: "neutral",
      },
      {
        speaker: "Iris",
        text: "How... how was your morning class?",
        expression: "neutral",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "It was great! The students were really engaged today.",
            affectionChange: 2,
            moodChange: 1,
          },
          {
            text: "Same as always. Nothing special.",
            affectionChange: -1,
            moodChange: -1,
          },
          {
            text: "It would be better if I could spend more time with you.",
            affectionChange: 3,
            moodChange: 2,
            trustChange: 1,
          },
        ],
      },
      {
        speaker: "Iris",
        text: "I... I see. That's... that's good to hear.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "Iris seems pleased with your answer. You notice a slight blush on her cheeks.",
      },
    ],
  },
  Hug: {
    id: "iris_hug",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: "You", text: "Can I give you a hug?" },
      { speaker: "Iris", text: "A hug? I... um...", expression: "neutral" },
      {
        speaker: null,
        text: "Iris looks uncertain, glancing around nervously.",
      },
      {
        speaker: "Iris",
        text: "I suppose that would be... alright.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "You embrace Iris gently. She seems to relax slightly in your arms.",
      },
      {
        speaker: "Iris",
        text: "Thank you, Frank. That was... nice.",
        expression: "love",
      },
    ],
  },
  Kiss: {
    id: "iris_kiss",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: null, text: "You lean in closer to Iris." },
      {
        speaker: "Iris",
        text: "Frank, what are you...?",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "You kiss her softly. Her eyes widen in surprise.",
      },
      {
        speaker: "Iris",
        text: "We... we shouldn't... Dawn might...",
        expression: "sad",
      },
      {
        speaker: "You",
        text: "What do you say?",
        choices: [
          {
            text: "You're right, I'm sorry. This was a mistake.",
            affectionChange: -5,
            moodChange: -10,
            trustChange: -3,
          },
          {
            text: "Don't worry about Dawn. This is about us.",
            affectionChange: 5,
            moodChange: 5,
            trustChange: 2,
          },
          {
            text: "We can take this slow. No pressure.",
            affectionChange: 8,
            moodChange: 8,
            trustChange: 5,
          },
        ],
      },
    ],
  },
};
