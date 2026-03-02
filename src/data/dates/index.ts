import type { Dialogue } from "../dialogues";
import type { GirlStats, PlayerStats } from "../characters";

export type DateLocation =
  | "Cafe"
  | "Beach"
  | "Mall"
  | "City"
  | "Restaurant"
  | "Movies"
  | "Park"
  | "Nightclub";

export type DateLocationInfo = {
  name: string;
  cost: number;
  description: string;
  icon: string;
};

export const dateLocationInfo: Record<DateLocation, DateLocationInfo> = {
  Cafe: {
    name: "Cafe",
    cost: 20,
    description: "Low-pressure conversation over coffee.",
    icon: "☕",
  },
  Beach: {
    name: "Beach",
    cost: 15,
    description: "A relaxed daytime date by the water.",
    icon: "🏖️",
  },
  Mall: {
    name: "Mall",
    cost: 30,
    description: "Casual shopping and playful stops.",
    icon: "🛍️",
  },
  City: {
    name: "City",
    cost: 25,
    description: "Street food, lights, and a long walk.",
    icon: "🌆",
  },
  Restaurant: {
    name: "Restaurant",
    cost: 60,
    description: "A proper sit-down date night.",
    icon: "🍽️",
  },
  Movies: {
    name: "Movies",
    cost: 35,
    description: "A cinema date and post-movie talk.",
    icon: "🎬",
  },
  Park: {
    name: "Park",
    cost: 10,
    description: "Quiet walk, benches, and open conversation.",
    icon: "🌳",
  },
  Nightclub: {
    name: "Nightclub",
    cost: 45,
    description: "Music, dancing, and high-energy chemistry.",
    icon: "🪩",
  },
};

export const dateLocationOrder: DateLocation[] = [
  "Cafe",
  "Park",
  "Movies",
  "Restaurant",
  "Beach",
  "Mall",
  "City",
  "Nightclub",
];

export type DateActivity = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements?: {
    minAffection?: number;
    minLove?: number;
    minPlayerStat?: {
      stat: keyof PlayerStats;
      value: number;
    };
  };
  outcomes: DateOutcome[];
};

export type DateOutcome = {
  id: string;
  conditions?: {
    minAffection?: number;
    minMood?: number;
    minPlayerIntelligence?: number;
    minPlayerStyle?: number;
    minPlayerFitness?: number;
  };
  weight: number;
  dialogue: Dialogue;
  effects: {
    girlStats?: Partial<GirlStats>;
    playerStats?: Partial<PlayerStats>;
    playerMoney?: number;
  };
};

const line = (text: string) => ({ speaker: null, text });

