// src/app/game/scenes/DialogueScene.tsx
"use client";

import DialogueBox from "@/components/DialogueBox";
import { useGameStore } from "@/state/gameStore";
import { asDialogue } from "@/compat/dialogueBridge";

export default function DialogueScene() {
  const currentDialogue = asDialogue(useGameStore((s) => s.currentDialogue)); // normalize
  const dialogueIndex = useGameStore((s) => s.dialogueIndex);
  const setGameState = useGameStore((s) => s.setGameState);
  const advanceDialogue = useGameStore((s) => s.advanceDialogue);

  if (!currentDialogue || currentDialogue.lines.length === 0) {
    setGameState("playing");
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <DialogueBox
        dialogue={currentDialogue} // your DialogueBox expects Dialogue
        // currentLineIndex={dialogueIndex as number | undefined} // only if supported
        onComplete={advanceDialogue}
        darkMode
        onNextDialogueId={advanceDialogue}
      />
    </div>
  );
}
