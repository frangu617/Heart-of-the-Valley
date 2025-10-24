import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Dialogue } from "@/types/dialogue";
import type { LocationKey } from "@/types/game";
import { START_DAY, START_HOUR } from "@/data/gameConstants";
import { getDialogueById } from "@/data/dialogues/registry";

export interface GameTime {
  dayIndex: number; // 1 = Monday
  day: string; // label e.g. "Monday"
  hour: number; // 0..23
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

export type GameStateUnion =
  | "mainMenu"
  | "intro"
  | "playing"
  | "paused"
  | "dialogue";

export interface SaveSnapshot {
  stamp: number; // Date.now()
  name?: string;
  data: {
    gameState: GameStateUnion;
    time: GameTime;
    currentLocation: LocationKey;
    currentRoute: string | null;
    player: PlayerStats;
    flags: Record<string, boolean>;
    currentDialogue: Dialogue | null;
    dialogueIndex: number;
  };
}

export interface GameStore {
  // Core state
  gameState: GameStateUnion;
  setGameState: (s: GameStateUnion) => void;

  // Time
  time: GameTime;
  advanceHours: (hours: number) => void;
  nextDay: () => void;

  // Location & Route
  currentLocation: LocationKey;
  setLocation: (loc: LocationKey) => void;
  currentRoute: string | null;
  setRoute: (r: string | null) => void;

  // Player
  player: PlayerStats;
  setPlayer: (changes: Partial<PlayerStats>) => void;

  // Dialogue
  currentDialogue: Dialogue | null;
  dialogueIndex: number;
  setDialogue: (d: Dialogue | null) => void;
  advanceDialogue: () => void;
  beginDialogueById: (id: string) => void;

  // Flags
  flags: Record<string, boolean>;
  setFlag: (k: string, v: boolean) => void;
  getFlag: (k: string) => boolean;

  // Resources
  canSpend: (energyCost: number) => boolean;
  spendEnergy: (amount: number) => boolean; // positive=spend, negative=restore
  addMoney: (delta: number) => void;

  // Saves (3 slots by default)
  saveSlots: (SaveSnapshot | null)[];
  saveToSlot: (slotIndex: number, name?: string) => void;
  loadFromSlot: (slotIndex: number) => void;
  deleteSlot: (slotIndex: number) => void;

  // New game / hard reset
  newGame: (opts?: { startingLocation?: LocationKey }) => void;
  hardResetStorage: () => void;
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

// 👉 change this to whatever you want the true default to be
const DEFAULT_START_LOCATION = "Bedroom" as LocationKey;

const DEFAULTS: Pick<
  GameStore,
  | "gameState"
  | "time"
  | "currentLocation"
  | "currentRoute"
  | "player"
  | "currentDialogue"
  | "dialogueIndex"
  | "flags"
  | "saveSlots"
> = {
  gameState: "mainMenu",
  time: { dayIndex: 1, day: START_DAY, hour: START_HOUR },
  currentLocation: DEFAULT_START_LOCATION,
  currentRoute: null,
  player: STARTING_STATS,
  currentDialogue: null,
  dialogueIndex: 0,
  flags: {},
  saveSlots: [null, null, null],
};

const STORAGE_KEY = "hotv-game-store";
const SAVE_VERSION = 2;

function makeSnapshot(state: GameStore, name?: string): SaveSnapshot {
  return {
    stamp: Date.now(),
    name,
    data: {
      gameState: state.gameState,
      time: state.time,
      currentLocation: state.currentLocation,
      currentRoute: state.currentRoute,
      player: state.player,
      flags: state.flags,
      currentDialogue: state.currentDialogue,
      dialogueIndex: state.dialogueIndex,
    },
  };
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...DEFAULTS,

      setGameState: (s) => set({ gameState: s }),

      // Time
      advanceHours: (hours) =>
        set((st) => {
          let newHour = st.time.hour + hours;
          let newDayIndex = st.time.dayIndex;
          if (newHour >= 24) {
            newDayIndex += Math.floor(newHour / 24);
            newHour = newHour % 24;
          }
          return { time: { ...st.time, hour: newHour, dayIndex: newDayIndex } };
        }),
      nextDay: () =>
        set((st) => ({
          time: {
            ...st.time,
            dayIndex: st.time.dayIndex + 1,
            hour: START_HOUR,
          },
        })),

      // Location & Route
      setLocation: (loc) => set({ currentLocation: loc }),
      setRoute: (r) => set({ currentRoute: r }),

      // Player
      setPlayer: (changes) =>
        set((st) => ({ player: { ...st.player, ...changes } })),

      // Dialogue
      setDialogue: (d) =>
        set((st) => ({
          currentDialogue: d,
          dialogueIndex: d ? 0 : st.dialogueIndex,
          gameState: d ? "dialogue" : st.gameState,
        })),
      advanceDialogue: () =>
        set((st) => {
          const d = st.currentDialogue;
          if (!d) return {};
          const next = st.dialogueIndex + 1;
          if (next >= d.lines.length) {
            return {
              currentDialogue: null,
              dialogueIndex: 0,
              gameState: "playing",
            };
          }
          return { dialogueIndex: next };
        }),
      beginDialogueById: (id) => {
        const d = getDialogueById(id);
        if (!d) return;
        set({ currentDialogue: d, dialogueIndex: 0, gameState: "dialogue" });
      },

      // Flags
      setFlag: (k, v) => set((st) => ({ flags: { ...st.flags, [k]: v } })),
      getFlag: (k) => !!get().flags[k],

      // Resources
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

      // Saves
      saveToSlot: (slotIndex, name) =>
        set((st) => {
          const slots = [...st.saveSlots];
          slots[slotIndex] = makeSnapshot(get(), name);
          return { saveSlots: slots };
        }),
      loadFromSlot: (slotIndex) => {
        const snap = get().saveSlots[slotIndex];
        if (!snap) return;
        set({
          ...snap.data,
          // when you load, you’re back in playing unless a dialogue is in progress
          gameState: snap.data.currentDialogue ? "dialogue" : "playing",
        });
      },
      deleteSlot: (slotIndex) =>
        set((st) => {
          const slots = [...st.saveSlots];
          slots[slotIndex] = null;
          return { saveSlots: slots };
        }),

      // New game / hard reset
      newGame: (opts) =>
        set({
          ...DEFAULTS,
          currentLocation: (opts?.startingLocation ??
            DEFAULT_START_LOCATION) as LocationKey,
          gameState: "intro", // or "playing" if you skip intro
        }),
      hardResetStorage: () => {
        // Clear persisted storage and memory state to defaults
        localStorage.removeItem(STORAGE_KEY);
        set({ ...DEFAULTS, gameState: "mainMenu" });
      },
    }),
    {
      name: STORAGE_KEY,
      version: SAVE_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted: any) => {
        // simple guard to ensure we never start from an invalid location
        const s = persisted?.state ?? {};
        if (!s.currentLocation) s.currentLocation = DEFAULT_START_LOCATION;
        return { ...persisted, state: s };
      },
      partialize: (s) => ({
        // Persist everything you care about:
        gameState: s.gameState,
        time: s.time,
        currentLocation: s.currentLocation,
        currentRoute: s.currentRoute,
        player: s.player,
        flags: s.flags,
        currentDialogue: s.currentDialogue,
        dialogueIndex: s.dialogueIndex,
        saveSlots: s.saveSlots,
      }),
    }
  )
);
