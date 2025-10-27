// import { text } from "stream/consumers";
import { CharacterEvent } from "./types";

export const dawnEvents: CharacterEvent[] = [
  {
    id: "first_meeting",
    name: "First Meeting with Dawn",
    description: "First Meeting with Dawn",
    priority: 100,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Classroom",
    },
    dialogue: {
      id: "dawn_first_meeting",
      lines: [
        {
          speaker: null,
          text: "The lecture hall is already half-full when you arrive. Students scattered across the rows, some chatting, others absorbed in their phones. First day energy - nervous, excited, oblivious.",
        },
        {
          speaker: null,
          text: "You're setting up your laptop when movement catches your eye. Someone in the front row, waving enthusiastically.",
        },
        {
          speaker: null,
          text: "It takes you a second. Then it hits you like a truck.",
        },
        {
          speaker: "Dawn",
          text: "Professor {playerName}! I didn't know you'd be teaching this class!",
          expression: "happy",
        },
        {
          speaker: null,
          text: "Dawn. Iris's daughter. The last time you saw her, she was... what, ten? Maybe eleven? Running around Iris's old apartment, full of that boundless kid energy.",
        },
        {
          speaker: null,
          text: "That was then. This is now.",
        },
        {
          speaker: null,
          text: "She's grown. That's the only word for it, though it feels inadequate. The girl you remember has been replaced by... someone else entirely. Confident. Striking. Aware of it.",
        },
        {
          speaker: "You",
          text: "Dawn? Holy— I mean, wow. When did you...?",
        },
        {
          speaker: "Dawn",
          text: "Get tall? Get hot? Turn nineteen?",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She grins, clearly enjoying your flustered reaction. There's something in that smile - playful, yes, but with an edge you can't quite name.",
        },
        {
          speaker: "Dawn",
          text: "Mom told me you were teaching here now. I switched into this section specifically.",
          expression: "love",
        },
        {
          speaker: "You",
          text: "You did? Why?",
        },
        {
          speaker: "Dawn",
          text: "Because you're the best teacher here, obviously. Mom's been bragging about you forever.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "It sounds innocent enough. But the way she's looking at you - direct, unwavering - makes something in your chest tighten uncomfortably.",
        },
        {
          speaker: null,
          text: "This is Dawn. The kid who used to ask you to read her bedtime stories. The girl who cried when you moved away. She's not a kid anymore.",
        },
        {
          speaker: null,
          text: "And from the look in her eyes, she knows it.",
        },
        {
          speaker: "Dawn",
          text: "I'm really looking forward to your class, Professor.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "The title sounds wrong in her mouth. Too formal. Too... something.",
        },
        {
          speaker: null,
          text: "You force a professional smile and move to start the lecture. This year just got a lot more complicated.",
        },
      ],
    },
  },
  {
    id: "A_noise",
    name: "Dawn is getting down!",
    description: "Dawn is getting down!",
    priority: 80,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 20,
      requiredLocation: "Classroom",
    },
    dialogue: {
      id: "cocksucker_prologue",
      lines: [
        {
          speaker: null,
          text: "You hear something",
          choices: [
            {
              text: "follow the noise",
              affectionChange: 0,
              trustChange: 0,
              nextDialogueId: "cocksucker",
            },
            {
              text: "ignore the noise",
              affectionChange: 0,
              trustChange: 0,
            },
          ],
        },

        {
          speaker: null,
          text: "You ignore the noise",
        },
      ],
    },
  },
];
