import { useState } from "react";
import { PlayerStats, type GirlStats } from "../data/characters";
import { DayOfWeek } from "../data/gameConstants";
import {
  locationActivities as activitiesMap,
  LocationActivity,
} from "../data/locations";
import { GameplayFlag } from "@/data/events/types";
import { applyPlayerStatDelta } from "@/lib/playerStats";
import GiftModal from "./GiftModal";
import { Gift, gifts } from "@/data/gifts";
import { getScheduledLocation } from "@/lib/schedule";

type Activity = LocationActivity & {
  id?: string;
  desc?: string;
  perform?: (player: PlayerStats, ctx: { dayOfWeek: DayOfWeek }) => PlayerStats;
};

type RequirementFailure = {
  alert: string;
  inline: string;
};

export type DailyWorkoutState = {
  day: DayOfWeek;
  total: number;
  withRuby: number;
  withoutRuby: number;
};

type Props = {
  location: string;
  player: PlayerStats;
  setPlayer: (next: PlayerStats) => void;
  spendTime: (amount: number) => void;
  darkMode?: boolean;
  dayOfWeek: DayOfWeek;
  hour: number;
  onSetFlag?: (flag: GameplayFlag) => void;
  onTriggerEvent?: (characterName: string, eventId: string) => void;
  gameplayFlags?: Set<GameplayFlag>;
  dailyWorkoutState?: DailyWorkoutState;
  onLogWorkout?: (withRuby: boolean) => void;
  onAdjustGirlStats?: (girlName: string, delta: Partial<GirlStats>) => void;
};

