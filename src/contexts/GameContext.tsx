// src/contexts/GameContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import {
  PlayerStats,
  defaultPlayerStats,
  Girl,
  GirlStats,
  girls as baseGirls,
} from "../data/characters";
import {
  DayOfWeek,
  START_DAY,
  START_HOUR,
  MAX_HOUR,
  getNextDay,
} from "../data/gameConstants";
import { CharacterEventState, EventHistory } from "../data/events/types";
import { getScheduledLocation } from "../lib/schedule";

// ===== TYPES =====
export type GameState =
  | "mainMenu"
  | "intro"
  | "playing"
  | "paused"
  | "dialogue";

export type ScheduledEncounter = {
  characterName: string;
  location: string;
  eventId: string;
  label?: string;
  day?: string;
  hour?: number;
  activities?: string[];
};

export interface GameStateData {
  // Core game state
  gameState: GameState;
  player: PlayerStats;
  currentLocation: string;
  hour: number;
  dayOfWeek: DayOfWeek;

  // Character state
  selectedGirl: Girl | null;
  girlStatsOverrides: Record<string, Partial<GirlStats>>;
  characterEventStates: Record<string, CharacterEventState>;
  characterUnlocks: {
    Yumi: boolean;
    Gwen: boolean;
    Dawn: boolean;
    Ruby: boolean;
  };
  metCharacters: Set<string>;

  // Events & encounters
  scheduledEncounters: ScheduledEncounter[];

  // UI state
  darkMode: boolean;
  showPhone: boolean;
  hasSaveData: boolean;
}

// ===== ACTIONS =====
export type GameAction =
  // Game state actions
  | { type: "SET_GAME_STATE"; payload: GameState }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "TOGGLE_PHONE" }
  | { type: "SET_PHONE"; payload: boolean }

  // Player actions
  | { type: "SET_PLAYER"; payload: PlayerStats }
  | { type: "UPDATE_PLAYER"; payload: Partial<PlayerStats> }
  | { type: "ADD_MONEY"; payload: number }
  | { type: "ADD_INVENTORY_ITEM"; payload: string }
  | { type: "REMOVE_INVENTORY_ITEM"; payload: string }

  // Time & location actions
  | { type: "SPEND_TIME"; payload: number }
  | { type: "SET_TIME"; payload: { hour: number; day: DayOfWeek } }
  | { type: "MOVE_TO"; payload: string }

  // Character actions
  | { type: "SELECT_GIRL"; payload: Girl | null }
  | {
      type: "UPDATE_GIRL_STATS";
      payload: { name: string; stats: Partial<GirlStats> };
    }
  | {
      type: "UNLOCK_CHARACTER";
      payload: keyof GameStateData["characterUnlocks"];
    }
  | { type: "ADD_MET_CHARACTER"; payload: string }
  | {
      type: "UPDATE_CHARACTER_EVENT_STATE";
      payload: { name: string; state: CharacterEventState };
    }

  // Encounter actions
  | { type: "SCHEDULE_ENCOUNTER"; payload: ScheduledEncounter }
  | {
      type: "REMOVE_ENCOUNTER";
      payload: { characterName: string; eventId: string };
    }
  | { type: "CLEAR_ENCOUNTERS_AT_LOCATION"; payload: string }

  // Save/Load actions
  | { type: "LOAD_GAME"; payload: Partial<GameStateData> }
  | { type: "RESET_GAME" }
  | { type: "SET_HAS_SAVE_DATA"; payload: boolean };

// ===== INITIAL STATE =====
const initialState: GameStateData = {
  gameState: "mainMenu",
  player: defaultPlayerStats,
  currentLocation: "Bedroom",
  hour: START_HOUR,
  dayOfWeek: START_DAY,

  selectedGirl: null,
  girlStatsOverrides: {},
  characterEventStates: {},
  characterUnlocks: {
    Yumi: false,
    Gwen: false,
    Dawn: false,
    Ruby: false,
  },
  metCharacters: new Set(),

  scheduledEncounters: [],

  darkMode: false,
  showPhone: false,
  hasSaveData: false,
};

