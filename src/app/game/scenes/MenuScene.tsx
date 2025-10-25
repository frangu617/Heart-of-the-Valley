"use client";
import MainMenu from "@/components/MainMenu";
import { useGameStore } from "@/state/gameStore";

export default function MenuScene() {
  // const hasSaveData = useGameStore((s) => s.saveSlots.some(Boolean));
  const darkMode = true;

  const handleNewGame = () => {
    // useGameStore.getState().setAutoloadOnBoot(false); // next boot → menu
    useGameStore.getState().newGame({ startingLocation: "Bedroom" });
  };

  const handleContinue = () => {
    // useGameStore.getState().setAutoloadOnBoot(true); // next boot → resume
    useGameStore.getState().setGameState("playing");
  };

  return (
    <MainMenu
      onNewGame={handleNewGame}
      onContinue={handleContinue}
      hasSaveData={false}
      darkMode={darkMode}
    />
  );
}
