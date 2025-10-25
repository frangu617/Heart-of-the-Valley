"use client";

import MainMenu from "@/components/MainMenu";
import { useGameStore } from "@/state/gameStore";

export default function MenuScene() {
  const hasSaveData = useGameStore((s) => s.saveSlots.some(Boolean));
  const darkMode = true; // if you have a uiStore, you can replace this later

  const handleNewGame = () =>
    useGameStore.getState().newGame({ startingLocation: "Bedroom" });

  const handleContinue = () => useGameStore.getState().setGameState("playing");

  return (
    <MainMenu
      onNewGame={handleNewGame}
      onContinue={handleContinue}
      hasSaveData={hasSaveData}
      darkMode={darkMode}
    />
  );
}
