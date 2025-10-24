// src/app/page.tsx
"use client";

import { useEffect, useCallback, useState } from "react";
import { useGame, useGameSave, useGameTime } from "../contexts/GameContext";

// Components (unchanged)
import StatsPanel from "../components/StatsPanel";
import LocationCard from "../components/LocationCard";
import CharacterOverlay from "../components/CharacterOverlay";
import LocationActivities from "../components/LocationActivities";
import MainMenu from "../components/MainMenu";
import PauseMenu from "../components/PauseMenu";
import DialogueBox from "../components/DialogueBox";
import PhoneMenu from "../components/PhoneMenu";

// Lib (unchanged)
import { getCharacterImage } from "../lib/characterImages";
import { getLocationBackground } from "../lib/locationImages";
import { checkRandomEvent } from "../lib/randomEventSystem";
import { getCharacterEvents } from "../data/events/index";

// Data (unchanged)
import { locationGraph } from "../data/locations";
import {
  introDialogue,
  type Dialogue,
  firstMeetingDialogues,
} from "../data/dialogues";
import {
  locationDescriptions,
  getTimeOfDay,
} from "../data/locationDescriptions";
import { randomEvents } from "../data/events/randomEvents";
import type { RandomEvent } from "../data/events/randomEvents";
import {  GirlStats } from "@/data/characters";

