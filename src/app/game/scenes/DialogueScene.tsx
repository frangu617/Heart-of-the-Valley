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

  // ✅ Don’t update state during render. Do it here instead:
  useEffect(() => {
    if (!currentDialogue || currentDialogue.lines.length === 0) {
      setGameState("playing");
    }
  }, [currentDialogue, setGameState]);

  if (!currentDialogue || currentDialogue.lines.length === 0) {
    return null; // render nothing while it redirects back to "playing"
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <DialogueBox
        dialogue={currentDialogue}
        currentLineIndex={dialogueIndex as number | undefined}
        onComplete={advanceDialogue}
        darkMode
        onNextDialogueId={advanceDialogue}
      />
    </div>
  );
}
