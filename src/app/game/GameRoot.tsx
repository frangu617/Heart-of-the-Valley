"use client";
import { useEffect } from "react";
import { useGameStore } from "@/state/gameStore";
// import TimeHUD from "./ui/TimeHUD";
import DebugOverlay from "./ui/DebugOverlay";
import MenuScene from "./scenes/MenuScene";
import DialogueScene from "./scenes/DialogueScene";
import ExplorationScene from "./scenes/ExplorationScene";

export default function GameRoot() {
  const gameState = useGameStore((s) => s.gameState);
  const darkMode = true; // or from uiStore
  const rollDailyGoals = useGameStore((s) => s.rollDailyGoals);
  const todayGoals = useGameStore((s) => s.todayGoals);

  useEffect(() => {
    if (!todayGoals.length) rollDailyGoals(2);
  }, [todayGoals.length, rollDailyGoals]);

  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgClass}`}>
      <DebugOverlay />
      {/* <TimeHUD /> */}
      {gameState === "mainMenu" && <MenuScene />}
      {gameState === "dialogue" && <DialogueScene />}
      {(gameState === "intro" ||
        gameState === "playing" ||
        gameState === "paused") && <ExplorationScene />}
    </div>
  );
}