export default function GamePage() {
  // Get everything from context
  const {
    state,
    dispatch,
    girls,
    presentGirls,
    moveTo,
    updateGirlStats,
    scheduleEncounter,
  } = useGame();

  const { saveGame, loadGame, resetGame } = useGameSave();
  const { hour, dayOfWeek, spendTime } = useGameTime();

  // Local UI state (dialogue system - could also move to context if needed)
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [dialogueCharacterImage, setDialogueCharacterImage] =
    useState<string>("");
  const [dialogueGirlEffects, setDialogueGirlEffects] =
    useState<Partial<GirlStats> | null>(null);
  const [dialogueGirlName, setDialogueGirlName] = useState<string>("");
  const [currentRandomEvent, setCurrentRandomEvent] =
    useState<RandomEvent | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check for save data on mount
  useEffect(() => {
    const savedGame = localStorage.getItem("datingSimSave");
    dispatch({ type: "SET_HAS_SAVE_DATA", payload: !!savedGame });

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      dispatch({
        type: "SET_GAME_STATE",
        payload: savedDarkMode === "true" ? state.gameState : state.gameState,
      });
      if (savedDarkMode === "true") {
        dispatch({ type: "TOGGLE_DARK_MODE" });
      }
    }

    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync dark mode with localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
    localStorage.setItem("darkMode", String(state.darkMode));
  }, [state.darkMode]);

  // ESC key handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (state.gameState === "playing") {
        dispatch({ type: "SET_GAME_STATE", payload: "paused" });
      } else if (state.gameState === "paused") {
        dispatch({ type: "SET_GAME_STATE", payload: "playing" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.gameState, dispatch]);

  // Auto-deselect girl if she leaves location
  useEffect(() => {
    if (state.selectedGirl) {
      const stillPresent = presentGirls.find(
        (g) => g.name === state.selectedGirl!.name
      );
      if (!stillPresent) {
        dispatch({ type: "SELECT_GIRL", payload: null });
      }
    }
  }, [presentGirls, state.selectedGirl, dispatch]);

  // New game handler
  const newGame = useCallback(() => {
    if (!state.hasSaveData) {
      resetGame();
      dispatch({ type: "SET_GAME_STATE", payload: "intro" });
      setCurrentDialogue(introDialogue);
      return;
    }

    if (
      confirm(
        "Starting a new game will overwrite your saved progress. Continue?"
      )
    ) {
      resetGame();
      dispatch({ type: "SET_GAME_STATE", payload: "intro" });
      setCurrentDialogue(introDialogue);
    }
  }, [state.hasSaveData, resetGame, dispatch]);

  // Dialogue system
  const startDialogue = useCallback(
    (
      dialogue: Dialogue,
      characterImage: string = "",
      girlEffects: Partial<GirlStats> | null = null,
      characterName?: string
    ) => {
      setCurrentDialogue(dialogue);
      setDialogueCharacterImage(characterImage);
      setDialogueGirlEffects(girlEffects);
      setDialogueGirlName(characterName || "");
      dispatch({ type: "SET_GAME_STATE", payload: "dialogue" });

      if (characterImage) {
        const m = characterImage.match(/\/characters\/([^/]+)\//);
        if (m)
          setDialogueGirlName(m[1].charAt(0).toUpperCase() + m[1].slice(1));
      }
    },
    [dispatch]
  );

  const endDialogue = useCallback(
    (statChanges?: Partial<GirlStats>, chosenOption?: any) => {
      if (chosenOption?.scheduleEncounter) {
        scheduleEncounter(chosenOption.scheduleEncounter);
      }

      if (dialogueGirlName && (dialogueGirlEffects || statChanges)) {
        const combined = { ...dialogueGirlEffects, ...statChanges };
        updateGirlStats(dialogueGirlName, combined);

        // Unlock Dawn after first Iris interaction
        if (dialogueGirlName === "Iris" && !state.characterUnlocks.Dawn) {
          dispatch({ type: "UNLOCK_CHARACTER", payload: "Dawn" });
        }
      }

      setCurrentDialogue(null);
      setDialogueCharacterImage("");
      setDialogueGirlEffects(null);
      setDialogueGirlName("");
      dispatch({ type: "SELECT_GIRL", payload: null });
      dispatch({ type: "SET_GAME_STATE", payload: "playing" });
    },
    [
      dialogueGirlName,
      dialogueGirlEffects,
      updateGirlStats,
      scheduleEncounter,
      state.characterUnlocks,
      dispatch,
    ]
  );

  const endRandomEventDialogue = useCallback(() => {
    if (currentRandomEvent?.timeCost) {
      spendTime(currentRandomEvent.timeCost);
    }

    setCurrentRandomEvent(null);
    setCurrentDialogue(null);
    setDialogueCharacterImage("");
    setDialogueGirlEffects(null);
    setDialogueGirlName("");
    dispatch({ type: "SET_GAME_STATE", payload: "playing" });
  }, [currentRandomEvent, spendTime, dispatch]);

  // Check for scheduled encounters
  const checkScheduledEncounters = useCallback(
    (location: string): boolean => {
      const encounter = state.scheduledEncounters.find((e) => {
        if (e.location !== location) return false;
        if (e.day && e.hour !== undefined) {
          return e.day === dayOfWeek && e.hour === hour;
        }
        return true;
      });

      if (!encounter) return false;

      console.log(`✨ Triggering encounter: ${encounter.label || "Event"}`);

      // Remove from scheduled list
      dispatch({
        type: "REMOVE_ENCOUNTER",
        payload: {
          characterName: encounter.characterName,
          eventId: encounter.eventId,
        },
      });

      // Handle date with activities
      if (encounter.activities && encounter.activities.length > 0) {
        const girl = girls.find((g) => g.name === encounter.characterName);
        if (girl) {
          const characterImage = getCharacterImage(
            girl,
            state.currentLocation,
            hour
          );
          const dateStartDialogue: Dialogue = {
            id: encounter.eventId,
            lines: [
              {
                speaker: null,
                text: `You arrive at ${encounter.location} for your date with ${encounter.characterName}.`,
              },
              {
                speaker: encounter.characterName,
                text: "Hey! I'm so glad you made it!",
                expression: "happy",
              },
            ],
          };
          startDialogue(dateStartDialogue, characterImage, null);
        }
        return true;
      }

      // Handle regular events
      const event = randomEvents.find((e) => e.id === encounter.eventId);
      if (event) {
        setCurrentRandomEvent(event);
        startDialogue(event.dialogue, "", null);
        return true;
      }

      return false;
    },
    [
      state.scheduledEncounters,
      state.currentLocation,
      dayOfWeek,
      hour,
      girls,
      dispatch,
      startDialogue,
    ]
  );

  // Move to location with encounter checks
  const handleMoveTo = useCallback(
    (location: string) => {
      moveTo(location);

      // Check scheduled encounters
      if (checkScheduledEncounters(location)) {
        return;
      }

      // Unlock Gwen at hallway after 5 PM
      if (
        location === "Hallway" &&
        hour >= 17 &&
        !state.characterUnlocks.Gwen
      ) {
        dispatch({ type: "UNLOCK_CHARACTER", payload: "Gwen" });
        const firstMeeting = firstMeetingDialogues["Gwen"];
        if (firstMeeting) {
          const girl = girls.find((g) => g.name === "Gwen");
          if (girl) {
            const characterImage = getCharacterImage(girl, location, hour);
            dispatch({ type: "ADD_MET_CHARACTER", payload: "Gwen" });
            startDialogue(firstMeeting, characterImage, null);
          }
        }
        return;
      }

      // Check random events
      const randomEvent = checkRandomEvent(
        location,
        hour,
        dayOfWeek,
        state.player
      );
      if (randomEvent) {
        console.log(`🎲 Random event: ${randomEvent.name}`);
        setCurrentRandomEvent(randomEvent);
        startDialogue(randomEvent.dialogue, "", null);
      }
    },
    [
      moveTo,
      checkScheduledEncounters,
      hour,
      dayOfWeek,
      state.characterUnlocks,
      state.player,
      girls,
      dispatch,
      startDialogue,
    ]
  );

  const getCurrentLocationImage = useCallback(
    () => getLocationBackground(state.currentLocation, hour),
    [state.currentLocation, hour]
  );

  const returnToMainMenu = useCallback(() => {
    if (!confirm("Return to main menu? Any unsaved progress will be lost."))
      return;
    dispatch({ type: "SET_GAME_STATE", payload: "mainMenu" });
    dispatch({ type: "SELECT_GIRL", payload: null });
  }, [dispatch]);

  // Handle character unlocks
  const handleUnlockCharacter = useCallback(
    (characterName: string) => {
      if (
        characterName === "Ruby" ||
        characterName === "Yumi" ||
        characterName === "Gwen" ||
        characterName === "Dawn"
      ) {
        dispatch({ type: "UNLOCK_CHARACTER", payload: characterName });

        // Trigger first meeting for Ruby
        if (characterName === "Ruby") {
          setTimeout(() => {
            const firstMeeting = firstMeetingDialogues["Ruby"];
            if (firstMeeting) {
              const girl = girls.find((g) => g.name === "Ruby");
              if (girl) {
                const characterImage = getCharacterImage(
                  girl,
                  state.currentLocation,
                  hour
                );
                startDialogue(firstMeeting, characterImage, null);
              }
            }
          }, 100);
        }
      }
    },
    [dispatch, girls, state.currentLocation, hour, startDialogue]
  );

  // RENDER: Main Menu
  if (state.gameState === "mainMenu") {
    return (
      <MainMenu
        onNewGame={newGame}
        onContinue={loadGame}
        hasSaveData={state.hasSaveData}
        darkMode={state.darkMode}
        onToggleDarkMode={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
      />
    );
  }

  // RENDER: Intro/Dialogue
  if (
    (state.gameState === "intro" || state.gameState === "dialogue") &&
    currentDialogue
  ) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          state.darkMode
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
            : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
        }`}
      >
        <DialogueBox
          dialogue={currentDialogue}
          onComplete={currentRandomEvent ? endRandomEventDialogue : endDialogue}
          darkMode={state.darkMode}
          characterImage={currentRandomEvent ? "" : dialogueCharacterImage}
          characterName={dialogueGirlName}
          onSkip={
            state.gameState === "intro"
              ? () => {
                  dispatch({ type: "SET_GAME_STATE", payload: "playing" });
                  setCurrentDialogue(null);
                }
              : undefined
          }
          isMobile={isMobile}
          locationImage={getCurrentLocationImage()}
          currentLocation={state.currentLocation}
          currentHour={hour}
          currentDay={dayOfWeek}
          playerStats={state.player}
          girlStats={
            state.selectedGirl?.stats ||
            (dialogueGirlName
              ? girls.find((g) => g.name === dialogueGirlName)?.stats
              : undefined)
          }
        />
      </div>
    );
  }

  // RENDER: Main Game
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        state.darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          state.darkMode
            ? "bg-gradient-to-r from-purple-900 to-pink-900"
            : "bg-gradient-to-r from-pink-500 to-purple-600"
        } text-white py-4 md:py-6 shadow-lg transition-colors duration-300`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            {isMobile ? "💖 HotV" : "💖 Heart of the Valley"}
          </h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => dispatch({ type: "TOGGLE_PHONE" })}
              className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                isMobile ? "animate-pulse" : ""
              }`}
            >
              <span className="text-xl">📱</span>
              <span className="hidden sm:inline">Phone</span>
            </button>
            <button
              onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <span className="text-xl">{state.darkMode ? "☀️" : "🌙"}</span>
            </button>
            <button
              onClick={() =>
                dispatch({ type: "SET_GAME_STATE", payload: "paused" })
              }
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
          {/* Left Sidebar - Stats */}
          {!isMobile && (
            <div className="lg:col-span-2 min-w-0">
              <StatsPanel
                stats={state.player}
                hour={hour}
                dayOfWeek={dayOfWeek}
                darkMode={state.darkMode}
                onSave={saveGame}
              />
            </div>
          )}

          {/* Main Area - Scene */}
          <div
            className={`${
              isMobile ? "col-span-1" : "lg:col-span-7"
            } space-y-6 min-w-0`}
          >
            {/* Scene rendering - keeping your existing scene code */}
            <div
              className={`rounded-2xl shadow-xl overflow-hidden border-4 ${
                state.darkMode
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-purple-200"
              } transition-colors duration-300`}
            >
              {/* Your existing scene code... */}
            </div>

            {/* Available locations */}
            <div
              className={`rounded-2xl shadow-xl p-4 md:p-6 border-2 ${
                state.darkMode
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-purple-100"
              } transition-colors duration-300`}
            >
              <h3
                className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${
                  state.darkMode ? "text-purple-300" : "text-purple-800"
                }`}
              >
                🗺️ Where to go?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {locationGraph[state.currentLocation]?.map((loc) => (
                  <LocationCard
                    key={loc.name}
                    location={loc}
                    onMove={handleMoveTo}
                    girls={girls}
                    darkMode={state.darkMode}
                    scheduledEncounters={state.scheduledEncounters}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Character or Activities */}
          {state.selectedGirl ? (
            <div className={`${isMobile ? "col-span-1" : "lg:col-span-3"}`}>
              <CharacterOverlay
                girl={state.selectedGirl}
                location={state.currentLocation}
                player={state.player}
                setPlayer={(p) => dispatch({ type: "SET_PLAYER", payload: p })}
                spendTime={spendTime}
                onClose={() => dispatch({ type: "SELECT_GIRL", payload: null })}
                onStartDialogue={startDialogue}
                dayOfWeek={dayOfWeek}
                hour={hour}
                eventState={
                  state.characterEventStates[state.selectedGirl.name] ?? {
                    characterName: state.selectedGirl.name,
                    eventHistory: [],
                    lastInteractionTime: 0,
                  }
                }
                onEventTriggered={(eventId) => {
                  // Handle event triggered logic
                }}
                darkMode={state.darkMode}
                onScheduleDate={(date) => scheduleEncounter(date)}
              />
            </div>
          ) : (
            <div className={`${isMobile ? "col-span-1" : "lg:col-span-3"}`}>
              <LocationActivities
                location={state.currentLocation}
                player={state.player}
                setPlayer={(p) => dispatch({ type: "SET_PLAYER", payload: p })}
                spendTime={spendTime}
                darkMode={state.darkMode}
                dayOfWeek={dayOfWeek}
                onUnlockCharacter={handleUnlockCharacter}
              />
            </div>
          )}
        </div>
      </div>

      {/* Pause Menu */}
      {state.gameState === "paused" && (
        <PauseMenu
          onResume={() =>
            dispatch({ type: "SET_GAME_STATE", payload: "playing" })
          }
          onSave={() => {
            saveGame();
            dispatch({ type: "SET_GAME_STATE", payload: "playing" });
          }}
          onMainMenu={returnToMainMenu}
        />
      )}

      {/* Phone Menu */}
      {state.showPhone && (
        <PhoneMenu
          player={state.player}
          hour={hour}
          girls={girls}
          darkMode={state.darkMode}
          onClose={() => dispatch({ type: "SET_PHONE", payload: false })}
          onSave={saveGame}
          isMobile={isMobile}
          dayOfWeek={dayOfWeek}
        />
      )}
    </div>
  );
}
