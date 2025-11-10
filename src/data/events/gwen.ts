// import { CharacterEvent } from "./types";
import {
  CharacterEvent,
  CharacterEventConditions,
  createCharacterEvents,
} from "@/lib/game/characterEventSystem";

export const gwenEvents: CharacterEvent[] = createCharacterEvents("Gwen", [
  {
    id: "gwen_first_meeting",
    name: "First Meeting with Gwen",
    description: "First Meeting with Gwen",
    priority: 100,
    repeatable: false,
    conditions: CharacterEventConditions.firstMeeting("Hallway", [
      "firstTimeWorked",
    ]),
    dialogue: {
      id: "gwen_first_meeting",

      lines: [
        {
          speaker: null,
          text: "As you're heading back to your apartment, you hear footsteps behind you in the hallway.",
        },
        {
          speaker: "Gwen",
          text: "Hey! Are you the new neighbor?",
          expression: "happy",
        },
        {
          speaker: null,
          text: "A woman with an energetic smile approaches you.",
        },
        {
          speaker: "You",
          text: "Not exactly new - I've been here about a year. {playerName}.",
        },
        {
          speaker: "Gwen",
          text: "Oh wow, really? I'm Gwen! I can't believe we haven't met sooner!",
          expression: "happy",
        },
        { speaker: "You", text: "Nice to meet you, Gwen." },
        {
          speaker: "Gwen",
          text: "I live just down the hall. We should hang out sometime! I know all the fun spots around here.",
          expression: "love",
        },
        {
          speaker: null,
          text: "She's already bubbling with ideas, her enthusiasm filling the hallway.",
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetGwen"],
      unlockCharacters: ["Gwen"],
    },
  },
  {
    id: "gwen_flirting",
    name: "Gwen Flirting with me",
    description: "Gwen is Fucking flirting with me!",
    priority: 100,
    repeatable: true,
    conditions: CharacterEventConditions.repeatableEncounter(
      "Hallway",
      0,
      0,
      0,
      24
    ),
    dialogue: {
      id: "gwen catcalling me",
      lines: [
        {
          speaker: "Gwen",
          text: "Nice ass neighbor!",
        },
      ],
    },
  },
]);
