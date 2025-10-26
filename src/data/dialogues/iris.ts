import { Dialogue } from "./index";

export const irisFirstMeeting: Dialogue = {
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
};

export const irisDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "iris_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Iris",
        text: "Oh, {playerName}! I didn't expect to see you here...",
        expression: "neutral",
      },
      {
        speaker: "Iris",
        text: "How... how was your morning class?",
        expression: "neutral",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "It was great! The students were really engaged today.",
            affectionChange: 2,
            moodChange: 1,
          },
          {
            text: "Same as always. Nothing special.",
            affectionChange: -1,
            moodChange: -1,
          },
          {
            text: "It would be better if I could spend more time with you.",
            affectionChange: 3,
            moodChange: 2,
            trustChange: 1,
          },
        ],
      },
      {
        speaker: "Iris",
        text: "I... I see. That's... that's good to hear.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "Iris seems pleased with your answer. You notice a slight blush on her cheeks.",
      },
    ],
  },
  Hug: {
    id: "iris_hug",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: "You", text: "Can I give you a hug?" },
      { speaker: "Iris", text: "A hug? I... um...", expression: "neutral" },
      {
        speaker: null,
        text: "Iris looks uncertain, glancing around nervously.",
      },
      {
        speaker: "Iris",
        text: "I suppose that would be... alright.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "You embrace Iris gently. She seems to relax slightly in your arms.",
      },
      {
        speaker: "Iris",
        text: "Thank you, {playerName}. That was... nice.",
        expression: "love",
      },
    ],
  },
  Kiss: {
    id: "iris_kiss",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: null, text: "You lean in closer to Iris." },
      {
        speaker: "Iris",
        text: "{playerName}, what are you...?",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "You kiss her softly. Her eyes widen in surprise.",
      },
      {
        speaker: "Iris",
        text: "We... we shouldn't... Dawn might...",
        expression: "sad",
      },
      {
        speaker: "You",
        text: "What do you say?",
        choices: [
          {
            text: "You're right, I'm sorry. This was a mistake.",
            affectionChange: -5,
            moodChange: -10,
            trustChange: -3,
          },
          {
            text: "Don't worry about Dawn. This is about us.",
            affectionChange: 5,
            moodChange: 5,
            trustChange: 2,
          },
          {
            text: "We can take this slow. No pressure.",
            affectionChange: 8,
            moodChange: 8,
            trustChange: 5,
          },
        ],
      },
    ],
  },
};

export const irisIntroCoffeeDate: Dialogue = {
  id: "iris_intro_coffee_yes",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe. The morning air is crisp and refreshing.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: "Iris",
      text: "I... I'm glad you agreed to come with me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You both order coffee and find a quiet corner table.",
    },
    {
      speaker: "Iris",
      text: "You know, {playerName}... we've worked together for a while now, but we rarely talk outside of work.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You're right. We should do this more often.",
    },
    {
      speaker: "Iris",
      text: "I'd... I'd like that very much.",
      expression: "love",
    },
    {
      speaker: null,
      text: "You spend a pleasant hour talking about books, teaching, and life. The conversation flows naturally.",
    },
    {
      speaker: "Iris",
      text: "Thank you for this, {playerName}. It means a lot to me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "As you finish your coffee, you feel like this was the start of something special.",
    },
  ],
};

export const irisRegularCoffeeDate: Dialogue = {
  id: "iris_regular_coffee",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: null,
      text: "You enjoy a cup of coffee together",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
  ],
};

export const irisSexyCoffeeDate: Dialogue = {
  id: "iris_sexy_coffee",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: null,
      text: "You enjoy a cup of coffee together",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
    {
      speaker: "Iris",
      text: "You're so sexy, {playerName}.",
    },
    {
      speaker: "Iris",
      text: "I want you so bad!",
      choices: [
        {
          text: "Lets get out of here.",
          affectionChange: 10,
          trustChange: 10,
          moodChange: 10,
          nextDialogueId: "iris_after_coffee_sex",
          condition: {
            minLove: 75,
          },
        },
        {
          text: "Not today.",
          affectionChange: -10,
          trustChange: -10,
          moodChange: -10,
        },
      ],
    },
  ],
};

export const irisAfterCoffeeSex: Dialogue = {
  id: "iris_after_coffee_sex",
  lines: [
    {
      speaker: null,
      text: "You walk away from the cafe.",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
    {
      speaker: "Iris",
      text: "I want you to fuck me so bad!",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
    {
      speaker: "Iris",
      text: "You're so big, I still can't get used to it",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
    {
      speaker: null,
      text: "You have sex with Iris",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
  ],
};
