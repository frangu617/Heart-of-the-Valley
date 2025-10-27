// src/data/events/ruby.ts
import { CharacterEvent } from "./types";

export const rubyEvents: CharacterEvent[] = [
  {
    id: "ruby_first_meeting",
    name: "First Meeting with Ruby",
    description: "First Meeting with Ruby",
    priority: 100,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Hallway",
    },
    dialogue: {
      id: "ruby_first_meeting",
      lines: [
        {
          speaker: null,
          text: "Your personal trainer approaches with her usual confident stride.",
        },
        {
          speaker: "Ruby",
          text: "{playerName}! Ready for today's session?",
          expression: "happy",
        },
        {
          speaker: null,
          text: "Ruby - your personal trainer for the past two years. Tough, dedicated, and surprisingly caring.",
        },
        { speaker: "You", text: "Ready to get destroyed, as usual." },
        {
          speaker: "Ruby",
          text: "That's the spirit! Let's go!",
          expression: "happy",
        },
        {
          speaker: null,
          text: "During your workout, she spots you on the bench press.",
        },
        {
          speaker: "Ruby",
          text: "You know, {playerName}... you're one of my favorite clients.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "For a moment, something flickers in her expression before she quickly looks away.",
        },
      ],
    },
  },
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
          text: "{playerName}! Perfect timing! Want to do some cardio with me?",
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
