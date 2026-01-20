import { PlayerStats } from "../data/characters";

export type LocationActivity = {
  name: string;
  icon: string;
  description: string;
  timeCost: number;
  statEffects: Partial<PlayerStats>;
  requirements?: {
    minEnergy?: number;
    minMoney?: number;
    requiredItem?: string;
  };
};

export const locationActivities: Record<string, LocationActivity[]> = {
  Bedroom: [
    {
      name: "Sleep",
      icon: "😴",
      description: "Rest and recover energy",
      timeCost: 4,
      statEffects: { energy: 50, mood: 10, hunger: -10 },
    },
    {
      name: "Take a Nap",
      icon: "💤",
      description: "Quick rest for a small energy boost",
      timeCost: 2,
      statEffects: { energy: 20, mood: 5 },
    },
    {
      name: "Study",
      icon: "📚",
      description: "Study to increase intelligence",
      timeCost: 2,
      statEffects: { intelligence: 3, energy: -15, mood: -5 },
      requirements: { minEnergy: 20 },
    },
  ],
  "Living Room": [
    {
      name: "Watch TV",
      icon: "📺",
      description: "Relax and watch some TV",
      timeCost: 2,
      statEffects: { mood: 15, energy: -5 },
    },
    {
      name: "Read a Book",
      icon: "📖",
      description: "Read to boost intelligence and relax",
      timeCost: 2,
      statEffects: { intelligence: 2, mood: 10, energy: -10 },
    },
    {
      name: "Play Video Games",
      icon: "🎮",
      description: "Have fun gaming",
      timeCost: 2,
      statEffects: { mood: 20, energy: -10 },
    },
  ],
  Kitchen: [
    {
      name: "Cook Meal",
      icon: "🍳",
      description: "Cook a nutritious meal",
      timeCost: 1,
      statEffects: { hunger: -40, mood: 10, energy: -10, money: -10 },
      requirements: { minMoney: 10 },
    },
    {
      name: "Make Snack",
      icon: "🥪",
      description: "Quick snack to reduce hunger",
      timeCost: 1,
      statEffects: { hunger: -20, energy: -5, money: -5 },
      requirements: { minMoney: 5 },
    },
    {
      name: "Drink Coffee",
      icon: "☕",
      description: "Get an energy boost",
      timeCost: 1,
      statEffects: { energy: 15, mood: 5, money: -3 },
      requirements: { minMoney: 3 },
    },
  ],
  Bathroom: [
    {
      name: "Take Shower",
      icon: "🚿",
      description: "Freshen up and feel better",
      timeCost: 1,
      statEffects: { mood: 15, energy: -5, style: 2 },
    },
    {
      name: "Take Bath",
      icon: "🛁",
      description: "Relax in a warm bath",
      timeCost: 2,
      statEffects: { mood: 25, energy: 10 },
    },
    {
      name: "Style Hair",
      icon: "💇",
      description: "Work on your appearance",
      timeCost: 1,
      statEffects: { style: 3, mood: 5, energy: -5 },
    },
  ],
  Gym: [
    {
      name: "Workout",
      icon: "🏋️",
      description: "Exercise to improve fitness",
      timeCost: 2,
      statEffects: { fitness: 5, energy: -25, mood: 10, hunger: -15 },
      requirements: { minEnergy: 30 },
    },
    {
      name: "Light Exercise",
      icon: "🤸",
      description: "Light workout session",
      timeCost: 1,
      statEffects: { fitness: 2, energy: -15, mood: 5 },
      requirements: { minEnergy: 20 },
    },
    {
      name: "Use Sauna",
      icon: "🧖",
      description: "Relax in the sauna",
      timeCost: 1,
      statEffects: { mood: 20, energy: -10 },
    },
  ],
  Cafe: [
    {
      name: "Buy Coffee",
      icon: "☕",
      description: "Get a coffee to go",
      timeCost: 1,
      statEffects: { energy: 15, mood: 10, money: -5 },
      requirements: { minMoney: 5 },
    },
    {
      name: "Read & Relax",
      icon: "📖",
      description: "Enjoy a book with coffee",
      timeCost: 2,
      statEffects: { intelligence: 2, mood: 15, energy: -5, money: -8 },
      requirements: { minMoney: 8 },
    },
  ],
  Mall: [
    {
      name: "Gift Store",
      icon: "GIFT",
      description: "Browse gifts for someone special",
      timeCost: 1,
      statEffects: {},
    },
    {
      name: "Shop for Clothes",
      icon: "👔",
      description: "Buy new clothes",
      timeCost: 2,
      statEffects: { style: 5, mood: 10, money: -50 },
      requirements: { minMoney: 50 },
    },
    {
      name: "Window Shopping",
      icon: "🛍️",
      description: "Browse without buying",
      timeCost: 1,
      statEffects: { mood: 5, energy: -10 },
    },
    {
      name: "Get Haircut",
      icon: "💇",
      description: "Professional haircut",
      timeCost: 1,
      statEffects: { style: 4, mood: 15, money: -30 },
      requirements: { minMoney: 30 },
    },
  ],
  "Car Store": [
    {
      name: "Buy Car",
      icon: "CAR",
      description: "Purchase a reliable car",
      timeCost: 1,
      statEffects: { money: -2000 },
      requirements: { minMoney: 2000 },
    },
  ],
  Beach: [
    {
      name: "Swim",
      icon: "🏊",
      description: "Swim in the ocean",
      timeCost: 2,
      statEffects: { fitness: 3, mood: 20, energy: -20 },
      requirements: { minEnergy: 25 },
    },
    {
      name: "Sunbathe",
      icon: "☀️",
      description: "Relax on the beach",
      timeCost: 2,
      statEffects: { mood: 15, energy: 10 },
    },
  ],
  City: [
    {
      name: "Explore",
      icon: "🗺️",
      description: "Explore the city",
      timeCost: 2,
      statEffects: { mood: 10, energy: -15 },
    },
  ],
  University: [
    {
      name: "Check Schedule",
      icon: "📅",
      description: "Review your teaching schedule",
      timeCost: 0,
      statEffects: { mood: 5 },
    },
  ],
  Classroom: [
    {
      name: "Teach Class",
      icon: "👨‍🏫",
      description: "Teach your programming class",
      timeCost: 2,
      statEffects: { intelligence: 2, energy: -20, money: 50 },
      requirements: { minEnergy: 25 },
    },
    {
      name: "Prepare Lesson",
      icon: "📝",
      description: "Prepare materials for your next lecture",
      timeCost: 1,
      statEffects: { intelligence: 1, energy: -10 },
    },
  ],
  Office: [
    {
      name: "Grade Papers",
      icon: "📄",
      description: "Grade student assignments",
      timeCost: 2,
      statEffects: { intelligence: 1, energy: -15, mood: -5 },
    },
    {
      name: "Office Hours",
      icon: "🕐",
      description: "Hold office hours for students",
      timeCost: 2,
      statEffects: { mood: 5, energy: -10 },
    },
    {
      name: "Research",
      icon: "🔬",
      description: "Work on your research projects",
      timeCost: 3,
      statEffects: { intelligence: 3, energy: -25, mood: 10 },
      requirements: { minEnergy: 30 },
    },
  ],
  "University Hallway": [
    {
      name: "Chat with Colleagues",
      icon: "💬",
      description: "Network with other professors",
      timeCost: 1,
      statEffects: { mood: 10, energy: -5 },
    },
  ],
  "Parking Lot": [
    {
      name: "Sit in Car",
      icon: "🚗",
      description: "Take a breather in your car",
      timeCost: 1,
      statEffects: { mood: 5, energy: 10 },
    },
  ],
  "Strip Club": [
    {
      name: "Watch Show",
      icon: "💃",
      description: "Watch the performers",
      timeCost: 2,
      statEffects: { mood: 10, energy: -10, money: -50 },
      requirements: { minMoney: 50 },
    },
    {
      name: "Have a Drink",
      icon: "🍸",
      description: "Relax with a drink at the bar",
      timeCost: 1,
      statEffects: { mood: 5, energy: -5, money: -20 },
      requirements: { minMoney: 20 },
    },
  ],
};
