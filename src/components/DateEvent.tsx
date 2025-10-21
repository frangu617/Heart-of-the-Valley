import { useState } from "react";
import { Girl, PlayerStats } from "@/data/characters";
import { DateActivity, DateOutcome } from "@/data/dates/types";
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
}

export default function DateEvent({
  girl,
  location,
  activities,
  player,
  onComplete,
  darkMode,
}: Props) {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [showingOutcome, setShowingOutcome] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<DateOutcome | null>(
    null
  );
  const [accumulatedGirlStats, setAccumulatedGirlStats] = useState
    Partial<Girl["stats"]>
  >({});
  const [accumulatedPlayerStats, setAccumulatedPlayerStats] = useState
    Partial<PlayerStats>
  >({});
  const [totalCost, setTotalCost] = useState(0);

  const allActivities = dateActivitiesByLocation[location as keyof typeof dateActivitiesByLocation];
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
      if (c.minAffection && girl.stats.affection < c.minAffection)
        return false;
      if (c.minMood && girl.stats.mood < c.minMood) return false;
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

    // Weighted random selection
    const totalWeight = eligibleOutcomes.reduce(
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
    const newGirlStats = { ...accumulatedGirlStats };
    const newPlayerStats = { ...accumulatedPlayerStats };

    if (selectedOutcome.effects.girlStats) {
      Object.entries(selectedOutcome.effects.girlStats).forEach(
        ([key, value]) => {
          newGirlStats[key as keyof Girl["stats"]] =
            ((newGirlStats[key as keyof Girl["stats"]] as number) || 0) +
            (value as number);
        }
      );
    }

    if (selectedOutcome.effects.playerStats) {
      Object.entries(selectedOutcome.effects.playerStats).forEach(
        ([key, value]) => {
          newPlayerStats[key as keyof PlayerStats] =
            ((newPlayerStats[key as keyof PlayerStats] as number) || 0) +
            (value as number);
        }
      );
    }

    const newCost = totalCost + (selectedOutcome.effects.playerMoney || 0);

    setAccumulatedGirlStats(newGirlStats);
    setAccumulatedPlayerStats(newPlayerStats);
    setTotalCost(newCost);

    // Move to next activity or complete date
    if (currentActivityIndex < activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
      setShowingOutcome(false);
      setSelectedOutcome(null);
    } else {
      // Date complete!
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
      characterImage={`/images/characters/${girl.name.toLowerCase()}/faces/happy.png`}
      isMobile={false}
      locationImage={`/images/locations/${location.toLowerCase()}/afternoon.png`}
    />
  );
}