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
  "University Hallway": "university",
  University: "university",
  Beach: "beach",
  Cafe: "casual",
  Mall: "casual",
  City: "casual",
  Street: "casual",
  Hallway: "home",
  "Strip Club": "date", // Gwen's work outfit
};

// Determine relationship stance based on stats
export function getRelationshipStance(girl: Girl): RelationshipStance {
  const { affection, love, trust } = girl.stats;

  // In a relationship
  if (love >= 60) return "love";

  // Very close but not in love yet
  if (affection >= 50 && trust >= 40) return "intimate";

  // Getting comfortable
  if (affection >= 30) return "confident";

  // Starting to open up
  if (affection >= 15 || trust >= 20) return "shy";

  // Default
  return "neutral";
}

// Get the appropriate character image
export function getCharacterImage(girl: Girl, location: string): string {
  const girlName = girl.name.toLowerCase();
  const category = locationToCategory[location] || "casual";
  const stance = getRelationshipStance(girl);

  // Try specific combination first
  const specificImage = `/images/characters/${girlName}/${category}/${stance}.png`;

  // Fallback hierarchy
  const fallbacks = [
    specificImage,
    `/images/characters/${girlName}/casual/${stance}.png`,
    `/images/characters/${girlName}/${category}_neutral.png`,
    `/images/characters/${girlName}/casual_${stance}.png`,
    `/images/characters/${girlName}/casual_neutral.png`,
    `/images/${girlName}.png`, // Your current images
  ];

  return fallbacks[0]; // Return primary, handle errors in component
}

// Get outfit description for image naming reference
export function getOutfitDescription(location: string): string {
  const category = locationToCategory[location] || "casual";

  const descriptions: Record<LocationCategory, string> = {
    home: "comfortable home clothes",
    gym: "athletic workout gear",
    university: "professional/academic attire",
    beach: "swimsuit or beach wear",
    city: "stylish casual outfit",
    casual: "everyday casual clothes",
    date: "elegant date outfit",
  };

  return descriptions[category];
}
