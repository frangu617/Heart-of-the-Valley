// src/data/events/iris.ts
import { CharacterEvent } from "./types";

export const irisEvents: CharacterEvent[] = [
  {
    id: "iris_first_meeting",
    name: "First Meeting with Iris",
    description: "First Meeting with Iris",
    priority: 100,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "University Hallway",
    },
    dialogue: {
      id: "iris_first_meeting",
      lines: [
        {
          speaker: null,
          text: "You're halfway to the parking lot when you hear it - your name, called softly from behind.",
        },
        {
          speaker: null,
          text: "You turn. For a moment, you don't recognize her. Then everything clicks into place.",
        },
        {
          speaker: "Iris",
          text: "{playerName}...? Is that really you?",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "Iris. Eight years melted away in an instant, but everything's changed. She looks... older, yes, but there's something else. A weariness in her eyes that wasn't there before. Or maybe you just never noticed.",
        },
        {
          speaker: "Iris",
          text: "I heard someone moved into 4B. I didn't think... I mean, I hoped it might be...",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She trails off, tucking a strand of hair behind her ear - the same nervous habit from years ago. Some things don't change.",
        },
        {
          speaker: "You",
          text: "Iris. Wow. I... yeah, I moved in about three weeks ago. I've been meaning to—",
        },
        {
          speaker: "Iris",
          text: "No, I get it. Moving is exhausting, and starting a new job on top of that...",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "There's an awkward pause. You were close once - really close. But time creates distance, even between people who matter.",
        },
        {
          speaker: "Iris",
          text: "I'm actually heading to grab coffee before my first class. Would you... want to join me? Unless you're busy, of course.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She's trying to sound casual, but you catch the hopeful note in her voice. It's been a long time. Too long, maybe.",
        },
        {
          speaker: "You",
          text: "What do you say?",
          choices: [
            {
              text: "I'd like that. It's been too long.",
              affectionChange: 5,
              moodChange: 5,
              scheduleEncounter: {
                characterName: "Iris",
                location: "Cafe",
                eventId: "iris_intro_coffee_yes",
                label: "Coffee with Iris",
              },
            },
            {
              text: "I really should get to campus early. Rain check?",
              affectionChange: -3,
              moodChange: -5,
            },
          ],
        },
        {
          speaker: "Iris",
          text: "Great! I know this place just off campus. Their espresso is actually drinkable.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She smiles - that same gentle smile you remembered. Maybe some things don't change after all.",
        },
      ],
    },
  },
  {
    id: "iris_intro_coffee_yes",
    name: "Intro Coffee Date with Iris",
    description: "Iris invites you for coffee",
    priority: 100,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
    },
    dialogue: {
      id: "iris_intro_coffee_yes_dialogue",
      lines: [
        {
          speaker: "Iris",
          text: "{playerName}, I'm glad we could meet here...",
          expression: "neutral",
          midgroundImage: "/images/events/gwen_sex_show.png",
          midgroundOpacity: 1.0,
          midgroundBlend: "multiply",
          midgroundFit: "contain",
          midgroundBlurPx: 10,
          midgroundBrightness: 10,
          midgroundScale: 1,
          midgroundWidthPct: 100,
          midgroundHeightPct: 100,
          midgroundPosition2: "top-right",
        },
        {
          speaker: "Iris",
          text: "We don't hang out as much anymore, not since you moved in as my neighbor",
          expression: "annoyed",
        },
        {
          speaker: "Iris",
          text: "Have you been avoiding me?",
          expression: "sad",
        },
        {
          speaker: "You",
          text: "I... I'm sorry.",
          expression: "sad",
        },
        {
          speaker: "You",
          text: "I've just been getting used to the new place, and the new job...",
          expression: "sad",
        },
        {
          speaker: "Iris",
          text: "You've been here for a while now, if you need help with adjusting, you can ask you know!",
          expression: "annoyed",
        },
        {
          speaker: "You",
          text: "Thanks, Iris. I'll be sure to ask you later.",
        },
        {
          speaker: "Iris",
          text: "See you later, {playerName}.",
          // expression: "happy",
          // foregroundVideo: "/images/characters/iris/casual/bj.mp4",
          // foregroundPosition: "right", // Shows on right side
          // foregroundSize: "large", // Takes up 70% of screen
          // imageSlide: "/images/events/gwen_sex_show.png",

          expression: "blowKiss",
        },
      ],
    },
  },
  {
    id: "iris_coffee_date",
    name: "Coffee Date with Iris",
    description: "Iris invites you for coffee after building some affection",
    priority: 100,
    repeatable: false,
    cooldownHours: 48,
    conditions: {
      minAffection: 15,
      minTrust: 10,
      minHour: 12,
      maxHour: 18,
      requiredLocation: "Cafe",
    },
    dialogue: {
      id: "iris_coffee_date_dialogue",
      lines: [
        {
          speaker: "Iris",
          text: "{playerName}, I'm glad we could meet here...",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "I wanted to... talk to you about something.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "Of course. What's on your mind?",
        },
        {
          speaker: "Iris",
          text: "I've been thinking... we've been spending time together and...",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "I really enjoy your company. More than I expected.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "I enjoy spending time with you too, Iris.",
              affectionChange: 5,
              trustChange: 3,
              moodChange: 5,
            },
            {
              text: "We're just friends, Iris. Let's not complicate things.",
              affectionChange: -10,
              trustChange: -5,
              moodChange: -15,
            },
            {
              text: "I've been wanting to tell you the same thing.",
              affectionChange: 8,
              trustChange: 5,
              moodChange: 8,
            },
          ],
        },
        {
          speaker: "Iris",
          text: "Thank you for being honest with me, {playerName}.",
          expression: "love",
        },
      ],
    },
  },

  {
    id: "iris_research_help",
    name: "Help Iris with Research",
    description: "Iris needs help with academic research",
    priority: 80,
    repeatable: true,
    cooldownHours: 72,
    conditions: {
      minAffection: 20,
      minPlayerIntelligence: 15,
      requiredLocation: "Office",
      minHour: 9,
      maxHour: 17,
    },
    dialogue: {
      id: "iris_research_help_dialogue",
      lines: [
        {
          speaker: "Iris",
          text: "{playerName}, could you help me with something?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Sure, what do you need?",
        },
        {
          speaker: "Iris",
          text: "I'm working on a paper about the intersection of technology and literature...",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "Your expertise in programming could provide a unique perspective.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You spend the next few hours discussing algorithms as narrative devices.",
        },
        {
          speaker: "Iris",
          text: "Thank you so much! This is exactly what I needed.",
          expression: "love",
        },
      ],
    },
    rewards: {
      playerStats: {
        intelligence: 2,
      },
    },
  },

  {
    id: "iris_confession",
    name: "Iris's Confession",
    description: "Iris confesses her feelings",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 50,
      minTrust: 40,
      minLove: 30,
      requiredLocation: "Living Room",
      minHour: 18,
      requiredPreviousEvents: ["iris_coffee_date"],
    },
    dialogue: {
      id: "iris_confession_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris sits down next to you, her hands trembling slightly.",
        },
        {
          speaker: "Iris",
          text: "{playerName}... I need to tell you something important.",
          expression: "nervous",
        },
        {
          speaker: "You",
          text: "What is it, Iris?",
        },
        {
          speaker: "Iris",
          text: "I... I've developed feelings for you. Real feelings.",
          expression: "love",
        },
        {
          speaker: "Iris",
          text: "I know this complicates things with Dawn, but I couldn't keep it to myself anymore.",
          expression: "sad",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "I have feelings for you too, Iris.",
              affectionChange: 20,
              trustChange: 15,
              moodChange: 20,
            },
            {
              text: "I need time to think about this.",
              affectionChange: 0,
              trustChange: 5,
              moodChange: -5,
            },
            {
              text: "I'm sorry, but I can't return those feelings.",
              affectionChange: -15,
              trustChange: -10,
              moodChange: -25,
            },
          ],
        },
      ],
    },
  },

  {
    id: "iris_jealous_dawn",
    name: "Iris is Jealous of Dawn",
    description: "Iris notices your interactions with Dawn",
    priority: 90,
    repeatable: false,
    conditions: {
      minAffection: 30,
      minLove: 20,
      // This would require tracking Dawn's affection too
      // You could add a custom check in the game logic
    },
    dialogue: {
      id: "iris_jealous_dialogue",
      lines: [
        {
          speaker: "Iris",
          text: "{playerName}... can we talk?",
          expression: "sad",
        },
        {
          speaker: "You",
          text: "Of course. What's wrong?",
        },
        {
          speaker: "Iris",
          text: "I've noticed you and Dawn have been... close lately.",
          expression: "angry",
        },
        {
          speaker: "Iris",
          text: "She's my daughter. I don't want to compete with her for your affection.",
          expression: "sad",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "There's nothing going on with Dawn. You're the one I care about.",
              affectionChange: 10,
              trustChange: 8,
              moodChange: 15,
            },
            {
              text: "I care about both of you. Why does it have to be a competition?",
              affectionChange: -5,
              trustChange: -3,
              moodChange: -10,
            },
            {
              text: "I'll be more careful about how I interact with Dawn.",
              affectionChange: 5,
              trustChange: 5,
              moodChange: 5,
            },
          ],
        },
      ],
    },
  },
];
