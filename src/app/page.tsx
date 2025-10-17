"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

// Components
import StatsPanel from "../components/StatsPanel";
import LocationCard from "../components/LocationCard";
import CharacterOverlay from "../components/CharacterOverlay";
import LocationActivities from "../components/LocationActivities";
import MainMenu from "../components/MainMenu";
import PauseMenu from "../components/PauseMenu";
import DialogueBox from "../components/DialogueBox";
import PhoneMenu from "../components/PhoneMenu";

// Lib
import { getScheduledLocation } from "../lib/schedule";
import { getCharacterImage } from "../lib/characterImages";
import { getLocationBackground } from "../lib/locationImages";
import { checkRandomEvent } from "../lib/randomEventSystem";

// Data / Types
import { locationGraph } from "../data/locations";
import {
  PlayerStats,
  defaultPlayerStats,
  Girl,
  girls as baseGirls,
  GirlStats,
} from "../data/characters";
import {
  introDialogue,
  type Dialogue,
  firstMeetingDialogues,
} from "../data/dialogues";
import {
  DayOfWeek,
  START_DAY,
  START_HOUR,
  MAX_HOUR,
  getNextDay,
  DAYS_OF_WEEK,
} from "../data/gameConstants";
import {
  locationDescriptions,
  getTimeOfDay,
} from "../data/locationDescriptions";

