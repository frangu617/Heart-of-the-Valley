import { Girl } from "@/data/characters";

type LocationCategory =
  | "home"
  | "gym"
  | "university"
  | "beach"
  | "city"
  | "casual"
  | "date";
type RelationshipStance = "neutral" | "shy" | "confident" | "love" | "intimate";

// Map locations to outfit categories
const locationToCategory: Record<string, LocationCategory> = {
  Bedroom: "home",
  "Living Room": "home",
  Kitchen: "home",
  Bathroom: "home",
  Gym: "gym",
  Classroom: "university",
  Office: "university",
  "Iris' Office": "university",
  "University Hallway": "university",
  University: "university",
  Beach: "beach",
  Cafe: "casual",
  Mall: "casual",
  City: "casual",
  Street: "casual",
  Hallway: "home",
  "Strip Club": "date",
  // Iris's apartment
  "Iris' Living Room": "home",
  "Iris' Bedroom": "home",
  "Iris' Kitchen": "home",
  "Iris' Bathroom": "home",
  "Dawn's bedroom": "home",
};

// Check if location is a home location
const homeLocations = [
  "Bedroom",
  "Living Room",
  "Kitchen",
  "Bathroom",
  "Hallway",
  "Iris' Living Room",
  "Iris' Bedroom",
  "Iris' Kitchen",
  "Iris' Bathroom",
  "Dawn's bedroom",
];

// Determine relationship stance based on stats
export function getRelationshipStance(girl: Girl): RelationshipStance {
  const { affection, love, trust } = girl.stats;

  if (love >= 60) return "love";
  if (affection >= 50 && trust >= 40) return "intimate";
  if (affection >= 30) return "confident";
  if (affection >= 15 || trust >= 20) return "shy";
  return "neutral";
}

// Get the appropriate character image with time-based outfit selection
export function getCharacterImage(
  girl: Girl,
  location: string,
  hour: number,
  expression?: string // Add this parameter
): string {
  const girlName = girl.name.toLowerCase();
  let category = locationToCategory[location] || "casual";

  // Use expression if provided, otherwise calculate stance from stats
  const stance = expression || getRelationshipStance(girl);

  // Special logic for home locations:
  // Before 6 PM, use casual clothes
  // After 6 PM, use home/pajama outfits
  if (homeLocations.includes(location)) {
    if (hour < 18) {
      category = "casual";
    } else {
      category = "home";
    }
  }

  // Try specific combination first
  const specificImage = `/images/characters/${girlName}/${category}/${stance}.webp`;

  // Fallback hierarchy
  const fallbacks = [
    specificImage,
    `/images/characters/${girlName}/casual/${stance}.webp`,
    `/images/characters/${girlName}/${category}_neutral.webp`,
    `/images/characters/${girlName}/casual_${stance}.webp`,
    `/images/characters/${girlName}/casual_neutral.webp`,
    `/images/${girlName}.webp`,
  ];

  return fallbacks[0];
}

// Get outfit description for image naming reference
export function getOutfitDescription(location: string, hour: number): string {
  let category = locationToCategory[location] || "casual";

  if (homeLocations.includes(location)) {
    category = hour < 18 ? "casual" : "home";
  }

  const descriptions: Record<LocationCategory, string> = {
    home: "comfortable home clothes/pajamas",
    gym: "athletic workout gear",
    university: "professional/academic attire",
    beach: "swimsuit or beach wear",
    city: "stylish casual outfit",
    casual: "everyday casual clothes",
    date: "elegant date outfit",
  };

  return descriptions[category];
}
