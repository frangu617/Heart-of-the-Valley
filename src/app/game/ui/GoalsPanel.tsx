"use client";
import { useGameStore } from "@/state/gameStore";

export default function GoalsPanel() {
  const goals = useGameStore((s) => s.todayGoals);
  const done = useGameStore((s) => s.completedGoalIds);
  const completeGoal = useGameStore((s) => s.completeGoal);
  const rollDailyGoals = useGameStore((s) => s.rollDailyGoals);

  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-white">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">Today’s Goals</h3>
        <button
          className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          title="Reroll goals (debug)"
          onClick={() => rollDailyGoals(2)}
        >
          Reroll
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="text-sm opacity-70">No goals today.</div>
      ) : (
        <ul className="space-y-2">
          {goals.map((g) => {
            const isDone = done.includes(g.id);
            return (
              <li
                key={g.id}
                className={`flex items-center justify-between rounded bg-white/5 px-2 py-1 text-sm ${
                  isDone ? "opacity-60 line-through" : ""
                }`}
              >
                <span>{g.text}</span>
                <button
                  disabled={isDone}
                  onClick={() => completeGoal(g.id)}
                  className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:opacity-40"
                >
                  {isDone ? "Done" : "Complete"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
