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
      imageSlide: "/images/characters/dawn/date/back.webp",
    },
    { speaker: "You", text: "Iris?" },
    {
      speaker: null,
      text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a mischievous glint as they flick to your mouth.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    { speaker: "???", text: "...", imageSlide: "/images/characters/dawn/date/happy.webp" },
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
    {
      speaker: null,
      text: "She steps in close enough that her perfume cuts through the smoke and bass.",
    },
    {
      speaker: "You",
      text: "How do you greet her?",
      choices: [
        {
          text: "Offer your arm and smile.",
          affectionChange: 1,
        },
        {
          text: "Let your eyes linger. You look dangerous tonight.",
          affectionChange: 0,
          lustChange: 1,
        },
        {
          text: "Brush her fingers. Been waiting for this all day.",
          affectionChange: 1,
          lustChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then do not waste the night.",
      expression: "happy",
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
      imageSlide: "/images/characters/dawn/date/back.webp",
    },
    { speaker: "You", text: "There you are." },
    {
      speaker: null,
      text: "The woman turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a challenging glint that dares you to react.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    { speaker: "???", text: "...", imageSlide: "/images/characters/dawn/date/happy.webp" },
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
      imageSlide: "/images/characters/dawn/date/back.webp",
    },
    { speaker: "You", text: "Hey-ready to order?" },
    {
      speaker: null,
      text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, her eyes filled with curiosity that lingers a beat too long.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    { speaker: "???", text: "...", imageSlide: "/images/characters/dawn/date/happy.webp" },
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
          text: "It's... a lot. I have not been in a room this loud in years.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you steady her?",
          choices: [
            {
              text: "Offer your hand. Then stay with me.",
              affectionChange: 2,
              dominanceChange: -1,
            },
            {
              text: "Lean close and murmur. Keep your eyes on me.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Tease softly. You can hide behind me for the first song.",
              affectionChange: 1,
              dominanceChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "She threads her fingers through yours, grip warm and a little unsteady.",
        },
        {
          speaker: null,
          text: "You find a quieter corner booth. As the music settles into the background, your knees brush beneath the table.",
        },
        {
          speaker: "You",
          text: "How do you keep the mood?",
          choices: [
            {
              text: "Ask about the reckless nights she used to love.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Keep it present. Tonight is about us, not old ghosts.",
              affectionChange: 2,
            },
            {
              text: "Tell her she looks impossible to ignore tonight.",
              affectionChange: 1,
              lustChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "By the time you walk her home, she lingers at her door and kisses you slowly, trusting and unhurried.",
          expression: "kissingMC",
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
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Pull her straight to the dance floor.",
              affectionChange: 1,
              lustChange: 2,
              dominanceChange: 1,
            },
            {
              text: "Keep her close at the bar first and make her wait.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Lean to her ear. You started this. Do not slow down now.",
              affectionChange: 0,
              lustChange: 2,
              dominanceChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "The night turns into a push-and-pull of dancing, sharp smiles, and hands that keep finding each other.",
        },
        {
          speaker: "You",
          text: "At the edge of the dance floor, what do you do?",
          choices: [
            {
              text: "Spin her in close and keep her there.",
              affectionChange: 1,
              lustChange: 2,
            },
            {
              text: "Hold eye contact and make her come to you.",
              affectionChange: 0,
              lustChange: 2,
              dominanceChange: 1,
            },
            {
              text: "Break the tension with a low, private joke.",
              affectionChange: 2,
              lustChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "The date stays electric to the end, finishing with a fierce, possessive kiss at her door that leaves both of you breathless.",
          expression: "kissingMC",
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
          speaker: "You",
          text: "How do you set the tone?",
          choices: [
            {
              text: "Warm and close. Keep your hand at the small of her back.",
              affectionChange: 2,
            },
            {
              text: "Playful. Trade teasing comments while you watch the crowd.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Quiet and intimate. Guide her to a calmer corner booth.",
              affectionChange: 2,
              dominanceChange: -1,
            },
          ],
        },
        {
          speaker: null,
          text: "Conversation comes easily as you people-watch and share a drink, your shoulders touching more often than either of you comments on.",
        },
        {
          speaker: "You",
          text: "Later in the night?",
          choices: [
            {
              text: "Tell her she looks even better when she relaxes.",
              affectionChange: 1,
              lustChange: 1,
            },
            {
              text: "Ask for one slow dance away from the crowd.",
              affectionChange: 2,
            },
            {
              text: "Keep talking, let the tension build naturally.",
              affectionChange: 1,
              lustChange: 0,
            },
          ],
        },
        {
          speaker: null,
          text: "The date ends with a soft, intimate kiss at her door, lingering just long enough to promise more.",
          expression: "kissingMC",
        },
      ],
    },
    rewards: {
      girlStats: { affection: 20, love: 5 },
      setFlags: ["irisCh2Complete", "metMysteryGirl"],
    },
  },
];
