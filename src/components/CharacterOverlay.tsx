// src/components/CharacterOverlay.tsx

"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { Girl, GirlStats, PlayerStats } from "@/data/characters";
import { Interaction, interactionMenu } from "@/data/interactions";
import {
  characterDialogues,
  getDefaultDialogue,
  type Dialogue,
} from "@/data/dialogues";
import { DayOfWeek } from "@/data/gameConstants";
import { CharacterEventState, GameplayFlag } from "@/data/events/types";
import { getCharacterEvents } from "@/data/events";
// import DatePlanner from "./DatePlanner";
// import { DateLocation } from "@/data/dates/types";

import {
  CharacterEventManager,
  calculateGameTime,
  type CharacterEvent as GameCharacterEvent,
} from "@/lib/game/characterEventSystem";
import { TIME_CONFIG } from "@/config/gameConfig";
import { getCharacterImage } from "@/lib/characterImages";

interface Props {
  girl: Girl;
  location: string;
  player: PlayerStats;
  gameplayFlags: Set<GameplayFlag>;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerStats>>;
  spendTime: (amount: number) => void;
  onClose: () => void;
  onStartDialogue: (
    dialogue: Dialogue,
    characterImage: string,
    girlEffects?: Partial<GirlStats> | null,
    characterName?: string
  ) => void;
  dayOfWeek: DayOfWeek;
  hour: number;
  eventState: CharacterEventState;
  onEventTriggered: (eventId: string) => void;
  darkMode?: boolean;
  onScheduleDate: (date: {
    characterName: string;
    location: string;
    day: DayOfWeek;
    hour: number;
    activities: string[];
    eventId: string;
    label: string;
  }) => void;
  onSetFlag?: (flag: GameplayFlag) => void;
  onUnlockCharacter?: (characterName: string) => void;
}

