import { PlayerStats } from "../data/characters";
import { Dispatch, SetStateAction } from "react";
import { LocationActivity, locationActivities } from "../data/LocationActivities";
import { DayOfWeek } from "../data/gameConstants";

interface Props {
  location: string;
  player: PlayerStats;
  setPlayer: Dispatch<SetStateAction<PlayerStats>>;
  spendTime: (amount: number) => void;
  darkMode?: boolean;
  dayOfWeek?: DayOfWeek;
}

export default function LocationActivities({
  location,
  player,
  setPlayer,
  spendTime,
  darkMode = false,
  dayOfWeek,
}: Props) {
  const activities = locationActivities[location] || [];

  const performActivity = (activity: LocationActivity) => {
    // Check requirements
    if (activity.requirements) {
      if (
        activity.requirements.minEnergy &&
        player.energy < activity.requirements.minEnergy
      ) {
        alert("Not enough energy!");
        return;
      }
      if (
        activity.requirements.minMoney &&
        player.money < activity.requirements.minMoney
      ) {
        alert("Not enough money!");
        return;
      }
      if (
        activity.requirements.requiredItem &&
        !player.inventory.includes(activity.requirements.requiredItem)
      ) {
        alert(`You need a ${activity.requirements.requiredItem}!`);
        return;
      }
    }

    // Apply stat effects
    const updatedStats = { ...player };
    Object.entries(activity.statEffects).forEach(([key, value]) => {
      const statKey = key as keyof PlayerStats;
      if (statKey !== "inventory" && typeof value === "number") {
        (updatedStats[statKey] as number) = Math.max(
          0,
          Math.min(100, (updatedStats[statKey] as number) + value)
        );
      }
    });

    setPlayer(updatedStats);
    spendTime(activity.timeCost);
    alert(`${activity.name} complete!`);
  };

  if (activities.length === 0) {
    return (
      <div
        className={`rounded-2xl shadow-xl p-6 border-2 ${
          darkMode
            ? "bg-gray-800 border-purple-700"
            : "bg-white border-purple-100"
        } sticky top-4 transition-colors duration-300`}
      >
        <h3
          className={`text-lg font-bold mb-4 ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          📍 Activities
        </h3>
        <p
          className={`text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No activities available here
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl shadow-xl p-6 border-2 ${
        darkMode
          ? "bg-gray-800 border-purple-700"
          : "bg-white border-purple-100"
      } sticky top-4 transition-colors duration-300`}
    >
      <h3
        className={`text-lg font-bold mb-4 ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        📍 Things to Do
      </h3>
      <div className="space-y-2">
        {activities.map((activity, index) => {
          const canAfford =
            !activity.requirements?.minMoney ||
            player.money >= activity.requirements.minMoney;
          const hasEnergy =
            !activity.requirements?.minEnergy ||
            player.energy >= activity.requirements.minEnergy;
          const hasItem =
            !activity.requirements?.requiredItem ||
            player.inventory.includes(activity.requirements.requiredItem);

          const isDisabled = !canAfford || !hasEnergy || !hasItem;

          return (
            <button
              key={index}
              onClick={() => performActivity(activity)}
              disabled={isDisabled}
              className={`
                w-full text-left p-4 rounded-xl transition-all duration-200
                ${
                  isDisabled
                    ? darkMode
                      ? "bg-gray-700 opacity-50 cursor-not-allowed"
                      : "bg-gray-200 opacity-50 cursor-not-allowed"
                    : darkMode
                    ? "bg-gradient-to-r from-purple-900/50 to-pink-900/50 hover:from-purple-800/70 hover:to-pink-800/70 border-2 border-purple-700"
                    : "bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-purple-200"
                }
                ${
                  !isDisabled &&
                  "transform hover:scale-102 shadow-md hover:shadow-lg"
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activity.icon}</span>
                  <span
                    className={`font-bold ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {activity.name}
                  </span>
                </div>
                <span
                  className={`text-sm ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  {activity.timeCost}h
                </span>
              </div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {activity.description}
              </p>

              {/* Requirements display */}
              {activity.requirements && (
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {activity.requirements.minEnergy && (
                    <span
                      className={`px-2 py-1 rounded ${
                        hasEnergy
                          ? darkMode
                            ? "bg-green-900/50 text-green-300"
                            : "bg-green-100 text-green-700"
                          : darkMode
                          ? "bg-red-900/50 text-red-300"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      ⚡ {activity.requirements.minEnergy}
                    </span>
                  )}
                  {activity.requirements.minMoney && (
                    <span
                      className={`px-2 py-1 rounded ${
                        canAfford
                          ? darkMode
                            ? "bg-green-900/50 text-green-300"
                            : "bg-green-100 text-green-700"
                          : darkMode
                          ? "bg-red-900/50 text-red-300"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      💰 ${activity.requirements.minMoney}
                    </span>
                  )}
                  {activity.requirements.requiredItem && (
                    <span
                      className={`px-2 py-1 rounded ${
                        hasItem
                          ? darkMode
                            ? "bg-green-900/50 text-green-300"
                            : "bg-green-100 text-green-700"
                          : darkMode
                          ? "bg-red-900/50 text-red-300"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      🎁 {activity.requirements.requiredItem}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
