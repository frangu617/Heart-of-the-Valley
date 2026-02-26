import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 4: Hallway Invite
// Description: Iris invites you inside to meet Dawn.

const irisHallwayInviteDom: Dialogue = {
  id: "iris_hallway_invite_dom",
  lines: [
    { speaker: "Iris", text: "Great! Come on in.", expression: "happy" },
    {
      speaker: null,
      text: "Iris's apartment is warm and lived-in. Books are stacked on every surface, and there's a faint smell of vanilla.",
    },
    { speaker: "Iris", text: "Dawn? Come say hi!", expression: "happy" },
    { speaker: null, text: "Silence." },
    { speaker: "Iris", text: "Dawn?", expression: "neutral" },
    {
      speaker: null,
      text: "She checks the other room and comes back with a sigh.",
    },
    {
      speaker: "Iris",
      text: "Of course. She must be at her friend's place down the hall. I completely forgot.",
      expression: "happy",
    },
    { speaker: "You", text: "The myth remains a myth." },
    { speaker: "Iris", text: "Sorry about that. But... since you're here...", expression: "neutral" },
    {
      speaker: null,
      text: "She leans against the kitchen counter, looking at you. The atmosphere shifts slightly without the kid around.",
    },
    {
      speaker: "Iris",
      text: "It's actually nice to have you to myself for a minute.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "You know, you look different outside of the university. Less... stiff.",
      expression: "happy",
    },
    { speaker: "You", text: "I try to leave the elbow patches at the office." },
    {
      speaker: null,
      text: "She laughs, stepping closer. She enters your personal space naturally.",
    },
    { speaker: "Iris", text: "Good. I like this version.", expression: "happy" },
    {
      speaker: null,
      text: "She reaches out, straightening your collar. Her fingers linger against your neck.",
    },
    { speaker: "Iris", text: "You have a little tension right here. You should be careful.", expression: "neutral" },
    { speaker: "Iris", text: "Stress is a killer. You need to take care of yourself.", expression: "neutral" },
    { speaker: "You", text: "Are you volunteering?" },
    {
      speaker: "Iris",
      text: "Maybe. I'm very good at anatomy, remember? I know how to fix tension.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She drops her voice, her eyes locking onto yours.",
    },
    {
      speaker: "Iris",
      text: "Don't be a stranger, {playerName}. If you want company, knock.",
      expression: "seductive",
    },
    {
      speaker: null,
      text: "You step back into the hallway, her words lingering.",
      choices: [
        {
          text: "Head home",
          affectionChange: 1,
          setFlags: ["irisDomPath", "irisApartmentUnlocked"],
        },
      ],
    },
  ],
};

const irisHallwayInviteSub: Dialogue = {
  id: "iris_hallway_invite_sub",
  lines: [
    {
      speaker: "Iris",
      text: "I promise. Come on.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Iris's apartment is warm and lived-in. Books are stacked on every surface, and there's a faint smell of vanilla.",
    },
    { speaker: "Iris", text: "Dawn? Come say hi!", expression: "happy" },
    { speaker: null, text: "Silence." },
    { speaker: "Iris", text: "Dawn?", expression: "neutral" },
    {
      speaker: null,
      text: "She checks the other room and comes back with a sigh.",
    },
    {
      speaker: "Iris",
      text: "Of course. She must be at her friend's place down the hall. I completely forgot.",
      expression: "happy",
    },
    { speaker: "You", text: "The myth remains a myth." },
    { speaker: "Iris", text: "Sorry about that. But... since you're here...", expression: "neutral" },
    {
      speaker: null,
      text: "She leans against the kitchen counter, looking at you. The atmosphere shifts slightly without the kid around.",
    },
    {
      speaker: null,
      text: "Iris tucks a strand of hair behind her ear, looking a little flushed.",
    },
    {
      speaker: "Iris",
      text: "It's... actually kind of nice that she's not here. It's been a long week.",
      expression: "shy",
    },
    { speaker: null, text: "She glances at you, then quickly looks away." },
    {
      speaker: "Iris",
      text: "I don't usually invite neighbors in like this. I hope it's not weird.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "It's not weird. You look great. (Flirt)",
          affectionChange: 2,
          nextDialogueId: "iris_hallway_invite_sub_flirt",
        },
        {
          text: "It's fine. Nice place. (Friendly)",
          affectionChange: 1,
          nextDialogueId: "iris_hallway_invite_sub_friendly",
        },
      ],
    },
  ],
};