// ===== REDUCER =====
function gameReducer(state: GameStateData, action: GameAction): GameStateData {
  switch (action.type) {
    // Game state actions
    case "SET_GAME_STATE":
      return { ...state, gameState: action.payload };

    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    case "TOGGLE_PHONE":
      return { ...state, showPhone: !state.showPhone };

    case "SET_PHONE":
      return { ...state, showPhone: action.payload };

    // Player actions
    case "SET_PLAYER":
      return { ...state, player: action.payload };

    case "UPDATE_PLAYER":
      return {
        ...state,
        player: { ...state.player, ...action.payload },
      };

    case "ADD_MONEY":
      return {
        ...state,
        player: {
          ...state.player,
          money: Math.max(0, state.player.money + action.payload),
        },
      };

    case "ADD_INVENTORY_ITEM":
      return {
        ...state,
        player: {
          ...state.player,
          inventory: [...state.player.inventory, action.payload],
        },
      };

    case "REMOVE_INVENTORY_ITEM":
      return {
        ...state,
        player: {
          ...state.player,
          inventory: state.player.inventory.filter(
            (item) => item !== action.payload
          ),
        },
      };

    // Time & location actions
    case "SPEND_TIME": {
      const newHour = state.hour + action.payload;

      if (newHour >= MAX_HOUR) {
        // New day
        const nextDay = getNextDay(state.dayOfWeek);
        return {
          ...state,
          hour: START_HOUR,
          dayOfWeek: nextDay,
          selectedGirl: null,
          player: {
            ...state.player,
            energy: Math.min(100, state.player.energy + 30),
            hunger: Math.min(100, state.player.hunger + 20),
          },
        };
      }

      return { ...state, hour: newHour };
    }

    case "SET_TIME":
      return {
        ...state,
        hour: action.payload.hour,
        dayOfWeek: action.payload.day,
      };

    case "MOVE_TO":
      return {
        ...state,
        currentLocation: action.payload,
        selectedGirl: null,
      };

    // Character actions
    case "SELECT_GIRL":
      return { ...state, selectedGirl: action.payload };

    case "UPDATE_GIRL_STATS": {
      const { name, stats } = action.payload;
      const currentOverride = state.girlStatsOverrides[name] || {};

      // Merge and clamp values between 0-100
      const newStats: Partial<GirlStats> = {};
      Object.entries(stats).forEach(([key, value]) => {
        if (typeof value === "number") {
          const k = key as keyof GirlStats;
          const current = (currentOverride[k] as number) ?? 0;
          newStats[k] = Math.max(0, Math.min(100, current + value));
        }
      });

      return {
        ...state,
        girlStatsOverrides: {
          ...state.girlStatsOverrides,
          [name]: { ...currentOverride, ...newStats },
        },
      };
    }

    case "UNLOCK_CHARACTER":
      return {
        ...state,
        characterUnlocks: {
          ...state.characterUnlocks,
          [action.payload]: true,
        },
      };

    case "ADD_MET_CHARACTER": {
      const newSet = new Set(state.metCharacters);
      newSet.add(action.payload);
      return { ...state, metCharacters: newSet };
    }

    case "UPDATE_CHARACTER_EVENT_STATE":
      return {
        ...state,
        characterEventStates: {
          ...state.characterEventStates,
          [action.payload.name]: action.payload.state,
        },
      };

    // Encounter actions
    case "SCHEDULE_ENCOUNTER": {
      // Avoid duplicates
      const exists = state.scheduledEncounters.some(
        (e) =>
          e.characterName === action.payload.characterName &&
          e.eventId === action.payload.eventId
      );

      if (exists) return state;

      console.log(
        `📅 Scheduled: ${action.payload.label || "encounter"} with ${
          action.payload.characterName
        }`
      );

      return {
        ...state,
        scheduledEncounters: [...state.scheduledEncounters, action.payload],
      };
    }

    case "REMOVE_ENCOUNTER":
      return {
        ...state,
        scheduledEncounters: state.scheduledEncounters.filter(
          (e) =>
            !(
              e.characterName === action.payload.characterName &&
              e.eventId === action.payload.eventId
            )
        ),
      };

    case "CLEAR_ENCOUNTERS_AT_LOCATION":
      return {
        ...state,
        scheduledEncounters: state.scheduledEncounters.filter(
          (e) => e.location !== action.payload
        ),
      };

    // Save/Load actions
    case "LOAD_GAME":
      return {
        ...state,
        ...action.payload,
        gameState: "playing",
        // Convert array back to Set
        metCharacters: new Set(action.payload.metCharacters || []),
      };

    case "RESET_GAME":
      return {
        ...initialState,
        darkMode: state.darkMode, // Preserve dark mode preference
        gameState: "intro",
      };

    case "SET_HAS_SAVE_DATA":
      return { ...state, hasSaveData: action.payload };

    default:
      return state;
  }
}

