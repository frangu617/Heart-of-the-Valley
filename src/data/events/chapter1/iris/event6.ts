import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 6: Chapter 1 Finale (Confident Iris)
// Descriptions: Iris confronts you in the hallway late at night. | Iris hesitates in the hallway late at night.

const irisFinaleDomChallenge: Dialogue = {
  id: "iris_finale_dom_challenge",
  lines: [
    {
      speaker: null,
      text: "Iris laughs softly, though it sounds a bit breathless.",
    },
    {
      speaker: "Iris",
      text: "Maybe I am. Maybe I'm tired of being polite neighbors.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She steps closer, invading your personal space. She reaches out, her hand resting flat against your chest, right over your heart.",
    },
    {
      speaker: null,
      text: "Her fingers curl slightly into the fabric, as if she's testing the boundary.",
    },
    { speaker: "Iris", text: "Your heart is beating fast.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Lean into her touch.",
          affectionChange: 2,
          nextDialogueId: "iris_finale_dom_success",
        },
        {
          text: "Step back.",
          affectionChange: -1,
          nextDialogueId: "iris_finale_dom_fail_back",
        },
      ],
    },
  ],
};

const irisFinaleDomDeflect: Dialogue = {
  id: "iris_finale_dom_deflect",
  lines: [
    {
      speaker: "Iris",
      text: "Work, work, work. You need to learn when to switch off.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She steps closer, invading your personal space. She reaches out, her hand resting flat against your chest, right over your heart.",
    },
    {
      speaker: null,
      text: "Her fingers curl slightly into the fabric, as if she's testing the boundary.",
    },
    { speaker: "Iris", text: "Your heart is beating fast.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Lean into her touch.",
          affectionChange: 1,
          nextDialogueId: "iris_finale_dom_fail_lean",
        },
        {
          text: "Step back.",
          affectionChange: -1,
          nextDialogueId: "iris_finale_dom_fail_back",
        },
      ],
    },
  ],
};

const irisFinaleDomSuccess: Dialogue = {
  id: "iris_finale_dom_success",
  lines: [
    {
      speaker: null,
      text: "You don't pull away. You lean slightly forward, letting her feel the rhythm.",
    },
    { speaker: "You", text: "You have that effect on people." },
    { speaker: null, text: "Her eyes darken, her resolve slipping." },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "seductive",
    },
    { speaker: null, text: "She grips your shirt, pulling you down. It's impulsive, almost rough." },
    { speaker: "Iris", text: "I told myself I'd be careful.", expression: "shy" },
    { speaker: "Iris", text: "But I want to.", expression: "shy" },
    {
      speaker: null,
      text: "Before you can respond, she kisses you. It's not a question; it's a demand.",
    },
    {
      speaker: null,
      text: "Her lips are hungry, pressing against yours with a desperate energy. It feels like she's losing a fight with herself, and you're the collateral damage.",
    },
    { speaker: null, text: "For a moment, you surrender to it, the heat between you spiking." },
    { speaker: null, text: "Then, she breaks the kiss abruptly." },
    {
      speaker: null,
      text: "She stares at you, chest heaving, eyes wide as the reality of what she just did crashes in.",
    },
    { speaker: "Iris", text: "I... oh god.", expression: "surprised" },
    {
      speaker: "Iris",
      text: "I didn't mean to... I mean, I did, but...",
      expression: "surprised",
    },
    { speaker: null, text: "She panics, turning on her heel." },
    { speaker: "Iris", text: "I have to go!", expression: "surprised" },
    {
      speaker: null,
      text: "She sprints back to her apartment, slamming the door shut behind her.",
    },
  ],
};

const irisFinaleDomFailBack: Dialogue = {
  id: "iris_finale_dom_fail_back",
  lines: [
    { speaker: null, text: "You take a half-step back." },
    { speaker: "You", text: "Iris, what are you doing?" },
    {
      speaker: null,
      text: "She frowns, frustration flashing across her face, but she steps forward again to close the gap.",
    },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "sad",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "sad",
    },
    { speaker: null, text: "She searches your face, then sighs, the moment breaking." },
    {
      speaker: "Iris",
      text: "Never mind. I'm just... tired. Forget I said anything.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She walks past you, heading back to her room without looking back.",
    },
  ],
};

const irisFinaleDomFailLean: Dialogue = {
  id: "iris_finale_dom_fail_lean",
  lines: [
    {
      speaker: null,
      text: "You don't pull away. You lean slightly forward, letting her feel the rhythm.",
    },
    { speaker: "You", text: "You have that effect on people." },
    { speaker: null, text: "Her eyes darken, her resolve slipping." },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "sad",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "sad",
    },
    { speaker: null, text: "She searches your face, then sighs, the moment breaking." },
    {
      speaker: "Iris",
      text: "Never mind. I'm just... tired. Forget I said anything.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She walks past you, heading back to her room without looking back.",
    },
  ],
};

