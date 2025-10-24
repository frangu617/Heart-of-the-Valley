"use client";
import { useEffect, useState } from "react";
import { useGameStore } from "@/state/gameStore";

export default function DebugOverlay() {
  const [open, setOpen] = useState(false);
  const snapshot = useGameStore((s) => ({
    gameState: s.gameState,
    time: s.time,
    location: s.currentLocation,
    route: s.currentRoute,
    flags: s.flags,
    dialogueId: s.currentDialogue?.id ?? null,
    dialogueIndex: s.dialogueIndex,
  }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  return (
    <pre className="fixed bottom-2 right-2 max-w-[36rem] max-h-[50vh] overflow-auto rounded bg-black/80 p-3 text-xs text-green-300">
      {JSON.stringify(snapshot, null, 2)}
    </pre>
  );
}
