"use client";
import { useState, useEffect } from "react";
import StatsPanel from "../components/StatsPanel";
import LocationCard from "../components/LocationCard";
import CharacterOverlay from "../components/CharacterOverlay";
import { locationGraph, Location } from "../data/locations";
import { PlayerStats, defaultPlayerStats } from "../data/characters";

export default function GamePage() {
  const [player, setPlayer] = useState<PlayerStats>(defaultPlayerStats);
  const [currentLocation, setCurrentLocation] = useState<string>("Bedroom");
  const [hour, setHour] = useState<number>(8); // Start at 8 AM

  useEffect(() => {
    localStorage.setItem("playerStats", JSON.stringify(player));
  }, [player]);

  const moveTo = (location: string) => {
    setCurrentLocation(location);
  };

  const spendTime = (amount: number) => {
    setHour((prev) => Math.min(prev + amount, 24));
  };

  return (
    <main>
      <h1>💖 Dating Sim</h1>
      <StatsPanel stats={player} hour={hour} />
      <div style={{ marginBottom: "1rem" }}>
        <strong>Current Location:</strong> {currentLocation}
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {locationGraph[currentLocation]?.map((loc) => (
          <LocationCard key={loc.name} location={loc} onMove={moveTo} />
        ))}
      </div>
      <CharacterOverlay
        location={currentLocation}
        player={player}
        setPlayer={setPlayer}
        spendTime={spendTime}
      />
    </main>
  );
}
