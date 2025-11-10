"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";

// Components
import NameInput from "@/components/NameInput";
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
import { getCharacterEvents } from "../data/events/index";
import type { CharacterEvent as GameCharacterEvent } from "../lib/game/characterEventSystem";
// import { findTriggeredEvent } from "../lib/eventSystem";
import {
  CharacterEventManager,
  calculateGameTime,
} from "@/lib/game/characterEventSystem";
import { applyStatChanges } from "@/lib/utils/statManager";
import { STAT_LIMITS, TIME_CONFIG } from "@/config/gameConfig";
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
  DayOfWeek,
  START_DAY,
  START_HOUR,
  MAX_HOUR,
  getNextDay,
} from "../data/gameConstants";
import {
  locationDescriptions,
  getTimeOfDay,
} from "../data/locationDescriptions";
import {
  introDialogue,
  characterDialogues,
  // getDefaultDialogue,
  type Dialogue,
  // firstMeetingDialogues,
} from "../data/dialogues/index";

import type { RandomEvent } from "../data/events/randomEvents";
import { randomEvents } from "../data/events/randomEvents";
import type {
  CharacterEventState,
  EventHistory,
  GameplayFlag,
} from "../data/events/types";
import { DialogueChoice } from "../data/dialogues";

type ScheduledEncounter = {
  characterName: string;
  location: string;
  eventId: string; // The random event ID to trigger
  label?: string; // Optional: "Coffee Date", "Gym Session", etc.
  day?: string; // explicit string to allow serialization
  hour?: number;
  activities?: string[];
};

