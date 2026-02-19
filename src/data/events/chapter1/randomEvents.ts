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
    id: "iris_workplace_hallway_whisper",
    name: "Hallway Whisper",
    type: "encounter",
    characterName: "Iris",
    probability: 25,
    probabilityByNeeds: true,
    conditions: {
      locations: ["University Hallway"],
      hourRange: { min: 9, max: 15 },
      requiredFlags: ["irisCh2Ev2_Done"],
      blockedFlags: ["irisCh2Ev3_Done", "irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
    },
    dialogue: {
      id: "iris_workplace_hallway_whisper_dialogue",
      lines: [
        {
          speaker: null,
          text: "You round a corner in the hallway and nearly collide with Iris. She catches your arm and pulls you into the shadow of a bulletin board.",
        },
        {
          speaker: "Iris",
          text: "We should not be doing this here.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "Then why did you pull me in?",
        },
        {
          speaker: "Iris",
          text: "Because I could not walk past you like nothing happened.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "Her fingers linger on your sleeve. She glances down the hall, then back to you.",
        },
        {
          speaker: "Iris",
          text: "Just... a second.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She leans in and brushes a quick, secret kiss against your lips before stepping away.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 2 },
    },
  },

  {
    id: "iris_workplace_copy_room",
    name: "Office Confession",
    type: "encounter",
    characterName: "Iris",
    probability: 25,
    probabilityByNeeds: true,
    conditions: {
      locations: ["Iris' Office"],
      hourRange: { min: 11, max: 17 },
      requiredFlags: ["irisCh2Ev2_Done"],
      blockedFlags: ["irisCh2Ev3_Done", "irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
    },
    dialogue: {
      id: "iris_workplace_copy_room_dialogue",
      lines: [
        {
          speaker: null,
          text: "You step into Iris' office as she is organizing papers by the printer. She looks up and smiles before she remembers where she is.",
        },
        {
          speaker: "Iris",
          text: "Hi. I should not be happy to see you here.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "And yet you are.",
        },
        {
          speaker: null,
          text: "The copier hums, masking your voices. Iris inches closer, careful but drawn in.",
        },
        {
          speaker: "Iris",
          text: "We are going to get in trouble.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Then let us be quick.",
        },
        {
          speaker: null,
          text: "She gives you a soft, fleeting kiss and immediately steps back to her papers.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 2 },
    },
  },

  {
    id: "iris_workplace_parking_lot",
    name: "Parking Lot Goodbye",
    type: "encounter",
    characterName: "Iris",
    probability: 25,
    probabilityByNeeds: true,
    conditions: {
      locations: ["University Parking Lot"],
      hourRange: { min: 15, max: 19 },
      requiredFlags: ["irisCh2Ev2_Done"],
      blockedFlags: ["irisCh2Ev3_Done", "irisDatePlanned", "irisCh2Complete"],
      requiredCharactersPresent: ["Iris"],
    },
    dialogue: {
      id: "iris_workplace_parking_lot_dialogue",
      lines: [
        {
          speaker: null,
          text: "You spot Iris by her car, arms full of books. She pauses when she sees you and waits for the lot to clear.",
        },
        {
          speaker: "Iris",
          text: "We should not do this out here.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Then say goodbye and walk away.",
        },
        {
          speaker: null,
          text: "She steps in close anyway, eyes soft.",
        },
        {
          speaker: "Iris",
          text: "I cannot seem to.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She gives you a small, careful kiss, then backs away with a nervous smile.",
        },
      ],
    },
    rewards: {
      girlAffection: { Iris: 1 },
      playerStats: { mood: 2 },
    },
  },

  {
    id: "iris_dom_accepted_daily_kiss",
    name: "Claimed In Passing",
    type: "encounter",
    characterName: "Iris",
    probability: 16,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomAcceptedKissLoopActive", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
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
    probability: 18,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall"],
      hourRange: { min: 9, max: 22 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedExclusive", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
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
      playerStats: { mood: 1 },
    },
  },

  {
    id: "iris_dom_denied_player_kiss_shared",
    name: "Shared Current",
    type: "encounter",
    characterName: "Iris",
    probability: 18,
    maxTriggersPerDay: 1,
    conditions: {
      locations: ["University Hallway", "University Parking Lot", "Cafe", "Mall", "City"],
      hourRange: { min: 9, max: 23 },
      requiredCharactersPresent: ["Iris"],
      requiredFlags: ["irisDomDeniedExplore", "irisDatePlanned"],
      blockedFlags: ["irisCh2Complete"],
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
      playerStats: { mood: 1 },
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
