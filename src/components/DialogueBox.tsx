import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialogue,
  DialogueChoice,
  DialogueChoiceCondition,
} from "../data/dialogues";
import { PlayerStats, GirlStats } from "@/data/characters";
import { getCharacterImage } from "@/lib/images";
import { Girl } from "@/data/characters";
import { getTimeOfDay } from "@/lib/time";

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
  characterName?: string;
  onSkip?: () => void;
  onNextDialogueId?: (id: string) => void;
  isMobile?: boolean;
  locationImage?: string;
  currentLocation?: string;
  currentHour?: number;
  currentDay?: string;
  playerStats?: PlayerStats;
  girlStats?: Partial<GirlStats>;
  playerName?: string;
  isClosing?: boolean;
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

  // Check location - now supports both string and array
  if (condition.location) {
    if (Array.isArray(condition.location)) {
      // If it's an array, check if current location is in the array
      if (!condition.location.includes(location || "")) {
        return false;
      }
    } else {
      // If it's a string, check for exact match
      if (location !== condition.location) {
        return false;
      }
    }
  }

  // Check time of day
  if (condition.timeOfDay && hour !== undefined) {
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

type DialogueThemeMode = {
  skipButton: string;
  box: string;
  header: string;
  headerText: string;
  choiceButton: string;
  choiceText: string;
  instruction: string;
  indicator: string;
  caret: string;
};

type DialogueTheme = {
  frameBorder: string;
  portraitGradient: string;
  portraitLabel: string;
  dark: DialogueThemeMode;
  light: DialogueThemeMode;
};

const PURPLE_THEME: DialogueTheme = {
  frameBorder: "border-purple-300",
  portraitGradient: "from-purple-200/90 via-pink-200/90 to-blue-200/90",
  portraitLabel: "from-pink-500 to-purple-500",
  dark: {
    skipButton:
      "bg-gray-800/90 hover:bg-gray-700 text-purple-300 border-2 border-purple-600",
    box: "bg-gray-900/95 border-purple-700 hover:border-purple-500",
    header: "border-purple-700 bg-purple-900/50",
    headerText: "text-purple-300",
    choiceButton:
      "bg-purple-900/50 hover:bg-purple-800/70 border-2 border-purple-700 hover:border-purple-500",
    choiceText: "text-purple-200",
    instruction: "border-purple-700 text-gray-400",
    indicator: "text-purple-400",
    caret: "bg-purple-500",
  },
  light: {
    skipButton:
      "bg-white/90 hover:bg-white text-purple-700 border-2 border-purple-400",
    box: "bg-white/95 border-purple-300 hover:border-purple-500",
    header: "border-purple-200 bg-purple-50",
    headerText: "text-purple-800",
    choiceButton:
      "bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 hover:border-purple-500",
    choiceText: "text-purple-900",
    instruction: "border-purple-200 text-gray-500",
    indicator: "text-purple-600",
    caret: "bg-purple-500",
  },
};

const GREEN_THEME: DialogueTheme = {
  frameBorder: "border-green-300",
  portraitGradient: "from-green-200/90 via-emerald-200/90 to-lime-200/90",
  portraitLabel: "from-emerald-500 to-green-600",
  dark: {
    skipButton:
      "bg-gray-800/90 hover:bg-gray-700 text-green-300 border-2 border-green-600",
    box: "bg-gray-900/95 border-green-700 hover:border-green-500",
    header: "border-green-700 bg-green-900/50",
    headerText: "text-green-300",
    choiceButton:
      "bg-green-900/50 hover:bg-green-800/70 border-2 border-green-700 hover:border-green-500",
    choiceText: "text-green-200",
    instruction: "border-green-700 text-gray-400",
    indicator: "text-green-400",
    caret: "bg-green-500",
  },
  light: {
    skipButton:
      "bg-white/90 hover:bg-white text-green-700 border-2 border-green-400",
    box: "bg-white/95 border-green-300 hover:border-green-500",
    header: "border-green-200 bg-green-50",
    headerText: "text-green-800",
    choiceButton:
      "bg-green-50 hover:bg-green-100 border-2 border-green-300 hover:border-green-500",
    choiceText: "text-green-900",
    instruction: "border-green-200 text-gray-500",
    indicator: "text-green-600",
    caret: "bg-green-500",
  },
};

const BLUE_THEME: DialogueTheme = {
  frameBorder: "border-blue-300",
  portraitGradient: "from-blue-200/90 via-sky-200/90 to-indigo-200/90",
  portraitLabel: "from-sky-500 to-blue-600",
  dark: {
    skipButton:
      "bg-gray-800/90 hover:bg-gray-700 text-blue-300 border-2 border-blue-600",
    box: "bg-gray-900/95 border-blue-700 hover:border-blue-500",
    header: "border-blue-700 bg-blue-900/50",
    headerText: "text-blue-300",
    choiceButton:
      "bg-blue-900/50 hover:bg-blue-800/70 border-2 border-blue-700 hover:border-blue-500",
    choiceText: "text-blue-200",
    instruction: "border-blue-700 text-gray-400",
    indicator: "text-blue-400",
    caret: "bg-blue-500",
  },
  light: {
    skipButton:
      "bg-white/90 hover:bg-white text-blue-700 border-2 border-blue-400",
    box: "bg-white/95 border-blue-300 hover:border-blue-500",
    header: "border-blue-200 bg-blue-50",
    headerText: "text-blue-800",
    choiceButton:
      "bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 hover:border-blue-500",
    choiceText: "text-blue-900",
    instruction: "border-blue-200 text-gray-500",
    indicator: "text-blue-600",
    caret: "bg-blue-500",
  },
};

const RED_THEME: DialogueTheme = {
  frameBorder: "border-red-300",
  portraitGradient: "from-red-200/90 via-rose-200/90 to-pink-200/90",
  portraitLabel: "from-red-500 to-rose-600",
  dark: {
    skipButton:
      "bg-gray-800/90 hover:bg-gray-700 text-red-300 border-2 border-red-600",
    box: "bg-gray-900/95 border-red-700 hover:border-red-500",
    header: "border-red-700 bg-red-900/50",
    headerText: "text-red-300",
    choiceButton:
      "bg-red-900/50 hover:bg-red-800/70 border-2 border-red-700 hover:border-red-500",
    choiceText: "text-red-200",
    instruction: "border-red-700 text-gray-400",
    indicator: "text-red-400",
    caret: "bg-red-500",
  },
  light: {
    skipButton:
      "bg-white/90 hover:bg-white text-red-700 border-2 border-red-400",
    box: "bg-white/95 border-red-300 hover:border-red-500",
    header: "border-red-200 bg-red-50",
    headerText: "text-red-800",
    choiceButton:
      "bg-red-50 hover:bg-red-100 border-2 border-red-300 hover:border-red-500",
    choiceText: "text-red-900",
    instruction: "border-red-200 text-gray-500",
    indicator: "text-red-600",
    caret: "bg-red-500",
  },
};

const ORANGE_THEME: DialogueTheme = {
  frameBorder: "border-orange-300",
  portraitGradient: "from-amber-200/90 via-orange-200/90 to-yellow-200/90",
  portraitLabel: "from-orange-500 to-amber-600",
  dark: {
    skipButton:
      "bg-gray-800/90 hover:bg-gray-700 text-orange-300 border-2 border-orange-600",
    box: "bg-gray-900/95 border-orange-700 hover:border-orange-500",
    header: "border-orange-700 bg-orange-900/50",
    headerText: "text-orange-300",
    choiceButton:
      "bg-orange-900/50 hover:bg-orange-800/70 border-2 border-orange-700 hover:border-orange-500",
    choiceText: "text-orange-200",
    instruction: "border-orange-700 text-gray-400",
    indicator: "text-orange-400",
    caret: "bg-orange-500",
  },
  light: {
    skipButton:
      "bg-white/90 hover:bg-white text-orange-700 border-2 border-orange-400",
    box: "bg-white/95 border-orange-300 hover:border-orange-500",
    header: "border-orange-200 bg-orange-50",
    headerText: "text-orange-800",
    choiceButton:
      "bg-orange-50 hover:bg-orange-100 border-2 border-orange-300 hover:border-orange-500",
    choiceText: "text-orange-900",
    instruction: "border-orange-200 text-gray-500",
    indicator: "text-orange-600",
    caret: "bg-orange-500",
  },
};

const DIALOGUE_THEMES: Record<string, DialogueTheme> = {
  default: PURPLE_THEME,
  iris: PURPLE_THEME,
  gwen: GREEN_THEME,
  yumi: BLUE_THEME,
  ruby: RED_THEME,
  dawn: ORANGE_THEME,
};

const normalizeName = (value?: string) => value?.trim().toLowerCase() ?? "";

const resolveThemeKey = (
  characterName?: string,
  speaker?: string | null,
  playerName?: string
) => {
  const characterKey = normalizeName(characterName);
  if (characterKey) return characterKey;
  const speakerKey = normalizeName(speaker ?? undefined);
  const playerKey = normalizeName(playerName);
  if (!speakerKey || speakerKey === "you" || speakerKey === playerKey) {
    return "default";
  }
  return speakerKey;
};

export default function DialogueBox({
  dialogue,
  onComplete,
  darkMode = true,
  characterImage,
  characterName,
  onSkip,
  onNextDialogueId,
  isMobile = false,
  locationImage,
  currentLocation,
  currentHour,
  currentDay,
  playerStats,
  girlStats,
  playerName = "You",
  isClosing = false,
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
  const isPlayerSpeaking =
    currentLine?.speaker === "You" || currentLine?.speaker === playerName;
  const isThought = currentLine?.isThought === true;

  const chosenOptionRef = useRef<DialogueChoice | undefined>(undefined);

  const replaceTemplateVariables = useCallback((text: string): string => {
    return text
      .replace(/\{playerName\}/g, playerName || "You")
      .replace(/\{PlayerName\}/g, playerName || "You");
  }, [playerName]);

  // Prefer the line speaker, falling back to the active character when absent.
  const displaySpeaker = currentLine?.speaker
    ? currentLine.speaker === "You"
      ? playerName || "You"
      : currentLine.speaker
    : characterName || "";
  const speakerLabel = displaySpeaker
    ? `${displaySpeaker}${isThought ? " (thinking)" : ""}`
    : displaySpeaker;

  const themeKey = resolveThemeKey(
    characterName,
    currentLine?.speaker,
    playerName
  );
  const activeTheme = DIALOGUE_THEMES[themeKey] ?? DIALOGUE_THEMES.default;
  const themeMode = darkMode ? activeTheme.dark : activeTheme.light;
  
  const handleNext = useCallback(() => {
    if (!currentLine) return;
    if (isClosing) return;

    if (isTyping) {
      setDisplayedText(currentLine.text ?? "");
      setIsTyping(false);
      setShowContinue(!currentLine.choices);
    } else if (isLastLine) {
      console.log("🎬 DialogueBox: Completing dialogue");
      console.log("📦 Chosen option from ref:", chosenOptionRef.current);
      onComplete(accumulatedStatChanges, chosenOptionRef.current); // ✨ Use ref
    } else {
      setCurrentLineIndex((i) => i + 1);
    }
  }, [isTyping, isLastLine, currentLine, onComplete, accumulatedStatChanges, isClosing]);

  // Reset chosen option when dialogue changes
  useEffect(() => {
    chosenOptionRef.current = undefined;
  }, [dialogue.id]);

  useEffect(() => {
    if (!currentLine) return;
    // ✨ Check if current line meets conditions
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
        // Skip this line and move to next
        if (currentLineIndex < dialogue.lines.length - 1) {
          setCurrentLineIndex((i) => i + 1);
        } else {
          // If this was the last line, complete dialogue
          onComplete(accumulatedStatChanges, chosenOptionRef.current);
        }
        return;
      }
    }
    setDisplayedText("");
    setIsTyping(true);
    setShowContinue(false);

    const text = currentLine.text ?? "";
    const processedText = replaceTemplateVariables(text);
    const typingSpeed = 30;
    let index = 0;

    const interval = setInterval(() => {
      if (index < processedText.length) {
        setDisplayedText(processedText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        setShowContinue(!currentLine.choices);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentLineIndex, currentLine, dialogue.lines.length, onComplete, accumulatedStatChanges, currentLocation, currentHour, currentDay, playerStats, girlStats, replaceTemplateVariables]);

  const handleChoice = (choice: DialogueChoice) => {
    if (isClosing) return;
    console.log("👆 DialogueBox: Choice selected:", choice);
    const newChanges = { ...accumulatedStatChanges };
    if (choice.affectionChange)
      newChanges.affection =
        (newChanges.affection || 0) + choice.affectionChange;
    if (choice.moodChange)
      newChanges.mood = (newChanges.mood || 0) + choice.moodChange;
    if (choice.trustChange)
      newChanges.trust = (newChanges.trust || 0) + choice.trustChange;
    setAccumulatedStatChanges(newChanges);

    // ✨ Save to ref instead of state
    chosenOptionRef.current = choice;
    console.log("💾 Saved choice to ref:", chosenOptionRef.current);

    if (choice.nextDialogueId && onNextDialogueId) {
      console.log(
        "↪️ DialogueBox: Redirecting to dialogue:",
        choice.nextDialogueId
      );
      onNextDialogueId(choice.nextDialogueId);
      return;
    }

    if (isLastLine) {
      console.log("🎬 DialogueBox: Last line, completing with choice:", choice);
      onComplete(newChanges, choice);
    } else {
      console.log("➡️ DialogueBox: Moving to next line");
      setCurrentLineIndex((i) => i + 1);
    }
  };

  useEffect(() => {
    // Reset reading state whenever we switch to a new dialogue
    setCurrentLineIndex(0);
    setDisplayedText("");
    setIsTyping(true);
    setShowContinue(false);
  }, [dialogue.id]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isClosing) return;
      if (currentLine?.choices) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, currentLine, isClosing]);

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

  const getCurrentCharacterImage = () => {
    if (!characterName || !currentLine?.expression) {
      return characterImage; // fallback to original
    }

    // If we don't have location/hour info, fall back to original
    if (!currentLocation || currentHour === undefined) {
      return characterImage;
    }

    const name = characterName;
    const expression = currentLine.expression || "neutral";

    // Create a minimal Girl object for the getCharacterImage function
    const mockGirl: Girl = {
      name: name,
      location: currentLocation,
      relationship: "Single",
      personality: "",
      stats: {
        affection: girlStats?.affection ?? 0,
        lust: girlStats?.lust ?? 0,
        mood: girlStats?.mood ?? 50,
        trust: girlStats?.trust ?? 0,
        love: girlStats?.love ?? 0,
      },
    };

    // Use the existing location-aware image selection logic
    return getCharacterImage(
      mockGirl,
      currentLocation,
      currentHour,
      expression
    );
  };

  const dynamicCharacterImage = getCurrentCharacterImage();
  const portraitSrc = dynamicCharacterImage || characterImage || "";
  const showMobilePortrait = !isNarration && !isPlayerSpeaking && characterImage;
  const mobilePortrait = showMobilePortrait ? (
    <div className="relative animate-fadeIn pointer-events-none">
      <div className="relative w-[280px] h-[420px] rounded-xl overflow-hidden shadow-2xl border-4 border-white/80">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${activeTheme.portraitGradient}`}
        />
        <Image
          src={portraitSrc}
          alt={currentLine.speaker || "Character"}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          style={{
            objectPosition: "center 20%",
            transform: "scale(1.8)",
            transformOrigin: "center 0%",
          }}
        />
        {currentLine.speaker && (
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${activeTheme.portraitLabel} py-2 px-3`}
          >
            <h3 className="text-white text-lg font-bold text-center drop-shadow-lg">
              {speakerLabel}
            </h3>
          </div>
        )}
      </div>
    </div>
  ) : null;

  const dialogueBox = (
    <div
      className={`w-full max-w-5xl mx-4 ${
        isMobile ? "mb-0" : "mb-8 mt-auto"
      } z-40 ${
        isClosing
          ? "pointer-events-none animate-slideDown"
          : "pointer-events-auto animate-slideUp"
      }`}
    >
      <div
        onClick={currentLine.choices ? undefined : handleNext}
        className={`
            rounded-2xl shadow-2xl border-4 transition-all duration-200
            ${currentLine.choices ? "" : "cursor-pointer"}
            ${themeMode.box}
            backdrop-blur-sm
          `}
      >
        {/* Header */}
        <div
          className={`
            flex items-start gap-4
            px-6 py-3 border-b-2
            ${themeMode.header}
          `}
        >
          {!isNarration && (
            <h3 className={`text-xl font-bold ${themeMode.headerText}`}>
              {speakerLabel}
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
            {replaceTemplateVariables(displayedText)}
            {isTyping && (
              <span
                className={`inline-block w-2 h-5 ${themeMode.caret} ml-1 animate-pulse`}
              />
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
                      ${themeMode.choiceButton}
                      transform hover:scale-102 hover:shadow-lg
                    `}
                >
                  <span className={`font-semibold ${themeMode.choiceText}`}>
                    â†’ {choice.text}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Continue Indicator */}
        {showContinue && !currentLine.choices && (
          <div className="absolute bottom-4 right-8 animate-bounce">
            <div className={`text-2xl ${themeMode.indicator}`}>
              {isLastLine ? "âœ“" : "â–¼"}
            </div>
          </div>
        )}

        {/* Instructions */}
        {!currentLine.choices && (
          <div
            className={`
              px-6 py-2 text-xs text-center border-t-2
              ${themeMode.instruction}
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
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between pointer-events-none ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      {/* ===== BACKGROUND LAYER ===== */}
      {/* Event Media - Full Screen Background */}
      {hasImageSlide && (
        <Image
          src={imageSlide}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-30 z-0"
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
        <Image
          src={locationImage}
          alt="Location Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-40 z-0"
        />
      )}

      {/* Skip Button */}
      {onSkip && (
        <button
          onClick={onSkip}
          className={`
            absolute top-8 right-8 pointer-events-auto z-50
            px-6 py-3 rounded-xl font-bold transition-all duration-200
            ${themeMode.skipButton}
            backdrop-blur-sm shadow-lg hover:scale-105
          `}
        >
          ⏭️ Skip
        </button>
      )}

      {/* ===== DESKTOP + EVENT: Framed Image/Video in Middle ===== */}
      {!isMobile && hasEventMedia && (
        <div className="flex-1 flex items-center justify-center pointer-events-none z-30 pt-8">
          <div
            className={`relative w-11/12 max-w-4xl aspect-[4/3] bg-gradient-to-b from-gray-100 to-white rounded-2xl shadow-2xl overflow-hidden border-4 ${activeTheme.frameBorder}`}
          >
            {hasImageSlide && (
              <Image
                src={imageSlide}
                alt="Scene"
                layout="fill"
                objectFit="cover"
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

      {/* ===== MOBILE: Portrait rendered in dialogue stack ===== */}

      {/* ===== CHARACTER PORTRAIT CARD (z-20) ===== */}
      {!isNarration && !isPlayerSpeaking && characterImage && !isMobile && (
        <div className="absolute bottom-62 left-0 right-0 flex justify-center items-end pointer-events-none z-20 px-4">
          <div className="relative animate-fadeIn">
            <div className="relative w-[400px] h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80">
              <div
                className={`absolute inset-0 bg-gradient-to-b ${activeTheme.portraitGradient}`}
              />
              <Image
                src={portraitSrc}
                alt={currentLine.speaker || "Character"}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
                style={{
                  objectPosition: "center 20%",
                  transform: "scale(1.9)",
                  transformOrigin: "center 0%",
                }}
              />
              {currentLine.speaker && (
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${activeTheme.portraitLabel} py-3 px-4`}
                >
                  <h3 className="text-white text-xl font-bold text-center drop-shadow-lg">
                    {characterName}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== MOBILE + EVENT: Framed Image/Video ===== */}
      {isMobile && hasEventMedia && (
        <div className="flex-1 flex items-center justify-center pointer-events-none z-30 pt-4">
          <div
            className={`relative w-11/12 max-w-2xl aspect-[4/3] bg-gradient-to-b from-gray-100 to-white rounded-xl shadow-2xl overflow-hidden border-4 ${activeTheme.frameBorder}`}
          >
            {hasImageSlide && (
              <Image
                src={imageSlide}
                alt="Scene"
                layout="fill"
                objectFit="cover"
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

      {/* ===== DIALOGUE BOX ===== */}
      {isMobile ? (
        <div className="w-full flex flex-col items-center gap-4 pb-6 pointer-events-none z-40">
          {dialogueBox}
          {mobilePortrait}
        </div>
      ) : (
        dialogueBox
      )}
    </div>
  );
}
