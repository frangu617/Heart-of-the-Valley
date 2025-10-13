export type Location = {
  name: string;
  cost: number;
  time: number;
  image: string;
};

export const locationGraph: Record<string, Location[]> = {
  Bedroom: [
    { name: "Bathroom", cost: 0, time: 0, image: "bathroom.png" },
    { name: "Living Room", cost: 0, time: 0, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 0, image: "kitchen.png" },
  ],
  Bathroom: [{ name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" }],
  Kitchen: [{ name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" }],
  "Living Room": [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
  ],
  Hallway: [
    { name: "Living Room", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
  ],
  Street: [
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
    { name: "Beach", cost: 0, time: 0, image: "beach.png" },
    { name: "Mountains", cost: 0, time: 0, image: "mountains.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
    { name: "University", cost: 0, time: 0, image: "university.png" },
  ],
  Beach: [{ name: "Street", cost: 0, time: 0, image: "street.png" }],
  Mountains: [{ name: "Street", cost: 0, time: 0, image: "street.png" }],
  City: [
    { name: "Cafe", cost: 0, time: 0, image: "cafe.png" },
    { name: "Gym", cost: 0, time: 0, image: "gym.png" },
    { name: "Mall", cost: 0, time: 0, image: "mall.png" },
    { name: "Strip Club", cost: 0, time: 0, image: "stripclub.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
  ],
  Cafe: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Gym: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Mall: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  "Strip Club": [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  // University locations
  University: [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
    { name: "Parking Lot", cost: 0, time: 0, image: "parking_lot.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
  ],
  "University Hallway": [
    { name: "Classroom", cost: 0, time: 0, image: "classroom.png" },
    { name: "Office", cost: 0, time: 0, image: "office.png" },
    { name: "Men's Bathroom", cost: 0, time: 0, image: "bathroom.png" },
    { name: "Women's Bathroom", cost: 0, time: 0, image: "bathroom.png" },
    { name: "University", cost: 0, time: 0, image: "university.png" },
  ],
  Classroom: [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  Office: [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  "Men's Bathroom": [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  "Women's Bathroom": [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
  ],
  "Parking Lot": [
    { name: "University", cost: 0, time: 0, image: "university.png" },
  ],
};
