"use client";

import { useGameStore } from "@/state/gameStore";
import type { Dialogue } from "@/types/dialogue";
import GoalsPanel from "../ui/GoalsPanel";

export default function ExplorationScene() {
  const gameState = useGameStore((s) => s.gameState);
  const setGameState = useGameStore((s) => s.setGameState);

  const currentLocation = useGameStore((s) => s.currentLocation);
  const setLocation = useGameStore((s) => s.setLocation);

  const { canSpend, spendEnergy, advanceHours, addMoney, nextDay } =
    useGameStore();

  const setDialogue = useGameStore((s) => s.setDialogue);

  const triggerTestDialogue = () => {
    const sample: Dialogue = {
      id: "test_dialogue_1",
      lines: [
        { speaker: "Iris", text: "Welcome to the library." },
        { speaker: null, text: "You catch the scent of old paper and dust." },
        { speaker: "Iris", text: "Can I help you find something?" },
      ],
    };
    setDialogue(sample); // switches to "dialogue"
  };

  // Demo actions showing energy/time wiring
  const workShortShift = () => {
    if (!canSpend(10)) return;
    if (spendEnergy(10)) {
      advanceHours(2);
      addMoney(+40);
    }
  };

  const trainAtGym = () => {
    if (!canSpend(15)) return;
    if (spendEnergy(15)) {
      advanceHours(2);
      // improve stats here if you want
    }
  };

  const takeNap = () => {
    // negative cost = restore energy, allowed even at 0
    spendEnergy(-20);
    advanceHours(1);
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="mb-3 text-white/70">State: {gameState}</div>

      <div className="mb-6 flex gap-2">
        {(["apartment", "library", "bar", "university"] as const).map((loc) => (
          <button
            key={loc}
            onClick={() => setLocation(loc)}
            className={`rounded px-3 py-2 text-sm ${
              currentLocation === loc ? "bg-white/30" : "bg-white/10"
            } text-white capitalize`}
          >
            {loc}
          </button>
        ))}
      </div>

      <div className="rounded border border-white/10 bg-black/30 p-6 text-white">
        <h2 className="mb-2 text-xl font-bold capitalize">{currentLocation}</h2>
        <p className="opacity-80">
          Try the actions below to spend/restore energy and advance time.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={workShortShift}
            className="rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/20 text-white"
            title="Costs 10 energy, 2h; +$40"
          >
            Work a Short Shift
          </button>
          <button
            onClick={trainAtGym}
            className="rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/20 text-white"
            title="Costs 15 energy, 2h"
          >
            Train at Gym
          </button>
          <button
            onClick={takeNap}
            className="rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/20 text-white"
            title="Restores 20 energy, 1h"
          >
            Take a Nap
          </button>
          <button
            onClick={nextDay}
            className="rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/20 text-white"
            title="Advance to next day, restore some energy"
          >
            Next Day
          </button>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
            onClick={triggerTestDialogue}
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

        <div className="mt-6">
          <GoalsPanel />
        </div>
      </div>
    </div>
  );
}
