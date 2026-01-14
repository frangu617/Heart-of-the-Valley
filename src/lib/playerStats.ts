import { PlayerStats } from "@/data/characters";

const CLAMPED_STATS: Array<keyof PlayerStats> = ["energy", "mood", "hunger"];

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

    const updated = current + value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (next as any)[statKey] = CLAMPED_STATS.includes(statKey)
      ? Math.max(0, Math.min(100, updated))
      : Math.max(0, updated);
  });

  return next;
}