export default function LocationActivitiesPanel({
  location,
  player,
  setPlayer,
  spendTime,
  darkMode,
  dayOfWeek,
  hour,
  onSetFlag,
  onTriggerEvent,
  gameplayFlags,
  dailyWorkoutState,
  onLogWorkout,
  onAdjustGirlStats,
}: Props) {
  const baseActivities: Activity[] = activitiesMap[location] ?? [];
  const [showGiftShop, setShowGiftShop] = useState(false);
  const giftStoreTimeCost =
    baseActivities.find((act) => act.name === "Gift Store")?.timeCost ?? 1;
  const giftStoreEntries = gifts.map((gift) => ({ gift, count: 0 }));

  const activities = [...baseActivities];

  const rubyAtGym =
    getScheduledLocation("Ruby", dayOfWeek, hour) === "Gym" &&
    !gameplayFlags?.has("rubyIsHiding");
  const rubyUnlocked = gameplayFlags?.has("hasMetRuby") ?? false;
  const rubyAvailableForWorkout = rubyUnlocked && rubyAtGym;
  const workoutActivityNames = new Set(["Workout", "Light Exercise"]);

  const isWorkoutActivity = (activity: Activity) =>
    location === "Gym" && workoutActivityNames.has(activity.name);

  const isRubyUnlockActivity = (activity: Activity) => isWorkoutActivity(activity);

  const isRubyWorkoutActivity = (activity: Activity) =>
    isWorkoutActivity(activity) && rubyAvailableForWorkout;

  const isYumiUnlockActivity = (activity: Activity) =>
    location === "Classroom" && activity.name === "Teach Class";

  const getWorkoutLimitFailure = (
    activity: Activity
  ): RequirementFailure | null => {
    if (!dailyWorkoutState || !isWorkoutActivity(activity)) return null;

    const isToday = dailyWorkoutState.day === dayOfWeek;
    const total = isToday ? dailyWorkoutState.total : 0;
    const withRuby = isToday ? dailyWorkoutState.withRuby : 0;
    const withoutRuby = isToday ? dailyWorkoutState.withoutRuby : 0;

    if (!rubyAvailableForWorkout) {
      if (total >= 1) {
        return {
          alert: "You already worked out today.",
          inline: "Workout limit reached",
        };
      }
      return null;
    }

    if (total === 0) return null;

    const bonusAvailable = withoutRuby > 0 && withRuby === 0 && total === 1;
    if (bonusAvailable) return null;

    return {
      alert: "You've already maxed out your workouts for today.",
      inline: "Workout limit reached",
    };
  };

  const getActivityLabel = (activity: Activity) => {
    if (!isRubyWorkoutActivity(activity)) return activity.name;
    if (activity.name.includes("with Ruby")) return activity.name;
    return `${activity.name} with Ruby`;
  };

  const getRequirementFailures = (activity: Activity): RequirementFailure[] => {
    const failures: RequirementFailure[] = [];
    const requirements = activity.requirements;

    const workoutFailure = getWorkoutLimitFailure(activity);
    if (workoutFailure) {
      failures.push(workoutFailure);
    }

    if (!requirements) return failures;

    const { minEnergy, minMoney, requiredItem } = requirements;

    if (minEnergy && player.energy < minEnergy) {
      failures.push({
        alert: `You need at least ${minEnergy} energy for this activity!`,
        inline: `⚡ Need ${minEnergy} energy`,
      });
    }

    if (minMoney && player.money < minMoney) {
      failures.push({
        alert: `You need at least $${minMoney} for this activity!`,
        inline: `💰 Need $${minMoney}`,
      });
    }

    if (requiredItem && !player.inventory.includes(requiredItem)) {
      failures.push({
        alert: `You need a ${requiredItem} for this activity!`,
        inline: `📦 Need ${requiredItem}`,
      });
    }

    if (
      location === "Car Store" &&
      activity.name === "Buy Car" &&
      gameplayFlags?.has("hasCar")
    ) {
      failures.push({
        alert: "You already own a car.",
        inline: "Already own a car",
      });
    }

    return failures;
  };

  if (activities.length === 0) {
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

  const doActivity = (act: Activity) => {
    if (location === "Mall" && act.name === "Gift Store") {
      setShowGiftShop(true);
      return;
    }

    const failures = getRequirementFailures(act);
    if (failures.length > 0) {
      alert(failures[0].alert);
      return;
    }

    let next: PlayerStats;

    if (typeof act.perform === "function") {
      next = act.perform(player, { dayOfWeek });
    } else if (act.statEffects) {
      next = applyPlayerStatDelta(player, act.statEffects);
    } else {
      next = {
        ...player,
        energy: Math.max(0, player.energy - (act.timeCost ?? 1) * 5),
      };
    }

    setPlayer(next);

    const workoutActivity = isWorkoutActivity(act);
    const rubyWorkout = workoutActivity && rubyAvailableForWorkout;
    if (workoutActivity) {
      onLogWorkout?.(rubyWorkout);
    }
    if (rubyWorkout) {
      onAdjustGirlStats?.("Ruby", { affection: 1, lust: 1 });
      if (gameplayFlags?.has("rubyTrainerAccepted")) {
        if (!gameplayFlags?.has("rubyWorkoutCount1")) {
          onSetFlag?.("rubyWorkoutCount1");
        } else if (!gameplayFlags?.has("rubyWorkoutCount2")) {
          onSetFlag?.("rubyWorkoutCount2");
        } else if (!gameplayFlags?.has("rubyWorkoutCount3")) {
          onSetFlag?.("rubyWorkoutCount3");
        }
      }
    }
    if (
      workoutActivity &&
      !rubyWorkout &&
      gameplayFlags?.has("rubyTrainerAccepted")
    ) {
      if (!gameplayFlags?.has("rubySoloWorkout1")) {
        onSetFlag?.("rubySoloWorkout1");
      } else if (!gameplayFlags?.has("rubySoloWorkout2")) {
        onSetFlag?.("rubySoloWorkout2");
      } else if (!gameplayFlags?.has("rubySoloWorkout3")) {
        onSetFlag?.("rubySoloWorkout3");
      }
    }

    spendTime(act.timeCost ?? 1);

    //Unlock Ruby when working out at Gym
    if (isRubyUnlockActivity(act)) {
      onSetFlag?.("firstWorkout");
      const rubyAlreadyMet = gameplayFlags?.has("hasMetRuby");
      if (!rubyAlreadyMet) {
        onTriggerEvent?.("Ruby", "ruby_trainer_offer_event");
      }
    }

    //Unlock Yumi after teaching class
    if (isYumiUnlockActivity(act)) {
      onSetFlag?.("firstTimeWorked");
      const yumiAlreadyMet = gameplayFlags?.has("hasMetYumi");
      if (!yumiAlreadyMet) {
        onTriggerEvent?.("Yumi", "yumi_tutor_request_event");
      }
    }

    // Mark hallway neighbor encounter readiness after any paid work shift
    if (act.name.toLowerCase().includes("work")) {
      onSetFlag?.("firstTimeWorked");
    }

    if (location === "Car Store" && act.name === "Buy Car") {
      onSetFlag?.("hasCar");
      alert("You bought a car.");
    }

    showActivityFeedback(act);
  };

  const showActivityFeedback = (activity: Activity) => {
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
          const failures = getRequirementFailures(act);
          const isDisabled = failures.length > 0;
          const showRubyIndicator =
            isRubyUnlockActivity(act) && !gameplayFlags?.has("hasMetRuby");
          const showYumiIndicator =
            isYumiUnlockActivity(act) && !gameplayFlags?.has("hasMetYumi");
          const activityLabel = getActivityLabel(act);

          return (
            <button
              key={act.id ?? act.name}
              onClick={() => doActivity(act)}
              disabled={isDisabled}
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
                <span className="font-semibold flex items-center gap-2">
                  {showRubyIndicator && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-300 text-yellow-900 text-xs font-bold border border-yellow-500">
                      ?
                    </span>
                  )}
                  {showYumiIndicator && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-300 text-yellow-900 text-xs font-bold border border-yellow-500">
                      ?
                    </span>
                  )}
                  {act.icon ? <span className="mr-2">{act.icon}</span> : null}
                  {activityLabel}
                </span>
                <div className="flex items-center gap-2">
                  {act.statEffects && (
                    <div className="flex gap-1 text-xs">
                      {act.statEffects.intelligence &&
                        act.statEffects.intelligence > 0 && (
                          <span className="text-blue-500">
                            🧠+{act.statEffects.intelligence}
                          </span>
                        )}
                      {act.statEffects.fitness &&
                        act.statEffects.fitness > 0 && (
                          <span className="text-green-500">
                            🏋️+{act.statEffects.fitness}
                          </span>
                        )}
                      {act.statEffects.style &&
                        act.statEffects.style > 0 && (
                          <span className="text-pink-500">
                            💅+{act.statEffects.style}
                          </span>
                        )}
                      {act.statEffects.money &&
                        act.statEffects.money > 0 && (
                          <span className="text-yellow-600">
                            💰+${act.statEffects.money}
                          </span>
                        )}
                      {act.statEffects.money &&
                        act.statEffects.money < 0 && (
                          <span className="text-red-500">
                            💸${Math.abs(act.statEffects.money)}
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
              {isDisabled && (
                <div className="text-xs text-red-500 mt-1">
                  {failures.map((failure) => failure.inline).join(" ")}
                </div>
              )}
            </button>
          );
        })}
      </div>
      {showGiftShop && (
        <GiftModal
          title="Gift Store"
          mode="buy"
          entries={giftStoreEntries}
          playerMoney={player.money}
          onCancel={() => setShowGiftShop(false)}
          onSelect={(gift: Gift) => {
            if (player.money < gift.cost) {
              alert(`You need $${gift.cost} for that gift.`);
              return;
            }
            const next = {
              ...player,
              money: player.money - gift.cost,
              inventory: [...player.inventory, gift.id],
            };
            setPlayer(next);
            spendTime(giftStoreTimeCost);
            setShowGiftShop(false);
          }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
