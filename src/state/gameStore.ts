import { create } from "zustand";
import type { Dialogue } from "@/types/dialogue";
import type { LocationKey } from "@/types/game";
import { START_DAY, START_HOUR } from "@/data/gameConstants";
import { getDialogueById } from "@/data/dialogues/registry";

// ===== Types =====
export type GameStateUnion =
  | "mainMenu"
  | "intro"
  | "playing"
  | "paused"
  | "dialogue";

export interface GameTime {
  dayIndex: number; // 1 = Monday
  day: string;
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

export interface SavePayload {
  gameState: GameStateUnion;
  time: GameTime;
  currentLocation: LocationKey;
  currentRoute: string | null;
  player: PlayerStats;
  flags: Record<string, boolean>;
  currentDialogue: Dialogue | null;
  dialogueIndex: number;
}

export interface SaveSnapshot {
  stamp: number; // Date.now()
  name?: string;
  data: SavePayload;
}

export interface GameStore {
  // Core
  gameState: GameStateUnion;
  setGameState: (s: GameStateUnion) => void;

  // Time
  time: GameTime;
  advanceHours: (hours: number) => void;
  nextDay: () => void;

  // Location & route
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

  // Manual saves (3 slots by default)
  saveToSlot: (slotIndex: number, name?: string) => void;
  loadFromSlot: (slotIndex: number) => void;
  deleteSlot: (slotIndex: number) => void;
  listSaves: () => (SaveSnapshot | null)[];
  hasAnySave: () => boolean;
  loadMostRecent: () => boolean;

  // New game / full reset
  newGame: (opts?: { startingLocation?: LocationKey }) => void;
  hardResetStorage: () => void; // wipes all manual saves
}

// ===== Defaults =====
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

// change to the location key you want from locations.ts
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
> = {
  gameState: "mainMenu",
  time: { dayIndex: 1, day: START_DAY, hour: START_HOUR },
  currentLocation: DEFAULT_START_LOCATION,
  currentRoute: null,
  player: STARTING_STATS,
  currentDialogue: null,
  dialogueIndex: 0,
  flags: {},
};

// ===== Manual save helpers (localStorage) =====
const SLOTS = 3;
const SAVE_PREFIX = "hotv-manual-save-"; // hotv-manual-save-0, -1, -2
const META_LAST_USED = "hotv-last-used-slot";

function lsGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function lsSet<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function lsRemove(key: string) {
  localStorage.removeItem(key);
}

function getSlotKey(i: number) {
  return `${SAVE_PREFIX}${i}`;
}

function makeSnapshot(state: GameStore, name?: string): SaveSnapshot {
  const payload: SavePayload = {
    gameState: state.gameState,
    time: state.time,
    currentLocation: state.currentLocation,
    currentRoute: state.currentRoute,
    player: state.player,
    flags: state.flags,
    currentDialogue: state.currentDialogue,
    dialogueIndex: state.dialogueIndex,
  };
  return { stamp: Date.now(), name, data: payload };
}

// ===== Store (no persist!) =====
export const useGameStore = create<GameStore>()((set, get) => ({
  ...DEFAULTS,

  // Core
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
      time: { ...st.time, dayIndex: st.time.dayIndex + 1, hour: START_HOUR },
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

  // ===== Manual saves =====
  saveToSlot: (slotIndex, name) => {
    if (slotIndex < 0 || slotIndex >= SLOTS) return;
    const snap = makeSnapshot(get(), name);
    lsSet<SaveSnapshot>(getSlotKey(slotIndex), snap);
    lsSet<number>(META_LAST_USED, slotIndex);
  },

  loadFromSlot: (slotIndex) => {
    if (slotIndex < 0 || slotIndex >= SLOTS) return;
    const snap = lsGet<SaveSnapshot>(getSlotKey(slotIndex));
    if (!snap) return;
    set({
      ...snap.data,
      // when you load, go to dialogue if mid-dialogue; else playing
      gameState: snap.data.currentDialogue ? "dialogue" : "playing",
    });
    lsSet<number>(META_LAST_USED, slotIndex);
  },

  deleteSlot: (slotIndex) => {
    if (slotIndex < 0 || slotIndex >= SLOTS) return;
    lsRemove(getSlotKey(slotIndex));
    // if it was last used, clear that pointer
    const last = lsGet<number>(META_LAST_USED);
    if (last === slotIndex) lsRemove(META_LAST_USED);
  },

  listSaves: () => {
    const arr: (SaveSnapshot | null)[] = [];
    for (let i = 0; i < SLOTS; i++) {
      arr.push(lsGet<SaveSnapshot>(getSlotKey(i)));
    }
    return arr;
  },

  hasAnySave: () => {
    for (let i = 0; i < SLOTS; i++) {
      if (lsGet<SaveSnapshot>(getSlotKey(i))) return true;
    }
    return false;
  },

  loadMostRecent: () => {
    // use last-used pointer first; fallback to newest stamp
    const last = lsGet<number>(META_LAST_USED);
    if (typeof last === "number") {
      const snap = lsGet<SaveSnapshot>(getSlotKey(last));
      if (snap) {
        set({
          ...snap.data,
          gameState: snap.data.currentDialogue ? "dialogue" : "playing",
        });
        return true;
      }
    }
    // find newest
    let best: { i: number; snap: SaveSnapshot } | null = null;
    for (let i = 0; i < SLOTS; i++) {
      const s = lsGet<SaveSnapshot>(getSlotKey(i));
      if (s && (!best || s.stamp > best.snap.stamp)) best = { i, snap: s };
    }
    if (best) {
      set({
        ...best.snap.data,
        gameState: best.snap.data.currentDialogue ? "dialogue" : "playing",
      });
      lsSet<number>(META_LAST_USED, best.i);
      return true;
    }
    return false;
  },

  // ===== New game / reset (no autosave at all) =====
  newGame: (opts) =>
    set({
      ...DEFAULTS,
      currentLocation: (opts?.startingLocation ??
        DEFAULT_START_LOCATION) as LocationKey,
      gameState: "intro", // or "playing" if you skip intro
    }),

  hardResetStorage: () => {
    // wipe all manual saves and return to main menu
    for (let i = 0; i < SLOTS; i++) lsRemove(getSlotKey(i));
    lsRemove(META_LAST_USED);
    set({ ...DEFAULTS });
  },
}));
