import { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialogue,
  DialogueChoice,
  DialogueChoiceCondition,
} from "../data/dialogues";
import { PlayerStats, GirlStats } from "@/data/characters";

interface Props {
  dialogue: Dialogue;
  onComplete: (
    statChanges?: {
      affection?: number;
      mood?: number;
      trust?: number;
      love?: number;
      lust?: number;
    },
    chosenOption?: DialogueChoice
  ) => void;
  darkMode?: boolean;
  characterImage?: string;
  onSkip?: () => void;
  onNextDialogueId?: (id: string) => void;
  isMobile?: boolean;
  locationImage?: string;
  currentLocation?: string;
  currentHour?: number;
  currentDay?: string;
  playerStats?: PlayerStats;
  girlStats?: Partial<GirlStats>;

  /** NEW: midground/overlay layer that sits between background and character */
  midgroundImage?: string;
  midgroundOpacity?: number; // 0..1 (default 1)
  midgroundBlend?: React.CSSProperties["mixBlendMode"]; // e.g., "multiply", "screen"
  midgroundFit?: "cover" | "contain"; // default "cover"
}

const checkChoiceCondition = (
  condition: DialogueChoiceCondition | undefined,
  location?: string,
  hour?: number,
  day?: string,
  player?: PlayerStats,
  girl?: Partial<GirlStats>
): boolean => {
  if (!condition) return true;

  if (condition.location) {
    if (Array.isArray(condition.location)) {
      if (!condition.location.includes(location || "")) return false;
    } else {
      if (location !== condition.location) return false;
    }
  }

  if (condition.timeOfDay && hour !== undefined) {
    const getTimeOfDay = (h: number) => {
      if (h >= 6 && h < 12) return "morning";
      if (h >= 12 && h < 17) return "afternoon";
      if (h >= 17 && h < 21) return "evening";
      return "night";
    };
    if (getTimeOfDay(hour) !== condition.timeOfDay) return false;
  }

  if (condition.dayOfWeek && day !== condition.dayOfWeek) return false;

  if (
    condition.minAffection &&
    (!girl || (girl.affection ?? 0) < condition.minAffection)
  )
    return false;
  if (condition.minTrust && (!girl || (girl.trust ?? 0) < condition.minTrust))
    return false;
  if (condition.minLove && (!girl || (girl.love ?? 0) < condition.minLove))
    return false;

  if (condition.minPlayerStat && player) {
    const statValue = player[condition.minPlayerStat.stat];
    if (
      typeof statValue === "number" &&
      statValue < condition.minPlayerStat.value
    )
      return false;
  }

  if (condition.hasItem && player) {
    if (!player.inventory.includes(condition.hasItem)) return false;
  }

  return true;
};

