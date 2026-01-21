export type PlayerStats = {
  name: string;
  energy: number;
  mood: number;
  hunger: number;
  fitness: number;
  intelligence: number;
  style: number;
  money: number;
  inventory: string[];
};

export const defaultPlayerStats: PlayerStats = {
  name: "You",
  energy: 100,
  mood: 50,
  hunger: 50,
  fitness: 10,
  intelligence: 10,
  style: 10,
  money: 100,
  inventory: [],
};

export type GirlStats = {
  affection: number;
  lust: number;
  mood: number;
  trust: number;
  love: number;
};

export type Girl = {
  name: string;
  stats: GirlStats;
  location: string;
  relationship: "Single" | "DatingMC" | "DatingJohn" | "DatingRick";
  personality: string;
};

export const girls: Girl[] = [
  {
    name: "Iris",
    location: "Cafe",
    relationship: "Single",
    personality: "Shy",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
  },
  {
    name: "Dawn",
    location: "Gym",
    relationship: "Single",
    personality: "Confident",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
  },
  {
    name: "Ruby",
    location: "Mall",
    relationship: "Single",
    personality: "Jealous",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
  },
  {
    name: "Yumi",
    location: "Yumi's Bedroom",
    relationship: "Single",
    personality: "Independent",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
  },
  {
    name: "Gwen",
    location: "Gwen's Bedroom",
    relationship: "Single",
    personality: "Bold",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
  },
];
