import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Hallway Intro
// Description: First meeting with Gwen in the hallway with a guarded-but-curious tone.
//
// FLOW MAP
// EVENT START: gwen_hallway_intro_event (Hallway, any time, hasMetIris+hasMetYumi+hasMetRuby)
//   - [Greet her first.] -> gwen_intro_player_lead
//   - [Wait for her to greet you first.] -> gwen_intro_gwen_lead
// gwen_intro_player_lead
//   - [Offer coffee when schedules line up.] -> gwen_intro_player_close_warm
//   - [Keep it polite and brief.] -> gwen_intro_player_close_neutral
//   - [Light tease.] -> gwen_intro_player_close_tease
// gwen_intro_gwen_lead
//   - [Match her pace and offer coffee.] -> gwen_intro_gwen_close_warm
//   - [Play it safe and wish her luck.] -> gwen_intro_gwen_close_neutral
//   - [Push a little and tease.] -> gwen_intro_gwen_close_tease
// Rewards: hasMetGwen, gwenIntroDone

// FROM: gwen_hallway_intro_event -> [Greet her first.]
const gwenIntroPlayerLead: Dialogue = {
  id: "gwen_intro_player_lead",
  lines: [
    { speaker: "You", text: "Hey. I just moved in. I'm {playerName}." },
    {
      speaker: "Gwen",
      text: "Gwen. Yeah, figured you were the new neighbor.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She keeps her voice even, guarded, but she does not walk away.",
    },
    {
      speaker: "Gwen",
      text: "Building this small means we'll run into each other a lot. Weird hours included.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Might as well stay on speaking terms.",
      expression: "shy",
    },
    {
      speaker: "Gwen",
      text: "I work nights at the cl... never mind. Long shifts.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "What about you? What do you do?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I teach programming at the university. First day was today.",
    },
    {
      speaker: "Gwen",
      text: "New teacher, new apartment. That's a lot at once.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "A small silence lands between you. It feels awkward in the exact way old friends can feel awkward after years apart.",
    },
    {
      speaker: "You",
      text: "How do you handle the first-meeting awkwardness?",
      choices: [
        {
          text: "Offer coffee when schedules line up.",
          affectionChange: 2,
          dominanceChange: -1,
          nextDialogueId: "gwen_intro_player_close_warm",
        },
        {
          text: "Keep it polite and brief.",
          affectionChange: 0,
          nextDialogueId: "gwen_intro_player_close_neutral",
        },
        {
          text: "Light tease: hallway got better today.",
          affectionChange: 1,
          lustChange: 1,
          nextDialogueId: "gwen_intro_player_close_tease",
        },
      ],
    },
  ],
};

// FROM: gwen_hallway_intro_event -> [Wait for her to greet you first.]
const gwenIntroGwenLead: Dialogue = {
  id: "gwen_intro_gwen_lead",
  lines: [
    {
      speaker: "Gwen",
      text: "You're the new one across the hall, right?",
      expression: "neutral",
    },
    { speaker: "You", text: "Yeah. {playerName}." },
    {
      speaker: "Gwen",
      text: "Gwen.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She holds eye contact for a second, then glances away first like she said more than she meant to.",
    },
    {
      speaker: "Gwen",
      text: "We're probably going to keep seeing each other. Building's small. Schedules are weird.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "I do night work at the cl... forget it. Long story.",
      expression: "shy",
    },
    {
      speaker: "Gwen",
      text: "What about you?",
      expression: "neutral",
    },
    { speaker: "You", text: "I teach programming. Just started." },
    {
      speaker: "Gwen",
      text: "Teacher. Got it.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "The pause that follows feels familiar in a strange way, like both of you are trying to pick up a conversation that never happened.",
    },
    {
      speaker: "You",
      text: "What do you do with that pause?",
      choices: [
        {
          text: "Match her pace and offer coffee sometime.",
          affectionChange: 2,
          dominanceChange: -1,
          nextDialogueId: "gwen_intro_gwen_close_warm",
        },
        {
          text: "Play it safe and wish her luck.",
          affectionChange: 0,
          nextDialogueId: "gwen_intro_gwen_close_neutral",
        },
        {
          text: "Push a little: finish that job sentence next time.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "gwen_intro_gwen_close_tease",
        },
      ],
    },
  ],
};

// FROM: gwen_intro_player_lead -> [Offer coffee when schedules line up.]
const gwenIntroPlayerCloseWarm: Dialogue = {
  id: "gwen_intro_player_close_warm",
  lines: [
    { speaker: "You", text: "If your schedule ever lines up, coffee's on me." },
    {
      speaker: "Gwen",
      text: "Maybe. I don't do cheerful mornings, but I can do coffee.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Her expression softens for a beat before she pulls her guard back into place.",
    },
    {
      speaker: "Gwen",
      text: "See you around, {playerName}.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You split in opposite directions, both glancing back once like you forgot one line each.",
    },
  ],
};

