import { useState, useEffect, useCallback } from "react";
import { Dialogue, DialogueChoice } from "../data/dialogues";

interface Props {
  dialogue: Dialogue;
  onComplete: (statChanges?: {
    affection?: number;
    mood?: number;
    trust?: number;
    love?: number;
    lust?: number;
  }) => void;
  darkMode?: boolean;
  characterImage?: string;
  onSkip?: () => void; // Optional skip callback for intro
}

export default function DialogueBox({
  dialogue,
  onComplete,
  darkMode = false,
  characterImage,
  onSkip,
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

  const handleNext = useCallback(() => {
    if (isTyping) {
      setDisplayedText(currentLine.text);
      setIsTyping(false);
      setShowContinue(!currentLine.choices);
    } else if (isLastLine) {
      onComplete(accumulatedStatChanges);
    } else {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  }, [
    isTyping,
    isLastLine,
    currentLineIndex,
    currentLine,
    onComplete,
    accumulatedStatChanges,
  ]);

  // Typewriter effect
  useEffect(() => {
    if (!currentLine) return;

    setDisplayedText("");
    setIsTyping(true);
    setShowContinue(false);

    let index = 0;
    const text = currentLine.text;
    const typingSpeed = 30;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        setShowContinue(!currentLine.choices); // Don't show continue if there are choices
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentLineIndex, currentLine]);

  const handleChoice = (choice: DialogueChoice) => {
    // Accumulate stat changes
    const newChanges = { ...accumulatedStatChanges };
    if (choice.affectionChange) {
      newChanges.affection =
        (newChanges.affection || 0) + choice.affectionChange;
    }
    if (choice.moodChange) {
      newChanges.mood = (newChanges.mood || 0) + choice.moodChange;
    }
    if (choice.trustChange) {
      newChanges.trust = (newChanges.trust || 0) + choice.trustChange;
    }
    setAccumulatedStatChanges(newChanges);

    // Move to next line
    if (isLastLine) {
      onComplete(newChanges);
    } else {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  // Click or Space/Enter to continue
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentLine?.choices) return; // Don't allow space to continue if choices are present

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, currentLine]);

  if (!currentLine) return null;

  const isNarration = currentLine.speaker === null;
  const hasImageSlide = currentLine.imageSlide;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
      {/* Skip Button (top-right) */}
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

      {/* Image Slide for Intro */}
      {hasImageSlide && (
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={currentLine.imageSlide}
            alt="Scene"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23666" width="1920" height="1080"/><text x="50%" y="50%" font-size="48" text-anchor="middle" fill="white">Image Coming Soon</text></svg>';
            }}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Character Portrait (if not narration and has image) */}
      {!isNarration && !hasImageSlide && characterImage && (
        <div className="absolute left-8 bottom-40 pointer-events-none animate-fadeIn">
          <img
            src={characterImage}
            alt={currentLine.speaker || "Character"}
            className="w-64 h-96 object-cover object-top rounded-2xl border-4 border-white shadow-2xl"
          />
        </div>
      )}

      {/* Dialogue Box */}
      <div className="w-full max-w-5xl mx-4 mb-8 pointer-events-auto animate-slideUp mt-auto">
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
          {/* Speaker Name (if not narration) */}
          {!isNarration && (
            <div
              className={`
              px-6 py-3 border-b-2 
              ${
                darkMode
                  ? "border-purple-700 bg-purple-900/50"
                  : "border-purple-200 bg-purple-50"
              }
            `}
            >
              <h3
                className={`
                text-xl font-bold
                ${darkMode ? "text-purple-300" : "text-purple-800"}
              `}
              >
                {currentLine.speaker}
              </h3>
            </div>
          )}

          {/* Dialogue Text */}
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
                <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-pulse"></span>
              )}
            </p>

            {/* Choices */}
            {!isTyping && currentLine.choices && (
              <div className="mt-6 space-y-3">
                {currentLine.choices.map((choice, index) => (
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
                className={`
                text-2xl
                ${darkMode ? "text-purple-400" : "text-purple-600"}
              `}
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
