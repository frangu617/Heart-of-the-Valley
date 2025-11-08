import { Dialogue } from "../dialogues";
import { GirlStats, PlayerStats } from "../characters";

export type DateLocation =
  | "Cafe"
  | "Beach"
  | "Mall"
  | "City"
  | "Restaurant"
  | "Movies"
  | "Park"
  | "Strip Club"
  | "Gym"
  | "Living Room";

export type DateActivity = {
  id: string;
  name: string;
  description: string;
  icon: string;

  // Requirements to unlock this activity
  requirements?: {
    minAffection?: number;
    minTrust?: number;
    minLove?: number;
    minPlayerStat?: {
      stat: keyof PlayerStats;
      value: number;
    };
  };

  // Possible outcomes based on stats
  outcomes: DateOutcome[];
};

export type DateOutcome = {
  id: string;

  // Conditions for this outcome
  conditions?: {
    minAffection?: number;
    minMood?: number;
    minPlayerIntelligence?: number;
    minPlayerStyle?: number;
    minPlayerFitness?: number;
  };

  // Probability weight (higher = more likely if conditions met)
  weight: number;

  // What happens
  dialogue: Dialogue;

  // Stat changes
  effects: {
    girlStats?: Partial<GirlStats>;
    playerStats?: Partial<PlayerStats>;
    playerMoney?: number;
  };
};

export type DatePlan = {
  id: string;
  characterName: string;
  location: DateLocation;
  scheduledDay: string;
  scheduledHour: number;
  activities: string[]; // activity IDs
  cost: number;
  status: "pending" | "accepted" | "rejected" | "completed";
};
