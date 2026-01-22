import { getTimeOfDay, type TimeOfDay } from "./time";

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
