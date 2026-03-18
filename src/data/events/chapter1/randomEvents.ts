// src/data/events/randomEvents.ts
import { Dialogue } from "../../dialogues";
import { PlayerStats, type GirlStats } from "../../characters";
import type { GameplayFlag } from "../types";

export type RandomEventType =
  | "luckEvent" // Find money, items
  | "encounter" // Randomly meet a character
  | "activity" // Chance to join an activity
  | "observation"; // See something happening

export type RandomEventConditions = {
  locations: string[]; // Where this can happen
  requiredCharactersPresent?: string[]; // Named characters must be at this location
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
  minGirlStat?: {
    girlName: string;
    stat: keyof GirlStats;
    value: number;
  };
  minGirlStats?: Array<{
    girlName: string;
    stat: keyof GirlStats;
    value: number;
  }>;
  maxGirlStat?: {
    girlName: string;
    stat: keyof GirlStats;
    value: number;
  };
  maxGirlStats?: Array<{
    girlName: string;
    stat: keyof GirlStats;
    value: number;
  }>;
  requiredFlags?: GameplayFlag[];
  blockedFlags?: GameplayFlag[];
};

export type RandomEvent = {
  id: string;
  name: string;
  type: RandomEventType;
  characterName?: string; // Optional speaker/target character for stat deltas
  probability: number; // 0-100, chance to trigger
  probabilityByNeeds?: boolean; // If true, scale chance by energy/hunger/mood
  probabilityByGirlStat?: {
    girlName: string;
    stat: keyof GirlStats;
    multiplier: number; // Added chance per stat point
    min?: number;
    max?: number;
  };
  maxTriggersPerDay?: number;
  conditions: RandomEventConditions;
  dialogue: Dialogue;
  timeCost?: number; // NEW: Hours to spend when this event completes
  rewards?: {
    money?: number;
    item?: string;
    playerStats?: Partial<PlayerStats>;
    girlAffection?: Record<string, number>; // { "Iris": +5 }
    girlStats?: Record<string, Partial<GirlStats>>;
  };
};

const IRIS_KISS_LOCATIONS_NON_UNIVERSITY = [
  "Cafe",
  "Mall",
  "City",
  "Gym",
  "Beach",
  "Nightclub",
];

