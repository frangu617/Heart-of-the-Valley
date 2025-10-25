// src/data/events/randomEvents.ts
import { Dialogue } from "../dialogues";
import { PlayerStats } from "../characters";

export type RandomEventType =
  | "luckEvent" // Find money, items
  | "encounter" // Randomly meet a character
  | "activity" // Chance to join an activity
  | "observation"; // See something happening

export type RandomEventConditions = {
  locations: string[]; // Where this can happen
  minPlayerStat?: {
    stat: keyof PlayerStats;
    value: number;
  };
  maxPlayerStat?: {
    stat: keyof PlayerStats;
    value: number;
  };
  daySpecific?: string[]; // Only on certain days
  hourRange?: { min: number; max: number };
  metCharacters?: boolean; // Only if you've met certain characters
};

export type RandomEvent = {
  id: string;
  name: string;
  type: RandomEventType;
  probability: number; // 0-100, chance to trigger
  conditions: RandomEventConditions;
  dialogue: Dialogue;
  timeCost?: number; // NEW: Hours to spend when this event completes
  rewards?: {
    money?: number;
    item?: string;
    playerStats?: Partial<PlayerStats>;
    girlAffection?: Record<string, number>; // { "Iris": +5 }
  };
};

export const randomEvents: RandomEvent[] = [
  

  // === LUCK EVENTS ===
  {
    id: "find_money_street",
    name: "Found Money on the Street",
    type: "luckEvent",
    probability: 1,
    conditions: {
      locations: ["Street", "City"],
    },
    dialogue: {
      id: "find_money_street_dialogue",
      lines: [
        {
          speaker: null,
          text: "As you walk down the street, something glints in the sunlight.",
        },
        {
          speaker: null,
          text: "You spot some cash on the ground! Lucky you!",
        },
        {
          speaker: "You",
          text: "Score! 💰",
        },
      ],
    },
    rewards: {
      money: 50,
    },
  },

  {
    id: "find_money_mall",
    name: "Found a Gift Card",
    type: "luckEvent",
    probability: 10,
    conditions: {
      locations: ["Mall"],
    },
    dialogue: {
      id: "find_giftcard_dialogue",
      lines: [
        {
          speaker: null,
          text: "You find an unclaimed gift card on a bench at the mall.",
        },
        {
          speaker: null,
          text: "Perfect timing! You could use this.",
        },
      ],
    },
    rewards: {
      money: 75,
      item: "Gift Card",
    },
  },

  {
    id: "find_phone_gym",
    name: "Lost Phone at the Gym",
    type: "luckEvent",
    probability: 8,
    conditions: {
      locations: ["Gym"],
    },
    dialogue: {
      id: "find_phone_dialogue",
      lines: [
        {
          speaker: null,
          text: "You find someone's phone in the lost and found. You turn it in.",
        },
        {
          speaker: null,
          text: "The person who owns it thanks you and gives you a small reward.",
        },
      ],
    },
    rewards: {
      money: 30,
    },
  },

  // === RANDOM CHARACTER ENCOUNTERS ===
  {
    id: "meet_iris_cafe",
    name: "Random Coffee with Iris",
    type: "encounter",
    probability: 5,
    conditions: {
      locations: ["Cafe"],
      hourRange: { min: 12, max: 18 },
    },
    dialogue: {
      id: "meet_iris_cafe_dialogue",
      lines: [
        {
          speaker: null,
          text: "You're at the cafe when you spot Iris sitting alone with a book.",
        },
        {
          speaker: "Iris",
          text: "Oh! Frank, what a coincidence!",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Hey Iris! Mind if I join you?",
        },
        {
          speaker: "Iris",
          text: "I... I'd like that, actually.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "You spend time chatting over coffee. It feels natural and easy.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 3 },
    },
  },

  
  {
    id: "meet_yumi_mall",
    name: "Yumi Shopping Trip",
    type: "encounter",
    probability: 15,
    conditions: {
      locations: ["Mall"],
      hourRange: { min: 12, max: 17 },
    },
    dialogue: {
      id: "meet_yumi_mall_dialogue",
      lines: [
        {
          speaker: "Yumi",
          text: "Professor Frank! Wow, didn't expect to see you here!",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Hey Yumi! Shopping?",
        },
        {
          speaker: "Yumi",
          text: "Yeah, just grabbing some things. Want to grab lunch? My treat!",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You grab lunch together. She's fun and interesting outside of class.",
        },
      ],
    },
    rewards: {
      money: -15,
      girlAffection: { Yumi: 4 },
    },
  },

  // === ACTIVITY EVENTS ===
  {
    id: "beach_day_dawn",
    name: "Beach Day Invitation",
    type: "activity",
    probability: 12,
    conditions: {
      locations: ["Beach"],
      hourRange: { min: 12, max: 18 },
      daySpecific: ["Saturday", "Sunday"],
    },
    dialogue: {
      id: "beach_day_dialogue",
      lines: [
        {
          speaker: "Dawn",
          text: "Uncle Frank! Perfect! I was hoping I'd run into you!",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Hey Dawn! What's up?",
        },
        {
          speaker: "Dawn",
          text: "Do you want to swim with me? Come on, the water's great!",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You spend the afternoon at the beach with Dawn.",
        },
      ],
    },
    rewards: {
      playerStats: { mood: 15 },
      girlAffection: { Dawn: 3 },
    },
  },

  {
    id: "study_session_yumi",
    name: "Impromptu Study Session",
    type: "activity",
    probability: 18,
    conditions: {
      locations: ["Cafe"],
      hourRange: { min: 14, max: 19 },
    },
    dialogue: {
      id: "study_session_dialogue",
      lines: [
        {
          speaker: "Yumi",
          text: "Oh, Professor! I'm working on that algorithm problem we discussed...",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Need help?",
        },
        {
          speaker: "Yumi",
          text: "Would you? That would be amazing!",
          expression: "love",
        },
        {
          speaker: null,
          text: "You help her work through the problem. She's a quick learner.",
        },
      ],
    },
    rewards: {
      playerStats: { intelligence: 1 },
      girlAffection: { Yumi: 5 },
    },
  },

  // === OBSERVATION EVENTS ===
  {
    id: "see_iris_studying",
    name: "See Iris Lost in Thought",
    type: "observation",
    probability: 10,
    conditions: {
      locations: ["Cafe"],
    },
    dialogue: {
      id: "see_iris_studying_dialogue",
      lines: [
        {
          speaker: null,
          text: "You notice Iris sitting alone at a table, staring out the window thoughtfully.",
        },
        {
          speaker: null,
          text: "She looks a bit sad or contemplative.",
          choices: [
            {
              text: "Go talk to her",
              affectionChange: 3,
              moodChange: 2,
            },
            {
              text: "Leave her be, she seems to need space",
              affectionChange: 1,
              moodChange: 1,
            },
          ],
        },
      ],
    },
  },

  {
    id: "see_ruby_teaching",
    name: "Watch Ruby Teach",
    type: "observation",
    probability: 8,
    conditions: {
      locations: ["Gym"],
      hourRange: { min: 6, max: 14 },
    },
    dialogue: {
      id: "see_ruby_teaching_dialogue",
      lines: [
        {
          speaker: null,
          text: "You watch Ruby leading a group fitness class. She's completely in her element.",
        },
        {
          speaker: null,
          text: "Her confidence and passion are inspiring. You find yourself smiling.",
        },
      ],
    },
    rewards: {
      playerStats: { mood: 5 },
    },
  },

  {
    id: "gwen_with_friends",
    name: "See Gwen with Friends",
    type: "observation",
    probability: 15,
    conditions: {
      locations: ["City"],
      hourRange: { min: 18, max: 22 },
    },
    dialogue: {
      id: "gwen_friends_dialogue",
      lines: [
        {
          speaker: "Gwen",
          text: "Frank! Hey! Come join us!",
          expression: "happy",
        },
        {
          speaker: null,
          text: "Gwen is hanging out with friends. She waves you over enthusiastically.",
          choices: [
            {
              text: "Join them for a bit",
              affectionChange: 4,
              moodChange: 10,
            },
            {
              text: "Wave back but keep going",
              affectionChange: 0,
              moodChange: 2,
            },
          ],
        },
      ],
    },
  },
  {
    id: "Gwen sex show",
    name: "See Gwen getting dick!",
    type: "observation",
    probability: 100,
    conditions: {
      locations: ["Strip Club"],
      hourRange: { min: 0, max: 23 },
    },
    dialogue: {
      id: "Gwen_sex_show_dialogue",
      lines: [
        {
          speaker: null,
          text: "Gwen is having a sex show with some friends. You can't help but watch.",
          imageSlide: "/images/events/gwen_sex_show.png",
          choices: [
            {
              text: "Watch",
              affectionChange: -5,
              moodChange: -5,
              nextDialogueId: "gwen_ntr",
            },
          ],
        },
      ],
    },
  },
  {
    id: "gwen_ntr",
    name: "See Gwen getting big dick!",
    type: "observation",
    probability: 1,
    conditions: {
      locations: ["Strip Club"],
      hourRange: { min: 0, max: 23 },
    },
    dialogue: {
      id: "gwen_sex_show_dialogue",
      lines: [
        {
          speaker: null,
          text: "Gwen is having a sex show with some friends. You can't help but watch.",
          videoSlide: "/video/characters/gwen/club_sex.mp4",
          videoAutoPlay: true,
          videoBoomerang: true,
        },
        {
          speaker: "Gwen",
          text: "I'm so horny! I want to cum so bad!",
        },
      ],
    },
  },
];