// FROM: gwen_intro_player_lead -> [Keep it polite and brief.]
const gwenIntroPlayerCloseNeutral: Dialogue = {
  id: "gwen_intro_player_close_neutral",
  lines: [
    { speaker: "You", text: "Nice meeting you, Gwen. See you around." },
    {
      speaker: "Gwen",
      text: "Yeah. See you around.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She gives a short nod and slips back behind a practiced calm, not cold, just careful.",
    },
  ],
};

// FROM: gwen_intro_player_lead -> [Light tease.]
const gwenIntroPlayerCloseTease: Dialogue = {
  id: "gwen_intro_player_close_tease",
  lines: [
    { speaker: "You", text: "For the record, this hallway got better today." },
    {
      speaker: "Gwen",
      text: "Careful. That's almost charming.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She shakes her head, but the smile stays while she turns away.",
    },
    {
      speaker: "Gwen",
      text: "Don't waste all your good lines in a stairwell.",
      expression: "happy",
    },
  ],
};

// FROM: gwen_intro_gwen_lead -> [Match her pace and offer coffee sometime.]
const gwenIntroGwenCloseWarm: Dialogue = {
  id: "gwen_intro_gwen_close_warm",
  lines: [
    { speaker: "You", text: "If you ever want a quiet coffee, let me know." },
    {
      speaker: "Gwen",
      text: "Quiet coffee sounds... unexpectedly nice.",
      expression: "shy",
    },
    {
      speaker: "Gwen",
      text: "No promises on timing, but I'll take the offer.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She starts to leave, then pauses like she almost says one more thing and decides to save it.",
    },
  ],
};

// FROM: gwen_intro_gwen_lead -> [Play it safe and wish her luck.]
const gwenIntroGwenCloseNeutral: Dialogue = {
  id: "gwen_intro_gwen_close_neutral",
  lines: [
    { speaker: "You", text: "Good luck with your shifts." },
    {
      speaker: "Gwen",
      text: "Thanks. Good luck with the new job.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "The moment ends cleanly, almost formal, but not unfriendly.",
    },
  ],
};

// FROM: gwen_intro_gwen_lead -> [Push a little: finish that job sentence next time.]
const gwenIntroGwenCloseTease: Dialogue = {
  id: "gwen_intro_gwen_close_tease",
  lines: [
    { speaker: "You", text: "You can finish that job sentence next time." },
    {
      speaker: "Gwen",
      text: "Maybe. Depends if you earn chapter two.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She says it lightly, then steps away before you can tell if she meant it as a joke, or a promise.",
    },
  ],
};

export const gwenEvent1Dialogues: Record<string, Dialogue> = {
  gwen_intro_player_lead: gwenIntroPlayerLead,
  gwen_intro_gwen_lead: gwenIntroGwenLead,
  gwen_intro_player_close_warm: gwenIntroPlayerCloseWarm,
  gwen_intro_player_close_neutral: gwenIntroPlayerCloseNeutral,
  gwen_intro_player_close_tease: gwenIntroPlayerCloseTease,
  gwen_intro_gwen_close_warm: gwenIntroGwenCloseWarm,
  gwen_intro_gwen_close_neutral: gwenIntroGwenCloseNeutral,
  gwen_intro_gwen_close_tease: gwenIntroGwenCloseTease,
};

export const gwenEvent1Events: CharacterEvent[] = [
  {
    id: "gwen_hallway_intro_event",
    name: "Hallway Intro",
    description: "Meet Gwen for the first time in the hallway.",
    quest: {
      title: "Meet the Neighbor",
      description: "Check the hallway after you've met Iris, Yumi, and Ruby.",
    },
    priority: 240,
    repeatable: false,
    conditions: {
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["hasMetIris", "hasMetYumi", "hasMetRuby"],
    },
    dialogue: {
      id: "gwen_hallway_intro_event",
      lines: [
        {
          speaker: null,
          text: "The hallway is quiet for once. A woman in a dark hoodie stands by the mailboxes, keys looped around one finger.",
        },
        {
          speaker: null,
          text: "She looks up as you step out. Black clothes, smudged eyeliner, guarded posture.",
        },
        {
          speaker: "You",
          text: "Different style, same result: she's beautiful.",
          isThought: true,
        },
        {
          speaker: null,
          text: "For a second it feels like you've met before, not in facts, just in rhythm.",
        },
        {
          speaker: "You",
          text: "Who breaks the silence?",
          choices: [
            {
              text: "Greet her first.",
              affectionChange: 1,
              dominanceChange: -1,
              nextDialogueId: "gwen_intro_player_lead",
            },
            {
              text: "Wait for her to greet you first.",
              affectionChange: 0,
              dominanceChange: 1,
              nextDialogueId: "gwen_intro_gwen_lead",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetGwen", "gwenIntroDone"],
      unlockCharacters: ["Gwen"],
    },
  },
];
