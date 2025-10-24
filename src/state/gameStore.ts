import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Dialogue } from "@/types/dialogue";
import type { LocationKey } from "@/types/game";
import { START_DAY, START_HOUR } from "@/data/gameConstants";

export interface GameTime {
  dayIndex: number; // numeric counter
  day: string; // e.g., "Monday"
  hour: number;
}

export interface PlayerStats {
  energy: number;
  mood: number;
  hunger: number;
  fitness: number;
  intelligence: number;
  style: number;
  money: number;
  inventory: string[];
}

export interface GameStore {
  // Core game state
  gameState: "mainMenu" | "intro" | "playing" | "paused" | "dialogue";
  setGameState: (state: GameStore["gameState"]) => void;

  // Player stats
  player: PlayerStats;
  setPlayer: (changes: Partial<PlayerStats>) => void;

  // Location & movement
  currentLocation: LocationKey;
  setLocation: (location: LocationKey) => void;

  // Time system
  time: GameTime;
  advanceHours: (hours: number) => void;
  nextDay: () => void;

  // Dialogue system
  currentDialogue: Dialogue | null;
  setDialogue: (dialogue: Dialogue | null) => void;

  // Resource functions
  canSpend: (energyCost: number) => boolean;
  spendEnergy: (amount: number) => boolean;
  addMoney: (delta: number) => void;

  // Flag system (tracks one-time events or conditions)
  flags: Record<string, boolean>;
  setFlag: (flag: string, value: boolean) => void;
  getFlag: (flag: string) => boolean;
}

const STARTING_STATS: PlayerStats = {
  energy: 100,
  mood: 50,
  hunger: 50,
  fitness: 10,
  intelligence: 10,
  style: 10,
  money: 200,
  inventory: [],
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // --- INITIAL STATE ---
      gameState: "mainMenu",
      setGameState: (state) => set({ gameState: state }),

      player: STARTING_STATS,
      setPlayer: (changes) =>
        set((s) => ({ player: { ...s.player, ...changes } })),

      // Start in a valid key from your locations.ts
      currentLocation: "Bedroom" as LocationKey,
      setLocation: (location) => set({ currentLocation: location }),

      time: {
        dayIndex: 1,
        day: START_DAY,
        hour: START_HOUR,
      },
      advanceHours: (hours) =>
        set((s) => {
          let newHour = s.time.hour + hours;
          let newDayIndex = s.time.dayIndex;
          let newDay = s.time.day;
          if (newHour >= 24) {
            newHour -= 24;
            newDayIndex += 1;
          }
          return {
            time: {
              ...s.time,
              hour: newHour,
              dayIndex: newDayIndex,
              day: newDay,
            },
          };
        }),
      nextDay: () =>
        set((s) => ({
          time: { ...s.time, dayIndex: s.time.dayIndex + 1, hour: START_HOUR },
        })),

      currentDialogue: null,
      setDialogue: (dialogue) => set({ currentDialogue: dialogue }),

      canSpend: (energyCost) => get().player.energy >= energyCost,
      spendEnergy: (amount) => {
        const p = get().player;
        const newEnergy = Math.max(0, Math.min(100, p.energy - amount));
        set({ player: { ...p, energy: newEnergy } });
        return newEnergy > 0;
      },
      addMoney: (delta) => {
        const p = get().player;
        set({ player: { ...p, money: p.money + delta } });
      },

      flags: {},
      setFlag: (flag, value) =>
        set((s) => ({ flags: { ...s.flags, [flag]: value } })),
      getFlag: (flag) => get().flags[flag] ?? false,
    }),
    {
      name: "hotv-game-store", // persisted key
    }
  )
);
