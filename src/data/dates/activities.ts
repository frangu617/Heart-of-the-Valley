// import { DateActivity, DateLocation } from "../src/data/dates/types";
import { DateActivity, DateLocation } from "../dates/types";

export const dateActivitiesByLocation: Record<DateLocation, DateActivity[]> = {
  Cafe: [
    {
      id: "cafe_coffee_chat",
      name: "Coffee & Conversation",
      description: "Enjoy coffee and have a deep conversation",
      icon: "☕",
      outcomes: [
        {
          id: "cafe_great_connection",
          conditions: { minPlayerIntelligence: 15, minAffection: 20 },
          weight: 3,
          dialogue: {
            id: "cafe_great_dialogue",
            lines: [
              {
                speaker: null,
                text: "You both order your drinks and find a cozy corner.",
              },
              {
                speaker: null,
                text: "The conversation flows naturally. You discuss books, ideas, life...",
              },
              {
                speaker: "Girl",
                text: "I love how you see the world. You're so thoughtful.",
                expression: "love",
              },
              {
                speaker: null,
                text: "She leans in closer, her eyes sparkling with interest.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 10, trust: 8, love: 5 },
            playerStats: { mood: 15 },
          },
        },
        {
          id: "cafe_awkward_silence",
          conditions: { minPlayerIntelligence: 0 },
          weight: 1,
          dialogue: {
            id: "cafe_awkward_dialogue",
            lines: [
              {
                speaker: null,
                text: "You sit down with your coffees, but the conversation feels stilted.",
              },
              {
                speaker: "Girl",
                text: "So... nice weather?",
                expression: "neutral",
              },
              {
                speaker: null,
                text: "Awkward silences punctuate your attempts at conversation.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 2, mood: -5 },
            playerStats: { mood: -5 },
          },
        },
      ],
    },
    {
      id: "cafe_study_together",
      name: "Study Date",
      description: "Help her with homework or work together",
      icon: "📚",
      requirements: {
        minAffection: 15,
        minPlayerStat: { stat: "intelligence", value: 20 },
      },
      outcomes: [
        {
          id: "study_impressive",
          conditions: { minPlayerIntelligence: 25 },
          weight: 2,
          dialogue: {
            id: "study_success",
            lines: [
              {
                speaker: "Girl",
                text: "Wow, you really know your stuff! This is so helpful!",
                expression: "happy",
              },
              {
                speaker: null,
                text: "She looks at you with newfound admiration.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 8, trust: 10, love: 5 },
            playerStats: { intelligence: 1 },
          },
        },
      ],
    },
  ],

  Beach: [
    {
      id: "beach_swim",
      name: "Go Swimming",
      description: "Enjoy the water together",
      icon: "🏊",
      requirements: {
        minAffection: 25,
      },
      outcomes: [
        {
          id: "beach_swim_fun",
          conditions: { minPlayerFitness: 15, minMood: 40 },
          weight: 3,
          dialogue: {
            id: "beach_swim_great",
            lines: [
              {
                speaker: null,
                text: "You race each other to the water, laughing as the waves crash around you.",
                imageSlide: "/images/events/beach_swimming.png",
              },
              {
                speaker: "Girl",
                text: "You're pretty athletic! I like that.",
                expression: "love",
              },
              {
                speaker: null,
                text: "She splashes you playfully, and you chase her through the waves.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 12, lust: 8, mood: 15 },
            playerStats: { fitness: 2, mood: 20 },
          },
        },
        {
          id: "beach_swim_tired",
          conditions: {},
          weight: 1,
          dialogue: {
            id: "beach_swim_okay",
            lines: [
              {
                speaker: null,
                text: "You swim together, but you're getting tired quickly.",
              },
              {
                speaker: "Girl",
                text: "Let's head back to shore.",
                expression: "neutral",
              },
            ],
          },
          effects: {
            girlStats: { affection: 5, mood: 5 },
            playerStats: { energy: -25, mood: 10 },
          },
        },
      ],
    },
    {
      id: "beach_walk",
      name: "Romantic Beach Walk",
      description: "Walk along the shore holding hands",
      icon: "🚶",
      requirements: {
        minAffection: 30,
        minTrust: 25,
      },
      outcomes: [
        {
          id: "beach_walk_romantic",
          conditions: { minAffection: 40, minPlayerStyle: 15 },
          weight: 3,
          dialogue: {
            id: "beach_walk_perfect",
            lines: [
              {
                speaker: null,
                text: "You walk hand-in-hand along the shoreline as the sun sets.",
                imageSlide: "/images/events/beach_sunset_walk.png",
              },
              {
                speaker: "Girl",
                text: "This is perfect. I'm so glad I came with you.",
                expression: "love",
              },
              {
                speaker: null,
                text: "She leans her head on your shoulder as you walk.",
              },
              {
                speaker: "You",
                text: "What do you say?",
                choices: [
                  {
                    text: "Kiss her",
                    affectionChange: 15,
                    moodChange: 20,
                    condition: { minLove: 30 },
                  },
                  {
                    text: "Hold her close",
                    affectionChange: 10,
                    moodChange: 15,
                  },
                  {
                    text: "Enjoy the moment in silence",
                    affectionChange: 8,
                    moodChange: 10,
                  },
                ],
              },
            ],
          },
          effects: {
            girlStats: { affection: 15, love: 10, trust: 8 },
            playerStats: { mood: 20 },
          },
        },
      ],
    },
  ],

  Mall: [
    {
      id: "mall_shopping",
      name: "Shopping Together",
      description: "Help her pick out clothes",
      icon: "🛍️",
      outcomes: [
        {
          id: "mall_fashion_expert",
          conditions: { minPlayerStyle: 20 },
          weight: 2,
          dialogue: {
            id: "mall_style_success",
            lines: [
              {
                speaker: "Girl",
                text: "You have such great taste! This looks amazing!",
                expression: "love",
              },
            ],
          },
          effects: {
            girlStats: { affection: 10, mood: 12 },
            playerStats: { style: 2 },
            playerMoney: -50,
          },
        },
      ],
    },
  ],

  Restaurant: [
    {
      id: "restaurant_dinner",
      name: "Fancy Dinner",
      description: "Enjoy a nice meal together",
      icon: "🍽️",
      requirements: {
        minPlayerStat: { stat: "money", value: 100 },
      },
      outcomes: [
        {
          id: "restaurant_classy",
          conditions: { minPlayerStyle: 20, minAffection: 30 },
          weight: 3,
          dialogue: {
            id: "restaurant_perfect",
            lines: [
              {
                speaker: null,
                text: "The ambiance is perfect. Candlelight flickers between you.",
                imageSlide: "/images/events/restaurant_date.png",
              },
              {
                speaker: "Girl",
                text: "This is really special. Thank you for bringing me here.",
                expression: "love",
              },
            ],
          },
          effects: {
            girlStats: { affection: 20, love: 15, trust: 10 },
            playerStats: { mood: 25 },
            playerMoney: -100,
          },
        },
      ],
    },
  ],

  Movies: [
    {
      id: "movies_horror",
      name: "Watch Horror Movie",
      description: "She might grab onto you...",
      icon: "😱",
      outcomes: [
        {
          id: "movies_scared_cuddly",
          conditions: { minAffection: 20 },
          weight: 2,
          dialogue: {
            id: "movies_horror_success",
            lines: [
              {
                speaker: null,
                text: "She jumps at every scare, pressing closer to you.",
              },
              {
                speaker: "Girl",
                text: "I feel safe with you...",
                expression: "love",
              },
            ],
          },
          effects: {
            girlStats: { affection: 12, lust: 8, trust: 10 },
            playerStats: { mood: 15 },
            playerMoney: -30,
          },
        },
      ],
    },
    {
      id: "movies_romance",
      name: "Watch Romance Movie",
      description: "A heartwarming love story",
      icon: "💕",
      requirements: {
        minAffection: 25,
      },
      outcomes: [
        {
          id: "movies_romantic_mood",
          conditions: { minAffection: 20 },
          weight: 2,
          dialogue: {
            id: "movies_romance_success",
            lines: [
              {
                speaker: null,
                text: "During a particularly touching scene, she takes your hand.",
              },
              {
                speaker: "Girl",
                text: "Do you believe in love like that?",
                expression: "shy",
              },
            ],
          },
          effects: {
            girlStats: { affection: 10, love: 15, mood: 12 },
            playerStats: { mood: 18 },
            playerMoney: -30,
          },
        },
      ],
    },
  ],

  City: [
    {
      id: "city_explore",
      name: "City Adventure",
      description: "Explore the city together",
      icon: "🗺️",
      outcomes: [
        {
          id: "city_fun_discoveries",
          conditions: {},
          weight: 1,
          dialogue: {
            id: "city_explore_success",
            lines: [
              {
                speaker: null,
                text: "You wander through the city, discovering hidden gems together.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 8, mood: 10 },
            playerStats: { mood: 12 },
            playerMoney: -20,
          },
        },
      ],
    },
  ],

  Park: [
    {
      id: "park_picnic",
      name: "Romantic Picnic",
      description: "Share a meal under the trees",
      icon: "🧺",
      requirements: {
        minAffection: 20,
      },
      outcomes: [
        {
          id: "park_picnic_perfect",
          conditions: { minAffection: 30, minMood: 50 },
          weight: 2,
          dialogue: {
            id: "park_picnic_success",
            lines: [
              {
                speaker: null,
                text: "You spread out a blanket under a shady tree.",
                imageSlide: "/images/events/park_picnic.png",
              },
              {
                speaker: "Girl",
                text: "This is so thoughtful! You really know how to make me feel special.",
                expression: "love",
              },
            ],
          },
          effects: {
            girlStats: { affection: 15, love: 12, trust: 10 },
            playerStats: { mood: 20 },
            playerMoney: -25,
          },
        },
      ],
    },
  ],
  "Strip Club": [
    {
      id: "strip_dance",
      name: "Strip Dancing",
      description: "Dance the night away",
      icon: "🕺",
      requirements: {
        minAffection: 20,
      },
      outcomes: [
        {
          id: "strip_dance_success",
          conditions: { minAffection: 30, minMood: 50 },
          weight: 2,
          dialogue: {
            id: "strip_dance_success",
            lines: [
              {
                speaker: null,
                text: "You dance the night away, leaving the club with a smile on your face.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 15, love: 12, trust: 10 },
            playerStats: { mood: 20 },
            playerMoney: -25,
          },
        },
      ],
    },
  ],
  Gym: [
    {
      id: "gym_workout",
      name: "Workout Together",
      description: "Workout together",
      icon: "💪",
      requirements: {
        minAffection: 20,
      },
      outcomes: [
        {
          id: "gym_workout_success",
          conditions: { minAffection: 30, minMood: 50 },
          weight: 2,
          dialogue: {
            id: "gym_workout_success",
            lines: [
              {
                speaker: null,
                text: "You work out together, leaving the gym with a smile on your face.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 15, love: 12, trust: 10 },
            playerStats: { mood: 20 },
            playerMoney: -25,
          },
        },
      ],
    },
  ],
  "Living Room": [
    {
      id: "romance_romance",
      name: "Romance Romance",
      description: "Romance Romance",
      icon: "🧡",
      requirements: {
        minAffection: 20,
      },
      outcomes: [
        {
          id: "romance_romance_success",
          conditions: { minAffection: 30, minMood: 50 },
          weight: 2,
          dialogue: {
            id: "romance_romance_success",
            lines: [
              {
                speaker: null,
                text: "You spend the night together, leaving the room with a smile on your face.",
              },
            ],
          },
          effects: {
            girlStats: { affection: 15, love: 12, trust: 10 },
            playerStats: { mood: 20 },
            playerMoney: -25,
          },
        },
      ],
    },
  ] 
};