export default function DialogueBox({
  dialogue,
  onComplete,
  darkMode = false,
  characterImage,
  onSkip,
  onNextDialogueId,
  isMobile = false,
  locationImage,
  currentLocation,
  currentHour,
  currentDay,
  playerStats,
  girlStats,

  // NEW midground props
  midgroundImage,
  midgroundOpacity = 1,
  midgroundBlend,
  midgroundFit = "cover",
}: Props) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [accumulatedStatChanges, setAccumulatedStatChanges] = useState<{
    affection?: number;
    mood?: number;
    trust?: number;
  }>({});

  const currentLine = dialogue.lines[currentLineIndex];
  const isLastLine = currentLineIndex === dialogue.lines.length - 1;

  const imageSlide: string | undefined = currentLine?.imageSlide;
  const videoSlide: string | undefined = currentLine?.videoSlide;
  const videoAutoPlay: boolean | undefined = currentLine?.videoAutoPlay;
  const videoBoomerang: boolean | undefined = currentLine?.videoBoomerang;

  const hasImageSlide = !!imageSlide;
  const hasVideoSlide = !!videoSlide;
  const hasEventMedia = hasImageSlide || hasVideoSlide;
  const isNarration = currentLine?.speaker === null;

  const chosenOptionRef = useRef<DialogueChoice | undefined>(undefined);

  const handleNext = useCallback(() => {
    if (!currentLine) return;

    if (isTyping) {
      setDisplayedText(currentLine.text ?? "");
      setIsTyping(false);
      setShowContinue(!currentLine.choices);
    } else if (isLastLine) {
      onComplete(accumulatedStatChanges, chosenOptionRef.current);
    } else {
      setCurrentLineIndex((i) => i + 1);
    }
  }, [isTyping, isLastLine, currentLine, onComplete, accumulatedStatChanges]);

  useEffect(() => {
    chosenOptionRef.current = undefined;
  }, [dialogue.id]);

  useEffect(() => {
    if (!currentLine) return;

    if (currentLine.condition) {
      const meetsCondition = checkChoiceCondition(
        currentLine.condition,
        currentLocation,
        currentHour,
        currentDay,
        playerStats,
        girlStats
      );

      if (!meetsCondition) {
        if (currentLineIndex < dialogue.lines.length - 1)
          setCurrentLineIndex((i) => i + 1);
        else onComplete(accumulatedStatChanges, chosenOptionRef.current);
        return;
      }
    }

    setDisplayedText("");
    setIsTyping(true);
    setShowContinue(false);

    const text = currentLine.text ?? "";
    const typingSpeed = 30;
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        setShowContinue(!currentLine.choices);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentLineIndex, currentLine]);

  const handleChoice = (choice: DialogueChoice) => {
    const newChanges = { ...accumulatedStatChanges };
    if (choice.affectionChange)
      newChanges.affection =
        (newChanges.affection || 0) + choice.affectionChange;
    if (choice.moodChange)
      newChanges.mood = (newChanges.mood || 0) + choice.moodChange;
    if (choice.trustChange)
      newChanges.trust = (newChanges.trust || 0) + choice.trustChange;
    setAccumulatedStatChanges(newChanges);

    chosenOptionRef.current = choice;

    if (choice.nextDialogueId && onNextDialogueId) {
      onNextDialogueId(choice.nextDialogueId);
      return;
    }

    if (isLastLine) onComplete(newChanges, choice);
    else setCurrentLineIndex((i) => i + 1);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentLine?.choices) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, currentLine]);

  if (!currentLine) return null;

  const availableChoices = currentLine?.choices?.filter((choice) =>
    checkChoiceCondition(
      choice.condition,
      currentLocation,
      currentHour,
      currentDay,
      playerStats,
      girlStats
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between pointer-events-none">
      {/* ===== BACKGROUND LAYER (z-0) ===== */}
      {hasImageSlide && (
        <img
          src={imageSlide}
          alt="Background"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23666" width="1920" height="1080"/></svg>';
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
      )}
      {hasVideoSlide && (
        <video
          src={videoSlide}
          autoPlay={videoAutoPlay ?? true}
          loop={videoBoomerang ?? true}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
      )}
      {!hasEventMedia && locationImage && (
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={locationImage}
            alt="Location Background"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23333" width="1920" height="1080"/></svg>';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* ===== NEW: MIDGROUND LAYER (z-10) ===== */}
      {midgroundImage && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          <img
            src={midgroundImage}
            alt="Midground Overlay"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="transparent" width="1920" height="1080"/></svg>';
            }}
            style={{
              mixBlendMode: midgroundBlend,
              opacity: Math.min(1, Math.max(0, midgroundOpacity)),
              filter: "blur(8px) brightness(0.8)", // Add blur and darken
              transform: "scale(1.1)", // Slightly scale to hide blur edges
            }}
            className={`absolute inset-0 w-full h-full ${
              midgroundFit === "contain" ? "object-contain" : "object-cover"
            } pointer-events-none`}
          />
        </div>
      )}

      {/* Skip Button (z-50) */}
      {onSkip && (
        <button
          onClick={onSkip}
          className={`
            absolute top-8 right-8 pointer-events-auto z-50
            px-6 py-3 rounded-xl font-bold transition-all duration-200
            ${
              darkMode
                ? "bg-gray-800/90 hover:bg-gray-700 text-purple-300 border-2 border-purple-600"
                : "bg-white/90 hover:bg-white text-purple-700 border-2 border-purple-400"
            }
            backdrop-blur-sm shadow-lg hover:scale-105
          `}
        >
          ⏭️ Skip
        </button>
      )}

      {/* ===== CHARACTER PORTRAIT CARD (z-20) ===== */}
      {/* ===== CHARACTER PORTRAIT CARD (z-20) ===== */}
      {!isNarration && characterImage && (
        <div className="absolute bottom-62 left-0 right-0 flex justify-center items-end pointer-events-none z-20 px-4">
          {!isMobile && (
            <div className="relative animate-fadeIn">
              <div className="relative w-[400px] h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-200/90 via-pink-200/90 to-blue-200/90" />
                <img
                  src={characterImage}
                  alt={currentLine.speaker || "Character"}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect fill="%23e879f9" width="400" height="600"/></svg>';
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: "center 20%", // Show top portion
                    transform: "scale(1.9)", // Zoom in
                    transformOrigin: "center 0%", // Zoom from upper portion
                  }}
                />
                {currentLine.speaker && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 py-3 px-4">
                    <h3 className="text-white text-xl font-bold text-center drop-shadow-lg">
                      {currentLine.speaker}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {isMobile && (
            <div className="relative animate-fadeIn">
              <div className="relative w-[280px] h-[420px] rounded-xl overflow-hidden shadow-2xl border-4 border-white/80">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-200/90 via-pink-200/90 to-blue-200/90" />
                <img
                  src={characterImage}
                  alt={currentLine.speaker || "Character"}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="280" height="420"><rect fill="%23e879f9" width="280" height="420"/></svg>';
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: "center 20%",
                    transform: "scale(1.8)",
                    transformOrigin: "center 0%",
                  }}
                />
                {currentLine.speaker && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 py-2 px-3">
                    <h3 className="text-white text-lg font-bold text-center drop-shadow-lg">
                      {currentLine.speaker}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== DIALOGUE BOX (z-40) ===== */}
      <div className="w-full max-w-5xl mx-4 mb-8 pointer-events-auto animate-slideUp mt-auto z-40">
        <div
          onClick={currentLine.choices ? undefined : handleNext}
          className={`
            rounded-2xl shadow-2xl border-4 transition-all duration-200
            ${currentLine.choices ? "" : "cursor-pointer"}
            ${
              darkMode
                ? "bg-gray-900/95 border-purple-700 hover:border-purple-500"
                : "bg-white/95 border-purple-300 hover:border-purple-500"
            }
            backdrop-blur-sm
          `}
        >
          <div
            className={`
            flex items-start gap-4
            px-6 py-3 border-b-2
            ${
              darkMode
                ? "border-purple-700 bg-purple-900/50"
                : "border-purple-200 bg-purple-50"
            }
          `}
          >
            {!isNarration && (
              <h3
                className={`text-xl font-bold ${
                  darkMode ? "text-purple-300" : "text-purple-800"
                }`}
              >
                {currentLine.speaker}
              </h3>
            )}
          </div>

          <div className="px-8 py-6">
            <p
              className={`
              text-lg leading-relaxed
              ${isNarration ? "text-center italic" : ""}
              ${darkMode ? "text-gray-100" : "text-gray-800"}
            `}
            >
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-pulse" />
              )}
            </p>

            {!isTyping && availableChoices && availableChoices.length > 0 && (
              <div className="mt-6 space-y-3">
                {availableChoices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className={`
                      w-full text-left px-6 py-4 rounded-xl transition-all duration-200
                      ${
                        darkMode
                          ? "bg-purple-900/50 hover:bg-purple-800/70 border-2 border-purple-700 hover:border-purple-500"
                          : "bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 hover:border-purple-500"
                      }
                      transform hover:scale-102 hover:shadow-lg
                    `}
                  >
                    <span
                      className={`font-semibold ${
                        darkMode ? "text-purple-200" : "text-purple-900"
                      }`}
                    >
                      → {choice.text}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {showContinue && !currentLine.choices && (
            <div className="absolute bottom-4 right-8 animate-bounce">
              <div
                className={`text-2xl ${
                  darkMode ? "text-purple-400" : "text-purple-600"
                }`}
              >
                {isLastLine ? "✓" : "▼"}
              </div>
            </div>
          )}

          {!currentLine.choices && (
            <div
              className={`
              px-6 py-2 text-xs text-center border-t-2
              ${
                darkMode
                  ? "border-purple-700 text-gray-400"
                  : "border-purple-200 text-gray-500"
              }
            `}
            >
              Click or press{" "}
              <kbd
                className={`px-2 py-1 rounded ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                Space
              </kbd>{" "}
              to continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
