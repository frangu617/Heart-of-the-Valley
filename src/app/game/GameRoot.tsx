"use client";

import { useMemo } from "react";
import { useGameStore } from "@/state/gameStore";
import { useUIStore } from "@/state/uiStore";
import MenuScene from "./scenes/MenuScene";
import DialogueScene from "./scenes/DialogueScene";
import ExplorationScene from "./scenes/ExplorationScene";
import DebugOverlay from "./ui/DebugOverlay";

export default function GameRoot() {
  const gameState = useGameStore((s) => s.gameState);
  const darkMode = useUIStore((s) => s.darkMode);

  const bgClass = useMemo(
    () =>
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
        : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50",
    [darkMode]
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgClass}`}>
      <DebugOverlay />
      {gameState === "mainMenu" && <MenuScene />}
      {gameState === "dialogue" && <DialogueScene />}
      {(gameState === "intro" ||
        gameState === "playing" ||
        gameState === "paused") && <ExplorationScene />}
    </div>
  );
}
