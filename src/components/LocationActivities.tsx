import React from "react";
import { PlayerStats } from "../data/characters";
import { DayOfWeek } from "../data/gameConstants";
import {
  locationActivities as activitiesMap,
  LocationActivity as ImportedActivity,
} from "../data/LocationActivities";

export type LocationActivity = {
  id?: string;
  name: string;
  desc?: string;
  timeCost?: number;
  icon?: string;
  perform?: (player: PlayerStats, ctx: { dayOfWeek: DayOfWeek }) => PlayerStats;
};

type Props = {
  location: string;
  player: PlayerStats;
  setPlayer: (next: PlayerStats) => void;
  spendTime: (amount: number) => void;
  darkMode?: boolean;
  dayOfWeek: DayOfWeek;
};

export default function LocationActivitiesPanel({
  location,
  player,
  setPlayer,
  spendTime,
  darkMode,
  dayOfWeek,
}: Props) {
  const activities: LocationActivity[] = activitiesMap[location] ?? [];

  if (!activities || activities.length === 0) {
    return (
      <div
        className={`rounded-2xl shadow-xl p-4 border-2 ${
          darkMode
            ? "bg-gray-800 border-purple-700"
            : "bg-white border-purple-100"
        }`}
      >
        <h3
          className={`text-xl font-bold mb-2 ${
            darkMode ? "text-purple-300" : "text-purple-800"
          }`}
        >
          🎯 Activities
        </h3>
        <p className="opacity-70 text-sm">No activities available here.</p>
      </div>
    );
  }

  const doActivity = (act: LocationActivity) => {
    const fullActivity = activitiesMap[location]?.find(
      (a: ImportedActivity) => a.name === act.name
    ) as ImportedActivity | undefined;

    // Check requirements
    if (fullActivity?.requirements) {
      const { minEnergy, minMoney, requiredItem } = fullActivity.requirements;

      if (minEnergy && player.energy < minEnergy) {
        alert(`You need at least ${minEnergy} energy for this activity!`);
        return;
      }

      if (minMoney && player.money < minMoney) {
        alert(`You need at least $${minMoney} for this activity!`);
        return;
      }

      if (requiredItem && !player.inventory.includes(requiredItem)) {
        alert(`You need a ${requiredItem} for this activity!`);
        return;
      }
    }

    let next: PlayerStats;

    if (typeof act.perform === "function") {
      next = act.perform(player, { dayOfWeek });
    } else if (fullActivity?.statEffects) {
      next = { ...player };

      Object.entries(fullActivity.statEffects).forEach(([key, value]) => {
        const statKey = key as keyof PlayerStats;

        if (statKey === "inventory") {
          return;
        }

        if (typeof value === "number" && typeof next[statKey] === "number") {
          const currentValue = next[statKey] as number;
          const newValue = currentValue + value;

          if (
            statKey === "energy" ||
            statKey === "mood" ||
            statKey === "hunger"
          ) {
            (next[statKey] as number) = Math.max(0, Math.min(100, newValue));
          } else if (statKey === "money") {
            (next[statKey] as number) = Math.max(0, newValue);
          } else {
            (next[statKey] as number) = Math.max(0, newValue);
          }
        }
      });
    } else {
      next = {
        ...player,
        energy: Math.max(0, player.energy - (act.timeCost ?? 1) * 5),
      };
    }

    setPlayer(next);
    spendTime(act.timeCost ?? 1);

    showActivityFeedback(fullActivity);
  };

  const showActivityFeedback = (activity: ImportedActivity | undefined) => {
    if (!activity?.statEffects) return;

    const changes: string[] = [];

    if (
      activity.statEffects.intelligence &&
      activity.statEffects.intelligence > 0
    ) {
      changes.push(`🧠 +${activity.statEffects.intelligence} Intelligence`);
    }
    if (activity.statEffects.fitness && activity.statEffects.fitness > 0) {
      changes.push(`🏋️ +${activity.statEffects.fitness} Fitness`);
    }
    if (activity.statEffects.style && activity.statEffects.style > 0) {
      changes.push(`💅 +${activity.statEffects.style} Style`);
    }
    if (activity.statEffects.money && activity.statEffects.money > 0) {
      changes.push(`💰 +$${activity.statEffects.money}`);
    }
    if (activity.statEffects.money && activity.statEffects.money < 0) {
      changes.push(`💸 -$${Math.abs(activity.statEffects.money)}`);
    }

    if (changes.length > 0) {
      console.log(`✅ ${activity.name} completed!`, changes.join(", "));
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-xl p-4 border-2 ${
        darkMode
          ? "bg-gray-800 border-purple-700"
          : "bg-white border-purple-100"
      } transition-colors duration-300`}
    >
      <h3
        className={`text-xl font-bold mb-3 ${
          darkMode ? "text-purple-300" : "text-purple-800"
        }`}
      >
        🎯 Activities
      </h3>

      <div className="grid grid-cols-1 gap-2">
        {activities.map((act) => {
          const fullActivity = activitiesMap[location]?.find(
            (a: ImportedActivity) => a.name === act.name
          ) as ImportedActivity | undefined;

          const isDisabled =
            fullActivity?.requirements &&
            ((fullActivity.requirements.minEnergy &&
              player.energy < fullActivity.requirements.minEnergy) ||
              (fullActivity.requirements.minMoney &&
                player.money < fullActivity.requirements.minMoney) ||
              (fullActivity.requirements.requiredItem &&
                !player.inventory.includes(
                  fullActivity.requirements.requiredItem
                )));

          return (
            <button
              key={act.id ?? act.name}
              onClick={() => doActivity(act)}
              disabled={!!isDisabled}
              className={`w-full text-left px-3 py-2 rounded-xl border transition ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-700 hover:bg-gray-600 border-purple-700 transform hover:scale-102"
                  : "bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200 transform hover:scale-102"
              }`}
              title={act.desc ?? ""}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {act.icon ? <span className="mr-2">{act.icon}</span> : null}
                  {act.name}
                </span>
                <div className="flex items-center gap-2">
                  {fullActivity?.statEffects && (
                    <div className="flex gap-1 text-xs">
                      {fullActivity.statEffects.intelligence &&
                        fullActivity.statEffects.intelligence > 0 && (
                          <span className="text-blue-500">
                            🧠+{fullActivity.statEffects.intelligence}
                          </span>
                        )}
                      {fullActivity.statEffects.fitness &&
                        fullActivity.statEffects.fitness > 0 && (
                          <span className="text-green-500">
                            🏋️+{fullActivity.statEffects.fitness}
                          </span>
                        )}
                      {fullActivity.statEffects.style &&
                        fullActivity.statEffects.style > 0 && (
                          <span className="text-pink-500">
                            💅+{fullActivity.statEffects.style}
                          </span>
                        )}
                      {fullActivity.statEffects.money &&
                        fullActivity.statEffects.money > 0 && (
                          <span className="text-yellow-600">
                            💰+${fullActivity.statEffects.money}
                          </span>
                        )}
                      {fullActivity.statEffects.money &&
                        fullActivity.statEffects.money < 0 && (
                          <span className="text-red-500">
                            💸${Math.abs(fullActivity.statEffects.money)}
                          </span>
                        )}
                    </div>
                  )}
                  {act.timeCost ? (
                    <span className="text-xs opacity-70">{act.timeCost}h</span>
                  ) : null}
                </div>
              </div>
              {act.desc && (
                <div className="text-xs opacity-70 mt-0.5">{act.desc}</div>
              )}
              {isDisabled && fullActivity?.requirements && (
                <div className="text-xs text-red-500 mt-1">
                  {fullActivity.requirements.minEnergy &&
                    player.energy < fullActivity.requirements.minEnergy &&
                    `⚡ Need ${fullActivity.requirements.minEnergy} energy`}
                  {fullActivity.requirements.minMoney &&
                    player.money < fullActivity.requirements.minMoney &&
                    `💰 Need $${fullActivity.requirements.minMoney}`}
                  {fullActivity.requirements.requiredItem &&
                    !player.inventory.includes(
                      fullActivity.requirements.requiredItem
                    ) &&
                    `📦 Need ${fullActivity.requirements.requiredItem}`}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
