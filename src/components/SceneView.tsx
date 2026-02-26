import Image from "@/components/FallbackImage";
import { useEffect, useMemo, useState } from "react";
import { getCharacterImage } from "../lib/images";
import type { Girl } from "../data/characters";
import { getSceneCharacterObjectPosition } from "@/lib/portraitFraming";
import { TESTING_LOCATION_NAME } from "@/data/locations";

const toCasualFallbackImage = (imagePath: string) =>
  imagePath.replace(
    /\/(home|gym|university|beach|city|casual|date|work|nun)\//,
    "/casual/",
  );

type Props = {
  darkMode: boolean;
  currentLocation: string;
  timeOfDay: string;
  locationDescriptions: Record<string, Record<string, string> | undefined>;
  getCurrentLocationImage: () => string;
  presentGirls: Girl[];
  eventReadyByGirl: Set<string>;
  selectedGirl: Girl | null;
  onSelectGirl: (girl: Girl) => void;
  hour: number;
  isLocationTransitioning: boolean;
  characterImageLocation?: string;
};

export default function SceneView({
  darkMode,
  currentLocation,
  timeOfDay,
  locationDescriptions,
  getCurrentLocationImage,
  presentGirls,
  eventReadyByGirl,
  selectedGirl,
  onSelectGirl,
  hour,
  isLocationTransitioning,
  characterImageLocation,
}: Props) {
  const [missingTestRoomGirls, setMissingTestRoomGirls] = useState<Set<string>>(
    new Set(),
  );
  const [girlsUsingCasualFallback, setGirlsUsingCasualFallback] = useState<
    Set<string>
  >(new Set());
  const isTestingRoom = currentLocation === TESTING_LOCATION_NAME;
  const resolvedCharacterImageLocation = characterImageLocation ?? currentLocation;

  useEffect(() => {
    setGirlsUsingCasualFallback(new Set());
  }, [resolvedCharacterImageLocation, hour]);

  useEffect(() => {
    if (!isTestingRoom) {
      setMissingTestRoomGirls(new Set());
      return;
    }
    // Reset missing list when the preview outfit context/time changes.
    setMissingTestRoomGirls(new Set());
  }, [isTestingRoom, resolvedCharacterImageLocation, hour]);

  const visibleGirls = useMemo(
    () =>
      isTestingRoom
        ? presentGirls.filter((girl) => !missingTestRoomGirls.has(girl.name))
        : presentGirls,
    [isTestingRoom, missingTestRoomGirls, presentGirls],
  );

  return (
    <div
      className={`relative rounded-2xl shadow-xl overflow-hidden border-4 w-full ${
        darkMode ? "bg-gray-800 border-purple-700" : "bg-white border-purple-200"
      } transition-colors duration-300`}
    >
      {/* Mobile title/desc */}
      <div className="block md:hidden px-3 py-3">
        <h2
          className={`text-lg font-bold mb-1 ${
            darkMode ? "text-purple-300" : "text-purple-800"
          }`}
        >
          {currentLocation}
        </h2>
        <p
          className={`text-xs italic ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {locationDescriptions[currentLocation]?.[timeOfDay] ||
            locationDescriptions[currentLocation]?.default}
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
              {currentLocation}
            </h2>
            <p className="text-xs md:text-sm text-white/90 italic">
              {locationDescriptions[currentLocation]?.[timeOfDay] ||
                locationDescriptions[currentLocation]?.default}
            </p>
          </div>
        </div>

        {/* Characters */}
        <div className="absolute inset-0 flex items-end justify-around px-4 md:px-8 pb-8 md:pb-4">
          {visibleGirls.map((girl, index) => {
            const baseImgPath = getCharacterImage(
              girl,
              resolvedCharacterImageLocation,
              hour,
            );
            const fallbackImgPath = toCasualFallbackImage(baseImgPath);
            const isUsingFallback = girlsUsingCasualFallback.has(girl.name);
            const imgPath = isUsingFallback ? fallbackImgPath : baseImgPath;
            return (
              <button
                key={girl.name}
                onClick={() => onSelectGirl(girl)}
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
                    className={`w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 object-cover rounded-3xl border-4 ${
                      selectedGirl?.name === girl.name
                        ? "border-pink-400 shadow-2xl shadow-pink-500/50"
                        : "border-white/80 shadow-2xl"
                    } transition-all ${
                      selectedGirl && selectedGirl.name !== girl.name
                        ? "brightness-75"
                        : ""
                    }`}
                    style={{
                      objectPosition: getSceneCharacterObjectPosition(girl.name),
                    }}
                    onError={() => {
                      if (!isUsingFallback && fallbackImgPath !== baseImgPath) {
                        console.warn(
                          `[SceneView] Missing character image for ${girl.name}: ${baseImgPath}. Falling back to ${fallbackImgPath}.`,
                        );
                        setGirlsUsingCasualFallback((prev) => {
                          if (prev.has(girl.name)) return prev;
                          const next = new Set(prev);
                          next.add(girl.name);
                          return next;
                        });
                        return;
                      }
                      console.warn(
                        `[SceneView] Missing fallback character image for ${girl.name}: ${imgPath}.`,
                      );
                      if (!isTestingRoom) return;
                      setMissingTestRoomGirls((prev) => {
                        if (prev.has(girl.name)) return prev;
                        const next = new Set(prev);
                        next.add(girl.name);
                        return next;
                      });
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
      </div>
      <div
        className={`absolute inset-0 bg-black/60 pointer-events-none transition-opacity duration-200 z-30 ${
          isLocationTransitioning ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