export default function CharacterOverlay({
  girl,
  location,
  player,
  gameplayFlags,
  setPlayer,
  spendTime,
  onClose,
  onStartDialogue,
  dayOfWeek,
  hour,
  eventState,
  onEventTriggered,
  darkMode,
  // onScheduleDate,
  onSetFlag,
  onUnlockCharacter,
}: Props) {
  const [, /*showDatePlanner*/ setShowDatePlanner] = useState(false);

  // Per-girl event manager using the new system
  const eventManager = useMemo(() => {
    const manager = new CharacterEventManager();
    const events = getCharacterEvents(girl.name) as GameCharacterEvent[];
    if (events && events.length > 0) {
      manager.addEvents(events);
    }
    return manager;
  }, [girl.name]);

  const { affection = 0, mood = 0, love = 0 } = girl.stats || {};

  const getFacialExpression = useCallback((): string => {
    const totalPositive = affection + love;
    if (love >= 50 || totalPositive >= 80) return "love";
    if (affection >= 40 && mood >= 60) return "happy";
    if (mood < 30) return "sad";
    if (affection < 10) return "neutral";
    return "neutral";
  }, [affection, love, mood]);

  const expression = getFacialExpression();

  useEffect(() => {
    setPortraitSrc(getCharacterImage(girl, location, hour, expression));
  }, [girl, location, hour, getFacialExpression, expression]);

  useEffect(() => {
    const context = {
      girl,
      player,
      currentLocation: location,
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
    };

    const triggeredEvent = eventManager.findCharacterEvent(girl.name, context);

    if (!triggeredEvent) return;

    // prevent infinite loop: skip if already recorded
    if (eventState.eventHistory.some((h) => h.eventId === triggeredEvent.id)) {
      return;
    }

    console.log(
      `🎉 Character event triggered for ${girl.name}: ${triggeredEvent.id}`
    );

    const eventImage = getCharacterImage(
      girl,
      location,
      hour,
      getFacialExpression()
    );

    onEventTriggered(triggeredEvent.id);
    onStartDialogue(triggeredEvent.dialogue, eventImage, undefined, girl.name);

    if (triggeredEvent.rewards) {
      const updatedPlayer: PlayerStats = { ...player };

      if (triggeredEvent.rewards.playerMoney) {
        updatedPlayer.money += triggeredEvent.rewards.playerMoney;
      }

      if (triggeredEvent.rewards.playerStats) {
        const stats = triggeredEvent.rewards.playerStats;
        if (stats.intelligence)
          updatedPlayer.intelligence += stats.intelligence;
        if (stats.fitness) updatedPlayer.fitness += stats.fitness;
        if (stats.style) updatedPlayer.style += stats.style;
      }

      setPlayer(updatedPlayer);

      if (triggeredEvent.rewards.setFlags) {
        triggeredEvent.rewards.setFlags.forEach((flag) => {
          onSetFlag?.(flag);
          console.log(`🚩 Flag set: ${flag}`);
        });
      }

      if (triggeredEvent.rewards.unlockCharacters) {
        triggeredEvent.rewards.unlockCharacters.forEach((name) => {
          onUnlockCharacter?.(name);
          console.log(`🔓 ${name} unlocked!`);
        });
      }
    }
  }, [
    girl,
    player,
    location,
    dayOfWeek,
    hour,
    eventState.eventHistory,
    gameplayFlags,
    eventManager,
    onEventTriggered,
    onStartDialogue,
    setPlayer,
    onSetFlag,
    onUnlockCharacter,
    getFacialExpression,
  ]);
  // Helper to pick Iris/etc facial expression

  const characterImage = getCharacterImage(girl, location, hour, expression);
  const [portraitSrc, setPortraitSrc] = useState(characterImage);

  // Date planner handler
  // const _handleScheduleDate = (
  //   dateLocation: DateLocation,
  //   dateDay: DayOfWeek,
  //   dateHour: number,
  //   activities: string[]
  // ) => {
  //   const acceptanceChance = Math.min(
  //     95,
  //     50 + girl.stats.affection / 2 + girl.stats.trust / 4
  //   );
  //   const roll = Math.random() * 100;

  //   if (roll > acceptanceChance) {
  //     alert(
  //       `${girl.name} politely declines.\nMaybe try again when you're closer?`
  //     );
  //     setShowDatePlanner(false);
  //     return;
  //   }

  //   const dateEvent = {
  //     characterName: girl.name,
  //     location: dateLocation,
  //     day: dateDay,
  //     hour: dateHour,
  //     activities,
  //     eventId: `date_${girl.name}_${dateLocation}_${Date.now()}`,
  //     label: `Date at ${dateLocation}`,
  //   };

  //   onScheduleDate(dateEvent);
  //   alert(
  //     `${girl.name} happily agrees! The date is set for ${dateDay} at ${dateHour}:00!`
  //   );
  //   setShowDatePlanner(false);
  //   spendTime(1); // planning time cost
  // };

  // Main interaction handler – now also drives story events
  const interact = (action: Interaction) => {
    // 1) For normal "Chat", check story events via new CharacterEventManager
    if (action.type === "Chat") {
      const context = {
        girl,
        player,
        currentLocation: location,
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
      };

      const triggeredEvent = eventManager.findCharacterEvent(
        girl.name,
        context
      );

      if (triggeredEvent) {
        console.log(
          `🎉 Character event triggered for ${girl.name}: ${triggeredEvent.id}`
        );

        const eventImage = getCharacterImage(
          girl,
          location,
          hour,
          getFacialExpression()
        );

        onEventTriggered(triggeredEvent.id);
        onStartDialogue(
          triggeredEvent.dialogue,
          eventImage,
          undefined,
          girl.name
        );

        // Apply rewards if any
        if (triggeredEvent.rewards) {
          const updatedPlayer: PlayerStats = { ...player };

          if (triggeredEvent.rewards.playerMoney) {
            updatedPlayer.money += triggeredEvent.rewards.playerMoney;
          }

          if (triggeredEvent.rewards.playerStats) {
            const stats = triggeredEvent.rewards.playerStats;
            if (stats.intelligence) {
              updatedPlayer.intelligence += stats.intelligence;
            }
            if (stats.fitness) {
              updatedPlayer.fitness += stats.fitness;
            }
            if (stats.style) {
              updatedPlayer.style += stats.style;
            }
          }

          setPlayer(updatedPlayer);

          if (triggeredEvent.rewards.setFlags) {
            triggeredEvent.rewards.setFlags.forEach((flag) => {
              onSetFlag?.(flag);
              console.log(`🚩 Flag set: ${flag}`);
            });
          }

          if (triggeredEvent.rewards.unlockCharacters) {
            triggeredEvent.rewards.unlockCharacters.forEach((name) => {
              onUnlockCharacter?.(name);
              console.log(`🔓 ${name} unlocked!`);
            });
          }
        }

        // Stop here – don't also run generic interaction logic
        return;
      }
    }

    // 2) Fallback: normal interaction logic (hug/kiss/chat/etc.)

    // Item requirement
    if (
      action.requiresItem &&
      !player.inventory.includes(action.requiresItem)
    ) {
      alert(`You need a ${action.requiresItem} for this action!`);
      return;
    }

    // Location requirement
    if (action.locationContext && action.locationContext !== location) {
      alert(`This action can only be done at ${action.locationContext}.`);
      return;
    }

    // Affection gates
    if (action.label === "Hug") {
      if (girl.stats.affection < 20) {
        alert(`${girl.name} doesn't seem comfortable with that right now...`);
        const updatedStats = { ...player };
        updatedStats.mood = Math.max(0, updatedStats.mood - 10);
        setPlayer(updatedStats);
        return;
      }
    }

    if (action.label === "Kiss") {
      if (girl.stats.affection < 40 || girl.stats.mood < 50) {
        alert(`${girl.name} pulls away.\nThe timing doesn't seem right...`);
        const updatedStats = { ...player };
        updatedStats.mood = Math.max(0, updatedStats.mood - 15);
        setPlayer(updatedStats);
        return;
      }
    }

    // Mood requirement
    if (
      girl.stats.mood < 30 &&
      (action.label === "Hug" || action.label === "Kiss")
    ) {
      alert(`${girl.name} doesn't seem in the mood for that right now...`);
      return;
    }

    // Apply player stat effects
    const updatedStats: PlayerStats = { ...player };
    Object.entries(action.statEffects || {}).forEach(([key, value]) => {
      const statKey = key as keyof PlayerStats;
      if (statKey !== "inventory" && typeof value === "number") {
        (updatedStats[statKey] as number) += value;
      }
    });
    setPlayer(updatedStats);

    // Spend time
    spendTime(action.timeCost);

    // Dialogue for the interaction
    const dialogue =
      characterDialogues[girl.name]?.[action.label] ||
      getDefaultDialogue(girl.name, action.label);

    const interactionImage = getCharacterImage(
      girl,
      location,
      hour,
      getFacialExpression()
    );

    // Log girl stat changes for debugging
    if (action.girlEffects) {
      const changes = Object.entries(action.girlEffects)
        .filter(([, value]) => value !== 0 && value !== undefined)
        .map(([key, value]) => {
          const v = value as number;
          const emoji =
            key === "affection"
              ? "💕"
              : key === "lust"
              ? "🔥"
              : key === "trust"
              ? "🤝"
              : key === "mood"
              ? "😊"
              : "✨";
          return `${emoji} ${v > 0 ? "+" : ""}${v}`;
        })
        .join(", ");

      if (changes) {
        console.log(`✨ ${action.label} with ${girl.name}: ${changes}`);
      }
    }

    onStartDialogue(
      dialogue,
      interactionImage,
      action.girlEffects ?? null,
      girl.name
    );
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "Chat":
        return "💬";
      case "Romance":
        return "❤️";
      case "Gift":
        return "🎁";
      case "Date":
        return "☕";
      case "Context":
        return "✨";
      default:
        return "";
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case "Chat":
        return "from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700";
      case "Romance":
        return "from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700";
      case "Gift":
        return "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700";
      case "Date":
        return "from-red-400 to-red-600 hover:from-red-500 hover:to-red-700";
      case "Context":
        return "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700";
      default:
        return "from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700";
    }
  };

  return (
    <aside className="h-full">
      <div
        className={`relative h-full rounded-2xl shadow-xl border-2 p-4 flex flex-col gap-4 ${
          darkMode
            ? "bg-gray-900 border-purple-700 text-purple-100"
            : "bg-white border-purple-200 text-gray-900"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl leading-none px-2 py-1 rounded-full bg-black/20 text-white hover:bg-black/40"
          aria-label="Close"
        >
          ×
        </button>

        {/* Character image */}
        <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-8 00 shadow-inner relative">
          <Image
            src={portraitSrc}
            alt={girl.name}
            fill
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            onError={() => {
              const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300">` +
                `<rect fill="#e5e7eb" width="200" height="300"/>` +
                `<text x="50%" y="50%" font-size="20" text-anchor="middle" fill="#4b5563">No Image</text>` +
                `</svg>`;
              setPortraitSrc(`data:image/svg+xml,${encodeURIComponent(svg)}`);
            }}
            // If your images are not under /public or are remote, set next.config images.domains or use unoptimized
            // unoptimized
          />
        </div>

        {/* Info */}
        <div>
          <h3 className="text-xl font-bold mb-1">{girl.name}</h3>
          <p className="text-sm italic mb-1">{girl.personality}</p>
          {girl.relationship && (
            <p className="text-xs opacity-80 mb-2">{girl.relationship}</p>
          )}
        </div>

        {/* Relationship stats */}
        <div>
          <h4 className="text-sm font-semibold mb-1">Relationship</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>Affection: {girl.stats.affection}</div>
            <div>Lust: {girl.stats.lust}</div>
            <div>Mood: {girl.stats.mood}</div>
            <div>Trust: {girl.stats.trust}</div>
            <div>Love: {girl.stats.love}</div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Actions</h4>

          {/* Date planner button */}
          <button
            onClick={() => setShowDatePlanner(true)}
            className="relative overflow-hidden group w-full bg-gradient-to-r from-red-400 to-pink-600 hover:from-red-500 hover:to-pink-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm mb-2"
          >
            <span className="mr-2">📅</span>
            Ask on Date (Plan)
          </button>

          <div className="flex flex-col gap-2">
            {interactionMenu.map((action) => {
              const isDisabled = Boolean(
                (action.requiresItem &&
                  !player.inventory.includes(action.requiresItem)) ||
                  (action.locationContext &&
                    action.locationContext !== location)
              );

              return (
                <button
                  key={action.label}
                  onClick={() => !isDisabled && interact(action)}
                  disabled={isDisabled}
                  className={`relative overflow-hidden group w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm ${
                    isDisabled
                      ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50"
                      : `bg-gradient-to-r ${getActionColor(
                          action.type
                        )} shadow-md hover:shadow-lg transform hover:scale-[1.02]`
                  }`}
                >
                  <span className="mr-2">{getActionIcon(action.type)}</span>
                  {action.label}
                  <span className="ml-auto text-xs opacity-80">
                    {action.timeCost}h
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[11px] opacity-80">
            Different actions affect {girl.name}&apos;s feelings toward you!
          </p>
        </div>

        {/* DEBUG PANEL: seen events & flags */}
        <div
          className={`mt-2 text-[11px] rounded-lg border p-2 space-y-1 ${
            darkMode
              ? "bg-gray-900/80 border-pink-500/40 text-pink-200"
              : "bg-pink-50 border-pink-300 text-pink-900"
          }`}
        >
          <div className="font-semibold">
            DEBUG – Events & Flags ({girl.name})
          </div>

          <div>
            <span className="font-semibold">Seen events:</span>{" "}
            {eventState.eventHistory.length === 0 ? (
              <span>none</span>
            ) : (
              <ul className="list-disc list-inside">
                {eventState.eventHistory.map((h) => (
                  <li key={h.eventId}>
                    {h.eventId}
                    {typeof h.timesTriggered === "number" &&
                      h.timesTriggered > 1 &&
                      ` (x${h.timesTriggered})`}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <span className="font-semibold">Active flags:</span>{" "}
            {gameplayFlags.size === 0 ? (
              <span>none</span>
            ) : (
              <ul className="list-disc list-inside">
                {Array.from(gameplayFlags).map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Date planner modal */}
        {/* {showDatePlanner && (
          <DatePlanner
            girl={girl}
            onClose={() => setShowDatePlanner(false)}
            onScheduleDate={handleScheduleDate}
            darkMode={darkMode}
          />
        )} */}
      </div>
    </aside>
  );
}
