import { text } from "stream/consumers";
import { CharacterEvent } from "./types";

export const dawnEvents: CharacterEvent[] = [
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
