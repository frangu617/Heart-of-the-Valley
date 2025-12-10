import { DayOfWeek, DAYS_OF_WEEK } from "@/data/gameConstants";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

/**
 * Convert an hour into a general time-of-day bucket.
 * Keeps one set of boundaries so backgrounds, descriptions, and UI stay in sync.
 */
export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour < 19) return "afternoon"; // Treat up to 7pm as day
  return "night"; // 8pm onward
}

/**
 * Calculate total game hours elapsed given a day + hour.
 */
export function calculateGameTime(day: DayOfWeek, hour: number): number {
  const dayIndex = Math.max(0, DAYS_OF_WEEK.indexOf(day));
  return dayIndex * 24 + hour;
}
