import { PlayerStats } from "../data/characters";
import {
  locationActivities,
  LocationActivity,
} from "../data/LocationActivities";
import { Dispatch, SetStateAction } from "react";

interface Props {
  location: string;
  player: PlayerStats;
  setPlayer: Dispatch<SetStateAction<PlayerStats>>;
  spendTime: (amount: number) => void;
  darkMode?: boolean;
}

export default function LocationActivities({
  location,
  player,
  setPlayer,
  spendTime,
  darkMode = false,
}: Props) {
  const activities = locationActivities[location] || [];

  const doActivity = (activity: LocationActivity) => {
    // Check requirements
    if (
      activity.requirements?.minEnergy &&
      player.energy < activity.requirements.minEnergy
    ) {
      alert(
        `You need at least ${activity.requirements.minEnergy} energy for this activity!`
      );
      return;
    }

    if (
      activity.requirements?.minMoney &&
      player.money < activity.requirements.minMoney
    ) {
      alert(
        `You need at least $${activity.requirements.minMoney} for this activity!`
      );
      return;
    }

    if (
      activity.requirements?.requiredItem &&
      !player.inventory.includes(activity.requirements.requiredItem)
    ) {
      alert(
        `You need a ${activity.requirements.requiredItem} for this activity!`
      );
      return;
    }

    // Apply stat effects
    const updatedStats = { ...player };
    Object.entries(activity.statEffects).forEach(([key, value]) => {
      const statKey = key as keyof PlayerStats;
      if (statKey !== "inventory" && typeof value === "number") {
        (updatedStats[statKey] as number) += value;
      }
    });

    setPlayer(updatedStats);
    spendTime(activity.timeCost);

    // Show effects
    const effects: string[] = [];
    Object.entries(activity.statEffects).forEach(([key, value]) => {
      if (key !== "inventory" && typeof value === "number" && value !== 0) {
        effects.push(`${key} ${value > 0 ? "+" : ""}${value}`);
      }
    });

    alert(`${activity.name}!\n\n${effects.join("\n")}`);
  };

  const canDoActivity = (activity: LocationActivity): boolean => {
    if (
      activity.requirements?.minEnergy &&
      player.energy < activity.requirements.minEnergy
    ) {
      return false;
    }
    if (
      activity.requirements?.minMoney &&
      player.money < activity.requirements.minMoney
    ) {
      return false;
    }
    if (
      activity.requirements?.requiredItem &&
      !player.inventory.includes(activity.requirements.requiredItem)
    ) {
      return false;
    }
    return true;
  };

  if (activities.length === 0) {
    return null;
  }

  return (
    <div
      className={`rounded-2xl shadow-xl p-6 border-4 sticky top-4 animate-slideUp transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-800 via-purple-900 to-gray-800 border-purple-700"
          : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-purple-200"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🎯</div>
        <h3
          className={`text-2xl font-bold ${
            darkMode ? "text-purple-300" : "text-purple-800"
          }`}
        >
          Activities
        </h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          What would you like to do?
        </p>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {activities.map((activity) => {
          const canDo = canDoActivity(activity);

          return (
            <button
              key={activity.name}
              onClick={() => doActivity(activity)}
              disabled={!canDo}
              className={`
                relative overflow-hidden group w-full p-4 rounded-xl transition-all duration-200
                ${
                  canDo
                    ? `${
                        darkMode
                          ? "bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600"
                          : "bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600"
                      } shadow-lg hover:shadow-xl transform hover:scale-105`
                    : "bg-gray-400 cursor-not-allowed opacity-50"
                }
                text-white
              `}
            >
              <div className="flex items-start gap-3 relative z-10">
                {/* Icon */}
                <span className="text-3xl flex-shrink-0">{activity.icon}</span>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="font-bold text-lg mb-1">{activity.name}</div>
                  <div className="text-sm opacity-90 mb-2">
                    {activity.description}
                  </div>

                  {/* Stats info */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white/20 px-2 py-1 rounded">
                      ⏱️ {activity.timeCost}h
                    </span>
                    {activity.requirements?.minEnergy && (
                      <span
                        className={`px-2 py-1 rounded ${
                          player.energy >= activity.requirements.minEnergy
                            ? "bg-white/20"
                            : "bg-red-500/50"
                        }`}
                      >
                        ⚡ {activity.requirements.minEnergy}
                      </span>
                    )}
                    {activity.requirements?.minMoney && (
                      <span
                        className={`px-2 py-1 rounded ${
                          player.money >= activity.requirements.minMoney
                            ? "bg-white/20"
                            : "bg-red-500/50"
                        }`}
                      >
                        💰 ${activity.requirements.minMoney}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {canDo && (
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tip */}
      <div
        className={`mt-4 rounded-lg p-3 border-2 ${
          darkMode
            ? "bg-gray-900/50 border-purple-700"
            : "bg-white border-purple-200"
        } transition-colors duration-300`}
      >
        <p
          className={`text-xs text-center ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span
            className={`font-semibold ${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`}
          >
            💡
          </span>{" "}
          Activities help you improve stats and pass time!
        </p>
      </div>
    </div>
  );
}
