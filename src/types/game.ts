// Core game enums & shapes shared across scenes and stores

export type GameState =
  | "mainMenu"
  | "intro"
  | "playing"
  | "paused"
  | "dialogue";

export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type TimeState = {
  dayIndex: number; // 0-6, use with DayOfWeek if you want mapping
  hour: number; // 0-23
};

export type LocationKey =
  | "apartment"
  | "library"
  | "bar"
  | "university"
  | "gym"
  | "street"
  | "diner"; // extend as needed

export type RouteKey = "iris" | "lenore" | "riven" | null;

export type PlayerStats = {
  money: number;
  energy: number; // we'll add the system later, but it’s handy to have here now
  charm: number;
  intelligence: number;
  strength: number;
};

export type Relationships = {
  // Keep flexible—real project likely tracks affection/trust per character
  affection: Record<string, number>;
  trust: Record<string, number>;
};
