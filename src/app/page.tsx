"use client";

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

// Components
import LoginScreen from "@/components/LoginScreen";
import NameInput from "@/components/NameInput";
import StatsPanel from "../components/StatsPanel";
import CharacterOverlay from "../components/CharacterOverlay";
import { type DailyWorkoutState } from "../components/LocationActivities";
import MainMenu from "../components/MainMenu";
import PauseMenu from "../components/PauseMenu";
import DialogueBox from "../components/DialogueBox";
import PhoneMenu from "../components/PhoneMenu";
import TutorialOverlay from "../components/TutorialOverlay";
import SceneView from "../components/SceneView";
import LocationPanels from "../components/LocationPanels";
import RightSidebar from "../components/RightSidebar";

// Lib
import { getScheduledLocation } from "../lib/schedule";
import { getCharacterImage, getLocationBackground } from "../lib/images";
import {
  checkRandomEvent,
  getScheduledNonStoryRandomEventForContext,
  rollDailyNonStoryRandomEventIds,
} from "../lib/randomEventSystem";
import { getCharacterEvents } from "../data/events/chapter1/index";
import { checkEventConditions, isEventOnCooldown } from "../lib/eventSystem";
import { calculateGameTime, getTimeOfDay } from "../lib/time";
import { applyCharacterEventRewards } from "../lib/rewards";
import {
  applyPlayerStatDelta,
  STARVING_HUNGER_THRESHOLD,
  withDerivedMood,
} from "../lib/playerStats";
import {
  AUTH_SESSION_KEY,
  SINGLE_USER_ACCOUNT,
  buildAuthSession,
  isValidAuthSession,
  verifyCredentials,
} from "../lib/auth";
import {
  GAME_CONFIRM_EVENT,
  GAME_NOTICE_EVENT,
  askGameConfirm,
  showGameNotice,
  type GameConfirmPayload,
  type GameNoticePayload,
  type GameNoticeTone,
} from "@/lib/gameUi";
import { startImageManifestPreload } from "@/lib/imagePreload";
import { injectDawnIntelLines } from "@/lib/dawnMystery";
import { iris_c3_ev2_dawn_summon_call } from "@/data/events/chapter3/iris/event2";

// Data / Types

import {
  locationDescriptions,
  locationGraph,
  TESTING_LOCATION_NAME,
  TESTING_ENVIRONMENT_LOCATION_BY_ID,
  type TestingEnvironment,
} from "../data/locations";
import {
  PlayerStats,
  defaultPlayerStats,
  Girl,
  girls as baseGirls,
  testingOnlyGirls,
  GirlStats,
} from "../data/characters";
import {
  DAYS_OF_WEEK,
  DayOfWeek,
  START_DAY,
  START_HOUR,
  MAX_HOUR,
  getNextDay,
} from "../data/gameConstants";
import {
  introDialogue,
  characterDialogues,
  // getDefaultDialogue,
  type Dialogue,
  // firstMeetingDialogues,
} from "../data/dialogues/index";

import type { RandomEvent } from "../data/events/chapter1/randomEvents";
import { randomEvents } from "../data/events/chapter1/randomEvents";
import {
  dateActivitiesByLocation,
  dateLocationInfo,
  dateLocationOrder,
  type DateActivity,
  type DateLocation,
  type DateOutcome,
} from "@/data/dates";
import type {
  CharacterEvent,
  CharacterEventState,
  EventHistory,
  GameplayFlag,
} from "../data/events/types";
import { DialogueChoice } from "../data/dialogues";
import {
  buildMessageGalleryUnlock,
  getCharacterMessageReply,
  getPlayerMessageText,
  type GalleryUnlock,
  type PhoneMessage,
  type PhoneMessageAction,
} from "@/lib/phoneMessages";
import type {
  CalendarDateEntry,
  CalendarMilestoneEntry,
  CalendarMilestoneType,
} from "@/lib/calendar";

type ScheduledEncounter = {
  characterName: string;
  location: string;
  eventId: string; // The random event ID to trigger
  label?: string; // Optional: "Coffee Date", "Gym Session", etc.
  day?: string; // explicit string to allow serialization
  hour?: number;
  activities?: string[];
  source?: DateScheduleSource;
};

type QuestItem = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  timing?: string;
  characterName?: string;
  priority: number;
};

type SaveData = {
  player: PlayerStats;
  currentLocation: string;
  hour: number;
  dayOfWeek: DayOfWeek;
  metCharacters: string[];
  girlStatsOverrides: Record<string, Partial<GirlStats>>;
  characterEventStates: Record<string, CharacterEventState>;
  characterUnlocks: {
    Yumi: boolean;
    Gwen: boolean;
    Dawn: boolean;
    Ruby: boolean;
  };
  scheduledEncounters: ScheduledEncounter[];
  gameplayFlags: GameplayFlag[];
  dailyWorkoutState: DailyWorkoutState;
  rubyWorkoutTotal: number;
  randomEventDailyCounts: Record<string, number>;
  dayCount: number;
  dailyNonStoryRandomEventIds: string[];
  nonStoryRandomEventLastTriggeredDay: Record<string, number>;
  hungerProgressRemainder: number;
  messagesByCharacter: Record<string, PhoneMessage[]>;
  galleryUnlocks: GalleryUnlock[];
  messageActionHistory: Record<string, PhoneMessageAction[]>;
  calendarMilestones: CalendarMilestoneEntry[];
  lastPlayerDateAskDayByCharacter: Record<string, number>;
  lastAutoDateAskDayByCharacter: Record<string, number>;
  textSpeed: "normal" | "instant";
  timestamp: string;
};

type GameNoticeItem = {
  id: number;
  message: string;
  tone: GameNoticeTone;
  isLeaving: boolean;
};

type PendingGameConfirm = {
  id: number;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  resolve: (confirmed: boolean) => void;
};

type EventDebugReport = {
  event: CharacterEvent;
  timing: string;
  targetLocation: string;
  reasons: string[];
  isReady: boolean;
};

type GameState = "mainMenu" | "nameInput" | "intro" | "playing" | "paused" | "dialogue";
type SpendTimeOptions = {
  skipHungerGain?: boolean;
  hungerGainMultiplier?: number;
  scaleBasePlayerWithTime?: boolean;
};
type DateScheduleSource = "player" | "npc" | "story";

type IrisSkipCheckpoint =
  | "ch1_complete"
  | "ch2_after_ev3"
  | "ch2_complete"
  | "ch3_after_ev1";
type IrisRouteChoice = "dom" | "sub" | "middle";
type IrisCoffeeChoice = "accepted" | "declined";
type IrisPublicChoice = "accept" | "refuse";
type IrisDomDeniedResolution = "exclusive" | "explore";
type IrisC3Outcome = "keep_locked" | "shift_success" | "shift_failed";

const MANUAL_SAVE_KEY = "datingSimSave";
const AUTO_SAVE_KEY = "datingSimAutoSave";
const HUNGER_GAIN_PER_HOUR = 80 / 6;
const SOBRIETY_BLACKOUT_THRESHOLD = 0;

const clampValue = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const getEventTimingHint = (event: CharacterEvent) => {
  const { minHour, maxHour, specificDay } = event.conditions;
  const dayPart = specificDay ? specificDay : "Any day";

  let timePart = "Any time";
  if (minHour !== undefined && maxHour !== undefined) {
    timePart =
      minHour === 0 && maxHour === 24 ? "Any time" : `${minHour}:00-${maxHour}:00`;
  } else if (minHour !== undefined) {
    timePart = `After ${minHour}:00`;
  } else if (maxHour !== undefined) {
    timePart = `Before ${maxHour}:00`;
  }

  return `${dayPart}, ${timePart}`;
};

const getMetFlagForGirl = (girlName: string): GameplayFlag | null => {
  switch (girlName.toLowerCase()) {
    case "iris":
      return "hasMetIris";
    case "dawn":
      return "hasMetDawn";
    case "gwen":
      return "hasMetGwen";
    case "yumi":
      return "hasMetYumi";
    case "ruby":
      return "hasMetRuby";
    default:
      return null;
  }
};

const hasCompletedEvent = (
  eventState: CharacterEventState | undefined,
  eventId: string,
) =>
  eventState?.eventHistory.some(
    (entry) => entry.eventId === eventId && entry.timesTriggered > 0,
  ) ?? false;

const inferMissingPathFlags = (
  flags: Set<GameplayFlag>,
  eventStates: Record<string, CharacterEventState>,
): Set<GameplayFlag> => {
  const nextFlags = new Set(flags);
  const yumiState = eventStates.Yumi;
  const irisState = eventStates.Iris;
  const gwenState = eventStates.Gwen;

  if (!nextFlags.has("yumiDomPath") && !nextFlags.has("yumiSubPath")) {
    const yumiDomInHistory =
      hasCompletedEvent(yumiState, "yumi_chapter_1_finale_dom") ||
      hasCompletedEvent(yumiState, "yumi_classroom_flirt_dom") ||
      hasCompletedEvent(yumiState, "yumi_tutoring_event_2_dom");
    const yumiSubInHistory =
      hasCompletedEvent(yumiState, "yumi_chapter_1_finale_sub") ||
      hasCompletedEvent(yumiState, "yumi_classroom_flirt_sub") ||
      hasCompletedEvent(yumiState, "yumi_tutoring_event_2_sub");

    if (
      yumiDomInHistory ||
      nextFlags.has("yumi_relationship_secret_dom") ||
      nextFlags.has("yumi_relationship_stalled")
    ) {
      nextFlags.add("yumiDomPath");
    } else if (
      yumiSubInHistory ||
      nextFlags.has("yumi_relationship_secret")
    ) {
      nextFlags.add("yumiSubPath");
    }
  }

  if (!nextFlags.has("irisDomPath") && !nextFlags.has("irisSubPath")) {
    const irisDomInHistory =
      hasCompletedEvent(irisState, "iris_chapter_1_finale_dom") ||
      hasCompletedEvent(irisState, "iris_mall_bump_dom");
    const irisSubInHistory =
      hasCompletedEvent(irisState, "iris_chapter_1_finale_sub") ||
      hasCompletedEvent(irisState, "iris_mall_bump_sub");

    if (
      irisDomInHistory ||
      nextFlags.has("irisDomAcceptedKissLoopActive") ||
      nextFlags.has("irisDomDeniedKissLoopActive") ||
      nextFlags.has("irisDomDeniedExclusive") ||
      nextFlags.has("irisDomDeniedExplore")
    ) {
      nextFlags.add("irisDomPath");
    } else if (irisSubInHistory) {
      nextFlags.add("irisSubPath");
    }
  }

  if (
    nextFlags.has("irisCh2Complete") &&
    !nextFlags.has("irisKissOthersChoiceMade")
  ) {
    if (
      nextFlags.has("irisNtrSeeded") ||
      nextFlags.has("irisDomDeniedExplore")
    ) {
      nextFlags.add("irisKissOthersChoiceMade");
      nextFlags.add("irisKissOthersEnabled");
    } else if (nextFlags.has("irisDomDeniedExclusive")) {
      nextFlags.add("irisKissOthersChoiceMade");
    }
  }

  if (!nextFlags.has("gwenDomPath") && !nextFlags.has("gwenSubPath")) {
    if (hasCompletedEvent(gwenState, "gwen_chapter_1_finale")) {
      nextFlags.add("gwenDomPath");
    } else if (hasCompletedEvent(gwenState, "gwen_chapter_1_finale_sub")) {
      nextFlags.add("gwenSubPath");
    }
  }

  if (!nextFlags.has("irisCoffeeAccepted") && !nextFlags.has("irisCoffeeDeclined")) {
    if (hasCompletedEvent(irisState, "iris_coffee_meetup_event")) {
      nextFlags.add("irisCoffeeAccepted");
    } else if (hasCompletedEvent(irisState, "iris_coffee_forced_meet_event")) {
      nextFlags.add("irisCoffeeDeclined");
    }
  }

  if (
    hasCompletedEvent(irisState, "iris_coffee_meetup_event") ||
    hasCompletedEvent(irisState, "iris_coffee_forced_meet_event")
  ) {
    nextFlags.add("irisCoffeeMet");
  }

  if (
    !nextFlags.has("irisApartmentUnlocked") &&
    (hasCompletedEvent(irisState, "iris_hallway_invite_event") ||
      nextFlags.has("irisDomPath") ||
      nextFlags.has("irisSubPath"))
  ) {
    nextFlags.add("irisApartmentUnlocked");
  }

  return nextFlags;
};

const areFlagsEqual = (
  left: Set<GameplayFlag>,
  right: Set<GameplayFlag>,
) => {
  if (left.size !== right.size) return false;
  for (const flag of left) {
    if (!right.has(flag)) return false;
  }
  return true;
};

const getDayCountFromGameTime = (gameTime: number) =>
  Math.floor(gameTime / 24);

const isEventHistoryFromCurrentDay = (
  history: EventHistory,
  currentDayCount: number,
  currentDay: DayOfWeek,
) => {
  const gameTime = history.lastTriggered?.gameTime;
  if (typeof gameTime === "number" && Number.isFinite(gameTime)) {
    return getDayCountFromGameTime(gameTime) === currentDayCount;
  }
  return history.lastTriggered.day === currentDay;
};

const getAdvancedDay = (day: DayOfWeek, daysToAdvance: number): DayOfWeek => {
  const normalizedAdvance = Math.max(0, Math.floor(daysToAdvance));
  const startIndex = DAYS_OF_WEEK.indexOf(day);
  if (startIndex === -1) return day;
  const nextIndex = (startIndex + normalizedAdvance) % DAYS_OF_WEEK.length;
  return DAYS_OF_WEEK[nextIndex];
};

const getDayOfWeekFromDayCount = (absoluteDayCount: number): DayOfWeek =>
  getAdvancedDay(START_DAY, Math.max(0, Math.floor(absoluteDayCount)));

const normalizeEventStateGameTime = (
  history: EventHistory,
  currentDay: DayOfWeek,
  currentDayCount: number,
): number => {
  const recorded = history.lastTriggered?.gameTime;
  if (typeof recorded !== "number" || !Number.isFinite(recorded)) {
    const currentDayIndex = DAYS_OF_WEEK.indexOf(currentDay);
    const eventDayIndex = DAYS_OF_WEEK.indexOf(history.lastTriggered.day as DayOfWeek);
    const dayDelta =
      currentDayIndex >= 0 && eventDayIndex >= 0
        ? (currentDayIndex - eventDayIndex + DAYS_OF_WEEK.length) %
          DAYS_OF_WEEK.length
        : 0;
    const estimatedDayCount = Math.max(0, currentDayCount - dayDelta);
    return estimatedDayCount * 24 + history.lastTriggered.hour;
  }
  return recorded;
};

const normalizeEventStateTimestamps = (
  eventStates: Record<string, CharacterEventState>,
  currentDay: DayOfWeek,
  currentDayCount: number,
) => {
  const normalizedStates: Record<string, CharacterEventState> = {};

  Object.entries(eventStates).forEach(([characterName, state]) => {
    const normalizedHistory = state.eventHistory.map((history) => {
      const normalizedGameTime = normalizeEventStateGameTime(
        history,
        currentDay,
        currentDayCount,
      );
      return {
        ...history,
        lastTriggered: {
          ...history.lastTriggered,
          gameTime: normalizedGameTime,
        },
      };
    });
    const latestGameTime = normalizedHistory.reduce(
      (latest, history) => Math.max(latest, history.lastTriggered.gameTime),
      state.lastInteractionTime ?? 0,
    );

    normalizedStates[characterName] = {
      ...state,
      eventHistory: normalizedHistory,
      lastInteractionTime: latestGameTime,
    };
  });

  return normalizedStates;
};

const GWEN_DOOR_MIXUP_CASUAL_DIALOGUE_IDS = new Set([
  "gwen_event_2_door_mixup",
  "gwen_event_2_door_supportive",
  "gwen_event_2_door_angry",
]);
const IRIS_HOME_DIALOGUE_IDS = new Set([
  "iris_hallway_invite_dom",
  "iris_hallway_invite_sub",
  "iris_hallway_invite_sub_flirt",
  "iris_hallway_invite_sub_friendly",
]);
const IRIS_APARTMENT_LOCATION_NAMES = new Set([
  "Iris' Living Room",
  "Iris' Bedroom",
  "Iris' Bathroom",
  "Iris' Kitchen",
  "Dawn's bedroom",
]);
const UNIVERSITY_LOCATION_NAMES = new Set([
  "University",
  "University Hallway",
  "Classroom",
  "Office",
  "Iris' Office",
  "Men's Bathroom",
  "Women's Bathroom",
  "University Parking Lot",
]);
const NIGHTLIFE_LOCATION_NAMES = new Set(["Bar", "Nightclub", "Strip Club"]);
const CAFE_AND_GYM_CLOSING_HOUR = 22;
const MALL_CLOSING_HOUR = 20;
const CAR_STORE_CLOSING_HOUR = 21;
const CHAPTER_TWO_UNLOCK_FLAG_BY_CHARACTER: Partial<
  Record<string, GameplayFlag>
> = {
  Iris: "irisCh1FinaleComplete",
  Dawn: "hasMetDawn",
  Gwen: "gwen_chapter_1_completed",
  Ruby: "ruby_chapter_1_completed",
  Yumi: "yumi_chapter_1_completed",
};
const CHAPTER_THREE_UNLOCK_FLAG_BY_CHARACTER: Partial<
  Record<string, GameplayFlag>
> = {
  Iris: "irisCh2Complete",
  Yumi: "yumi_chapter_2_completed",
};
const MESSAGE_DATE_LOCATION_BY_CHARACTER: Partial<Record<string, DateLocation>> = {
  Iris: "Cafe",
  Dawn: "Nightclub",
  Gwen: "City",
  Ruby: "Beach",
  Yumi: "Park",
};
const FIRST_SEX_EVENT_ID_PATTERN = /(^|[_-])(sex|firstsex|first_time|firsttime|intimate)([_-]|$)/i;
const getPhoneRomanceSuccessChance = (
  girlStats: GirlStats,
  chapter: number,
  intensity: "flirt" | "sext",
) => {
  const closenessScore =
    girlStats.affection * 0.6 +
    girlStats.love * 0.5 +
    girlStats.lust * 0.3 +
    (girlStats.mood - 40) * 0.4;
  const chapterBonus = Math.max(0, chapter - 1) * 8;
  const intensityPenalty = intensity === "sext" ? 10 : 0;
  return Math.min(
    95,
    Math.max(8, Math.round(20 + closenessScore + chapterBonus - intensityPenalty)),
  );
};
const getPhoneRomanceFailureReply = (
  characterName: string,
  action: "flirt" | "sext",
) => {
  if (action === "sext") {
    return `${characterName}: too much, too fast. Slow down.`;
  }
  return `${characterName}: maybe keep it light for now.`;
};
const NOTICE_CLASS_BY_TONE: Record<GameNoticeTone, string> = {
  info: "border-purple-400 bg-purple-900/90 text-purple-100",
  success: "border-green-400 bg-green-900/90 text-green-100",
  warning: "border-yellow-400 bg-yellow-900/90 text-yellow-100",
  error: "border-red-400 bg-red-900/90 text-red-100",
};
const DEBUG_FAST_TRAVEL_LOCATIONS = Array.from(
  new Set([
    ...Object.keys(locationGraph),
    ...Object.values(locationGraph).flatMap((links) => links.map((loc) => loc.name)),
  ]),
).sort((left, right) => left.localeCompare(right));
const IRIS_SKIP_CHECKPOINT_ORDER: IrisSkipCheckpoint[] = [
  "ch1_complete",
  "ch2_after_ev3",
  "ch2_complete",
  "ch3_after_ev1",
];
const IRIS_SKIP_CHECKPOINT_LABEL: Record<IrisSkipCheckpoint, string> = {
  ch1_complete: "Chapter 1 Complete",
  ch2_after_ev3: "Chapter 2 - After Event 3",
  ch2_complete: "Chapter 2 Complete",
  ch3_after_ev1: "Chapter 3 - After Event 1",
};
const IRIS_ROUTE_LABEL: Record<IrisRouteChoice, string> = {
  dom: "Dom",
  sub: "Sub",
  middle: "Middle",
};
const IRIS_SKIP_MANAGED_FLAGS: GameplayFlag[] = [
  "hasMetIris",
  "hasSeenDawn",
  "irisNeedsNewShirt",
  "irisCoffeeAccepted",
  "irisCoffeeDeclined",
  "irisCoffeeMet",
  "irisApartmentUnlocked",
  "irisDomPath",
  "irisSubPath",
  "irisCh1FinaleComplete",
  "irisCh2Ev1_Done",
  "irisCh2Ev2_Done",
  "irisCh2Ev3_Done",
  "irisCh2Ev4_Done",
  "irisSchoolKissUnlocked",
  "irisPublicRefused",
  "irisDatePlanned",
  "irisDomAcceptedKissLoopActive",
  "irisDomDeniedKissLoopActive",
  "irisDomDeniedSeen1",
  "irisDomDeniedSeen2",
  "irisDomDeniedSeen3",
  "irisDomDeniedExclusive",
  "irisDomDeniedExplore",
  "irisNtrSeeded",
  "irisKissOthersChoiceMade",
  "irisKissOthersEnabled",
  "irisCh2Complete",
  "metMysteryGirl",
  "irisCh3Ev1_Done",
  "irisCh3Ev2_Done",
  "irisC3PathOriginDom",
  "irisC3PathOriginSub",
  "irisC3PathOriginMiddle",
  "irisC3PathCurrentDom",
  "irisC3PathCurrentSub",
  "irisC3PathCurrentMiddle",
  "irisC3PathLocked",
  "irisC3PathShiftAttempted",
  "irisC3PathShiftSucceeded",
  "dawnFallbackReady",
  "dawnIrritatedFallbackSeen",
  "dawnSummonQueued",
  "dawnSummonQueuedFromKiss",
  "dawnSummonQueuedTonight",
  "dawnSummonTriggered",
  "playerKissedAnotherGirl",
];

