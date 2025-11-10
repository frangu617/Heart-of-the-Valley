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
  gradient: string;
};

export const girls: Girl[] = [
  {
    name: "Iris",
    location: "Cafe",
    relationship: "Single",
    personality: "Shy",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
    gradient: "from-pink-300 via-rose-400 to-red-500",
  },
  {
    name: "Dawn",
    location: "Gym",
    relationship: "Single",
    personality: "Confident",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
    gradient: "from-yellow-200 via-orange-300 to-amber-400",
  },
  {
    name: "Ruby",
    location: "Mall",
    relationship: "Single",
    personality: "Jealous",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
    gradient: "from-red-200 via-orange-300 to-yellow-400",
  },
  {
    name: "Yumi",
    location: "Kitchen",
    relationship: "Single",
    personality: "Independent",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
    gradient: "from-teal-200 via-cyan-300 to-sky-400",
  },
  {
    name: "Gwen",
    location: "Living Room",
    relationship: "Single",
    personality: "Bold",
    stats: { affection: 0, lust: 0, mood: 50, trust: 0, love: 0 },
    gradient: "from-green-200 via-lime-300 to-emerald-400",
  },
];
