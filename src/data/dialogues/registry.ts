import type { Dialogue } from "@/types/dialogue";

// Use the exports you already have:
import { introDialogue } from "./intro";
import { irisDialogues, irisFirstMeeting } from "./iris";
import { dawnDialogues, dawnFirstMeeting } from "./dawn";
import { gwenDialogues, gwenFirstMeeting } from "./gwen";
import { yumiDialogues, yumiFirstMeeting } from "./yumi";
import { rubyDialogues, rubyFirstMeeting } from "./ruby";

// Allow Dialogue, Dialogue[], or Record<string, Dialogue>
type Source =
  | Dialogue
  | Dialogue[]
  | Record<string, Dialogue>
  | undefined
  | null;

function toArray(src: Source): Dialogue[] {
  if (!src) return [];
  if (Array.isArray(src)) return src;
  const maybe = src as any;
  if (typeof maybe === "object" && "id" in maybe && "lines" in maybe)
    return [maybe as Dialogue];
  return Object.values(src as Record<string, Dialogue>);
}

const ALL: Dialogue[] = [
  introDialogue,
  irisFirstMeeting,
  irisDialogues,
  dawnFirstMeeting,
  dawnDialogues,
  gwenFirstMeeting,
  gwenDialogues,
  yumiFirstMeeting,
  yumiDialogues,
  rubyFirstMeeting,
  rubyDialogues,
].flatMap(toArray);

export const DIALOGUE_REGISTRY: Record<string, Dialogue> = Object.fromEntries(
  ALL.map((d) => [d.id, d])
);

export function getDialogueById(id: string): Dialogue | null {
  return DIALOGUE_REGISTRY[id] ?? null;
}
