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
      { location: "Iris' Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Iris' Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Iris' Office", startHour: 17, endHour: 18 },
      { location: "Iris' Living Room", startHour: 18, endHour: 24 },
    ],
    Tuesday: [
      { location: "Iris' Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Iris' Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Iris' Office", startHour: 17, endHour: 18 },
      { location: "Iris' Living Room", startHour: 18, endHour: 24 },
    ],
    Wednesday: [
      { location: "Iris' Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Iris' Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Iris' Office", startHour: 17, endHour: 18 },
      { location: "Iris' Living Room", startHour: 18, endHour: 24 },
    ],
    Thursday: [
      { location: "Iris' Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Iris' Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Iris' Office", startHour: 17, endHour: 18 },
      { location: "Iris' Living Room", startHour: 18, endHour: 24 },
    ],
    Friday: [
      { location: "Iris' Bedroom", startHour: 0, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 10 },
      { location: "Iris' Office", startHour: 10, endHour: 13 },
      { location: "Classroom", startHour: 13, endHour: 17 },
      { location: "Iris' Office", startHour: 17, endHour: 18 },
      { location: "Iris' Living Room", startHour: 18, endHour: 24 },
    ],
    Saturday: [
      { location: "Iris' Bedroom", startHour: 0, endHour: 9 },
      { location: "Cafe", startHour: 9, endHour: 12 },
      { location: "Gym", startHour: 12, endHour: 14 },
      { location: "Iris' Living Room", startHour: 14, endHour: 24 },
    ],
    Sunday: [
      { location: "Iris' Bedroom", startHour: 0, endHour: 10 },
      { location: "Iris' Living Room", startHour: 10, endHour: 11 },
      { location: "Gym", startHour: 11, endHour: 13 },
      { location: "City", startHour: 13, endHour: 18 },
      { location: "Iris' Bathroom", startHour: 18, endHour: 19 },
      { location: "Iris' Bedroom", startHour: 19, endHour: 24 },
    ],
  },

  Dawn: {
    Monday: [
      { location: "Dawn's Bedroom", startHour: 0, endHour: 7 },
      { location: "Iris' Bathroom", startHour: 7, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 9 },
      { location: "Classroom", startHour: 9, endHour: 13 },
      { location: "Cafe", startHour: 13, endHour: 14 },
      { location: "Gym", startHour: 14, endHour: 16 },
      { location: "Iris' Living Room", startHour: 16, endHour: 23 },
    ],
    Tuesday: [
      { location: "Dawn's Bedroom", startHour: 0, endHour: 9 },
      { location: "Iris' Living Room", startHour: 9, endHour: 13 },
      { location: "University Hallway", startHour: 13, endHour: 14 },
      { location: "Classroom", startHour: 14, endHour: 18 },
      { location: "Gym", startHour: 18, endHour: 20 },
      { location: "Iris' Bathroom", startHour: 20, endHour: 21 },
      { location: "Dawn's Bedroom", startHour: 21, endHour: 23 },
    ],
    Wednesday: [
      { location: "Dawn's Bedroom", startHour: 0, endHour: 7 },
      { location: "Iris' Bathroom", startHour: 7, endHour: 8 },
      { location: "University Hallway", startHour: 8, endHour: 9 },
      { location: "Classroom", startHour: 9, endHour: 13 },
      { location: "Cafe", startHour: 13, endHour: 14 },
      { location: "Gym", startHour: 14, endHour: 16 },
      { location: "Iris' Living Room", startHour: 16, endHour: 23 },
    ],
    Thursday: [
      { location: "Dawn's Bedroom", startHour: 0, endHour: 9 },
      { location: "Iris' Living Room", startHour: 9, endHour: 13 },
      { location: "University Hallway", startHour: 13, endHour: 14 },
      { location: "Classroom", startHour: 14, endHour: 18 },
      { location: "Gym", startHour: 18, endHour: 20 },
      { location: "Iris' Bathroom", startHour: 20, endHour: 21 },
      { location: "Dawn's Bedroom", startHour: 21, endHour: 23 },
    ],
    Friday: [
      { location: "Dawn's Bedroom", startHour: 0, endHour: 9 },
      { location: "Gym", startHour: 9, endHour: 11 },
      { location: "Iris' Bathroom", startHour: 11, endHour: 12 },
      { location: "Mall", startHour: 12, endHour: 15 },
      { location: "Beach", startHour: 15, endHour: 17 },
      { location: "Iris' Living Room", startHour: 17, endHour: 23 },
    ],
    Saturday: [
      { location: "Dawn's Bedroom", startHour: 0, endHour: 10 },
      { location: "Gym", startHour: 10, endHour: 12 },
      { location: "Iris' Bathroom", startHour: 12, endHour: 13 },
      { location: "Beach", startHour: 13, endHour: 17 },
      { location: "Iris' Living Room", startHour: 17, endHour: 23 },
    ],
    Sunday: [
      { location: "Dawn's Bedroom", startHour: 0, endHour: 11 },
      { location: "Iris' Living Room", startHour: 11, endHour: 23 },
    ],
  },

  Gwen: {
    Monday: [
      { location: "Gwen's Bedroom", startHour: 0, endHour: 8 },
      { location: "Gwen's Bathroom", startHour: 8, endHour: 9 },
      { location: "Hallway", startHour: 9, endHour: 10 },
      { location: "City", startHour: 10, endHour: 17 },
      { location: "Gwen's Living Room", startHour: 17, endHour: 23 },
    ],
    Tuesday: [
      { location: "Gwen's Bedroom", startHour: 0, endHour: 8 },
      { location: "Gwen's Bathroom", startHour: 8, endHour: 9 },
      { location: "Hallway", startHour: 9, endHour: 10 },
      { location: "City", startHour: 10, endHour: 17 },
      { location: "Gwen's Living Room", startHour: 17, endHour: 23 },
    ],
    Wednesday: [
      { location: "Gwen's Bedroom", startHour: 0, endHour: 8 },
      { location: "Gwen's Bathroom", startHour: 8, endHour: 9 },
      { location: "Hallway", startHour: 9, endHour: 10 },
      { location: "City", startHour: 10, endHour: 17 },
      { location: "Gwen's Living Room", startHour: 17, endHour: 23 },
    ],
    Thursday: [
      { location: "Gwen's Bedroom", startHour: 0, endHour: 8 },
      { location: "Gwen's Bathroom", startHour: 8, endHour: 9 },
      { location: "Hallway", startHour: 9, endHour: 10 },
      { location: "City", startHour: 10, endHour: 17 },
      { location: "Gwen's Living Room", startHour: 17, endHour: 23 },
    ],
    Friday: [
      { location: "Gwen's Bedroom", startHour: 0, endHour: 8 },
      { location: "Gwen's Bathroom", startHour: 8, endHour: 9 },
      { location: "Hallway", startHour: 9, endHour: 10 },
      { location: "City", startHour: 10, endHour: 17 },
      { location: "Gwen's Living Room", startHour: 17, endHour: 21 },
      { location: "Strip Club", startHour: 21, endHour: 23 },
    ],
    Saturday: [
      { location: "Gwen's Bedroom", startHour: 0, endHour: 3 },
      { location: "Gwen's Bathroom", startHour: 3, endHour: 4 },
      { location: "Gwen's Bedroom", startHour: 4, endHour: 11 },
      { location: "Gwen's Living Room", startHour: 11, endHour: 18 },
      { location: "Gwen's Bathroom", startHour: 18, endHour: 19 },
      { location: "Strip Club", startHour: 21, endHour: 23 },
    ],
    Sunday: [
      { location: "Gwen's Bedroom", startHour: 0, endHour: 3 },
      { location: "Gwen's Bathroom", startHour: 3, endHour: 4 },
      { location: "Gwen's Bedroom", startHour: 4, endHour: 12 },
      { location: "Gwen's Living Room", startHour: 12, endHour: 23 },
    ],
  },

  Yumi: {
    Monday: [
      { location: "Yumi's Bedroom", startHour: 0, endHour: 8 },
      { location: "Yumi's Bathroom", startHour: 8, endHour: 9 },
      { location: "University Hallway", startHour: 9, endHour: 10 },
      { location: "Classroom", startHour: 10, endHour: 12 },
      { location: "Classroom", startHour: 12, endHour: 14 },
      { location: "Cafe", startHour: 14, endHour: 17 },
      { location: "Yumi's Bedroom", startHour: 17, endHour: 20 },
      { location: "Yumi's Bedroom", startHour: 20, endHour: 23 },
    ],
    Tuesday: [
      { location: "Yumi's Bedroom", startHour: 0, endHour: 9 },
      { location: "Yumi's Bathroom", startHour: 9, endHour: 10 },
      { location: "Cafe", startHour: 10, endHour: 14 },
      { location: "Mall", startHour: 14, endHour: 17 },
      { location: "Yumi's Bedroom", startHour: 17, endHour: 20 },
      { location: "Yumi's Bedroom", startHour: 20, endHour: 23 },
    ],
    Wednesday: [
      { location: "Yumi's Bedroom", startHour: 0, endHour: 8 },
      { location: "Yumi's Bathroom", startHour: 8, endHour: 9 },
      { location: "University Hallway", startHour: 9, endHour: 10 },
      { location: "Classroom", startHour: 10, endHour: 12 },
      { location: "Classroom", startHour: 12, endHour: 14 },
      { location: "Cafe", startHour: 14, endHour: 17 },
      { location: "Yumi's Bedroom", startHour: 17, endHour: 20 },
      { location: "Yumi's Bedroom", startHour: 20, endHour: 23 },
    ],
    Thursday: [
      { location: "Yumi's Bedroom", startHour: 0, endHour: 9 },
      { location: "Yumi's Bathroom", startHour: 9, endHour: 10 },
      { location: "Gym", startHour: 10, endHour: 12 },
      { location: "Cafe", startHour: 12, endHour: 18 },
      { location: "Yumi's Bedroom", startHour: 18, endHour: 20 },
      { location: "Yumi's Bedroom", startHour: 20, endHour: 23 },
    ],
    Friday: [
      { location: "Yumi's Bedroom", startHour: 0, endHour: 9 },
      { location: "Yumi's Bathroom", startHour: 9, endHour: 10 },
      { location: "University Hallway", startHour: 10, endHour: 11 },
      { location: "Classroom", startHour: 11, endHour: 14 },
      { location: "City", startHour: 14, endHour: 19 },
      { location: "Yumi's Bedroom", startHour: 19, endHour: 23 },
    ],
    Saturday: [
      { location: "Yumi's Bedroom", startHour: 0, endHour: 11 },
      { location: "Yumi's Bathroom", startHour: 11, endHour: 12 },
      { location: "Cafe", startHour: 12, endHour: 16 },
      { location: "Yumi's Bedroom", startHour: 16, endHour: 20 },
      { location: "Yumi's Bedroom", startHour: 20, endHour: 23 },
    ],
    Sunday: [
      { location: "Yumi's Bedroom", startHour: 0, endHour: 10 },
      { location: "Yumi's Bathroom", startHour: 10, endHour: 11 },
      { location: "Beach", startHour: 11, endHour: 15 },
      { location: "Yumi's Bedroom", startHour: 15, endHour: 23 },
    ],
  },

  Ruby: {
    Monday: [
      { location: "Ruby's Bedroom", startHour: 0, endHour: 6 },
      { location: "Ruby's Bathroom", startHour: 6, endHour: 7 },
      { location: "Gym", startHour: 7, endHour: 14 },
      { location: "Ruby's Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 },
      { location: "Ruby's Bathroom", startHour: 21, endHour: 22 },
      { location: "Ruby's Living Room", startHour: 22, endHour: 23 },
    ],
    Tuesday: [
      { location: "Ruby's Bedroom", startHour: 0, endHour: 6 },
      { location: "Ruby's Bathroom", startHour: 6, endHour: 7 },
      { location: "Gym", startHour: 7, endHour: 14 },
      { location: "Ruby's Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 },
      { location: "Ruby's Bathroom", startHour: 21, endHour: 22 },
      { location: "Ruby's Living Room", startHour: 22, endHour: 23 },
    ],
    Wednesday: [
      { location: "Ruby's Bedroom", startHour: 0, endHour: 6 },
      { location: "Ruby's Bathroom", startHour: 6, endHour: 7 },
      { location: "Gym", startHour: 7, endHour: 14 },
      { location: "Ruby's Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 },
      { location: "Ruby's Bathroom", startHour: 21, endHour: 22 },
      { location: "Ruby's Living Room", startHour: 22, endHour: 23 },
    ],
    Thursday: [
      { location: "Ruby's Bedroom", startHour: 0, endHour: 6 },
      { location: "Ruby's Bathroom", startHour: 6, endHour: 7 },
      { location: "Gym", startHour: 7, endHour: 14 },
      { location: "Ruby's Living Room", startHour: 14, endHour: 17 },
      { location: "Gym", startHour: 17, endHour: 21 },
      { location: "Ruby's Bathroom", startHour: 21, endHour: 22 },
      { location: "Ruby's Living Room", startHour: 22, endHour: 23 },
    ],
    Friday: [
      { location: "Ruby's Bedroom", startHour: 0, endHour: 6 },
      { location: "Ruby's Bathroom", startHour: 6, endHour: 7 },
      { location: "Gym", startHour: 7, endHour: 14 },
      { location: "Beach", startHour: 14, endHour: 19 },
      { location: "Ruby's Bathroom", startHour: 19, endHour: 20 },
      { location: "Ruby's Living Room", startHour: 20, endHour: 23 },
    ],
    Saturday: [
      { location: "Ruby's Bedroom", startHour: 0, endHour: 7 },
      { location: "Ruby's Bathroom", startHour: 7, endHour: 8 },
      { location: "Gym", startHour: 8, endHour: 13 },
      { location: "Ruby's Living Room", startHour: 13, endHour: 23 },
    ],
    Sunday: [
      { location: "Ruby's Bedroom", startHour: 0, endHour: 9 },
      { location: "Ruby's Living Room", startHour: 9, endHour: 12 },
      { location: "Beach", startHour: 12, endHour: 17 }, // Relax
      { location: "Ruby's Living Room", startHour: 17, endHour: 24 },
    ],
  },
};