export default function GamePage() {
  // States
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
  const [gameplayFlags, setGameplayFlags] = useState<Set<GameplayFlag>>(
    new Set()
  );

  // 🎲 Track active random event
  const [currentRandomEvent, setCurrentRandomEvent] =
    useState<RandomEvent | null>(null);

  // Characters lock status
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

  // ☕ Track scheduled encounters
  const [scheduledEncounters, setScheduledEncounters] = useState<
    ScheduledEncounter[]
  >([]);

  type GameState =
    | "mainMenu"
    | "nameInput"
    | "intro"
    | "playing"
    | "paused"
    | "dialogue";

  // Schedule a new encounter
  const scheduleEncounter = (encounter: ScheduledEncounter) => {
    setScheduledEncounters((prev) => {
      // Avoid duplicates
      const exists = prev.some(
        (e) =>
          e.characterName === encounter.characterName &&
          e.eventId === encounter.eventId
      );
      if (exists) return prev;

      console.log(
        `📅 Scheduled: ${encounter.label || "encounter"} with ${
          encounter.characterName
        } at ${encounter.location}${
          encounter.day ? ` on ${encounter.day} at ${encounter.hour}:00` : ""
        }`
      );
      return [...prev, encounter];
    });
  };

  // Handler specifically for dates
  const handleScheduleDate = (date: {
    characterName: string;
    location: string;
    day: DayOfWeek;
    hour: number;
    activities: string[];
    eventId: string;
    label: string;
  }) => {
    setScheduledEncounters((prev) => {
      console.log(
        `💕 Date scheduled: ${date.label} with ${date.characterName} on ${date.day} at ${date.hour}:00`
      );
      return [
        ...prev,
        {
          characterName: date.characterName,
          location: date.location,
          eventId: date.eventId,
          label: date.label,
          day: date.day,
          hour: date.hour,
          activities: date.activities,
        },
      ];
    });
  };

  // Cancel a specific encounter
  // const _cancelEncounter = (characterName: string, eventId: string) => {
  //   setScheduledEncounters((prev) =>
  //     prev.filter(
  //       (e) => !(e.characterName === characterName && e.eventId === eventId)
  //     )
  //   );
  // };

  // ✅ helpers
  const hasFlag = useCallback(
    (flag: GameplayFlag): boolean => gameplayFlags.has(flag),
    [gameplayFlags]
  );

  // ✅ Update the checkScheduledEncounters function to support day/hour + dates
  const checkScheduledEncounters = (location: string): boolean => {
    const encounter = scheduledEncounters.find((e) => {
      // Check location
      if (e.location !== location) return false;

      // If it's a date with specific day/hour, check those too
      if (e.day && e.hour !== undefined) {
        return e.day === (dayOfWeek as unknown as string) && e.hour === hour;
      }

      // Otherwise just match by location
      return true;
    });

    if (!encounter) {
      console.log(`ℹ️ No encounters at ${location}`);
      return false;
    }

    console.log(`✨ Triggering encounter: ${encounter.label || "Event"}`);

    // Remove from scheduled list
    setScheduledEncounters((prev) => prev.filter((e) => e !== encounter));

    // If it's a date with activities, handle it specially (simple bootstrap)
    if (encounter.activities && encounter.activities.length > 0) {
      console.log(`💕 Starting date with ${encounter.characterName}`);

      const girl = girls.find((g) => g.name === encounter.characterName);
      if (girl) {
        const characterImage = getCharacterImage(girl, currentLocation, hour);

        // Create a date start dialogue
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
            {
              speaker: null,
              text: "Your date begins...",
            },
          ],
        };

        // Kick off the date
        startDialogue(dateStartDialogue, characterImage, null);
      }

      return true;
    }

    // Handle regular character events first
    const event = randomEvents.find((e) => e.id === encounter.eventId);

    if (!event) {
      const characterEvents: GameCharacterEvent[] = getCharacterEvents(
        encounter.characterName
      ) as unknown as GameCharacterEvent[];
      const characterEvent = characterEvents.find(
        (e) => e.id === encounter.eventId
      );

      if (characterEvent) {
        console.log(
          `✨ Triggering scheduled character event: ${
            encounter.label || characterEvent.name
          }`
        );
        setCurrentRandomEvent(null);

        const characterImage = getCharacterImage(
          girls.find((g) => g.name === encounter.characterName)!,
          currentLocation,
          hour
        );
        startDialogue(characterEvent.dialogue, characterImage, null);

        if (characterEvent.rewards) {
          const updatedPlayer = { ...player };
          if (characterEvent.rewards.playerMoney) {
            updatedPlayer.money += characterEvent.rewards.playerMoney;
          }
          if (characterEvent.rewards.playerStats) {
            // Use stat manager for safe stat updates
            const updated = applyStatChanges(
              updatedPlayer,
              characterEvent.rewards.playerStats,
              STAT_LIMITS.player
            );
            Object.assign(updatedPlayer, updated);
          }
          setPlayer(updatedPlayer);
        }

        return true;
      }
    }

    if (event) {
      console.log(
        `✨ Triggering scheduled encounter: ${encounter.label || event.name}`
      );
      setCurrentRandomEvent(event);
      startDialogue(event.dialogue, "", null);
      if (event.rewards) applyRandomEventRewards(event.rewards);
      return true;
    } else {
      console.error(`❌ Event not found: ${encounter.eventId}`);
    }

    return false;
  };

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

  useEffect(() => {
    setCharacterUnlocks({
      Yumi: hasFlag("hasMetYumi"),
      Gwen: hasFlag("hasMetGwen"),
      Dawn: hasFlag("hasMetDawn"),
      Ruby: hasFlag("hasMetRuby"),
    });
  }, [gameplayFlags, hasFlag]);

  // 🎯 Create event manager (memoized)
  const eventManager = useMemo(() => {
    const manager = new CharacterEventManager();

    // Load all character events using the getCharacterEvents function
    const characterNames = ["Dawn", "Ruby", "Yumi", "Gwen", "Iris"];
    characterNames.forEach((name) => {
      const events = getCharacterEvents(
        name
      ) as unknown as GameCharacterEvent[];
      if (events && events.length > 0) {
        manager.addEvents(events);
      }
    });

    return manager;
  }, []); // Empty deps - events don't change

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
        const hasMetChar =
          girl.name === "Gwen" ? gameplayFlags.has("hasMetGwen") : false;
        const scheduledLocation = getScheduledLocation(
          girl.name,
          dayOfWeek,
          hour,
          hasMetChar
        );
        const override = girlStatsOverrides[girl.name];
        return {
          ...girl,
          location: scheduledLocation || girl.location,
          stats: override ? { ...girl.stats, ...override } : girl.stats,
        };
      });
  }, [dayOfWeek, hour, girlStatsOverrides, characterUnlocks, gameplayFlags]);

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

  //function to set a flag
  const setFlag = (flag: GameplayFlag) => {
    setGameplayFlags((prev) => new Set([...prev, flag]));
    console.log(`🚩 Flag set: ${flag}`);
  };

  // Helper function to check if a flag is set

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
      scheduledEncounters, // This now includes dates with activities
      gameplayFlags: Array.from(gameplayFlags),
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
        Yumi: false,
        Gwen: false,
        Dawn: false,
        Ruby: false,
      }
    );
    setScheduledEncounters(data.scheduledEncounters ?? []); // This loads dates too
    setGameplayFlags(new Set(data.gameplayFlags ?? []));
    setSelectedGirl(null);
    setGameState("playing");
  };

  // const resetGame = () => {
  //   setPlayer(defaultPlayerStats);
  //   setCurrentLocation("Bedroom");
  //   setHour(START_HOUR);
  //   setDayOfWeek(START_DAY);
  //   setSelectedGirl(null);
  //   setMetCharacters(new Set());
  //   setGirlStatsOverrides({});
  //   setCharacterEventStates({});
  //   setCharacterUnlocks({
  //     Yumi: false,
  //     Gwen: false,
  //     Dawn: false,
  //     Ruby: false,
  //   });
  //   setScheduledEncounters([]);
  //   localStorage.removeItem("datingSimSave");
  //   setHasSaveData(false);

  //   setGameState("intro");
  //   setCurrentDialogue(introDialogue);
  // };

  const newGame = () => {
    // If there's save data, confirm before proceeding
    if (hasSaveData) {
      if (
        !confirm(
          "Starting a new game will overwrite your saved progress. Continue?"
        )
      ) {
        return; // User cancelled
      }
    }

    // Clear save data but don't reset game state yet
    localStorage.removeItem("datingSimSave");
    setHasSaveData(false);

    // Go to name input screen
    setGameState("nameInput");
  };

  // dialogue helpers
  const startDialogue = (
    dialogue: Dialogue,
    characterImage: string = "",
    girlEffects: Partial<GirlStats> | null = null,
    characterName?: string
  ) => {
    setCurrentDialogue(dialogue);
    setDialogueCharacterImage(characterImage);
    setDialogueGirlEffects(girlEffects);
    setDialogueGirlName(characterName || "");
    setGameState("dialogue");

    if (characterImage) {
      const m = characterImage.match(/\/characters\/([^/]+)\//);
      if (m) setDialogueGirlName(m[1].charAt(0).toUpperCase() + m[1].slice(1));
    }

    setGameState("dialogue");
  };

  // src/app/page.tsx

  const endDialogue = (
    statChanges?: Partial<GirlStats>,
    chosenOption?: DialogueChoice
  ) => {
    // ☕ If dialogue option scheduled an encounter, queue it
    if (chosenOption?.scheduleEncounter) {
      scheduleEncounter(chosenOption.scheduleEncounter);
    }

    // ✨ Handle flags from dialogue choices
    if (chosenOption?.setFlags) {
      chosenOption.setFlags.forEach((flag) => {
        setFlag(flag);
        console.log(`🚩 Flag set from choice: ${flag}`);
      });
    }

    // ✨ Handle character unlocks from dialogue choices
    if (chosenOption?.unlockCharacters) {
      chosenOption.unlockCharacters.forEach((characterName) => {
        const name = characterName as keyof typeof characterUnlocks;
        if (!characterUnlocks[name]) {
          setCharacterUnlocks((prev) => ({ ...prev, [name]: true }));
          alert(`✨ ${characterName} is now available!`);
        }
      });
    }

    // Handle girl stat changes
    if (dialogueGirlName) {
      const girl = girls.find(
        (g) => g.name.toLowerCase() === dialogueGirlName.toLowerCase()
      );
      if (girl) {
        const currentOverride = girlStatsOverrides[dialogueGirlName] || {};
        const currentStats = { ...girl.stats, ...currentOverride };
        const combined = { ...dialogueGirlEffects, ...statChanges };

        // Use new stat manager to apply changes
        const newStats = applyStatChanges(
          currentStats,
          combined,
          STAT_LIMITS.girl
        );

        setGirlStatsOverrides((prev) => ({
          ...prev,
          [dialogueGirlName]: newStats,
        }));
      }
    }

    // Clean up dialogue state
    setCurrentDialogue(null);
    setDialogueCharacterImage("");
    setDialogueGirlEffects(null);
    setDialogueGirlName("");
    setSelectedGirl(null);
    setGameState("playing");
  };

  const endRandomEventDialogue = () => {
    // Spend time if the event has a timeCost
    if (currentRandomEvent?.timeCost) {
      spendTime(currentRandomEvent.timeCost);
    }

    setCurrentRandomEvent(null);
    setCurrentDialogue(null);
    setDialogueCharacterImage("");
    setDialogueGirlEffects(null);
    setDialogueGirlName("");
    setGameState("playing");
  };

  // ✅ Router for nextDialogueId coming from DialogueBox
  const goToDialogueByEventId = (id: string) => {
    // First, try to find in character dialogues
    let foundDialogue: Dialogue | null = null;
    let characterImage = "";

    // Search through all character dialogues
    for (const [characterName, dialogues] of Object.entries(
      characterDialogues
    )) {
      if (dialogues[id]) {
        foundDialogue = dialogues[id];
        // Get the character image for this dialogue
        const girl = girls.find((g) => g.name === characterName);
        if (girl) {
          characterImage = getCharacterImage(girl, currentLocation, hour);
        }
        console.log(`✅ Found dialogue '${id}' for character ${characterName}`);
        break;
      }
    }

    // If not found in character dialogues, try random events
    if (!foundDialogue) {
      const ev = randomEvents.find((e) => e.id === id);
      if (ev) {
        foundDialogue = ev.dialogue;
        setCurrentRandomEvent(ev);
        console.log(`✅ Found dialogue '${id}' in random events`);
      }
    }

    // If still not found, warn and return
    if (!foundDialogue) {
      console.warn(`❌ [Dialogue] nextDialogueId not found: ${id}`);
      return;
    }

    // Start the dialogue
    startDialogue(foundDialogue, characterImage, null);
  };

  // location change + random events
  const moveTo = (location: string) => {
    setCurrentLocation(location);
    setSelectedGirl(null);

    // ☕ Trigger pending scheduled encounters (incl. dates)
    if (checkScheduledEncounters(location)) {
      return;
    }

    // Unlock Gwen when entering Hallway after working
    if (
      location === "Hallway" &&
      hasFlag("firstTimeWorked") &&
      !characterUnlocks.Gwen
    ) {
      setCharacterUnlocks((prev) => ({ ...prev, Gwen: true }));
      console.log("🔓 Gwen unlocked!");

      // Show a simple notification
      setTimeout(() => {
        alert("You hear footsteps behind you in the hallway...");
      }, 100);

      // Don't return - let the location change complete normally
      // Gwen will appear in the character list after the state updates
    }

    // TODO: Ambient character events - method not available in CharacterEventManager
    // const ambientEvent = eventManager.checkAmbientCharacterEvents(
    //   location,
    //   hour,
    //   girls,
    //   player
    // );
    // if (ambientEvent) {
    //   handleAmbientEvent(ambientEvent);
    //   return;
    // }

    // random event roll
    const randomEvent = checkRandomEvent(location, hour, dayOfWeek, player);
    if (randomEvent) {
      console.log(`🎲 Random event: ${randomEvent.name}`);
      setCurrentRandomEvent(randomEvent);
      startDialogue(randomEvent.dialogue, "", null);
      if (randomEvent.rewards) applyRandomEventRewards(randomEvent.rewards);
    }
  };

  // Handle ambient character events - DISABLED (method not available in CharacterEventManager)
  /* 
  const handleAmbientEvent = (event: CharacterEvent) => {
    console.log(`✨ Ambient event triggered: ${event.name}`);

    // Find the character who triggered the event
    const characterName = event.dialogue.lines[0]?.speaker || "";
    const character = girls.find((g) => g.name === characterName);

    if (character) {
      const characterImage = getCharacterImage(
        character,
        currentLocation,
        hour
      );
      startDialogue(event.dialogue, characterImage, null, characterName);

      // Apply rewards if any
      const rewards = event.rewards;
      if (rewards) {
        if (rewards.playerMoney) {
          setPlayer((prev) => ({
            ...prev,
            money: prev.money + rewards.playerMoney!,
          }));
        }

        if (rewards.playerStats) {
          setPlayer((prev) => {
            const updated = applyStatChanges(
              prev,
              rewards.playerStats!,
              STAT_LIMITS.player
            );
            return updated;
          });
        }

        if (rewards.setFlags) {
          rewards.setFlags.forEach((flag) => setFlag(flag));
        }

        if (rewards.unlockCharacters) {
          rewards.unlockCharacters.forEach((name) => {
            const charName = name as keyof typeof characterUnlocks;
            setCharacterUnlocks((prev) => ({ ...prev, [charName]: true }));
          });
        }
      }
    } else {
      // If no specific character, just show the dialogue
      startDialogue(event.dialogue, "", null);
    }
  };
  */

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
      // Use stat manager for player stat changes
      const statUpdated = applyStatChanges(
        updated,
        rewards.playerStats,
        STAT_LIMITS.player
      );
      Object.assign(updated, statUpdated);
    }

    if (rewards.girlAffection) {
      Object.entries(rewards.girlAffection).forEach(([girlName, change]) => {
        const override = girlStatsOverrides[girlName] || {};
        const girl = girls.find((g) => g.name === girlName);
        if (!girl) return;

        const currentStats = { ...girl.stats, ...override };

        // Use stat manager for girl affection changes
        const newStats = applyStatChanges(
          currentStats,
          { affection: change },
          STAT_LIMITS.girl
        );

        setGirlStatsOverrides((prev) => ({
          ...prev,
          [girlName]: newStats,
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

      // Clear selected girl when day changes
      setSelectedGirl(null);

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
  //handler for name submission
  const handleNameSubmit = (playerName: string) => {
    // Reset everything to initial state
    setPlayer({ ...defaultPlayerStats, name: playerName });
    setCurrentLocation("Bedroom");
    setHour(START_HOUR);
    setDayOfWeek(START_DAY);
    setSelectedGirl(null);
    setMetCharacters(new Set());
    setGirlStatsOverrides({});
    setCharacterEventStates({});
    setCharacterUnlocks({
      Yumi: false,
      Gwen: false,
      Dawn: false,
      Ruby: false,
    });
    setScheduledEncounters([]);

    // Now start the intro
    setGameState("intro");
    setCurrentDialogue(introDialogue);
  };

  //pending Events tracker
  type PendingEvent = {
    characterName: string;
    eventId: string;
    location: string;
    priority: number;
  };
  const [, /*pendingEvents,*/ setPendingEvents] = useState<PendingEvent[]>([]);

  // Check what events are available but not yet triggered
  const checkPendingEvents = useCallback(() => {
    const pending: PendingEvent[] = [];

    girls.forEach((girl) => {
      const eventState = characterEventStates[girl.name] ?? {
        characterName: girl.name,
        eventHistory: [],
        lastInteractionTime: 0,
      };

      // Use new event manager to find triggered events
      const triggerable = eventManager.findCharacterEvent(girl.name, {
        girl,
        player,
        currentLocation: girl.location, // Check at girl's current location
        day: dayOfWeek,
        hour,
        currentTime: calculateGameTime(
          [...TIME_CONFIG.DAYS_OF_WEEK],
          dayOfWeek,
          hour
        ),
        completedEvents: eventState.eventHistory.map((h) => h.eventId) || [],
        eventHistory: eventState.eventHistory || [],
        flags: gameplayFlags,
      });

      // TODO: Location-based event filtering needs to be reimplemented
      // The new event system uses ConditionalRule which doesn't have requiredLocation
      // Location checking should be done through the context's currentLocation
      if (triggerable) {
        pending.push({
          characterName: girl.name,
          eventId: triggerable.id,
          location: girl.location, // Use girl's current location
          priority: triggerable.priority,
        });
      }
    });

    setPendingEvents(pending);
  }, [
    girls,
    player,
    dayOfWeek,
    hour,
    characterEventStates,
    eventManager,
    gameplayFlags,
  ]);

  // Run this periodically
  useEffect(() => {
    checkPendingEvents();
  }, [checkPendingEvents]);

  if (gameState == "nameInput") {
    return <NameInput onNameSubmit={handleNameSubmit} darkMode={darkMode} />;
  }

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
          characterImage={dialogueCharacterImage}
          characterName={dialogueGirlName}
          playerName={player.name}
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
          // midgroundImage={getCurrentLocationImage()}
          // midgroundOpacity={0.3}
          // midgroundBlend="normal"
          // midgroundFit="cover"
          currentLocation={currentLocation}
          currentHour={hour}
          currentDay={dayOfWeek}
          playerStats={player}
          girlStats={
            selectedGirl?.stats ||
            (dialogueGirlName
              ? girls.find((g) => g.name === dialogueGirlName)?.stats
              : undefined)
          }
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
            {isMobile ? (
              "💖 HotV"
            ) : (
              <span className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="Heart of the Valley"
                  width={50}
                  height={50}
                  priority
                />
                💖 Heart of the Valley
              </span>
            )}
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
        <div className="grid grid-cols-1 lg:[grid-template-columns:240px_minmax(0,1fr)_320px] gap-6">
          {/* Left Sidebar */}
          {!isMobile && (
            <div className="hidden lg:block">
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
          <div className="space-y-6 min-w-0">
            {/* Scene */}
            <div
              className={`rounded-2xl shadow-xl overflow-hidden border-4 w-full ${
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
                <Image
                  src={getCurrentLocationImage()}
                  alt={currentLocation}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const locationKey = currentLocation
                      .toLowerCase()
                      .replace(/\s+/g, "_")
                      .replace(/'/g, "");

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
                          <Image
                            src={imgPath}
                            alt={girl.name}
                            width={192}
                            height={288}
                            className={`w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 object-cover object-top rounded-3xl border-4 ${
                              selectedGirl?.name === girl.name
                                ? "border-pink-400 shadow-2xl shadow-pink-500/50"
                                : "border-white/80 shadow-2xl"
                            } transition-all ${
                              selectedGirl && selectedGirl.name !== girl.name
                                ? "brightness-75"
                                : ""
                            }`}
                            onError={() => {
                              const girlName = girl.name.toLowerCase();
                              return `/images/characters/${girlName}/casual/neutral.webp`;
                            }}
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

                {/* Nobody
                {presentGirls.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm px-4 md:px-8 py-3 md:py-4 rounded-2xl">
                      <p className="text-white text-lg md:text-xl text-center">
                        🏜️ Nobody is here right now...
                      </p>
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            {/* Available locations */}
            <div
              className={`flex flex-col gap-3 md:gap-4 rounded-2xl shadow-xl p-4 md:p-6 border-2  ${
                darkMode
                  ? "bg-gray-800 border-purple-700"
                  : "bg-white border-purple-100"
              } transition-colors duration-300`}
            >
              <h3
                className={`text-xl text-center md:text-2xl font-bold mb-3 md:mb-4 ${
                  darkMode ? "text-purple-300" : "text-purple-800"
                }`}
              >
                🗺️ Where to go?
              </h3>
              <div className="mt-4 overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {locationGraph[currentLocation]?.map((loc) => (
                    <LocationCard
                      key={loc.name}
                      location={loc}
                      onMove={moveTo}
                      girls={girls}
                      darkMode={darkMode}
                      scheduledEncounters={scheduledEncounters}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          {selectedGirl ? (
            <div className="hidden lg:block">
              <CharacterOverlay
                girl={selectedGirl}
                location={currentLocation}
                player={player}
                gameplayFlags={gameplayFlags}
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
                    lastInteractionTime: calculateGameTime(
                      [...TIME_CONFIG.DAYS_OF_WEEK],
                      dayOfWeek,
                      hour
                    ),
                  }
                }
                onEventTriggered={(eventId) => {
                  const name = selectedGirl.name;
                  const prevState = characterEventStates[name] ?? {
                    characterName: name,
                    eventHistory: [] as EventHistory[],
                    lastInteractionTime: 0,
                  };

                  const gameTime = calculateGameTime(
                    [...TIME_CONFIG.DAYS_OF_WEEK],
                    dayOfWeek,
                    hour
                  );
                  const lastTriggered = {
                    timestamp: gameTime,
                    metadata: { day: dayOfWeek, hour },
                  };

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
                darkMode={darkMode}
                onScheduleDate={handleScheduleDate}
                onSetFlag={setFlag} // 👈 add this
                onUnlockCharacter={(name) => {
                  // 👈 and this
                  setCharacterUnlocks((prev) => ({
                    ...prev,
                    [name]: true,
                  }));
                }}
              />
            </div>
          ) : (
            <div className={`${isMobile ? "hidden" : "block"}`}>
              <LocationActivities
                location={currentLocation}
                player={player}
                setPlayer={setPlayer}
                spendTime={spendTime}
                darkMode={darkMode}
                dayOfWeek={dayOfWeek}
                onUnlockCharacter={(name) => {
                  setCharacterUnlocks((prev) => ({ ...prev, [name]: true }));
                  // triggers for character unlocks
                  // if (name === "Ruby") {
                  //   // Small delay to let the unlock register
                  //   setTimeout(() => {
                  //     const firstMeeting = firstMeetingDialogues["Ruby"];
                  //     if (firstMeeting) {
                  //       const characterImage = getCharacterImage(
                  //         girls.find((g) => g.name === "Ruby")!,
                  //         currentLocation,
                  //         hour
                  //       );
                  //       startDialogue(firstMeeting, characterImage, null);
                  //     }
                  //   }, 100);
                  // }
                }}
                onSetFlag={setFlag}
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
          currentLocation={currentLocation}
          currentHour={hour}
          currentDay={dayOfWeek}
          playerStats={player}
          girlStats={
            selectedGirl?.stats ||
            (dialogueGirlName
              ? girls.find((g) => g.name === dialogueGirlName)?.stats
              : undefined)
          }
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
