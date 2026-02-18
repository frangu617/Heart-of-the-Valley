import type { PlayerStats } from "./characters";

// Location graph
export type Location = {
  name: string;
  cost: number;
  time: number;
  image: string;
};

export const TESTING_LOCATION_NAME = "Testing Studio";
export type TestingEnvironment =
  | "casual"
  | "university"
  | "gym"
  | "home"
  | "date"
  | "nun";
export const TESTING_ENVIRONMENT_LOCATION_BY_ID: Record<
  TestingEnvironment,
  string
> = {
  casual: "City",
  university: "University",
  gym: "Gym",
  home: "Living Room",
  date: "Strip Club",
  nun: "Convent",
};

export const locationGraph: Record<string, Location[]> = {
  //Home locations
  Bedroom: [
    { name: "Bathroom", cost: 0, time: 0, image: "bathroom.png" },
    { name: "Living Room", cost: 0, time: 0, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 0, image: "kitchen.png" },
    { name: "Testing Studio", cost: 0, time: 0, image: "city.png" },
  ],
  Bathroom: [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Living Room", cost: 0, time: 0, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 0, image: "kitchen.png" },
  ],
  Kitchen: [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Living Room", cost: 0, time: 0, image: "livingroom.png" },
    { name: "Bathroom", cost: 0, time: 0, image: "bathroom.png" },
  ],
  "Living Room": [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Bathroom", cost: 0, time: 0, image: "bathroom.png" },
    { name: "Kitchen", cost: 0, time: 0, image: "kitchen.png" },
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
  ],
  //Apartment locations
  Hallway: [
    { name: "Living Room", cost: 0, time: 0, image: "living_room.png" },
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    // { name: "Gwen's Apartment", cost: 0, time: 0, image: "gwen_livingroom.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
  ],
  "Iris' Living Room": [
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
  ],
  "Dawn's bedroom": [
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
  ],
  "Iris' Bedroom": [
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
  ],
  "Iris' Bathroom": [
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
  ],
  "Iris' Kitchen": [
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
  ],
  //Street locations
  Street: [
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
    { name: "Beach", cost: 0, time: 0, image: "beach.png" },
    { name: "Mountains", cost: 0, time: 0, image: "mountains.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
    { name: "Car Store", cost: 0, time: 0, image: "car_store.png" },
    {
      name: "University",
      cost: 0,
      time: 0,
      image: "university_parking_lot.png",
    },
  ],
  Beach: [
    { name: "Street", cost: 0, time: 0, image: "street.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
    {
      name: "University",
      cost: 0,
      time: 0,
      image: "university_parking_lot.png",
    },
  ],
  Mountains: [
    { name: "Street", cost: 0, time: 0, image: "street.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
    {
      name: "University",
      cost: 0,
      time: 0,
      image: "university_parking_lot.png",
    },
  ],
  // City locations
  City: [
    { name: "University", cost: 0, time: 0, image: "university.png" },
    { name: "Cafe", cost: 0, time: 0, image: "cafe.png" },
    { name: "Gym", cost: 0, time: 0, image: "gym.png" },
    { name: "Mall", cost: 0, time: 0, image: "mall.png" },
    { name: "Bar", cost: 0, time: 0, image: "bar.png" },
    { name: "Nightclub", cost: 0, time: 0, image: "nightclub.png" },
    { name: "Strip Club", cost: 0, time: 0, image: "stripclub.png" },
    { name: "Testing Studio", cost: 0, time: 0, image: "city.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
  ],
  "Testing Studio": [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
  ],
  Cafe: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Gym: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Mall: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Bar: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Nightclub: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  "Strip Club": [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  "Car Store": [{ name: "Street", cost: 0, time: 0, image: "street.png" }],
  // University locations
  University: [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
    { name: "University Parking Lot", cost: 0, time: 0, image: "university_parking_lot.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
  ],
  "University Hallway": [
    { name: "Classroom", cost: 0, time: 0, image: "classroom.png" },
    { name: "Office", cost: 0, time: 0, image: "office.png" },
    { name: "Men's Bathroom", cost: 0, time: 0, image: "mens_bathroom.png" },
    {
      name: "Women's Bathroom",
      cost: 0,
      time: 0,
      image: "womens_bathroom.png",
    },
    { name: "University", cost: 0, time: 0, image: "university.png" },
    { name: "Iris' Office", cost: 0, time: 0, image: "iris_office.png" },
  ],
  Classroom: [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  Office: [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  "Iris' Office": [
    { name: "University Hallway", cost: 0, time: 0, image: "hallway.png" },
  ],
  "Men's Bathroom": [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  "Women's Bathroom": [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  "University Parking Lot": [
    { name: "University", cost: 0, time: 0, image: "university.png" },
  ],
};

// Location descriptions
export type LocationDescription = {
  default: string;
  morning?: string;
  afternoon?: string;
  evening?: string;
  night?: string;
};

export const locationDescriptions: Record<string, LocationDescription> = {
  Bedroom: {
    default: "Your sanctuary. A place of rest and solitude.",
    morning: "Sunlight streams through the curtains. Time to start the day.",
    afternoon: "The afternoon sun makes the room feel warm and inviting.",
    evening: "The soft glow of evening light fills your room.",
    night: "The darkness beckons you to rest.",
  },
  Bathroom: {
    default: "Clean and functional. Everything you need to freshen up.",
    morning: "The mirror reflects a new day's possibilities.",
    night: "Time for your evening routine.",
  },
  Kitchen: {
    default: "The smell of coffee and possibilities fills the air.",
    morning: "Breakfast time. The most important meal of the day.",
    afternoon: "A great place to prepare a satisfying meal.",
    evening: "Dinner aromas could fill this space.",
  },
  "Living Room": {
    default: "Comfortable and lived-in. A space to unwind.",
    morning: "Morning light illuminates the cozy space.",
    afternoon: "Perfect for relaxation or entertainment.",
    evening: "The soft lighting creates a peaceful ambiance.",
    night: "Quiet and peaceful, lit by gentle lamp light.",
  },
  Hallway: {
    default: "The corridor connects your apartment to the outside world.",
    morning: "You might bump into a neighbor heading out.",
    evening: "The hallway is quiet, most residents are home.",
  },
  Street: {
    default: "The city spreads out before you, full of possibilities.",
    morning: "Morning commuters rush past. The city is waking up.",
    afternoon: "The street bustles with afternoon activity.",
    evening: "The city lights begin to twinkle as day turns to dusk.",
    night: "Street lights cast long shadows. The night is young.",
  },
  Beach: {
    default: "The sound of waves provides a soothing soundtrack.",
    morning: "The morning sun reflects off the calm water.",
    afternoon: "Beach-goers enjoy the warm sunshine and cool water.",
    evening: "The sunset paints the sky in brilliant oranges and pinks.",
    night: "Moonlight dances on the dark waves.",
  },
  Mountains: {
    default: "Fresh mountain air fills your lungs.",
    morning: "Morning mist clings to the peaks.",
    afternoon: "The view is breathtaking from this height.",
    evening: "The mountains cast long shadows as the sun sets.",
  },
  City: {
    default: "The urban jungle. Always something happening.",
    morning:
      "The city awakens with the sound of traffic and coffee shops opening.",
    afternoon: "The downtown area thrums with energy.",
    evening: "Neon signs flicker to life as the city prepares for nightlife.",
    night: "The city that never sleeps is at its most alive.",
  },
  "Testing Studio": {
    default:
      "Debug sandbox: every girl is always here so you can quickly test portraits, overlays, and interactions.",
    morning: "Debug sandbox is active. Everyone is available for testing.",
    afternoon: "Debug sandbox is active. Everyone is available for testing.",
    evening: "Debug sandbox is active. Everyone is available for testing.",
    night: "Debug sandbox is active. Everyone is available for testing.",
  },
  Cafe: {
    default: "The aroma of freshly brewed coffee welcomes you.",
    morning: "Morning regulars sip their lattes and read the news.",
    afternoon: "The café buzzes with lunch crowd conversation.",
    evening: "A quieter atmosphere, perfect for studying or dates.",
  },
  Bar: {
    default: "Low lights, clinking glasses, and quiet conversations.",
    afternoon: "The bar is calm, with a few early regulars.",
    evening: "The bar starts to fill as the sun goes down.",
    night: "The room hums with laughter and late-night energy.",
  },
  Gym: {
    default: "The clang of weights and hum of machines fills the air.",
    morning: "Early birds are getting their workout in before work.",
    afternoon: "The lunch rush brings a surge of fitness enthusiasts.",
    evening: "Post-work warriors push through their evening routines.",
  },
  Mall: {
    default: "Bright lights and window displays beckon shoppers.",
    afternoon: "The mall is bustling with weekend shoppers.",
    evening: "The evening crowd browses as stores prepare to close.",
  },
  "Car Store": {
    default: "A small showroom of clean, polished vehicles.",
    afternoon: "Sales staff hover nearby, ready to make a pitch.",
    evening: "The floor is quiet, just you and the rows of cars.",
  },
  "Strip Club": {
    default: "Dim lights and pulsing music create an electric atmosphere.",
    evening: "The evening show is starting to draw a crowd.",
    night: "The club is in full swing, energy at its peak.",
  },
  Nightclub: {
    default: "Bass thumps through the floor and neon lights glow.",
    evening: "The DJ warms up the room with a steady beat.",
    night: "The dance floor is packed and the music is loud.",
  },
  University: {
    default: "The halls of higher learning. Knowledge awaits.",
    morning: "Students hurry to their morning classes.",
    afternoon: "The campus is alive with academic activity.",
    evening: "Evening classes and study groups populate the campus.",
  },
  "University Hallway": {
    default: "Posters and announcements line the walls.",
    morning: "Professors and students stream through between classes.",
    afternoon: "The hallway echoes with scholarly discussion.",
  },
  Classroom: {
    default: "Rows of desks face the whiteboard. Your domain.",
    morning: "The classroom is ready for today's lesson.",
    afternoon: "Afternoon classes bring a different energy.",
  },
  Office: {
    default: "Your academic sanctuary. Books and papers everywhere.",
    morning: "Morning office hours await.",
    afternoon: "A good time to catch up on grading and research.",
  },
  "Parking Lot": {
    default: "Rows of cars bake in the sun.",
    morning: "The lot is filling up as faculty and students arrive.",
    evening: "Most have gone home. The lot is nearly empty.",
  },
};

// Quick actions based on location and time
export const getQuickActions = (
  location: string,
  hour: number,
  player: { energy: number; hunger: number }
) => {
  const actions = [];

  // Morning suggestions
  if (hour >= 6 && hour < 9) {
    if (location === "Bedroom") {
      actions.push({
        label: "Get ready for work",
        icon: "🚿",
        location: "Bathroom",
      });
    }
    if (player.hunger > 40) {
      actions.push({
        label: "Have breakfast",
        icon: "🍳",
        location: "Kitchen",
      });
    }
  }

  // Afternoon suggestions
  if (hour >= 12 && hour < 14 && player.hunger > 50) {
    actions.push({ label: "Grab lunch", icon: "🍔", location: "Cafe" });
  }

  // Evening suggestions
  if (hour >= 18 && hour < 21) {
    if (player.energy < 30) {
      actions.push({ label: "Rest a bit", icon: "😴", location: "Bedroom" });
    }
    actions.push({ label: "Wind down", icon: "🛋️", location: "Living Room" });
  }

  // Universal low stat warnings
  if (player.energy < 20) {
    actions.push({ label: "Get some sleep", icon: "💤", location: "Bedroom" });
  }
  if (player.hunger > 70) {
    actions.push({ label: "Eat something", icon: "🍽️", location: "Kitchen" });
  }

  return actions.slice(0, 3); // Max 3 suggestions
};

// Location activities
export type LocationActivity = {
  id?: string;
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
      statEffects: { energy: 50, mood: 10 },
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
      statEffects: { hunger: -80, mood: 10, money: -10 },
      requirements: { minMoney: 10 },
    },
    {
      name: "Make Snack",
      icon: "🥪",
      description: "Quick snack to reduce hunger",
      timeCost: 1,
      statEffects: { hunger: -30, money: -5 },
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
      statEffects: { fitness: 5, energy: -25, mood: 10 },
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
      name: "Espresso (To-Go)",
      icon: "☕",
      description: "Quick strong shot to take with you",
      timeCost: 1,
      statEffects: { energy: 10, mood: 3, money: -3 },
      requirements: { minMoney: 3 },
    },
    {
      name: "Latte (To-Go)",
      icon: "🥤",
      description: "Creamy coffee for the road",
      timeCost: 1,
      statEffects: { energy: 13, mood: 4, money: -5 },
      requirements: { minMoney: 5 },
    },
    {
      name: "Cappuccino (For Here)",
      icon: "☕",
      description: "Sit down and enjoy a warm cappuccino",
      timeCost: 1,
      statEffects: { energy: 16, mood: 6, money: -7 },
      requirements: { minMoney: 7 },
    },
    {
      name: "Iced Mocha (For Here)",
      icon: "🧋",
      description: "Sweet cold coffee with a bigger kick",
      timeCost: 1,
      statEffects: { energy: 19, mood: 8, money: -9 },
      requirements: { minMoney: 9 },
    },
    {
      name: "Cookie (To-Go)",
      icon: "🍪",
      description: "A quick bite to carry with you",
      timeCost: 1,
      statEffects: { hunger: -15, mood: 2, money: -4 },
      requirements: { minMoney: 4 },
    },
    {
      name: "Croissant (To-Go)",
      icon: "🥐",
      description: "Buttery pastry for light hunger",
      timeCost: 1,
      statEffects: { hunger: -20, mood: 3, money: -6 },
      requirements: { minMoney: 6 },
    },
    {
      name: "Blueberry Muffin (To-Go)",
      icon: "🧁",
      description: "Filling snack with extra calories",
      timeCost: 1,
      statEffects: { hunger: -30, mood: 4, money: -8 },
      requirements: { minMoney: 8 },
    },
    {
      name: "Slice of Cake (To-Go)",
      icon: "🍰",
      description: "Sweet and heavy snack for bigger hunger",
      timeCost: 1,
      statEffects: { hunger: -40, mood: 6, money: -11 },
      requirements: { minMoney: 11 },
    },
    {
      name: "Sandwich Meal (For Here)",
      icon: "🥪",
      description: "A full cafe meal that fills you up",
      timeCost: 1,
      statEffects: { hunger: -50, mood: 8, money: -15 },
      requirements: { minMoney: 15 },
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
  Bar: [
    {
      name: "Drink Beer",
      icon: "🍺",
      description: "A light drink to relax",
      timeCost: 1,
      statEffects: { mood: 8, money: -8, sobriety: -20 },
      requirements: { minMoney: 8 },
    },
    {
      name: "Drink Whiskey",
      icon: "🥃",
      description: "A stronger drink that hits harder",
      timeCost: 1,
      statEffects: { mood: 10, energy: -2, money: -14, sobriety: -30 },
      requirements: { minMoney: 14 },
    },
    {
      name: "House Cocktail",
      icon: "🍹",
      description: "A mixed drink with a smooth buzz",
      timeCost: 1,
      statEffects: { mood: 12, money: -16, sobriety: -25 },
      requirements: { minMoney: 16 },
    },
  ],
  Nightclub: [
    {
      name: "Vodka Soda",
      icon: "🍸",
      description: "A crisp drink from the bar",
      timeCost: 1,
      statEffects: { mood: 10, money: -12, sobriety: -22 },
      requirements: { minMoney: 12 },
    },
    {
      name: "Tequila Shot",
      icon: "🥃",
      description: "Fast and strong",
      timeCost: 1,
      statEffects: { mood: 8, money: -10, sobriety: -28 },
      requirements: { minMoney: 10 },
    },
    {
      name: "Energy Cocktail",
      icon: "🍹",
      description: "Keeps you moving for longer",
      timeCost: 1,
      statEffects: { energy: 5, mood: 12, money: -18, sobriety: -24 },
      requirements: { minMoney: 18 },
    },
    {
      name: "Dance",
      icon: "🕺",
      description: "Hit the dance floor",
      timeCost: 1,
      statEffects: { mood: 18, energy: -15, style: 1 },
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
      statEffects: { mood: 5, energy: -5, money: -20, sobriety: -25 },
      requirements: { minMoney: 20 },
    },
  ],
  [TESTING_LOCATION_NAME]: [
    {
      id: "test_env_casual",
      name: "Preview Casual",
      icon: "👕",
      description: "Preview casual outfit category.",
      timeCost: 0,
      statEffects: {},
    },
    {
      id: "test_env_university",
      name: "Preview University",
      icon: "🎓",
      description: "Preview university outfit category.",
      timeCost: 0,
      statEffects: {},
    },
    {
      id: "test_env_gym",
      name: "Preview Gym",
      icon: "🏋️",
      description: "Preview gym outfit category.",
      timeCost: 0,
      statEffects: {},
    },
    {
      id: "test_env_home",
      name: "Preview Home",
      icon: "🏠",
      description: "Preview home outfit category.",
      timeCost: 0,
      statEffects: {},
    },
    {
      id: "test_env_date",
      name: "Preview Date",
      icon: "💃",
      description: "Preview date outfit category.",
      timeCost: 0,
      statEffects: {},
    },
    {
      id: "test_env_nun",
      name: "Preview Nun",
      icon: "⛪",
      description: "Preview nun outfit category.",
      timeCost: 0,
      statEffects: {},
    },
  ],
};
