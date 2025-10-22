// src/data/events/ruby.ts
import { CharacterEvent } from "./types";

export const rubyEvents: CharacterEvent[] = [
  {
    id: "ruby_gym_workout",
    name: "Workout with Ruby",
    description: "Ruby invites you to work out together",
    priority: 80,
    repeatable: true,
    cooldownHours: 168, // Can happen again after a week
    conditions: {
      minAffection: 30,
      minTrust: 20,
      requiredLocation: "Gym",
      minHour: 6,
      maxHour: 20,
    },
    dialogue: {
      id: "ruby_gym_workout_dialogue",
      lines: [
        {
          speaker: null,
          text: "Ruby spots you entering the gym.",
        },
        {
          speaker: "Ruby",
          text: "Frank! Perfect timing! Want to do some cardio with me?",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Sure, let's go.",
        },
        {
          speaker: null,
          text: "You work out together. Ruby pushes you hard, but it feels good.",
        },
        {
          speaker: "Ruby",
          text: "You're getting stronger! I can tell.",
          expression: "love",
        },
      ],
    },
    rewards: {
      playerStats: {
        fitness: 3,
      },
    },
  },
];
