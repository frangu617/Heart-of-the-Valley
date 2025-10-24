// src/compat/dialogueBridge.ts
import type { Dialogue, DialogueLine } from "@/types/dialogue";

export function asDialogue(
  obj: Dialogue | DialogueLine[] | null | undefined
): Dialogue | null {
  if (!obj) return null;
  if (Array.isArray(obj)) {
    return { id: "ad-hoc", lines: obj };
  }
  // already a Dialogue
  return obj;
}

// optional: if something gives you only a single line
export function singleLineDialogue(
  line: DialogueLine,
  id = "single-line"
): Dialogue {
  return { id, lines: [line] };
}
