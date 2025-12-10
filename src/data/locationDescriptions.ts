// src/data/locationDescriptions.ts
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
  Cafe: {
    default: "The aroma of freshly brewed coffee welcomes you.",
    morning: "Morning regulars sip their lattes and read the news.",
    afternoon: "The café buzzes with lunch crowd conversation.",
    evening: "A quieter atmosphere, perfect for studying or dates.",
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
  "Strip Club": {
    default: "Dim lights and pulsing music create an electric atmosphere.",
    evening: "The evening show is starting to draw a crowd.",
    night: "The club is in full swing, energy at its peak.",
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
