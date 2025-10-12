export type Location = {
  name: string;
  cost: number;
  time: number;
  image: string;
};

export const locationMap: Record<string, Location[]> = {
  Bedroom: [
    { name: "Bathroom", cost: 0, time: 1, image: "bathroom.png" },
    { name: "Living Room", cost: 0, time: 1, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 1, image: "kitchen.png" },
  ],
  Bathroom: [{ name: "Bedroom", cost: 0, time: 1, image: "bedroom.png" }],
  Kitchen: [{ name: "Bedroom", cost: 0, time: 1, image: "bedroom.png" }],
  LivingRoom: [
    { name: "Bedroom", cost: 0, time: 1, image: "bedroom.png" },
    { name: "Hallway", cost: 0, time: 1, image: "hallway.png" },
  ],
  Hallway: [
    { name: "Neighbor A", cost: 0, time: 1, image: "neighbor.png" },
    { name: "Neighbor B", cost: 0, time: 1, image: "neighbor.png" },
    { name: "Street", cost: 0, time: 1, image: "street.png" },
    { name: "Apartment", cost: 0, time: 1, image: "bedroom.jpngg" },
  ],
  Street: [
    { name: "Beach", cost: 20, time: 2, image: "beach.png" },
    { name: "Mountains", cost: 30, time: 3, image: "mountains.png" },
    { name: "City", cost: 50, time: 5, image: "city.png" },
    { name: "Apartment", cost: 0, time: 1, image: "bedroom.png" },
  ],
};


