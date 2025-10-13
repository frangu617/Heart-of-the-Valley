export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TimeSlot = {
  location: string;
  startHour: number; // 0-23
  endHour: number; // 0-23
};

export type CharacterSchedule = {
  [key in DayOfWeek]: TimeSlot[];
};

// Helper function to get current location based on day and time
export const getCharacterLocation = (
  characterName: string,
  day: DayOfWeek,
  hour: number,
  hasMetCharacter: boolean = false
): string => {
  const schedule = characterSchedules[characterName];
  if (!schedule) return "Unknown";

  // Special case for Gwen - only appears after meeting her
  if (characterName === "Gwen" && !hasMetCharacter) {
    return "Hallway"; // Always at hallway until first meeting
  }

  const daySchedule = schedule[day];

  // Find matching time slot
  for (const slot of daySchedule) {
    if (hour >= slot.startHour && hour < slot.endHour) {
      return slot.location;
    }
  }

  // Default fallback
  return "Bedroom"; // At home if not scheduled
};

export const characterSchedules: Record<string, CharacterSchedule> = {
  Iris: {
    Monday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Office", startHour: 17, endHour: 18 },
      { location: "Living Room", startHour: 18, endHour: 24 },
    ],
    Tuesday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Office", startHour: 17, endHour: 18 },
      { location: "Living Room", startHour: 18, endHour: 24 },
    ],
    Wednesday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Office", startHour: 17, endHour: 18 },
      { location: "Living Room", startHour: 18, endHour: 24 },
    ],
    Thursday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Office", startHour: 17, endHour: 18 },
      { location: "Living Room", startHour: 18, endHour: 24 },
    ],
    Friday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Office", startHour: 17, endHour: 18 },
      { location: "Living Room", startHour: 18, endHour: 24 },
    ],
    Saturday: [
      { location: "Bedroom", startHour: 0, endHour: 9 },
      { location: "Living Room", startHour: 9, endHour: 12 },
      { location: "Cafe", startHour: 12, endHour: 14 },
      { location: "Living Room", startHour: 14, endHour: 24 },
    ],
    Sunday: [
      { location: "Bedroom", startHour: 0, endHour: 10 },
      { location: "Living Room", startHour: 10, endHour: 24 },
    ],
  },

  Dawn: {
    Monday: [
      { location: "Bedroom", startHour: 0, endHour: 7 },
      { location: "University Hallway", startHour: 7, endHour: 8 },
      { location: "Classroom", startHour: 8, endHour: 12 }, // Morning classes
      { location: "Cafe", startHour: 12, endHour: 14 }, // Lunch
      { location: "Gym", startHour: 14, endHour: 16 }, // Workout
      { location: "Living Room", startHour: 16, endHour: 24 }, // Home studying/gaming
    ],
    Tuesday: [
      { location: "Bedroom", startHour: 0, endHour: 9 },
      { location: "Living Room", startHour: 9, endHour: 13 }, // Home in morning
      { location: "University Hallway", startHour: 13, endHour: 14 },
      { location: "Classroom", startHour: 14, endHour: 18 }, // Afternoon classes
      { location: "Living Room", startHour: 18, endHour: 24 },
    ],
    Wednesday: [
      { location: "Bedroom", startHour: 0, endHour: 7 },
      { location: "University Hallway", startHour: 7, endHour: 8 },
      { location: "Classroom", startHour: 8, endHour: 12 }, // Morning classes
      { location: "Cafe", startHour: 12, endHour: 14 },
      { location: "Gym", startHour: 14, endHour: 16 },
      { location: "Living Room", startHour: 16, endHour: 24 },
    ],
    Thursday: [
      { location: "Bedroom", startHour: 0, endHour: 9 },
      { location: "Living Room", startHour: 9, endHour: 13 },
      { location: "University Hallway", startHour: 13, endHour: 14 },
      { location: "Classroom", startHour: 14, endHour: 18 }, // Afternoon classes
      { location: "Living Room", startHour: 18, endHour: 24 },
    ],
    Friday: [
      { location: "Bedroom", startHour: 0, endHour: 9 },
      { location: "Gym", startHour: 9, endHour: 11 },
      { location: "Mall", startHour: 11, endHour: 15 }, // Shopping
      { location: "Living Room", startHour: 15, endHour: 24 },
    ],
    Saturday: [
      { location: "Bedroom", startHour: 0, endHour: 10 },
      { location: "Gym", startHour: 10, endHour: 12 },
      { location: "Beach", startHour: 12, endHour: 17 }, // Beach day
      { location: "Living Room", startHour: 17, endHour: 24 },
    ],
    Sunday: [
      { location: "Bedroom", startHour: 0, endHour: 11 }, // Sleep in
      { location: "Living Room", startHour: 11, endHour: 24 }, // Gaming/studying
    ],
  },

  Gwen: {
    // Babysitter during weekdays, stripper on weekend nights
    Monday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "Hallway", startHour: 8, endHour: 9 },
      { location: "City", startHour: 9, endHour: 17 }, // Babysitting (random homes)
      { location: "Living Room", startHour: 17, endHour: 24 },
    ],
    Tuesday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "Hallway", startHour: 8, endHour: 9 },
      { location: "City", startHour: 9, endHour: 17 }, // Babysitting
      { location: "Living Room", startHour: 17, endHour: 24 },
    ],
    Wednesday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "Hallway", startHour: 8, endHour: 9 },
      { location: "City", startHour: 9, endHour: 17 }, // Babysitting
      { location: "Living Room", startHour: 17, endHour: 24 },
    ],
    Thursday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "Hallway", startHour: 8, endHour: 9 },
      { location: "City", startHour: 9, endHour: 17 }, // Babysitting
      { location: "Living Room", startHour: 17, endHour: 24 },
    ],
    Friday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "Hallway", startHour: 8, endHour: 9 },
      { location: "City", startHour: 9, endHour: 17 }, // Babysitting
      { location: "Living Room", startHour: 17, endHour: 21 },
      { location: "Strip Club", startHour: 21, endHour: 24 }, // Night shift
    ],
    Saturday: [
      { location: "Bedroom", startHour: 0, endHour: 3 }, // Home from strip club
      { location: "Bedroom", startHour: 3, endHour: 11 }, // Sleep in
      { location: "Living Room", startHour: 11, endHour: 18 },
      { location: "Strip Club", startHour: 21, endHour: 24 }, // Night shift
    ],
    Sunday: [
      { location: "Bedroom", startHour: 0, endHour: 3 }, // Home from strip club
      { location: "Bedroom", startHour: 3, endHour: 12 }, // Sleep in
      { location: "Living Room", startHour: 12, endHour: 24 }, // Day off
    ],
  },

  Yumi: {
    Monday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 9 },
      { location: "Classroom", startHour: 9, endHour: 12 }, // Frank's class
      { location: "Classroom", startHour: 12, endHour: 14 }, // Stays after class
      { location: "Cafe", startHour: 14, endHour: 17 }, // Study
      { location: "Bedroom", startHour: 17, endHour: 20 },
      { location: "Bedroom", startHour: 20, endHour: 24 }, // Streaming at home
    ],
    Tuesday: [
      { location: "Bedroom", startHour: 0, endHour: 9 },
      { location: "Cafe", startHour: 9, endHour: 14 }, // Study day
      { location: "Mall", startHour: 14, endHour: 17 }, // Shopping
      { location: "Bedroom", startHour: 17, endHour: 20 },
      { location: "Bedroom", startHour: 20, endHour: 24 }, // Streaming
    ],
    Wednesday: [
      { location: "Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 9 },
      { location: "Classroom", startHour: 9, endHour: 12 }, // Frank's class
      { location: "Classroom", startHour: 12, endHour: 14 }, // Stays after class
      { location: "Cafe", startHour: 14, endHour: 17 },
      { location: "Bedroom", startHour: 17, endHour: 20 },
      { location: "Bedroom", startHour: 20, endHour: 24 }, // Streaming
    ],
    Thursday: [
      { location: "Bedroom", startHour: 0, endHour: 10 },
      { location: "Gym", startHour: 10, endHour: 12 },
      { location: "Cafe", startHour: 12, endHour: 18 },
      { location: "Bedroom", startHour: 18, endHour: 20 },
      { location: "Bedroom", startHour: 20, endHour: 24 }, // Streaming
    ],
    Friday: [
      { location: "Bedroom", startHour: 0, endHour: 9 },
      { location: "University Hallway", startHour: 9, endHour: 10 },
      { location: "Classroom", startHour: 10, endHour: 13 },
      { location: "City", startHour: 13, endHour: 19 }, // Out with friends
      { location: "Bedroom", startHour: 19, endHour: 24 },
    ],
    Saturday: [
      { location: "Bedroom", startHour: 0, endHour: 11 },
      { location: "Cafe", startHour: 11, endHour: 16 },
      { location: "Bedroom", startHour: 16, endHour: 20 },
      { location: "Bedroom", startHour: 20, endHour: 24 }, // Streaming
    ],
    Sunday: [
      { location: "Bedroom", startHour: 0, endHour: 10 },
      { location: "Beach", startHour: 10, endHour: 15 }, // Relax day
      { location: "Bedroom", startHour: 15, endHour: 24 },
    ],
  },

  Ruby: {
    // Personal trainer - works at gym most days
    Monday: [
      { location: "Bedroom", startHour: 0, endHour: 6 },
      { location: "Gym", startHour: 6, endHour: 14 }, // Morning shift
      { location: "Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 }, // Evening shift
      { location: "Living Room", startHour: 21, endHour: 24 },
    ],
    Tuesday: [
      { location: "Bedroom", startHour: 0, endHour: 6 },
      { location: "Gym", startHour: 6, endHour: 14 },
      { location: "Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 },
      { location: "Living Room", startHour: 21, endHour: 24 },
    ],
    Wednesday: [
      { location: "Bedroom", startHour: 0, endHour: 6 },
      { location: "Gym", startHour: 6, endHour: 14 },
      { location: "Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 },
      { location: "Living Room", startHour: 21, endHour: 24 },
    ],
    Thursday: [
      { location: "Bedroom", startHour: 0, endHour: 6 },
      { location: "Gym", startHour: 6, endHour: 14 },
      { location: "Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 },
      { location: "Living Room", startHour: 21, endHour: 24 },
    ],
    Friday: [
      { location: "Bedroom", startHour: 0, endHour: 6 },
      { location: "Gym", startHour: 6, endHour: 14 },
      { location: "Beach", startHour: 14, endHour: 19 }, // Afternoon off
      { location: "Living Room", startHour: 19, endHour: 24 },
    ],
    Saturday: [
      { location: "Bedroom", startHour: 0, endHour: 7 },
      { location: "Gym", startHour: 7, endHour: 13 }, // Morning classes
      { location: "Living Room", startHour: 13, endHour: 24 }, // Day off
    ],
    Sunday: [
      { location: "Bedroom", startHour: 0, endHour: 9 },
      { location: "Living Room", startHour: 9, endHour: 12 },
      { location: "Beach", startHour: 12, endHour: 17 }, // Relax
      { location: "Living Room", startHour: 17, endHour: 24 },
    ],
  },
};
