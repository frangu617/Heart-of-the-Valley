import { getTimeOfDay, type TimeOfDay } from "./time";

export function getLocationBackground(location: string, hour: number): string {
  const timeOfDay = getTimeOfDay(hour);
  const locationKey = location
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/'/g, "");
  const imageTimeOfDay = timeOfDay === "evening" ? "afternoon" : timeOfDay;
  return `/images/locations/${locationKey}/${imageTimeOfDay}.png`;
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
