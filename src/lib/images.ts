import { Girl } from "@/data/characters";
import { getTimeOfDay, type TimeOfDay } from "./time";
import imageManifest from "../../public/image-manifest.json";

// Character image helpers

type LocationCategory =
  | "home"
  | "gym"
  | "university"
  | "beach"
  | "city"
  | "casual"
  | "date"
  | "work"
  | "nun";

type RelationshipStance = "neutral" | "shy" | "flirty" | "love" | "intimate";
const EXPRESSION_ASSET_ALIASES: Record<string, string> = {
  love: "seductive",
  intimate: "seductive",
  confident: "flirty",
  kissingmc: "kissingMC",
};

type ImageManifest = {
  images?: string[];
};

const CHARACTER_IMAGE_EXTENSIONS = ["webp", "png", "jpg", "jpeg"] as const;
const CHARACTER_CATEGORY_FALLBACK_ORDER: LocationCategory[] = [
  "casual",
  "home",
  "university",
  "gym",
  "date",
  "work",
  "nun",
  "beach",
  "city",
];
const EXPRESSION_FALLBACKS: Record<string, string[]> = {
  flirty: ["flirty", "cuteFlirt", "happy", "shy", "neutral", "excited"],
  seductive: ["seductive", "flirty", "cuteFlirt", "happy", "neutral"],
  shy: ["shy", "neutral", "happy", "flirty"],
  angry: ["angry", "annoyed", "neutral"],
  annoyed: ["annoyed", "angry", "neutral"],
  sad: ["sad", "neutral", "happy"],
  excited: ["excited", "happy", "neutral"],
  kissingmc: ["kissingMC", "kissMC", "seductive", "happy", "neutral"],
};
const AVAILABLE_CHARACTER_IMAGE_PATHS = new Set(
  (((imageManifest as ImageManifest).images ?? []) as string[]).filter(
    (path): path is string =>
      typeof path === "string" && path.startsWith("/images/characters/"),
  ),
);

const unique = <T>(values: T[]) => Array.from(new Set(values));

const getExpressionCandidates = (expression: string): string[] => {
  const normalized = expression.toLowerCase();
  const preferred = EXPRESSION_FALLBACKS[normalized];
  if (!preferred) {
    return unique([expression, "neutral", "happy"]);
  }
  return unique([expression, ...preferred, "neutral", "happy"]);
};

const getCategoryCandidates = (primaryCategory: LocationCategory): LocationCategory[] => {
  const categories = [primaryCategory];
  if (primaryCategory !== "casual") {
    categories.push("casual");
  }
  CHARACTER_CATEGORY_FALLBACK_ORDER.forEach((category) => {
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
  return categories;
};

const resolveCharacterImagePath = (
  girlName: string,
  category: LocationCategory,
  expression: string,
): string | null => {
  const basePath = `/images/characters/${girlName}/${category}/${expression}`;
  for (const extension of CHARACTER_IMAGE_EXTENSIONS) {
    const candidatePath = `${basePath}.${extension}`;
    if (AVAILABLE_CHARACTER_IMAGE_PATHS.has(candidatePath)) {
      return candidatePath;
    }
  }
  return null;
};

export const resolveExpressionAssetName = (expression: string) =>
  EXPRESSION_ASSET_ALIASES[expression] ?? expression;

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
  Nightclub: "date",
  Convent: "nun",
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
  const { affection, love, lust } = girl.stats;

  if (love >= 60) return "love";
  if (affection >= 50 && lust >= 40) return "intimate";
  if (affection >= 30) return "flirty";
  if (affection >= 15 || lust >= 20) return "shy";
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
  const stanceAsset = resolveExpressionAssetName(stance);

  // Special logic for home locations:
  // Before 6 PM, use casual clothes
  // After 7 PM, use home/pajama outfits
  if (girl.name === "Iris" && location === "Hallway") {
    category = "casual";
  } else if (girl.name === "Gwen" && location === "Strip Club") {
    // Gwen uses her strip-club-specific work outfit if available.
    category = "work";
  } else if (homeLocations.has(location)) {
    if (hour < 19) {
      category = "casual";
    } else {
      category = "home";
    }
  }

  const expressionCandidates = getExpressionCandidates(stanceAsset);
  const categoryCandidates = getCategoryCandidates(category);

  for (const categoryCandidate of categoryCandidates) {
    for (const expressionCandidate of expressionCandidates) {
      const resolvedImagePath = resolveCharacterImagePath(
        girlName,
        categoryCandidate,
        expressionCandidate,
      );
      if (resolvedImagePath) {
        return resolvedImagePath;
      }
    }
  }

  return `/images/characters/${girlName}/${category}/${stanceAsset}.webp`;
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
    work: "work/performance outfit",
    nun: "religious habit attire",
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

const LOCATION_KEY_ALIASES: Record<string, string> = {
  testing_studio: "city",
};

const normalizeLocationKey = (location: string) => {
  const key = location.toLowerCase().replace(/\s+/g, "_").replace(/'/g, "");
  return LOCATION_KEY_ALIASES[key] ?? key;
};

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
