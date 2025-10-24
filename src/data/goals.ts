export type GoalReward = {
  money?: number;
  energy?: number;
  flags?: string[];
};

export type DailyGoal = {
  id: string;
  text: string;
  // simple predicate; you can expand later (location, timeOfDay, etc.)
  // today it's just cosmetic; completion will be manual via UI or calls
  reward: GoalReward;
};

export const GOAL_POOL: DailyGoal[] = [
  { id: "earn_100", text: "Earn $100 today", reward: { energy: 5 } },
  { id: "workout_once", text: "Train at the gym once", reward: { money: 20 } },
  {
    id: "talk_to_someone",
    text: "Have a meaningful conversation",
    reward: { energy: 10 },
  },
];
