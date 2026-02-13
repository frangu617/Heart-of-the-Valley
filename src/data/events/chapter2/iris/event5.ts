import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 5: The Nightclub Date
// Description: You take Iris on a date to a nightclub.

const iris_ch2_date_encounter_sub: Dialogue = {
  id: "iris_ch2_date_encounter_sub",
  lines: [
    {
      speaker: null,
      text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter.",
    },
    {
      speaker: null,
      text: "A woman with Iris's dark hair is waiting near the spot, back to you.",
    },
    { speaker: "You", text: "Iris?" },
    {
      speaker: null,
      text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a mischievous glint.",
    },
    { speaker: "???", text: "...", expression: "happy" },
    { speaker: "You", text: "Oh, I'm so sorry. I thought you were someone else." },
    {
      speaker: null,
      text: "She doesn't respond. She just gives you a slow, knowing smile before turning and melting back into the crowd.",
    },
  ],
};

const iris_ch2_date_after_encounter: Dialogue = {
  id: "iris_ch2_date_after_encounter",
  lines: [
    {
      speaker: "Iris",
      text: "Hey! Sorry I'm a minute late. This place is packed. Did I miss anything?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you tell her?",
      choices: [
        { text: "You won't believe this, but I just saw your twin.", affectionChange: 1 },
        { text: "Nothing, just admiring the view.", affectionChange: 0 },
      ],
    },
  ],
};

const iris_ch2_date_encounter_dom: Dialogue = {
  id: "iris_ch2_date_encounter_dom",
  lines: [
    {
      speaker: null,
      text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter.",
    },
    {
      speaker: null,
      text: "You spot a familiar silhouette and walk up behind her with a hand at her lower back.",
    },
    { speaker: "You", text: "There you are." },
    {
      speaker: null,
      text: "The woman turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a challenging glint.",
    },
    { speaker: "???", text: "...", expression: "happy" },
    { speaker: "You", text: "Oh. My mistake. I thought you were someone else." },
    {
      speaker: null,
      text: "She doesn't respond. She just gives you a slow, amused smile before turning and vanishing into the crowd.",
    },
  ],
};

const iris_ch2_date_encounter_neutral: Dialogue = {
  id: "iris_ch2_date_encounter_neutral",
  lines: [
    {
      speaker: null,
      text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter.",
    },
    {
      speaker: null,
      text: "Someone with the same dark hair is leaning there, and you step up beside her.",
    },
    { speaker: "You", text: "Hey-ready to order?" },
    {
      speaker: null,
      text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, her eyes filled with curiosity.",
    },
    { speaker: "???", text: "...", expression: "happy" },
    { speaker: "You", text: "Sorry about that. I mistook you for my date." },
    {
      speaker: null,
      text: "She doesn't respond. She just gives you a small, friendly smile before turning and walking away.",
    },
  ],
};

export const irisEvent5Dialogues: Record<string, Dialogue> = {
  iris_ch2_date_encounter_sub,
  iris_ch2_date_after_encounter,
  iris_ch2_date_encounter_dom,
  iris_ch2_date_encounter_neutral,
};

export const irisEvent5Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev5_sub_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris. It's time for a fun night out.",
    },
    priority: 150,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisDatePlanned"],
      requiredLocation: "Nightclub",
      maxDominance: -10,
    },
    dialogue: {
      id: "iris_ch2_ev5_sub_date",
      lines: [
        {
          speaker: null,
          text: "You and Iris plan to meet at a trendy nightclub called 'Velvet'. It's dark and loud, the bass thumping through the walls.",
        },
        {
          speaker: null,
          text: "You arrive a few minutes early and head to the bar where you said you'd meet.",
        },
        {
          speaker: null,
          text: "You spot someone who looks like Iris from behind and walk over.",
          nextDialogueId: "iris_ch2_date_encounter_sub",
        },
        {
          speaker: null,
          text: "A moment later, Iris shows up.",
          nextDialogueId: "iris_ch2_date_after_encounter",
        },
        {
          speaker: "Iris",
          text: "It's... a lot. I haven't been to a place like this in years.",
          expression: "shy",
        },
        { speaker: "You", text: "Just stay with me. I'll keep you safe." },
        {
          speaker: null,
          text: "You find a quieter corner booth. After a while, she relaxes, enjoying being out with you.",
        },
        {
          speaker: null,
          text: "The rest of the date is perfect, ending with a slow, trusting kiss at her door.",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 20, love: 5 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
  {
    id: "iris_ch2_ev5_dom_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris. It's time for a fun night out.",
    },
    priority: 150,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisDatePlanned"],
      requiredLocation: "Nightclub",
      minDominance: 10,
    },
    dialogue: {
      id: "iris_ch2_ev5_dom_date",
      lines: [
        {
          speaker: null,
          text: "You and Iris plan to meet at a trendy nightclub called 'Velvet'. The bass is thumping and the line is long.",
        },
        {
          speaker: null,
          text: "You arrive first and wait at the bar, scanning the crowd.",
        },
        {
          speaker: null,
          text: "You spot a familiar silhouette and close the distance.",
          nextDialogueId: "iris_ch2_date_encounter_dom",
        },
        {
          speaker: null,
          text: "A moment later, Iris shows up.",
          nextDialogueId: "iris_ch2_date_after_encounter",
        },
        {
          speaker: "Iris",
          text: "I hope you can keep up, Professor.",
          expression: "seductive",
        },
        {
          speaker: null,
          text: "The night is a whirlwind of dancing and flirty banter.",
        },
        {
          speaker: null,
          text: "The rest of the date is electric, ending with a fiery, possessive kiss at her door.",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 15, lust: 10 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
  {
    id: "iris_ch2_ev5_neutral_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: {
      title: "The Date",
      description: "You've planned a date with Iris. It's time for a fun night out.",
    },
    priority: 150,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisDatePlanned"],
      requiredLocation: "Nightclub",
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: {
      id: "iris_ch2_ev5_neutral_date",
      lines: [
        {
          speaker: null,
          text: "You and Iris plan to meet at a nightclub you both agreed on. It's lively, but the bar is easy to spot.",
        },
        { speaker: null, text: "You get there early and wait by the counter." },
        {
          speaker: null,
          text: "Someone with the same dark hair is leaning there, and you step up beside her.",
          nextDialogueId: "iris_ch2_date_encounter_neutral",
        },
        {
          speaker: null,
          text: "A moment later, Iris shows up.",
          nextDialogueId: "iris_ch2_date_after_encounter",
        },
        {
          speaker: "Iris",
          text: "This is fun! It's nice to just feel like a normal person out on a Friday night.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "The conversation is easy and balanced as you find a comfortable spot to talk and people-watch.",
        },
        {
          speaker: null,
          text: "The date ends with a comfortable, intimate kiss at her door.",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 20, love: 5 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
];
