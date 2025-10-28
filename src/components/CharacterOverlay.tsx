// src/components/CharacterOverlay.tsx - Updated with event system
import { Girl, GirlStats } from "../data/characters";
import { PlayerStats } from "../data/characters";
import { Interaction, interactionMenu } from "../data/interactions";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  characterDialogues,
  getDefaultDialogue,
  Dialogue,
} from "../data/dialogues/index";
import { DayOfWeek } from "@/data/gameConstants";
import { CharacterEventState, GameplayFlag } from "@/data/events/types";
import { findTriggeredEvent } from "@/lib/eventSystem";
import { getCharacterEvents } from "@/data/events";
// import { firstMeetingDialogues } from "../data/dialogues/index";
import  DatePlanner from "./DatePlanner";
import { DateLocation } from "@/data/dates/types";
import { useState } from "react";
import { getCharacterImage } from "@/lib/characterImages";
// import { get } from "http";


interface Props {
  girl: Girl;
  location: string;
  player: PlayerStats;
  gameplayFlags: Set<GameplayFlag>;
  setPlayer: Dispatch<SetStateAction<PlayerStats>>;
  spendTime: (amount: number) => void;
  onClose: () => void;
  onStartDialogue: (
    dialogue: Dialogue,
    characterImage: string,
    girlEffects?: Partial<GirlStats>
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
}

export default function CharacterOverlay({
  girl,
  location,
  player,
  setPlayer,
  spendTime,
  onClose,
  onStartDialogue,
  dayOfWeek,
  hour,
  eventState,
  onEventTriggered,
  darkMode,
  onScheduleDate,
  gameplayFlags,
}: Props) {
  const [showDatePlanner, setShowDatePlanner] = useState(false);
  // Check for triggered events when component mounts or dependencies change
  // Check for first meeting or triggered events
  //Date handler
  const handleScheduleDate = (
    dateLocation: DateLocation,
    day: DayOfWeek,
    dateHour: number,
    activities: string[]
  ) => {
    // Check if she accepts (random chance based on affection)
    const acceptanceChance = Math.min(
      95,
      50 + girl.stats.affection / 2 + girl.stats.trust / 4
    );
    const roll = Math.random() * 100;

    if (roll > acceptanceChance) {
      alert(
        `${girl.name} politely declines. Maybe try again when you're closer?`
      );
      setShowDatePlanner(false);
      return;
    }

    // She accepted! Create the date event
    const dateEvent = {
      characterName: girl.name,
      location: dateLocation,
      day: day,
      hour: dateHour,
      activities: activities,
      eventId: `date_${girl.name}_${dateLocation}_${Date.now()}`,
      label: `Date at ${dateLocation}`,
    };

    // Call parent's schedule function
    onScheduleDate(dateEvent);

    alert(
      `${girl.name} happily agrees! The date is set for ${day} at ${dateHour}:00!`
    );
    setShowDatePlanner(false);
    spendTime(1); // Planning takes time
  };
  
  useEffect(() => {
    // // ✨ CHECK FOR FIRST MEETING FIRST
    // if (
    //   !eventState.eventHistory.some(
    //     (h) => h.eventId === `${girl.name}_first_meeting`
    //   )
    // ) {
    //   const firstMeeting = firstMeetingDialogues[girl.name];
    //   if (firstMeeting) {
    //     console.log(`👋 First time meeting ${girl.name}!`);
    //     const characterImage = getCharacterImage(girl, location, hour);

    //     // Mark as met
    //     onEventTriggered(`${girl.name}_first_meeting`);

    //     // Start dialogue
    //     onStartDialogue(firstMeeting, characterImage, undefined);
    //     return; // Stop here, don't check other events
    //   }
    // }

    // Check for other triggered events
    const events = getCharacterEvents(girl.name);
    const triggeredEvent = findTriggeredEvent(
      events,
      girl,
      player,
      location,
      dayOfWeek,
      hour,
      eventState,
      gameplayFlags
    );

    if (triggeredEvent) {
      console.log(`🎉 Event triggered: ${triggeredEvent.name}`);

      const characterImage = getCharacterImage(girl, location, hour, getFacialExpression());
      onEventTriggered(triggeredEvent.id);
      onStartDialogue(triggeredEvent.dialogue, characterImage, undefined);

      if (triggeredEvent.rewards) {
        const updatedPlayer = { ...player };

        if (triggeredEvent.rewards.playerMoney) {
          updatedPlayer.money += triggeredEvent.rewards.playerMoney;
        }

        if (triggeredEvent.rewards.playerStats) {
          if (triggeredEvent.rewards.playerStats.intelligence) {
            updatedPlayer.intelligence +=
              triggeredEvent.rewards.playerStats.intelligence;
          }
          if (triggeredEvent.rewards.playerStats.fitness) {
            updatedPlayer.fitness += triggeredEvent.rewards.playerStats.fitness;
          }
          if (triggeredEvent.rewards.playerStats.style) {
            updatedPlayer.style += triggeredEvent.rewards.playerStats.style;
          }
        }

        setPlayer(updatedPlayer);
      }
    }
  }, []); // ✨ Only re-run when girl changes
  const interact = (action: Interaction) => {
    // ... rest of your existing interact function stays the same
    // Check requirements
    if (
      action.requiresItem &&
      !player.inventory.includes(action.requiresItem)
    ) {
      alert(`You need a ${action.requiresItem} for this action!`);
      return;
    }

    if (action.locationContext && action.locationContext !== location) {
      alert(`This action can only be done at ${action.locationContext}`);
      return;
    }

    // Check affection requirements for intimate actions
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
        alert(`${girl.name} pulls away. The timing doesn't seem right...`);
        const updatedStats = { ...player };
        updatedStats.mood = Math.max(0, updatedStats.mood - 15);
        setPlayer(updatedStats);
        return;
      }
    }

