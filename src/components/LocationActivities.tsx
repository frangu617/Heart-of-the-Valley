import React from "react";
import { PlayerStats } from "../data/characters";
import { DayOfWeek } from "../data/gameConstants";

// ⬇️ Choose the ONE import that matches where your data map actually lives.
// If your map is in /data:
import { locationActivities as activitiesMap } from "../data/LocationActivities";
// If your map is in /components (comment the line above and uncomment below):
// import { LocationActivities as activitiesMap } from "../components/LocationActivities";

export type LocationActivity = {
  id?: string;
  name: string;
  desc?: string;
  timeCost?: number; // hours it consumes
  icon?: string; // emoji/icon
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
  // support both naming styles: LocationActivities / locationActivities
  const activities: LocationActivity[] =
    (activitiesMap as any)[location] ?? activitiesMap?.[location] ?? [];

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
    const next =
      typeof act.perform === "function"
        ? act.perform(player, { dayOfWeek })
        : {
            ...player,
            // reasonable default: minor energy cost per hour of activity
            energy: Math.max(0, player.energy - (act.timeCost ?? 1) * 5),
          };
    setPlayer(next);
    spendTime(act.timeCost ?? 1);
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
        {activities.map((act) => (
          <button
            key={act.id ?? act.name}
            onClick={() => doActivity(act)}
            className={`w-full text-left px-3 py-2 rounded-xl border transition ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 border-purple-700"
                : "bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200"
            }`}
            title={act.desc ?? ""}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                {act.icon ? <span className="mr-2">{act.icon}</span> : null}
                {act.name}
              </span>
              {act.timeCost ? (
                <span className="text-xs opacity-70">{act.timeCost}h</span>
              ) : null}
            </div>
            {act.desc && (
              <div className="text-xs opacity-70 mt-0.5">{act.desc}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
