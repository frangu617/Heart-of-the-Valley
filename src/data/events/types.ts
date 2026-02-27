// src/data/events/types.ts
import type { Dialogue } from "../dialogues";
import type { GirlStats } from "../characters";
// import { GirlStats } from "../characters";

export type GameplayFlag =
  | "hasMetIris"
  | "hasSeenDawn"
  | "hasMetDawn"
  | "hasMetGwen"
  | "hasMetYumi"
  | "hasMetRuby"
  | "hasCar"
  | "irisApartmentUnlocked"
  | "firstWorkout"
  | "firstTimeWorked"
  | "firstTimeCookedMeal"
  | "firstTimeStudied"
  | "firstDateCompleted"
  | "irisNeedsNewShirt"
  | "irisCoffeeAccepted"
  | "irisCoffeeDeclined"
  | "irisCoffeeMet"
  | "irisDomPath"
  | "irisSubPath"
  | "irisNeutralPath"
  | "irisCh1FinaleComplete"
  | "irisCh2Ev1_Done"
  | "irisCh2Ev2_Done"
  | "irisCh2Ev3_Done"
  | "irisCh2Ev4_Done"
  | "irisSchoolKissUnlocked"
  | "irisPublicRefused"
  | "irisDatePlanned"
  | "irisDomAcceptedKissLoopActive"
  | "irisDomDeniedKissLoopActive"
  | "irisDomDeniedSeen1"
  | "irisDomDeniedSeen2"
  | "irisDomDeniedSeen3"
  | "irisDomDeniedExclusive"
  | "irisDomDeniedExplore"
  | "irisNtrSeeded"
  | "irisKissOthersChoiceMade"
  | "irisKissOthersEnabled"
  | "irisCh2Complete"
  | "irisCh3Ev1_Done"
  | "irisCh3Ev2_Done"
  | "irisC3PathOriginDom"
  | "irisC3PathOriginSub"
  | "irisC3PathOriginMiddle"
  | "irisC3PathCurrentDom"
  | "irisC3PathCurrentSub"
  | "irisC3PathCurrentMiddle"
  | "irisC3PathLocked"
  | "irisC3PathShiftAttempted"
  | "irisC3PathShiftSucceeded"
  | "dawnFallbackReady"
  | "dawnIrritatedFallbackSeen"
  | "dawnSummonQueued"
  | "dawnSummonQueuedFromKiss"
  | "dawnSummonQueuedTonight"
  | "dawnSummonTriggered"
  | "playerKissedAnotherGirl"
  | "metMysteryGirl"
  | "iris_intro_done"
  | "iris_coffee_done"
  | "iris_hallway_invite_done"
  | "iris_mall_bump_done"
  | "gwenDomPath"
  | "gwenSubPath"
  | "gwenIntroDone"
  | "gwenDoorMixupDone"
  | "gwenApologyDone"
  | "gwenRumorHeard"
  | "gwenRevealDone"
  | "gwen_chapter_1_completed"
  | "rubyTrainerAccepted"
  | "rubyTrainerDeclined"
  | "rubyCh1Ev2Done"
  | "rubyCh1Ev3Done"
  | "rubyCh1Ev4Done"
  | "ruby_chapter_1_completed"
  | "rubyWorkoutCount1"
  | "rubyWorkoutCount2"
  | "rubyWorkoutCount3"
  | "rubySoloWorkout1"
  | "rubySoloWorkout2"
  | "rubySoloWorkout3"
  | "rubyIsHiding"
  | "rubyExConflictStarted"
  | "rubyBarComforted"
  | "rubyBarWalkedAway"
  | "yumiDomPath"
  | "yumiSubPath"
  | "yumi_chapter_1_completed"
  | "yumi_chapter_2_started"
  | "yumi_c2_event_2_completed"
  | "yumi_relationship_secret"
  | "yumi_relationship_secret_dom"
  | "yumi_relationship_secret_neutral"
  | "yumi_relationship_stalled"
  | "yumi_romance_ended"
  | "yumi_c2_event_3_completed"
  | "yumi_c2_event_4_completed"
  | "yumi_chapter_2_date"
  | "yumi_chapter_2_completed"
  | "metDawn";

export type EventConditions = {
  // Minimum stat requirements
  minAffection?: number;
  minLust?: number;
  minLove?: number;
  minMood?: number;
  minDominance?: number;

  // Maximum stat requirements (for specific scenarios)
  maxAffection?: number;
  maxLust?: number;
  maxDominance?: number;

  // Player requirements
  minPlayerIntelligence?: number;
  minPlayerFitness?: number;
  minPlayerStyle?: number;
  minPlayerMoney?: number;

  // Time requirements
  minHour?: number; // Event only triggers after this hour
  maxHour?: number; // Event only triggers before this hour
  specificDay?: string; // Event only on specific day

  // Location requirements
  requiredLocation?: string;

  // Story requirements
  requiredPreviousEvents?: string[]; // Must have completed these events first
  blockedByEvents?: string[]; // Cannot have completed these events

  // Flag requirements
  requiredFlags?: GameplayFlag[];
  blockedByFlags?: GameplayFlag[];
};

export type CharacterEvent = {
  id: string;
  name: string;
  description: string; // For debugging/admin
  quest?: {
    title: string;
    description?: string;
  };

  // Requirements to trigger
  conditions: EventConditions;

  // Cooldown in game hours before this event can trigger again
  cooldownHours?: number;

  // Can this event repeat, or is it one-time only?
  repeatable: boolean;

  // Priority (higher priority events check first)
  priority: number;

  // The actual dialogue/content
  dialogue: Dialogue;

  // Optional: Rewards or stat changes after completing event
  rewards?: {
    playerMoney?: number;
    playerStats?: {
      intelligence?: number;
      fitness?: number;
      style?: number;
    };
    girlStats?: Partial<GirlStats>;
    setFlags?: GameplayFlag[];
    unlockCharacters?: string[];
  };
};

export type EventHistory = {
  eventId: string;
  lastTriggered: {
    day: string;
    hour: number;
    gameTime: number; // Total game hours elapsed
  };
  timesTriggered: number;
};

export type CharacterEventState = {
  characterName: string;
  eventHistory: EventHistory[];
  lastInteractionTime: number; // Total game hours
};