const irisHallwayInviteSubFlirt: Dialogue = {
  id: "iris_hallway_invite_sub_flirt",
  lines: [
    {
      speaker: "You",
      text: "It's not weird at all. Besides, it gives me a chance to see you relax.",
    },
    { speaker: "You", text: "You look great, Iris." },
    { speaker: null, text: "She blinks, her face turning pink." },
    {
      speaker: "Iris",
      text: "Oh! Thank you. I... I wasn't expecting...",
      expression: "surprised",
    },
    { speaker: null, text: "She smiles, biting her lip." },
    {
      speaker: "Iris",
      text: "I'm glad you came in. Really.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Well... I shouldn't keep you. I'm sure you have things to do.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But maybe we can do this again? Intentionally next time?",
      expression: "shy",
    },
    { speaker: "You", text: "I'd like that." },
    {
      speaker: null,
      text: "You step back into the hallway, her smile still warming your chest.",
      choices: [
        {
          text: "Head home",
          affectionChange: 0,
          setFlags: ["irisSubPath", "irisApartmentUnlocked"],
        },
      ],
    },
  ],
};

const irisHallwayInviteSubFriendly: Dialogue = {
  id: "iris_hallway_invite_sub_friendly",
  lines: [
    { speaker: "You", text: "Not weird. You have a nice place here." },
    { speaker: "Iris", text: "Thanks. It's chaotic, but it's home.", expression: "happy" },
    {
      speaker: "Iris",
      text: "Well... I shouldn't keep you. I'm sure you have things to do.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But maybe we can do this again? Intentionally next time?",
      expression: "shy",
    },
    { speaker: "You", text: "I'd like that." },
    {
      speaker: null,
      text: "You step back into the hallway, her voice still in your ears.",
      choices: [
        {
          text: "Head home",
          affectionChange: 0,
          setFlags: ["irisSubPath", "irisApartmentUnlocked"],
        },
      ],
    },
  ],
};

export const irisEvent4Dialogues: Record<string, Dialogue> = {
  iris_hallway_invite_dom: irisHallwayInviteDom,
  iris_hallway_invite_sub: irisHallwayInviteSub,
  iris_hallway_invite_sub_flirt: irisHallwayInviteSubFlirt,
  iris_hallway_invite_sub_friendly: irisHallwayInviteSubFriendly,
};

export const irisEvent4Events: CharacterEvent[] = [
  {
    id: "iris_hallway_invite_event",
    name: "Hallway Invite",
    description: "Iris invites you inside to meet Dawn.",
    quest: {
      title: "Neighborly Introduction",
      description:
        "You've gotten to know Iris a little. Maybe you'll see her around the apartment building.",
    },
    priority: 230,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["irisCoffeeMet"],
    },
    dialogue: {
      id: "iris_hallway_invite_event",
      lines: [
        {
          speaker: null,
          text: "You are walking down the hallway, fumbling with your keys, when a door opens a few feet away.",
        },
        {
          speaker: null,
          text: "Iris steps out, holding a trash bag. She spots you and freezes, then breaks into a smile.",
        },
        {
          speaker: "Iris",
          text: "Oh! {playerName}. I keep forgetting we're neighbors.",
          expression: "happy",
        },
        { speaker: "You", text: "Hard to miss me. I'm the one making noise at 2 AM." },
        { speaker: "Iris", text: "Actually, that's usually me. Grading papers.", expression: "happy" },
        { speaker: null, text: "She tosses the bag into the chute and wipes her hands." },
        {
          speaker: "Iris",
          text: "You know, you should come in for a second. I've been meaning to introduce you to my daughter, Dawn.",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "She's heard me talk about the 'Coffee Shirt Guy' enough times. She thinks you're a myth.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "I'd love to meet her.",
              affectionChange: 1,
              nextDialogueId: "iris_hallway_invite_dom",
            },
            {
              text: "Sure, if you promise no coffee spills.",
              affectionChange: 1,
              nextDialogueId: "iris_hallway_invite_sub",
            },
          ],
        },
      ],
    },
  },
];
