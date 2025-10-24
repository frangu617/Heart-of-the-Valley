import { create } from "zustand";
import type {
  GameState,
  TimeState,
  PlayerStats,
  Relationships,
  LocationKey,
  RouteKey,
} from "@/types/game";
import type { Dialogue } from "@/types/dialogue";

type GameStore = {
  // Scene & flow
  gameState: GameState;
  setGameState: (s: GameState) => void;

  // Time & world
  time: TimeState;
  setTime: (p: Partial<TimeState>) => void;

  currentLocation: LocationKey;
  setLocation: (loc: LocationKey) => void;

  // Narrative focus
  currentRoute: RouteKey;
  setRoute: (r: RouteKey) => void;

  // Player & relationships
  player: PlayerStats;
  setPlayer: (p: Partial<PlayerStats>) => void;

  relationships: Relationships;
  setRelationships: (r: Partial<Relationships>) => void;

  // Dialogue
  currentDialogue: Dialogue | null;
  dialogueIndex: number; // which line within currentDialogue.lines
  setDialogue: (d: Dialogue | null) => void;
  advanceDialogue: () => void;

  // Global flags for continuity
  flags: Record<string, boolean>;
  setFlag: (k: string, v: boolean) => void;

  // Init/reset helpers
  resetToMainMenu: () => void;
};

const defaultPlayer: PlayerStats = {
  money: 100,
  energy: 100,
  charm: 1,
  intelligence: 1,
  strength: 1,
};

const defaultRelationships: Relationships = {
  affection: {},
  trust: {},
};

const defaultTime: TimeState = {
  dayIndex: 1,
  hour: 8,
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: "mainMenu",
  setGameState: (s) => set({ gameState: s }),

  time: defaultTime,
  setTime: (p) => set((state) => ({ time: { ...state.time, ...p } })),

  currentLocation: "apartment",
  setLocation: (loc) => set({ currentLocation: loc }),

  currentRoute: null,
  setRoute: (r) => set({ currentRoute: r }),

  player: defaultPlayer,
  setPlayer: (p) => set((state) => ({ player: { ...state.player, ...p } })),

  relationships: defaultRelationships,
  setRelationships: (r) =>
    set((state) => ({ relationships: { ...state.relationships, ...r } })),

  currentDialogue: null,
  dialogueIndex: 0,
  setDialogue: (d) =>
    set({
      currentDialogue: d,
      dialogueIndex: 0,
      gameState: d ? "dialogue" : get().gameState,
    }),

  advanceDialogue: () => {
    const d = get().currentDialogue;
    const i = get().dialogueIndex;
    if (!d) return;

    const next = i + 1;
    if (next >= d.lines.length) {
      // end of dialogue → return to playing
      set({ currentDialogue: null, dialogueIndex: 0, gameState: "playing" });
    } else {
      set({ dialogueIndex: next });
    }
  },

  flags: {},
  setFlag: (k, v) => set((state) => ({ flags: { ...state.flags, [k]: v } })),

  resetToMainMenu: () =>
    set({
      gameState: "mainMenu",
      time: defaultTime,
      player: defaultPlayer,
      relationships: defaultRelationships,
      flags: {},
      currentDialogue: null,
      dialogueIndex: 0,
      currentLocation: "apartment",
      currentRoute: null,
    }),
}));