const isNightlifeOpenAtHour = (hour: number) => hour >= 22 || hour < 2;
const isIrisCheckpointAtLeast = (
  current: IrisSkipCheckpoint,
  threshold: IrisSkipCheckpoint,
) =>
  IRIS_SKIP_CHECKPOINT_ORDER.indexOf(current) >=
  IRIS_SKIP_CHECKPOINT_ORDER.indexOf(threshold);
const getChapter2RouteKey = (route: IrisRouteChoice) =>
  route === "middle" ? "neutral" : route;

const isChapterTwoOrHigher = (
  characterName: string,
  flags: Set<GameplayFlag>,
) => {
  const requiredFlag = CHAPTER_TWO_UNLOCK_FLAG_BY_CHARACTER[characterName];
  const normalizedCharacterName = characterName.toLowerCase();
  const hasFlag = (flag: string) => (flags as Set<string>).has(flag);

  return (
    (requiredFlag ? flags.has(requiredFlag) : false) ||
    hasFlag(`${normalizedCharacterName}_chapter_1_completed`) ||
    hasFlag(`${normalizedCharacterName}_chapter_2_started`) ||
    hasFlag(`${normalizedCharacterName}_chapter_2_completed`) ||
    hasFlag(`${normalizedCharacterName}_chapter_3_completed`) ||
    hasFlag(`${normalizedCharacterName}_chapter_4_completed`)
  );
};

const getCharacterInteractionChapterForState = (
  characterName: string,
  flags: Set<GameplayFlag>,
  eventState: CharacterEventState,
): 1 | 2 | 3 | 4 | 5 => {
  const hasFlag = (flag: string) => (flags as Set<string>).has(flag);
  const normalizedCharacterName = characterName.toLowerCase();
  const chapterTwoFlag = CHAPTER_TWO_UNLOCK_FLAG_BY_CHARACTER[characterName];
  const chapterThreeFlag =
    CHAPTER_THREE_UNLOCK_FLAG_BY_CHARACTER[characterName];

  const chapterTwoReached =
    (chapterTwoFlag ? flags.has(chapterTwoFlag) : false) ||
    hasFlag(`${normalizedCharacterName}_chapter_1_completed`) ||
    hasCompletedEvent(eventState, `${normalizedCharacterName}_chapter_1_finale`) ||
    hasCompletedEvent(eventState, `${normalizedCharacterName}_chapter_1_finale_dom`) ||
    hasCompletedEvent(eventState, `${normalizedCharacterName}_chapter_1_finale_sub`);

  const chapterThreeReached =
    (chapterThreeFlag ? flags.has(chapterThreeFlag) : false) ||
    hasFlag(`${normalizedCharacterName}_chapter_2_completed`);

  const chapterFourReached = hasFlag(
    `${normalizedCharacterName}_chapter_3_completed`,
  );
  const chapterFiveReached = hasFlag(
    `${normalizedCharacterName}_chapter_4_completed`,
  );

  if (chapterFiveReached) return 5;
  if (chapterFourReached) return 4;
  if (chapterThreeReached) return 3;
  if (chapterTwoReached) return 2;
  return 1;
};

const getDialogueCharacterImageLocationOverride = (
  dialogueId: string,
): string | undefined => {
  if (GWEN_DOOR_MIXUP_CASUAL_DIALOGUE_IDS.has(dialogueId)) {
    return "City";
  }
  if (IRIS_HOME_DIALOGUE_IDS.has(dialogueId)) {
    return "Iris' Living Room";
  }

  return undefined;
};

type IconHoverButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

const IconHoverButton = ({
  label,
  onClick,
  children,
  className = "",
}: IconHoverButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className={`group flex h-11 w-11 shrink-0 items-center overflow-hidden rounded-lg border border-purple-500/70 bg-purple-900/60 px-3 text-purple-100 shadow-md transition-all duration-200 hover:w-32 hover:bg-purple-800/70 focus-visible:w-32 focus-visible:bg-purple-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 ${className}`}
  >
    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
      {children}
    </span>
    <span className="ml-2 whitespace-nowrap text-sm font-semibold opacity-0 translate-x-2 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
      {label}
    </span>
  </button>
);

