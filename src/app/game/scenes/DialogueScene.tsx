"use client";

import { useGameStore } from "@/state/gameStore";
import DialogueBox from "@/components/DialogueBox";

export default function DialogueScene() {
  const currentDialogue = useGameStore((s) => s.currentDialogue);
  const dialogueIndex = useGameStore((s) => s.dialogueIndex);
  const setGameState = useGameStore((s) => s.setGameState);
  const advanceDialogue = useGameStore((s) => s.advanceDialogue);

  if (!currentDialogue || currentDialogue.lines.length === 0) {
    // Safety: if no dialogue queued, bounce to playing
    setGameState("playing");
    return null;
  }

  // If your DialogueBox supports “currentLineIndex” or similar, pass it here.
  // If not, it can derive it from the dialogue itself or you can extend its props later.
  return (
    <div className="mx-auto max-w-5xl p-4">
      <DialogueBox
        dialogue={currentDialogue} // <-- FIX: pass full Dialogue
        currentLineIndex={dialogueIndex as any} // if your DialogueBox supports it; remove if not needed
        onComplete={advanceDialogue}
        darkMode
        onNextDialogueId={() => {
          // Keep your existing navigation; for now, just advance
          advanceDialogue();
        }}
      />
    </div>
  );
}
