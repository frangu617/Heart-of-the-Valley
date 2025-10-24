"use client";
import { useGameStore } from "@/state/gameStore";

type Action = {
  id: string;
  label: string;
  energyCost: number;
  timeCostHours: number;
  moneyDelta?: number;
  onRun?: () => void; // optional custom logic
};

const defaultActions: Action[] = [
  {
    id: "work",
    label: "Work a Short Shift",
    energyCost: 10,
    timeCostHours: 2,
    moneyDelta: +40,
  },
  { id: "train", label: "Train at Gym", energyCost: 15, timeCostHours: 2 },
  { id: "rest", label: "Take a Nap", energyCost: -20, timeCostHours: 1 }, // negative = restore
];

export default function ActionBar({
  actions = defaultActions,
}: {
  actions?: Action[];
}) {
  const { canSpend, spendEnergy, advanceHours, addMoney, player } =
    useGameStore();

  const run = (a: Action) => {
    // If restores energy, allow even when low.
    const cost = a.energyCost;
    if (cost > 0 && !canSpend(cost)) return;

    // Spend/restore energy
    if (cost !== 0) {
      if (cost > 0) {
        const ok = spendEnergy(cost);
        if (!ok) return;
      } else {
        // restore
        const restore = Math.abs(cost);
        player.energy + restore;
        // write: clamp within store
        useGameStore.setState((s) => ({
          player: {
            ...s.player,
            energy: Math.min(100, s.player.energy + restore),
          },
        }));
      }
    }

    // Time cost
    if (a.timeCostHours) advanceHours(a.timeCostHours);

    // Money change
    if (typeof a.moneyDelta === "number") addMoney(a.moneyDelta);

    // Custom hook
    a.onRun?.();
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {actions.map((a) => {
        const disabled = a.energyCost > 0 && !canSpend(a.energyCost);
        return (
          <button
            key={a.id}
            onClick={() => run(a)}
            disabled={disabled}
            className={`rounded px-3 py-2 text-sm ${
              disabled
                ? "bg-white/10 opacity-50"
                : "bg-white/10 hover:bg-white/20"
            } text-white`}
            title={
              a.energyCost > 0
                ? `Costs ${a.energyCost} energy, ${a.timeCostHours}h`
                : a.energyCost < 0
                ? `Restores ${Math.abs(a.energyCost)} energy, ${
                    a.timeCostHours
                  }h`
                : `${a.timeCostHours}h`
            }
          >
            {a.label}
          </button>
        );
      })}
    </div>
  );
}
