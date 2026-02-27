import CharacterOverlay from "./CharacterOverlay";
import LocationActivities, {
  type DailyWorkoutState,
} from "./LocationActivities";
import type { Dispatch, SetStateAction } from "react";
import type { Girl, GirlStats, PlayerStats } from "../data/characters";
import type { DayOfWeek } from "../data/gameConstants";
import type { CharacterEventState, GameplayFlag } from "../data/events/types";
import type { Dialogue } from "../data/dialogues";
import type { TestingEnvironment } from "../data/locations";

type Props = {
  selectedGirl: Girl | null;
  currentLocation: string;
  player: PlayerStats;
  gameplayFlags: Set<GameplayFlag>;
  setPlayer: Dispatch<SetStateAction<PlayerStats>>;
  spendTime: (
    amount: number,
    basePlayer?: PlayerStats,
    options?: {
      skipHungerGain?: boolean;
      hungerGainMultiplier?: number;
      scaleBasePlayerWithTime?: boolean;
    },
  ) => void;
  onCloseSelectedGirl: () => void;
  onStartDialogue: (
    dialogue: Dialogue,
    characterImage: string,
    girlEffects?: Partial<GirlStats>
  ) => void;
  dayOfWeek: DayOfWeek;
  dayCount: number;
  hour: number;
  eventState: CharacterEventState | null;
  onEventTriggered: (eventId: string, girlName?: string) => void;
  darkMode: boolean;
  onScheduleDate: (date: {
    characterName: string;
    location: string;
    day: DayOfWeek;
    hour: number;
    activities: string[];
    eventId: string;
    label: string;
  }) => void;
  hasInteractedToday: (girlName: string, actionLabel: string) => boolean;
  onInteractionLogged: (girlName: string, actionLabel: string) => void;
  onSetFlag: (flag: GameplayFlag) => void;
  onUnlockCharacter: (characterName: string) => void;
  isMobile: boolean;
  onTriggerEvent: (girlName: string, eventId: string, location?: string) => void;
  dailyWorkoutState: DailyWorkoutState;
  onLogWorkout: (withRuby: boolean) => void;
  onAdjustGirlStats: (girlName: string, delta: Partial<GirlStats>) => void;
  characterImageLocation?: string;
  testingEnvironment?: TestingEnvironment;
  onSetTestingEnvironment?: (environment: TestingEnvironment) => void;
  onPassOut: (playerAtBlackout: PlayerStats) => void;
};

export default function RightSidebar({
  selectedGirl,
  currentLocation,
  player,
  gameplayFlags,
  setPlayer,
  spendTime,
  onCloseSelectedGirl,
  onStartDialogue,
  dayOfWeek,
  dayCount,
  hour,
  eventState,
  onEventTriggered,
  darkMode,
  onScheduleDate,
  hasInteractedToday,
  onInteractionLogged,
  onSetFlag,
  onUnlockCharacter,
  isMobile,
  onTriggerEvent,
  dailyWorkoutState,
  onLogWorkout,
  onAdjustGirlStats,
  characterImageLocation,
  testingEnvironment,
  onSetTestingEnvironment,
  onPassOut,
}: Props) {
  if (selectedGirl && eventState) {
    return (
      <div className="hidden lg:block">
        <CharacterOverlay
          girl={selectedGirl}
          location={currentLocation}
          player={player}
          gameplayFlags={gameplayFlags}
          setPlayer={setPlayer}
          spendTime={spendTime}
          onClose={onCloseSelectedGirl}
          onStartDialogue={onStartDialogue}
          dayOfWeek={dayOfWeek}
          dayCount={dayCount}
          hour={hour}
          eventState={eventState}
          onEventTriggered={onEventTriggered}
          darkMode={darkMode}
          onScheduleDate={onScheduleDate}
          hasInteractedToday={hasInteractedToday}
          onInteractionLogged={onInteractionLogged}
          onSetFlag={onSetFlag}
          onUnlockCharacter={onUnlockCharacter}
          characterImageLocation={characterImageLocation}
          variant="sidebar"
        />
      </div>
    );
  }

  return (
    <div className={`${isMobile ? "hidden" : "block"}`}>
      <LocationActivities
        location={currentLocation}
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
        testingEnvironment={testingEnvironment}
        onSetTestingEnvironment={onSetTestingEnvironment}
        onPassOut={onPassOut}
      />
    </div>
  );
}
