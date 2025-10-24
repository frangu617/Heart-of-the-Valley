"use client";

import { useGameStore } from "@/state/gameStore";
// If you already have components like StatsPanel, LocationCard, PhoneMenu, import and reuse them here.

export default function ExplorationScene() {
  const gameState = useGameStore((s) => s.gameState);
  const setGameState = useGameStore((s) => s.setGameState);
  const currentLocation = useGameStore((s) => s.currentLocation);
  const setLocation = useGameStore((s) => s.setLocation);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="mb-3 text-white/70">State: {gameState}</div>

      <div className="mb-6 flex gap-2">
        {["apartment", "library", "bar", "university"].map((loc) => (
          <button
            key={loc}
            onClick={() => setLocation(loc as any)}
            className={`rounded px-3 py-2 text-sm ${
              currentLocation === loc ? "bg-white/30" : "bg-white/10"
            } text-white`}
          >
            {loc}
          </button>
        ))}
      </div>

      <div className="rounded border border-white/10 bg-black/30 p-6 text-white">
        <h2 className="mb-2 text-xl font-bold capitalize">{currentLocation}</h2>
        <p className="opacity-80">
          Exploration UI goes here (map, actions, phone, etc.).
        </p>

        <div className="mt-6 flex gap-2">
          <button
            className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
            onClick={() => setGameState("dialogue")}
          >
            Trigger Dialogue (test)
          </button>
          <button
            className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
            onClick={() => setGameState("paused")}
          >
            Pause
          </button>
        </div>
      </div>
    </div>
  );
}
