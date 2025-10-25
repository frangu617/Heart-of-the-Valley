import { useState } from "react";
import { Girl, PlayerStats, GirlStats } from "@/data/characters";
import { DateOutcome } from "@/data/dates/types";
import { dateActivitiesByLocation } from "@/data/dates/activities";
import DialogueBox from "./DialogueBox";

interface Props {
  girl: Girl;
  location: string;
  activities: string[];
  player: PlayerStats;
  onComplete: (
    girlStatChanges: Partial<Girl["stats"]>,
    playerStatChanges: Partial<PlayerStats>,
    moneyCost: number
  ) => void;
  darkMode?: boolean;
  characterImage?: string;
  onSkip?: () => void;
  onNextDialogueId?: (id: string) => void;

  // ✅ New/extended fields used by page.tsx
  isMobile?: boolean;
  locationImage?: string;
  currentLocation?: string;
  currentHour?: number;
  // You can use string, or import DayOfWeek and use `DayOfWeek` — page.tsx passes a DayOfWeek
  currentDay?: string;
  playerStats?: PlayerStats;
  girlStats?: Partial<GirlStats>;
}

export default function DateEvent({
  girl,
  location,
  activities,
  player,
  onComplete,
  darkMode,
}: Props) {
  // ✅ Explicit generics on the same line
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [showingOutcome, setShowingOutcome] = useState<boolean>(false);
  const [selectedOutcome, setSelectedOutcome] = useState<DateOutcome | null>(
    null
  );
  const [accumulatedGirlStats, setAccumulatedGirlStats] = useState<
    Partial<Girl["stats"]>
  >({});
  const [accumulatedPlayerStats, setAccumulatedPlayerStats] = useState<
    Partial<PlayerStats>
  >({});
  const [totalCost, setTotalCost] = useState<number>(0);

  // Resolve activities for this location
  const allActivities =
    dateActivitiesByLocation[
      location as keyof typeof dateActivitiesByLocation
    ] ?? [];

  const currentActivity = allActivities.find(
    (a) => a.id === activities[currentActivityIndex]
  );

  if (!currentActivity) {
    return <div>Error: Activity not found</div>;
  }

  // Select outcome based on conditions and weight
  if (!showingOutcome && !selectedOutcome) {
    const eligibleOutcomes = currentActivity.outcomes.filter((outcome) => {
      if (!outcome.conditions) return true;

      const c = outcome.conditions;
      if (c.minAffection && (girl.stats.affection ?? 0) < c.minAffection)
        return false;
      if (c.minMood && (girl.stats.mood ?? 0) < c.minMood) return false;
      if (
        c.minPlayerIntelligence &&
        player.intelligence < c.minPlayerIntelligence
      )
        return false;
      if (c.minPlayerStyle && player.style < c.minPlayerStyle) return false;
      if (c.minPlayerFitness && player.fitness < c.minPlayerFitness)
        return false;

      return true;
    });

    if (eligibleOutcomes.length === 0) {
      return <div>No eligible outcomes for this activity.</div>;
    }

    const totalWeight: number = eligibleOutcomes.reduce(
      (sum, o) => sum + o.weight,
      0
    );
    let roll = Math.random() * totalWeight;

    let chosen = eligibleOutcomes[0];
    for (const outcome of eligibleOutcomes) {
      roll -= outcome.weight;
      if (roll <= 0) {
        chosen = outcome;
        break;
      }
    }

    setSelectedOutcome(chosen);
    setShowingOutcome(true);
  }

  const handleOutcomeComplete = () => {
    if (!selectedOutcome) return;

    // Accumulate stats
    const newGirlStats: Partial<Girl["stats"]> = { ...accumulatedGirlStats };
    const newPlayerStats: Partial<PlayerStats> = { ...accumulatedPlayerStats };

    if (selectedOutcome.effects.girlStats) {
      Object.entries(selectedOutcome.effects.girlStats).forEach(
        ([key, value]) => {
          const k = key as keyof Girl["stats"];
          const cur = (newGirlStats[k] as number) ?? 0;
          newGirlStats[k] = cur + (value as number);
        }
      );
    }

    if (selectedOutcome.effects.playerStats) {
      Object.entries(selectedOutcome.effects.playerStats).forEach(
        ([key, value]) => {
          const k = key as keyof PlayerStats;
          // Only update if both current value and new value are numbers (skip inventory)
          if (
            typeof value === "number" &&
            typeof newPlayerStats[k] === "number"
          ) {
            const cur = (newPlayerStats[k] as number) ?? 0;
            (newPlayerStats[k] as number) = cur + value;
          }
        }
      );
    }

    const newCost = totalCost + (selectedOutcome.effects.playerMoney || 0);

    setAccumulatedGirlStats(newGirlStats);
    setAccumulatedPlayerStats(newPlayerStats);
    setTotalCost(newCost);

    // Next activity or complete
    if (currentActivityIndex < activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
      setShowingOutcome(false);
      setSelectedOutcome(null);
    } else {
      onComplete(newGirlStats, newPlayerStats, newCost);
    }
  };

  if (!selectedOutcome) {
    return <div>Loading...</div>;
  }

  // Replace {Girl} placeholder in dialogue with actual name
  const dialogue = {
    ...selectedOutcome.dialogue,
    lines: selectedOutcome.dialogue.lines.map((line) => ({
      ...line,
      speaker:
        line.speaker === "Girl"
          ? girl.name
          : line.speaker === "You"
          ? "You"
          : line.speaker,
    })),
  };

  return (
    <DialogueBox
      dialogue={dialogue}
      onComplete={handleOutcomeComplete}
      darkMode={darkMode}
      // characterImage={`/images/characters/${girl.name.toLowerCase()}/faces/happy.webp`}
      // isMobile={false}
      // locationImage={`/images/locations/${location.toLowerCase()}/afternoon.png`}
    />
  );
}
