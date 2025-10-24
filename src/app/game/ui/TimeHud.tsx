"use client";

import { useMemo } from "react";
import { useGameStore } from "@/state/gameStore";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export default function TimeHUD() {
  // Select primitives/flat fields to avoid SSR selector churn
  const dayIndex = useGameStore((s) => s.time.dayIndex);
  const hour = useGameStore((s) => s.time.hour);
  const energy = useGameStore((s) => s.player.energy);
  const money = useGameStore((s) => s.player.money);

  const dayName = useMemo(() => DAYS[((dayIndex % 7) + 7) % 7], [dayIndex]);
  const hourStr = useMemo(() => `${String(hour).padStart(2, "0")}:00`, [hour]);

  return (
    <div className="fixed top-3 left-1/2 z-40 -translate-x-1/2 rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur">
      <span className="mr-4 opacity-90">🗓 {dayName}</span>
      <span className="mr-4 opacity-90">🕒 {hourStr}</span>
      <span className="mr-4 opacity-90">⚡ {energy}</span>
      <span className="opacity-90">$ {money}</span>
    </div>
  );
}
