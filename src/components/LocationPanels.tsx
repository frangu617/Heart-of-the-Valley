import LocationActivities, {
  type DailyWorkoutState,
} from "./LocationActivities";
import LocationCard from "./LocationCard";
import type { DayOfWeek } from "../data/gameConstants";
import type { Dispatch, SetStateAction } from "react";
import type { Girl, PlayerStats, GirlStats } from "../data/characters";
import type { Location, TestingEnvironment } from "../data/locations";
import type { GameplayFlag } from "../data/events/types";

type ScheduledEncounter = {
  characterName: string;
  location: string;
  eventId: string;
  label?: string;
  day?: string;
  hour?: number;
  activities?: string[];
};

type PendingEvent = {
  characterName: string;
  eventId: string;
  location: string;
  priority: number;
};

type Props = {
  isMobile: boolean;
  showActivitiesMenu: boolean;
  onToggleActivitiesMenu: () => void;
  showWhereMenu: boolean;
  onToggleWhereMenu: () => void;
  currentLocation: string;
  darkMode: boolean;
  dayOfWeek: DayOfWeek;
  hour: number;
  gameplayFlags: Set<GameplayFlag>;
  dailyWorkoutState: DailyWorkoutState;
  onLogWorkout: (withRuby: boolean) => void;
  onAdjustGirlStats: (girlName: string, delta: Partial<GirlStats>) => void;
  hasInteractedToday: (girlName: string, actionLabel: string) => boolean;
  onInteractionLogged: (girlName: string, actionLabel: string) => void;
  player: PlayerStats;
  setPlayer: Dispatch<SetStateAction<PlayerStats>>;
  spendTime: (
    hours: number,
    basePlayer?: PlayerStats,
    options?: {
      skipHungerGain?: boolean;
      hungerGainMultiplier?: number;
      scaleBasePlayerWithTime?: boolean;
    },
  ) => void;
  onTriggerEvent: (girlName: string, eventId: string, location?: string) => void;
  onSetFlag: (flag: GameplayFlag) => void;
  availableLocations: Location[];
  moveTo: (locationName: string) => void;
  girls: Girl[];
  scheduledEncounters: ScheduledEncounter[];
  pendingEvents: PendingEvent[];
  isLocationTransitioning: boolean;
  testingEnvironment?: TestingEnvironment;
  onSetTestingEnvironment?: (environment: TestingEnvironment) => void;
  onPassOut: (playerAtBlackout: PlayerStats) => void;
};

