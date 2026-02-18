import { PlayerStats } from "@/data/characters";

export const STARVING_HUNGER_THRESHOLD = 100;

const CLAMPED_STATS: Array<keyof PlayerStats> = [
  "energy",
  "mood",
  "hunger",
  "hygiene",
  "sobriety",
];

export const derivePlayerMood = (energy: number, hunger: number) =>
  Math.round((energy + (100 - hunger)) / 2);

export const withDerivedMood = (player: PlayerStats): PlayerStats => ({
  ...player,
  mood: derivePlayerMood(player.energy, player.hunger),
});

const getEnergyExertionMultiplier = (hunger: number) => {
  if (hunger >= 75) return 1.5;
  if (hunger >= 50) return 1.25;
  return 1;
};

export function applyPlayerStatDelta(
  player: PlayerStats,
  deltas: Partial<PlayerStats>
): PlayerStats {
  const next = { ...player };

  Object.entries(deltas).forEach(([key, value]) => {
    if (typeof value !== "number") return;

    const statKey = key as keyof PlayerStats;
    const current = next[statKey];
    if (typeof current !== "number") return;

    let adjustedValue = value;
    if (statKey === "energy" && value < 0) {
      adjustedValue = Math.floor(
        value * getEnergyExertionMultiplier(player.hunger)
      );
    }
    const updated = current + adjustedValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (next as any)[statKey] = CLAMPED_STATS.includes(statKey)
      ? Math.max(0, Math.min(100, updated))
      : Math.max(0, updated);
  });

  return withDerivedMood(next);
}
