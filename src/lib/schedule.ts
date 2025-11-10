// src/lib/schedule.ts
import { characterSchedules } from "@/data/characterSchedules";
import { DayOfWeek } from "@/data/gameConstants";

/**
 * This is the shape I saw in your characterSchedules:
 *   characterSchedules["Iris"]["Monday"] = [
 *     { startHour: 9, endHour: 12, location: "Library" },
 *     ...
 *   ]
 *
 * If any names differ (e.g., "IRIS" vs "Iris"), add a mapping in nameKey().
 */

type ScheduleSlot = {
  startHour: number; // inclusive
  endHour: number; // exclusive
  location: string;
};

// Allow partial weeks (missing days fall back to static location)
export type WeeklySchedule = Partial<Record<DayOfWeek, ScheduleSlot[]>>;

// A safe way to look up the schedule key by girl name or id
function nameKey(nameOrId: string): keyof typeof characterSchedules | null {
  // Exact match
  if (nameOrId in characterSchedules)
    return nameOrId as keyof typeof characterSchedules;

  // Try a case-insensitive match
  const lower = nameOrId.toLowerCase();
  const hit = Object.keys(characterSchedules).find(
    (k) => k.toLowerCase() === lower
  );
  return (hit as keyof typeof characterSchedules) ?? null;
}

/**
 * Returns the scheduled location for a given girl at (day, hour),
 * or null if no schedule slot matches. Use a static fallback if null.
 */
export function getScheduledLocation(
  girlNameOrId: string,
  day: DayOfWeek,
  hour: number,
  hasMetCharacter: boolean = false
): string | null {
  const key = nameKey(girlNameOrId);
  if (!key) return null;

  // Special case for Gwen - always at Hallway until first meeting
  if (girlNameOrId === "Gwen" && !hasMetCharacter) {
    return "Hallway";
  }

  const weekly = characterSchedules[key] as WeeklySchedule | undefined;
  if (!weekly) return null;

  const slots: ScheduleSlot[] | undefined = weekly[day];
  if (!slots || slots.length === 0) return null;

  const slot = slots.find((s) => hour >= s.startHour && hour < s.endHour);
  return slot?.location ?? null;
}
