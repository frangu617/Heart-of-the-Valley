export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

export const getNextDay = (currentDay: DayOfWeek): DayOfWeek => {
  const currentIndex = DAYS_OF_WEEK.indexOf(currentDay);
  const nextIndex = (currentIndex + 1) % DAYS_OF_WEEK.length;
  return DAYS_OF_WEEK[nextIndex];
};

export const MAX_HOUR = 24;
export const START_HOUR = 8;
export const START_DAY: DayOfWeek = "Monday";
