import Image from "next/image";
import { Location } from "../data/locations";
import { Girl } from "../data/characters";
import { getLocationImagePath } from "../lib/images";
import type { GameplayFlag } from "../data/events/types";

interface ScheduledEncounter {
  characterName: string;
  location: string;
  eventId: string;
  label?: string;
  day?: string;
  hour?: number;
  activities?: string[];
}

interface Props {
  location: Location;
  onMove: (name: string) => void;
  girls: Girl[];
  gameplayFlags?: Set<GameplayFlag>;
  darkMode?: boolean;
  scheduledEncounters?: ScheduledEncounter[]; // ✨ NEW
  pendingEvents?: {
    characterName: string;
    eventId: string;
    location: string;
    priority: number;
    label?: string;
    day?: string;
    hour?: number;
    activities?: string[];
  }[];
}

const metFlagByGirlName: Partial<Record<string, GameplayFlag>> = {
  Iris: "hasMetIris",
  Dawn: "hasMetDawn",
  Gwen: "hasMetGwen",
  Yumi: "hasMetYumi",
  Ruby: "hasMetRuby",
};

const hasMetGirl = (gameplayFlags: Set<GameplayFlag>, girlName: string) => {
  const metFlag = metFlagByGirlName[girlName];
  return metFlag ? gameplayFlags.has(metFlag) : true;
};

const shouldMaskText = (text: string, gameplayFlags: Set<GameplayFlag>) => {
  const lowerText = text.toLowerCase();
  return Object.entries(metFlagByGirlName).some(
    ([girlName, metFlag]) =>
      !!metFlag &&
      lowerText.includes(girlName.toLowerCase()) &&
      !gameplayFlags.has(metFlag),
  );
};

export default function LocationCard({
  location,
  onMove,
  girls,
  gameplayFlags = new Set<GameplayFlag>(),
  darkMode = true,
  scheduledEncounters = [],
  pendingEvents = []
}: Props) {
  // Find which girls are at this location
  const girlsHere = girls.filter((girl) => girl.location === location.name);

  // ✨ NEW: Check if there's a scheduled encounter at this location
  const pendingEncounter = scheduledEncounters.find(
    (e) => e.location === location.name
  );

  const pendingEvent = pendingEvents.find((e) => e.location === location.name);
  const displayLocationName = shouldMaskText(location.name, gameplayFlags)
    ? "????"
    : location.name;
  const getDisplayGirlName = (girlName: string) =>
    hasMetGirl(gameplayFlags, girlName) ? girlName : "????";
  const displayEncounterName = pendingEncounter
    ? getDisplayGirlName(pendingEncounter.characterName)
    : "";

  return (
    <div
      onClick={() => onMove(location.name)} // ✨ MOVED HERE
      className={`group flex flex-col gap-2 rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-purple-500"
          : "bg-white border-gray-200 hover:border-purple-400"
      } ${
        pendingEncounter
          ? "ring-4 ring-pink-400 ring-opacity-50 animate-pulse"
          : pendingEvent
          ? "ring-4 ring-purple-400 ring-opacity-50"
          : ""
      }`}
    >
      <div
        className={`relative h-32 overflow-hidden ${
          darkMode
            ? "bg-gradient-to-b from-gray-700 to-gray-800"
            : "bg-gradient-to-b from-gray-100 to-white"
        }`}
      >
        <Image
          src={getLocationImagePath(location.name, "afternoon")}
          alt={displayLocationName}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-300"
        />
        {(location.cost > 0 || location.time > 0) && (
          <div className="absolute top-2 right-2 flex gap-1">
            {location.cost > 0 && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                ${location.cost}
              </span>
            )}
            {location.time > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                {location.time}h
              </span>
            )}
          </div>
        )}

        {/* Indicators stack */}
        {(pendingEncounter || pendingEvent || girlsHere.length > 0) && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {pendingEncounter && (
              <>
                <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1 animate-bounce">
                  <span>dY&apos;?</span>
                  <span>{pendingEncounter.label || "Date"}</span>
                </div>
                {pendingEncounter.day && pendingEncounter.hour !== undefined && (
                  <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full text-center">
                    {pendingEncounter.day} {pendingEncounter.hour}:00
                  </div>
                )}
              </>
            )}
            {pendingEvent && (
              <div className="bg-yellow-300 text-yellow-900 text-xs w-6 h-6 rounded-full font-bold shadow-lg flex items-center justify-center animate-pulse border border-yellow-500">
                <span>!</span>
              </div>
            )}
            {girlsHere.length > 0 && (
              <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg flex items-center gap-1 animate-pulse">
                <span>👥</span>
                <span>{girlsHere.length}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className={`font-bold mb-2 text-center ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {displayLocationName}
        </h3>

        {/* Show who you're meeting */}
        {pendingEncounter && (
          <div className="mb-2 text-center">
            <p className="text-xs font-semibold text-pink-600 dark:text-pink-400">
              {pendingEncounter.day && pendingEncounter.hour !== undefined
                ? `Date with ${displayEncounterName}`
                : `Meeting ${displayEncounterName}`}
            </p>
            {pendingEncounter.activities &&
              pendingEncounter.activities.length > 0 && (
                <p className="text-xs opacity-75 mt-1">
                  {pendingEncounter.activities.length} activities planned
                </p>
              )}
          </div>
        )}

        {/* Show who's there */}
        {girlsHere.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1 justify-center">
            {girlsHere.map((girl) => (
              <span
                key={girl.name}
                className={`text-xs px-2 py-1 rounded-full border ${
                  darkMode
                    ? "bg-pink-900/50 text-pink-300 border-pink-700"
                    : "bg-pink-100 text-pink-700 border-pink-300"
                }`}
              >
                {getDisplayGirlName(girl.name)}
              </span>
            ))}
          </div>
        )}

        {/* Visual button - no onClick needed since card handles it */}
        <div
          className={`w-full font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center ${
            pendingEncounter
              ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          }`}
        >
          {pendingEncounter ? `Go to ${pendingEncounter.label} →` : "Go →"}
        </div>
      </div>
    </div>
  );
}
