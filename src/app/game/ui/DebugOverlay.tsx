"use client";
import { useEffect, useState } from "react";
import { useGameStore } from "@/state/gameStore";

type Snapshot = {
  gameState: ReturnType<typeof useGameStore.getState>["gameState"];
  time: ReturnType<typeof useGameStore.getState>["time"];
  location: ReturnType<typeof useGameStore.getState>["currentLocation"];
  route: ReturnType<typeof useGameStore.getState>["currentRoute"];
  flags: ReturnType<typeof useGameStore.getState>["flags"];
  dialogueId: string | null;
  dialogueIndex: number;
};

export default function DebugOverlay() {
  const [open, setOpen] = useState(false);

  // Initialize from current store state (no selector => no SSR snapshot loop)
  const [snapshot, setSnapshot] = useState<Snapshot>(() => {
    const s = useGameStore.getState();
    return {
      gameState: s.gameState,
      time: s.time,
      location: s.currentLocation,
      route: s.currentRoute,
      flags: s.flags,
      dialogueId: s.currentDialogue?.id ?? null,
      dialogueIndex: s.dialogueIndex,
    };
  });

  useEffect(() => {
    // Keyboard toggle for overlay
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // Subscribe directly to the store to avoid selector-induced SSR caching issues
    const unsub = useGameStore.subscribe((s) => {
      setSnapshot({
        gameState: s.gameState,
        time: s.time,
        location: s.currentLocation,
        route: s.currentRoute,
        flags: s.flags,
        dialogueId: s.currentDialogue?.id ?? null,
        dialogueIndex: s.dialogueIndex,
      });
    });

    // Ensure we’re in sync immediately after mount
    setSnapshot((prev) => {
      const s = useGameStore.getState();
      return {
        gameState: s.gameState,
        time: s.time,
        location: s.currentLocation,
        route: s.currentRoute,
        flags: s.flags,
        dialogueId: s.currentDialogue?.id ?? null,
        dialogueIndex: s.dialogueIndex,
      };
    });

    return unsub;
  }, []);

  if (!open) return null;

  return (
    <pre className="fixed bottom-2 right-2 max-w-[36rem] max-h-[50vh] overflow-auto rounded bg-black/80 p-3 text-xs text-green-300 z-50">
      {JSON.stringify(snapshot, null, 2)}
    </pre>
  );
}