    // Check mood requirements for positive interactions
    if (
      girl.stats.mood < 30 &&
      (action.label === "Hug" || action.label === "Kiss")
    ) {
      alert(`${girl.name} doesn't seem in the mood for that right now...`);
      return;
    }

    // Apply stat effects
    const updatedStats = { ...player };
    Object.entries(action.statEffects || {}).forEach(([key, value]) => {
      const statKey = key as keyof PlayerStats;
      if (statKey !== "inventory" && typeof value === "number") {
        (updatedStats[statKey] as number) += value;
      }
    });
    setPlayer(updatedStats);
    spendTime(action.timeCost);

    // Get dialogue for this interaction
    const dialogue =
      characterDialogues[girl.name]?.[action.label] ||
      getDefaultDialogue(girl.name, action.label);
    const characterImage = getCharacterImage(girl, location, hour, getFacialExpression());

    // Show what stats will change
    if (action.girlEffects) {
      const changes = Object.entries(action.girlEffects)
        .filter(([, value]) => value !== 0)
        .map(([key, value]) => {
          const emoji =
            key === "affection"
              ? "💕"
              : key === "lust"
              ? "🔥"
              : key === "trust"
              ? "🤝"
              : key === "mood"
              ? "😊"
              : "💖";
          return `${emoji} ${value > 0 ? "+" : ""}${value}`;
        })
        .join(", ");

      console.log(`✨ ${action.label} with ${girl.name}: ${changes}`);
    }