export const dateActivitiesByLocation: Record<DateLocation, DateActivity[]> = {
  Cafe: [
    {
      id: "cafe_deep_talk",
      name: "Coffee and Deep Talk",
      description: "Sit down and actually talk without rushing.",
      icon: "☕",
      outcomes: [
        {
          id: "cafe_opening_up",
          conditions: { minAffection: 20, minPlayerIntelligence: 15 },
          weight: 3,
          dialogue: {
            id: "cafe_opening_up_dialogue",
            lines: [
              line("You settle into a corner table while the crowd blurs around you."),
              {
                speaker: "Girl",
                text: "This is nice. No noise, no pressure.",
                expression: "happy",
              },
              {
                speaker: "You",
                text: "How do you respond?",
                choices: [
                  {
                    text: "Ask about what has been weighing on her lately.",
                    affectionChange: 4,
                    moodChange: 3,
                  },
                  {
                    text: "Share something personal first to open her up.",
                    affectionChange: 5,
                    moodChange: 2,
                  },
                  {
                    text: "Keep it playful and light for now.",
                    affectionChange: 2,
                    moodChange: 1,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 8, love: 4, mood: 4 },
            playerStats: { mood: 8 },
          },
        },
        {
          id: "cafe_small_talk",
          weight: 1,
          dialogue: {
            id: "cafe_small_talk_dialogue",
            lines: [
              line("The conversation starts slow, but comfortable enough."),
              {
                speaker: "Girl",
                text: "I still had a good time just being here with you.",
                expression: "shy",
              },
              {
                speaker: "You",
                text: "How do you steer the mood?",
                choices: [
                  {
                    text: "Compliment her and thank her for coming.",
                    affectionChange: 3,
                  },
                  {
                    text: "Tease her gently to lighten things up.",
                    affectionChange: 1,
                    moodChange: 2,
                    lustChange: 1,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 4, mood: 2 },
            playerStats: { mood: 4 },
          },
        },
      ],
    },
  ],
  Beach: [
    {
      id: "beach_boardwalk",
      name: "Boardwalk Walk",
      description: "Walk and talk near the water.",
      icon: "🚶",
      outcomes: [
        {
          id: "beach_smooth_walk",
          conditions: { minAffection: 25, minPlayerFitness: 12 },
          weight: 3,
          dialogue: {
            id: "beach_smooth_walk_dialogue",
            lines: [
              line("You walk the shoreline while the wind keeps the heat off."),
              {
                speaker: "Girl",
                text: "I could do this for hours.",
                expression: "happy",
              },
              {
                speaker: "You",
                text: "What do you do next?",
                choices: [
                  {
                    text: "Hold her hand and keep walking.",
                    affectionChange: 4,
                    moodChange: 2,
                  },
                  {
                    text: "Challenge her to a playful race to the pier.",
                    affectionChange: 2,
                    moodChange: 4,
                    lustChange: 1,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 9, mood: 6, love: 3 },
            playerStats: { mood: 10, fitness: 1 },
          },
        },
        {
          id: "beach_short_walk",
          weight: 1,
          dialogue: {
            id: "beach_short_walk_dialogue",
            lines: [
              line("The weather turns and you cut the walk short."),
              {
                speaker: "Girl",
                text: "Even short dates with you are still worth it.",
                expression: "neutral",
              },
            ],
          },
          effects: {
            girlStats: { affection: 4, mood: 2 },
            playerStats: { mood: 3 },
          },
        },
      ],
    },
  ],
  Mall: [
    {
      id: "mall_shopping",
      name: "Window Shopping",
      description: "Browse stores and tease each other's taste.",
      icon: "🛍️",
      outcomes: [
        {
          id: "mall_playful",
          conditions: { minPlayerStyle: 15, minAffection: 18 },
          weight: 3,
          dialogue: {
            id: "mall_playful_dialogue",
            lines: [
              line("You bounce between stores and joke about impossible outfits."),
              {
                speaker: "Girl",
                text: "You actually have good taste. That is dangerous.",
                expression: "happy",
              },
              {
                speaker: "You",
                text: "Your move?",
                choices: [
                  {
                    text: "Pick something that matches her vibe perfectly.",
                    affectionChange: 4,
                    moodChange: 3,
                  },
                  {
                    text: "Pick something bold and flirty.",
                    lustChange: 2,
                    affectionChange: 2,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 8, mood: 6 },
            playerStats: { style: 1, mood: 8 },
            playerMoney: -25,
          },
        },
        {
          id: "mall_quick_trip",
          weight: 1,
          dialogue: {
            id: "mall_quick_trip_dialogue",
            lines: [
              line("You keep it simple, grab snacks, and people-watch."),
              {
                speaker: "Girl",
                text: "Low-key but fun. I needed this.",
                expression: "happy",
              },
            ],
          },
          effects: {
            girlStats: { affection: 4, mood: 4 },
            playerStats: { mood: 4 },
            playerMoney: -12,
          },
        },
      ],
    },
  ],
  City: [
    {
      id: "city_evening_walk",
      name: "Evening City Walk",
      description: "Street food, lights, and unplanned stops.",
      icon: "🌆",
      outcomes: [
        {
          id: "city_chemistry",
          conditions: { minAffection: 22, minMood: 45 },
          weight: 3,
          dialogue: {
            id: "city_chemistry_dialogue",
            lines: [
              line("The city is loud, but your pace with her feels easy."),
              {
                speaker: "Girl",
                text: "I like this. It feels alive.",
                expression: "happy",
              },
              {
                speaker: "You",
                text: "What do you suggest?",
                choices: [
                  {
                    text: "Grab street food and keep walking.",
                    moodChange: 4,
                    affectionChange: 3,
                  },
                  {
                    text: "Duck into a quieter side street for a closer moment.",
                    lustChange: 2,
                    affectionChange: 2,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 8, mood: 6, lust: 3 },
            playerStats: { mood: 10 },
            playerMoney: -18,
          },
        },
        {
          id: "city_rushed",
          weight: 1,
          dialogue: {
            id: "city_rushed_dialogue",
            lines: [
              line("The crowds are rough tonight, so you improvise a shorter route."),
              {
                speaker: "Girl",
                text: "Not perfect, but I still liked being out with you.",
                expression: "neutral",
              },
            ],
          },
          effects: {
            girlStats: { affection: 4, mood: 2 },
            playerStats: { mood: 3 },
          },
        },
      ],
    },
  ],
  Restaurant: [
    {
      id: "restaurant_dinner",
      name: "Dinner Reservation",
      description: "A proper table and uninterrupted time together.",
      icon: "🍽️",
      requirements: {
        minAffection: 20,
        minPlayerStat: { stat: "money", value: 80 },
      },
      outcomes: [
        {
          id: "restaurant_romantic",
          conditions: { minAffection: 30, minPlayerStyle: 18 },
          weight: 3,
          dialogue: {
            id: "restaurant_romantic_dialogue",
            lines: [
              line("Candlelight and quiet music make the room feel small in a good way."),
              {
                speaker: "Girl",
                text: "You really planned this well.",
                expression: "love",
              },
              {
                speaker: "You",
                text: "How do you handle the moment?",
                choices: [
                  {
                    text: "Tell her directly what she means to you.",
                    affectionChange: 5,
                    moodChange: 2,
                  },
                  {
                    text: "Keep it playful, but sincere.",
                    affectionChange: 3,
                    moodChange: 3,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 10, love: 6, mood: 5 },
            playerStats: { mood: 10 },
            playerMoney: -55,
          },
        },
        {
          id: "restaurant_good_enough",
          weight: 1,
          dialogue: {
            id: "restaurant_good_enough_dialogue",
            lines: [
              line("Service is slow, but the conversation keeps the night intact."),
              {
                speaker: "Girl",
                text: "I still had a good time.",
                expression: "happy",
              },
            ],
          },
          effects: {
            girlStats: { affection: 5, mood: 3 },
            playerStats: { mood: 4 },
            playerMoney: -40,
          },
        },
      ],
    },
  ],
  Movies: [
    {
      id: "movies_night",
      name: "Movie Night",
      description: "Pick a movie and talk after.",
      icon: "🎬",
      outcomes: [
        {
          id: "movies_good_pick",
          conditions: { minAffection: 20 },
          weight: 3,
          dialogue: {
            id: "movies_good_pick_dialogue",
            lines: [
              line("The movie lands, and the post-film walk is even better."),
              {
                speaker: "Girl",
                text: "Okay, that was actually a great pick.",
                expression: "happy",
              },
              {
                speaker: "You",
                text: "How do you play it?",
                choices: [
                  {
                    text: "Ask what scene hit her the hardest.",
                    affectionChange: 3,
                    moodChange: 2,
                  },
                  {
                    text: "Pull her close and joke about your review score.",
                    affectionChange: 1,
                    moodChange: 3,
                    lustChange: 1,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 7, mood: 5, love: 2 },
            playerStats: { mood: 8 },
            playerMoney: -25,
          },
        },
        {
          id: "movies_mid",
          weight: 1,
          dialogue: {
            id: "movies_mid_dialogue",
            lines: [
              line("The movie is mediocre, but you both make fun of it together."),
              {
                speaker: "Girl",
                text: "At least your company was better than the script.",
                expression: "neutral",
              },
            ],
          },
          effects: {
            girlStats: { affection: 4, mood: 3 },
            playerStats: { mood: 4 },
            playerMoney: -20,
          },
        },
      ],
    },
  ],
  Park: [
    {
      id: "park_picnic",
      name: "Picnic and Bench Talk",
      description: "Simple, calm, and personal.",
      icon: "🧺",
      outcomes: [
        {
          id: "park_cozy",
          conditions: { minAffection: 18, minMood: 40 },
          weight: 3,
          dialogue: {
            id: "park_cozy_dialogue",
            lines: [
              line("You find a quiet patch of shade and slow the whole day down."),
              {
                speaker: "Girl",
                text: "I needed this kind of date.",
                expression: "happy",
              },
              {
                speaker: "You",
                text: "How do you respond?",
                choices: [
                  {
                    text: "Promise her more calm nights like this.",
                    affectionChange: 4,
                    moodChange: 2,
                  },
                  {
                    text: "Lean into the moment and sit closer.",
                    affectionChange: 3,
                    lustChange: 2,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 9, love: 4, mood: 6 },
            playerStats: { mood: 9 },
            playerMoney: -10,
          },
        },
        {
          id: "park_brisk",
          weight: 1,
          dialogue: {
            id: "park_brisk_dialogue",
            lines: [
              line("The weather pushes you into a shorter loop through the park."),
              {
                speaker: "Girl",
                text: "Short date, still worth it.",
                expression: "neutral",
              },
            ],
          },
          effects: {
            girlStats: { affection: 4, mood: 2 },
            playerStats: { mood: 3 },
          },
        },
      ],
    },
  ],
  Nightclub: [
    {
      id: "nightclub_dance",
      name: "Dance Floor Date",
      description: "High energy and close contact.",
      icon: "🪩",
      requirements: {
        minAffection: 20,
      },
      outcomes: [
        {
          id: "nightclub_hot",
          conditions: { minAffection: 30, minMood: 50 },
          weight: 3,
          dialogue: {
            id: "nightclub_hot_dialogue",
            lines: [
              line("The bass is heavy, and the space between you disappears quickly."),
              {
                speaker: "Girl",
                text: "You clean up well in this setting.",
                expression: "seductive",
              },
              {
                speaker: "You",
                text: "What do you do?",
                choices: [
                  {
                    text: "Keep it playful and dance with her all night.",
                    moodChange: 4,
                    affectionChange: 3,
                  },
                  {
                    text: "Pull her closer and hold eye contact.",
                    lustChange: 3,
                    affectionChange: 2,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 7, lust: 6, mood: 5 },
            playerStats: { mood: 9, style: 1 },
            playerMoney: -35,
          },
        },
        {
          id: "nightclub_messy",
          weight: 1,
          dialogue: {
            id: "nightclub_messy_dialogue",
            lines: [
              line("The place is packed, so you spend half the date finding space to breathe."),
              {
                speaker: "Girl",
                text: "Crowded, but still fun with you.",
                expression: "happy",
              },
            ],
          },
          effects: {
            girlStats: { affection: 4, mood: 3 },
            playerStats: { mood: 4 },
            playerMoney: -20,
          },
        },
      ],
    },
  ],
};
