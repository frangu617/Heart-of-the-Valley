import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 3: Unexpected Cafe Run-In
// Description: Run into Iris at the cafe after turning her down.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: iris_coffee_forced_meet_event  (Cafe, any time, hasMetIris + irisCoffeeDeclined)
//   ├─ [Join her]        → (continues inline, no fork)   END [irisCoffeeMet]
//   └─ [Keep it brief]   → (continues inline, no fork)   END [irisCoffeeMet]
// No sub-dialogues — single event with inline choice, both merge immediately.
// Rewards: irisCoffeeMet
// ─────────────────────────────────────────────────────────────────────────────

export const irisEvent3Dialogues: Record<string, Dialogue> = {
};

export const irisEvent3Events: CharacterEvent[] = [
  {
    id: "iris_coffee_forced_meet_event",
    name: "Unexpected Cafe Run-In",
    description: "Run into Iris at the cafe after turning her down.",
    quest: {
      title: "Cafe Run-In",
      description: "Stop by the Cafe. You might run into Iris again.",
    },
    priority: 240,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["hasMetIris", "irisCoffeeDeclined"],
    },
    dialogue: {
      id: "iris_coffee_forced_meet_event",
      lines: [
        {
          speaker: null,
          text: "The cafe hums with low conversation and clinking mugs. As you step in, a familiar voice calls your name.",
        },
        {
          speaker: "Iris",
          text: "Oh! Hey. I didn't expect to see you here.",
          expression: "surprised",
        },
        {
          speaker: "Iris",
          text: "I was just thinking about you. Want to sit for a minute?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Join her",
              affectionChange: 1,
            },
            {
              text: "Keep it brief",
              affectionChange: 0,
            },
          ],
        },
        {
          speaker: null,
          text: "Whether you sit or keep it brief, the tension between you eases a little.",
        },
        {
          speaker: "Iris",
          text: "Maybe next time we can actually plan it.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You leave with a fresh cup and a lingering sense that this meeting was overdue.",
        },
      ],
    },
    rewards: {
      setFlags: ["irisCoffeeMet"],
    },
  },
];
