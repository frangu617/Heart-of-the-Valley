"use client";
import MainMenu from "@/components/MainMenu";
import { useGameStore } from "@/state/gameStore";
import { useState } from "react";

export default function MenuScene() {
  const [darkMode, setDarkMode] = useState(true);
  const hasSave = useGameStore((s) => s.saveSlots.some(Boolean));

  const handleNewGame = () => {
    useGameStore.getState().newGame({ startingLocation: "Bedroom" });
  };

  const handleContinue = () => {
    useGameStore.getState().setGameState("playing");
  };

  return (
    <MainMenu
      onNewGame={handleNewGame}
      onContinue={handleContinue}
      hasSaveData={hasSave}
      darkMode={darkMode}
      onToggleDarkMode={() => setDarkMode((d) => !d)}
    />
  );
}
