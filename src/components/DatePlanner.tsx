import { useEffect, useState } from "react";
import { Girl } from "@/data/characters";
import {
  DateLocation,
  dateActivitiesByLocation,
  dateLocationInfo,
  dateLocationOrder,
} from "@/data/dates";
import { DayOfWeek, DAYS_OF_WEEK } from "@/data/gameConstants";
import { showGameNotice } from "@/lib/gameUi";

interface Props {
  girl: Girl;
  currentDay: DayOfWeek;
  currentHour: number;
  playerMoney: number;
  onCancel: () => void;
  onScheduleDate: (
    location: DateLocation,
    day: DayOfWeek,
    hour: number,
    activities: string[]
  ) => void;
  darkMode?: boolean;
}

export default function DatePlanner({
  girl,
  currentDay,
  currentHour,
  playerMoney,
  onCancel,
  onScheduleDate,
  darkMode = true,
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState<DateLocation>(
    dateLocationOrder[0],
  );
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(
    getNextDay(currentDay),
  );
  const [selectedHour, setSelectedHour] = useState<number>(18);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const location = dateLocationInfo[selectedLocation];
  const activities = dateActivitiesByLocation[selectedLocation];

  useEffect(() => {
    setSelectedActivities([]);
  }, [selectedLocation]);

  const availableActivities = activities.filter((activity) => {
    if (!activity.requirements) return true;

    if (
      activity.requirements.minAffection &&
      girl.stats.affection < activity.requirements.minAffection
    ) {
      return false;
    }

    if (activity.requirements.minLove && girl.stats.love < activity.requirements.minLove) {
      return false;
    }

    if (activity.requirements.minPlayerStat) {
      const { stat, value } = activity.requirements.minPlayerStat;
      if (stat === "money" && playerMoney < value) {
        return false;
      }
    }

    return true;
  });

  const totalCost = location.cost;
  const canAfford = playerMoney >= totalCost;

  const acceptanceChance = Math.min(
    95,
    Math.max(20, 45 + girl.stats.affection / 2 + girl.stats.love / 2 + girl.stats.lust / 5),
  );

  function getNextDay(day: DayOfWeek): DayOfWeek {
    const idx = DAYS_OF_WEEK.indexOf(day);
    return DAYS_OF_WEEK[(idx + 1) % DAYS_OF_WEEK.length];
  }

  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId],
    );
  };

  const handleSchedule = () => {
    if (!canAfford) {
      showGameNotice(`You need $${totalCost} for this date.`, {
        tone: "warning",
      });
      return;
    }

    if (selectedActivities.length === 0) {
      showGameNotice("Pick at least one activity for the date.", {
        tone: "warning",
      });
      return;
    }

    if (selectedDay === currentDay && selectedHour <= currentHour) {
      showGameNotice("Pick a time later than the current hour.", {
        tone: "warning",
      });
      return;
    }

    onScheduleDate(selectedLocation, selectedDay, selectedHour, selectedActivities);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[2300] p-4 animate-fadeIn">
      <div
        className={`max-w-4xl w-full rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto ${
          darkMode
            ? "bg-gray-900 border-2 border-purple-700"
            : "bg-white border-2 border-purple-300"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-purple-300" : "text-purple-800"
            }`}
          >
            Plan a Date with {girl.name}
          </h2>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
          >
            X
          </button>
        </div>

        <div
          className={`mb-6 p-4 rounded-xl ${
            darkMode ? "bg-purple-900/50" : "bg-purple-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Acceptance Chance
            </span>
            <span
              className={`text-2xl font-bold ${
                acceptanceChance >= 75
                  ? "text-green-500"
                  : acceptanceChance >= 50
                    ? "text-yellow-500"
                    : "text-red-500"
              }`}
            >
              {Math.round(acceptanceChance)}%
            </span>
          </div>
          <div className="mt-2 text-sm opacity-75">
            {acceptanceChance < 50 &&
              "You might want to build a bit more closeness first."}
            {acceptanceChance >= 50 &&
              acceptanceChance < 75 &&
              "Good odds if you keep it thoughtful."}
            {acceptanceChance >= 75 && "Very likely to say yes."}
          </div>
        </div>

        <div className="mb-6">
          <h3
            className={`text-xl font-bold mb-3 ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Choose Location
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dateLocationOrder.map((loc) => {
              const info = dateLocationInfo[loc];
              const selected = selectedLocation === loc;
              const affordable = playerMoney >= info.cost;

              return (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  disabled={!affordable}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selected
                      ? "border-pink-500 bg-pink-100 dark:bg-pink-900/50 scale-105"
                      : affordable
                        ? darkMode
                          ? "border-gray-700 bg-gray-800 hover:border-purple-600"
                          : "border-gray-300 bg-white hover:border-purple-400"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="text-3xl mb-2">{info.icon}</div>
                  <div className="font-bold text-sm">{info.name}</div>
                  <div className="text-xs opacity-75 mt-1">${info.cost}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`mb-6 p-4 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-purple-50"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{location.icon}</span>
            <div>
              <h4
                className={`text-xl font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {location.name}
              </h4>
              <p className="text-sm opacity-75">{location.description}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label
              className={`block mb-2 font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Day
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as DayOfWeek)}
              className={`w-full p-3 rounded-xl border-2 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-300"
              }`}
            >
              {DAYS_OF_WEEK.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block mb-2 font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Time
            </label>
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
              className={`w-full p-3 rounded-xl border-2 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-300"
              }`}
            >
              {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((hourOption) => (
                <option key={hourOption} value={hourOption}>
                  {hourOption > 12 ? hourOption - 12 : hourOption}:00 {hourOption >= 12 ? "PM" : "AM"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <h3
            className={`text-xl font-bold mb-3 ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Choose Activities
          </h3>
          <div className="space-y-2">
            {availableActivities.map((activity) => {
              const selected = selectedActivities.includes(activity.id);

              return (
                <button
                  key={activity.id}
                  onClick={() => toggleActivity(activity.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selected
                      ? "border-pink-500 bg-pink-100 dark:bg-pink-900/50"
                      : darkMode
                        ? "border-gray-700 bg-gray-800 hover:border-purple-600"
                        : "border-gray-300 bg-white hover:border-purple-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <div
                        className={`font-bold ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {activity.name}
                      </div>
                      <div className="text-sm opacity-75">{activity.description}</div>
                    </div>
                    {selected && <span className="text-2xl">?</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {availableActivities.length === 0 && (
            <div
              className={`text-center py-8 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Build more closeness to unlock activities at this location.
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 py-4 rounded-xl font-bold transition-all ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            disabled={!canAfford || selectedActivities.length === 0}
            className={`flex-1 py-4 rounded-xl font-bold transition-all ${
              canAfford && selectedActivities.length > 0
                ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            {!canAfford
              ? `Need $${totalCost}`
              : selectedActivities.length === 0
                ? "Select Activities"
                : `Ask Her Out ($${totalCost})`}
          </button>
        </div>
      </div>
    </div>
  );
}
