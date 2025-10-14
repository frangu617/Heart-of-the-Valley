// src/app/page.tsx
"use client";
import { useState, useEffect, useMemo } from "react";
import StatsPanel from "../components/StatsPanel";
import LocationCard from "../components/LocationCard";
import CharacterOverlay from "../components/CharacterOverlay";
import LocationActivities from "../components/LocationActivities";
import MainMenu from "../components/MainMenu";
import PauseMenu from "../components/PauseMenu";
import DialogueBox from "../components/DialogueBox";
import { locationGraph } from "../data/locations";
import PhoneMenu from "@/components/PhoneMenu";
import { getScheduledLocation } from "@/lib/schedule";
import { getCharacterImage } from "@/lib/characterImages";
import {
  getLocationBackground,
  getAtmosphereOverlay,
} from "@/lib/locationImages";
import {
  PlayerStats,
  defaultPlayerStats,
  Girl,
  girls as baseGirls,
  GirlStats,
} from "../data/characters";
import {
  introDialogue,
  Dialogue,
  firstMeetingDialogues,
} from "../data/dialogues";
import {
  DayOfWeek,
  START_DAY,
  START_HOUR,
  MAX_HOUR,
  getNextDay,
} from "../data/gameConstants";

// ✅ Descriptions + time-of-day overlay
import {
  locationDescriptions,
  getTimeOfDay,
} from "../data/locationDescriptions";