export default function GamePage() {
  // States
  const [gameState, setGameState] = useState<GameState>("mainMenu");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [player, setPlayer] = useState<PlayerStats>(defaultPlayerStats);
  const [currentLocation, setCurrentLocation] = useState<string>("Bedroom");
  const [hour, setHour] = useState<number>(START_HOUR);
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(START_DAY);

  const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null);
  const [hasManualSave, setHasManualSave] = useState<boolean>(false);
  const [hasAutoSave, setHasAutoSave] = useState<boolean>(false);
  const darkMode = true;
  const hasAnySaveData = hasManualSave || hasAutoSave;

  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [dialogueCharacterImage, setDialogueCharacterImage] =
    useState<string>("");
  const [dialogueCharacterImageLocationOverride, setDialogueCharacterImageLocationOverride] =
    useState<string | null>(null);
  const [dialogueGirlEffects, setDialogueGirlEffects] =
    useState<Partial<GirlStats> | null>(null);
  const [dialogueGirlName, setDialogueGirlName] = useState<string>("");

  const [metCharacters, setMetCharacters] = useState<Set<string>>(new Set());
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showWhereMenu, setShowWhereMenu] = useState<boolean>(false);
  const [showActivitiesMenu, setShowActivitiesMenu] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [textSpeed, setTextSpeed] = useState<"normal" | "instant">("instant");
  const [isDialogueClosing, setIsDialogueClosing] = useState<boolean>(false);
  const [isLocationTransitioning, setIsLocationTransitioning] =
    useState<boolean>(false);
  const transitionDurationMs = 200;

  const [girlStatsOverrides, setGirlStatsOverrides] = useState<
    Record<string, Partial<GirlStats>>
  >({});
  const [characterEventStates, setCharacterEventStates] = useState<
    Record<string, CharacterEventState>
  >({});
  const [gameplayFlags, setGameplayFlags] = useState<Set<GameplayFlag>>(
    new Set(),
  );
  const [dailyWorkoutState, setDailyWorkoutState] = useState<DailyWorkoutState>(
    {
      day: START_DAY,
      total: 0,
      withRuby: 0,
      withoutRuby: 0,
    },
  );
  const [rubyWorkoutTotal, setRubyWorkoutTotal] = useState<number>(0);
  const [testingEnvironment, setTestingEnvironment] =
    useState<TestingEnvironment>("casual");
  const [gameNotices, setGameNotices] = useState<GameNoticeItem[]>([]);
  const [activeGameConfirm, setActiveGameConfirm] =
    useState<PendingGameConfirm | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState<boolean>(false);
  const [debugCharacterName, setDebugCharacterName] = useState<string>("Yumi");
  const [debugEventId, setDebugEventId] = useState<string>("");
  const [debugTravelLocation, setDebugTravelLocation] =
    useState<string>("Bedroom");
  const [debugFreezeVitals, setDebugFreezeVitals] = useState<boolean>(false);
  const [debugIrisSkipCheckpoint, setDebugIrisSkipCheckpoint] =
    useState<IrisSkipCheckpoint>("ch2_complete");
  const [debugIrisRoute, setDebugIrisRoute] = useState<IrisRouteChoice>("middle");
  const [debugIrisCoffeeChoice, setDebugIrisCoffeeChoice] =
    useState<IrisCoffeeChoice>("accepted");
  const [debugIrisPublicChoice, setDebugIrisPublicChoice] =
    useState<IrisPublicChoice>("accept");
  const [debugIrisDomDeniedResolution, setDebugIrisDomDeniedResolution] =
    useState<IrisDomDeniedResolution>("exclusive");
  const [debugIrisC3Outcome, setDebugIrisC3Outcome] =
    useState<IrisC3Outcome>("keep_locked");
  const [debugIrisC3TargetRoute, setDebugIrisC3TargetRoute] =
    useState<IrisRouteChoice>("middle");
  const [debugIrisKissedAnotherGirl, setDebugIrisKissedAnotherGirl] =
    useState<boolean>(false);
  const noticeIdRef = useRef(0);
  const confirmIdRef = useRef(0);
  const confirmQueueRef = useRef<PendingGameConfirm[]>([]);
  const irisKissOthersPromptedRef = useRef(false);
  const dawnFallbackAutoTriggeredRef = useRef(false);
  const dawnSummonAutoTriggeredRef = useRef(false);
  const npcDateInviteProcessedDayRef = useRef<number | null>(null);
  const pendingAutoSaveRef = useRef(false);
  const imagePreloadStartedRef = useRef(false);

  const applyDebugVitalsProtection = useCallback(
    (nextPlayer: PlayerStats, previousPlayer: PlayerStats): PlayerStats => {
      if (!debugFreezeVitals) {
        return nextPlayer;
      }

      return withDerivedMood({
        ...nextPlayer,
        energy: Math.max(nextPlayer.energy, previousPlayer.energy),
        hunger: Math.min(nextPlayer.hunger, previousPlayer.hunger),
      });
    },
    [debugFreezeVitals],
  );

  const setPlayerWithDebugProtection = useCallback(
    (update: PlayerStats | ((previousPlayer: PlayerStats) => PlayerStats)) => {
      setPlayer((previousPlayer) => {
        const nextPlayer =
          typeof update === "function"
            ? (update as (previousPlayer: PlayerStats) => PlayerStats)(
                previousPlayer,
              )
            : update;
        return applyDebugVitalsProtection(nextPlayer, previousPlayer);
      });
    },
    [applyDebugVitalsProtection],
  );

  const resolveGameConfirm = useCallback((confirmed: boolean) => {
    setActiveGameConfirm((current) => {
      if (!current) return null;
      current.resolve(confirmed);
      return confirmQueueRef.current.shift() ?? null;
    });
  }, []);

  useEffect(() => {
    if (imagePreloadStartedRef.current) return;
    imagePreloadStartedRef.current = true;
    startImageManifestPreload();
  }, []);

  useEffect(() => {
    const handleNoticeEvent = (event: Event) => {
      const detail = (event as CustomEvent<GameNoticePayload>).detail;
      if (!detail?.message) return;

      const id = noticeIdRef.current++;
      const notice: GameNoticeItem = {
        id,
        message: detail.message,
        tone: detail.tone ?? "info",
        isLeaving: false,
      };
      const durationMs = 3000;
      const fadeDurationMs = 700;
      const fadeStartMs = Math.max(0, durationMs - fadeDurationMs);

      setGameNotices((prev) => [...prev, notice]);
      window.setTimeout(() => {
        setGameNotices((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  isLeaving: true,
                }
              : item,
          ),
        );
      }, fadeStartMs);
      window.setTimeout(() => {
        setGameNotices((prev) => prev.filter((item) => item.id !== id));
      }, durationMs);
    };

    const handleConfirmEvent = (event: Event) => {
      const detail = (event as CustomEvent<GameConfirmPayload>).detail;
      if (!detail?.message || typeof detail.resolve !== "function") return;

      const request: PendingGameConfirm = {
        id: confirmIdRef.current++,
        message: detail.message,
        confirmLabel: detail.confirmLabel ?? "Confirm",
        cancelLabel: detail.cancelLabel ?? "Cancel",
        resolve: detail.resolve,
      };

      setActiveGameConfirm((current) => {
        if (!current) return request;
        confirmQueueRef.current.push(request);
        return current;
      });
    };

    window.addEventListener(GAME_NOTICE_EVENT, handleNoticeEvent as EventListener);
    window.addEventListener(
      GAME_CONFIRM_EVENT,
      handleConfirmEvent as EventListener,
    );

    return () => {
      window.removeEventListener(
        GAME_NOTICE_EVENT,
        handleNoticeEvent as EventListener,
      );
      window.removeEventListener(
        GAME_CONFIRM_EVENT,
        handleConfirmEvent as EventListener,
      );
    };
  }, []);

  const getProgressionCount = useCallback(
    (girlName: string) => {
      const state = characterEventStates[girlName];
      const historyCount = state?.eventHistory?.length ?? 0;
      const metFlag = getMetFlagForGirl(girlName);
      const hasMet = metFlag ? gameplayFlags.has(metFlag) : false;
      return Math.max(historyCount, hasMet ? 1 : 0);
    },
    [characterEventStates, gameplayFlags],
  );

  const getRelationshipCaps = useCallback(
    (girlName: string) => {
      const progressionCount = getProgressionCount(girlName);
      let affectionCap = clampValue(progressionCount * 5, 0, 100);
      if (girlName === "Iris") {
        if (gameplayFlags.has("irisCh2Ev2_Done")) {
          affectionCap = Math.max(affectionCap, 20);
        } else if (gameplayFlags.has("irisCh2Ev1_Done")) {
          affectionCap = Math.max(affectionCap, 15);
        }
      }
      const lustCap = clampValue(Math.floor(affectionCap * 1.25), 0, 100);
      return { affectionCap, lustCap };
    },
    [getProgressionCount, gameplayFlags],
  );

  const clampGirlStatsToCaps = useCallback(
    (girlName: string, stats: GirlStats) => {
      const { affectionCap, lustCap } = getRelationshipCaps(girlName);
      return {
        ...stats,
        affection: clampValue(stats.affection ?? 0, 0, affectionCap),
        lust: clampValue(stats.lust ?? 0, 0, lustCap),
        dominance: clampValue(stats.dominance ?? 0, -100, 100),
      };
    },
    [getRelationshipCaps],
  );

  const applyGirlStatDelta = useCallback(
    (girlName: string, delta: Partial<GirlStats>) => {
      const baseGirl = baseGirls.find((girl) => girl.name === girlName);
      if (!baseGirl) return;

      setGirlStatsOverrides((prev) => {
        const currentStats = {
          ...baseGirl.stats,
          ...(prev[girlName] ?? {}),
        };
        const nextStats: GirlStats = { ...currentStats };
        Object.entries(delta).forEach(([key, value]) => {
          if (typeof value !== "number") return;
          const statKey = key as keyof GirlStats;
          nextStats[statKey] = (currentStats[statKey] ?? 0) + value;
        });
        const capped = clampGirlStatsToCaps(girlName, nextStats);
        return { ...prev, [girlName]: capped };
      });
    },
    [clampGirlStatsToCaps],
  );

  const logWorkout = useCallback(
    (withRuby: boolean) => {
      setDailyWorkoutState((prev) => {
        const isToday = prev.day === dayOfWeek;
        const base = isToday
          ? prev
          : { day: dayOfWeek, total: 0, withRuby: 0, withoutRuby: 0 };
        return {
          day: dayOfWeek,
          total: base.total + 1,
          withRuby: base.withRuby + (withRuby ? 1 : 0),
          withoutRuby: base.withoutRuby + (withRuby ? 0 : 1),
        };
      });
      if (withRuby) {
        setRubyWorkoutTotal((prev) => prev + 1);
      }
    },
    [dayOfWeek],
  );

  // 🎲 Track active random event
  const [currentRandomEvent, setCurrentRandomEvent] =
    useState<RandomEvent | null>(null);

  // Characters lock status
  const [characterUnlocks, setCharacterUnlocks] = useState<{
    Yumi: boolean;
    Gwen: boolean;
    Dawn: boolean;
    Ruby: boolean;
  }>({
    Yumi: false,
    Gwen: false,
    Dawn: false,
    Ruby: false,
  });

  // ☕ Track scheduled encounters
  const [scheduledEncounters, setScheduledEncounters] = useState<
    ScheduledEncounter[]
  >([]);
  const [interactionHistory, setInteractionHistory] = useState<
    Record<string, Set<string>>
  >({});
  const [messagesByCharacter, setMessagesByCharacter] = useState<
    Record<string, PhoneMessage[]>
  >({});
  const [galleryUnlocks, setGalleryUnlocks] = useState<GalleryUnlock[]>([]);
  const [messageActionHistory, setMessageActionHistory] = useState<
    Record<string, PhoneMessageAction[]>
  >({});
  const [calendarMilestones, setCalendarMilestones] = useState<
    CalendarMilestoneEntry[]
  >([]);
  const [lastPlayerDateAskDayByCharacter, setLastPlayerDateAskDayByCharacter] =
    useState<Record<string, number>>({});
  const [lastAutoDateAskDayByCharacter, setLastAutoDateAskDayByCharacter] =
    useState<Record<string, number>>({});
  const [randomEventDailyCounts, setRandomEventDailyCounts] = useState<
    Record<string, number>
  >({});
  const [dayCount, setDayCount] = useState<number>(0);
  const [dailyNonStoryRandomEventIds, setDailyNonStoryRandomEventIds] =
    useState<string[]>([]);
  const [nonStoryRandomEventLastTriggeredDay, setNonStoryRandomEventLastTriggeredDay] =
    useState<Record<string, number>>({});
  const [hungerProgressRemainder, setHungerProgressRemainder] =
    useState<number>(0);

  const getIrisEventGameTime = useCallback(
    (eventId: string): number | null => {
      const irisState = characterEventStates.Iris;
      const history = irisState?.eventHistory.find(
        (entry) => entry.eventId === eventId && entry.timesTriggered > 0,
      );
      if (!history) return null;

      const gameTime = history.lastTriggered?.gameTime;
      return typeof gameTime === "number" && Number.isFinite(gameTime)
        ? gameTime
        : null;
    },
    [characterEventStates],
  );

  const getDawnSummonTargetGameTime = useCallback((): number | null => {
    if (
      !gameplayFlags.has("dawnSummonQueued") ||
      gameplayFlags.has("dawnSummonTriggered")
    ) {
      return null;
    }

    if (gameplayFlags.has("dawnSummonQueuedTonight")) {
      const fallbackTime = getIrisEventGameTime("iris_c3_ev2_dawn_callout_fallback");
      if (fallbackTime === null) return null;
      const fallbackDay = Math.floor(fallbackTime / 24);
      const fallbackHour = fallbackTime % 24;
      const targetDay = fallbackHour < 23 ? fallbackDay : fallbackDay + 1;
      return targetDay * 24 + 23;
    }

    if (gameplayFlags.has("dawnSummonQueuedFromKiss")) {
      const kissArmTime = getIrisEventGameTime("iris_c3_ev2_kiss_arm");
      if (kissArmTime === null) return null;
      const kissDay = Math.floor(kissArmTime / 24);
      return (kissDay + 1) * 24 + 23;
    }

    return null;
  }, [gameplayFlags, getIrisEventGameTime]);

  const getHoursUntilDawnSummon = useCallback(
    (requestedHours: number): number | null => {
      if (requestedHours <= 0) return null;

      const targetGameTime = getDawnSummonTargetGameTime();
      if (targetGameTime === null) return null;

      const currentGameTime = calculateGameTime(dayOfWeek, hour, dayCount);
      if (targetGameTime <= currentGameTime) return null;

      const deltaHours = targetGameTime - currentGameTime;
      if (deltaHours <= requestedHours) {
        return deltaHours;
      }
      return null;
    },
    [dayCount, dayOfWeek, getDawnSummonTargetGameTime, hour],
  );

  // time
  const spendTime = (
    amount: number,
    basePlayer?: PlayerStats,
    options?: SpendTimeOptions,
  ) => {
    const summonInterruptHours = getHoursUntilDawnSummon(amount);
    const effectiveAmount =
      summonInterruptHours !== null && summonInterruptHours > 0
        ? summonInterruptHours
        : amount;
    const newHour = hour + effectiveAmount;
    const wrappedHour = ((newHour % MAX_HOUR) + MAX_HOUR) % MAX_HOUR;
    const daysElapsed = Math.floor(newHour / MAX_HOUR);
    const scaleBasePlayerWithTime = options?.scaleBasePlayerWithTime ?? false;
    let incomingPlayer = basePlayer ?? player;
    if (
      scaleBasePlayerWithTime &&
      basePlayer &&
      amount > 0 &&
      effectiveAmount < amount
    ) {
      const ratio = effectiveAmount / amount;
      const scaleStat = (
        stat: keyof Pick<
          PlayerStats,
          | "energy"
          | "mood"
          | "hunger"
          | "hygiene"
          | "sobriety"
          | "fitness"
          | "intelligence"
          | "style"
          | "money"
        >,
      ) => {
        const start = player[stat];
        const target = basePlayer[stat];
        const delta = target - start;
        return Math.round(start + delta * ratio);
      };

      incomingPlayer = {
        ...basePlayer,
        energy: scaleStat("energy"),
        mood: scaleStat("mood"),
        hunger: scaleStat("hunger"),
        hygiene: scaleStat("hygiene"),
        sobriety: scaleStat("sobriety"),
        fitness: scaleStat("fitness"),
        intelligence: scaleStat("intelligence"),
        style: scaleStat("style"),
        money: scaleStat("money"),
      };
    }
    const effectivePlayer = applyDebugVitalsProtection(incomingPlayer, player);
    const skipHungerGain = (options?.skipHungerGain ?? false) || debugFreezeVitals;
    const hungerGainMultiplier = Math.max(
      0,
      options?.hungerGainMultiplier ?? 1,
    );
    const elapsedHours = effectiveAmount;
    const rawHungerGain = skipHungerGain
      ? hungerProgressRemainder
      : elapsedHours * HUNGER_GAIN_PER_HOUR * hungerGainMultiplier +
        hungerProgressRemainder;
    const hungerGain = skipHungerGain ? 0 : Math.floor(rawHungerGain);
    const nextHunger = skipHungerGain
      ? effectivePlayer.hunger
      : Math.min(100, effectivePlayer.hunger + hungerGain);
    const nextHungerRemainder = skipHungerGain
      ? hungerProgressRemainder
      : nextHunger >= 100
        ? 0
        : rawHungerGain - hungerGain;

    if (!skipHungerGain) {
      setHungerProgressRemainder(nextHungerRemainder);
    }

    if (daysElapsed > 0) {
      const nextDay = getAdvancedDay(dayOfWeek, daysElapsed);
      const nextDayCount = dayCount + daysElapsed;
      const nextDayRestedPlayer = withDerivedMood({
        ...effectivePlayer,
        energy: Math.min(100, effectivePlayer.energy + 30),
        hunger: nextHunger,
        sobriety: 100,
      });
      const nextDayNonStoryRandomEvents = rollDailyNonStoryRandomEventIds({
        day: nextDay,
        player: nextDayRestedPlayer,
        gameplayFlags,
        girls: baseGirls,
        cooldownByEventId: nonStoryRandomEventLastTriggeredDay,
        currentDayCount: nextDayCount,
        maxEventsPerDay: 2,
        cooldownDays: 7,
      });

      setHour(wrappedHour);
      setDayOfWeek(nextDay);
      setDayCount(nextDayCount);
      setDailyNonStoryRandomEventIds(nextDayNonStoryRandomEvents);

      setPlayerWithDebugProtection(nextDayRestedPlayer);

      // Clear selected girl when day changes
      setSelectedGirl(null);
      setInteractionHistory({});
      setMessageActionHistory({});
      setRandomEventDailyCounts({});
      setDailyWorkoutState({
        day: nextDay,
        total: 0,
        withRuby: 0,
        withoutRuby: 0,
      });

      if (nextDayNonStoryRandomEvents.length > 0) {
        console.log(
          `🎲 Daily non-story random events scheduled (${nextDayNonStoryRandomEvents.length}):`,
          nextDayNonStoryRandomEvents.join(", "),
        );
      } else {
        console.log("🎲 No non-story random events scheduled for today.");
      }

      showGameNotice(`A new day begins! It's ${nextDay} at ${wrappedHour}:00.`, {
        tone: "info",
        durationMs: 3500,
      });
    } else {
      setHour(newHour);
      setPlayerWithDebugProtection(
        withDerivedMood({
          ...effectivePlayer,
          hunger: nextHunger,
        }),
      );
    }
  };

  const handleSobrietyBlackout = useCallback(
    (playerAtBlackout: PlayerStats) => {
      if (playerAtBlackout.sobriety > SOBRIETY_BLACKOUT_THRESHOLD) {
        return;
      }

      const nextDay = getNextDay(dayOfWeek);
      const nextDayCount = dayCount + 1;
      const recoveredPlayer = withDerivedMood({
        ...playerAtBlackout,
        energy: Math.min(100, playerAtBlackout.energy + 40),
        hunger: Math.floor(playerAtBlackout.hunger / 2),
        sobriety: 100,
      });
      const nextDayNonStoryRandomEvents = rollDailyNonStoryRandomEventIds({
        day: nextDay,
        player: recoveredPlayer,
        gameplayFlags,
        girls: baseGirls,
        cooldownByEventId: nonStoryRandomEventLastTriggeredDay,
        currentDayCount: nextDayCount,
        maxEventsPerDay: 2,
        cooldownDays: 7,
      });

      setPlayerWithDebugProtection(recoveredPlayer);
      setCurrentLocation("Bedroom");
      setHour(START_HOUR);
      setDayOfWeek(nextDay);
      setDayCount(nextDayCount);
      setDailyNonStoryRandomEventIds(nextDayNonStoryRandomEvents);
      setHungerProgressRemainder(0);

      setSelectedGirl(null);
      setInteractionHistory({});
      setMessageActionHistory({});
      setRandomEventDailyCounts({});
      setCurrentRandomEvent(null);
      setDailyWorkoutState({
        day: nextDay,
        total: 0,
        withRuby: 0,
        withoutRuby: 0,
      });

      pendingAutoSaveRef.current = true;
      showGameNotice(
        "You drank too much, passed out, and woke up in your bed at 8:00 AM.",
        {
          tone: "warning",
          durationMs: 4000,
        },
      );
    },
    [
      dayCount,
      dayOfWeek,
      gameplayFlags,
      nonStoryRandomEventLastTriggeredDay,
      setPlayerWithDebugProtection,
    ],
  );

  const meetsDateOutcomeConditions = useCallback(
    (
      outcome: DateOutcome,
      girl: Girl,
      currentPlayer: PlayerStats,
    ): boolean => {
      const conditions = outcome.conditions;
      if (!conditions) return true;

      if (
        conditions.minAffection !== undefined &&
        girl.stats.affection < conditions.minAffection
      ) {
        return false;
      }
      if (
        conditions.minMood !== undefined &&
        girl.stats.mood < conditions.minMood
      ) {
        return false;
      }
      if (
        conditions.minPlayerIntelligence !== undefined &&
        currentPlayer.intelligence < conditions.minPlayerIntelligence
      ) {
        return false;
      }
      if (
        conditions.minPlayerStyle !== undefined &&
        currentPlayer.style < conditions.minPlayerStyle
      ) {
        return false;
      }
      if (
        conditions.minPlayerFitness !== undefined &&
        currentPlayer.fitness < conditions.minPlayerFitness
      ) {
        return false;
      }

      return true;
    },
    [],
  );

  const pickDateOutcome = useCallback(
    (activity: DateActivity, girl: Girl, currentPlayer: PlayerStats) => {
      const eligibleOutcomes = activity.outcomes.filter((outcome) =>
        meetsDateOutcomeConditions(outcome, girl, currentPlayer),
      );
      const pool =
        eligibleOutcomes.length > 0 ? eligibleOutcomes : activity.outcomes;
      if (pool.length === 0) {
        return null;
      }

      const totalWeight = pool.reduce(
        (sum, outcome) => sum + Math.max(1, outcome.weight),
        0,
      );
      let roll = Math.random() * totalWeight;
      for (const outcome of pool) {
        roll -= Math.max(1, outcome.weight);
        if (roll <= 0) {
          return outcome;
        }
      }

      return pool[pool.length - 1];
    },
    [meetsDateOutcomeConditions],
  );

  const getEncounterAbsoluteDayCount = useCallback(
    (targetDay: DayOfWeek, targetHour: number) => {
      const currentIndex = DAYS_OF_WEEK.indexOf(dayOfWeek);
      const targetIndex = DAYS_OF_WEEK.indexOf(targetDay);
      if (currentIndex === -1 || targetIndex === -1) {
        return dayCount;
      }

      let offset = (targetIndex - currentIndex + DAYS_OF_WEEK.length) % DAYS_OF_WEEK.length;
      if (offset === 0 && targetHour < hour) {
        offset = DAYS_OF_WEEK.length;
      }
      return dayCount + offset;
    },
    [dayCount, dayOfWeek, hour],
  );

  const recordCalendarMilestone = useCallback(
    (characterName: string, type: CalendarMilestoneType, note: string) => {
      setCalendarMilestones((prev) => {
        const alreadyRecorded = prev.some(
          (entry) =>
            entry.characterName === characterName &&
            entry.type === type,
        );
        if (alreadyRecorded) return prev;

        return [
          ...prev,
          {
            id: `milestone_${characterName}_${type}_${dayCount}_${hour}_${Date.now()}`,
            characterName,
            type,
            dayOfWeek,
            dayCount,
            hour,
            note,
          },
        ];
      });
    },
    [dayCount, dayOfWeek, hour],
  );

  const buildRandomDatePlan = useCallback(
    (characterName: string, girl: Girl, source: DateScheduleSource) => {
      const shuffledLocations = [...dateLocationOrder].sort(
        () => Math.random() - 0.5,
      );
      let selectedLocation: DateLocation | null = null;
      let selectedActivities: string[] = [];

      for (const location of shuffledLocations) {
        const activities = (dateActivitiesByLocation[location] ?? []).filter(
          (entry) => {
            if (!entry.requirements) return true;
            if (
              entry.requirements.minAffection !== undefined &&
              girl.stats.affection < entry.requirements.minAffection
            ) {
              return false;
            }
            if (
              entry.requirements.minLove !== undefined &&
              girl.stats.love < entry.requirements.minLove
            ) {
              return false;
            }
            if (
              entry.requirements.minPlayerStat?.stat === "money" &&
              player.money < entry.requirements.minPlayerStat.value
            ) {
              return false;
            }
            return true;
          },
        );
        if (activities.length === 0) {
          continue;
        }

        selectedLocation = location;
        selectedActivities = [activities[Math.floor(Math.random() * activities.length)].id];
        break;
      }

      if (!selectedLocation || selectedActivities.length === 0) {
        return null;
      }

      let selectedDayCount = dayCount + (Math.floor(Math.random() * 6) + 1);
      let selectedDay = getDayOfWeekFromDayCount(selectedDayCount);
      let selectedHour = 12 + Math.floor(Math.random() * 10);

      for (let attempts = 0; attempts < 40; attempts += 1) {
        const slotTaken = scheduledEncounters.some((entry) => {
          if (!entry.day || entry.hour === undefined) return false;
          const encounterDay = entry.day as DayOfWeek;
          return (
            getEncounterAbsoluteDayCount(encounterDay, entry.hour) === selectedDayCount &&
            entry.hour === selectedHour
          );
        });
        if (!slotTaken) {
          break;
        }

        selectedDayCount += 1;
        selectedDay = getDayOfWeekFromDayCount(selectedDayCount);
        selectedHour = 12 + Math.floor(Math.random() * 10);
      }

      return {
        characterName,
        location: selectedLocation,
        day: selectedDay,
        hour: selectedHour,
        activities: selectedActivities,
        eventId: `date_${source}_${characterName}_${selectedDayCount}_${selectedHour}_${Date.now()}`,
        label:
          source === "npc"
            ? `${characterName} asked you out (${selectedLocation})`
            : `${characterName} Date (${selectedLocation})`,
      };
    },
    [
      dayCount,
      getEncounterAbsoluteDayCount,
      player.money,
      scheduledEncounters,
    ],
  );

  // Schedule a new encounter
  const scheduleEncounter = (encounter: ScheduledEncounter) => {
    setScheduledEncounters((prev) => {
      // Avoid duplicates
      const exists = prev.some(
        (e) =>
          e.characterName === encounter.characterName &&
          e.eventId === encounter.eventId,
      );
      if (exists) return prev;

      console.log(
        `📅 Scheduled: ${encounter.label || "encounter"} with ${
          encounter.characterName
        } at ${encounter.location}${
          encounter.day ? ` on ${encounter.day} at ${encounter.hour}:00` : ""
        }`,
      );
      return [...prev, encounter];
    });
  };

  // Handler specifically for dates
  const scheduleDateEncounter = useCallback(
    (
      date: {
        characterName: string;
        location: DateLocation;
        day: DayOfWeek;
        hour: number;
        activities: string[];
        eventId: string;
        label: string;
      },
      source: DateScheduleSource = "player",
    ) => {
      if (!dateLocationInfo[date.location]) {
        showGameNotice("That date location is not available.", { tone: "warning" });
        return false;
      }

      const targetDayCount = getEncounterAbsoluteDayCount(date.day, date.hour);
      const duplicate = scheduledEncounters.some(
        (entry) => {
          if (!entry.day || entry.hour === undefined) return false;
          const encounterDayCount = getEncounterAbsoluteDayCount(
            entry.day as DayOfWeek,
            entry.hour,
          );
          return (
            encounterDayCount === targetDayCount && entry.hour === date.hour
          );
        },
      );
      if (duplicate) {
        showGameNotice("You already have a date scheduled in that slot.", {
          tone: "warning",
        });
        return false;
      }

      setScheduledEncounters((prev) => [
        ...prev,
        {
          characterName: date.characterName,
          location: date.location,
          eventId: date.eventId,
          label: date.label,
          day: date.day,
          hour: date.hour,
          activities: date.activities,
          source,
        },
      ]);

      if (source === "player") {
        setLastPlayerDateAskDayByCharacter((prev) => ({
          ...prev,
          [date.characterName]: dayCount,
        }));
      }
      if (source === "npc") {
        setLastAutoDateAskDayByCharacter((prev) => ({
          ...prev,
          [date.characterName]: dayCount,
        }));
      }

      console.log(
        `Date scheduled: ${date.label} with ${date.characterName} on ${date.day} at ${date.hour}:00`,
      );
      return true;
    },
    [dayCount, getEncounterAbsoluteDayCount, scheduledEncounters],
  );

  const handleScheduleDate = useCallback(
    (date: {
      characterName: string;
      location: DateLocation;
      day: DayOfWeek;
      hour: number;
      activities: string[];
      eventId: string;
      label: string;
    }) => {
      scheduleDateEncounter(date, "player");
    },
    [scheduleDateEncounter],
  );

  const handleSendMessageAction = useCallback(
    (characterName: string, action: PhoneMessageAction) => {
      const baseGirl = baseGirls.find(
        (candidate) => candidate.name === characterName,
      );
      if (!baseGirl) {
        showGameNotice(`${characterName} is not available right now.`, {
          tone: "warning",
        });
        return;
      }
      const girl: Girl = {
        ...baseGirl,
        stats: clampGirlStatsToCaps(characterName, {
          ...baseGirl.stats,
          ...(girlStatsOverrides[characterName] ?? {}),
        }),
      };

      const eventState = characterEventStates[characterName] ?? {
        characterName,
        eventHistory: [],
        lastInteractionTime: 0,
      };
      const chapter = getCharacterInteractionChapterForState(
        characterName,
        gameplayFlags,
        eventState,
      );

      const historyKey = `${dayCount}:${characterName}`;
      const usedActions = messageActionHistory[historyKey] ?? [];
      if (usedActions.includes(action)) {
        showGameNotice(
          `You've already used "${action}" with ${characterName} today.`,
          { tone: "info" },
        );
        return;
      }

      const playerText = getPlayerMessageText(action);
      let characterReply = getCharacterMessageReply(characterName, action, chapter);
      const now = Date.now();
      const threadEntries: PhoneMessage[] = [
        {
          id: `msg_${characterName.toLowerCase()}_${now}_player`,
          characterName,
          sender: "player",
          text: playerText,
          action,
          dayOfWeek,
          dayCount,
          hour,
        },
      ];

      const playerDelta: Partial<PlayerStats> = {};
      let girlDelta: Partial<GirlStats> = {};
      let romanceActionSucceeded = true;

      if (action === "chat") {
        playerDelta.mood = 1;
        girlDelta = { affection: 1, mood: 2 };
      } else if (action === "flirt" || action === "sext") {
        const intensity = action === "sext" ? "sext" : "flirt";
        const successChance = getPhoneRomanceSuccessChance(
          girl.stats,
          chapter,
          intensity,
        );
        romanceActionSucceeded = Math.random() * 100 <= successChance;

        if (romanceActionSucceeded) {
          if (action === "flirt") {
            playerDelta.mood = 1;
            playerDelta.style = 1;
            girlDelta = { affection: 1, lust: 2, mood: 1 };
          } else {
            playerDelta.mood = 2;
            girlDelta = { affection: 1, lust: 4 };
          }
        } else {
          characterReply = getPhoneRomanceFailureReply(characterName, action);
          playerDelta.mood = -1;
          girlDelta =
            action === "flirt"
              ? { mood: -1 }
              : { mood: -2, affection: -1 };
          showGameNotice(`${characterName} did not respond well to that.`, {
            tone: "info",
          });
        }
      } else if (action === "date") {
        const canAskForDate = chapter <= 2 && girl.stats.affection >= 15;
        const acceptanceChance = Math.min(
          95,
          Math.max(
            25,
            38 +
              girl.stats.affection / 2 +
              girl.stats.love / 2 +
              girl.stats.lust / 6,
          ),
        );
        const accepted = canAskForDate && Math.random() * 100 <= acceptanceChance;

        if (accepted) {
          const location =
            MESSAGE_DATE_LOCATION_BY_CHARACTER[characterName] ?? "Cafe";
          const dateActivities = dateActivitiesByLocation[location] ?? [];
          const selectedActivityIds = dateActivities
            .filter((entry) => {
              if (!entry.requirements) return true;
              if (
                entry.requirements.minAffection !== undefined &&
                girl.stats.affection < entry.requirements.minAffection
              ) {
                return false;
              }
              if (
                entry.requirements.minLove !== undefined &&
                girl.stats.love < entry.requirements.minLove
              ) {
                return false;
              }
              if (
                entry.requirements.minPlayerStat?.stat === "money" &&
                player.money < entry.requirements.minPlayerStat.value
              ) {
                return false;
              }
              return true;
            })
            .slice(0, 1)
            .map((entry) => entry.id);

          if (selectedActivityIds.length === 0 && dateActivities[0]) {
            selectedActivityIds.push(dateActivities[0].id);
          }

          let scheduledDay = dayOfWeek;
          let scheduledHour = Math.max(12, Math.min(21, hour + 2));
          if (hour >= 21) {
            scheduledDay = getNextDay(dayOfWeek);
            scheduledHour = 18;
          }

          for (let attempts = 0; attempts < 21; attempts += 1) {
            const slotTaken = scheduledEncounters.some(
              (entry) => entry.day === scheduledDay && entry.hour === scheduledHour,
            );
            if (!slotTaken) break;
            scheduledHour += 2;
            if (scheduledHour > 21) {
              scheduledHour = 12;
              scheduledDay = getNextDay(scheduledDay);
            }
          }

          const didSchedule = scheduleDateEncounter({
            characterName,
            location,
            day: scheduledDay,
            hour: scheduledHour,
            activities: selectedActivityIds,
            eventId: `date_msg_${characterName}_${dayCount}_${hour}_${now}`,
            label: `${characterName} Date (${location})`,
          });
          if (didSchedule) {
            const displayHour =
              scheduledHour > 12
                ? `${scheduledHour - 12}:00 PM`
                : `${scheduledHour}:00 ${scheduledHour === 12 ? "PM" : "AM"}`;
            characterReply = `${characterReply} ${scheduledDay} at ${displayHour} works for me.`;
            showGameNotice(`${characterName} accepted your date request.`, {
              tone: "success",
            });
            playerDelta.mood = 2;
            girlDelta = { affection: 2, love: 1, mood: 2 };
          } else {
            characterReply = "I am in, but we need to pick another slot.";
            playerDelta.mood = 0;
            girlDelta = { mood: 1 };
          }
        } else {
          characterReply =
            chapter > 2
              ? "We've moved past date plans like that."
              : "Not tonight. Ask me again another day.";
          playerDelta.mood = -1;
          girlDelta = { mood: -1 };
          showGameNotice(`${characterName} declined the date request.`, {
            tone: "info",
          });
        }
      }

      threadEntries.push({
        id: `msg_${characterName.toLowerCase()}_${now}_character`,
        characterName,
        sender: "character",
        text: characterReply,
        action,
        dayOfWeek,
        dayCount,
        hour,
      });

      const shouldRollForPhoto =
        action === "sext" &&
        romanceActionSucceeded &&
        Math.random() < Math.min(0.65, 0.2 + chapter * 0.08);
      const unlock = shouldRollForPhoto
        ? buildMessageGalleryUnlock(
            characterName,
            action,
            chapter,
            dayOfWeek,
            dayCount,
            hour,
          )
        : null;
      if (unlock) {
        let didAddUnlock = false;
        setGalleryUnlocks((prev) => {
          const exists = prev.some(
            (entry) =>
              entry.characterName === unlock.characterName &&
              entry.imagePath === unlock.imagePath,
          );
          if (exists) return prev;
          didAddUnlock = true;
          return [...prev, unlock];
        });
        if (didAddUnlock) {
          threadEntries.push({
            id: `msg_${characterName.toLowerCase()}_${now}_photo`,
            characterName,
            sender: "character",
            text: "Sent you a photo. Check your gallery.",
            action,
            dayOfWeek,
            dayCount,
            hour,
          });
          showGameNotice(`${characterName} sent you a photo.`, {
            tone: "success",
          });
        }
      }

      setMessagesByCharacter((prev) => ({
        ...prev,
        [characterName]: [...(prev[characterName] ?? []), ...threadEntries],
      }));
      setMessageActionHistory((prev) => ({
        ...prev,
        [historyKey]: [...(prev[historyKey] ?? []), action],
      }));

      if (Object.keys(girlDelta).length > 0) {
        applyGirlStatDelta(characterName, girlDelta);
      }
      if (Object.keys(playerDelta).length > 0) {
        setPlayerWithDebugProtection((prev) =>
          applyPlayerStatDelta(prev, playerDelta),
        );
      }
    },
    [
      applyGirlStatDelta,
      characterEventStates,
      clampGirlStatsToCaps,
      dayCount,
      dayOfWeek,
      gameplayFlags,
      girlStatsOverrides,
      hour,
      messageActionHistory,
      player.money,
      scheduleDateEncounter,
      scheduledEncounters,
      setPlayerWithDebugProtection,
    ],
  );

  // Cancel a specific encounter
  // const _cancelEncounter = (characterName: string, eventId: string) => {
  //   setScheduledEncounters((prev) =>
  //     prev.filter(
  //       (e) => !(e.characterName === characterName && e.eventId === eventId)
  //     )
  //   );
  // };

  // ✅ Update the checkScheduledEncounters function to support day/hour + dates
  const checkScheduledEncounters = (location: string): boolean => {
    const encounter = scheduledEncounters.find((e) => {
      if (e.day && e.hour !== undefined) {
        return e.day === dayOfWeek && e.hour === hour;
      }

      return e.location === location;
    });

    if (!encounter) {
      console.log(`ℹ️ No encounters at ${location}`);
      return false;
    }

    console.log(`✨ Triggering encounter: ${encounter.label || "Event"}`);

    // Remove from scheduled list
    setScheduledEncounters((prev) => prev.filter((e) => e !== encounter));

    // If it's a planned date, resolve outcomes and run the full date scene.
    if (encounter.activities && encounter.activities.length > 0) {
      console.log(`?? Starting date with ${encounter.characterName}`);

      const girl = girls.find((g) => g.name === encounter.characterName);
      const dateLocation = encounter.location as DateLocation;
      const locationInfo = dateLocationInfo[dateLocation];

      if (!girl || !locationInfo) {
        showGameNotice("Date encounter could not be resolved.", {
          tone: "warning",
        });
        return true;
      }

      const allLocationActivities = dateActivitiesByLocation[dateLocation] ?? [];
      const selectedDateActivities = allLocationActivities.filter((activity) =>
        encounter.activities?.includes(activity.id),
      );
      const activitiesToRun =
        selectedDateActivities.length > 0
          ? selectedDateActivities
          : allLocationActivities.slice(0, 1);

      const combinedGirlEffects: Partial<GirlStats> = {};
      type NumericPlayerStatKey = keyof Pick<
        PlayerStats,
        | "energy"
        | "mood"
        | "hunger"
        | "hygiene"
        | "sobriety"
        | "fitness"
        | "intelligence"
        | "style"
        | "money"
      >;
      const combinedPlayerEffects: Partial<Record<NumericPlayerStatKey, number>> = {
        money: -locationInfo.cost,
      };
      const dialogueLines: Dialogue["lines"] = [
        {
          speaker: null,
          text: `You meet ${girl.name} at ${dateLocation} for your planned date.`,
        },
        {
          speaker: girl.name,
          text: "Glad you made it. Let's make this night count.",
          expression: "happy",
        },
      ];

      const addGirlEffect = (key: keyof GirlStats, amount: number) => {
        combinedGirlEffects[key] = (combinedGirlEffects[key] ?? 0) + amount;
      };
      const addPlayerEffect = (key: NumericPlayerStatKey, amount: number) => {
        const current = combinedPlayerEffects[key];
        const currentNumber = typeof current === "number" ? current : 0;
        combinedPlayerEffects[key] = currentNumber + amount;
      };

      activitiesToRun.forEach((activity) => {
        const outcome = pickDateOutcome(activity, girl, player);
        if (!outcome) return;

        dialogueLines.push({
          speaker: null,
          text: `${girl.name} and you start with ${activity.name.toLowerCase()}.`,
        });

        outcome.dialogue.lines.forEach((line) => {
          dialogueLines.push({
            ...line,
            speaker: line.speaker === "Girl" ? girl.name : line.speaker,
          });
        });

        if (outcome.effects.girlStats) {
          Object.entries(outcome.effects.girlStats).forEach(([rawKey, rawValue]) => {
            if (typeof rawValue !== "number") return;
            const key = rawKey as keyof GirlStats;
            addGirlEffect(key, rawValue);
          });
        }
        if (outcome.effects.playerStats) {
          Object.entries(outcome.effects.playerStats).forEach(([rawKey, rawValue]) => {
            if (typeof rawValue !== "number") return;
            const key = rawKey as NumericPlayerStatKey;
            addPlayerEffect(key, rawValue);
          });
        }
        if (typeof outcome.effects.playerMoney === "number") {
          addPlayerEffect("money", outcome.effects.playerMoney);
        }
      });

      dialogueLines.push({
        speaker: null,
        text: `The date winds down and you both leave ${dateLocation} with a better read on each other.`,
      });

      const characterImage = getCharacterImage(girl, dateLocation, hour);
      const dateDialogue: Dialogue = {
        id: `${encounter.eventId}_resolved`,
        lines: dialogueLines,
      };

      const dateTimeCost = Math.max(2, activitiesToRun.length * 2);
      const playerAfterDate = applyPlayerStatDelta(
        player,
        combinedPlayerEffects as Partial<PlayerStats>,
      );

      spendTime(dateTimeCost, playerAfterDate);
      recordCalendarMilestone(girl.name, "first_date", "First date together.");
      setFlag("firstDateCompleted");
      showGameNotice(`${girl.name} date complete.`, { tone: "success" });
      startDialogue(
        dateDialogue,
        characterImage,
        combinedGirlEffects,
        girl.name,
        dateLocation,
      );
      return true;
    }

    // Handle regular character events first
    const event = randomEvents.find((e) => e.id === encounter.eventId);

    if (!event) {
      const characterEvents = getCharacterEvents(encounter.characterName);
      const characterEvent = characterEvents.find(
        (e) => e.id === encounter.eventId,
      );

      if (characterEvent) {
        console.log(
          `✨ Triggering scheduled character event: ${
            encounter.label || characterEvent.name
          }`,
        );
        setCurrentRandomEvent(null);

        const characterImage = getCharacterImage(
          girls.find((g) => g.name === encounter.characterName)!,
          getDialogueCharacterImageLocationOverride(characterEvent.id) ??
            currentLocation,
          hour,
        );
        startDialogue(
          injectDawnIntelLines(characterEvent.dialogue, gameplayFlags),
          characterImage,
          characterEvent.rewards?.girlStats ?? null,
          encounter.characterName,
          getDialogueCharacterImageLocationOverride(characterEvent.id),
        );

        const updatedPlayer = applyCharacterEventRewards(
          player,
          characterEvent.rewards,
          {
            onSetFlag: setFlag,
            onUnlockCharacter: (characterName) => {
              const name = characterName as keyof typeof characterUnlocks;
              setCharacterUnlocks((prev) =>
                prev[name] ? prev : { ...prev, [name]: true },
              );
            },
          },
        );
        if (updatedPlayer !== player) {
          setPlayerWithDebugProtection(updatedPlayer);
        }

        return true;
      }
    }

    if (event) {
      console.log(
        `✨ Triggering scheduled encounter: ${encounter.label || event.name}`,
      );
      setCurrentRandomEvent(event);
      recordRandomEventTrigger(event.id);
      startDialogue(event.dialogue, "", null, event.characterName);
      applyRandomEventRewards(event.rewards);
      return true;
    } else {
      console.error(`❌ Event not found: ${encounter.eventId}`);
    }

    return false;
  };

  // mount
  useEffect(() => {
    setIsMounted(true);

    const rawSession = localStorage.getItem(AUTH_SESSION_KEY);
    if (!rawSession) {
      setIsAuthenticated(false);
    } else {
      try {
        const parsed = JSON.parse(rawSession) as unknown;
        if (isValidAuthSession(parsed)) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_SESSION_KEY);
          setIsAuthenticated(false);
        }
      } catch {
        localStorage.removeItem(AUTH_SESSION_KEY);
        setIsAuthenticated(false);
      }
    }
    setAuthChecked(true);

    const manualSave = localStorage.getItem(MANUAL_SAVE_KEY);
    const autoSave = localStorage.getItem(AUTO_SAVE_KEY);
    setHasManualSave(!!manualSave);
    setHasAutoSave(!!autoSave);
    const storedTextSpeed = localStorage.getItem("textSpeed");
    if (storedTextSpeed === "instant" || storedTextSpeed === "normal") {
      setTextSpeed(storedTextSpeed);
    }

    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("textSpeed", textSpeed);
  }, [textSpeed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setGameState((s) =>
        s === "playing" ? "paused" : s === "paused" ? "playing" : s,
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setCharacterUnlocks((prev) => {
      const next = {
        Yumi: gameplayFlags.has("hasMetYumi"),
        Gwen: gameplayFlags.has("hasMetGwen"),
        Dawn: gameplayFlags.has("hasMetDawn") || gameplayFlags.has("hasSeenDawn"),
        Ruby: gameplayFlags.has("hasMetRuby"),
      };

      // Avoid unnecessary re-renders
      if (
        prev.Yumi === next.Yumi &&
        prev.Gwen === next.Gwen &&
        prev.Dawn === next.Dawn &&
        prev.Ruby === next.Ruby
      ) {
        return prev;
      }
      return next;
    });
  }, [gameplayFlags]);
  // girls with schedules + overrides
  const girls = useMemo(() => {
    const withResolvedStats = (girl: Girl, resolvedLocation: string): Girl => {
      const override = girlStatsOverrides[girl.name];
      const mergedStats = override ? { ...girl.stats, ...override } : girl.stats;
      return {
        ...girl,
        location: resolvedLocation,
        stats: clampGirlStatsToCaps(girl.name, mergedStats),
      };
    };

    // Testing location: show every girl at once, always.
    if (currentLocation === TESTING_LOCATION_NAME) {
      const testingStudioGirls = [...baseGirls, ...testingOnlyGirls].filter(
        (girl, index, allGirls) =>
          allGirls.findIndex((candidate) => candidate.name === girl.name) ===
          index,
      );
      return testingStudioGirls.map((girl) =>
        withResolvedStats(girl, TESTING_LOCATION_NAME),
      );
    }

    return baseGirls
      .filter((girl) => {
        // Iris is always available
        if (girl.name === "Iris") return true;

        // Hide Ruby if the flag is set
        if (girl.name === "Ruby" && gameplayFlags.has("rubyIsHiding")) {
          return false;
        }

        // Other characters require unlocking
        if (girl.name === "Yumi") return characterUnlocks.Yumi;
        if (girl.name === "Gwen") return characterUnlocks.Gwen;
        if (girl.name === "Dawn") return characterUnlocks.Dawn;
        if (girl.name === "Ruby") return characterUnlocks.Ruby;

        return true; // Default: show character
      })
      .map((girl) => {
        const scheduledLocation = getScheduledLocation(
          girl.name,
          dayOfWeek,
          hour,
        );
        return withResolvedStats(girl, scheduledLocation || girl.location);
      });
  }, [
    currentLocation,
    dayOfWeek,
    hour,
    girlStatsOverrides,
    characterUnlocks,
    clampGirlStatsToCaps,
    gameplayFlags,
  ]);

  const firstDateMilestoneStartDay = useMemo(() => {
    const firstDateMilestones = calendarMilestones.filter(
      (entry) => entry.type === "first_date",
    );
    if (firstDateMilestones.length === 0) {
      return dayCount;
    }
    return firstDateMilestones.reduce(
      (min, entry) => Math.min(min, entry.dayCount),
      firstDateMilestones[0].dayCount,
    );
  }, [calendarMilestones, dayCount]);

  const calendarPlannedDates = useMemo<CalendarDateEntry[]>(() => {
    return scheduledEncounters
      .filter(
        (encounter) =>
          Boolean(encounter.day) &&
          encounter.hour !== undefined &&
          Boolean(encounter.activities?.length),
      )
      .map((encounter) => {
        const encounterDay = encounter.day as DayOfWeek;
        const encounterHour = encounter.hour as number;
        const source: DateScheduleSource =
          encounter.source ??
          (encounter.eventId.startsWith("date_npc_")
            ? "npc"
            : encounter.eventId.startsWith("date_story_")
              ? "story"
              : "player");

        return {
          id: `calendar_${encounter.eventId}`,
          characterName: encounter.characterName,
          dayOfWeek: encounterDay,
          dayCount: getEncounterAbsoluteDayCount(encounterDay, encounterHour),
          hour: encounterHour,
          location: encounter.location,
          label:
            encounter.label ?? `${encounter.characterName} Date (${encounter.location})`,
          source,
        };
      })
      .sort((left, right) => {
        if (left.dayCount !== right.dayCount) {
          return left.dayCount - right.dayCount;
        }
        if (left.hour !== right.hour) {
          return left.hour - right.hour;
        }
        return left.characterName.localeCompare(right.characterName);
      });
  }, [getEncounterAbsoluteDayCount, scheduledEncounters]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (currentLocation === TESTING_LOCATION_NAME) return;
    if (!gameplayFlags.has("firstDateCompleted")) return;
    if (npcDateInviteProcessedDayRef.current === dayCount) return;
    npcDateInviteProcessedDayRef.current = dayCount;

    const eligibleGirls = girls.filter((girl) => {
      if (!metCharacters.has(girl.name)) return false;
      if (
        girl.name === "Dawn" &&
        !gameplayFlags.has("metDawn") &&
        !gameplayFlags.has("hasMetDawn")
      ) {
        return false;
      }
      const eventState = characterEventStates[girl.name] ?? {
        characterName: girl.name,
        eventHistory: [],
        lastInteractionTime: 0,
      };
      const chapter = getCharacterInteractionChapterForState(
        girl.name,
        gameplayFlags,
        eventState,
      );
      if (chapter > 2) return false;
      return true;
    });
    const overdueGirls = eligibleGirls.filter((girl) => {
      const lastPlayerAskDay =
        lastPlayerDateAskDayByCharacter[girl.name] ?? firstDateMilestoneStartDay;
      const lastAutoAskDay =
        lastAutoDateAskDayByCharacter[girl.name] ?? Number.NEGATIVE_INFINITY;
      const mostRecentAskDay = Math.max(lastPlayerAskDay, lastAutoAskDay);
      return dayCount - mostRecentAskDay >= 14;
    });
    if (overdueGirls.length === 0) return;

    const selectedGirlForInvite =
      overdueGirls[Math.floor(Math.random() * overdueGirls.length)];
    const datePlan = buildRandomDatePlan(
      selectedGirlForInvite.name,
      selectedGirlForInvite,
      "npc",
    );
    if (!datePlan) return;

    const didSchedule = scheduleDateEncounter(datePlan, "npc");
    if (!didSchedule) return;

    const displayHour =
      datePlan.hour > 12
        ? `${datePlan.hour - 12}:00 PM`
        : `${datePlan.hour}:00 ${datePlan.hour === 12 ? "PM" : "AM"}`;
    const now = Date.now();
    const incomingMessage: PhoneMessage = {
      id: `msg_auto_date_${selectedGirlForInvite.name}_${now}_character`,
      characterName: selectedGirlForInvite.name,
      sender: "character",
      text: `It's been a while. Let's meet at ${datePlan.location} on ${datePlan.day} at ${displayHour}.`,
      action: "date",
      dayOfWeek,
      dayCount,
      hour,
    };
    const playerReply: PhoneMessage = {
      id: `msg_auto_date_${selectedGirlForInvite.name}_${now}_player`,
      characterName: selectedGirlForInvite.name,
      sender: "player",
      text: "That works for me. See you there.",
      action: "date",
      dayOfWeek,
      dayCount,
      hour,
    };

    setMessagesByCharacter((prev) => ({
      ...prev,
      [selectedGirlForInvite.name]: [
        ...(prev[selectedGirlForInvite.name] ?? []),
        incomingMessage,
        playerReply,
      ],
    }));

    showGameNotice(
      `${selectedGirlForInvite.name} asked you out. Date set for ${datePlan.day} at ${displayHour}.`,
      { tone: "info" },
    );
  }, [
    buildRandomDatePlan,
    characterEventStates,
    currentLocation,
    dayCount,
    dayOfWeek,
    firstDateMilestoneStartDay,
    gameState,
    gameplayFlags,
    girls,
    hour,
    lastAutoDateAskDayByCharacter,
    lastPlayerDateAskDayByCharacter,
    metCharacters,
    scheduleDateEncounter,
  ]);

  useEffect(() => {
    if (selectedGirl) {
      const stillPresent = girls.find(
        (g) => g.name === selectedGirl.name && g.location === currentLocation,
      );
      if (!stillPresent) {
        setSelectedGirl(null);
      }
    }
  }, [girls, selectedGirl, currentLocation]);

  const debugCharacterOptions = useMemo(
    () => girls.map((girl) => girl.name),
    [girls],
  );

  const debugCharacterEvents = useMemo(
    () =>
      debugCharacterName ? getCharacterEvents(debugCharacterName) : [],
    [debugCharacterName],
  );

  const activeFlags = useMemo(
    () => Array.from(gameplayFlags).sort((a, b) => a.localeCompare(b)),
    [gameplayFlags],
  );

  const maxDebugCharacterStats = useCallback(() => {
    if (!debugCharacterName) return;

    const baseGirl =
      baseGirls.find((candidate) => candidate.name === debugCharacterName) ??
      testingOnlyGirls.find((candidate) => candidate.name === debugCharacterName) ??
      girls.find((candidate) => candidate.name === debugCharacterName);

    if (!baseGirl) {
      showGameNotice(`Could not find character: ${debugCharacterName}`, {
        tone: "error",
      });
      return;
    }

    setGirlStatsOverrides((prev) => {
      const currentStats = {
        ...baseGirl.stats,
        ...(prev[debugCharacterName] ?? {}),
      };
      const maxedStats = clampGirlStatsToCaps(debugCharacterName, {
        ...currentStats,
        affection: 100,
        lust: 100,
        mood: 100,
        love: 100,
        dominance: 100,
      });
      return { ...prev, [debugCharacterName]: maxedStats };
    });

    const { affectionCap, lustCap } = getRelationshipCaps(debugCharacterName);
    showGameNotice(
      `${debugCharacterName} maxed to current caps (Affection ${affectionCap}, Lust ${lustCap}).`,
      { tone: "success" },
    );
  }, [
    clampGirlStatsToCaps,
    debugCharacterName,
    getRelationshipCaps,
    girls,
  ]);

  const grantDebugMoney = useCallback(() => {
    setPlayerWithDebugProtection((prev) =>
      withDerivedMood({
        ...prev,
        money: 99999,
      }),
    );
    showGameNotice("Money set to $99,999 for testing.", { tone: "success" });
  }, [setPlayerWithDebugProtection]);

  const debugIrisRouteOptions = useMemo<IrisRouteChoice[]>(
    () =>
      isIrisCheckpointAtLeast(debugIrisSkipCheckpoint, "ch2_after_ev3")
        ? ["dom", "sub", "middle"]
        : ["dom", "sub"],
    [debugIrisSkipCheckpoint],
  );

  const showIrisPublicChoiceControl = useMemo(
    () => isIrisCheckpointAtLeast(debugIrisSkipCheckpoint, "ch2_after_ev3"),
    [debugIrisSkipCheckpoint],
  );

  const showIrisDomDeniedResolutionControl = useMemo(
    () =>
      isIrisCheckpointAtLeast(debugIrisSkipCheckpoint, "ch2_complete") &&
      debugIrisRoute === "dom" &&
      debugIrisPublicChoice === "refuse",
    [debugIrisPublicChoice, debugIrisRoute, debugIrisSkipCheckpoint],
  );

  const showIrisC3Controls = debugIrisSkipCheckpoint === "ch3_after_ev1";

  const applyIrisStorySkip = useCallback(() => {
    if (
      debugIrisSkipCheckpoint === "ch1_complete" &&
      debugIrisRoute === "middle"
    ) {
      showGameNotice(
        "Chapter 1 Iris only supports dom or sub. Pick one route.",
        { tone: "error" },
      );
      return;
    }

    const chapter1Route: "dom" | "sub" = debugIrisRoute === "dom" ? "dom" : "sub";
    const chapter2RouteKey = getChapter2RouteKey(debugIrisRoute);
    const shouldIncludeCh2 = isIrisCheckpointAtLeast(
      debugIrisSkipCheckpoint,
      "ch2_after_ev3",
    );
    const shouldIncludeCh2Complete = isIrisCheckpointAtLeast(
      debugIrisSkipCheckpoint,
      "ch2_complete",
    );
    const shouldIncludeCh3 = isIrisCheckpointAtLeast(
      debugIrisSkipCheckpoint,
      "ch3_after_ev1",
    );

    const completedEventIds: string[] = [
      "iris_university_intro",
      debugIrisCoffeeChoice === "accepted"
        ? "iris_coffee_meetup_event"
        : "iris_coffee_forced_meet_event",
      "iris_hallway_invite_event",
      chapter1Route === "dom" ? "iris_mall_bump_dom" : "iris_mall_bump_sub",
      chapter1Route === "dom"
        ? "iris_chapter_1_finale_dom"
        : "iris_chapter_1_finale_sub",
    ];

    if (shouldIncludeCh2) {
      completedEventIds.push(
        "iris_ch2_ev1",
        `iris_ch2_ev2_${chapter2RouteKey}`,
        `iris_ch2_ev3_${chapter2RouteKey}`,
      );
    }

    if (shouldIncludeCh2Complete) {
      if (debugIrisRoute === "dom") {
        completedEventIds.push(
          debugIrisPublicChoice === "accept"
            ? "iris_ch2_ev4_dom_accepted"
            : "iris_ch2_ev4_dom_denied_start",
        );
      } else if (debugIrisRoute === "sub") {
        completedEventIds.push(
          debugIrisPublicChoice === "accept"
            ? "iris_ch2_ev4_sub_accepted"
            : "iris_ch2_ev4_sub_denied",
        );
      } else {
        completedEventIds.push(
          debugIrisPublicChoice === "accept"
            ? "iris_ch2_ev4_balanced_accepted"
            : "iris_ch2_ev4_balanced_denied",
        );
      }

      completedEventIds.push(`iris_ch2_ev5_${chapter2RouteKey}_date`);
    }

    if (shouldIncludeCh3) {
      const chapter3RouteKey = getChapter2RouteKey(debugIrisRoute);
      const chapter3EventId = debugIrisKissedAnotherGirl
        ? `iris_c3_ev1_${chapter3RouteKey}_kissed_other`
        : `iris_c3_ev1_${chapter3RouteKey}`;
      completedEventIds.push(chapter3EventId);
    }

    const currentGameTime = calculateGameTime(dayOfWeek, hour, dayCount);
    const irisHistory: EventHistory[] = completedEventIds.map((eventId, index) => ({
      eventId,
      lastTriggered: {
        day: START_DAY,
        hour: 0,
        gameTime: currentGameTime - 240 - index,
      },
      timesTriggered: 1,
    }));

    const irisCurrentRouteAfterC3: IrisRouteChoice =
      shouldIncludeCh3 && debugIrisC3Outcome === "shift_success"
        ? debugIrisC3TargetRoute
        : debugIrisRoute;
    const irisDominance =
      irisCurrentRouteAfterC3 === "dom"
        ? 35
        : irisCurrentRouteAfterC3 === "sub"
          ? -35
          : 0;

    setCharacterEventStates((prev) => ({
      ...prev,
      Iris: {
        characterName: "Iris",
        eventHistory: irisHistory,
        lastInteractionTime: prev.Iris?.lastInteractionTime ?? currentGameTime,
      },
    }));

    setGameplayFlags((prev) => {
      const next = new Set(prev);
      IRIS_SKIP_MANAGED_FLAGS.forEach((flag) => next.delete(flag));

      next.add("hasMetIris");
      next.add("irisNeedsNewShirt");
      next.add("irisCoffeeMet");
      next.add("irisApartmentUnlocked");
      next.add("irisCh1FinaleComplete");

      if (debugIrisCoffeeChoice === "accepted") {
        next.add("irisCoffeeAccepted");
      } else {
        next.add("irisCoffeeDeclined");
      }

      if (chapter1Route === "dom") {
        next.add("irisDomPath");
      } else {
        next.add("irisSubPath");
      }

      if (shouldIncludeCh2) {
        next.add("irisCh2Ev1_Done");
        next.add("irisCh2Ev2_Done");
        next.add("irisCh2Ev3_Done");
        if (debugIrisPublicChoice === "accept") {
          next.add("irisSchoolKissUnlocked");
        } else {
          next.add("irisPublicRefused");
        }
      }

      if (shouldIncludeCh2Complete) {
        next.add("irisCh2Ev4_Done");
        next.add("irisDatePlanned");
        next.add("irisCh2Complete");
        next.add("metMysteryGirl");

        if (debugIrisRoute === "dom") {
          if (debugIrisPublicChoice === "accept") {
            next.add("irisDomAcceptedKissLoopActive");
          } else {
            next.add("irisDomDeniedKissLoopActive");
            next.add("irisKissOthersChoiceMade");
            if (debugIrisDomDeniedResolution === "exclusive") {
              next.add("irisDomDeniedExclusive");
            } else {
              next.add("irisDomDeniedExplore");
              next.add("irisNtrSeeded");
              next.add("irisKissOthersEnabled");
            }
          }
        }
      }

      if (shouldIncludeCh3 && debugIrisKissedAnotherGirl) {
        next.add("playerKissedAnotherGirl");
      }

      if (shouldIncludeCh3) {
        next.add("irisCh3Ev1_Done");
        if (debugIrisRoute === "dom") next.add("irisC3PathOriginDom");
        if (debugIrisRoute === "sub") next.add("irisC3PathOriginSub");
        if (debugIrisRoute === "middle") next.add("irisC3PathOriginMiddle");

        if (irisCurrentRouteAfterC3 === "dom") next.add("irisC3PathCurrentDom");
        if (irisCurrentRouteAfterC3 === "sub") next.add("irisC3PathCurrentSub");
        if (irisCurrentRouteAfterC3 === "middle")
          next.add("irisC3PathCurrentMiddle");

        if (debugIrisC3Outcome === "keep_locked") {
          next.add("irisC3PathLocked");
        } else if (debugIrisC3Outcome === "shift_success") {
          next.add("irisC3PathShiftAttempted");
          next.add("irisC3PathShiftSucceeded");
        } else {
          next.add("irisC3PathShiftAttempted");
        }
      }

      return next;
    });

    setGirlStatsOverrides((prev) => {
      const next: Record<string, Partial<GirlStats>> = { ...prev };
      girls.forEach((girl) => {
        next[girl.name] = {
          affection: 100,
          lust: 100,
          mood: 100,
          love: 100,
          dominance: girl.name === "Iris" ? irisDominance : 0,
        };
      });
      return next;
    });

    setPlayerWithDebugProtection((prev) =>
      withDerivedMood({
        ...prev,
        energy: 100,
        mood: 100,
        hunger: 0,
        hygiene: 100,
        sobriety: 100,
        fitness: 50,
        intelligence: 50,
        style: 50,
        money: 99999,
      }),
    );

    setMetCharacters((prev) => new Set([...prev, "Iris"]));

    showGameNotice(
      `Iris skip applied: ${IRIS_SKIP_CHECKPOINT_LABEL[debugIrisSkipCheckpoint]} (${IRIS_ROUTE_LABEL[debugIrisRoute]} route).`,
      { tone: "success" },
    );
  }, [
    dayCount,
    dayOfWeek,
    debugIrisC3Outcome,
    debugIrisC3TargetRoute,
    debugIrisCoffeeChoice,
    debugIrisDomDeniedResolution,
    debugIrisKissedAnotherGirl,
    debugIrisPublicChoice,
    debugIrisRoute,
    debugIrisSkipCheckpoint,
    girls,
    hour,
    setPlayerWithDebugProtection,
  ]);

  useEffect(() => {
    if (selectedGirl) {
      setDebugCharacterName(selectedGirl.name);
    }
  }, [selectedGirl]);

  useEffect(() => {
    if (debugCharacterOptions.length === 0) return;
    if (!debugCharacterOptions.includes(debugCharacterName)) {
      setDebugCharacterName(debugCharacterOptions[0]);
    }
  }, [debugCharacterOptions, debugCharacterName]);

  useEffect(() => {
    if (!debugIrisRouteOptions.includes(debugIrisRoute)) {
      setDebugIrisRoute(debugIrisRouteOptions[0]);
    }
  }, [debugIrisRoute, debugIrisRouteOptions]);

  useEffect(() => {
    if (
      debugEventId &&
      debugCharacterEvents.some((event) => event.id === debugEventId)
    ) {
      return;
    }
    setDebugEventId(debugCharacterEvents[0]?.id ?? "");
  }, [debugCharacterEvents, debugEventId]);

  useEffect(() => {
    setDebugTravelLocation(currentLocation);
  }, [currentLocation]);

  const debugEventReport = useMemo<EventDebugReport | null>(() => {
    if (!debugCharacterName || !debugEventId) return null;

    const event = debugCharacterEvents.find(
      (candidate) => candidate.id === debugEventId,
    );
    if (!event) return null;

    const girl =
      girls.find((candidate) => candidate.name === debugCharacterName) ??
      baseGirls.find((candidate) => candidate.name === debugCharacterName);
    if (!girl) return null;

    const eventState = characterEventStates[debugCharacterName] ?? {
      characterName: debugCharacterName,
      eventHistory: [],
      lastInteractionTime: 0,
    };

    const completedEvents = eventState.eventHistory
      .filter((h) => h.timesTriggered > 0)
      .map((h) => h.eventId);
    const storyEventIds = new Set(
      debugCharacterEvents
        .filter((candidate) => !candidate.repeatable)
        .map((candidate) => candidate.id),
    );
    const storyHistory = eventState.eventHistory.filter((h) =>
      storyEventIds.has(h.eventId),
    );
    const completedStoryCount = storyHistory.filter(
      (h) => h.timesTriggered > 0,
    ).length;
    const currentGameTime = calculateGameTime(dayOfWeek, hour, dayCount);
    const currentGameDay = getDayCountFromGameTime(currentGameTime);
    const storyTriggeredToday = storyHistory.some((h) =>
      isEventHistoryFromCurrentDay(h, currentGameDay, dayOfWeek),
    );
    const eventTriggeredToday = eventState.eventHistory.some((h) =>
      isEventHistoryFromCurrentDay(h, currentGameDay, dayOfWeek),
    );
    const history = eventState.eventHistory.find((h) => h.eventId === event.id);
    const targetLocation = event.conditions.requiredLocation ?? girl.location;
    const timing = getEventTimingHint(event);
    const reasons: string[] = [];
    const conditions = event.conditions;

    if (!event.repeatable && completedEvents.includes(event.id)) {
      reasons.push("Already completed (non-repeatable event).");
    }

    if (eventTriggeredToday) {
      reasons.push(`${debugCharacterName} already had an event today.`);
    }

    if (!event.repeatable && storyTriggeredToday) {
      reasons.push(
        `${debugCharacterName} already had a story event today.`,
      );
    }

    if (!event.repeatable && completedStoryCount > 0) {
      const requiredAffection = completedStoryCount * 5;
      if (girl.stats.affection < requiredAffection) {
        reasons.push(
          `Needs affection ${requiredAffection} (current ${girl.stats.affection}).`,
        );
      }
    }

    if (isEventOnCooldown(event, history, currentGameTime)) {
      const cooldownHours = event.cooldownHours ?? 0;
      const elapsedHours = history
        ? currentGameTime - history.lastTriggered.gameTime
        : 0;
      const remainingHours = Math.max(1, Math.ceil(cooldownHours - elapsedHours));
      reasons.push(`Cooldown active: ${remainingHours}h remaining.`);
    }

    if (conditions.minAffection !== undefined && girl.stats.affection < conditions.minAffection) {
      reasons.push(
        `Requires affection >= ${conditions.minAffection} (current ${girl.stats.affection}).`,
      );
    }
    if (conditions.minLust !== undefined && girl.stats.lust < conditions.minLust) {
      reasons.push(`Requires lust >= ${conditions.minLust} (current ${girl.stats.lust}).`);
    }
    if (conditions.minLove !== undefined && girl.stats.love < conditions.minLove) {
      reasons.push(`Requires love >= ${conditions.minLove} (current ${girl.stats.love}).`);
    }
    if (conditions.minMood !== undefined && girl.stats.mood < conditions.minMood) {
      reasons.push(`Requires mood >= ${conditions.minMood} (current ${girl.stats.mood}).`);
    }
    if (
      conditions.minDominance !== undefined &&
      (girl.stats.dominance ?? 0) < conditions.minDominance
    ) {
      reasons.push(
        `Requires dominance >= ${conditions.minDominance} (current ${girl.stats.dominance ?? 0}).`,
      );
    }
    if (conditions.maxAffection !== undefined && girl.stats.affection > conditions.maxAffection) {
      reasons.push(
        `Requires affection <= ${conditions.maxAffection} (current ${girl.stats.affection}).`,
      );
    }
    if (conditions.maxLust !== undefined && girl.stats.lust > conditions.maxLust) {
      reasons.push(`Requires lust <= ${conditions.maxLust} (current ${girl.stats.lust}).`);
    }
    if (
      conditions.maxDominance !== undefined &&
      (girl.stats.dominance ?? 0) > conditions.maxDominance
    ) {
      reasons.push(
        `Requires dominance <= ${conditions.maxDominance} (current ${girl.stats.dominance ?? 0}).`,
      );
    }

    if (
      conditions.minPlayerIntelligence !== undefined &&
      player.intelligence < conditions.minPlayerIntelligence
    ) {
      reasons.push(
        `Requires player intelligence >= ${conditions.minPlayerIntelligence} (current ${player.intelligence}).`,
      );
    }
    if (
      conditions.minPlayerFitness !== undefined &&
      player.fitness < conditions.minPlayerFitness
    ) {
      reasons.push(
        `Requires player fitness >= ${conditions.minPlayerFitness} (current ${player.fitness}).`,
      );
    }
    if (
      conditions.minPlayerStyle !== undefined &&
      player.style < conditions.minPlayerStyle
    ) {
      reasons.push(
        `Requires player style >= ${conditions.minPlayerStyle} (current ${player.style}).`,
      );
    }
    if (
      conditions.minPlayerMoney !== undefined &&
      player.money < conditions.minPlayerMoney
    ) {
      reasons.push(
        `Requires player money >= ${conditions.minPlayerMoney} (current ${player.money}).`,
      );
    }

    if (conditions.minHour !== undefined && hour < conditions.minHour) {
      reasons.push(`Requires time after ${conditions.minHour}:00 (current ${hour}:00).`);
    }
    if (conditions.maxHour !== undefined && hour >= conditions.maxHour) {
      reasons.push(`Requires time before ${conditions.maxHour}:00 (current ${hour}:00).`);
    }
    if (conditions.specificDay !== undefined && dayOfWeek !== conditions.specificDay) {
      reasons.push(`Requires day ${conditions.specificDay} (current ${dayOfWeek}).`);
    }
    if (
      conditions.requiredLocation !== undefined &&
      currentLocation !== conditions.requiredLocation
    ) {
      reasons.push(
        `Requires location ${conditions.requiredLocation} (current ${currentLocation}).`,
      );
    }

    if (conditions.requiredPreviousEvents) {
      conditions.requiredPreviousEvents.forEach((requiredEvent) => {
        if (!completedEvents.includes(requiredEvent)) {
          reasons.push(`Missing prerequisite event: ${requiredEvent}.`);
        }
      });
    }

    if (conditions.blockedByEvents) {
      conditions.blockedByEvents.forEach((blockedEvent) => {
        if (completedEvents.includes(blockedEvent)) {
          reasons.push(`Blocked by completed event: ${blockedEvent}.`);
        }
      });
    }

    if (conditions.requiredFlags) {
      conditions.requiredFlags.forEach((flag) => {
        if (!gameplayFlags.has(flag)) {
          reasons.push(`Missing required flag: ${flag}.`);
        }
      });
    }

    if (conditions.blockedByFlags) {
      conditions.blockedByFlags.forEach((flag) => {
        if (gameplayFlags.has(flag)) {
          reasons.push(`Blocked by active flag: ${flag}.`);
        }
      });
    }

    return {
      event,
      timing,
      targetLocation,
      reasons,
      isReady: reasons.length === 0,
    };
  }, [
    characterEventStates,
    currentLocation,
    dayCount,
    dayOfWeek,
    debugCharacterEvents,
    debugCharacterName,
    debugEventId,
    gameplayFlags,
    girls,
    hour,
    player,
  ]);

  //function to set a flag
  const setFlag = useCallback((flag: GameplayFlag) => {
    setGameplayFlags((prev) => new Set([...prev, flag]));
    console.log(`🚩 Flag set: ${flag}`);
  }, []);

  const recordRandomEventTrigger = useCallback((eventId: string) => {
    setRandomEventDailyCounts((prev) => ({
      ...prev,
      [eventId]: (prev[eventId] ?? 0) + 1,
    }));
  }, []);
  const unlockCharacter = useCallback((characterName: string) => {
    const name = characterName as keyof typeof characterUnlocks;
    setCharacterUnlocks((prev) =>
      prev[name] ? prev : { ...prev, [name]: true },
    );
  }, []);

  // save/load
  const buildSaveData = useCallback(
    (): SaveData => ({
      player,
      currentLocation,
      hour,
      dayOfWeek,
      metCharacters: Array.from(metCharacters),
      girlStatsOverrides,
      characterEventStates,
      characterUnlocks,
      scheduledEncounters, // This now includes dates with activities
      gameplayFlags: Array.from(gameplayFlags),
      dailyWorkoutState,
      rubyWorkoutTotal,
      randomEventDailyCounts,
      dayCount,
      dailyNonStoryRandomEventIds,
      nonStoryRandomEventLastTriggeredDay,
      hungerProgressRemainder,
      messagesByCharacter,
      galleryUnlocks,
      messageActionHistory,
      calendarMilestones,
      lastPlayerDateAskDayByCharacter,
      lastAutoDateAskDayByCharacter,
      textSpeed,
      timestamp: new Date().toISOString(),
    }),
    [
      player,
      currentLocation,
      hour,
      dayOfWeek,
      metCharacters,
      girlStatsOverrides,
      characterEventStates,
      characterUnlocks,
      scheduledEncounters,
      gameplayFlags,
      dailyWorkoutState,
      rubyWorkoutTotal,
      randomEventDailyCounts,
      dayCount,
      dailyNonStoryRandomEventIds,
      nonStoryRandomEventLastTriggeredDay,
      hungerProgressRemainder,
      messagesByCharacter,
      galleryUnlocks,
      messageActionHistory,
      calendarMilestones,
      lastPlayerDateAskDayByCharacter,
      lastAutoDateAskDayByCharacter,
      textSpeed,
    ],
  );

  const applySaveData = useCallback((data: SaveData) => {
    const loadedPlayer = withDerivedMood({
      ...defaultPlayerStats,
      ...data.player,
    });
    const loadedDay = data.dayOfWeek ?? START_DAY;
    const loadedDayCount = data.dayCount ?? 0;
    const loadedEventStates = normalizeEventStateTimestamps(
      data.characterEventStates ?? {},
      loadedDay,
      loadedDayCount,
    );
    const loadedFlags = inferMissingPathFlags(
      new Set(data.gameplayFlags ?? []),
      loadedEventStates,
    );
    const loadedCooldowns = data.nonStoryRandomEventLastTriggeredDay ?? {};

    setPlayer(loadedPlayer);
    setCurrentLocation(data.currentLocation);
    setHour(data.hour);
    setDayOfWeek(loadedDay);
    setMetCharacters(new Set(data.metCharacters ?? []));
    setGirlStatsOverrides(data.girlStatsOverrides ?? {});
    setCharacterEventStates(loadedEventStates);
    setCharacterUnlocks(
      data.characterUnlocks ?? {
        Yumi: false,
        Gwen: false,
        Dawn: false,
        Ruby: false,
      },
    );
    setScheduledEncounters(data.scheduledEncounters ?? []); // This loads dates too
    setGameplayFlags(loadedFlags);
    setRandomEventDailyCounts(data.randomEventDailyCounts ?? {});
    setDayCount(loadedDayCount);
    setNonStoryRandomEventLastTriggeredDay(loadedCooldowns);
    setHungerProgressRemainder(data.hungerProgressRemainder ?? 0);
    setMessagesByCharacter(data.messagesByCharacter ?? {});
    setGalleryUnlocks(data.galleryUnlocks ?? []);
    setMessageActionHistory(data.messageActionHistory ?? {});
    setCalendarMilestones(data.calendarMilestones ?? []);
    setLastPlayerDateAskDayByCharacter(
      data.lastPlayerDateAskDayByCharacter ?? {},
    );
    setLastAutoDateAskDayByCharacter(data.lastAutoDateAskDayByCharacter ?? {});
    setDailyNonStoryRandomEventIds(
      data.dailyNonStoryRandomEventIds ??
        rollDailyNonStoryRandomEventIds({
          day: loadedDay,
          player: loadedPlayer,
          gameplayFlags: loadedFlags,
          girls: baseGirls,
          cooldownByEventId: loadedCooldowns,
          currentDayCount: loadedDayCount,
          maxEventsPerDay: 2,
          cooldownDays: 7,
        }),
    );
    if (data.dailyWorkoutState && data.dailyWorkoutState.day === loadedDay) {
      setDailyWorkoutState(data.dailyWorkoutState);
    } else {
      setDailyWorkoutState({
        day: loadedDay,
        total: 0,
        withRuby: 0,
        withoutRuby: 0,
      });
    }
    setRubyWorkoutTotal(data.rubyWorkoutTotal || 0);
    if (data.textSpeed === "instant" || data.textSpeed === "normal") {
      setTextSpeed(data.textSpeed);
    }
    npcDateInviteProcessedDayRef.current = null;
    setSelectedGirl(null);
    setGameState("playing");
  }, [setHour, setDayOfWeek]);

  useEffect(() => {
    setGameplayFlags((currentFlags) => {
      const migratedFlags = inferMissingPathFlags(
        currentFlags,
        characterEventStates,
      );
      if (areFlagsEqual(currentFlags, migratedFlags)) {
        return currentFlags;
      }
      return migratedFlags;
    });
  }, [characterEventStates]);

  const shouldPromptIrisKissOthersChoice =
    gameState === "playing" &&
    gameplayFlags.has("irisCh2Complete") &&
    !gameplayFlags.has("irisKissOthersChoiceMade");

  useEffect(() => {
    if (!shouldPromptIrisKissOthersChoice) {
      irisKissOthersPromptedRef.current = false;
      return;
    }

    if (irisKissOthersPromptedRef.current) {
      return;
    }
    irisKissOthersPromptedRef.current = true;

    let cancelled = false;
    const promptForChoice = async () => {
      const allowKissingOthers = await askGameConfirm(
        "Iris asks for a little freedom: should she be allowed to kiss other people sometimes?",
        {
          confirmLabel: "Yes, allow it",
          cancelLabel: "No, keep it exclusive",
        },
      );

      if (cancelled) return;

      setGameplayFlags((prev) => {
        if (prev.has("irisKissOthersChoiceMade")) {
          return prev;
        }

        const next = new Set(prev);
        next.add("irisKissOthersChoiceMade");
        if (allowKissingOthers) {
          next.add("irisKissOthersEnabled");
        }
        return next;
      });

      showGameNotice(
        allowKissingOthers
          ? "Iris may now have random encounters kissing other people."
          : "Iris will stay focused on kissing only you in random encounters.",
        { tone: allowKissingOthers ? "warning" : "success" },
      );
    };

    promptForChoice();

    return () => {
      cancelled = true;
    };
  }, [shouldPromptIrisKissOthersChoice]);

  const writeSaveData = useCallback((key: string, data: SaveData) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const saveGame = () => {
    const saveData = buildSaveData();
    writeSaveData(MANUAL_SAVE_KEY, saveData);
    setHasManualSave(true);
    showGameNotice("Game saved! 💾", { tone: "success" });
  };

  const autoSaveGame = useCallback(() => {
    const saveData = buildSaveData();
    writeSaveData(AUTO_SAVE_KEY, saveData);
    setHasAutoSave(true);
  }, [buildSaveData, writeSaveData]);

  const loadGame = () => {
    const raw = localStorage.getItem(MANUAL_SAVE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as SaveData;
    applySaveData(data);
  };

  const loadAutoSave = () => {
    const raw = localStorage.getItem(AUTO_SAVE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as SaveData;
    applySaveData(data);
  };

  useEffect(() => {
    if (!pendingAutoSaveRef.current) return;
    autoSaveGame();
    pendingAutoSaveRef.current = false;
  }, [currentLocation, autoSaveGame]);

  // const resetGame = () => {
  //   setPlayer(defaultPlayerStats);
  //   setCurrentLocation("Bedroom");
  //   setHour(START_HOUR);
  //   setDayOfWeek(START_DAY);
  //   setSelectedGirl(null);
  //   setMetCharacters(new Set());
  //   setGirlStatsOverrides({});
  //   setCharacterEventStates({});
  //   setCharacterUnlocks({
  //     Yumi: false,
  //     Gwen: false,
  //     Dawn: false,
  //     Ruby: false,
  //   });
  //   setScheduledEncounters([]);
  //   localStorage.removeItem("datingSimSave");
  //   setHasSaveData(false);

  //   setGameState("intro");
  //   setCurrentDialogue(introDialogue);
  // };

  const newGame = async () => {
    // If there's save data, confirm before proceeding
    if (hasAnySaveData) {
      const confirmed = await askGameConfirm(
        "Starting a new game will overwrite your manual save and auto-save. Continue?",
        {
          confirmLabel: "Start New Game",
          cancelLabel: "Cancel",
        },
      );
      if (!confirmed) {
        return; // User cancelled
      }
    }

    // Clear save data but don't reset game state yet
    localStorage.removeItem(MANUAL_SAVE_KEY);
    localStorage.removeItem(AUTO_SAVE_KEY);
    setHasManualSave(false);
    setHasAutoSave(false);

    // Go to name input screen
    setGameState("nameInput");
  };

  // dialogue helpers
  const startDialogue = useCallback(
    (
      dialogue: Dialogue,
      characterImage: string = "",
      girlEffects: Partial<GirlStats> | null = null,
      characterName?: string,
      characterImageLocationOverride?: string,
    ) => {
      setIsDialogueClosing(false);
      setCurrentDialogue(dialogue);
      setDialogueCharacterImage(characterImage);
      setDialogueCharacterImageLocationOverride(
        characterImageLocationOverride ?? null,
      );
      setDialogueGirlEffects(girlEffects);
      setDialogueGirlName(characterName || "");
      setGameState("dialogue");

      if (characterImage) {
        const m = characterImage.match(/\/characters\/([^/]+)\//);
        if (m)
          setDialogueGirlName(m[1].charAt(0).toUpperCase() + m[1].slice(1));
      }
    },
    [],
  );

  const closeDialogue = (afterClose: () => void) => {
    if (isDialogueClosing) return;
    setIsDialogueClosing(true);
    setTimeout(() => {
      afterClose();
      setIsDialogueClosing(false);
    }, transitionDurationMs);
  };

  const endDialogue = (
    statChanges?: Partial<GirlStats>,
    chosenOption?: DialogueChoice,
  ) => {
    closeDialogue(() => {
      // ☕ If dialogue option scheduled an encounter, queue it
      if (chosenOption?.scheduleEncounter) {
        scheduleEncounter(chosenOption.scheduleEncounter);
      }

      // ✨ Handle flags from dialogue choices
      if (chosenOption?.setFlags) {
        chosenOption.setFlags.forEach((flag) => {
          setFlag(flag);
          console.log(`🚩 Flag set from choice: ${flag}`);
        });
      }

      // ✨ Handle character unlocks from dialogue choices
      if (chosenOption?.unlockCharacters) {
        chosenOption.unlockCharacters.forEach((characterName) => {
          const name = characterName as keyof typeof characterUnlocks;
            if (!characterUnlocks[name]) {
              setCharacterUnlocks((prev) => ({ ...prev, [name]: true }));
              showGameNotice(`✨ ${characterName} is now available!`, {
                tone: "success",
              });
            }
          });
      }

      // Handle girl stat changes
      if (dialogueGirlName) {
        const girl = girls.find(
          (g) => g.name.toLowerCase() === dialogueGirlName.toLowerCase(),
        );
        if (girl) {
          const currentOverride = girlStatsOverrides[dialogueGirlName] || {};
          const currentStats = { ...girl.stats, ...currentOverride };
          const combined = { ...dialogueGirlEffects, ...statChanges };

          const newStats: Partial<GirlStats> = { ...currentStats };
          const clampGirlStatValue = (key: keyof GirlStats, value: number) => {
            if (key === "dominance") {
              return clampValue(value, -100, 100);
            }
            return clampValue(value, 0, 100);
          };
          Object.entries(combined).forEach(([key, value]) => {
            if (typeof value === "number") {
              const k = key as keyof GirlStats;
              const cur = (currentStats[k] as number) ?? 0;
              newStats[k] = clampGirlStatValue(k, cur + value);
            }
          });
          const { affectionCap, lustCap } = getRelationshipCaps(girl.name);
          newStats.affection = clampValue(
            newStats.affection ?? 0,
            0,
            affectionCap,
          );
          newStats.lust = clampValue(newStats.lust ?? 0, 0, lustCap);

          setGirlStatsOverrides((prev) => ({
            ...prev,
            [dialogueGirlName]: newStats,
          }));
        }
      }

      // Clean up dialogue state
      setCurrentDialogue(null);
      setDialogueCharacterImage("");
      setDialogueCharacterImageLocationOverride(null);
      setDialogueGirlEffects(null);
      setDialogueGirlName("");
      setSelectedGirl(null);
      setGameState("playing");
    });
  };

  const endRandomEventDialogue = (
    statChanges?: Partial<GirlStats>,
    chosenOption?: DialogueChoice,
  ) => {
    const finalize = () => {
      if (chosenOption?.scheduleEncounter) {
        scheduleEncounter(chosenOption.scheduleEncounter);
      }

      if (chosenOption?.setFlags) {
        chosenOption.setFlags.forEach((flag) => {
          setFlag(flag);
          console.log(`Flag set from random choice: ${flag}`);
        });
      }

      if (chosenOption?.unlockCharacters) {
        chosenOption.unlockCharacters.forEach((characterName) => {
          const name = characterName as keyof typeof characterUnlocks;
          if (!characterUnlocks[name]) {
            setCharacterUnlocks((prev) => ({ ...prev, [name]: true }));
          }
        });
      }

      if (dialogueGirlName) {
        const girl = girls.find(
          (g) => g.name.toLowerCase() === dialogueGirlName.toLowerCase(),
        );
        if (girl) {
          const currentOverride = girlStatsOverrides[dialogueGirlName] || {};
          const currentStats = { ...girl.stats, ...currentOverride };
          const combined = { ...dialogueGirlEffects, ...statChanges };

          const newStats: Partial<GirlStats> = { ...currentStats };
          const clampGirlStatValue = (key: keyof GirlStats, value: number) => {
            if (key === "dominance") {
              return clampValue(value, -100, 100);
            }
            return clampValue(value, 0, 100);
          };

          Object.entries(combined).forEach(([key, value]) => {
            if (typeof value === "number") {
              const statKey = key as keyof GirlStats;
              const currentValue = (currentStats[statKey] as number) ?? 0;
              newStats[statKey] = clampGirlStatValue(
                statKey,
                currentValue + value,
              );
            }
          });

          const { affectionCap, lustCap } = getRelationshipCaps(girl.name);
          newStats.affection = clampValue(
            newStats.affection ?? 0,
            0,
            affectionCap,
          );
          newStats.lust = clampValue(newStats.lust ?? 0, 0, lustCap);

          setGirlStatsOverrides((prev) => ({
            ...prev,
            [dialogueGirlName]: newStats,
          }));
        }
      }

      // Spend time if the event has a timeCost
      if (currentRandomEvent?.timeCost) {
        spendTime(currentRandomEvent.timeCost);
      }

      setCurrentRandomEvent(null);
      setCurrentDialogue(null);
      setDialogueCharacterImage("");
      setDialogueCharacterImageLocationOverride(null);
      setDialogueGirlEffects(null);
      setDialogueGirlName("");
      setGameState("playing");
    };
    closeDialogue(finalize);
  };

  // ✅ Router for nextDialogueId coming from DialogueBox
  const goToDialogueByEventId = (id: string) => {
    // First, try to find in character dialogues
    let foundDialogue: Dialogue | null = null;
    let characterImage = "";
    const dialogueImageLocationOverride =
      getDialogueCharacterImageLocationOverride(id);

    // Search through all character dialogues
    for (const [characterName, dialogues] of Object.entries(
      characterDialogues,
    )) {
      if (dialogues[id]) {
        foundDialogue = dialogues[id];
        // Get the character image for this dialogue
        const girl = girls.find((g) => g.name === characterName);
        if (girl) {
          characterImage = getCharacterImage(
            girl,
            dialogueImageLocationOverride ?? currentLocation,
            hour,
          );
        }
        console.log(`✅ Found dialogue '${id}' for character ${characterName}`);
        break;
      }
    }

    // If not found in character dialogues, try random events
    if (!foundDialogue) {
      const ev = randomEvents.find((e) => e.id === id);
      if (ev) {
        foundDialogue = ev.dialogue;
        setCurrentRandomEvent(ev);
        if (ev.characterName) {
          const girl = girls.find((g) => g.name === ev.characterName);
          if (girl) {
            characterImage = getCharacterImage(
              girl,
              dialogueImageLocationOverride ?? currentLocation,
              hour,
            );
          }
        }
        console.log(`✅ Found dialogue '${id}' in random events`);
      }
    }

    // If still not found, warn and return
    if (!foundDialogue) {
      console.warn(`❌ [Dialogue] nextDialogueId not found: ${id}`);
      return;
    }

    // Start the dialogue
    const randomSpeaker = randomEvents.find((e) => e.id === id)?.characterName;
    startDialogue(
      foundDialogue,
      characterImage,
      null,
      randomSpeaker,
      dialogueImageLocationOverride,
    );
  };

  const onEventTriggered = useCallback(
    (eventId: string, girlName?: string) => {
      const name = girlName ?? selectedGirl?.name;
      if (!name) return;
      const prevState = characterEventStates[name] ?? {
        characterName: name,
        eventHistory: [] as EventHistory[],
        lastInteractionTime: 0,
      };

      const gameTime = calculateGameTime(dayOfWeek, hour, dayCount);
      const lastTriggered = { day: dayOfWeek, hour, gameTime };

      const idx = prevState.eventHistory.findIndex(
        (e) => e.eventId === eventId,
      );
      let updatedHistory: EventHistory[];
      if (idx >= 0) {
        const existing = prevState.eventHistory[idx];
        updatedHistory = [...prevState.eventHistory];
        updatedHistory[idx] = {
          ...existing,
          lastTriggered,
          timesTriggered: (existing.timesTriggered ?? 0) + 1,
        };
      } else {
        updatedHistory = [
          ...prevState.eventHistory,
          { eventId, lastTriggered, timesTriggered: 1 },
        ];
      }

      const newState: CharacterEventState = {
        ...prevState,
        eventHistory: updatedHistory,
        lastInteractionTime: gameTime,
      };

      setCharacterEventStates((prev) => ({
        ...prev,
        [name]: newState,
      }));

      if (FIRST_SEX_EVENT_ID_PATTERN.test(eventId)) {
        recordCalendarMilestone(name, "first_sex", "First intimate night together.");
      }
    },
    [
      selectedGirl,
      characterEventStates,
      dayOfWeek,
      dayCount,
      hour,
      recordCalendarMilestone,
    ],
  );

  const triggerSpecificEvent = useCallback(
    (characterName: string, eventId: string, locationOverride?: string) => {
      const events = getCharacterEvents(characterName);
      const triggerable = events.find((event) => event.id === eventId);
      if (!triggerable) {
        console.error(`❌ Event not found: ${eventId}`);
        return;
      }

      const baseGirl = baseGirls.find((g) => g.name === characterName);
      if (!baseGirl) {
        console.error(`❌ Character not found: ${characterName}`);
        return;
      }

      const scheduledLocation = getScheduledLocation(
        characterName,
        dayOfWeek,
        hour,
      );
      const override = girlStatsOverrides[characterName];
      const mergedStats = override
        ? { ...baseGirl.stats, ...override }
        : baseGirl.stats;
      const girl = {
        ...baseGirl,
        location: scheduledLocation || baseGirl.location,
        stats: clampGirlStatsToCaps(characterName, mergedStats),
      };

      const eventState = characterEventStates[characterName] ?? {
        characterName,
        eventHistory: [],
        lastInteractionTime: 0,
      };
      const completedEvents =
        eventState.eventHistory
          .filter((h) => h.timesTriggered > 0)
          .map((h) => h.eventId) || [];

      const locationToCheck = locationOverride ?? currentLocation;

      if (
        !checkEventConditions(
          triggerable.conditions,
          girl,
          player,
          locationToCheck,
          dayOfWeek,
          hour,
          completedEvents,
          gameplayFlags,
          triggerable.id,
        )
      ) {
        return;
      }

      setCurrentRandomEvent(null);
      const dialogueImageLocationOverride =
        getDialogueCharacterImageLocationOverride(triggerable.id);
      const characterImage = getCharacterImage(
        girl,
        dialogueImageLocationOverride ?? locationToCheck,
        hour,
      );
      onEventTriggered(triggerable.id, characterName);
      startDialogue(
        injectDawnIntelLines(triggerable.dialogue, gameplayFlags),
        characterImage,
        null,
        characterName,
        dialogueImageLocationOverride,
      );

      setPlayerWithDebugProtection((prev) =>
        applyCharacterEventRewards(prev, triggerable.rewards, {
          onSetFlag: setFlag,
          onUnlockCharacter: (name) => {
            const key = name as keyof typeof characterUnlocks;
            setCharacterUnlocks((prevState) =>
              prevState[key] ? prevState : { ...prevState, [key]: true },
            );
          },
        }),
      );
    },
    [
      characterEventStates,
      clampGirlStatsToCaps,
      currentLocation,
      dayOfWeek,
      gameplayFlags,
      girlStatsOverrides,
      hour,
      onEventTriggered,
      player,
      setCharacterUnlocks,
      setCurrentRandomEvent,
      setFlag,
      setPlayerWithDebugProtection,
      startDialogue,
    ],
  );

  useEffect(() => {
    if (
      !gameplayFlags.has("irisCh3Ev2_Done") ||
      gameplayFlags.has("dawnFallbackReady") ||
      gameplayFlags.has("dawnSummonQueued") ||
      gameplayFlags.has("dawnSummonTriggered") ||
      gameplayFlags.has("dawnIrritatedFallbackSeen")
    ) {
      return;
    }

    const calloutTime = getIrisEventGameTime("iris_c3_ev2_dawn_callout");
    if (calloutTime === null) return;

    const currentGameTime = calculateGameTime(dayOfWeek, hour, dayCount);
    if (currentGameTime - calloutTime >= 72) {
      setFlag("dawnFallbackReady");
    }
  }, [
    dayCount,
    dayOfWeek,
    gameplayFlags,
    getIrisEventGameTime,
    hour,
    setFlag,
  ]);

  useEffect(() => {
    const shouldAutoTriggerFallback =
      gameState === "playing" &&
      gameplayFlags.has("dawnFallbackReady") &&
      !gameplayFlags.has("dawnIrritatedFallbackSeen") &&
      !gameplayFlags.has("dawnSummonQueued") &&
      !gameplayFlags.has("dawnSummonTriggered");

    if (!shouldAutoTriggerFallback) {
      dawnFallbackAutoTriggeredRef.current = false;
      return;
    }

    if (currentDialogue) return;
    if (dawnFallbackAutoTriggeredRef.current) return;
    dawnFallbackAutoTriggeredRef.current = true;

    triggerSpecificEvent("Iris", "iris_c3_ev2_dawn_callout_fallback");
  }, [currentDialogue, gameState, gameplayFlags, triggerSpecificEvent]);

  useEffect(() => {
    const summonTargetGameTime = getDawnSummonTargetGameTime();
    const shouldCheckSummon =
      gameState === "playing" &&
      summonTargetGameTime !== null &&
      !gameplayFlags.has("dawnSummonTriggered");

    if (!shouldCheckSummon) {
      dawnSummonAutoTriggeredRef.current = false;
      return;
    }

    if (currentDialogue) return;

    const currentGameTime = calculateGameTime(dayOfWeek, hour, dayCount);
    if (currentGameTime < summonTargetGameTime) return;
    if (hour !== 23 && currentGameTime === summonTargetGameTime) return;
    if (dawnSummonAutoTriggeredRef.current) return;
    dawnSummonAutoTriggeredRef.current = true;

    const dawnBase = baseGirls.find((girl) => girl.name === "Dawn");
    const dawnStats = clampGirlStatsToCaps("Dawn", {
      ...(dawnBase?.stats ?? {
        affection: 0,
        lust: 0,
        mood: 50,
        love: 0,
        dominance: 0,
      }),
      ...(girlStatsOverrides.Dawn ?? {}),
    });
    const dawnImageGirl: Girl = {
      name: "Dawn",
      location: "Nightclub",
      relationship: "Single",
      personality: "Confident",
      stats: dawnStats,
    };

    setCurrentLocation("Nightclub");
    setSelectedGirl(null);
    setFlag("dawnSummonTriggered");
    setFlag("hasSeenDawn");
    setFlag("hasMetDawn");
    setFlag("metDawn");
    setCharacterUnlocks((prev) =>
      prev.Dawn ? prev : { ...prev, Dawn: true },
    );
    setMetCharacters((prev) => new Set([...prev, "Dawn"]));
    onEventTriggered("iris_c3_ev2_dawn_summon_call", "Iris");

    const dawnCharacterImage = getCharacterImage(dawnImageGirl, "Nightclub", hour);
    startDialogue(
      iris_c3_ev2_dawn_summon_call,
      dawnCharacterImage,
      null,
      "Dawn",
      "Nightclub",
    );
  }, [
    clampGirlStatsToCaps,
    currentDialogue,
    dayCount,
    dayOfWeek,
    gameState,
    gameplayFlags,
    getDawnSummonTargetGameTime,
    girlStatsOverrides.Dawn,
    hour,
    onEventTriggered,
    setFlag,
    startDialogue,
  ]);

  //pending Events tracker
  const [pendingEvents, setPendingEvents] = useState<
    {
      characterName: string;
      eventId: string;
      location: string;
      priority: number;
    }[]
  >([]);

  const triggerLocationEvent = (location: string) => {
    const availableEvents = pendingEvents
      .filter((event) => {
        if (event.location !== location) return false;

        const eventDefinition = getCharacterEvents(event.characterName).find(
          (candidate) => candidate.id === event.eventId,
        );
        // Keep movement auto-trigger behavior for location-bound events only.
        return Boolean(eventDefinition?.conditions.requiredLocation);
      })
      .sort((a, b) => b.priority - a.priority);

    if (availableEvents.length === 0) return false;

    const nextEvent = availableEvents[0];
    const events = getCharacterEvents(nextEvent.characterName);
    const triggerable = events.find((event) => event.id === nextEvent.eventId);
    if (!triggerable) return false;

    const girl = girls.find((g) => g.name === nextEvent.characterName);
    if (!girl) return false;

    setCurrentRandomEvent(null);
    const dialogueImageLocationOverride =
      getDialogueCharacterImageLocationOverride(triggerable.id);
    const characterImage = getCharacterImage(
      girl,
      dialogueImageLocationOverride ?? location,
      hour,
    );
    onEventTriggered(triggerable.id, girl.name);
    startDialogue(
      injectDawnIntelLines(triggerable.dialogue, gameplayFlags),
      characterImage,
      null,
      girl.name,
      dialogueImageLocationOverride,
    );

    const updatedPlayer = applyCharacterEventRewards(
      player,
      triggerable.rewards,
      {
        onSetFlag: setFlag,
        onUnlockCharacter: (characterName) => {
          const name = characterName as keyof typeof characterUnlocks;
          setCharacterUnlocks((prev) =>
            prev[name] ? prev : { ...prev, [name]: true },
          );
        },
      },
    );
    if (updatedPlayer !== player) {
      setPlayerWithDebugProtection(updatedPlayer);
    }

    return true;
  };

  // location change + random events

  // location change + random events
  const moveTo = (location: string) => {
    if (isLocationTransitioning || location === currentLocation) {
      return;
    }

    setIsLocationTransitioning(true);

    setTimeout(() => {
      const finishTransition = () => setIsLocationTransitioning(false);

      if (
        location !== currentLocation &&
        triggerLocationEvent(currentLocation)
      ) {
        finishTransition();
        return;
      }

      setCurrentLocation(location);
      setSelectedGirl(null);
      pendingAutoSaveRef.current = true;
      setPlayerWithDebugProtection((prev) =>
        prev.hunger >= STARVING_HUNGER_THRESHOLD
          ? applyPlayerStatDelta(prev, { energy: -1 })
          : prev,
      );

      if (
        location === "Hallway" &&
        !gameplayFlags.has("hasMetGwen") &&
        gameplayFlags.has("hasMetIris") &&
        gameplayFlags.has("hasMetYumi") &&
        gameplayFlags.has("hasMetRuby")
      ) {
        triggerSpecificEvent("Gwen", "gwen_hallway_intro_event", location);
        finishTransition();
        return;
      }
      // Trigger pending scheduled encounters (incl. dates)
      if (checkScheduledEncounters(location)) {
        finishTransition();
        return;
      }

      if (triggerLocationEvent(location)) {
        finishTransition();
        return;
      }

      // // Unlock Gwen when entering Hallway after 5 PM
      // console.log(
      //   `dY"? Moved to: ${location}, Hour: ${hour}, Gwen unlocked: ${characterUnlocks.Gwen}`
      // );
      // if (location === "Hallway" && hour >= 17 && !characterUnlocks.Gwen) {
      //   setCharacterUnlocks((prev) => ({ ...prev, Gwen: true }));

      //   // Trigger Gwen's first meeting
      //   const firstMeeting = firstMeetingDialogues["Gwen"];
      //   if (firstMeeting) {
      //     const characterImage = getCharacterImage(
      //       girls.find((g) => g.name === "Gwen")!,
      //       currentLocation,
      //       hour
      //     );
      //     setMetCharacters(new Set([...metCharacters, "Gwen"]));
      //     startDialogue(firstMeeting, characterImage, null);
      //     return;
      //   }
      // }

      // Daily pre-rolled non-story random events trigger first.
      const dailyNonStoryEvent = getScheduledNonStoryRandomEventForContext(
        dailyNonStoryRandomEventIds,
        location,
        hour,
        dayOfWeek,
        player,
        gameplayFlags,
        girls,
      );
      if (dailyNonStoryEvent) {
        console.log(`🎲 Daily random event: ${dailyNonStoryEvent.name}`);
        setDailyNonStoryRandomEventIds((prev) =>
          prev.filter((eventId) => eventId !== dailyNonStoryEvent.id),
        );
        setNonStoryRandomEventLastTriggeredDay((prev) => ({
          ...prev,
          [dailyNonStoryEvent.id]: dayCount,
        }));
        setCurrentRandomEvent(dailyNonStoryEvent);
        recordRandomEventTrigger(dailyNonStoryEvent.id);
        startDialogue(
          dailyNonStoryEvent.dialogue,
          "",
          null,
          dailyNonStoryEvent.characterName,
        );
        applyRandomEventRewards(dailyNonStoryEvent.rewards);
        finishTransition();
        return;
      }

      // Story-related random events continue to roll on movement.
      const storyRandomEvent = checkRandomEvent(
        location,
        hour,
        dayOfWeek,
        player,
        gameplayFlags,
        girls,
        randomEventDailyCounts,
        {
          includeStoryRelated: true,
          includeNonStoryRelated: false,
        },
      );
      if (storyRandomEvent) {
        console.log(`Random event: ${storyRandomEvent.name}`);
        setCurrentRandomEvent(storyRandomEvent);
        recordRandomEventTrigger(storyRandomEvent.id);
        startDialogue(
          storyRandomEvent.dialogue,
          "",
          null,
          storyRandomEvent.characterName,
        );
        applyRandomEventRewards(storyRandomEvent.rewards);
      }

      finishTransition();
    }, transitionDurationMs);
  };

  // rewards
  const applyRandomEventRewards = (rewards: RandomEvent["rewards"]) => {
    if (!rewards) return;
    let updated = { ...player };

    if (typeof rewards.money === "number") {
      updated.money += rewards.money;
      console.log(`💰 Money: ${rewards.money > 0 ? "+" : ""}${rewards.money}`);
    }

    if (rewards.item) {
      updated.inventory = [...updated.inventory, rewards.item];
      console.log(`📦 Added ${rewards.item} to inventory`);
    }

    if (rewards.playerStats) {
      updated = applyPlayerStatDelta(updated, rewards.playerStats);
    }

    if (rewards.girlAffection) {
      Object.entries(rewards.girlAffection).forEach(([girlName, change]) => {
        applyGirlStatDelta(girlName, { affection: change });
        console.log(
          `💕 ${girlName} affection: ${change > 0 ? "+" : ""}${change}`,
        );
      });
    }

    if (rewards.girlStats) {
      Object.entries(rewards.girlStats).forEach(([girlName, delta]) => {
        if (!delta) return;
        applyGirlStatDelta(girlName, delta);

        const summary = Object.entries(delta)
          .filter(([, value]) => typeof value === "number")
          .map(([stat, value]) => `${stat}: ${value > 0 ? "+" : ""}${value}`)
          .join(", ");
        if (summary) {
          console.log(`📈 ${girlName} stats: ${summary}`);
        }
      });
    }

    setPlayerWithDebugProtection(updated);
  };

  const getCurrentLocationImage = () =>
    getLocationBackground(currentLocation, hour);
  const currentCharacterImageLocation =
    currentLocation === TESTING_LOCATION_NAME
      ? TESTING_ENVIRONMENT_LOCATION_BY_ID[testingEnvironment]
      : currentLocation;
  const timeOfDay = getTimeOfDay(hour);
  const presentGirls = girls.filter((g) => g.location === currentLocation);
  const irisCurrentLocation = girls.find((girl) => girl.name === "Iris")?.location;
  const irisIsInApartment = irisCurrentLocation
    ? IRIS_APARTMENT_LOCATION_NAMES.has(irisCurrentLocation)
    : false;
  const availableLocations = useMemo(() => {
    const options = locationGraph[currentLocation] ?? [];
    const universityClosed =
      dayOfWeek === "Sunday" ||
      (dayOfWeek === "Saturday" ? hour >= 16 : hour >= 21);
    const currentlyAtUniversity =
      UNIVERSITY_LOCATION_NAMES.has(currentLocation);
    const currentlyInIrisApartment =
      IRIS_APARTMENT_LOCATION_NAMES.has(currentLocation);

    return options.filter((loc) => {
      const isNightLife = NIGHTLIFE_LOCATION_NAMES.has(loc.name);

      if (
        universityClosed &&
        !currentlyAtUniversity &&
        UNIVERSITY_LOCATION_NAMES.has(loc.name)
      ) {
        return false;
      }

      if (isNightLife && !isNightlifeOpenAtHour(hour)) {
        return false;
      }

      if (
        (loc.name === "Cafe" || loc.name === "Gym") &&
        hour >= CAFE_AND_GYM_CLOSING_HOUR
      ) {
        return false;
      }
      if (loc.name === "Mall" && hour >= MALL_CLOSING_HOUR) {
        return false;
      }
      if (loc.name === "Car Store" && hour >= CAR_STORE_CLOSING_HOUR) {
        return false;
      }

      const requiresCar = loc.name === "Beach" || loc.name === "Mountains";
      if (requiresCar && !gameplayFlags.has("hasCar")) {
        return false;
      }

      if (
        IRIS_APARTMENT_LOCATION_NAMES.has(loc.name) &&
        !currentlyInIrisApartment &&
        (!gameplayFlags.has("irisApartmentUnlocked") || !irisIsInApartment)
      ) {
        return false;
      }

      return true;
    });
  }, [currentLocation, dayOfWeek, gameplayFlags, hour, irisIsInApartment]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (!IRIS_APARTMENT_LOCATION_NAMES.has(currentLocation)) return;
    if (irisIsInApartment) return;

    setCurrentLocation("Hallway");
    setSelectedGirl(null);
    showGameNotice("Iris isn't home right now. You head back to the hallway.", {
      tone: "info",
    });
  }, [currentLocation, gameState, irisIsInApartment]);

  const returnToMainMenu = async () => {
    const confirmed = await askGameConfirm(
      "Return to main menu? Any unsaved progress will be lost.",
      {
        confirmLabel: "Return",
        cancelLabel: "Stay",
      },
    );
    if (!confirmed) return;
    setGameState("mainMenu");
    setSelectedGirl(null);
  };
  //handler for name submission
  const handleNameSubmit = (playerName: string) => {
    const nextPlayer = withDerivedMood({ ...defaultPlayerStats, name: playerName });
    const initialDayCount = 0;
    const initialDailyNonStoryRandomEvents = rollDailyNonStoryRandomEventIds({
      day: START_DAY,
      player: nextPlayer,
      gameplayFlags: new Set(),
      girls: baseGirls,
      cooldownByEventId: {},
      currentDayCount: initialDayCount,
      maxEventsPerDay: 2,
      cooldownDays: 7,
    });

    // Reset everything to initial state
    setPlayer(nextPlayer);
    setCurrentLocation("Bedroom");
    setHour(START_HOUR);
    setDayOfWeek(START_DAY);
    setDayCount(initialDayCount);
    setSelectedGirl(null);
    setMetCharacters(new Set());
    setGirlStatsOverrides({});
    setCharacterEventStates({});
    setCharacterUnlocks({
      Yumi: false,
      Gwen: false,
      Dawn: false,
      Ruby: false,
    });
    setScheduledEncounters([]);
    setInteractionHistory({});
    setMessagesByCharacter({});
    setGalleryUnlocks([]);
    setMessageActionHistory({});
    setCalendarMilestones([]);
    setLastPlayerDateAskDayByCharacter({});
    setLastAutoDateAskDayByCharacter({});
    setRandomEventDailyCounts({});
    setDailyNonStoryRandomEventIds(initialDailyNonStoryRandomEvents);
    setNonStoryRandomEventLastTriggeredDay({});
    setHungerProgressRemainder(0);
    setGameplayFlags(new Set());
    setCurrentRandomEvent(null);
    setDailyWorkoutState({
      day: START_DAY,
      total: 0,
      withRuby: 0,
      withoutRuby: 0,
    });
    setRubyWorkoutTotal(0);
    npcDateInviteProcessedDayRef.current = null;

    // Now start the intro
    setGameState("intro");
    setCurrentDialogue(introDialogue);
  };

  // Check what events are available but not yet triggered
  const checkPendingEvents = useCallback(() => {
    const pending: typeof pendingEvents = [];

    girls.forEach((girl) => {
      const events = getCharacterEvents(girl.name);
      const eventState = characterEventStates[girl.name] ?? {
        characterName: girl.name,
        eventHistory: [],
        lastInteractionTime: 0,
      };
      const currentGameTime = calculateGameTime(dayOfWeek, hour, dayCount);
      const currentGameDay = getDayCountFromGameTime(currentGameTime);
      const completedEvents =
        eventState.eventHistory
          .filter((h) => h.timesTriggered > 0)
          .map((h) => h.eventId) || [];
      const storyEventIds = new Set(
        events.filter((event) => !event.repeatable).map((event) => event.id),
      );
      const storyHistory =
        eventState.eventHistory.filter((h) => storyEventIds.has(h.eventId)) ||
        [];
      const completedStoryCount = storyHistory.filter(
        (h) => h.timesTriggered > 0,
      ).length;
      const storyTriggeredToday = storyHistory.some((h) =>
        isEventHistoryFromCurrentDay(h, currentGameDay, dayOfWeek),
      );
      const eventTriggeredToday = eventState.eventHistory.some((h) =>
        isEventHistoryFromCurrentDay(h, currentGameDay, dayOfWeek),
      );
      if (eventTriggeredToday) {
        return;
      }
      const sortedEvents = [...events].sort((a, b) => b.priority - a.priority);
      let triggerable: CharacterEvent | null = null;

      for (const event of sortedEvents) {
        if (!event.repeatable && completedEvents.includes(event.id)) {
          continue;
        }
        if (!event.repeatable) {
          if (storyTriggeredToday) {
            continue;
          }
          if (completedStoryCount > 0) {
            const requiredAffection = completedStoryCount * 5;
            if (girl.stats.affection < requiredAffection) {
              continue;
            }
          }
        }

        const history = eventState.eventHistory.find(
          (h) => h.eventId === event.id,
        );
        if (isEventOnCooldown(event, history, currentGameTime)) {
          continue;
        }

        const locationToCheck = event.conditions.requiredLocation ?? girl.location;
        if (
          checkEventConditions(
            event.conditions,
            girl,
            player,
            locationToCheck,
            dayOfWeek,
            hour,
            completedEvents,
            gameplayFlags,
            event.id,
          )
        ) {
          triggerable = event;
          break;
        }
      }

      if (triggerable) {
        pending.push({
          characterName: girl.name,
          eventId: triggerable.id,
          location: triggerable.conditions.requiredLocation ?? girl.location,
          priority: triggerable.priority,
        });
      }
    });

    setPendingEvents(pending);
  }, [
    girls,
    player,
    dayOfWeek,
    dayCount,
    hour,
    characterEventStates,
    gameplayFlags,
  ]);

  // Run this periodically
  useEffect(() => {
    checkPendingEvents();
  }, [checkPendingEvents]);

  const eventReadyByGirl = useMemo(
    () =>
      new Set(
        pendingEvents
          .filter((e) => e.location === currentLocation)
          .map((e) => e.characterName),
      ),
    [pendingEvents, currentLocation],
  );

  const questItems = useMemo<QuestItem[]>(() => {
    const items: QuestItem[] = [];
    const pendingByCharacter = new Set<string>();

    pendingEvents.forEach((pending) => {
      const events = getCharacterEvents(pending.characterName);
      const event = events.find(
        (candidate) => candidate.id === pending.eventId,
      );
      if (!event) return;

      pendingByCharacter.add(pending.characterName);
      items.push({
        id: pending.eventId,
        title: event.quest?.title ?? event.name,
        description: event.quest?.description,
        location: pending.location ?? event.conditions.requiredLocation,
        timing: getEventTimingHint(event),
        characterName: pending.characterName,
        priority: pending.priority,
      });
    });

    // Add guide or placeholder for characters without a ready event
    girls.forEach((girl) => {
      if (pendingByCharacter.has(girl.name)) {
        return;
      }

      const events = getCharacterEvents(girl.name);
      const eventState = characterEventStates[girl.name] ?? {
        characterName: girl.name,
        eventHistory: [],
        lastInteractionTime: 0,
      };
      const completedEvents =
        eventState.eventHistory
          .filter((h) => h.timesTriggered > 0)
          .map((h) => h.eventId) || [];
      const storyEventIds = new Set(
        events.filter((event) => !event.repeatable).map((event) => event.id),
      );
      const storyHistory =
        eventState.eventHistory.filter((h) => storyEventIds.has(h.eventId)) ||
        [];
      const completedStoryCount = storyHistory.filter(
        (h) => h.timesTriggered > 0,
      ).length;
      const currentGameTime = calculateGameTime(dayOfWeek, hour, dayCount);

      let guideEvent: CharacterEvent | null = null;
      let cooldownGuide:
        | {
            event: CharacterEvent;
            remainingHours: number;
          }
        | null = null;
      const sortedEvents = [...events].sort((a, b) => b.priority - a.priority);

      for (const event of sortedEvents) {
        if (!event.repeatable && completedEvents.includes(event.id)) {
          continue;
        }
        if (!event.repeatable && completedStoryCount > 0) {
          const requiredAffection = completedStoryCount * 5;
          if (girl.stats.affection < requiredAffection) {
            continue;
          }
        }

        const relaxedConditions = { ...event.conditions };
        delete relaxedConditions.minHour;
        delete relaxedConditions.maxHour;
        delete relaxedConditions.specificDay;
        delete relaxedConditions.requiredLocation;

        if (!checkEventConditions(
          relaxedConditions,
          girl,
          player,
          currentLocation,
          dayOfWeek,
          hour,
          completedEvents,
          gameplayFlags,
          event.id,
        )) {
          continue;
        }

        const history = eventState.eventHistory.find(
          (h) => h.eventId === event.id,
        );
        if (isEventOnCooldown(event, history, currentGameTime)) {
          const cooldownHours = event.cooldownHours ?? 0;
          const elapsedHours = history
            ? currentGameTime - history.lastTriggered.gameTime
            : 0;
          const remainingHours = Math.max(
            1,
            Math.ceil(cooldownHours - elapsedHours),
          );
          cooldownGuide = { event, remainingHours };
          break;
        }

        guideEvent = event;
        break;
      }

      if (cooldownGuide) {
        const { event, remainingHours } = cooldownGuide;
        items.push({
          id: `${event.id}_cooldown`,
          title: event.quest?.title ?? event.name,
          description: `Be patient. ${girl.name} needs a little time before this can continue (${remainingHours}h remaining).`,
          location: event.conditions.requiredLocation ?? girl.location,
          timing: getEventTimingHint(event),
          characterName: girl.name,
          priority: event.priority,
        });
        return;
      }

      if (guideEvent) {
        items.push({
          id: guideEvent.id,
          title: guideEvent.quest?.title ?? guideEvent.name,
          description: guideEvent.quest?.description,
          location: guideEvent.conditions.requiredLocation ?? girl.location,
          timing: getEventTimingHint(guideEvent),
          characterName: girl.name,
          priority: guideEvent.priority,
        });
        return;
      }

      items.push({
        id: `todo_placeholder_${girl.name.toLowerCase().replace(/\s+/g, "_")}`,
        title: `Get to know ${girl.name} better`,
        characterName: girl.name,
        priority: -1,
      });
    });

    return items.sort((a, b) => b.priority - a.priority);
  }, [
    pendingEvents,
    girls,
    characterEventStates,
    gameplayFlags,
    player,
    dayOfWeek,
    dayCount,
    hour,
    currentLocation,
  ]);

  const hasInteractedToday = useCallback(
    (girlName: string, actionLabel: string) => {
      const key = `${dayCount}:${girlName}`;
      const set = interactionHistory[key];
      return set ? set.has(actionLabel) : false;
    },
    [dayCount, interactionHistory],
  );

  const recordInteraction = useCallback(
    (girlName: string, actionLabel: string) => {
      const key = `${dayCount}:${girlName}`;
      setInteractionHistory((prev) => {
        const current = prev[key] ? new Set(prev[key]) : new Set<string>();
        current.add(actionLabel);
        return { ...prev, [key]: current };
      });

      if (actionLabel === "Kiss") {
        recordCalendarMilestone(girlName, "first_kiss", "First kiss together.");
      }
      if (actionLabel === "Sex") {
        recordCalendarMilestone(
          girlName,
          "first_sex",
          "First intimate night together.",
        );
      }

      if (currentLocation === TESTING_LOCATION_NAME) {
        return;
      }

      const girlsAtLocation = girls.filter((girl) => girl.location === currentLocation);
      if (girlsAtLocation.length < 2) {
        return;
      }

      const witnessingGirls = girlsAtLocation.filter(
        (girl) =>
          girl.name !== girlName &&
          isChapterTwoOrHigher(girl.name, gameplayFlags),
      );
      if (witnessingGirls.length === 0) {
        return;
      }

      witnessingGirls.forEach((girl) => {
        applyGirlStatDelta(girl.name, { affection: -1, lust: -1 });
      });
    },
    [
      applyGirlStatDelta,
      currentLocation,
      dayCount,
      gameplayFlags,
      girls,
      recordCalendarMilestone,
    ],
  );

  const handleLogin = useCallback((username: string, password: string) => {
    if (!verifyCredentials(username, password)) {
      return false;
    }

    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(buildAuthSession()));
    setIsAuthenticated(true);
    return true;
  }, []);

  const handleLogout = useCallback(async () => {
    const confirmed = await askGameConfirm(
      "Log out and return to the login screen?",
      {
        confirmLabel: "Log out",
        cancelLabel: "Stay",
      },
    );
    if (!confirmed) return;

    localStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setShowPhone(false);
    setShowTutorial(false);
    showGameNotice("Logged out.", { tone: "info" });
  }, []);

  const gameFeedbackOverlays = (
    <>
      {activeGameConfirm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border-2 border-purple-700 bg-gray-900 p-5 shadow-2xl">
            <h3 className="text-lg font-bold text-purple-300">Confirm Action</h3>
            <p className="mt-2 text-sm text-gray-200">{activeGameConfirm.message}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => resolveGameConfirm(false)}
                className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-800"
              >
                {activeGameConfirm.cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => resolveGameConfirm(true)}
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500"
              >
                {activeGameConfirm.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (!authChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        communicationEmail={SINGLE_USER_ACCOUNT.email}
        darkMode={darkMode}
      />
    );
  }

  if (gameState == "nameInput") {
    return <NameInput onNameSubmit={handleNameSubmit} darkMode={darkMode} />;
  }

  // screens
  if (gameState === "mainMenu") {
    return (
      <>
        <MainMenu
          onNewGame={newGame}
          onContinue={loadAutoSave}
          onLoad={loadGame}
          hasAutoSave={hasAutoSave}
          hasManualSave={hasManualSave}
          darkMode={darkMode}
        />
        {gameFeedbackOverlays}
      </>
    );
  }

  // ===== FIRST LOCATION updated: pass isMobile and locationImage =====
  if ((gameState === "intro" || gameState === "dialogue") && currentDialogue) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
            : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
        }`}
      >
        <DialogueBox
          dialogue={currentDialogue}
          onComplete={currentRandomEvent ? endRandomEventDialogue : endDialogue}
          darkMode={darkMode}
          isClosing={isDialogueClosing}
          characterImage={dialogueCharacterImage}
          characterName={dialogueGirlName}
          playerName={player.name}
          onSkip={
            gameState === "intro"
              ? () => {
                  closeDialogue(() => {
                    setGameState("playing");
                    setCurrentDialogue(null);
                    setDialogueCharacterImage("");
                    setDialogueCharacterImageLocationOverride(null);
                    setDialogueGirlEffects(null);
                    setDialogueGirlName("");
                    setSelectedGirl(null);
                  });
                }
              : undefined
          }
          onNextDialogueId={goToDialogueByEventId}
          isMobile={isMobile}
          textSpeed={textSpeed}
          locationImage={getCurrentLocationImage()}
          characterImageLocation={
            dialogueCharacterImageLocationOverride ?? currentCharacterImageLocation
          }
          // midgroundImage={getCurrentLocationImage()}
          // midgroundOpacity={0.3}
          // midgroundBlend="normal"
          // midgroundFit="cover"
          currentLocation={currentLocation}
          currentHour={hour}
          currentDay={dayOfWeek}
          playerStats={player}
          girlStats={
            selectedGirl?.stats ||
            (dialogueGirlName
              ? girls.find((g) => g.name === dialogueGirlName)?.stats
              : undefined)
          }
        />
      </div>
    );
  }

  const mobileCharacterOverlay =
    isMounted && selectedGirl && isMobile
      ? createPortal(
        <div
            className="fixed inset-0 z-[2200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedGirl(null)}
          >
            <div
              className="w-full max-w-md max-h-[90vh] overflow-y-auto relative z-[2210]"
              onClick={(e) => e.stopPropagation()}
            >
              <CharacterOverlay
                girl={selectedGirl}
                location={currentLocation}
                characterImageLocation={currentCharacterImageLocation}
                player={player}
                gameplayFlags={gameplayFlags}
                setPlayer={setPlayerWithDebugProtection}
                spendTime={spendTime}
                onClose={() => setSelectedGirl(null)}
                onStartDialogue={startDialogue}
                dayOfWeek={dayOfWeek}
                dayCount={dayCount}
                hour={hour}
                eventState={
                  characterEventStates[selectedGirl.name] ?? {
                    characterName: selectedGirl.name,
                    eventHistory: [] as EventHistory[],
                    lastInteractionTime: calculateGameTime(dayOfWeek, hour, dayCount),
                  }
                }
                onEventTriggered={onEventTriggered}
                darkMode={darkMode}
                onScheduleDate={handleScheduleDate}
                hasInteractedToday={hasInteractedToday}
                onInteractionLogged={recordInteraction}
                onSetFlag={setFlag}
                onUnlockCharacter={unlockCharacter}
                variant="modal"
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      }`}
    >
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:[grid-template-columns:240px_minmax(0,1fr)_320px] gap-6">
          {/* Left Sidebar */}
          {!isMobile && (
            <div className="hidden self-start lg:block lg:sticky lg:top-4">
              <StatsPanel
                stats={player}
                hour={hour}
                dayOfWeek={dayOfWeek}
                darkMode={darkMode}
                onSave={saveGame}
              />
              <div className="mt-4 flex items-center gap-2 overflow-visible">
                <IconHoverButton
                  label="Help"
                  onClick={() => setShowTutorial(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </IconHoverButton>
                <IconHoverButton
                  label="Phone"
                  onClick={() => setShowPhone(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                    <path d="M11 18h2" />
                  </svg>
                </IconHoverButton>
                <IconHoverButton
                  label="Menu"
                  onClick={() => setGameState("paused")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </svg>
                </IconHoverButton>
              </div>
            </div>
          )}

          {/* Main */}
          <div className="relative min-w-0 space-y-6">
            {gameNotices.length > 0 && (
              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1900] flex -translate-y-1/2 justify-center px-4">
                <div className="flex w-full max-w-lg flex-col gap-2">
                  {gameNotices.map((notice) => (
                    <div
                      key={notice.id}
                      className={`rounded-xl border px-4 py-3 text-center text-sm shadow-lg backdrop-blur transition-[opacity,transform,filter] duration-700 ease-out ${
                        NOTICE_CLASS_BY_TONE[notice.tone]
                      } ${
                        notice.isLeaving
                          ? "-translate-y-1 opacity-0 blur-[1px]"
                          : "translate-y-0 opacity-100 blur-0"
                      }`}
                    >
                      {notice.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className="flex items-center gap-2 overflow-visible">
                <IconHoverButton
                  label="Help"
                  onClick={() => setShowTutorial(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </IconHoverButton>
                <IconHoverButton
                  label="Phone"
                  onClick={() => setShowPhone(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                    <path d="M11 18h2" />
                  </svg>
                </IconHoverButton>
                <IconHoverButton
                  label="Menu"
                  onClick={() => setGameState("paused")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </svg>
                </IconHoverButton>
              </div>
            )}

            {/* Scene */}
            <SceneView
              darkMode={darkMode}
              currentLocation={currentLocation}
              characterImageLocation={currentCharacterImageLocation}
              timeOfDay={timeOfDay}
              locationDescriptions={locationDescriptions}
              getCurrentLocationImage={getCurrentLocationImage}
              presentGirls={presentGirls}
              eventReadyByGirl={eventReadyByGirl}
              selectedGirl={selectedGirl}
              onSelectGirl={setSelectedGirl}
              hour={hour}
              isLocationTransitioning={isLocationTransitioning}
              hideCharacters={isMobile && selectedGirl !== null}
            />

            <LocationPanels
              isMobile={isMobile}
              showActivitiesMenu={showActivitiesMenu}
              onToggleActivitiesMenu={() =>
                setShowActivitiesMenu((prev) => !prev)
              }
              showWhereMenu={showWhereMenu}
              onToggleWhereMenu={() => setShowWhereMenu((prev) => !prev)}
              currentLocation={currentLocation}
              darkMode={darkMode}
              dayOfWeek={dayOfWeek}
              hour={hour}
              gameplayFlags={gameplayFlags}
              dailyWorkoutState={dailyWorkoutState}
              onLogWorkout={logWorkout}
              onAdjustGirlStats={applyGirlStatDelta}
              player={player}
              setPlayer={setPlayerWithDebugProtection}
              spendTime={spendTime}
              onTriggerEvent={triggerSpecificEvent}
              onSetFlag={setFlag}
              availableLocations={availableLocations}
              moveTo={moveTo}
              girls={girls}
              scheduledEncounters={scheduledEncounters}
              pendingEvents={pendingEvents}
              isLocationTransitioning={isLocationTransitioning}
              testingEnvironment={testingEnvironment}
              onSetTestingEnvironment={setTestingEnvironment}
              onPassOut={handleSobrietyBlackout}
            />
          </div>

          <RightSidebar
            selectedGirl={selectedGirl}
            currentLocation={currentLocation}
            characterImageLocation={currentCharacterImageLocation}
            player={player}
            gameplayFlags={gameplayFlags}
            setPlayer={setPlayerWithDebugProtection}
            spendTime={spendTime}
            onCloseSelectedGirl={() => setSelectedGirl(null)}
            onStartDialogue={startDialogue}
            dayOfWeek={dayOfWeek}
            dayCount={dayCount}
            hour={hour}
            eventState={
              selectedGirl
                ? characterEventStates[selectedGirl.name] ?? {
                    characterName: selectedGirl.name,
                    eventHistory: [] as EventHistory[],
                    lastInteractionTime: calculateGameTime(dayOfWeek, hour, dayCount),
                  }
                : null
            }
            onEventTriggered={onEventTriggered}
            darkMode={darkMode}
            onScheduleDate={handleScheduleDate}
            hasInteractedToday={hasInteractedToday}
            onInteractionLogged={recordInteraction}
            onSetFlag={setFlag}
            onUnlockCharacter={unlockCharacter}
            isMobile={isMobile}
            onTriggerEvent={triggerSpecificEvent}
            dailyWorkoutState={dailyWorkoutState}
            onLogWorkout={logWorkout}
            onAdjustGirlStats={applyGirlStatDelta}
            testingEnvironment={testingEnvironment}
            onSetTestingEnvironment={setTestingEnvironment}
            onPassOut={handleSobrietyBlackout}
          />
        </div>
      </div>

      {/* Pause Menu */}
      {gameState === "paused" && (
        <PauseMenu
          onResume={() => setGameState("playing")}
          onSave={() => {
            saveGame();
            setGameState("playing");
          }}
          onMainMenu={returnToMainMenu}
          textSpeed={textSpeed}
          onTextSpeedChange={setTextSpeed}
        />
      )}

      {/* Safety: Dialogue while playing — updated to pass isMobile & locationImage */}
      {currentDialogue && gameState === "dialogue" && (
        <DialogueBox
          dialogue={currentDialogue}
          onComplete={currentRandomEvent ? endRandomEventDialogue : endDialogue}
          darkMode={darkMode}
          isClosing={isDialogueClosing}
          characterImage={currentRandomEvent ? "" : dialogueCharacterImage}
          onNextDialogueId={goToDialogueByEventId}
          isMobile={isMobile}
          textSpeed={textSpeed}
          locationImage={getCurrentLocationImage()}
          characterImageLocation={
            dialogueCharacterImageLocationOverride ?? currentCharacterImageLocation
          }
          currentLocation={currentLocation}
          currentHour={hour}
          currentDay={dayOfWeek}
          playerStats={player}
          girlStats={
            selectedGirl?.stats ||
            (dialogueGirlName
              ? girls.find((g) => g.name === dialogueGirlName)?.stats
              : undefined)
          }
        />
      )}

      {/* Phone Menu */}
      {showPhone && (
        <PhoneMenu
          player={player}
          hour={hour}
          girls={girls}
          gameplayFlags={gameplayFlags}
          messagesByCharacter={messagesByCharacter}
          galleryUnlocks={galleryUnlocks}
          onSendMessageAction={handleSendMessageAction}
          darkMode={darkMode}
          onClose={() => setShowPhone(false)}
          onSave={saveGame}
          onLogout={handleLogout}
          isMobile={isMobile}
          dayOfWeek={dayOfWeek}
          dayCount={dayCount}
          quests={questItems}
          calendarPlannedDates={calendarPlannedDates}
          calendarMilestones={calendarMilestones}
        />
      )}

      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay
          onClose={() => setShowTutorial(false)}
          isMobile={isMobile}
          darkMode={darkMode}
        />
      )}

      {!isMobile && (
        <div className="fixed bottom-4 left-4 z-[1800]">
          <button
            type="button"
            onClick={() => setShowDebugPanel((prev) => !prev)}
            className="rounded-lg border border-cyan-400 bg-cyan-900/90 px-3 py-2 text-xs font-semibold text-cyan-100 shadow-lg hover:bg-cyan-800/90"
          >
            {showDebugPanel ? "Hide Debug" : "Show Debug"}
          </button>
        </div>
      )}

      {showDebugPanel &&
        !isMobile && (
          <div className="fixed bottom-16 left-4 z-[1800] w-[380px] max-h-[70vh] overflow-hidden rounded-xl border border-cyan-500 bg-gray-900/95 shadow-2xl backdrop-blur">
            <div className="border-b border-cyan-700 px-3 py-2 text-sm font-bold text-cyan-200">
              Event Debugger
            </div>
            <div className="space-y-3 overflow-y-auto p-3 text-xs text-gray-200">
              <div className="space-y-1 rounded border border-cyan-700/60 bg-cyan-900/20 p-2">
                <div className="font-semibold text-cyan-200">Fast Travel</div>
                <div className="flex gap-2">
                  <select
                    value={debugTravelLocation}
                    onChange={(event) => setDebugTravelLocation(event.target.value)}
                    className="min-w-0 flex-1 rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                  >
                    {DEBUG_FAST_TRAVEL_LOCATIONS.map((locationName) => (
                      <option key={locationName} value={locationName}>
                        {locationName}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => moveTo(debugTravelLocation)}
                    disabled={
                      isLocationTransitioning ||
                      debugTravelLocation === currentLocation
                    }
                    className={`rounded border px-2 py-1 text-xs font-semibold transition ${
                      isLocationTransitioning ||
                      debugTravelLocation === currentLocation
                        ? "cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500"
                        : "border-cyan-400 bg-cyan-900/80 text-cyan-100 hover:bg-cyan-800/90"
                    }`}
                  >
                    Go
                  </button>
                </div>
              </div>

              <div className="space-y-1 rounded border border-cyan-700/60 bg-cyan-900/20 p-2">
                <label className="flex items-center gap-2 text-cyan-100">
                  <input
                    type="checkbox"
                    checked={debugFreezeVitals}
                    onChange={(event) => setDebugFreezeVitals(event.target.checked)}
                    className="h-4 w-4 accent-cyan-400"
                  />
                  <span className="font-semibold">Freeze Hunger/Energy Loss</span>
                </label>
                <div className="text-[11px] text-cyan-300/90">
                  While enabled, hunger will not increase and energy will not decrease.
                </div>
              </div>

              <div className="space-y-1 rounded border border-cyan-700/60 bg-cyan-900/20 p-2">
                <div className="font-semibold text-cyan-200">Economy</div>
                <button
                  type="button"
                  onClick={grantDebugMoney}
                  className="w-full rounded border border-cyan-400 bg-cyan-900/80 px-2 py-1 text-left text-xs font-semibold text-cyan-100 transition hover:bg-cyan-800/90"
                >
                  Set Money: 99,999
                </button>
              </div>

              <div className="space-y-2 rounded border border-cyan-700/60 bg-cyan-900/20 p-2">
                <div className="font-semibold text-cyan-200">Iris Story Skip</div>

                <div className="space-y-1">
                  <label className="block text-cyan-300">Checkpoint</label>
                  <select
                    value={debugIrisSkipCheckpoint}
                    onChange={(event) =>
                      setDebugIrisSkipCheckpoint(
                        event.target.value as IrisSkipCheckpoint,
                      )
                    }
                    className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                  >
                    {IRIS_SKIP_CHECKPOINT_ORDER.map((checkpoint) => (
                      <option key={checkpoint} value={checkpoint}>
                        {IRIS_SKIP_CHECKPOINT_LABEL[checkpoint]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-cyan-300">Iris Route</label>
                  <select
                    value={debugIrisRoute}
                    onChange={(event) =>
                      setDebugIrisRoute(event.target.value as IrisRouteChoice)
                    }
                    className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                  >
                    {debugIrisRouteOptions.map((route) => (
                      <option key={route} value={route}>
                        {IRIS_ROUTE_LABEL[route]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-cyan-300">Chapter 1 Coffee Path</label>
                  <select
                    value={debugIrisCoffeeChoice}
                    onChange={(event) =>
                      setDebugIrisCoffeeChoice(
                        event.target.value as IrisCoffeeChoice,
                      )
                    }
                    className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                  >
                    <option value="accepted">Accepted coffee invite</option>
                    <option value="declined">Declined (forced meetup)</option>
                  </select>
                </div>

                {showIrisPublicChoiceControl && (
                  <div className="space-y-1">
                    <label className="block text-cyan-300">Event 3 Public Choice</label>
                    <select
                      value={debugIrisPublicChoice}
                      onChange={(event) =>
                        setDebugIrisPublicChoice(
                          event.target.value as IrisPublicChoice,
                        )
                      }
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                    >
                      <option value="accept">Accepted (school kiss unlocked)</option>
                      <option value="refuse">Refused (public denied)</option>
                    </select>
                  </div>
                )}

                {showIrisDomDeniedResolutionControl && (
                  <div className="space-y-1">
                    <label className="block text-cyan-300">Dom Denied Resolution</label>
                    <select
                      value={debugIrisDomDeniedResolution}
                      onChange={(event) =>
                        setDebugIrisDomDeniedResolution(
                          event.target.value as IrisDomDeniedResolution,
                        )
                      }
                      className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                    >
                      <option value="exclusive">Exclusive recommit</option>
                      <option value="explore">Explore/open lane</option>
                    </select>
                  </div>
                )}

                {showIrisC3Controls && (
                  <>
                    <div className="space-y-1">
                      <label className="block text-cyan-300">Chapter 3 Event 1 Outcome</label>
                      <select
                        value={debugIrisC3Outcome}
                        onChange={(event) =>
                          setDebugIrisC3Outcome(
                            event.target.value as IrisC3Outcome,
                          )
                        }
                        className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                      >
                        <option value="keep_locked">Kept route (locked)</option>
                        <option value="shift_success">Tried to change (success)</option>
                        <option value="shift_failed">Tried to change (failed)</option>
                      </select>
                    </div>

                    {debugIrisC3Outcome === "shift_success" && (
                      <div className="space-y-1">
                        <label className="block text-cyan-300">Shifted To</label>
                        <select
                          value={debugIrisC3TargetRoute}
                          onChange={(event) =>
                            setDebugIrisC3TargetRoute(
                              event.target.value as IrisRouteChoice,
                            )
                          }
                          className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                        >
                          <option value="dom">Dom</option>
                          <option value="sub">Sub</option>
                          <option value="middle">Middle</option>
                        </select>
                      </div>
                    )}

                    <label className="flex items-center gap-2 text-cyan-100">
                      <input
                        type="checkbox"
                        checked={debugIrisKissedAnotherGirl}
                        onChange={(event) =>
                          setDebugIrisKissedAnotherGirl(event.target.checked)
                        }
                        className="h-4 w-4 accent-cyan-400"
                      />
                      <span className="font-semibold">
                        Mark &quot;player kissed another girl&quot;
                      </span>
                    </label>
                  </>
                )}

                <button
                  type="button"
                  onClick={applyIrisStorySkip}
                  className="w-full rounded border border-cyan-400 bg-cyan-900/80 px-2 py-1 text-left text-xs font-semibold text-cyan-100 transition hover:bg-cyan-800/90"
                >
                  Apply Iris Skip + Max Stats
                </button>

                <div className="text-[11px] text-cyan-300/90">
                  Sets checkpoint flags, branch flags, Iris event history, and maxed player/girl stats.
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-cyan-300">Character</label>
                <select
                  value={debugCharacterName}
                  onChange={(event) => setDebugCharacterName(event.target.value)}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                >
                  {debugCharacterOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={maxDebugCharacterStats}
                  disabled={!debugCharacterName}
                  className={`w-full rounded border px-2 py-1 text-left text-xs font-semibold transition ${
                    !debugCharacterName
                      ? "cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500"
                      : "border-cyan-400 bg-cyan-900/80 text-cyan-100 hover:bg-cyan-800/90"
                  }`}
                >
                  Max Selected Character Stats
                </button>
              </div>

              <div className="space-y-1">
                <label className="block text-cyan-300">Event</label>
                <select
                  value={debugEventId}
                  onChange={(event) => setDebugEventId(event.target.value)}
                  className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
                >
                  {debugCharacterEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} ({event.id})
                    </option>
                  ))}
                </select>
              </div>

              {debugEventReport ? (
                <div className="space-y-2 rounded border border-gray-700 bg-gray-800 p-2">
                  <div className="font-semibold text-cyan-200">
                    {debugEventReport.event.name}
                  </div>
                  <div>Event ID: {debugEventReport.event.id}</div>
                  <div>Target Location: {debugEventReport.targetLocation}</div>
                  <div>Timing: {debugEventReport.timing}</div>
                  <div className={debugEventReport.isReady ? "text-green-300" : "text-red-300"}>
                    Status: {debugEventReport.isReady ? "Ready" : "Blocked"}
                  </div>
                  {debugEventReport.reasons.length > 0 ? (
                    <div className="space-y-1">
                      <div className="font-semibold text-red-300">Blockers</div>
                      {debugEventReport.reasons.map((reason, index) => (
                        <div key={`${debugEventReport.event.id}_reason_${index}`}>
                          - {reason}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-green-300">
                      No blockers detected by the current state checks.
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded border border-gray-700 bg-gray-800 p-2 text-gray-400">
                  No event selected.
                </div>
              )}

              <div className="rounded border border-gray-700 bg-gray-800 p-2">
                <div className="mb-1 font-semibold text-cyan-200">
                  Active Flags ({activeFlags.length})
                </div>
                {activeFlags.length > 0 ? (
                  <div className="max-h-40 space-y-0.5 overflow-y-auto pr-1 text-[11px]">
                    {activeFlags.map((flag) => (
                      <div key={flag}>{flag}</div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400">No active gameplay flags.</div>
                )}
              </div>
            </div>
          </div>
        )}

      {gameFeedbackOverlays}

      {mobileCharacterOverlay}
    </div>
  );
}


