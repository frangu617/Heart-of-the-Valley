// src/state/gameStore.ts
import { create } from "zustand";
import { withPersist } from "./persist";
import type { Dialogue } from "@/types/dialogue";
import type {
  GameState,
  TimeState,
  PlayerStats,
  Relationships,
  LocationKey,
  RouteKey,
} from "@/types/game";

type GameStore = {
  gameState: GameState;
  setGameState: (s: GameState) => void;

  time: TimeState;
  setTime: (p: Partial<TimeState>) => void;

  currentLocation: LocationKey;
  setLocation: (loc: LocationKey) => void;

  currentRoute: RouteKey;
  setRoute: (r: RouteKey) => void;

  player: PlayerStats;
  setPlayer: (p: Partial<PlayerStats>) => void;

  relationships: Relationships;
  setRelationships: (r: Partial<Relationships>) => void;

  currentDialogue: Dialogue | null;
  dialogueIndex: number;
  setDialogue: (d: Dialogue | null) => void;
  advanceDialogue: () => void;

  flags: Record<string, boolean>;
  setFlag: (k: string, v: boolean) => void;

  resetToMainMenu: () => void;
};

const defaultState: Omit<
  GameStore,
  | "setGameState"
  | "setTime"
  | "setLocation"
  | "setRoute"
  | "setPlayer"
  | "setRelationships"
  | "setDialogue"
  | "advanceDialogue"
  | "setFlag"
  | "resetToMainMenu"
> = {
  gameState: "mainMenu",
  time: { dayIndex: 1, hour: 8 },
  currentLocation: "apartment",
  currentRoute: null,
  player: { money: 100, energy: 100, charm: 1, intelligence: 1, strength: 1 },
  relationships: { affection: {}, trust: {} },
  currentDialogue: null,
  dialogueIndex: 0,
  flags: {},
};

export const useGameStore = create<GameStore>()(
  withPersist("hotv-game", {
    ...defaultState,

    setGameState: (s) => ({ gameState: s }),
    setTime: (p) => (state) => ({ time: { ...state.time, ...p } }),
    setLocation: (loc) => () => ({ currentLocation: loc }),
    setRoute: (r) => () => ({ currentRoute: r }),
    setPlayer: (p) => (state) => ({ player: { ...state.player, ...p } }),
    setRelationships: (r) => (state) => ({
      relationships: { ...state.relationships, ...r },
    }),

    setDialogue: (d) => (state) => ({
      currentDialogue: d,
      dialogueIndex: d ? 0 : state.dialogueIndex,
      gameState: d ? "dialogue" : state.gameState,
    }),
    advanceDialogue: () => (state) => {
      const d = state.currentDialogue;
      const next = state.dialogueIndex + 1;
      if (!d) return {};
      return next >= d.lines.length
        ? { currentDialogue: null, dialogueIndex: 0, gameState: "playing" }
        : { dialogueIndex: next };
    },

    setFlag: (k, v) => (state) => ({ flags: { ...state.flags, [k]: v } }),

    resetToMainMenu: () => ({ ...defaultState }),
  })
);
