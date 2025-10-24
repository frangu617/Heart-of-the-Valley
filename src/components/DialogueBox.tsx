// src/components/DialogueBox.tsx
import type { Dialogue } from "@/types/dialogue";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

// NOTE: Your DialogueLine type may have extra fields (midground, etc.).
// We'll access those via safe casts to avoid TS breakage if fields are absent.

type Props = {
  dialogue: Dialogue;
  currentLineIndex?: number;
  onComplete?: () => void;
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
  const [loading, setLoading] = useState(false);
  const [lineIndex, setLineIndex] = useState(currentLineIndex);
  const line = dialogue.lines[lineIndex];

  useEffect(() => setLineIndex(currentLineIndex), [currentLineIndex]);

  // Mid/fore/video fields (guarded)
  const L: any = line ?? {};
  const midImage: string | undefined = L.midgroundImage;
  const midVideo: string | undefined = L.midgroundVideo;
  const midOpacity: number | undefined = L.midgroundOpacity;
  const midBlend: string | undefined = L.midgroundBlend;
  const midFit: "cover" | "contain" | undefined = L.midgroundFit;

  const imageSlide: string | undefined = L.imageSlide;
  const videoSlide: string | undefined = L.videoSlide;
  const videoAutoPlay: boolean = L.videoAutoPlay !== false;
  const videoBoomerang: boolean = !!L.videoBoomerang;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    setReverse(false);
    if (videoRef.current && videoSlide && videoAutoPlay) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  }, [lineIndex, videoSlide, videoAutoPlay]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSlide || !videoBoomerang) return;
    const onEnded = () => {
      if (!videoBoomerang) return;
      if (!reverse) {
        setReverse(true);
        v.playbackRate = -1;
        v.currentTime = Math.max(0, v.duration - 0.05);
        void v.play().catch(() => {});
      } else {
        setReverse(false);
        v.playbackRate = 1;
        v.currentTime = 0;
        void v.play().catch(() => {});
      }
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, [videoSlide, videoBoomerang, reverse]);

  const canAdvance = useMemo(() => !line?.choices?.length, [line]);

  const safeAdvance = () => {
    if (!dialogue) return;
    const next = lineIndex + 1;
    if (next >= dialogue.lines.length) {
      onComplete?.();
    } else {
      setLineIndex(next);
    }
  };

  const choose = (i: number) => {
    const choice = line?.choices?.[i];
    if (!choice) return;

    // Route to nextDialogueId if provided
    if (choice.nextDialogueId && onNextDialogueId) {
      onNextDialogueId(choice.nextDialogueId);
      return;
    }

    // scheduleEncounter could be handled in store here if needed:
    // if (choice.scheduleEncounter) { useGameStore.getState().scheduleEncounter(choice.scheduleEncounter) }

    safeAdvance();
  };

  if (!line) return null;

  return (
    <div
      className={`rounded-xl p-4 ${darkMode ? "text-white" : "text-gray-900"}`}
    >
      {/* Midground overlay */}
      {(midImage || midVideo) && (
        <div
          className="pointer-events-none relative mb-4 w-full overflow-hidden rounded"
          style={{
            opacity: midOpacity ?? 1,
            // Tailwind doesn't map arbitrary blend modes; rely on style:
            mixBlendMode: (midBlend as any) ?? "normal",
          }}
        >
          {midImage && (
            <div className="relative h-64 w-full">
              <Image
                src={midImage}
                alt="midground"
                fill
                style={{ objectFit: midFit ?? "contain" }}
                priority
              />
            </div>
          )}
          {midVideo && (
            <video
              src={midVideo}
              className="h-64 w-full object-contain"
              autoPlay
              loop={!videoBoomerang}
              muted
              playsInline
            />
          )}
        </div>
      )}

      {/* Speaker & text */}
      {line.speaker && <div className="mb-1 font-semibold">{line.speaker}</div>}
      <div className="mb-3 whitespace-pre-line">{line.text}</div>

      {/* Foreground image slide (simple) */}
      {imageSlide && (
        <div className="relative mb-3 h-64 w-full overflow-hidden rounded">
          <Image
            src={imageSlide}
            alt="slide"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      {/* Foreground video slide */}
      {videoSlide && (
        <div className="relative mb-3 w-full overflow-hidden rounded">
          <video
            ref={videoRef}
            src={videoSlide}
            className="h-64 w-full object-contain"
            autoPlay={videoAutoPlay}
            loop={!videoBoomerang}
            muted
            playsInline
          />
        </div>
      )}

      {/* choices */}
      {line.choices?.length ? (
        <div className="flex flex-col gap-2">
          {line.choices.map((c: any, idx: number) => (
            <button
              key={idx}
              disabled={loading}
              className={`rounded px-4 py-2 text-left ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-purple-200 hover:bg-purple-300"
              } disabled:opacity-50`}
              onClick={() => choose(idx)}
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