const irisFinaleSubStepCloser: Dialogue = {
  id: "iris_finale_sub_step_closer",
  lines: [
    {
      speaker: null,
      text: "You close the distance between you. She doesn't retreat; she looks up at you, eyes wide.",
    },
    { speaker: "Iris", text: "I just... wanted to see you.", expression: "shy" },
    {
      speaker: null,
      text: "She looks at her feet, then back up at you, biting her lip.",
    },
    {
      speaker: "Iris",
      text: "Every time I see you, I feel like... like I'm waiting for something to happen.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Take charge. (Touch her chin)",
          affectionChange: 2,
          nextDialogueId: "iris_finale_sub_success",
        },
        {
          text: "Ask her. 'What do you want to happen?'",
          affectionChange: 0,
          nextDialogueId: "iris_finale_sub_fail_ask",
        },
      ],
    },
  ],
};

const irisFinaleSubStayBack: Dialogue = {
  id: "iris_finale_sub_stay_back",
  lines: [
    { speaker: "Iris", text: "Yeah. Here you are.", expression: "shy" },
    {
      speaker: null,
      text: "She looks at her feet, then back up at you, biting her lip.",
    },
    {
      speaker: "Iris",
      text: "Every time I see you, I feel like... like I'm waiting for something to happen.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Take charge. (Touch her chin)",
          affectionChange: 1,
          nextDialogueId: "iris_finale_sub_fail_take_charge",
        },
        {
          text: "Ask her. 'What do you want to happen?'",
          affectionChange: 0,
          nextDialogueId: "iris_finale_sub_fail_ask",
        },
      ],
    },
  ],
};

const irisFinaleSubSuccess: Dialogue = {
  id: "iris_finale_sub_success",
  lines: [
    {
      speaker: null,
      text: "You reach out, gently lifting her chin so she has to look at you.",
    },
    { speaker: "You", text: "Then let's make something happen." },
    { speaker: null, text: "She shudders under your touch, her breath hitching." },
    { speaker: "You", text: "Iris. Look at me." },
    {
      speaker: null,
      text: "You don't give her time to overthink. You wrap an arm around her waist and pull her into you.",
    },
    { speaker: "Iris", text: "Oh--!", expression: "surprised" },
    {
      speaker: null,
      text: "You kiss her deeply, swallowing her surprise. You kiss her with intent, possessive and firm, letting her know exactly where she stands.",
    },
    {
      speaker: null,
      text: "She melts instantly, her hands clutching your shoulders, making a soft, desperate sound against your mouth.",
    },
    {
      speaker: null,
      text: "When you finally pull back, she looks completely unraveled. Her face is flushed, her lips swollen.",
    },
    { speaker: "Iris", text: "I...", expression: "surprised" },
    {
      speaker: null,
      text: "She touches her lips, looking at you with a mix of desire and total panic.",
    },
    { speaker: "Iris", text: "I can't... this is...", expression: "surprised" },
    { speaker: null, text: "Overwhelmed, she spins around." },
    { speaker: "Iris", text: "Goodnight!", expression: "surprised" },
    {
      speaker: null,
      text: "She practically runs back to her apartment, the door clicking shut a second later.",
    },
  ],
};

const irisFinaleSubFailTakeCharge: Dialogue = {
  id: "iris_finale_sub_fail_take_charge",
  lines: [
    {
      speaker: null,
      text: "You reach out, gently lifting her chin so she has to look at you.",
    },
    { speaker: "You", text: "Then let's make something happen." },
    { speaker: null, text: "She shudders under your touch, her breath hitching." },
    {
      speaker: null,
      text: "The moment hangs in the air, heavy and awkward, but neither of you moves to break it.",
    },
    { speaker: "Iris", text: "I should... probably go back inside. Dawn might wake up.", expression: "sad" },
    { speaker: "You", text: "Yeah. Goodnight, Iris." },
    { speaker: null, text: "She slips back into her apartment, leaving you in the hall." },
  ],
};

const irisFinaleSubFailAsk: Dialogue = {
  id: "iris_finale_sub_fail_ask",
  lines: [
    { speaker: "Iris", text: "I don't know... something.", expression: "shy" },
    {
      speaker: null,
      text: "The moment hangs in the air, heavy and awkward, but neither of you moves to break it.",
    },
    { speaker: "Iris", text: "I should... probably go back inside. Dawn might wake up.", expression: "sad" },
    { speaker: "You", text: "Yeah. Goodnight, Iris." },
    { speaker: null, text: "She slips back into her apartment, leaving you in the hall." },
  ],
};