import type { RandomEvent } from "../data/events/randomEvents";
import { randomEvents } from "../data/events/randomEvents";
import type { CharacterEventState, EventHistory } from "../data/events/types";

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
  const [characterEventStates, setCharacterEventStates] = useState<
    Record<string, CharacterEventState>
  >({});

  // 🎲 Track active random event
  const [currentRandomEvent, setCurrentRandomEvent] =
    useState<RandomEvent | null>(null);

  //Characters lock status
  const [characterUnlocks, setCharacterUnlocks] = useState<{
    Yumi: boolean;
    Gwen: boolean;
    Dawn: boolean;
    Ruby: boolean;
  }>({
    Yumi: false,
    Gwen: false,
    Dawn: false,
    Ruby: false,
  });

  // helpers
  const getGameTimeHours = useCallback((day: DayOfWeek, h: number) => {
    const idx = Math.max(0, DAYS_OF_WEEK.indexOf(day));
    return idx * MAX_HOUR + h;
  }, []);

  // mount
  useEffect(() => {
    const savedGame = localStorage.getItem("datingSimSave");
    setHasSaveData(!!savedGame);

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) setDarkMode(savedDarkMode === "true");

    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setGameState((s) =>
        s === "playing" ? "paused" : s === "paused" ? "playing" : s
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

 

  // girls with schedules + overrides
  const girls = useMemo(() => {
    return baseGirls
      .filter((girl) => {
        // Iris is always available
        if (girl.name === "Iris") return true;

        // Other characters require unlocking
        if (girl.name === "Yumi") return characterUnlocks.Yumi;
        if (girl.name === "Gwen") return characterUnlocks.Gwen;
        if (girl.name === "Dawn") return characterUnlocks.Dawn;
        if (girl.name === "Ruby") return characterUnlocks.Ruby;

        return true; // Default: show character
      })
      .map((girl) => {
        const scheduledLocation = getScheduledLocation(
          girl.name,
          dayOfWeek,
          hour
        );
        const override = girlStatsOverrides[girl.name];
        return {
          ...girl,
          location: scheduledLocation || girl.location,
          stats: override ? { ...girl.stats, ...override } : girl.stats,
        };
      });
  }, [dayOfWeek, hour, girlStatsOverrides, characterUnlocks]);

 useEffect(() => {
    if (selectedGirl) {
      const stillPresent = girls.find(
        (g) => g.name === selectedGirl.name && g.location === currentLocation
      );
      if (!stillPresent) {
        setSelectedGirl(null);
      }
    }
  }, [girls, selectedGirl, currentLocation]);

  // save/load
  const saveGame = () => {
    const saveData = {
      player,
      currentLocation,
      hour,
      dayOfWeek,
      metCharacters: Array.from(metCharacters),
      girlStatsOverrides,
      characterEventStates,
      characterUnlocks,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("datingSimSave", JSON.stringify(saveData));
    setHasSaveData(true);
    alert("Game saved! 💾");
  };

  const loadGame = () => {
    const raw = localStorage.getItem("datingSimSave");
    if (!raw) return;
    const data = JSON.parse(raw);
    setPlayer(data.player);
    setCurrentLocation(data.currentLocation);
    setHour(data.hour);
    setDayOfWeek(data.dayOfWeek ?? START_DAY);
    setMetCharacters(new Set(data.metCharacters ?? []));
    setGirlStatsOverrides(data.girlStatsOverrides ?? {});
    setCharacterEventStates(data.characterEventStates ?? {});
    setCharacterUnlocks(
      data.characterUnlocks ?? {
        // ADD THIS
        Yumi: false,
        Gwen: false,
        Dawn: false,
        Ruby: false,
      }
    );
    setSelectedGirl(null);
    setGameState("playing");
  };

  const resetGame = () => {
    setPlayer(defaultPlayerStats);
    setCurrentLocation("Bedroom");
    setHour(START_HOUR);
    setDayOfWeek(START_DAY);
    setSelectedGirl(null);
    setMetCharacters(new Set());
    setGirlStatsOverrides({});
    setCharacterEventStates({});
    setCharacterUnlocks(
       {
        // ADD THIS
        Yumi: false,
        Gwen: false,
        Dawn: false,
        Ruby: false,
      }
    );
    localStorage.removeItem("datingSimSave");
    setHasSaveData(false);

    setGameState("intro");
    setCurrentDialogue(introDialogue);
  };

  const newGame = () => {
    if (!hasSaveData) return resetGame();
    if (
      confirm(
        "Starting a new game will overwrite your saved progress. Continue?"
      )
    )
      resetGame();
  };

  // dialogue helpers
  const startDialogue = (
    dialogue: Dialogue,
    characterImage: string = "",
    girlEffects: Partial<GirlStats> | null = null
  ) => {
    setCurrentDialogue(dialogue);
    setDialogueCharacterImage(characterImage);
    setDialogueGirlEffects(girlEffects);

    if (characterImage) {
      const m = characterImage.match(/\/characters\/([^/]+)\//); 
      if (m) setDialogueGirlName(m[1].charAt(0).toUpperCase() + m[1].slice(1));
    }

    setGameState("dialogue");
  };

  const endDialogue = (statChanges?: Partial<GirlStats>) => {
    if (dialogueGirlName) {
      const girl = girls.find(
        (g) => g.name.toLowerCase() === dialogueGirlName.toLowerCase()
      );
      if (girl) {
        const currentOverride = girlStatsOverrides[dialogueGirlName] || {};
        const currentStats = { ...girl.stats, ...currentOverride };
        const combined = { ...dialogueGirlEffects, ...statChanges };

        const newStats: Partial<GirlStats> = { ...currentStats };
        Object.entries(combined).forEach(([key, value]) => {
          if (typeof value === "number") {
            const k = key as keyof GirlStats;
            const cur = (currentStats[k] as number) ?? 0;
            newStats[k] = Math.max(0, Math.min(100, cur + value));
          }
        });

        setGirlStatsOverrides((prev) => ({
          ...prev,
          [dialogueGirlName]: newStats,
        }));
        //Unlock Dawn after first interaction with Iris
        if (dialogueGirlName === "Iris" && !characterUnlocks.Dawn) {
          setCharacterUnlocks((prev) => ({ ...prev, Dawn: true }));
        }
      }
    }

    setCurrentDialogue(null);
    setDialogueCharacterImage("");
    setDialogueGirlEffects(null);
    setDialogueGirlName("");
    setSelectedGirl(null);
    setGameState("playing");
  };

  const endRandomEventDialogue = () => {
    setCurrentRandomEvent(null);
    setCurrentDialogue(null);
    setDialogueCharacterImage("");
    setDialogueGirlEffects(null);
    setDialogueGirlName("");
    setGameState("playing");
  };

  // ✅ Router for nextDialogueId coming from DialogueBox
  const goToDialogueByEventId = (id: string) => {
    const ev = randomEvents.find((e) => e.id === id);
    if (!ev) {
      console.warn("[Dialogue] nextDialogueId not found:", id);
      return;
    }
    setCurrentRandomEvent(ev); // keep context if this is a chain
    startDialogue(ev.dialogue, "", null);
  };

  // location change + random events
  const moveTo = (location: string) => {
    setCurrentLocation(location);
    setSelectedGirl(null);

   // Unlock Gwen when entering Hallway after 5 PM
  if (location === "Hallway" && hour >= 17 && !characterUnlocks.Gwen) {
    setCharacterUnlocks((prev) => ({ ...prev, Gwen: true }));
    
    // Trigger Gwen's first meeting
    const firstMeeting = firstMeetingDialogues["Gwen"];
    if (firstMeeting) {
      const characterImage = "/images/characters/gwen/faces/neutral.png";
      setMetCharacters(new Set([...metCharacters, "Gwen"]));
      startDialogue(firstMeeting, characterImage, null);
      return;
    }
  }

    // first meeting check
    const charactersHere = girls.filter((g) => g.location === location);
    for (const girl of charactersHere) {
      if (!metCharacters.has(girl.name)) {
        const firstMeeting = firstMeetingDialogues[girl.name];
        if (firstMeeting) {
          const characterImage = `/images/characters/${girl.name.toLowerCase()}/faces/neutral.png`;
          setMetCharacters(new Set([...metCharacters, girl.name]));
          startDialogue(firstMeeting, characterImage, null);
          return; // don't immediately trigger random event
        }
      }
    }

    // random event roll
    const randomEvent = checkRandomEvent(location, hour, dayOfWeek, player);
    if (randomEvent) {
      console.log(`🎲 Random event: ${randomEvent.name}`);
      setCurrentRandomEvent(randomEvent);
      startDialogue(randomEvent.dialogue, "", null);
      if (randomEvent.rewards) applyRandomEventRewards(randomEvent.rewards);
    }
  };

  // rewards
  const applyRandomEventRewards = (rewards: RandomEvent["rewards"]) => {
    if (!rewards) return;
    const updated = { ...player };

    if (typeof rewards.money === "number") {
      updated.money += rewards.money;
      console.log(`💰 Money: ${rewards.money > 0 ? "+" : ""}${rewards.money}`);
    }

    if (rewards.item) {
      updated.inventory = [...updated.inventory, rewards.item];
      console.log(`📦 Added ${rewards.item} to inventory`);
    }

    if (rewards.playerStats) {
      Object.entries(rewards.playerStats).forEach(([key, value]) => {
        const statKey = key as keyof PlayerStats;
        if (typeof value === "number" && typeof updated[statKey] === "number") {
          const cur = updated[statKey] as number;
          const bounded =
            statKey === "energy" || statKey === "mood" || statKey === "hunger"
              ? Math.max(0, Math.min(100, cur + value))
              : Math.max(0, cur + value);
          (updated[statKey] as number) = bounded;
        }
      });
    }

    if (rewards.girlAffection) {
      Object.entries(rewards.girlAffection).forEach(([girlName, change]) => {
        const override = girlStatsOverrides[girlName] || {};
        const girl = girls.find((g) => g.name === girlName);
        if (!girl) return;

        const currentStats = { ...girl.stats, ...override };
        const newAffection = Math.max(
          0,
          Math.min(100, (currentStats.affection ?? 0) + change)
        );
        setGirlStatsOverrides((prev) => ({
          ...prev,
          [girlName]: { ...currentStats, affection: newAffection },
        }));
        console.log(
          `💕 ${girlName} affection: ${change > 0 ? "+" : ""}${change}`
        );
      });
    }

    setPlayer(updated);
  };

  // time
  const spendTime = (amount: number) => {
    const newHour = hour + amount;

    if (newHour >= MAX_HOUR) {
      const nextDay = getNextDay(dayOfWeek);
      setHour(START_HOUR);
      setDayOfWeek(nextDay);

      setPlayer((prev) => ({
        ...prev,
        energy: Math.min(100, prev.energy + 30),
        hunger: Math.min(100, prev.hunger + 20),
      }));

      // Clear selected girl when day changes  ← NEW LINE
    setSelectedGirl(null);  //← NEW LINE

      alert(`A new day begins! It's ${nextDay} morning.`);
    } else {
      setHour(newHour);
    }
  };

  const getCurrentLocationImage = () =>
    getLocationBackground(currentLocation, hour);
  const presentGirls = girls.filter((g) => g.location === currentLocation);

  const returnToMainMenu = () => {
    if (!confirm("Return to main menu? Any unsaved progress will be lost."))
      return;
    setGameState("mainMenu");
    setSelectedGirl(null);
  };

  // screens
  if (gameState === "mainMenu") {
    return (
      <MainMenu
        onNewGame={newGame}
        onContinue={loadGame}
        hasSaveData={hasSaveData}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
      />
    );
  }

  // ===== FIRST LOCATION updated: pass isMobile and locationImage =====
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
          onComplete={currentRandomEvent ? endRandomEventDialogue : endDialogue}
          darkMode={darkMode}
          characterImage={currentRandomEvent ? "" : dialogueCharacterImage}
          onSkip={
            gameState === "intro"
              ? () => {
                  setGameState("playing");
                  setCurrentDialogue(null);
                }
              : undefined
          }
          onNextDialogueId={goToDialogueByEventId}
          isMobile={isMobile}
          locationImage={getCurrentLocationImage()}
        />
      </div>
    );
  }

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
            <button
              onClick={() => setDarkMode((d) => !d)}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
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

          {/* Main */}
          <div
            className={`${
              isMobile ? "col-span-1" : "lg:col-span-7"
            } space-y-6 min-w-0`}
          >
            {/* Scene */}
            <div
              className={`rounded-2xl shadow-xl overflow-hidden border-4 ${
                darkMode
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-purple-200"
              } transition-colors duration-300`}
            >
              {/* Mobile title/desc */}
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
                {/* Background image with safe fallbacks */}
                <img
                  src={getCurrentLocationImage()}
                  alt={currentLocation}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement; // capture before synthetic event pooling
                    const locationKey = currentLocation
                      .toLowerCase()
                      .replace(/\s+/g, "_")
                      .replace(/'/g, "");

                    img.onerror = () => {
                      img.onerror = null;
                      img.src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect fill="%23ccc" width="1920" height="1080"/><text x="50%" y="50%" font-size="48" text-anchor="middle" fill="%23666">Location Image</text></svg>';
                    };

                    img.src = `/images/locations/${locationKey}/afternoon.png`;
                  }}
                />

                {/* Atmosphere overlay */}
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
                />

                {/* Darken for readability */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Desktop title/desc */}
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

                {/* Characters */}
                <div className="absolute inset-0 flex items-end justify-around px-4 md:px-8 pb-8 md:pb-4">
                  {presentGirls.map((girl, index) => {
                    const imgPath = getCharacterImage(
                      girl,
                      currentLocation,
                      hour
                    );
                    return (
                      <button
                        key={girl.name}
                        onClick={() => setSelectedGirl(girl)}
                        className={`group relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-6 ${
                          selectedGirl?.name === girl.name
                            ? "scale-105 -translate-y-6 z-20"
                            : "z-10"
                        } animate-fadeIn`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {/* Shadow */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-3 sm:h-4 bg-black/30 rounded-full blur-md" />

                        {/* Glow */}
                        {selectedGirl?.name === girl.name && (
                          <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-60 animate-pulse" />
                        )}

                        {/* Character image */}
                        <div className="relative">
                          <img
                            src={imgPath}
                            alt={girl.name}
                            onError={(e) => {
                              const el = e.currentTarget;
                              const girlName = girl.name.toLowerCase();
                              const fallbacks = [
                                imgPath,
                                `/images/characters/${girlName}/casual_neutral.png`,
                                `/images/${girlName}.png`,
                                'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect fill="%23e879f9" width="200" height="300"/><text x="50%" y="50%" font-size="60" text-anchor="middle" dy=".3em" fill="white">?</text></svg>',
                              ];
                              const cur = el.src;
                              for (const fb of fallbacks) {
                                if (!cur.endsWith(fb.split("/").pop() || "")) {
                                  el.src = fb;
                                  break;
                                }
                              }
                            }}
                            className={`w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 object-cover object-top rounded-3xl border-4 ${
                              selectedGirl?.name === girl.name
                                ? "border-pink-400 shadow-2xl shadow-pink-500/50"
                                : "border-white/80 shadow-2xl"
                            } transition-all ${
                              selectedGirl && selectedGirl.name !== girl.name
                                ? "brightness-75"
                                : ""
                            }`}
                          />

                          {/* Name tag */}
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 px-3 sm:px-5 py-1 sm:py-2 rounded-full shadow-xl border-2 border-white">
                            <span className="text-white font-bold text-xs sm:text-sm whitespace-nowrap drop-shadow-lg">
                              {girl.name}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Nobody */}
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

            {/* Available locations */}
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

          {/* Right Sidebar */}
          {selectedGirl ? (
            <div className={`${isMobile ? "col-span-1" : "lg:col-span-3"}`}>
              <CharacterOverlay
                girl={selectedGirl}
                location={currentLocation}
                player={player}
                setPlayer={setPlayer}
                spendTime={spendTime}
                onClose={() => setSelectedGirl(null)}
                onStartDialogue={startDialogue}
                dayOfWeek={dayOfWeek}
                hour={hour}
                eventState={
                  characterEventStates[selectedGirl.name] ?? {
                    characterName: selectedGirl.name,
                    eventHistory: [] as EventHistory[],
                    lastInteractionTime: getGameTimeHours(dayOfWeek, hour),
                  }
                }
                onEventTriggered={(eventId) => {
                  const name = selectedGirl.name;
                  const prevState = characterEventStates[name] ?? {
                    characterName: name,
                    eventHistory: [] as EventHistory[],
                    lastInteractionTime: 0,
                  };

                  const gameTime = getGameTimeHours(dayOfWeek, hour);
                  const lastTriggered = { day: dayOfWeek, hour, gameTime };

                  const idx = prevState.eventHistory.findIndex(
                    (e) => e.eventId === eventId
                  );
                  let updatedHistory: EventHistory[];
                  if (idx >= 0) {
                    const existing = prevState.eventHistory[idx];
                    updatedHistory = [...prevState.eventHistory];
                    updatedHistory[idx] = {
                      ...existing,
                      lastTriggered,
                      timesTriggered: (existing.timesTriggered ?? 0) + 1,
                    };
                  } else {
                    updatedHistory = [
                      ...prevState.eventHistory,
                      { eventId, lastTriggered, timesTriggered: 1 },
                    ];
                  }

                  const newState: CharacterEventState = {
                    ...prevState,
                    eventHistory: updatedHistory,
                    lastInteractionTime: gameTime,
                  };

                  setCharacterEventStates((prev) => ({
                    ...prev,
                    [name]: newState,
                  }));
                }}
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
                onUnlockCharacter={(name) => {
                  setCharacterUnlocks((prev) => ({ ...prev, [name]: true }));
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Pause Menu */}
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

      {/* Safety: Dialogue while playing — updated to pass isMobile & locationImage */}
      {currentDialogue && gameState === "dialogue" && (
        <DialogueBox
          dialogue={currentDialogue}
          onComplete={currentRandomEvent ? endRandomEventDialogue : endDialogue}
          darkMode={darkMode}
          characterImage={currentRandomEvent ? "" : dialogueCharacterImage}
          onNextDialogueId={goToDialogueByEventId}
          isMobile={isMobile}
          locationImage={getCurrentLocationImage()}
        />
      )}

      {/* Phone Menu */}
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
