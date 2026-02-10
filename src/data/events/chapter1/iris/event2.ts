import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: Coffee Meetup
// Description: Meet Iris at the cafe after accepting her offer.

const irisIntroCoffeeDate: Dialogue = {
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

const irisRegularCoffeeDate: Dialogue = {
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

const irisSexyCoffeeDate: Dialogue = {
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
          moodChange: 10,
          nextDialogueId: "iris_after_coffee_sex",
          condition: {
            minLove: 75,
          },
        },
        {
          text: "Not today.",
          affectionChange: -10,
          moodChange: -10,
        },
      ],
    },
  ],
};

const irisAfterCoffeeSex: Dialogue = {
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

export const irisEvent2Dialogues: Record<string, Dialogue> = {
  iris_intro_coffee_yes: irisIntroCoffeeDate,
  iris_regular_coffee: irisRegularCoffeeDate,
  iris_sexy_coffee: irisSexyCoffeeDate,
  iris_after_coffee_sex: irisAfterCoffeeSex,
};

export const irisEvent2Events: CharacterEvent[] = [
  {
    id: "iris_coffee_meetup_event",
    name: "Coffee Meetup",
    description: "Meet Iris at the cafe after accepting her offer.",
    quest: {
      title: "Meet Iris for Coffee",
      description:
        "You agreed to meet Iris at the Cafe. She's waiting to make up for the coffee incident.",
    },
    priority: 250,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["hasMetIris", "irisCoffeeAccepted"],
    },
    dialogue: {
      id: "iris_coffee_meetup_event",
      lines: [
        {
          speaker: null,
          text: "You arrive at the cafe, the hum of grinders and soft music wrapping around you. A familiar wave catches your eye.",
        },
        {
          speaker: "Iris",
          text: "Hey! Thanks for meeting me. I promise this coffee stays in the cup.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She lifts two drinks triumphantly, a playful smile easing any leftover awkwardness.",
        },
        {
          speaker: "Iris",
          text: "I took a guess and got you a dark roast. You looked like you needed something strong.",
          expression: "happy",
        },
        { speaker: "You", text: "Already an improvement over last time." },
        {
          speaker: "Iris",
          text: "I still feel bad about the shirt. Let me know what the dry cleaning costs, okay?",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "Also... I'm glad you said yes. Campus feels less intimidating when you know someone.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You take a seat by the window. The coffee is actually decent--strong, hot, and thankfully contained.",
        },
        {
          speaker: null,
          text: "You both settle into a corner table, trading first-day war stories as the morning rush swirls around you.",
        },
        {
          speaker: "You",
          text: "So, Biology, right? I assume that means you're the one dissecting frogs while the rest of us are just trying to get the projector to work.",
        },
        { speaker: null, text: "Iris laughs, relaxing into her chair." },
        {
          speaker: "Iris",
          text: "It's a little more complex than frogs. I teach Advanced Anatomy and Physiology.",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "It's fascinating, really. Understanding the mechanics of how we work. Every muscle, every nerve firing... it's like a perfect machine.",
          expression: "excited",
        },
        {
          speaker: null,
          text: "She pauses, realizing she's geeking out, her cheeks flushing slightly.",
        },
        {
          speaker: "Iris",
          text: "Sorry. I get a little carried away. My students usually glaze over by now.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "I like the passion (Flirt)",
              affectionChange: 3,
              moodChange: 1,
            },
            {
              text: "It sounds intense (Friendly)",
              affectionChange: 2,
              moodChange: 1,
            },
          ],
        },
        {
          speaker: "Iris",
          text: "Anyway, if you ever want to see the 'perfect machine' in action... or just need a quiet place to work...",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "My office is in the Science block. Room 304. It's usually quieter than the staff lounge.",
          expression: "happy",
        },
        { speaker: "You", text: "I might take you up on that." },
      ],
    },
    rewards: {
      setFlags: ["irisCoffeeMet"],
    },
  },
];