type GameState = "mainMenu" | "intro" | "playing" | "paused" | "dialogue";

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>("mainMenu");
  const [player, setPlayer] = useState<PlayerStats>(defaultPlayerStats);
  const [currentLocation, setCurrentLocation] = useState<string>("Bedroom");
  const [hour, setHour] = useState<number>(START_HOUR);
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(START_DAY);
  const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null);
  const [hasSaveData, setHasSaveData] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [dialogueCharacterImage, setDialogueCharacterImage] =
    useState<string>("");
  const [dialogueGirlEffects, setDialogueGirlEffects] =
    useState<Partial<GirlStats> | null>(null);
  const [dialogueGirlName, setDialogueGirlName] = useState<string>("");
  const [metCharacters, setMetCharacters] = useState<Set<string>>(new Set());
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [girlStatsOverrides, setGirlStatsOverrides] = useState<
    Record<string, Partial<GirlStats>>
  >({});

  // 🔥 NEW: Compute girls with current locations based on schedule
  const girls = useMemo(() => {
    return baseGirls.map((girl) => {
      const scheduledLocation = getScheduledLocation(
        girl.name,
        dayOfWeek,
        hour
      );

      // Apply any stat overrides for this girl
      const statOverride = girlStatsOverrides[girl.name];
      const mergedStats = statOverride
        ? { ...girl.stats, ...statOverride }
        : girl.stats;

      return {
        ...girl,
        location: scheduledLocation || girl.location,
        stats: mergedStats, // Apply stat overrides
      };
    });
  }, [dayOfWeek, hour, girlStatsOverrides]); // Recompute when time or stats change

  // Check for save data and dark mode preference on mount
  useEffect(() => {
    const savedGame = localStorage.getItem("datingSimSave");
    setHasSaveData(!!savedGame);

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // ESC key to toggle pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && gameState === "playing") {
        setGameState("paused");
      } else if (e.key === "Escape" && gameState === "paused") {
        setGameState("playing");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState]);

  const saveGame = () => {
    const saveData = {
      player,
      currentLocation,
      hour,
      dayOfWeek,
      metCharacters: Array.from(metCharacters),
      girlStatsOverrides, // NEW: Save girl stats
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("datingSimSave", JSON.stringify(saveData));
    setHasSaveData(true);
    alert("Game saved! 💾");
  };

const loadGame = () => {
  const savedGame = localStorage.getItem("datingSimSave");
  if (savedGame) {
    const saveData = JSON.parse(savedGame);
    setPlayer(saveData.player);
    setCurrentLocation(saveData.currentLocation);
    setHour(saveData.hour);
    setDayOfWeek(saveData.dayOfWeek || START_DAY);
    setMetCharacters(new Set(saveData.metCharacters || []));
    setGirlStatsOverrides(saveData.girlStatsOverrides || {}); // NEW: Load girl stats
    setSelectedGirl(null);
    setGameState("playing");
  }
};

  const newGame = () => {
    if (hasSaveData) {
      if (
        confirm(
          "Starting a new game will overwrite your saved progress. Continue?"
        )
      ) {
        resetGame();
      }
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    setPlayer(defaultPlayerStats);
    setCurrentLocation("Bedroom");
    setHour(START_HOUR);
    setDayOfWeek(START_DAY);
    setSelectedGirl(null);
    setMetCharacters(new Set());
    setGirlStatsOverrides({}); // NEW: Reset girl stats
    localStorage.removeItem("datingSimSave");
    setHasSaveData(false);

    // Always show intro on New Game
    setGameState("intro");
    setCurrentDialogue(introDialogue);
  };

  const startDialogue = (
    dialogue: Dialogue,
    characterImage: string = "",
    girlEffects: Partial<GirlStats> | null = null
  ) => {
    setCurrentDialogue(dialogue);
    setDialogueCharacterImage(characterImage);
    setDialogueGirlEffects(girlEffects);

    // Extract girl name from character image path
    if (characterImage) {
      const match = characterImage.match(/\/([^/]+)\//);
      if (match) {
        setDialogueGirlName(
          match[1].charAt(0).toUpperCase() + match[1].slice(1)
        );
      }
    }

    setGameState("dialogue");
  };

  const endDialogue = (statChanges?: {
    affection?: number;
    mood?: number;
    trust?: number;
    love?: number;
    lust?: number;
  }) => {
    // Apply stat changes to the girl
    if (dialogueGirlName) {
      const girl = girls.find(
        (g: Girl) => g.name.toLowerCase() === dialogueGirlName.toLowerCase()
      );

      if (girl) {
        const currentOverride = girlStatsOverrides[dialogueGirlName] || {};
        const currentStats = { ...girl.stats, ...currentOverride };

        // Combine dialogue choices stat changes with base interaction effects
        const combinedChanges = { ...dialogueGirlEffects, ...statChanges };

        // Apply all stat changes
        const newStats: Partial<GirlStats> = { ...currentStats };

        Object.entries(combinedChanges).forEach(([key, value]) => {
          if (typeof value === "number") {
            const statKey = key as keyof GirlStats;
            const currentValue = currentStats[statKey] || 0;
            const newValue = Math.max(0, Math.min(100, currentValue + value));
            newStats[statKey] = newValue;
          }
        });

        // Update state with new stats
        setGirlStatsOverrides((prev) => ({
          ...prev,
          [dialogueGirlName]: newStats,
        }));

        // Show feedback
        console.log(`✅ ${dialogueGirlName} stat changes:`, combinedChanges);
      }
    }

    setCurrentDialogue(null);
    setDialogueCharacterImage("");
    setDialogueGirlEffects(null);
    setDialogueGirlName("");

    setGameState("playing");
  };

  const moveTo = (location: string) => {
    setCurrentLocation(location);
    setSelectedGirl(null);

    // Check if there are any unmet characters at this location
    const charactersHere = girls.filter((g: Girl) => g.location === location);
    for (const girl of charactersHere) {
      if (!metCharacters.has(girl.name)) {
        // Show first meeting dialogue
        const firstMeeting = firstMeetingDialogues[girl.name];
        if (firstMeeting) {
          const characterImage = `/images/characters/${girl.name.toLowerCase()}/faces/neutral.png`;
          setMetCharacters(new Set([...metCharacters, girl.name]));
          startDialogue(firstMeeting, characterImage, null);
          break; // Only show one first meeting at a time
        }
      }
    }
  };

  const spendTime = (amount: number) => {
    const newHour = hour + amount;

    if (newHour >= MAX_HOUR) {
      // Move to next day
      setHour(START_HOUR);
      const nextDay = getNextDay(dayOfWeek);
      setDayOfWeek(nextDay);

      // Reset player stats for new day
      setPlayer((prev) => ({
        ...prev,
        energy: Math.min(100, prev.energy + 30), // Restore some energy
        hunger: Math.min(100, prev.hunger + 20), // Get hungry overnight
      }));

      // Show "New Day" message
      alert(`A new day begins! It's ${nextDay} morning.`);
    } else {
      setHour(newHour);
    }
  };

  const getCurrentLocationImage = () => {
    return getLocationBackground(currentLocation, hour);
  };

  const presentGirls = girls.filter(
    (g: Girl) => g.location === currentLocation
  );

  // Render main menu
  if (gameState === "mainMenu") {
    return (
      <MainMenu
        onNewGame={newGame}
        onContinue={loadGame}
        hasSaveData={hasSaveData}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  // Render intro dialogue or any dialogue
  if ((gameState === "intro" || gameState === "dialogue") && currentDialogue) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
            : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
        }`}
      >
        <DialogueBox
          dialogue={currentDialogue}
          onComplete={endDialogue}
          darkMode={darkMode}
          characterImage={dialogueCharacterImage}
          onSkip={
            gameState === "intro"
              ? () => {
                  setGameState("playing");
                  setCurrentDialogue(null);
                }
              : undefined
          }
        />
      </div>
    );
  }

  // Render game with optional pause menu
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode
            ? "bg-gradient-to-r from-purple-900 to-pink-900"
            : "bg-gradient-to-r from-pink-500 to-purple-600"
        } text-white py-4 md:py-6 shadow-lg transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            {isMobile ? "💖 Dating Sim" : "💖 Dating Sim Adventure"}
          </h1>
          <div className="flex gap-2 items-center">
            {/* Phone Button - More prominent on mobile */}
            <button
              onClick={() => setShowPhone(true)}
              className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                isMobile ? "animate-pulse" : ""
              }`}
              title="Open phone"
            >
              <span className="text-xl">📱</span>
              <span className="hidden sm:inline">Phone</span>
            </button>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
              title="Toggle dark mode"
            >
              <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
            </button>
            <button
              onClick={() => setGameState("paused")}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <span>⏸️</span>
              <span className="hidden md:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12  gap-6">
          {/* Left Sidebar - Stats (Hidden on Mobile) */}
          {!isMobile && (
            <div className="lg:col-span-2 min-w-0">
              <StatsPanel
                stats={player}
                hour={hour}
                dayOfWeek={dayOfWeek}
                darkMode={darkMode}
                onSave={saveGame}
              />
            </div>
          )}

          {/* Main Content - Center */}
          <div
            className={`${
              isMobile
                ? "col-span-1"
                : selectedGirl !== null
                ? "lg:col-span-7"
                : "lg:col-span-7"
            } space-y-6 min-w-0`}
          >
            {/* Current Location Scene with Characters */}
            <div
              className={`rounded-2xl shadow-xl overflow-hidden border-4 ${
                darkMode
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-purple-200"
              } transition-colors duration-300`}
            >
              {/* Location Name & Description - Mobile (Outside frame) */}
              <div className="block md:hidden px-3 py-3">
                <h2
                  className={`text-lg font-bold mb-1 ${
                    darkMode ? "text-purple-300" : "text-purple-800"
                  }`}
                >
                  📍 {currentLocation}
                </h2>
                <p
                  className={`text-xs italic ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {locationDescriptions[currentLocation]?.[
                    getTimeOfDay(hour)
                  ] || locationDescriptions[currentLocation]?.default}
                </p>
              </div>

              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-purple-100 to-white overflow-hidden">
                {/* Location Background Image */}
                <img
                  src={getCurrentLocationImage()} // ✅ CORRECT - path already included
                  alt={currentLocation}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if time-specific image doesn't exist
                    const locationKey = currentLocation
                      .toLowerCase()
                      .replace(/\s+/g, "_")
                      .replace(/'/g, "");
                    e.currentTarget.src = `/images/locations/${locationKey}/afternoon.png`;
                    e.currentTarget.onerror = () => {
                      // Final fallback
                      e.currentTarget.src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23ccc" width="1920" height="1080"/><text x="50%" y="50%" font-size="48" text-anchor="middle" fill="%23666">Location Image</text></svg>';
                    };
                  }}
                />

                {/* Time-based Atmosphere Overlay */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
                    getTimeOfDay(hour) === "morning"
                      ? "bg-gradient-to-b from-orange-300/30 via-transparent to-transparent"
                      : getTimeOfDay(hour) === "afternoon"
                      ? "bg-gradient-to-b from-yellow-200/20 via-transparent to-transparent"
                      : getTimeOfDay(hour) === "evening"
                      ? "bg-gradient-to-b from-purple-400/40 via-pink-300/20 to-transparent"
                      : "bg-gradient-to-b from-indigo-900/60 via-purple-900/30 to-black/40"
                  }`}
                ></div>

                {/* Dark overlay for better text/character visibility */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Location Name & Description - Desktop (Inside frame) */}
                <div className="hidden md:block absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-20">
                  <div className="bg-black/60 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 rounded-lg">
                    <h2 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg mb-1">
                      📍 {currentLocation}
                    </h2>
                    <p className="text-xs md:text-sm text-white/90 italic">
                      {locationDescriptions[currentLocation]?.[
                        getTimeOfDay(hour)
                      ] || locationDescriptions[currentLocation]?.default}
                    </p>
                  </div>
                </div>

                {/* Character Portraits on Scene */}
                <div className="absolute inset-0 flex items-end justify-around px-4 md:px-8 pb-8 md:pb-4">
                  {presentGirls.map((girl: Girl, index: number) => {
                    const characterImagePath = getCharacterImage(
                      girl,
                      currentLocation
                    );

                    return (
                      <button
                        key={girl.name}
                        onClick={() => setSelectedGirl(girl)}
                        className={`
          group relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-6
          ${
            selectedGirl?.name === girl.name
              ? "scale-105 -translate-y-6 z-20"
              : "z-10"
          }
          animate-fadeIn
        `}
                        style={{
                          animationDelay: `${index * 0.2}s`,
                        }}
                      >
                        {/* Shadow underneath character */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-3 sm:h-4 bg-black/30 rounded-full blur-md"></div>

                        {/* Glow effect when selected */}
                        {selectedGirl?.name === girl.name && (
                          <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-purple-500 rounded-3xl blur-xl sm:blur-2xl opacity-60 animate-pulse"></div>
                        )}

                        {/* Character Image - Full body style */}
                        <div className="relative">
                          <img
                            src={characterImagePath}
                            alt={girl.name}
                            onError={(e) => {
                              // Smart fallback chain
                              const currentSrc = e.currentTarget.src;
                              const girlName = girl.name.toLowerCase();

                              // Fallback hierarchy
                              const fallbacks = [
                                characterImagePath, // Already tried
                                `/images/characters/${girlName}/casual_neutral.png`,
                                `/images/${girlName}.png`, // Your old images
                                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect fill="%23e879f9" width="200" height="300"/><text x="50%" y="50%" font-size="60" text-anchor="middle" dy=".3em" fill="white">?</text></svg>',
                              ];

                              // Find the next untried fallback
                              for (const fallback of fallbacks) {
                                if (
                                  !currentSrc.includes(
                                    fallback.split("/").pop() || ""
                                  )
                                ) {
                                  e.currentTarget.src = fallback;
                                  break;
                                }
                              }
                            }}
                            className={`
              w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 object-cover object-top rounded-3xl
              ${
                selectedGirl?.name === girl.name
                  ? "border-4 border-pink-400 shadow-2xl shadow-pink-500/50"
                  : "border-4 border-white/80 shadow-2xl"
              }
              transition-all filter
              ${
                selectedGirl && selectedGirl.name !== girl.name
                  ? "brightness-75"
                  : "brightness-100"
              }
            `}
                          />

                          {/* Name Tag - positioned at bottom */}
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 px-3 sm:px-5 py-1 sm:py-2 rounded-full shadow-xl border-2 border-white">
                            <span className="text-white font-bold text-xs sm:text-sm whitespace-nowrap drop-shadow-lg">
                              {girl.name}
                            </span>
                          </div>

                          {/* Selection indicator */}
                          {selectedGirl?.name === girl.name && (
                            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full p-1 sm:p-2 shadow-xl animate-bounce border-2 border-white">
                              <span className="text-white text-lg sm:text-2xl">
                                💝
                              </span>
                            </div>
                          )}

                          {/* Hover prompt */}
                          <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                            <span className="text-white text-[10px] sm:text-xs font-semibold">
                              Click to talk
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Empty state message */}
                {presentGirls.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm px-4 md:px-8 py-3 md:py-4 rounded-2xl">
                      <p className="text-white text-lg md:text-xl text-center">
                        🏜️ Nobody is here right now...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Available Locations */}
            <div
              className={`rounded-2xl shadow-xl p-4 md:p-6 border-2 ${
                darkMode
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-purple-100"
              } transition-colors duration-300`}
            >
              <h3
                className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${
                  darkMode ? "text-purple-300" : "text-purple-800"
                }`}
              >
                🗺️ Where to go?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {locationGraph[currentLocation]?.map((loc) => (
                  <LocationCard
                    key={loc.name}
                    location={loc}
                    onMove={moveTo}
                    girls={girls}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Character Interaction or Location Activities */}
          {selectedGirl !== null ? (
            <div className={`${isMobile ? "col-span-1" : "lg:col-span-3"}`}>
              <CharacterOverlay
                girl={selectedGirl}
                location={currentLocation}
                player={player}
                setPlayer={setPlayer}
                spendTime={spendTime}
                onClose={() => setSelectedGirl(null)}
                onStartDialogue={startDialogue}
              />
            </div>
          ) : (
            <div className={`${isMobile ? "col-span-1" : "lg:col-span-3"}`}>
              <LocationActivities
                location={currentLocation}
                player={player}
                setPlayer={setPlayer}
                spendTime={spendTime}
                darkMode={darkMode}
                dayOfWeek={dayOfWeek}
              />
            </div>
          )}
        </div>
      </div>

      {/* Pause Menu Overlay */}
      {gameState === "paused" && (
        <PauseMenu
          onResume={() => setGameState("playing")}
          onSave={() => {
            saveGame();
            setGameState("playing");
          }}
          onMainMenu={returnToMainMenu}
        />
      )}

      {/* Dialogue Overlay during gameplay */}
      {currentDialogue && gameState === "dialogue" && (
        <DialogueBox
          dialogue={currentDialogue}
          onComplete={endDialogue}
          darkMode={darkMode}
          characterImage={dialogueCharacterImage}
        />
      )}

      {/* Phone Menu Overlay */}
      {showPhone && (
        <PhoneMenu
          player={player}
          hour={hour}
          girls={girls}
          darkMode={darkMode}
          onClose={() => setShowPhone(false)}
          onSave={saveGame}
          isMobile={isMobile}
          dayOfWeek={dayOfWeek}
        />
      )}
    </div>
  );
}
