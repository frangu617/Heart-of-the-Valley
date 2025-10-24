"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useGameStore } from "@/state/gameStore";
import GoalsPanel from "../ui/GoalsPanel";
import PhoneMenu from "@/components/PhoneMenu";
import CharacterOverlay from "@/components/CharacterOverlay";

import { locationGraph } from "@/data/locations";
import {
  getLocationBackground,
  getAtmosphereOverlay,
} from "@/lib/locationImages";
import { travel } from "@/lib/travel";

import type { LocationKey } from "@/types/game";
import type { Girl, PlayerStats as CharPlayerStats } from "@/data/characters";
import {
  girls as ALL_GIRLS,
  defaultPlayerStats as defaultCharPlayer,
} from "@/data/characters";
import type { DayOfWeek } from "@/data/gameConstants";
import { DAYS_OF_WEEK } from "@/data/gameConstants";
import { getCharacterLocation } from "@/data/characterSchedules";
import type { CharacterEventState, EventHistory } from "@/data/events/types";

export default function ExplorationScene() {
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [activeGirl, setActiveGirl] = useState<Girl | null>(null);
  const [eventStateByGirl, setEventStateByGirl] = useState<
    Record<string, CharacterEventState>
  >({});
  const [charPlayer, setCharPlayer] =
    useState<CharPlayerStats>(defaultCharPlayer);

  const gameState = useGameStore((s) => s.gameState);
  const setGameState = useGameStore((s) => s.setGameState);

  const currentLocation = useGameStore((s) => s.currentLocation);
  const setLocation = useGameStore((s) => s.setLocation);

  const time = useGameStore((s) => s.time);
  const { addMoney, advanceHours } = useGameStore();

  const setDialogue = useGameStore((s) => s.setDialogue);

  // Day-of-week mapping (your store is numeric; DAYS_OF_WEEK is a const tuple)
  const dayOfWeek: DayOfWeek = useMemo(
    () => DAYS_OF_WEEK[((time.dayIndex ?? 1) - 1 + 7) % 7],
    [time.dayIndex]
  );

  // Background visuals
  const bgSrc = useMemo(
    () => getLocationBackground(currentLocation, time.hour),
    [currentLocation, time.hour]
  );
  const overlayClass = useMemo(
    () => getAtmosphereOverlay(time.hour),
    [time.hour]
  );

  // ✅ Neighbors directly from locations.ts
  const neighbors = useMemo(
    () => locationGraph[currentLocation] ?? [],
    [currentLocation]
  );

  // Characters present based on schedules
  const girlsHere: Girl[] = useMemo(() => {
    return ALL_GIRLS.filter((g) => {
      const hasMet = (eventStateByGirl[g.name]?.eventHistory ?? []).some(
        (h) => h.eventId === `${g.name}_first_meeting`
      );
      const loc = getCharacterLocation(g.name, dayOfWeek, time.hour, hasMet);
      return loc === currentLocation;
    });
  }, [ALL_GIRLS, eventStateByGirl, currentLocation, dayOfWeek, time.hour]);

  return (
    <div className="relative mx-auto max-w-6xl p-4 text-white">
      <div className="mb-3 text-white/70">State: {gameState}</div>

      {/* Background */}
      <div className="relative mb-4 h-[420px] w-full overflow-hidden rounded-lg">
        <Image
          src={bgSrc}
          alt={currentLocation}
          fill
          className="object-cover"
          priority
        />
        <div
          className={`absolute inset-0 pointer-events-none ${overlayClass}`}
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-black/50 px-3 py-1 text-sm font-bold">
          {currentLocation}
        </div>
      </div>

      {/* Characters Here */}
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Characters Here</h2>
        {girlsHere.length === 0 ? (
          <div className="text-sm opacity-75">No one is around right now.</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {girlsHere.map((g) => (
              <button
                key={g.name}
                onClick={() => setActiveGirl(g)}
                className="rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              >
                Talk to {g.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nearby Locations (from locations.ts) */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">Nearby Locations</h2>
        {neighbors.length === 0 ? (
          <div className="text-sm opacity-75">No nearby locations.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {neighbors.map((dest) => (
              <button
                key={dest.name}
                onClick={() => {
                  const res = travel({
                    from: currentLocation,
                    to: dest.name,
                    addMoney,
                    advanceHours,
                    setLocation: (k) => setLocation(k as LocationKey),
                  });
                  if (res !== "ok")
                    console.warn(
                      `Cannot travel from ${currentLocation} to ${dest.name}`
                    );
                }}
                className="group relative overflow-hidden rounded-md border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10"
                title={`Time +${dest.time}h • $${dest.cost}`}
              >
                <div className="relative mb-2 h-24 w-full overflow-hidden rounded">
                  <Image
                    src={getLocationBackground(dest.name, time.hour)}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{dest.name}</div>
                  <div className="text-xs opacity-80">
                    +{dest.time}h • ${dest.cost}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions + Goals (left as you had them) */}
      <div className="mt-6 rounded border border-white/10 bg-black/30 p-6">
        <h2 className="mb-2 text-xl font-bold capitalize">{currentLocation}</h2>
        <p className="opacity-80">
          Spend or restore energy; time advances accordingly.
        </p>

        {/* (wire your work/rest buttons here if you still want them) */}

        <div className="mt-6">
          <GoalsPanel />
        </div>
      </div>

      {/* Phone button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setPhoneOpen(true)}
          className="rounded-full bg-purple-600 p-4 text-white shadow-lg hover:bg-purple-700 transition-transform active:scale-95"
          title="Open phone"
        >
          📱
        </button>
      </div>

      {/* Phone overlay */}
      {phoneOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-[360px] rounded-xl border border-white/20 bg-black/80 p-4 shadow-lg">
            <PhoneMenu
              player={charPlayer}
              hour={time.hour}
              girls={ALL_GIRLS}
              darkMode
              onClose={() => setPhoneOpen(false)}
              currentLocation={currentLocation}
            />
          </div>
        </div>
      )}

      {/* Character interaction overlay */}
      {activeGirl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-[640px] max-w-[95vw] rounded-xl border border-white/20 bg-black/80 p-4 shadow-lg">
            <CharacterOverlay
              girl={activeGirl}
              location={currentLocation as string} // CharacterOverlay's prop is string
              player={charPlayer}
              setPlayer={setCharPlayer}
              spendTime={(amt) => advanceHours(amt)}
              onClose={() => setActiveGirl(null)}
              onStartDialogue={(dialogue) => {
                setActiveGirl(null);
                setDialogue(dialogue);
              }}
              // ✅ these were missing:
              dayOfWeek={dayOfWeek}
              hour={time.hour}
              eventState={
                eventStateByGirl[activeGirl.name] ?? {
                  characterName: activeGirl.name,
                  eventHistory: [],
                  lastInteractionTime: 0,
                }
              }
              onEventTriggered={(eventId) => {
                // keep your handler that records event history
                setEventStateByGirl((prev) => {
                  const prevState = prev[activeGirl.name] ?? {
                    characterName: activeGirl.name,
                    eventHistory: [],
                    lastInteractionTime: 0,
                  };
                  const nowGameTime = (time.dayIndex ?? 1) * 24 + time.hour;
                  return {
                    ...prev,
                    [activeGirl.name]: {
                      ...prevState,
                      eventHistory: [
                        ...prevState.eventHistory,
                        {
                          eventId,
                          lastTriggered: {
                            day: dayOfWeek,
                            hour: time.hour,
                            gameTime: nowGameTime,
                          },
                          timesTriggered: 1,
                        },
                      ],
                      lastInteractionTime: nowGameTime,
                    },
                  };
                });
              }}
              onScheduleDate={(dateInfo) => {
                // stub for now; wire to your scheduler later if you want persistence
                console.log("Scheduled date:", dateInfo);
              }}
              darkMode
            />
          </div>
        </div>
      )}
    </div>
  );
}
