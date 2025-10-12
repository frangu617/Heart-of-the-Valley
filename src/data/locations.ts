export type Location = {
  name: string;
  cost: number;
  time: number;
  image: string;
};

export const locationGraph: Record<string, Location[]> = {
  Bedroom: [
    { name: "Bathroom", cost: 0, time: 1, image: "bathroom.png" },
    { name: "Living Room", cost: 0, time: 1, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 1, image: "kitchen.png" },
  ],
  Bathroom: [
    { name: "Bedroom", cost: 0, time: 1, image: "bedroom.png" },
    { name: "Living Room", cost: 0, time: 1, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 1, image: "kitchen.png" },
  ],
  Kitchen: [{ name: "Bedroom", cost: 0, time: 1, image: "bedroom.png" },
    { name: "Living Room", cost: 0, time: 1, image: "livingroom.png" },
    { name: "Bathroom", cost: 0, time: 1, image: "bathroom.png" },
  ],
  "Living Room": [
    { name: "Bedroom", cost: 0, time: 1, image: "bedroom.png" },
    { name: "Hallway", cost: 0, time: 1, image: "hallway.png" },
    { name: "Kitchen", cost: 0, time: 1, image: "kitchen.png" },
  ],
  Hallway: [
    { name: "Neighbor A", cost: 0, time: 1, image: "neighbor.png" },
    { name: "Neighbor B", cost: 0, time: 1, image: "neighbor.png" },
    { name: "Street", cost: 0, time: 1, image: "street.png" },
    { name: "Living Room", cost: 0, time: 1, image: "bedroom.png" },
  ],
  "Neighbor A": [{ name: "Hallway", cost: 0, time: 1, image: "hallway.png" }],
  "Neighbor B": [{ name: "Hallway", cost: 0, time: 1, image: "hallway.png" }],
  Street: [
    { name: "Beach", cost: 20, time: 2, image: "beach.png" },
    { name: "Mountains", cost: 30, time: 3, image: "mountains.png" },
    { name: "City", cost: 50, time: 5, image: "city.png" },
    { name: "Hallway", cost: 0, time: 1, image: "hallway.png" },
  ],
  Beach: [{ name: "Street", cost: 20, time: 2, image: "street.png" }],
  Mountains: [{ name: "Street", cost: 30, time: 3, image: "street.png" }],
  City: [
    { name: "Cafe", cost: 0, time: 1, image: "cafe.png" },
    { name: "Gym", cost: 0, time: 1, image: "gym.png" },
    { name: "Mall", cost: 0, time: 1, image: "mall.png" },
    { name: "Street", cost: 50, time: 5, image: "street.png" },
  ],
  Cafe: [{ name: "City", cost: 0, time: 1, image: "city.png" }],
  Gym: [{ name: "City", cost: 0, time: 1, image: "city.png" }],
  Mall: [{ name: "City", cost: 0, time: 1, image: "city.png" }],
};