const IRIS_KISS_LOCATIONS_WITH_UNIVERSITY = [
  ...IRIS_KISS_LOCATIONS_NON_UNIVERSITY,
  "University Hallway",
  "Iris' Office",
  "University Parking Lot",
];

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
    characterName: "Iris",
    probability: 5,
    conditions: {
      locations: ["Cafe"],
      hourRange: { min: 12, max: 18 },
      requiredCharactersPresent: ["Iris"],
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
          text: "Oh! {playerName}, what a coincidence!",
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
    id: "iris_ch2_pre_confrontation_daily_kiss",
    name: "Stolen Moment",
    type: "encounter",
    characterName: "Iris",
    probability: 50,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.75,
      max: 92,
    },
    maxTriggersPerDay: 1,
    conditions: {
      locations: IRIS_KISS_LOCATIONS_NON_UNIVERSITY,
      hourRange: { min: 9, max: 23 },
      requiredFlags: ["irisCh2Ev1_Done"],
      blockedFlags: ["irisCh2Ev3_Done", "irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
      minGirlStat: {
        girlName: "Iris",
        stat: "lust",
        value: 15,
      },
    },
    dialogue: {
      id: "iris_ch2_pre_confrontation_daily_kiss_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris catches your eye across the room, closes the gap, and pauses just long enough to make sure you do not pull away.",
        },
        {
          speaker: null,
          text: "Then she kisses you, quick and heated, before stepping back and leaving you to process it.",
          expression: "kissingMC",
        },
        {
          speaker: "Iris",
          text: "I was trying to be normal for five minutes. I failed.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She gives you a quick, heated kiss, then slips away before anyone can read too much into it.",
          expression: "kissingMC",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      girlStats: { Iris: { lust: 3 } },
      playerStats: { mood: 1 },
    },
  },

  {
    id: "iris_ch2_post_confrontation_daily_kiss",
    name: "No More Pretending",
    type: "encounter",
    characterName: "Iris",
    probability: 54,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.8,
      max: 94,
    },
    maxTriggersPerDay: 1,
    conditions: {
      locations: IRIS_KISS_LOCATIONS_WITH_UNIVERSITY,
      hourRange: { min: 9, max: 23 },
      requiredFlags: ["irisCh2Ev3_Done"],
      blockedFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
      minGirlStat: {
        girlName: "Iris",
        stat: "lust",
        value: 15,
      },
    },
    dialogue: {
      id: "iris_ch2_post_confrontation_daily_kiss_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris steps into your path, steadier now, but no less intense when she looks at you.",
        },
        {
          speaker: "Iris",
          text: "I am done acting like this did not happen.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She kisses you in full view of the moment, then exhales like a weight finally lifted.",
          expression: "kissingMC",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      girlStats: { Iris: { lust: 3 } },
      playerStats: { mood: 1 },
    },
  },

  {
    id: "iris_dom_accepted_daily_kiss",
    name: "Claimed In Passing",
    type: "encounter",
    characterName: "Iris",
    probability: 56,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.8,
      max: 95,
    },
    maxTriggersPerDay: 1,
    conditions: {
      locations: IRIS_KISS_LOCATIONS_WITH_UNIVERSITY,
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomAcceptedKissLoopActive", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
      minGirlStat: {
        girlName: "Iris",
        stat: "lust",
        value: 15,
      },
    },
    dialogue: {
      id: "iris_dom_accepted_daily_kiss_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris intercepts you mid-step, one hand on your chest like she already decided this moment was hers.",
        },
        {
          speaker: "Iris",
          text: "No running today. You still owe me a proper date.",
          expression: "seductive",
        },
        {
          speaker: null,
          text: "She kisses you anyway, slow and certain, then lets you go before anyone can ask questions.",
        },
        {
          speaker: "Iris",
          text: "Nightclub. Do not make me schedule your life for you.",
          expression: "happy",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      girlStats: { Iris: { lust: 3 } },
      playerStats: { mood: 1 },
    },
  },

  {
    id: "iris_dom_denied_kiss_other_1",
    name: "Restless Slip",
    type: "observation",
    characterName: "Iris",
    probability: 6,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.45,
      max: 45,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedKissLoopActive", "irisPublicRefused"],
      blockedFlags: ["irisDomDeniedSeen1", "irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_1_dialogue",
      lines: [
        {
          speaker: null,
          text: "You catch Iris too close to a stranger near the edge of the crowd. She laughs, then kisses him like she needs to prove something to herself.",
        },
        {
          speaker: null,
          text: "She notices you a beat too late. Her expression tightens, then smooths out.",
        },
        {
          speaker: "You",
          text: "Keep moving.",
          choices: [
            {
              text: "Walk on.",
              affectionChange: -1,
              setFlags: ["irisDomDeniedSeen1"],
            },
          ],
        },
      ],
    },
  },

  {
    id: "iris_dom_denied_kiss_other_2",
    name: "Second Time",
    type: "observation",
    characterName: "Iris",
    probability: 6,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.45,
      max: 45,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: [
        "irisDomDeniedKissLoopActive",
        "irisPublicRefused",
        "irisDomDeniedSeen1",
      ],
      blockedFlags: ["irisDomDeniedSeen2", "irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_2_dialogue",
      lines: [
        {
          speaker: null,
          text: "Again. Different person, same pattern. Iris leans in first this time, then steps back with a breathless half-smile that does not reach her eyes.",
        },
        {
          speaker: null,
          text: "When she spots you, she looks away first.",
        },
        {
          speaker: "You",
          text: "Leave it for now.",
          choices: [
            {
              text: "Keep your distance.",
              affectionChange: -1,
              setFlags: ["irisDomDeniedSeen2"],
            },
          ],
        },
      ],
    },
  },

  {
    id: "iris_dom_denied_kiss_other_3",
    name: "Pattern Confirmed",
    type: "observation",
    characterName: "Iris",
    probability: 6,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.45,
      max: 45,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: [
        "irisDomDeniedKissLoopActive",
        "irisPublicRefused",
        "irisDomDeniedSeen2",
      ],
      blockedFlags: ["irisDomDeniedSeen3", "irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_3_dialogue",
      lines: [
        {
          speaker: null,
          text: "Third time. Iris catches your eye before she does it, like she is daring herself to keep going.",
        },
        {
          speaker: null,
          text: "The kiss is quick. The aftermath is not. She lingers in place, jaw tight.",
        },
        {
          speaker: "You",
          text: "You let the moment pass.",
          choices: [
            {
              text: "Say nothing.",
              affectionChange: 0,
              setFlags: ["irisDomDeniedSeen3"],
            },
          ],
        },
      ],
    },
  },

  {
    id: "iris_dom_denied_kiss_other_loop",
    name: "Still Burning",
    type: "observation",
    characterName: "Iris",
    probability: 7,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.5,
      max: 50,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedKissLoopActive", "irisDomDeniedSeen3"],
      blockedFlags: ["irisDomDeniedExclusive", "irisCh2Complete"],
    },
    dialogue: {
      id: "iris_dom_denied_kiss_other_loop_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris disappears into someone else's space for a minute, then reappears composed, but the heat in her expression is unmistakable.",
        },
        {
          speaker: null,
          text: "Whatever you unlocked in her is still active.",
        },
      ],
    },
  },

  {
    id: "iris_dom_denied_confrontation",
    name: "What You Opened",
    type: "encounter",
    characterName: "Iris",
    probability: 40,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.35,
      max: 35,
    },
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 23 },
      requiredCharactersPresent: ["Iris"],
      minGirlStats: [
        { girlName: "Iris", stat: "affection", value: 18 },
        { girlName: "Iris", stat: "lust", value: 20 },
      ],
      requiredFlags: ["irisDomDeniedKissLoopActive", "irisDomDeniedSeen3"],
      blockedFlags: [
        "irisDatePlanned",
        "irisDomDeniedExclusive",
        "irisDomDeniedExplore",
        "irisCh2Complete",
      ],
    },
    dialogue: {
      id: "iris_dom_denied_confrontation_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris steps into your path and does not pretend this is casual.",
        },
        {
          speaker: "Iris",
          text: "That kiss we shared cracked something open in me.",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "I tried to put it back in the box. I cannot.",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "So tell me what we are doing. Exclusive, or not.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Stop kissing others. If this continues, it is with me.",
              affectionChange: 1,
              setFlags: ["irisDomDeniedExclusive", "irisDatePlanned"],
            },
            {
              text: "Keep exploring. Just stop cutting me out of it.",
              affectionChange: 0,
              lustChange: 1,
              setFlags: ["irisDomDeniedExplore", "irisNtrSeeded", "irisDatePlanned"],
            },
          ],
        },
        {
          speaker: "Iris",
          text: "Fine. Then we test this properly. One date. No dodging.",
          expression: "seductive",
        },
      ],
    },
  },

  {
    id: "iris_dom_denied_player_kiss_exclusive",
    name: "Exclusive Habit",
    type: "encounter",
    characterName: "Iris",
    probability: 56,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.8,
      max: 95,
    },
    maxTriggersPerDay: 1,
    conditions: {
      locations: IRIS_KISS_LOCATIONS_WITH_UNIVERSITY,
      hourRange: { min: 9, max: 23 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedExclusive", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
      minGirlStat: {
        girlName: "Iris",
        stat: "lust",
        value: 15,
      },
    },
    dialogue: {
      id: "iris_dom_denied_player_kiss_exclusive_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris catches your sleeve, glances around, then kisses you like she is confirming a contract.",
        },
        {
          speaker: "Iris",
          text: "Better. This I can work with.",
          expression: "happy",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      girlStats: { Iris: { lust: 3 } },
      playerStats: { mood: 1 },
    },
  },

  {
    id: "iris_dom_denied_player_kiss_shared",
    name: "Shared Current",
    type: "encounter",
    characterName: "Iris",
    probability: 56,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.8,
      max: 95,
    },
    maxTriggersPerDay: 1,
    conditions: {
      locations: IRIS_KISS_LOCATIONS_WITH_UNIVERSITY,
      hourRange: { min: 9, max: 23 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedExplore", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
      minGirlStat: {
        girlName: "Iris",
        stat: "lust",
        value: 15,
      },
    },
    dialogue: {
      id: "iris_dom_denied_player_kiss_shared_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris closes the distance with a grin that says she has stopped pretending to be restrained.",
        },
        {
          speaker: "Iris",
          text: "If we are exploring, you are part of it. Understood?",
          expression: "seductive",
        },
        {
          speaker: null,
          text: "She kisses you hard, then slips back into the crowd like she planned the whole beat.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      girlStats: { Iris: { lust: 3 } },
      playerStats: { mood: 1 },
    },
  },

  {
    id: "iris_post_ch2_player_kiss_daily",
    name: "Still Ours",
    type: "encounter",
    characterName: "Iris",
    probability: 60,
    probabilityByGirlStat: {
      girlName: "Iris",
      stat: "lust",
      multiplier: 0.8,
      max: 96,
    },
    maxTriggersPerDay: 1,
    conditions: {
      locations: IRIS_KISS_LOCATIONS_WITH_UNIVERSITY,
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisCh2Complete", "irisDatePlanned"],
      minGirlStat: {
        girlName: "Iris",
        stat: "lust",
        value: 15,
      },
    },
    dialogue: {
      id: "iris_post_ch2_player_kiss_daily_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris catches your hand in passing, checks the room, then pulls you in for a kiss that feels practiced and hungry at the same time.",
          expression: "kissingMC",
        },
        {
          speaker: "Iris",
          text: "You are still my favorite interruption.",
          expression: "happy",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      girlStats: { Iris: { lust: 3 } },
      playerStats: { mood: 1 },
    },
  },

  {
    id: "iris_kiss_others_rando_1",
    name: "kissingRando1",
    type: "observation",
    characterName: "Iris",
    probability: 20,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Cafe", "Mall"],
      hourRange: { min: 10, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisCh2Complete", "irisKissOthersEnabled"],
    },
    dialogue: {
      id: "iris_kiss_others_rando_1_dialogue",
      lines: [
        {
          speaker: null,
          text: "At the edge of the crowd, Iris leans into someone and steals a quick kiss before stepping back with a sharp, electric smile.",
          expression: "kissingRando1",
        },
        {
          speaker: null,
          text: "She spots you afterward, holds your gaze for a beat, then drifts away like she wanted you to see it.",
        },
      ],
    },
  },

  {
    id: "iris_kiss_others_rando_2",
    name: "kissingRando2",
    type: "observation",
    characterName: "Iris",
    probability: 20,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Cafe", "Mall"],
      hourRange: { min: 10, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisCh2Complete", "irisKissOthersEnabled"],
    },
    dialogue: {
      id: "iris_kiss_others_rando_2_dialogue",
      lines: [
        {
          speaker: null,
          text: "You catch Iris in a narrow aisle, laughing low at something a stranger says before she kisses him first and leaves him stunned.",
          expression: "kissingRando2",
        },
        {
          speaker: null,
          text: "She walks past you a moment later, calm on the surface but visibly charged underneath.",
        },
      ],
    },
  },

  {
    id: "iris_kiss_others_rando_3",
    name: "kissingRando3",
    type: "observation",
    characterName: "Iris",
    probability: 20,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Cafe", "Mall"],
      hourRange: { min: 10, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisCh2Complete", "irisKissOthersEnabled"],
    },
    dialogue: {
      id: "iris_kiss_others_rando_3_dialogue",
      lines: [
        {
          speaker: null,
          text: "Iris is already close when you notice her, one hand on a stranger's collar as she takes a slow kiss and breaks it on her own timing.",
          expression: "kissingRando3",
        },
        {
          speaker: null,
          text: "She exhales, re-centers herself, and keeps moving through the room without apology.",
        },
      ],
    },
  },

  {
    id: "iris_kiss_others_rando_4",
    name: "kissingRando4",
    type: "observation",
    characterName: "Iris",
    probability: 20,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Cafe", "Mall"],
      hourRange: { min: 10, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisCh2Complete", "irisKissOthersEnabled"],
    },
    dialogue: {
      id: "iris_kiss_others_rando_4_dialogue",
      lines: [
        {
          speaker: null,
          text: "By the window, Iris trades a few playful words with a stranger and then closes the distance herself, kissing him with deliberate confidence.",
          expression: "kissingRando4",
        },
        {
          speaker: null,
          text: "When it ends, she smooths her hair, checks for you, and leaves the moment behind.",
        },
      ],
    },
  },

  {
    id: "iris_kiss_others_rando_5",
    name: "kissingRando5",
    type: "observation",
    characterName: "Iris",
    probability: 20,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Cafe", "Mall"],
      hourRange: { min: 10, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisCh2Complete", "irisKissOthersEnabled"],
    },
    dialogue: {
      id: "iris_kiss_others_rando_5_dialogue",
      lines: [
        {
          speaker: null,
          text: "You find Iris near the exit, fingertips at a stranger's jaw while she gives him one final kiss before turning away first.",
          expression: "kissingRando5",
        },
        {
          speaker: null,
          text: "She catches your eye on the way out, expression unreadable but intentional.",
        },
      ],
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
          text: "Professor {playerName}! Wow, didn't expect to see you here!",
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

  {
    id: "ruby_decline_push_floor",
    name: "Ruby Checks In (Gym Floor)",
    type: "encounter",
    characterName: "Ruby",
    probability: 22,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Gym"],
      hourRange: { min: 6, max: 22 },
      requiredCharactersPresent: ["Ruby"],
      requiredFlags: ["rubyTrainerDeclined"],
      blockedFlags: ["rubyTrainerAccepted", "ruby_chapter_1_completed"],
    },
    dialogue: {
      id: "ruby_decline_push_floor_dialogue",
      lines: [
        {
          speaker: null,
          text: "Ruby spots you between sets and jogs over, towel over her shoulder and a determined grin on her face.",
        },
        {
          speaker: "Ruby",
          text: "You still owe me that training session, by the way.",
          expression: "happy",
        },
        {
          speaker: "Ruby",
          text: "I am not letting your wrists lose this fight.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Fine. One real session. You lead.",
              affectionChange: 1,
              dominanceChange: 1,
              setFlags: ["rubyTrainerAccepted"],
            },
            {
              text: "Not today. Ask me another time.",
              affectionChange: 0,
              dominanceChange: -1,
            },
            {
              text: "No promises. I train solo.",
              affectionChange: -1,
              dominanceChange: 1,
            },
          ],
        },
      ],
    },
  },

  {
    id: "ruby_decline_push_treadmill",
    name: "Ruby Checks In (Treadmill Lane)",
    type: "encounter",
    characterName: "Ruby",
    probability: 18,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Gym"],
      hourRange: { min: 6, max: 22 },
      requiredCharactersPresent: ["Ruby"],
      requiredFlags: ["rubyTrainerDeclined"],
      blockedFlags: ["rubyTrainerAccepted", "ruby_chapter_1_completed"],
    },
    dialogue: {
      id: "ruby_decline_push_treadmill_dialogue",
      lines: [
        {
          speaker: null,
          text: "Ruby paces beside your treadmill for a few strides, matching your speed with irritating ease.",
        },
        {
          speaker: "Ruby",
          text: "Counteroffer. Thirty minutes. Form, mobility, done.",
          expression: "neutral",
        },
        {
          speaker: "Ruby",
          text: "You are not escaping me forever.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "Your call?",
          choices: [
            {
              text: "All right. Book me in.",
              affectionChange: 1,
              lustChange: 1,
              setFlags: ["rubyTrainerAccepted"],
            },
            {
              text: "Later. I am not in coach mode yet.",
              affectionChange: 0,
            },
            {
              text: "Drop it, Ruby.",
              affectionChange: -1,
              dominanceChange: 1,
            },
          ],
        },
      ],
    },
  },

  {
    id: "ruby_decline_push_lockers",
    name: "Ruby Checks In (Locker Hall)",
    type: "encounter",
    characterName: "Ruby",
    probability: 16,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["Gym"],
      hourRange: { min: 6, max: 22 },
      requiredCharactersPresent: ["Ruby"],
      requiredFlags: ["rubyTrainerDeclined"],
      blockedFlags: ["rubyTrainerAccepted", "ruby_chapter_1_completed"],
    },
    dialogue: {
      id: "ruby_decline_push_lockers_dialogue",
      lines: [
        {
          speaker: null,
          text: "You round the locker hall corner and nearly run into Ruby, who is carrying bands and a clipboard like she planned this ambush.",
        },
        {
          speaker: "Ruby",
          text: "One session. If you hate it, I shut up forever.",
          expression: "neutral",
        },
        {
          speaker: "Ruby",
          text: "That is my final offer, mystery rookie.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Deal. One session, no excuses.",
              affectionChange: 1,
              dominanceChange: 1,
              setFlags: ["rubyTrainerAccepted"],
            },
            {
              text: "I need more time.",
              affectionChange: 0,
            },
            {
              text: "No. Keep your schedule for someone else.",
              affectionChange: -1,
              dominanceChange: 1,
            },
          ],
        },
      ],
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
        text: "{playerName}. Perfect timing. I was hoping I'd run into you.",
        expression: "happy",
      },
      {
        speaker: "You",
        text: "Hey Dawn! What's up?",
      },
      {
        speaker: "Dawn",
        text: "Come with me. The water's great, and I want the company.",
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
          text: "{playerName}! Hey! Come join us!",
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
    name: "After-Hours Set",
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
          text: "Gwen is performing a private after-hours set with a few regulars. You can't help but watch.",
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
    name: "Private Performance",
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
          text: "Eyes on me. Don't look away.",
        },
      ],
    },
  },
];
