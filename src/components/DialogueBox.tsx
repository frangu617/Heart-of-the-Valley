import { useState, useEffect, useCallback } from "react";
import { Dialogue, DialogueChoice, DialogueChoiceCondition } from "../data/dialogues";
import { PlayerStats, GirlStats } from "@/data/characters";

interface Props {
  dialogue: Dialogue;
  onComplete: (statChanges?: {
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
  
}

const checkChoiceCondition = (
  condition: DialogueChoiceCondition | undefined,
  location?: string,
  hour?: number,
  day?: string,
  player?: PlayerStats,
  girl?: Partial<GirlStats>
): boolean => {
  if (!condition) return true; // No condition means always show

  // Check location
  if (condition.location && location !== condition.location) {
    return false;
  }

  // Check time of day
  if (condition.timeOfDay && hour !== undefined) {
    const getTimeOfDay = (h: number) => {
      if (h >= 6 && h < 12) return "morning";
      if (h >= 12 && h < 17) return "afternoon";
      if (h >= 17 && h < 21) return "evening";
      return "night";
    };
    if (getTimeOfDay(hour) !== condition.timeOfDay) {
      return false;
    }
  }

  // Check day of week
  if (condition.dayOfWeek && day !== condition.dayOfWeek) {
    return false;
  }

  // Check girl stats
  if (
    condition.minAffection &&
    (!girl || (girl.affection ?? 0) < condition.minAffection)
  ) {
    return false;
  }
  if (condition.minTrust && (!girl || (girl.trust ?? 0) < condition.minTrust)) {
    return false;
  }
  if (condition.minLove && (!girl || (girl.love ?? 0) < condition.minLove)) {
    return false;
  }

  // Check player stats
  if (condition.minPlayerStat && player) {
    const statValue = player[condition.minPlayerStat.stat];
    if (
      typeof statValue === "number" &&
      statValue < condition.minPlayerStat.value
    ) {
      return false;
    }
  }

  // Check inventory
  if (condition.hasItem && player) {
    if (!player.inventory.includes(condition.hasItem)) {
      return false;
    }
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

  const handleNext = useCallback(() => {
    if (!currentLine) return;

    if (isTyping) {
      setDisplayedText(currentLine.text ?? "");
      setIsTyping(false);
      setShowContinue(!currentLine.choices);
    } else if (isLastLine) {
      onComplete(accumulatedStatChanges);
    } else {
      setCurrentLineIndex((i) => i + 1);
    }
  }, [isTyping, isLastLine, currentLine, onComplete, accumulatedStatChanges]);

  useEffect(() => {
    if (!currentLine) return;

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

    if (choice.nextDialogueId && onNextDialogueId) {
      onNextDialogueId(choice.nextDialogueId);
      return;
    }

    if (isLastLine) {
      onComplete(newChanges, choice);
    } else {
      setCurrentLineIndex((i) => i + 1);
    }
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
      {/* ===== BACKGROUND LAYER ===== */}
      {/* Event Media - Full Screen Background */}
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

      {/* Location Background - When NO Event */}
      {!hasEventMedia && locationImage && (
        <img
          src={locationImage}
          alt="Location Background"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23333" width="1920" height="1080"/></svg>';
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />
      )}

      {/* Skip Button */}
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

      {/* ===== DESKTOP + EVENT: Framed Image/Video in Middle ===== */}
      {!isMobile && hasEventMedia && (
        <div className="flex-1 flex items-center justify-center pointer-events-none z-30 pt-8">
          <div className="relative w-11/12 max-w-4xl aspect-[4/3] bg-gradient-to-b from-gray-100 to-white rounded-2xl shadow-2xl overflow-hidden border-4 border-purple-300">
            {hasImageSlide && (
              <img
                src={imageSlide}
                alt="Scene"
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23666" width="1920" height="1080"/><text x="50%" y="50%" font-size="48" text-anchor="middle" fill="white">Image Coming Soon</text></svg>';
                }}
                className="w-full h-full object-cover"
              />
            )}
            {hasVideoSlide && (
              <video
                src={videoSlide}
                autoPlay={videoAutoPlay ?? true}
                loop={videoBoomerang ?? true}
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* ===== MOBILE + EVENT: Portrait Small in Dialogue Box ===== */}
      {/* (will be rendered in dialogue box section below) */}

      {/* ===== DESKTOP + EVENT: Portrait High on Left ===== */}
      {!isMobile && hasEventMedia && !isNarration && characterImage && (
        <div className="absolute left-16 top-32 pointer-events-none animate-fadeIn z-20">
          <img
            src={characterImage}
            alt={currentLine.speaker || "Character"}
            onError={(e) => {
              const el = e.currentTarget;
              el.src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect fill="%23e879f9" width="200" height="300"/><circle cx="60" cy="80" r="15" fill="white"/><circle cx="140" cy="80" r="15" fill="white"/><path d="M 70 150 Q 100 180 130 150" stroke="white" stroke-width="8" fill="none"/></svg>';
            }}
            className="w-64 h-96 object-cover object-top rounded-2xl border-4 border-white shadow-2xl"
          />
        </div>
      )}

      {/* ===== DESKTOP + NO EVENT: Large Portrait Center (before dialogue) ===== */}
      {!isMobile && !hasEventMedia && !isNarration && characterImage && (
        <div className="flex-1 flex items-center justify-center pointer-events-none z-20 pt-12">
          <img
            src={characterImage}
            alt={currentLine.speaker || "Character"}
            onError={(e) => {
              const el = e.currentTarget;
              el.src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect fill="%23e879f9" width="200" height="300"/><circle cx="60" cy="80" r="15" fill="white"/><circle cx="140" cy="80" r="15" fill="white"/><path d="M 70 150 Q 100 180 130 150" stroke="white" stroke-width="8" fill="none"/></svg>';
            }}
            className="w-80 h-full max-h-96 object-cover object-top rounded-3xl border-4 border-white shadow-2xl animate-fadeIn"
          />
        </div>
      )}

      {/* ===== MOBILE + NO EVENT: Large Portrait Center ===== */}
      {isMobile && !hasEventMedia && !isNarration && characterImage && (
        <div className="flex-1 flex items-center justify-center pointer-events-none z-20">
          <img
            src={characterImage}
            alt={currentLine.speaker || "Character"}
            onError={(e) => {
              const el = e.currentTarget;
              el.src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect fill="%23e879f9" width="200" height="300"/><circle cx="60" cy="80" r="15" fill="white"/><circle cx="140" cy="80" r="15" fill="white"/><path d="M 70 150 Q 100 180 130 150" stroke="white" stroke-width="8" fill="none"/></svg>';
            }}
            className="w-56 h-80 object-cover object-top rounded-2xl border-4 border-white shadow-2xl animate-fadeIn"
          />
        </div>
      )}

      {/* ===== MOBILE + EVENT: Framed Image/Video ===== */}
      {isMobile && hasEventMedia && (
        <div className="flex-1 flex items-center justify-center pointer-events-none z-30 pt-4">
          <div className="relative w-11/12 max-w-2xl aspect-[4/3] bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-2xl overflow-hidden border-4 border-purple-300">
            {hasImageSlide && (
              <img
                src={imageSlide}
                alt="Scene"
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23666" width="1920" height="1080"/></svg>';
                }}
                className="w-full h-full object-cover"
              />
            )}
            {hasVideoSlide && (
              <video
                src={videoSlide}
                autoPlay={videoAutoPlay ?? true}
                loop={videoBoomerang ?? true}
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* ===== DIALOGUE BOX - Always at bottom ===== */}
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
          {/* Header with optional mobile portrait */}
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
            {/* Mobile + Event: Small Portrait in Dialogue */}
            {isMobile && hasEventMedia && !isNarration && characterImage && (
              <img
                src={characterImage}
                alt={currentLine.speaker || "Character"}
                onError={(e) => {
                  const el = e.currentTarget;
                  el.src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect fill="%23e879f9" width="200" height="300"/><circle cx="60" cy="80" r="15" fill="white"/><circle cx="140" cy="80" r="15" fill="white"/><path d="M 70 150 Q 100 180 130 150" stroke="white" stroke-width="8" fill="none"/></svg>';
                }}
                className="w-16 h-20 object-cover object-top rounded-lg border-2 border-white flex-shrink-0"
              />
            )}

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

          {/* Text + Choices */}
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

          {/* Continue Indicator */}
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

          {/* Instructions */}
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
