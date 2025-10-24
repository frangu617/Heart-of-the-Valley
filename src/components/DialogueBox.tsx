import type { Dialogue } from "@/types/dialogue";
import { useRef, useState, useEffect } from "react";

type Props = {
  dialogue: Dialogue; // ← full dialogue object
  currentLineIndex?: number; // ← optional index (default 0)
  onComplete?: () => void; // advance to next line
  onNextDialogueId?: (id: string) => void;
  darkMode?: boolean;
};

export default function DialogueBox({
  dialogue,
  currentLineIndex = 0,
  onComplete,
  onNextDialogueId,
  darkMode,
}: Props) {
  const line = dialogue.lines[currentLineIndex];
  const advancingRef = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // stop clicks from previous line carrying over
    advancingRef.current = false;
    setLoading(false);
  }, [currentLineIndex, dialogue.id]);

  const safeAdvance = async () => {
    if (advancingRef.current || loading) return;
    advancingRef.current = true;
    setLoading(true);
    try {
      // preload media here if needed (image/video in line)
      await Promise.resolve();
      onComplete?.();
    } finally {
      setLoading(false);
      advancingRef.current = false;
    }
  };

  const pickChoice = async (nextId?: string) => {
    if (!nextId) return safeAdvance();
    if (advancingRef.current || loading) return;
    advancingRef.current = true;
    setLoading(true);
    try {
      await Promise.resolve();
      onNextDialogueId?.(nextId);
    } finally {
      setLoading(false);
      advancingRef.current = false;
    }
  };

  if (!line) return null;

  return (
    <div
      className={`rounded-xl p-4 ${darkMode ? "text-white" : "text-gray-900"}`}
    >
      {/* speaker & text */}
      {line.speaker && <div className="font-semibold mb-1">{line.speaker}</div>}
      <div className="whitespace-pre-line mb-4">{line.text}</div>

      {/* choices */}
      {line.choices?.length ? (
        <div className="flex flex-col gap-2">
          {line.choices.map((c, i) => (
            <button
              key={i}
              disabled={loading}
              className="rounded bg-white/10 px-3 py-2 hover:bg-white/20 disabled:opacity-50"
              onClick={() => pickChoice(c.nextDialogueId)}
            >
              {c.text}
            </button>
          ))}
        </div>
      ) : (
        <button
          disabled={loading}
          className="rounded bg-white/10 px-4 py-2 hover:bg-white/20 disabled:opacity-50"
          onClick={safeAdvance}
        >
          {loading ? "..." : "Continue"}
        </button>
      )}
    </div>
  );
}
