import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Dialogue } from "@/types/dialogue";
import type {
  GameState,
  TimeState,
  PlayerStats,
  Relationships,
  LocationKey,
  RouteKey,
} from "@/types/game";
import type { DailyGoal } from "@/data/goals";
import { GOAL_POOL } from "@/data/goals";

export type GameStore = {
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
  dialogueIndex: number;
  setDialogue: (d: Dialogue | null) => void;
  advanceDialogue: () => void;

  // Global flags for continuity
  flags: Record<string, boolean>;
  setFlag: (k: string, v: boolean) => void;

  // Time/Energy helpers
  spendEnergy: (cost: number) => boolean; // positive = spend, negative = restore
  canSpend: (cost: number) => boolean;
  advanceHours: (hours: number) => void;
  nextDay: () => void;
  addMoney: (delta: number) => void;

  // Daily Goals
  todayGoals: DailyGoal[];
  completedGoalIds: string[];
  rollDailyGoals: (count?: number) => void;
  completeGoal: (id: string) => void;

  // Reset
  resetToMainMenu: () => void;
};

const DEFAULTS: Pick<
  GameStore,
  | "gameState"
  | "time"
  | "currentLocation"
  | "currentRoute"
  | "player"
  | "relationships"
  | "currentDialogue"
  | "dialogueIndex"
  | "flags"
  | "todayGoals"
  | "completedGoalIds"
> = {
  gameState: "mainMenu",
  time: { dayIndex: 1, hour: 8 }, // Monday 08:00 by default
  currentLocation: "apartment",
  currentRoute: null,
  player: { money: 100, energy: 100, charm: 1, intelligence: 1, strength: 1 },
  relationships: { affection: {}, trust: {} },
  currentDialogue: null,
  dialogueIndex: 0,
  flags: {},
  todayGoals: [],
  completedGoalIds: [],
};

const SAVE_VERSION = 3;

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // state
      ...DEFAULTS,

      // setters
      setGameState: (s) => set({ gameState: s }),

      setTime: (p) =>
        set((state: GameStore) => ({
          time: { ...state.time, ...p },
        })),

      setLocation: (loc) => set({ currentLocation: loc }),

      setRoute: (r) => set({ currentRoute: r }),

      setPlayer: (p) =>
        set((state: GameStore) => ({
          player: { ...state.player, ...p },
        })),

      setRelationships: (r) =>
        set((state: GameStore) => ({
          relationships: { ...state.relationships, ...r },
        })),

      setDialogue: (d) =>
        set((state: GameStore) => ({
          currentDialogue: d,
          dialogueIndex: d ? 0 : state.dialogueIndex,
          gameState: d ? "dialogue" : state.gameState,
        })),

      advanceDialogue: () =>
        set((state: GameStore) => {
          const d = state.currentDialogue;
          if (!d) return {};
          const next = state.dialogueIndex + 1;
          if (next >= d.lines.length) {
            return {
              currentDialogue: null,
              dialogueIndex: 0,
              gameState: "playing",
            } as Partial<GameStore>;
          }
          return { dialogueIndex: next } as Partial<GameStore>;
        }),

      setFlag: (k, v) =>
        set((state: GameStore) => ({
          flags: { ...state.flags, [k]: v },
        })),

      // Time/Energy helpers
      canSpend: (cost: number) => get().player.energy >= cost,

      spendEnergy: (cost: number) => {
        const s = get();
        const newEnergy =
          cost >= 0
            ? s.player.energy < cost
              ? null
              : Math.max(0, s.player.energy - cost)
            : Math.min(100, s.player.energy + Math.abs(cost));
        if (newEnergy === null) return false;
        set({ player: { ...s.player, energy: newEnergy } });
        return true;
      },

      advanceHours: (hours: number) => {
        const s = get();
        const total = s.time.hour + hours;
        const dayIncr = Math.floor(total / 24);
        const newHour = ((total % 24) + 24) % 24;
        set({
          time: {
            dayIndex: (s.time.dayIndex + dayIncr + 7) % 7,
            hour: newHour,
          },
        });
      },

      nextDay: () => {
        const s = get();
        set({
          time: { dayIndex: (s.time.dayIndex + 1) % 7, hour: 8 },
          player: { ...s.player, energy: Math.min(100, s.player.energy + 50) },
        });
        // fresh daily goals (2) each new day
        get().rollDailyGoals(2);
      },

      addMoney: (delta: number) => {
        const s = get();
        set({
          player: { ...s.player, money: Math.max(0, s.player.money + delta) },
        });
      },

      // Daily Goals
      rollDailyGoals: (count = 2) =>
        set(() => {
          const pool = [...GOAL_POOL];
          const picked: DailyGoal[] = [];
          while (picked.length < count && pool.length) {
            const i = Math.floor(Math.random() * pool.length);
            picked.push(pool.splice(i, 1)[0]);
          }
          return { todayGoals: picked, completedGoalIds: [] };
        }),

      completeGoal: (id: string) =>
        set((state: GameStore) => {
          if (state.completedGoalIds.includes(id)) return {};
          const g = state.todayGoals.find((x) => x.id === id);
          if (!g) return {};
          const money = g.reward.money ?? 0;
          const energy = g.reward.energy ?? 0;

          const nextFlags = g.reward.flags?.length
            ? g.reward.flags.reduce<Record<string, boolean>>(
                (acc, k) => ((acc[k] = true), acc),
                { ...state.flags }
              )
            : state.flags;

          return {
            completedGoalIds: [...state.completedGoalIds, id],
            player: {
              ...state.player,
              money: Math.max(0, state.player.money + money),
              energy: Math.min(100, state.player.energy + energy),
            },
            flags: nextFlags,
          };
        }),

      resetToMainMenu: () => set({ ...DEFAULTS }),
    }),
    {
      name: "hotv-game",
      version: SAVE_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted: unknown, fromVersion: number) => {
        const s = (persisted as GameStore) ?? ({} as GameStore);

        if (fromVersion < 2) {
          (s as any).flags = s?.flags ?? {};
        }
        if (fromVersion < 3) {
          if (s?.player && (s.player as any).energy == null)
            (s.player as any).energy = 100;
          (s as any).todayGoals = (s as any).todayGoals ?? [];
          (s as any).completedGoalIds = (s as any).completedGoalIds ?? [];
        }

        return {
          ...DEFAULTS,
          ...s,
          time: { ...DEFAULTS.time, ...(s.time ?? {}) },
          player: { ...DEFAULTS.player, ...(s.player ?? {}) },
          relationships: {
            ...DEFAULTS.relationships,
            ...(s.relationships ?? {}),
          },
          flags: { ...(s.flags ?? {}) },
          todayGoals: [...(s.todayGoals ?? [])],
          completedGoalIds: [...(s.completedGoalIds ?? [])],
        } as GameStore;
      },
    }
  )
);