export default function LocationPanels({
  isMobile,
  showActivitiesMenu,
  onToggleActivitiesMenu,
  showWhereMenu,
  onToggleWhereMenu,
  currentLocation,
  darkMode,
  dayOfWeek,
  hour,
  gameplayFlags,
  dailyWorkoutState,
  onLogWorkout,
  onAdjustGirlStats,
  hasInteractedToday,
  onInteractionLogged,
  player,
  setPlayer,
  spendTime,
  onTriggerEvent,
  onSetFlag,
  availableLocations,
  moveTo,
  girls,
  scheduledEncounters,
  pendingEvents,
  isLocationTransitioning,
  testingEnvironment,
  onSetTestingEnvironment,
  onPassOut,
}: Props) {
  const presentGirls = girls.filter((girl) => girl.location === currentLocation);

  return (
    <>
      {isMobile && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={onToggleActivitiesMenu}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 shadow-md transition-colors ${
              darkMode
                ? "bg-gray-800 border-purple-700 text-purple-200"
                : "bg-white border-purple-200 text-purple-800"
            }`}
            aria-expanded={showActivitiesMenu}
            aria-label={`Activities for ${currentLocation}`}
          >
            <span className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l1.8 5.5H19l-4.3 3.1L16.5 16 12 12.7 7.5 16l1.8-5.4L5 7.5h5.2L12 2z" />
              </svg>
              <span className="text-sm font-semibold">Activities</span>
            </span>
            <span className="flex items-center gap-2 text-xs opacity-80">
              <span>{currentLocation}</span>
              <svg
                viewBox="0 0 20 20"
                className={`h-4 w-4 transition-transform ${
                  showActivitiesMenu ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 7l5 5 5-5" />
              </svg>
            </span>
          </button>
          {showActivitiesMenu && (
            <LocationActivities
              location={currentLocation}
              presentGirls={presentGirls}
              player={player}
              setPlayer={setPlayer}
              spendTime={spendTime}
              darkMode={darkMode}
              dayOfWeek={dayOfWeek}
              hour={hour}
              gameplayFlags={gameplayFlags}
              onTriggerEvent={onTriggerEvent}
              onSetFlag={onSetFlag}
              dailyWorkoutState={dailyWorkoutState}
              onLogWorkout={onLogWorkout}
              onAdjustGirlStats={onAdjustGirlStats}
              hasInteractedToday={hasInteractedToday}
              onInteractionLogged={onInteractionLogged}
              testingEnvironment={testingEnvironment}
              onSetTestingEnvironment={onSetTestingEnvironment}
              onPassOut={onPassOut}
            />
          )}
          <button
            type="button"
            onClick={onToggleWhereMenu}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 shadow-md transition-colors ${
              darkMode
                ? "bg-gray-800 border-purple-700 text-purple-200"
                : "bg-white border-purple-200 text-purple-800"
            }`}
            aria-expanded={showWhereMenu}
            aria-label="Where to go"
          >
            <span className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s7-7.4 7-12a7 7 0 0 0-14 0c0 4.6 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span className="text-sm font-semibold">Where to go?</span>
            </span>
            <span className="flex items-center gap-2 text-xs opacity-80">
              <span>{currentLocation}</span>
              <svg
                viewBox="0 0 20 20"
                className={`h-4 w-4 transition-transform ${
                  showWhereMenu ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 7l5 5 5-5" />
              </svg>
            </span>
          </button>
          {showWhereMenu && (
            <div
              className={`relative flex flex-col gap-3 rounded-2xl shadow-xl p-4 border-2 ${
                darkMode
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-purple-100"
              } transition-colors duration-300`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-black/60 pointer-events-none transition-opacity duration-200 z-10 ${
                  isLocationTransitioning ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="grid grid-cols-2 gap-3">
                {availableLocations.map((loc) => (
                  <LocationCard
                    key={loc.name}
                    location={loc}
                    onMove={(locationName) => {
                      moveTo(locationName);
                    }}
                    girls={girls}
                    gameplayFlags={gameplayFlags}
                    darkMode={darkMode}
                    scheduledEncounters={scheduledEncounters}
                    pendingEvents={pendingEvents}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Available locations */}
      {!isMobile && (
        <div
          className={`relative flex flex-col gap-3 md:gap-4 rounded-2xl shadow-xl p-4 md:p-6 border-2  ${
            darkMode
              ? "bg-gray-800 border-purple-700"
              : "bg-white border-purple-100"
          } transition-colors duration-300`}
        >
          <div
            className={`absolute inset-0 rounded-2xl bg-black/60 pointer-events-none transition-opacity duration-200 z-10 ${
              isLocationTransitioning ? "opacity-100" : "opacity-0"
            }`}
          />
          <h3
            className={`text-xl text-center md:text-2xl font-bold mb-3 md:mb-4 ${
              darkMode ? "text-purple-300" : "text-purple-800"
            }`}
          >
            Where to go?
          </h3>
          <div className="mt-4 overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {availableLocations.map((loc) => (
                <LocationCard
                  key={loc.name}
                  location={loc}
                  onMove={moveTo}
                  girls={girls}
                  gameplayFlags={gameplayFlags}
                  darkMode={darkMode}
                  scheduledEncounters={scheduledEncounters}
                  pendingEvents={pendingEvents}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
