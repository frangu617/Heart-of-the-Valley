import { Fragment, useState } from "react";
import { PlayerStats, type GirlStats } from "../data/characters";
import { DayOfWeek } from "../data/gameConstants";
import {
  locationActivities as activitiesMap,
  LocationActivity,
  TESTING_LOCATION_NAME,
  type TestingEnvironment,
} from "../data/locations";
import { GameplayFlag } from "@/data/events/types";
import {
  applyPlayerStatDelta,
  STARVING_HUNGER_THRESHOLD,
} from "@/lib/playerStats";
import { showGameNotice } from "@/lib/gameUi";
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
  spendTime: (
    amount: number,
    basePlayer?: PlayerStats,
    options?: {
      skipHungerGain?: boolean;
      hungerGainMultiplier?: number;
      scaleBasePlayerWithTime?: boolean;
    },
  ) => void;
  darkMode?: boolean;
  dayOfWeek: DayOfWeek;
  hour: number;
  onSetFlag?: (flag: GameplayFlag) => void;
  onTriggerEvent?: (characterName: string, eventId: string) => void;
  gameplayFlags?: Set<GameplayFlag>;
  dailyWorkoutState?: DailyWorkoutState;
  onLogWorkout?: (withRuby: boolean) => void;
  onAdjustGirlStats?: (girlName: string, delta: Partial<GirlStats>) => void;
  testingEnvironment?: TestingEnvironment;
  onSetTestingEnvironment?: (environment: TestingEnvironment) => void;
  onPassOut?: (playerAtBlackout: PlayerStats) => void;
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
  testingEnvironment,
  onSetTestingEnvironment,
  onPassOut,
}: Props) {
  const baseActivities: Activity[] = activitiesMap[location] ?? [];
  const waitActivity: Activity = {
    id: "universal_wait",
    name: "Wait",
    icon: "⏳",
    description: "Kill a little time and wait for the next hour.",
    timeCost: 1,
    statEffects: {},
  };
  const [showGiftShop, setShowGiftShop] = useState(false);
  const giftStoreTimeCost =
    baseActivities.find((act) => act.name === "Gift Store")?.timeCost ?? 1;
  const giftStoreEntries = gifts.map((gift) => ({ gift, count: 0 }));

  const activities = baseActivities.some((activity) => activity.name === "Wait")
    ? [...baseActivities]
    : [...baseActivities, waitActivity];
  const testingEnvironmentByActivityId: Record<string, TestingEnvironment> = {
    test_env_casual: "casual",
    test_env_university: "university",
    test_env_gym: "gym",
    test_env_home: "home",
    test_env_date: "date",
    test_env_nun: "nun",
  };

  const rubyAtGym =
    getScheduledLocation("Ruby", dayOfWeek, hour) === "Gym" &&
    !gameplayFlags?.has("rubyIsHiding");
  const rubyUnlocked = gameplayFlags?.has("hasMetRuby") ?? false;
  const rubyAvailableForWorkout = rubyUnlocked && rubyAtGym;
  const workoutActivityNames = new Set(["Workout", "Light Exercise"]);
  const sleepActivityNames = new Set(["Sleep", "Take a Nap"]);

  const isWorkoutActivity = (activity: Activity) =>
    location === "Gym" && workoutActivityNames.has(activity.name);
  const isSleepActivity = (activity: Activity) =>
    location === "Bedroom" && sleepActivityNames.has(activity.name);
  const isCafeToGoActivity = (activity: Activity) =>
    location === "Cafe" && /\(to-go\)/i.test(activity.name);
  const getCafeToGoInventoryItemId = (activity: Activity) => {
    const normalizedName = activity.name
      .replace(/\s*\(to-go\)\s*/i, "")
      .trim();
    return `Cafe To-Go: ${normalizedName}`;
  };

  const isRubyUnlockActivity = (activity: Activity) => isWorkoutActivity(activity);

  const isRubyWorkoutActivity = (activity: Activity) =>
    isWorkoutActivity(activity) && rubyAvailableForWorkout;

  const isYumiUnlockActivity = (activity: Activity) =>
    location === "Classroom" && activity.name === "Teach Class";
  const irisIsTeachingInClassroom =
    location === "Classroom" &&
    getScheduledLocation("Iris", dayOfWeek, hour) === "Classroom";

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

  const activityReducesHunger = (activity: Activity) =>
    typeof activity.statEffects?.hunger === "number" &&
    activity.statEffects.hunger < 0;

  const getRequirementFailures = (activity: Activity): RequirementFailure[] => {
    if (activity.name === "Wait") {
      return [];
    }

    const failures: RequirementFailure[] = [];
    const requirements = activity.requirements;

    if (
      player.hunger >= STARVING_HUNGER_THRESHOLD &&
      !activityReducesHunger(activity)
    ) {
      failures.push({
        alert: "You're too hungry to do that right now. Eat something first.",
        inline: "🍔 Too hungry right now",
      });
    }

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
    const isCafeToGoPurchase = isCafeToGoActivity(act);
    const isEatingActivity =
      activityReducesHunger(act) && !isCafeToGoPurchase;

    const selectedTestingEnvironment =
      act.id ? testingEnvironmentByActivityId[act.id] : undefined;
    if (
      location === TESTING_LOCATION_NAME &&
      selectedTestingEnvironment &&
      onSetTestingEnvironment
    ) {
      onSetTestingEnvironment(selectedTestingEnvironment);
      return;
    }

    if (location === "Mall" && act.name === "Gift Store") {
      setShowGiftShop(true);
      return;
    }

    if (
      location === "Classroom" &&
      act.name === "Teach Class" &&
      irisIsTeachingInClassroom
    ) {
      showGameNotice("Iris is currently teaching this class.", {
        tone: "warning",
      });
      return;
    }

    const failures = getRequirementFailures(act);
    if (failures.length > 0) {
      showGameNotice(failures[0].alert, { tone: "warning" });
      return;
    }

    let next: PlayerStats;

    if (isCafeToGoPurchase) {
      const moneyCost = act.statEffects?.money ?? 0;
      next =
        moneyCost !== 0
          ? applyPlayerStatDelta(player, { money: moneyCost })
          : player;
      next = {
        ...next,
        inventory: [...next.inventory, getCafeToGoInventoryItemId(act)],
      };
    } else if (typeof act.perform === "function") {
      next = act.perform(player, { dayOfWeek });
    } else if (act.statEffects) {
      next = applyPlayerStatDelta(player, act.statEffects);
    } else {
      next = applyPlayerStatDelta(player, {
        energy: -(act.timeCost ?? 1) * 5,
      });
    }
    if (isWorkoutActivity(act)) {
      next = {
        ...next,
        hygiene: Math.max(0, Math.floor(next.hygiene * 0.5)),
      };
    } else if (act.name === "Swim") {
      next = applyPlayerStatDelta(next, { hygiene: -25 });
    }
    if (isEatingActivity) {
      next = applyPlayerStatDelta(next, { energy: 20 });
    }

    if (next.sobriety <= 0) {
      onPassOut?.(next);
      return;
    }

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

    const activityTimeCost = isCafeToGoPurchase ? 0 : (act.timeCost ?? 1);

    spendTime(activityTimeCost, next, {
      skipHungerGain: isEatingActivity,
      hungerGainMultiplier: isSleepActivity(act) ? 0.25 : 1,
      scaleBasePlayerWithTime: isSleepActivity(act),
    });

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
      showGameNotice("You bought a car.", { tone: "success" });
    }

    if (isCafeToGoPurchase) {
      showGameNotice(
        `${getCafeToGoInventoryItemId(act).replace("Cafe To-Go: ", "")} added to your inventory.`,
        { tone: "success" },
      );
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

  const isCafeMenu = location === "Cafe";
  const cafeForHereActivities = isCafeMenu
    ? activities.filter((activity) => !isCafeToGoActivity(activity))
    : [];
  const cafeToGoActivities = isCafeMenu
    ? activities.filter((activity) => isCafeToGoActivity(activity))
    : [];
  const displayedActivities = isCafeMenu
    ? [...cafeForHereActivities, ...cafeToGoActivities]
    : activities;

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
        {isCafeMenu ? "Menu" : "Activities"}
      </h3>
      {isCafeMenu && (
        <p className={`text-xs mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          (For Here) items consume time and apply now. (To-Go) purchases are instant and go to inventory.
        </p>
      )}

      <div className="grid grid-cols-1 gap-2">
        {displayedActivities.map((act, index) => {
          const selectedTestingEnvironment =
            act.id ? testingEnvironmentByActivityId[act.id] : undefined;
          const isTestingEnvironmentActivity =
            location === TESTING_LOCATION_NAME && !!selectedTestingEnvironment;
          const isActiveTestingEnvironment =
            isTestingEnvironmentActivity &&
            selectedTestingEnvironment === testingEnvironment;
          const failures = getRequirementFailures(act);
          const isDisabled = isTestingEnvironmentActivity
            ? false
            : failures.length > 0;
          const showRubyIndicator =
            isRubyUnlockActivity(act) && !gameplayFlags?.has("hasMetRuby");
          const showYumiIndicator =
            isYumiUnlockActivity(act) && !gameplayFlags?.has("hasMetYumi");
          const activityLabel = getActivityLabel(act);
          const showForHereDivider = isCafeMenu && index === 0;
          const showToGoDivider =
            isCafeMenu &&
            cafeToGoActivities.length > 0 &&
            index === cafeForHereActivities.length;
          const displayTimeCost = isCafeToGoActivity(act) ? 0 : act.timeCost;

          return (
            <Fragment key={`${act.id ?? act.name}_${index}`}>
              {showForHereDivider && (
                <div
                  className={`px-2 py-1 rounded-md border text-xs font-semibold ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-purple-50 border-purple-200 text-purple-700"
                  }`}
                >
                  For Here
                </div>
              )}
              {showToGoDivider && (
                <div
                  className={`mt-1 px-2 py-1 rounded-md border text-xs font-semibold ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-purple-50 border-purple-200 text-purple-700"
                  }`}
                >
                  To-Go
                </div>
              )}
              <button
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
                    {isActiveTestingEnvironment && (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-300 text-green-900 text-xs font-bold border border-green-500">
                        ✓
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
                        {act.statEffects.style && act.statEffects.style > 0 && (
                          <span className="text-pink-500">
                            💅+{act.statEffects.style}
                          </span>
                        )}
                        {act.statEffects.money && act.statEffects.money > 0 && (
                          <span className="text-yellow-600">
                            💰+${act.statEffects.money}
                          </span>
                        )}
                        {act.statEffects.money && act.statEffects.money < 0 && (
                          <span className="text-red-500">
                            💸${Math.abs(act.statEffects.money)}
                          </span>
                        )}
                      </div>
                    )}
                    {displayTimeCost && displayTimeCost > 0 ? (
                      <span className="text-xs opacity-70">{displayTimeCost}h</span>
                    ) : isCafeToGoActivity(act) ? (
                      <span className="text-xs opacity-70">Instant</span>
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
            </Fragment>
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
              showGameNotice(`You need $${gift.cost} for that gift.`, {
                tone: "warning",
              });
              return;
            }
            const next = {
              ...player,
              money: player.money - gift.cost,
              inventory: [...player.inventory, gift.id],
            };
            spendTime(giftStoreTimeCost, next);
            setShowGiftShop(false);
          }}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
