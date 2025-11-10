// src/data/events/ruby.ts
import {
  CharacterEvent,
  CharacterEventConditions,
  createCharacterEvents,
} from "@/lib/game/characterEventSystem";

export const rubyEvents: CharacterEvent[] = createCharacterEvents("Ruby", [
  {
    id: "ruby_first_meeting",
    name: "First Meeting with Ruby",
    description: "First Meeting with Ruby",
    priority: 100,
    repeatable: false,
    conditions: {
      allOf: [
        CharacterEventConditions.atLocation("Gym"),
        CharacterEventConditions.timeRange(6, 20),
        CharacterEventConditions.hasFlags("firstWorkout"),
      ],
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
    conditions: CharacterEventConditions.repeatableEncounter("Gym", 30, 20, 6, 20),
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
]);
