import type { DayOfWeek } from "@/data/gameConstants";

export type CalendarMilestoneType = "first_kiss" | "first_date" | "first_sex";

export type CalendarMilestoneEntry = {
  id: string;
  characterName: string;
  type: CalendarMilestoneType;
  dayOfWeek: DayOfWeek;
  dayCount: number;
  hour: number;
  note: string;
};

export type CalendarDateEntry = {
  id: string;
  characterName: string;
  dayOfWeek: DayOfWeek;
  dayCount: number;
  hour: number;
  location: string;
  label: string;
  source: "player" | "npc" | "story";
};

export const getMilestoneLabel = (type: CalendarMilestoneType) => {
  switch (type) {
    case "first_kiss":
      return "First Kiss";
    case "first_date":
      return "First Date";
    case "first_sex":
      return "First Time";
    default:
      return "Milestone";
  }
};

