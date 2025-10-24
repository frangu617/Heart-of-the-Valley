import { CharacterEvent } from "./types";

export const dawnEvents: CharacterEvent[] = [
  {
    id: "checking_out_the_student_body",
    name: "Checking out the student body",
    description: "Frank is checking out the student body",
    priority: 80,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
    },
    dialogue: {
      id: "checking_out_the_student_body",
      lines: [
        {
          speaker: "Dawn",
          text: "Eww Frank, don't be gross.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She walks away from you.",
        },
      ],
    },
  },
];