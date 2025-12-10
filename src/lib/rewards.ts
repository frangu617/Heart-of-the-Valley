import { PlayerStats } from "@/data/characters";
import { CharacterEvent, GameplayFlag } from "@/data/events/types";

type RewardHandlers = {
  onSetFlag?: (flag: GameplayFlag) => void;
  onUnlockCharacter?: (name: string) => void;
};

/**
 * Apply a character event's rewards to the player and optionally trigger side effects.
 */
export function applyCharacterEventRewards(
  player: PlayerStats,
  rewards: CharacterEvent["rewards"] | undefined,
  handlers: RewardHandlers = {}
): PlayerStats {
  if (!rewards) return player;

  const next = { ...player };

  if (typeof rewards.playerMoney === "number") {
    next.money += rewards.playerMoney;
  }

  if (rewards.playerStats) {
    const { intelligence, fitness, style } = rewards.playerStats;
    if (typeof intelligence === "number") next.intelligence += intelligence;
    if (typeof fitness === "number") next.fitness += fitness;
    if (typeof style === "number") next.style += style;
  }

  rewards.setFlags?.forEach((flag) => handlers.onSetFlag?.(flag));
  rewards.unlockCharacters?.forEach((name) =>
    handlers.onUnlockCharacter?.(name)
  );

  return next;
}