// ===== CONTEXT =====
interface GameContextType {
  state: GameStateData;
  dispatch: React.Dispatch<GameAction>;

  // Computed values (memoized)
  girls: Girl[];
  presentGirls: Girl[];

  // Helper functions
  spendTime: (hours: number) => void;
  moveTo: (location: string) => void;
  updateGirlStats: (name: string, stats: Partial<GirlStats>) => void;
  scheduleEncounter: (encounter: ScheduledEncounter) => void;
}

const GameContext = createContext<GameContextType | null>(null);

// ===== PROVIDER =====
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Memoized computed girls with schedules and overrides
  const girls = useMemo(() => {
    return baseGirls
      .filter((girl) => {
        if (girl.name === "Iris") return true;
        if (girl.name === "Yumi") return state.characterUnlocks.Yumi;
        if (girl.name === "Gwen") return state.characterUnlocks.Gwen;
        if (girl.name === "Dawn") return state.characterUnlocks.Dawn;
        if (girl.name === "Ruby") return state.characterUnlocks.Ruby;
        return true;
      })
      .map((girl) => {
        const scheduledLocation = getScheduledLocation(
          girl.name,
          state.dayOfWeek,
          state.hour
        );
        const override = state.girlStatsOverrides[girl.name];

        return {
          ...girl,
          location: scheduledLocation || girl.location,
          stats: override ? { ...girl.stats, ...override } : girl.stats,
        };
      });
  }, [
    state.dayOfWeek,
    state.hour,
    state.girlStatsOverrides,
    state.characterUnlocks,
  ]);

  // Memoized present girls at current location
  const presentGirls = useMemo(() => {
    return girls.filter((g) => g.location === state.currentLocation);
  }, [girls, state.currentLocation]);

  // Helper functions
  const spendTime = useCallback((hours: number) => {
    dispatch({ type: "SPEND_TIME", payload: hours });
  }, []);

  const moveTo = useCallback((location: string) => {
    dispatch({ type: "MOVE_TO", payload: location });
  }, []);

  const updateGirlStats = useCallback(
    (name: string, stats: Partial<GirlStats>) => {
      dispatch({ type: "UPDATE_GIRL_STATS", payload: { name, stats } });
    },
    []
  );

  const scheduleEncounter = useCallback((encounter: ScheduledEncounter) => {
    dispatch({ type: "SCHEDULE_ENCOUNTER", payload: encounter });
  }, []);

  const value: GameContextType = {
    state,
    dispatch,
    girls,
    presentGirls,
    spendTime,
    moveTo,
    updateGirlStats,
    scheduleEncounter,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// ===== HOOK =====
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}

// ===== CUSTOM HOOKS =====

// Hook for save/load operations
export function useGameSave() {
  const { state, dispatch } = useGame();

  const saveGame = useCallback(() => {
    const saveData = {
      player: state.player,
      currentLocation: state.currentLocation,
      hour: state.hour,
      dayOfWeek: state.dayOfWeek,
      metCharacters: Array.from(state.metCharacters),
      girlStatsOverrides: state.girlStatsOverrides,
      characterEventStates: state.characterEventStates,
      characterUnlocks: state.characterUnlocks,
      scheduledEncounters: state.scheduledEncounters,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem("datingSimSave", JSON.stringify(saveData));
      dispatch({ type: "SET_HAS_SAVE_DATA", payload: true });
      alert("Game saved! 💾");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save game.");
    }
  }, [state, dispatch]);

  const loadGame = useCallback(() => {
    try {
      const raw = localStorage.getItem("datingSimSave");
      if (!raw) return;

      const data = JSON.parse(raw);
      dispatch({ type: "LOAD_GAME", payload: data });
    } catch (error) {
      console.error("Load failed:", error);
      alert("Failed to load game.");
    }
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
    localStorage.removeItem("datingSimSave");
    dispatch({ type: "SET_HAS_SAVE_DATA", payload: false });
  }, [dispatch]);

  return { saveGame, loadGame, resetGame };
}

// Hook for time-based operations
export function useGameTime() {
  const { state, spendTime } = useGame();

  const getTimeOfDay = useCallback(() => {
    const hour = state.hour;
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  }, [state.hour]);

  return {
    hour: state.hour,
    dayOfWeek: state.dayOfWeek,
    timeOfDay: getTimeOfDay(),
    spendTime,
  };
}