    onStartDialogue(dialogue, characterImage, action.girlEffects);
  };

  // ... rest of your component (getActionIcon, getActionColor, getFacialExpression, etc.) stays the same

  const getActionIcon = (type: string) => {
    switch (type) {
      case "Chat":
        return "💬";
      case "Romance":
        return "❤️";
      case "Gift":
        return "🎁";
      case "Date":
        return "🌹";
      case "Context":
        return "✨";
      default:
        return "👋";
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

  const getFacialExpression = () => {
    const { affection, mood, love } = girl.stats;
    const totalPositive = affection + love;

    if (love >= 50 || totalPositive >= 80) return "love";
    if (affection >= 40 && mood >= 60) return "happy";
    if (mood < 30) return "sad";
    if (affection < 10) return "neutral";
    return "neutral";
  };

  const expression = getFacialExpression();

  return (
    <div
      className={`bg-gradient-to-br ${
        darkMode
          ? "from-gray-800 via-purple-900 to-gray-900"
          : "from-pink-100 via-purple-100 to-blue-100"
      } rounded-2xl shadow-xl p-6 border-4 ${
        darkMode ? "border-purple-700" : "border-purple-200"
      } sticky top-4 animate-slideUp`}
    >
      {" "}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all z-10 shadow-lg"
      >
        ✕
      </button>
      <div className="flex flex-col items-center mb-6">
        <div className="relative group mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
          <div className="relative w-50 h-60 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img
              src={`/images/characters/${girl.name.toLowerCase()}/casual/${expression}.webp`}
              alt={`${girl.name} - ${expression}`}
              onError={(e) => {
                e.currentTarget.src = `neutral.webp`;
                e.currentTarget.onerror = () => {
                  e.currentTarget.src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><circle cx="100" cy="100" r="100" fill="%23e879f9"/><circle cx="70" cy="80" r="10" fill="white"/><circle cx="130" cy="80" r="10" fill="white"/><path d="M 60 130 Q 100 150 140 130" stroke="white" stroke-width="5" fill="none"/></svg>';
                };
              }}
              className="w-full h-full object-cover"
              style={{
                objectPosition: "center 20%", // Show top portion (face)
                transform: "scale(2)", // Zoom in 1.8x
                transformOrigin: "center 0%", // Zoom from top
              }}
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-purple-500 mb-1">{girl.name}</h3>
        <p className="text-gray-500 italic mb-2 text-sm">
          &quot;{girl.personality}&quot;
        </p>

        <div className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold text-xs shadow-lg">
          {girl.relationship}
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 mb-4 space-y-2 shadow-md">
        <h4 className="font-bold text-purple-700 text-center mb-2 text-sm">
          Relationship
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between items-center px-2 py-1 bg-pink-50 rounded">
            <span className="font-semibold text-gray-700">💕 Affection</span>
            <span className="font-bold text-pink-600">
              {girl.stats.affection}
            </span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-red-50 rounded">
            <span className="font-semibold text-gray-700">🔥 Lust</span>
            <span className="font-bold text-red-600">{girl.stats.lust}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-yellow-50 rounded">
            <span className="font-semibold text-gray-700">😊 Mood</span>
            <span className="font-bold text-yellow-600">{girl.stats.mood}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded">
            <span className="font-semibold text-gray-700">🤝 Trust</span>
            <span className="font-bold text-blue-600">{girl.stats.trust}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded col-span-2">
            <span className="font-semibold text-gray-700">💖 Love</span>
            <span className="font-bold text-purple-600">{girl.stats.love}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h4
          className={`text-lg font-bold ${
            darkMode ? "text-purple-300" : "text-purple-800"
          } mb-3 text-center`}
        >
          {" "}
          💝 Actions
        </h4>
        <button
          onClick={() => setShowDatePlanner(true)}
          className="relative overflow-hidden group w-full bg-gradient-to-r from-red-400 to-pink-600 hover:from-red-500 hover:to-pink-700 shadow-md hover:shadow-lg transform hover:scale-102 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm"
        >
          <div className="flex items-center justify-between relative z-10">
            <span className="flex items-center gap-2">
              <span className="text-lg">💕</span>
              <span>Ask on Date</span>
            </span>
            <span className="text-xs opacity-75">Plan</span>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>

        {interactionMenu.map((action) => {
          const isDisabled = Boolean(
            (action.requiresItem &&
              !player.inventory.includes(action.requiresItem)) ||
              (action.locationContext && action.locationContext !== location)
          );

          return (
            <button
              key={action.label}
              onClick={() => interact(action)}
              disabled={isDisabled}
              className={`
                relative overflow-hidden group w-full
                ${
                  isDisabled
                    ? "bg-gray-300 cursor-not-allowed opacity-50"
                    : `bg-gradient-to-r ${getActionColor(
                        action.type
                      )} shadow-md hover:shadow-lg transform hover:scale-102`
                }
                text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm
              `}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="flex items-center gap-2">
                  <span className="text-lg">{getActionIcon(action.type)}</span>
                  <span>{action.label}</span>
                </span>
                <span className="text-xs opacity-75">{action.timeCost}h</span>
              </div>

              {!isDisabled && (
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 bg-white rounded-lg p-3 border-2 border-purple-200 shadow">
        <p className="text-xs text-gray-600 text-center">
          <span className="font-semibold text-purple-600">💡</span> Different
          actions affect {girl.name}&apos;s feelings toward you!
        </p>
      </div>
      {showDatePlanner && (
        <DatePlanner
          girl={girl}
          currentDay={dayOfWeek}
          currentHour={hour}
          playerMoney={player.money}
          onCancel={() => setShowDatePlanner(false)}
          onScheduleDate={handleScheduleDate}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
