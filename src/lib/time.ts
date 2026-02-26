import { DayOfWeek, DAYS_OF_WEEK } from "@/data/gameConstants";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

/**
 * Convert an hour into a general time-of-day bucket.
 * Keeps one set of boundaries so backgrounds, descriptions, and UI stay in sync.
 */
export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}

/**
 * User-facing label for time of day.
 * Keeps "early morning" distinct while image/event buckets remain stable.
 */
export function getTimeOfDayLabel(hour: number): string {
  if (hour >= 3 && hour < 6) return "Early Morning";
  const timeOfDay = getTimeOfDay(hour);
  return timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1);
}

/**
 * Calculate total game hours elapsed given a day + hour.
 */
export function calculateGameTime(
  day: DayOfWeek,
  hour: number,
  dayCount?: number,
): number {
  if (typeof dayCount === "number" && Number.isFinite(dayCount)) {
    return Math.max(0, Math.floor(dayCount)) * 24 + hour;
  }

  const dayIndex = Math.max(0, DAYS_OF_WEEK.indexOf(day));
  return dayIndex * 24 + hour;
}
