"use client";

import { useGameStore } from "@/state/gameStore";

export default function MenuScene() {
  const setGameState = useGameStore((s) => s.setGameState);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-black/30 p-6 text-center backdrop-blur">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Heart of the Valley
        </h1>
        <button
          className="w-full rounded bg-white/10 py-3 font-semibold text-white hover:bg-white/20"
          onClick={() => setGameState("intro")}
        >
          New Game
        </button>
        <div className="mt-3 text-sm text-white/60">v-slice bootstrap</div>
      </div>
    </div>
  );
}
