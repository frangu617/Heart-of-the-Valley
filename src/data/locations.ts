export type Location = {
  name: string;
  cost: number;
  time: number;
  image: string;
};

export const locationGraph: Record<string, Location[]> = {
  //Home locations
  Bedroom: [
    { name: "Bathroom", cost: 0, time: 0, image: "bathroom.png" },
    { name: "Living Room", cost: 0, time: 0, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 0, image: "kitchen.png" },
  ],
  Bathroom: [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Living Room", cost: 0, time: 0, image: "livingroom.png" },
    { name: "Kitchen", cost: 0, time: 0, image: "kitchen.png" },
  ],
  Kitchen: [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Living Room", cost: 0, time: 0, image: "livingroom.png" },
    { name: "Bathroom", cost: 0, time: 0, image: "bathroom.png" },
  ],
  "Living Room": [
    { name: "Bedroom", cost: 0, time: 0, image: "bedroom.png" },
    { name: "Bathroom", cost: 0, time: 0, image: "bathroom.png" },
    { name: "Kitchen", cost: 0, time: 0, image: "kitchen.png" },
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
  ],
  //Apartment locations
  Hallway: [
    { name: "Living Room", cost: 0, time: 0, image: "living_room.png" },
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    // { name: "Gwen's Apartment", cost: 0, time: 0, image: "gwen_livingroom.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
  ],
  "Iris' Living Room": [
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
  ],
  "Dawn's bedroom": [
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
  ],
  "Iris' Bedroom": [
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
  ],
  "Iris' Bathroom": [
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Kitchen", cost: 0, time: 0, image: "iris_kitchen.png" },
  ],
  "Iris' Kitchen": [
    { name: "Dawn's bedroom", cost: 0, time: 0, image: "dawns_bedroom.png" },
    { name: "Iris' Bedroom", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Living Room", cost: 0, time: 0, image: "iris_bedroom.png" },
    { name: "Iris' Bathroom", cost: 0, time: 0, image: "iris_bathroom.png" },
  ],
  //Street locations
  Street: [
    { name: "Hallway", cost: 0, time: 0, image: "hallway.png" },
    { name: "Beach", cost: 0, time: 0, image: "beach.png" },
    { name: "Mountains", cost: 0, time: 0, image: "mountains.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
    { name: "Car Store", cost: 0, time: 0, image: "car_store.png" },
    {
      name: "University",
      cost: 0,
      time: 0,
      image: "university_parking_lot.png",
    },
  ],
  Beach: [
    { name: "Street", cost: 0, time: 0, image: "street.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
    {
      name: "University",
      cost: 0,
      time: 0,
      image: "university_parking_lot.png",
    },
  ],
  Mountains: [
    { name: "Street", cost: 0, time: 0, image: "street.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
    {
      name: "University",
      cost: 0,
      time: 0,
      image: "university_parking_lot.png",
    },
  ],
  // City locations
  City: [
    { name: "University", cost: 0, time: 0, image: "university.png" },
    { name: "Cafe", cost: 0, time: 0, image: "cafe.png" },
    { name: "Gym", cost: 0, time: 0, image: "gym.png" },
    { name: "Mall", cost: 0, time: 0, image: "mall.png" },
    { name: "Bar", cost: 0, time: 0, image: "bar.png" },
    { name: "Nightclub", cost: 0, time: 0, image: "nightclub.png" },
    { name: "Strip Club", cost: 0, time: 0, image: "stripclub.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
  ],
  Cafe: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Gym: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Mall: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Bar: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  Nightclub: [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  "Strip Club": [{ name: "City", cost: 0, time: 0, image: "city.png" }],
  "Car Store": [{ name: "Street", cost: 0, time: 0, image: "street.png" }],
  // University locations
  University: [
    {
      name: "University Hallway",
      cost: 0,
      time: 0,
      image: "university_hallway.png",
    },
    { name: "University Parking Lot", cost: 0, time: 0, image: "university_parking_lot.png" },
    { name: "Street", cost: 0, time: 0, image: "street.png" },
    { name: "City", cost: 0, time: 0, image: "city.png" },
  ],
  "University Hallway": [
    { name: "Classroom", cost: 0, time: 0, image: "classroom.png" },
    { name: "Office", cost: 0, time: 0, image: "office.png" },
    { name: "Men's Bathroom", cost: 0, time: 0, image: "mens_bathroom.png" },
    {
      name: "Women's Bathroom",
      cost: 0,
      time: 0,
      image: "womens_bathroom.png",
    },
    { name: "University", cost: 0, time: 0, image: "university.png" },
    { name: "Iris' Office", cost: 0, time: 0, image: "iris_office.png" },
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
  "Iris' Office": [
    { name: "University Hallway", cost: 0, time: 0, image: "hallway.png" },
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
  "University Parking Lot": [
    { name: "University", cost: 0, time: 0, image: "university.png" },
  ],
};
