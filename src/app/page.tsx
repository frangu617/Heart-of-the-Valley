"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useCallback } from "react";

// Components
import NameInput from "@/components/NameInput";
import StatsPanel from "../components/StatsPanel";
import LocationCard from "../components/LocationCard";
import CharacterOverlay from "../components/CharacterOverlay";
import LocationActivities, {
  type DailyWorkoutState,
} from "../components/LocationActivities";
import MainMenu from "../components/MainMenu";
import PauseMenu from "../components/PauseMenu";
import DialogueBox from "../components/DialogueBox";
import PhoneMenu from "../components/PhoneMenu";

// Lib
import { getScheduledLocation } from "../lib/schedule";
import { getCharacterImage, getLocationBackground } from "../lib/images";
import { checkRandomEvent } from "../lib/randomEventSystem";
import { getCharacterEvents } from "../data/events/chapter1/index";
import { checkEventConditions, isEventOnCooldown } from "../lib/eventSystem";
import { calculateGameTime, getTimeOfDay } from "../lib/time";
import { applyCharacterEventRewards } from "../lib/rewards";
import { applyPlayerStatDelta } from "../lib/playerStats";

// Data / Types

import { locationDescriptions, locationGraph } from "../data/locations";
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
  introDialogue,
  characterDialogues,
  // getDefaultDialogue,
  type Dialogue,
  // firstMeetingDialogues,
} from "../data/dialogues/index";

import type { RandomEvent } from "../data/events/chapter1/randomEvents";
import { randomEvents } from "../data/events/chapter1/randomEvents";
import type {
  CharacterEvent,
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

type QuestItem = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  characterName?: string;
  priority: number;
};