export const irisEvent6Dialogues: Record<string, Dialogue> = {
  iris_finale_dom_challenge: irisFinaleDomChallenge,
  iris_finale_dom_deflect: irisFinaleDomDeflect,
  iris_finale_dom_success: irisFinaleDomSuccess,
  iris_finale_dom_fail_back: irisFinaleDomFailBack,
  iris_finale_dom_fail_lean: irisFinaleDomFailLean,
  iris_finale_sub_step_closer: irisFinaleSubStepCloser,
  iris_finale_sub_stay_back: irisFinaleSubStayBack,
  iris_finale_sub_success: irisFinaleSubSuccess,
  iris_finale_sub_fail_take_charge: irisFinaleSubFailTakeCharge,
  iris_finale_sub_fail_ask: irisFinaleSubFailAsk,
};

export const irisEvent6Events: CharacterEvent[] = [
  {
    id: "iris_chapter_1_finale_dom",
    name: "Chapter 1 Finale (Confident Iris)",
    description: "Iris confronts you in the hallway late at night.",
    quest: {
      title: "Late Night Encounters",
      description:
        "After a long day, it's time to head home. The apartment building is usually quiet at night...",
    },
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["iris_hallway_invite_event", "iris_mall_bump_dom"],
      requiredFlags: ["irisDomPath"],
    },
    dialogue: {
      id: "iris_chapter_1_finale_dom",
      lines: [
        {
          speaker: null,
          text: "It's late. The hallway is quiet, the hum of the vending machine the only sound.",
        },
        {
          speaker: null,
          text: "You're fumbling with your keys when you hear a door click open down the hall.",
        },
        {
          speaker: null,
          text: "It's Iris. She steps out, looking tired, maybe heading to check the mail one last time.",
        },
        {
          speaker: null,
          text: "She spots you and stops, a flicker of surprise crossing her face before it settles into something unreadable.",
        },
        {
          speaker: "Iris",
          text: "You're always in my way, {playerName}. Or maybe I'm in yours.",
          expression: "neutral",
        },
        { speaker: "You", text: "I live here, Iris. I'm just going home." },
        {
          speaker: null,
          text: "She stops right in front of you, blocking your path to your door. She doesn't move aside.",
        },
        { speaker: "Iris", text: "Are you? You look restless.", expression: "neutral" },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Challenge her. 'And you look like you're up to something.'",
              affectionChange: 1,
              nextDialogueId: "iris_finale_dom_challenge",
            },
            {
              text: "Deflect. 'Long day at work.'",
              affectionChange: 0,
              nextDialogueId: "iris_finale_dom_deflect",
            },
          ],
        },
      ],
    },
  },
  {
    id: "iris_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Shy Iris)",
    description: "Iris hesitates in the hallway late at night.",
    quest: {
      title: "Late Night Encounters",
      description:
        "After a long day, it's time to head home. The apartment building is usually quiet at night...",
    },
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["iris_hallway_invite_event", "iris_mall_bump_sub"],
      requiredFlags: ["irisSubPath"],
    },
    dialogue: {
      id: "iris_chapter_1_finale_sub",
      lines: [
        {
          speaker: null,
          text: "It's late. The hallway is quiet, the hum of the vending machine the only sound.",
        },
        {
          speaker: null,
          text: "You're fumbling with your keys when you hear a door click open down the hall.",
        },
        {
          speaker: null,
          text: "It's Iris. She steps out, looking tired, maybe heading to check the mail one last time.",
        },
        {
          speaker: null,
          text: "She spots you and stops, a flicker of surprise crossing her face before it settles into something unreadable.",
        },
        {
          speaker: null,
          text: "She stops a few feet away, hugging her arms around herself. She looks nervous, shifting her weight from foot to foot.",
        },
        {
          speaker: "Iris",
          text: "I... I couldn't sleep. I was just going to get some water.",
          expression: "shy",
        },
        { speaker: "You", text: "Late night for both of us then." },
        { speaker: "Iris", text: "Yeah. I guess so.", expression: "shy" },
        {
          speaker: null,
          text: "She hesitates, looking at you with a softness that catches you off guard.",
        },
        { speaker: "Iris", text: "I'm... actually glad I ran into you.", expression: "shy" },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Step closer. 'Glad? Why?'",
              affectionChange: 1,
              nextDialogueId: "iris_finale_sub_step_closer",
            },
            {
              text: "Stay back. 'Well, here I am.'",
              affectionChange: 0,
              nextDialogueId: "iris_finale_sub_stay_back",
            },
          ],
        },
      ],
    },
  },
];
