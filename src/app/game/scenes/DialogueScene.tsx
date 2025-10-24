// src/app/game/scenes/DialogueScene.tsx
"use client";

import { useEffect } from "react";
import { useGameStore } from "@/state/gameStore";
import DialogueBox from "@/components/DialogueBox";

export default function DialogueScene() {
  const currentDialogue = useGameStore((s) => s.currentDialogue);
  const dialogueIndex = useGameStore((s) => s.dialogueIndex);
  const setGameState = useGameStore((s) => s.setGameState);
  const advanceDialogue = useGameStore((s) => s.advanceDialogue);
  const beginDialogueById = useGameStore((s) => s.beginDialogueById); // ✅

  useEffect(() => {
    if (!currentDialogue || currentDialogue.lines.length === 0) {
      setGameState("playing");
    }
  }, [currentDialogue, setGameState]);

  if (!currentDialogue) return null;

  return (
    <div className="mx-auto max-w-5xl p-4">
      <DialogueBox
        dialogue={currentDialogue}
        currentLineIndex={dialogueIndex as number | undefined}
        onComplete={advanceDialogue}
        darkMode
        onNextDialogueId={beginDialogueById} // ✅ instead of advanceDialogue
      />
    </div>
  );
}