const clampValue = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const getMetFlagForGirl = (girlName: string): GameplayFlag | null => {
  switch (girlName.toLowerCase()) {
    case "iris":
      return "hasMetIris";
    case "dawn":
      return "hasMetDawn";
    case "gwen":
      return "hasMetGwen";
    case "yumi":
      return "hasMetYumi";
    case "ruby":
      return "hasMetRuby";
    default:
      return null;
  }
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
  const darkMode = true;

  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [dialogueCharacterImage, setDialogueCharacterImage] =
    useState<string>("");
  const [dialogueGirlEffects, setDialogueGirlEffects] =
    useState<Partial<GirlStats> | null>(null);
  const [dialogueGirlName, setDialogueGirlName] = useState<string>("");

  const [metCharacters, setMetCharacters] = useState<Set<string>>(new Set());
  const [showPhone, setShowPhone] = useState<boolean>(false);
  const [showWhereMenu, setShowWhereMenu] = useState<boolean>(false);
  const [showActivitiesMenu, setShowActivitiesMenu] =
    useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDialogueClosing, setIsDialogueClosing] = useState<boolean>(false);
  const [isLocationTransitioning, setIsLocationTransitioning] =
    useState<boolean>(false);
  const transitionDurationMs = 200;

  const [girlStatsOverrides, setGirlStatsOverrides] = useState<
    Record<string, Partial<GirlStats>>
  >({});
  const [characterEventStates, setCharacterEventStates] = useState<
    Record<string, CharacterEventState>
  >({});
  const [gameplayFlags, setGameplayFlags] = useState<Set<GameplayFlag>>(
    new Set()
  );
  const [dailyWorkoutState, setDailyWorkoutState] =
    useState<DailyWorkoutState>({
      day: START_DAY,
      total: 0,
      withRuby: 0,
      withoutRuby: 0,
    });
  const [rubyWorkoutTotal, setRubyWorkoutTotal] = useState<number>(0);

  const getProgressionCount = useCallback(
    (girlName: string) => {
      const state = characterEventStates[girlName];
      const historyCount = state?.eventHistory?.length ?? 0;
      const metFlag = getMetFlagForGirl(girlName);
      const hasMet = metFlag ? gameplayFlags.has(metFlag) : false;
      return Math.max(historyCount, hasMet ? 1 : 0);
    },
    [characterEventStates, gameplayFlags]
  );

  const getRelationshipCaps = useCallback(
    (girlName: string) => {
      const progressionCount = getProgressionCount(girlName);
      const affectionCap = clampValue(progressionCount * 5, 0, 100);
      const lustCap = clampValue(Math.floor(affectionCap * 1.25), 0, 100);
      return { affectionCap, lustCap };
    },
    [getProgressionCount]
  );

  const clampGirlStatsToCaps = useCallback(
    (girlName: string, stats: GirlStats) => {
      const { affectionCap, lustCap } = getRelationshipCaps(girlName);
      return {
        ...stats,
        affection: clampValue(stats.affection ?? 0, 0, affectionCap),
        lust: clampValue(stats.lust ?? 0, 0, lustCap),
      };
    },
    [getRelationshipCaps]
  );

  const applyGirlStatDelta = useCallback(
    (girlName: string, delta: Partial<GirlStats>) => {
      const baseGirl = baseGirls.find((girl) => girl.name === girlName);
      if (!baseGirl) return;

      setGirlStatsOverrides((prev) => {
        const currentStats = {
          ...baseGirl.stats,
          ...(prev[girlName] ?? {}),
        };
        const nextStats: GirlStats = { ...currentStats };
        Object.entries(delta).forEach(([key, value]) => {
          if (typeof value !== "number") return;
          const statKey = key as keyof GirlStats;
          nextStats[statKey] = (currentStats[statKey] ?? 0) + value;
        });
        const capped = clampGirlStatsToCaps(girlName, nextStats);
        return { ...prev, [girlName]: capped };
      });
    },
    [clampGirlStatsToCaps]
  );

  const logWorkout = useCallback(
    (withRuby: boolean) => {
      setDailyWorkoutState((prev) => {
        const isToday = prev.day === dayOfWeek;
        const base = isToday
          ? prev
          : { day: dayOfWeek, total: 0, withRuby: 0, withoutRuby: 0 };
        return {
          day: dayOfWeek,
          total: base.total + 1,
          withRuby: base.withRuby + (withRuby ? 1 : 0),
          withoutRuby: base.withoutRuby + (withRuby ? 0 : 1),
        };
      });
      if (withRuby) {
        setRubyWorkoutTotal((prev) => prev + 1);
      }
    },
    [dayOfWeek]
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
  const [interactionHistory, setInteractionHistory] = useState<
    Record<string, Set<string>>
  >({});

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
      const characterEvents = getCharacterEvents(encounter.characterName);
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

        const updatedPlayer = applyCharacterEventRewards(
          player,
          characterEvent.rewards,
          {
            onSetFlag: setFlag,
            onUnlockCharacter: (characterName) => {
              const name = characterName as keyof typeof characterUnlocks;
              setCharacterUnlocks((prev) =>
                prev[name] ? prev : { ...prev, [name]: true }
              );
            },
          }
        );
        if (updatedPlayer !== player) {
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
      applyRandomEventRewards(event.rewards);
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

    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  }, []);

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
    setCharacterUnlocks((prev) => {
      const next = {
        Yumi: gameplayFlags.has("hasMetYumi"),
        Gwen: gameplayFlags.has("hasMetGwen"),
        Dawn: gameplayFlags.has("hasMetDawn"),
        Ruby: gameplayFlags.has("hasMetRuby"),
      };

      // Avoid unnecessary re-renders
      if (
        prev.Yumi === next.Yumi &&
        prev.Gwen === next.Gwen &&
        prev.Dawn === next.Dawn &&
        prev.Ruby === next.Ruby
      ) {
        return prev;
      }
      return next;
    });
  }, [gameplayFlags]);
  // girls with schedules + overrides
  const girls = useMemo(() => {
    return baseGirls
      .filter((girl) => {
        // Iris is always available
        if (girl.name === "Iris") return true;

        // Hide Ruby if the flag is set
        if (girl.name === "Ruby" && gameplayFlags.has("rubyIsHiding")) {
          return false;
        }

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
        const mergedStats = override ? { ...girl.stats, ...override } : girl.stats;
        return {
          ...girl,
          location: scheduledLocation || girl.location,
          stats: clampGirlStatsToCaps(girl.name, mergedStats),
        };
      });
  }, [
    dayOfWeek,
    hour,
    girlStatsOverrides,
    characterUnlocks,
    clampGirlStatsToCaps,
    gameplayFlags,
  ]);

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
  const setFlag = useCallback((flag: GameplayFlag) => {
    setGameplayFlags((prev) => new Set([...prev, flag]));
    console.log(`🚩 Flag set: ${flag}`);
  }, []);

  const unlockCharacter = useCallback((characterName: string) => {
    const name = characterName as keyof typeof characterUnlocks;
    setCharacterUnlocks((prev) =>
      prev[name] ? prev : { ...prev, [name]: true }
    );
  }, []);

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
      dailyWorkoutState,
      rubyWorkoutTotal,
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
    const loadedDay = data.dayOfWeek ?? START_DAY;
    setDayOfWeek(loadedDay);
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
    if (data.dailyWorkoutState && data.dailyWorkoutState.day === loadedDay) {
      setDailyWorkoutState(data.dailyWorkoutState);
    } else {
      setDailyWorkoutState({
        day: loadedDay,
        total: 0,
        withRuby: 0,
        withoutRuby: 0,
      });
    }
    setRubyWorkoutTotal(data.rubyWorkoutTotal || 0);
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
  const startDialogue = useCallback((
    dialogue: Dialogue,
    characterImage: string = "",
    girlEffects: Partial<GirlStats> | null = null,
    characterName?: string
  ) => {
    setIsDialogueClosing(false);
    setCurrentDialogue(dialogue);
    setDialogueCharacterImage(characterImage);
    setDialogueGirlEffects(girlEffects);
    setDialogueGirlName(characterName || "");
    setGameState("dialogue");

    if (characterImage) {
      const m = characterImage.match(/\/characters\/([^/]+)\//);
      if (m) setDialogueGirlName(m[1].charAt(0).toUpperCase() + m[1].slice(1));
    }
  }, []);

  const closeDialogue = (afterClose: () => void) => {
    if (isDialogueClosing) return;
    setIsDialogueClosing(true);
    setTimeout(() => {
      afterClose();
      setIsDialogueClosing(false);
    }, transitionDurationMs);
  };

  const endDialogue = (
    statChanges?: Partial<GirlStats>,
    chosenOption?: DialogueChoice
  ) => {
    closeDialogue(() => {
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

          const newStats: Partial<GirlStats> = { ...currentStats };
          Object.entries(combined).forEach(([key, value]) => {
            if (typeof value === "number") {
              const k = key as keyof GirlStats;
              const cur = (currentStats[k] as number) ?? 0;
              newStats[k] = clampValue(cur + value, 0, 100);
            }
          });
          const { affectionCap, lustCap } = getRelationshipCaps(girl.name);
          newStats.affection = clampValue(newStats.affection ?? 0, 0, affectionCap);
          newStats.lust = clampValue(newStats.lust ?? 0, 0, lustCap);

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
    });
  };

  const endRandomEventDialogue = () => {
    const finalize = () => {
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
    closeDialogue(finalize);
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

  const onEventTriggered = useCallback((eventId: string, girlName?: string) => {
    const name = girlName ?? selectedGirl?.name;
    if (!name) return;
    const prevState = characterEventStates[name] ?? {
      characterName: name,
      eventHistory: [] as EventHistory[],
      lastInteractionTime: 0,
    };

    const gameTime = calculateGameTime(dayOfWeek, hour);
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
  }, [selectedGirl, characterEventStates, dayOfWeek, hour]);

  const triggerSpecificEvent = useCallback(
    (characterName: string, eventId: string, locationOverride?: string) => {
      const events = getCharacterEvents(characterName);
      const triggerable = events.find((event) => event.id === eventId);
      if (!triggerable) {
        console.error(`❌ Event not found: ${eventId}`);
        return;
      }

      const baseGirl = baseGirls.find((g) => g.name === characterName);
      if (!baseGirl) {
        console.error(`❌ Character not found: ${characterName}`);
        return;
      }

      const scheduledLocation = getScheduledLocation(
        characterName,
        dayOfWeek,
        hour
      );
      const override = girlStatsOverrides[characterName];
      const mergedStats = override
        ? { ...baseGirl.stats, ...override }
        : baseGirl.stats;
      const girl = {
        ...baseGirl,
        location: scheduledLocation || baseGirl.location,
        stats: clampGirlStatsToCaps(characterName, mergedStats),
      };

      const eventState = characterEventStates[characterName] ?? {
        characterName,
        eventHistory: [],
        lastInteractionTime: 0,
      };
      const completedEvents =
        eventState.eventHistory
          .filter((h) => h.timesTriggered > 0)
          .map((h) => h.eventId) || [];

      const locationToCheck = locationOverride ?? currentLocation;

      if (
        !checkEventConditions(
          triggerable.conditions,
          girl,
          player,
          locationToCheck,
          dayOfWeek,
          hour,
          completedEvents,
          gameplayFlags
        )
      ) {
        return;
      }

      setCurrentRandomEvent(null);
      const characterImage = getCharacterImage(girl, locationToCheck, hour);
      onEventTriggered(triggerable.id, characterName);
      startDialogue(triggerable.dialogue, characterImage, null, characterName);

      setPlayer((prev) =>
        applyCharacterEventRewards(prev, triggerable.rewards, {
          onSetFlag: setFlag,
          onUnlockCharacter: (name) => {
            const key = name as keyof typeof characterUnlocks;
            setCharacterUnlocks((prevState) =>
              prevState[key] ? prevState : { ...prevState, [key]: true }
            );
          },
        })
      );
    },
    [
      characterEventStates,
      clampGirlStatsToCaps,
      currentLocation,
      dayOfWeek,
      gameplayFlags,
      girlStatsOverrides,
      hour,
      onEventTriggered,
      player,
      setCharacterUnlocks,
      setCurrentRandomEvent,
      setFlag,
      setPlayer,
      startDialogue,
    ]
  );

  const triggerLocationEvent = (location: string) => {
    const availableEvents = pendingEvents
      .filter((event) => event.location === location)
      .sort((a, b) => b.priority - a.priority);

    if (availableEvents.length === 0) return false;

    const nextEvent = availableEvents[0];
    const events = getCharacterEvents(nextEvent.characterName);
    const triggerable = events.find((event) => event.id === nextEvent.eventId);
    if (!triggerable) return false;

    const girl = girls.find((g) => g.name === nextEvent.characterName);
    if (!girl) return false;

    setCurrentRandomEvent(null);
    const characterImage = getCharacterImage(girl, location, hour);
    onEventTriggered(triggerable.id, girl.name);
    startDialogue(triggerable.dialogue, characterImage, null, girl.name);

    const updatedPlayer = applyCharacterEventRewards(
      player,
      triggerable.rewards,
      {
        onSetFlag: setFlag,
        onUnlockCharacter: (characterName) => {
          const name = characterName as keyof typeof characterUnlocks;
          setCharacterUnlocks((prev) =>
            prev[name] ? prev : { ...prev, [name]: true }
          );
        },
      }
    );
    if (updatedPlayer !== player) {
      setPlayer(updatedPlayer);
    }

    return true;
  };

  // location change + random events
  
  // location change + random events
  const moveTo = (location: string) => {
    if (isLocationTransitioning || location === currentLocation) {
      return;
    }

    setIsLocationTransitioning(true);

    setTimeout(() => {
      const finishTransition = () => setIsLocationTransitioning(false);

      if (
        location !== currentLocation &&
        triggerLocationEvent(currentLocation)
      ) {
        finishTransition();
        return;
      }

      setCurrentLocation(location);
      setSelectedGirl(null);

      if (
        location === "Hallway" &&
        !gameplayFlags.has("hasMetGwen") &&
        gameplayFlags.has("hasMetIris") &&
        gameplayFlags.has("hasMetYumi") &&
        gameplayFlags.has("hasMetRuby")
      ) {
        triggerSpecificEvent("Gwen", "gwen_hallway_intro_event", location);
        finishTransition();
        return;
      }
      // Trigger pending scheduled encounters (incl. dates)
      if (checkScheduledEncounters(location)) {
        finishTransition();
        return;
      }

      if (triggerLocationEvent(location)) {
        finishTransition();
        return;
      }

      // // Unlock Gwen when entering Hallway after 5 PM
      // console.log(
      //   `dY"? Moved to: ${location}, Hour: ${hour}, Gwen unlocked: ${characterUnlocks.Gwen}`
      // );
      // if (location === "Hallway" && hour >= 17 && !characterUnlocks.Gwen) {
      //   setCharacterUnlocks((prev) => ({ ...prev, Gwen: true }));

      //   // Trigger Gwen's first meeting
      //   const firstMeeting = firstMeetingDialogues["Gwen"];
      //   if (firstMeeting) {
      //     const characterImage = getCharacterImage(
      //       girls.find((g) => g.name === "Gwen")!,
      //       currentLocation,
      //       hour
      //     );
      //     setMetCharacters(new Set([...metCharacters, "Gwen"]));
      //     startDialogue(firstMeeting, characterImage, null);
      //     return;
      //   }
      // }

      // random event roll
      const randomEvent = checkRandomEvent(location, hour, dayOfWeek, player);
      if (randomEvent) {
        console.log(`Random event: ${randomEvent.name}`);
        setCurrentRandomEvent(randomEvent);
        startDialogue(randomEvent.dialogue, "", null);
        applyRandomEventRewards(randomEvent.rewards);
      }

      finishTransition();
    }, transitionDurationMs);
  };


  // rewards
  const applyRandomEventRewards = (rewards: RandomEvent["rewards"]) => {
    if (!rewards) return;
    let updated = { ...player };

    if (typeof rewards.money === "number") {
      updated.money += rewards.money;
      console.log(`💰 Money: ${rewards.money > 0 ? "+" : ""}${rewards.money}`);
    }

    if (rewards.item) {
      updated.inventory = [...updated.inventory, rewards.item];
      console.log(`📦 Added ${rewards.item} to inventory`);
    }

    if (rewards.playerStats) {
      updated = applyPlayerStatDelta(updated, rewards.playerStats);
    }

    if (rewards.girlAffection) {
      Object.entries(rewards.girlAffection).forEach(([girlName, change]) => {
        const override = girlStatsOverrides[girlName] || {};
        const girl = girls.find((g) => g.name === girlName);
        if (!girl) return;

        const currentStats = { ...girl.stats, ...override };
        const newAffection = (currentStats.affection ?? 0) + change;
        const cappedStats = clampGirlStatsToCaps(girlName, {
          ...currentStats,
          affection: newAffection,
        });
        setGirlStatsOverrides((prev) => ({
          ...prev,
          [girlName]: cappedStats,
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
      setInteractionHistory({});
      setDailyWorkoutState({
        day: nextDay,
        total: 0,
        withRuby: 0,
        withoutRuby: 0,
      });

      alert(`A new day begins! It's ${nextDay} morning.`);
    } else {
      setHour(newHour);
    }
  };

  const getCurrentLocationImage = () =>
    getLocationBackground(currentLocation, hour);
  const timeOfDay = getTimeOfDay(hour);
  const presentGirls = girls.filter((g) => g.location === currentLocation);
  const availableLocations = useMemo(() => {
    const options = locationGraph[currentLocation] ?? [];
    return options.filter((loc) => {
      const isNightLife = ["Bar", "Nightclub", "Strip Club"].includes(loc.name);
      const isDaytimeOnly = ["Cafe", "Gym", "Mall", "Car Store"].includes(
        loc.name
      );
      const isNightTime = hour >= 21;

      if (!isNightTime && isNightLife) {
        return false;
      }
      if (isNightTime && isDaytimeOnly) {
        return false;
      }

      const requiresCar = loc.name === "Beach" || loc.name === "Mountains";
      if (requiresCar && !gameplayFlags.has("hasCar")) {
        return false;
      }

      const irisApartmentLocations = [
        "Iris' Living Room",
        "Iris' Bedroom",
        "Iris' Bathroom",
        "Iris' Kitchen",
        "Dawn's bedroom",
      ];
      if (
        irisApartmentLocations.includes(loc.name) &&
        !gameplayFlags.has("irisApartmentUnlocked")
      ) {
        return false;
      }

      return true;
    });
  }, [currentLocation, gameplayFlags, hour]);

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
    setInteractionHistory({});
    setDailyWorkoutState({
      day: START_DAY,
      total: 0,
      withRuby: 0,
      withoutRuby: 0,
    });
    setRubyWorkoutTotal(0);

    // Now start the intro
    setGameState("intro");
    setCurrentDialogue(introDialogue);
  };

  //pending Events tracker
  const [pendingEvents, setPendingEvents] = useState<
    {
      characterName: string;
      eventId: string;
      location: string;
      priority: number;
    }[]
  >([]);

  // Check what events are available but not yet triggered
  const checkPendingEvents = useCallback(() => {
    const pending: typeof pendingEvents = [];

    girls.forEach((girl) => {
      const events = getCharacterEvents(girl.name);
      const eventState = characterEventStates[girl.name] ?? {
        characterName: girl.name,
        eventHistory: [],
        lastInteractionTime: 0,
      };
      const currentGameTime = calculateGameTime(dayOfWeek, hour);
      const completedEvents =
        eventState.eventHistory
          .filter((h) => h.timesTriggered > 0)
          .map((h) => h.eventId) || [];
      const storyEventIds = new Set(
        events.filter((event) => !event.repeatable).map((event) => event.id)
      );
      const storyHistory =
        eventState.eventHistory.filter((h) => storyEventIds.has(h.eventId)) ||
        [];
      const completedStoryCount = storyHistory.filter(
        (h) => h.timesTriggered > 0
      ).length;
      const storyTriggeredToday = storyHistory.some(
        (h) => h.lastTriggered.day === dayOfWeek
      );
      const sortedEvents = [...events].sort((a, b) => b.priority - a.priority);
      let triggerable: CharacterEvent | null = null;

      for (const event of sortedEvents) {
        if (!event.repeatable && completedEvents.includes(event.id)) {
          continue;
        }
        if (!event.repeatable) {
          if (storyTriggeredToday) {
            continue;
          }
          if (completedStoryCount > 0) {
            const requiredAffection = completedStoryCount * 5;
            if (girl.stats.affection < requiredAffection) {
              continue;
            }
          }
        }

        const history = eventState.eventHistory.find(
          (h) => h.eventId === event.id
        );
        if (isEventOnCooldown(event, history, currentGameTime)) {
          continue;
        }

        const locationToCheck =
          event.conditions.requiredLocation ?? currentLocation;
        if (
          checkEventConditions(
            event.conditions,
            girl,
            player,
            locationToCheck,
            dayOfWeek,
            hour,
            completedEvents,
            gameplayFlags
          )
        ) {
          triggerable = event;
          break;
        }
      }

      if (triggerable?.conditions.requiredLocation) {
        pending.push({
          characterName: girl.name,
          eventId: triggerable.id,
          location: triggerable.conditions.requiredLocation,
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
    gameplayFlags,
    currentLocation,
  ]);

  // Run this periodically
  useEffect(() => {
    checkPendingEvents();
  }, [checkPendingEvents]);

  const eventReadyByGirl = useMemo(
    () =>
      new Set(
        pendingEvents
          .filter((e) => e.location === currentLocation)
          .map((e) => e.characterName)
      ),
    [pendingEvents, currentLocation]
  );

  const questItems = useMemo<QuestItem[]>(() => {
    const items: QuestItem[] = [];

    pendingEvents.forEach((pending) => {
      const events = getCharacterEvents(pending.characterName);
      const event = events.find((candidate) => candidate.id === pending.eventId);
      if (!event) return;

      items.push({
        id: pending.eventId,
        title: event.quest?.title ?? event.name,
        description: event.quest?.description,
        location: pending.location ?? event.conditions.requiredLocation,
        characterName: pending.characterName,
        priority: pending.priority,
      });
    });

    return items.sort((a, b) => b.priority - a.priority);
  }, [pendingEvents]);

  const hasInteractedToday = useCallback(
    (girlName: string, actionLabel: string) => {
      const key = `${dayOfWeek}:${girlName}`;
      const set = interactionHistory[key];
      return set ? set.has(actionLabel) : false;
    },
    [dayOfWeek, interactionHistory]
  );

  const recordInteraction = useCallback(
    (girlName: string, actionLabel: string) => {
      const key = `${dayOfWeek}:${girlName}`;
      setInteractionHistory((prev) => {
        const current = prev[key] ? new Set(prev[key]) : new Set<string>();
        current.add(actionLabel);
        return { ...prev, [key]: current };
      });
    },
    [dayOfWeek]
  );

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
          isClosing={isDialogueClosing}
          characterImage={dialogueCharacterImage}
          characterName={dialogueGirlName}
          playerName={player.name}
          onSkip={
            gameState === "intro"
              ? () => {
                  closeDialogue(() => {
                    setGameState("playing");
                    setCurrentDialogue(null);
                    setDialogueCharacterImage("");
                    setDialogueGirlEffects(null);
                    setDialogueGirlName("");
                    setSelectedGirl(null);
                  });
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
        {isMobile ? (
          <>
            <div className="container mx-auto px-4 flex justify-center items-center">
              <span className="sr-only">Heart of the Valley</span>
              <div className="flex gap-2 md:gap-3 items-center">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowWhereMenu((prev) => !prev)}
                    className="bg-white/30 hover:bg-white/40 ring-2 ring-white/60 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
                    aria-haspopup="menu"
                    aria-expanded={showWhereMenu}
                    aria-label={`Where to. Current location: ${currentLocation}`}
                    title="Where to"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 21s-6-4.4-6-10a6 6 0 1 1 12 0c0 5.6-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                    <svg
                      viewBox="0 0 20 20"
                      className={`h-4 w-4 transition-transform ${
                        showWhereMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 7l5 5 5-5" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPhone(true)}
                  className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
                    isMobile ? "animate-pulse" : ""
                  }`}
                  aria-label="Open phone"
                  title="Open phone"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                    <path d="M11 18h2" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setGameState("paused")}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center"
                  aria-label="Open menu"
                  title="Open menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            {showWhereMenu && (
              <div className="container mx-auto px-4 pb-4">
                <div
                  className={`relative rounded-2xl shadow-xl p-3 md:p-4 border-2 ${
                    darkMode
                      ? "bg-gray-800 border-purple-700"
                      : "bg-white border-purple-100"
                  } transition-colors duration-300`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/60 pointer-events-none transition-opacity duration-200 z-10 ${
                      isLocationTransitioning ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="flex items-center justify-between mb-3">
                    <h2
                      className={`text-sm font-semibold ${
                        darkMode ? "text-purple-200" : "text-purple-800"
                      }`}
                    >
                      Where to
                    </h2>
                    <span className="text-xs opacity-80">
                      Current: {currentLocation}
                    </span>
                  </div>
                  {availableLocations.length === 0 ? (
                    <div className="text-sm opacity-80">No nearby locations.</div>
                  ) : (
                    <div className="max-h-[70vh] overflow-y-auto">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {availableLocations.map((loc) => (
                          <LocationCard
                            key={loc.name}
                            location={loc}
                            onMove={(name) => {
                              setShowWhereMenu(false);
                              moveTo(name);
                            }}
                            girls={girls}
                            darkMode={darkMode}
                            scheduledEncounters={scheduledEncounters}
                            pendingEvents={pendingEvents}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl md:text-4xl font-bold">
              <span className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="Heart of the Valley"
                  width={50}
                  height={50}
                />
                dY&apos;- Heart of the Valley
              </span>
            </h1>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowPhone(true)}
                className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  isMobile ? "animate-pulse" : ""
                }`}
                title="Open phone"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                  <path d="M11 18h2" />
                </svg>
                <span className="hidden sm:inline">Phone</span>
              </button>
              <button
                onClick={() => setGameState("paused")}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
                <span className="hidden md:inline">Menu</span>
              </button>
            </div>
          </div>
        )}
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
              className={`relative rounded-2xl shadow-xl overflow-hidden border-4 w-full ${
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
                    timeOfDay
                  ] || locationDescriptions[currentLocation]?.default}
                </p>
              </div>

              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-purple-100 to-white overflow-hidden">
                {/* Background image with safe fallbacks */}
                <Image
                  src={getCurrentLocationImage()}
                  alt={currentLocation}
                  layout="fill"
                  objectFit="cover"
                />

                {/* Atmosphere overlay */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
                    timeOfDay === "morning"
                      ? "bg-gradient-to-b from-orange-300/30 via-transparent to-transparent"
                      : timeOfDay === "afternoon"
                      ? "bg-gradient-to-b from-yellow-200/20 via-transparent to-transparent"
                      : timeOfDay === "evening"
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
                        timeOfDay
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
                        {eventReadyByGirl.has(girl.name) && (
                          <div className="absolute -top-2 -right-2 z-30">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-300 text-yellow-900 font-bold border-2 border-yellow-500 shadow">
                              ?
                            </span>
                          </div>
                        )}
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
              <div
                className={`absolute inset-0 bg-black/60 pointer-events-none transition-opacity duration-200 z-30 ${
                  isLocationTransitioning ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {isMobile && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowActivitiesMenu((prev) => !prev)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 shadow-md transition-colors ${
                    darkMode
                      ? "bg-gray-800 border-purple-700 text-purple-200"
                      : "bg-white border-purple-200 text-purple-800"
                  }`}
                  aria-expanded={showActivitiesMenu}
                  aria-label={`Activities for ${currentLocation}`}
                >
                  <span className="flex items-center gap-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l1.8 5.5H19l-4.3 3.1L16.5 16 12 12.7 7.5 16l1.8-5.4L5 7.5h5.2L12 2z" />
                    </svg>
                    <span className="text-sm font-semibold">Activities</span>
                  </span>
                  <span className="flex items-center gap-2 text-xs opacity-80">
                    <span>{currentLocation}</span>
                    <svg
                      viewBox="0 0 20 20"
                      className={`h-4 w-4 transition-transform ${
                        showActivitiesMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 7l5 5 5-5" />
                    </svg>
                  </span>
                </button>
                {showActivitiesMenu && (
                  <LocationActivities
                    location={currentLocation}
                    player={player}
                    setPlayer={setPlayer}
                    spendTime={spendTime}
                    darkMode={darkMode}
                    dayOfWeek={dayOfWeek}
                    hour={hour}
                    gameplayFlags={gameplayFlags}
                    onTriggerEvent={triggerSpecificEvent}
                    onSetFlag={setFlag}
                    dailyWorkoutState={dailyWorkoutState}
                    onLogWorkout={logWorkout}
                    onAdjustGirlStats={applyGirlStatDelta}
                  />
                )}
              </div>
            )}

            {/* Available locations */}
            {!isMobile && (
              <div
                className={`relative flex flex-col gap-3 md:gap-4 rounded-2xl shadow-xl p-4 md:p-6 border-2  ${
                  darkMode
                    ? "bg-gray-800 border-purple-700"
                    : "bg-white border-purple-100"
                } transition-colors duration-300`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-black/60 pointer-events-none transition-opacity duration-200 z-10 ${
                    isLocationTransitioning ? "opacity-100" : "opacity-0"
                  }`}
                />
                <h3
                  className={`text-xl text-center md:text-2xl font-bold mb-3 md:mb-4 ${
                    darkMode ? "text-purple-300" : "text-purple-800"
                  }`}
                >
                  Where to go?
                </h3>
                <div className="mt-4 overflow-x-auto [-webkit-overflow-scrolling:touch]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {availableLocations.map((loc) => (
                      <LocationCard
                        key={loc.name}
                        location={loc}
                        onMove={moveTo}
                        girls={girls}
                        darkMode={darkMode}
                        scheduledEncounters={scheduledEncounters}
                        pendingEvents={pendingEvents}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

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
                lastInteractionTime: calculateGameTime(dayOfWeek, hour),
              }
            }
                            onEventTriggered={onEventTriggered}                darkMode={darkMode}
                onScheduleDate={handleScheduleDate}
                hasInteractedToday={hasInteractedToday}
                onInteractionLogged={recordInteraction}
                onSetFlag={setFlag}
                onUnlockCharacter={unlockCharacter}
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
                hour={hour}
                gameplayFlags={gameplayFlags}
                onTriggerEvent={triggerSpecificEvent}
                onSetFlag={setFlag}
                dailyWorkoutState={dailyWorkoutState}
                onLogWorkout={logWorkout}
                onAdjustGirlStats={applyGirlStatDelta}
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
          isClosing={isDialogueClosing}
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
          quests={questItems}
        />
      )}
    </div>
  );
}
