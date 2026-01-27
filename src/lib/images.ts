import { Girl } from "@/data/characters";
import { getTimeOfDay, type TimeOfDay } from "./time";

// Character image helpers

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
  "Iris' Office": "university",
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
const homeLocations = new Set(
  Object.entries(locationToCategory)
    .filter(([, category]) => category === "home")
    .map(([name]) => name)
);

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
  expression?: string
): string {
  const girlName = girl.name.toLowerCase();
  let category = locationToCategory[location] || "casual";

  // Use expression if provided, otherwise calculate stance from stats
  const stance = expression || getRelationshipStance(girl);

  // Special logic for home locations:
  // Before 6 PM, use casual clothes
  // After 7 PM, use home/pajama outfits
  if (girl.name === "Iris" && location === "Hallway") {
    category = "casual";
  } else if (homeLocations.has(location)) {
    if (hour < 19) {
      category = "casual";
    } else {
      category = "home";
    }
  }

  const specificImage = `/images/characters/${girlName}/${category}/${stance}.webp`;
  return specificImage;
}

// Get outfit description for image naming reference
export function getOutfitDescription(location: string, hour: number): string {
  let category = locationToCategory[location] || "casual";

  if (homeLocations.has(location)) {
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

// Location image helpers

const LOCATION_TIME_OVERRIDES: Record<string, TimeOfDay[]> = {
  bar: ["afternoon"],
  dawns_bedroom: ["morning", "afternoon"],
  gift_shop: ["afternoon"],
};

const LOCATION_IMAGE_EXTENSIONS: Record<
  string,
  Partial<Record<TimeOfDay, "png" | "jpg">>
> = {
  bar: { afternoon: "jpg" },
};

const normalizeLocationKey = (location: string) =>
  location.toLowerCase().replace(/\s+/g, "_").replace(/'/g, "");

export function getLocationImagePath(
  location: string,
  timeOfDay: TimeOfDay
): string {
  const locationKey = normalizeLocationKey(location);
  const preferredTime = timeOfDay === "evening" ? "afternoon" : timeOfDay;
  const availableTimes = LOCATION_TIME_OVERRIDES[locationKey];
  const resolvedTime = availableTimes
    ? availableTimes.includes(preferredTime)
      ? preferredTime
      : availableTimes.includes("afternoon")
      ? "afternoon"
      : availableTimes[0]
    : preferredTime;
  const extension =
    LOCATION_IMAGE_EXTENSIONS[locationKey]?.[resolvedTime] ?? "png";
  return `/images/locations/${locationKey}/${resolvedTime}.${extension}`;
}

export function getLocationBackground(location: string, hour: number): string {
  const timeOfDay = getTimeOfDay(hour);
  return getLocationImagePath(location, timeOfDay);
}

// Optional: Get atmosphere overlay color
export function getAtmosphereOverlay(hour: number): string {
  const timeOfDay = getTimeOfDay(hour);

  const overlays: Record<TimeOfDay, string> = {
    morning:
      "bg-gradient-to-b from-orange-300/30 via-transparent to-transparent",
    afternoon:
      "bg-gradient-to-b from-yellow-200/20 via-transparent to-transparent",
    evening:
      "bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-black/30",
    night: "bg-gradient-to-b from-indigo-900/60 via-purple-900/30 to-black/40",
  };

  return overlays[timeOfDay];
}
