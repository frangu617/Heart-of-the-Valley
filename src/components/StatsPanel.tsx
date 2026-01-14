import { getTimeOfDay } from "@/lib/time";
import { PlayerStats } from "../data/characters";
import { DayOfWeek } from "../data/gameConstants";

interface Props {
  stats: PlayerStats;
  hour: number;
  dayOfWeek: DayOfWeek;
  darkMode?: boolean;
  onSave?: () => void;
}

export default function StatsPanel({
  stats,
  hour,
  dayOfWeek,
  darkMode = true,
  onSave,
}: Props) {
  const timeOfDay = getTimeOfDay(hour);
  const timeOfDayLabel =
    timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1);

  const getStatColor = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const StatBar = ({
    label,
    value,
    icon,
    max = 100,
  }: {
    label: string;
    value: number;
    icon: string;
    max?: number;
  }) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span
          className={`text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {icon} {label}
        </span>
        <span
          className={`text-sm font-bold ${
            darkMode ? "text-purple-400" : "text-purple-600"
          }`}
        >
          {value}
        </span>
      </div>
      <div
        className={`w-full rounded-full h-2 overflow-hidden ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${getStatColor(
            value,
            max
          )}`}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div
      className={`rounded-2xl shadow-xl p-6 space-y-4 border-2 sticky top-4 transition-colors duration-300 min-w-[180px] min-h-[600px] max-h-[calc(100vh-2rem)] overflow-y-auto ${
        darkMode
          ? "bg-gray-800 border-purple-700"
          : "bg-white border-purple-100"
      }`}
    >
      {/* Time Display */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white text-center">
        <div className="text-sm font-semibold mb-1">{dayOfWeek}</div>
        <div className="text-3xl font-bold">{hour}:00</div>
        <div className="text-sm opacity-90">{timeOfDayLabel}</div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <h3
          className={`text-lg font-bold border-b-2 pb-2 ${
            darkMode
              ? "text-gray-200 border-purple-700"
              : "text-gray-800 border-purple-200"
          }`}
        >
          Your Stats
        </h3>

        <StatBar label="Energy" value={stats.energy} icon="⚡" />
        <StatBar label="Mood" value={stats.mood} icon="😊" />
        <StatBar label="Hunger" value={stats.hunger} icon="🍔" />
        <StatBar label="Fitness" value={stats.fitness} icon="🏋️" max={50} />
        <StatBar
          label="Intelligence"
          value={stats.intelligence}
          icon="🧠"
          max={50}
        />
        <StatBar label="Style" value={stats.style} icon="💅" max={50} />
      </div>

      {/* Money */}
      <div
        className={`rounded-xl p-4 border-2 ${
          darkMode
            ? "bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 border-yellow-700"
            : "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300"
        } transition-colors duration-300`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-lg font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            💰 Money
          </span>
          <span
            className={`text-2xl font-bold ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            ${stats.money}
          </span>
        </div>
      </div>

      {/* Inventory */}
      {stats.inventory.length > 0 && (
        <div
          className={`rounded-xl p-4 border-2 ${
            darkMode
              ? "bg-purple-900/50 border-purple-700"
              : "bg-purple-50 border-purple-200"
          } transition-colors duration-300`}
        >
          <h4
            className={`font-semibold mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            🎒 Inventory
          </h4>
          <div className="flex flex-wrap gap-2">
            {stats.inventory.map((item, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-sm border ${
                  darkMode
                    ? "bg-gray-700 border-purple-600 text-gray-200"
                    : "bg-white border-purple-300 text-gray-800"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Save Button */}
      {onSave && (
        <button
          onClick={onSave}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          💾 Quick Save
        </button>
      )}
    </div>
  );
}
