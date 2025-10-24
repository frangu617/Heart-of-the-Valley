import { locationGraph } from "@/data/locations";
import type { LocationKey } from "@/types/game";

export type Neighbor = {
  name: string; // from locations.ts
  time: number;
  cost: number;
  image?: string;
};

export type TravelResult = "ok" | "not-neighbor";

export function getNeighbor(
  from: LocationKey,
  to: string
): Neighbor | undefined {
  const neighbors = locationGraph[from] ?? [];
  return neighbors.find((n) => n.name === to);
}

export function travel(opts: {
  from: LocationKey;
  to: string;
  addMoney: (delta: number) => void;
  advanceHours: (hours: number) => void;
  setLocation: (loc: LocationKey) => void;
}): TravelResult {
  const { from, to, addMoney, advanceHours, setLocation } = opts;
  const neighbor = getNeighbor(from, to);
  if (!neighbor) return "not-neighbor";

  if (neighbor.cost) addMoney(-neighbor.cost);
  if (neighbor.time) advanceHours(neighbor.time);

  // name in graph is a real key; after step #1 this cast is safe:
  setLocation(neighbor.name as LocationKey);
  return "ok";
}
