import type { Dialogue } from "./index";

export const tutorialDialogue: Dialogue = {
  id: "tutorial",
  lines: [
    {
      speaker: "System",
      text: "Welcome to Heart of the Valley. Here is a quick guide to the game mechanics.",
    },
    {
      speaker: "System",
      text: "STATS: Keep an eye on your Energy, Hunger, and Money (left panel). Actions cost Energy, and you'll need to eat to restore Hunger.",
    },
    {
      speaker: "System",
      text: "PHONE: Use the Phone menu (top right) to check active Quests, read Messages, and track your Relationship progress.",
    },
    {
      speaker: "System",
      text: "NAVIGATION: Use the 'Where to go?' menu to travel. Characters have schedules and move around the city throughout the day.",
    },
    {
      speaker: "System",
      text: "INTERACTION: Talk to characters to unlock events. Your choices affect their stats and the story path.",
    },
    {
      speaker: "System",
      text: "Good luck.",
    },
  ],
};
