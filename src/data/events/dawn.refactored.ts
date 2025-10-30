// data/events/dawn.refactored.ts
/**
 * Example of refactored Dawn events using the new reusable event system
 * This is much cleaner and more maintainable than the original version
 */

import {
  CharacterEvent,
  createCharacterEvents,
  CharacterEventConditions,
} from '../../lib/game/characterEventSystem';

/**
 * All Dawn events defined in a clean, declarative way
 */
export const dawnEvents: CharacterEvent[] = createCharacterEvents('Dawn', [
  // First Meeting Event
  {
    id: 'dawn_first_meeting',
    name: 'First Meeting with Dawn',
    description: 'First Meeting with Dawn',
    priority: 100,
    repeatable: false,
    
    // Using the reusable condition builders
    conditions: CharacterEventConditions.firstMeeting('Classroom', ['hasMetIris']),
    
    dialogue: {
      id: 'dawn_first_meeting',
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
    
    rewards: {
      setFlags: ['hasMetDawn'],
      unlockCharacters: ['Dawn'],
    },
  },

  // A Noise Event
  {
    id: 'dawn_a_noise',
    name: 'Dawn is getting down!',
    description: 'Dawn is getting down!',
    priority: 80,
    repeatable: false,
    
    // Simple condition: just location and time
    conditions: {
      allOf: [
        CharacterEventConditions.atLocation('Classroom'),
        CharacterEventConditions.timeRange(0, 20),
      ],
    },
    
    dialogue: {
      id: 'cocksucker_prologue',
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

  // Example of a more complex repeatable event
  {
    id: 'dawn_study_session',
    name: 'Study Session with Dawn',
    description: 'Help Dawn with her coursework',
    priority: 60,
    repeatable: true,
    cooldownHours: 48,
    
    // Using the reusable repeatable encounter pattern
    conditions: CharacterEventConditions.repeatableEncounter(
      'Library',
      20, // min affection
      15, // min trust
      8,  // min hour
      22  // max hour
    ),
    
    dialogue: {
      id: 'dawn_study_session',
      lines: [
        {
          speaker: null,
          text: "You find Dawn at a table surrounded by textbooks and notes.",
        },
        {
          speaker: "Dawn",
          text: "{playerName}! Perfect timing. Mind helping me with this concept?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Of course. What are you working on?",
        },
        {
          speaker: null,
          text: "You spend the next hour going through the material together. Dawn is a quick learner.",
        },
        {
          speaker: "Dawn",
          text: "Thanks! You explain things so much better than the textbook.",
          expression: "happy",
        },
      ],
    },
    
    rewards: {
      girlStats: {
        affection: 3,
        trust: 2,
      },
      playerStats: {
        intelligence: 1,
      },
    },
  },
]);

/**
 * Alternative: If you want even more concise syntax for simple events
 */
export function createSimpleDawnEvent(
  id: string,
  name: string,
  dialogueId: string,
  dialogueLines: any[],
  options: {
    location: string;
    minAffection?: number;
    minTrust?: number;
    minHour?: number;
    maxHour?: number;
    priority?: number;
    repeatable?: boolean;
    cooldownHours?: number;
    rewards?: any;
    requiredFlags?: any[];
  }
): CharacterEvent {
  const {
    location,
    minAffection = 0,
    minTrust = 0,
    minHour = 6,
    maxHour = 22,
    priority = 50,
    repeatable = false,
    cooldownHours,
    rewards,
    requiredFlags = [],
  } = options;

  return {
    id,
    name,
    description: name,
    characterName: 'Dawn',
    priority,
    repeatable,
    cooldownHours,
    
    conditions: {
      allOf: [
        CharacterEventConditions.atLocation(location),
        CharacterEventConditions.timeRange(minHour, maxHour),
        CharacterEventConditions.minGirlStats({ affection: minAffection, trust: minTrust }),
        ...(requiredFlags.length > 0 ? [CharacterEventConditions.hasFlags(...requiredFlags)] : []),
      ],
    },
    
    dialogue: {
      id: dialogueId,
      lines: dialogueLines,
    },
    
    rewards,
    tags: ['dawn', 'character'],
  };
}

// Usage example of the simple event creator
export const dawnCoffeeDate = createSimpleDawnEvent(
  'dawn_coffee_date',
  'Coffee Date with Dawn',
  'dawn_coffee_chat',
  [
    { speaker: null, text: "You meet Dawn at the campus cafe." },
    { speaker: "Dawn", text: "Thanks for meeting me!", expression: "happy" },
  ],
  {
    location: 'Cafe',
    minAffection: 25,
    minTrust: 20,
    minHour: 9,
    maxHour: 18,
    repeatable: true,
    cooldownHours: 168,
    rewards: {
      girlStats: { affection: 5, trust: 3 },
    },
  }
);
