import type { Dialogue } from "../../dialogues";
import { CharacterEvent } from "../types";

const gwenEvent2Help: Dialogue = {
  id: "gwen_event_2_help",
  lines: [
    { speaker: "You", text: "Here, let me hold that before you wear it." },
    {
      speaker: null,
      text: "You take the cup from her hand. She flashes you a grateful, slightly superior smile.",
    },
    {
      speaker: "Gwen",
      text: "My hero. Careful, it's a double shot. Don't spill it.",
      expression: "happy",
    },
    { speaker: null, text: "She unlocks the door quickly, then reclaims her drink." },
    { speaker: "Gwen", text: "Thanks. You're handy to have around.", expression: "happy" },
    {
      speaker: "Gwen",
      text: "Anyway, I gotta run. Catch you later, {playerName}.",
      expression: "happy",
    },
  ],
};

const gwenEvent2Tease: Dialogue = {
  id: "gwen_event_2_tease",
  lines: [
    { speaker: "You", text: "You look like a juggling act gone wrong. Need me to spot you?" },
    { speaker: null, text: "She rolls her eyes, but there's a smirk playing on her lips." },
    {
      speaker: "Gwen",
      text: "I have it under control, thanks. I'm a professional.",
      expression: "annoyed",
    },
    { speaker: null, text: "She manages to unlock the door with a dramatic flourish." },
    { speaker: "Gwen", text: "See? Flawless execution.", expression: "happy" },
    {
      speaker: "Gwen",
      text: "Anyway, I gotta run. Catch you later, {playerName}.",
      expression: "happy",
    },
  ],
};

const gwenEvent3Sheer: Dialogue = {
  id: "gwen_event_3_sheer",
  lines: [
    { speaker: "You", text: "The sheer one. Definitely." },
    { speaker: "You", text: "If you've got it, flaunt it. And you definitely have it." },
    {
      speaker: null,
      text: "Gwen lowers the top, looking at you with a new spark of interest.",
    },
    {
      speaker: "Gwen",
      text: "Bold choice. I like it. I didn't think you noticed those kinds of things.",
      expression: "seductive",
    },
    {
      speaker: "Gwen",
      text: "Maybe I'll wear it just for you sometime.",
      expression: "seductive",
    },
  ],
};

const gwenEvent3Blouse: Dialogue = {
  id: "gwen_event_3_blouse",
  lines: [
    { speaker: "You", text: "The blouse. Leave a little mystery." },
    { speaker: "You", text: "You don't need the sheer top to be the best thing in the room." },
    {
      speaker: null,
      text: "She blinks, actually looking a little flustered by the compliment.",
    },
    {
      speaker: "Gwen",
      text: "Oh. Well... okay then. Mystery it is.",
      expression: "surprised",
    },
    { speaker: null, text: "She tosses the sheer top onto the couch, smiling at you softly." },
    { speaker: "Gwen", text: "You're surprisingly good at this.", expression: "happy" },
  ],
};

export const gwenStoryDialogues: Record<string, Dialogue> = {
  gwen_event_2_help: gwenEvent2Help,
  gwen_event_2_tease: gwenEvent2Tease,
  gwen_event_3_sheer: gwenEvent3Sheer,
  gwen_event_3_blouse: gwenEvent3Blouse,
};

export const gwenEvents: CharacterEvent[] = [
  {
    id: "gwen_hallway_intro_event",
    name: "Hallway Intro",
    description: "Meet Gwen for the first time in the hallway.",
    priority: 240,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Hallway",
    },
    dialogue: {
      id: "gwen_hallway_intro_event",
      lines: [
        {
          speaker: null,
          text: "You push open the door to your building's hallway and nearly collide with someone stepping out at the same time.",
        },
        {
          speaker: "Gwen",
          text: "Whoa--! Hey--sorry! That was almost a full-on hallway tackle.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "You must be the new guy. I thought I heard someone moving in.",
          expression: "happy",
        },
        { speaker: "You", text: "Yeah. Just getting settled." },
        {
          speaker: "Gwen",
          text: "Nice. Fresh blood. That's always fun.",
          expression: "excited",
        },
        {
          speaker: "Gwen",
          text: "I mean--uh--new neighbors are good. For the building. Wow. Strong start, Gwen.",
          expression: "shy",
        },
        { speaker: "You", text: "I'll pretend I didn't hear that." },
        { speaker: "Gwen", text: "Appreciated. I'm Gwen.", expression: "happy" },
        {
          speaker: "Gwen",
          text: "I live right down the hall. If you get lost, locked out... lonely...",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "I'm an occasional rescuer of lone neighbors.",
          expression: "excited",
        },
        { speaker: "Gwen", text: "For a price.", expression: "shy" },
        {
          speaker: "Gwen",
          text: "--Wow, that sounded way dirtier than I meant it to.",
          expression: "shy",
        },
        { speaker: "You", text: "I was going to ask what the price was." },
        {
          speaker: "Gwen",
          text: "See? Now I've legally made it weird.",
          expression: "annoyed",
        },
        {
          speaker: "Gwen",
          text: "Let's reset. Neighborly help is free. The other stuff depends on my mood.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "And what do you do when you're not rescuing neighbors?",
        },
        {
          speaker: "Gwen",
          text: "Night shift work. Lots of music. Lots of lights.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "Lot of people who don't know how to look without staring.",
          expression: "shy",
        },
        { speaker: "You", text: "That sounds... busy." },
        {
          speaker: "Gwen",
          text: "Oh, it is. But it pays the rent and the weird hobbies.",
          expression: "excited",
        },
        {
          speaker: "Gwen",
          text: "You'll probably hear me coming home at dumb hours sometimes. Just pretend I'm a very normal, very responsible adult.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "I won't judge your hours if you don't judge mine.",
        },
        { speaker: "Gwen", text: "Deal.", expression: "happy" },
        {
          speaker: "Gwen",
          text: "Anyway... welcome to the building, mystery neighbor.",
          expression: "shy",
        },
        {
          speaker: "Gwen",
          text: "Try not to stay one for too long.",
          expression: "happy",
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetGwen"],
      unlockCharacters: ["Gwen"],
    },
  },
  {
    id: "gwen_event_2_routine",
    name: "The Routine",
    description: "A quick hallway chat as Gwen heads out.",
    priority: 230,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["gwen_hallway_intro_event"],
    },
    dialogue: {
      id: "gwen_event_2_routine",
      lines: [
        {
          speaker: null,
          text: "You step out of your apartment, locking the door behind you. The hallway is quiet, save for the rhythmic clicking of heels approaching.",
        },
        {
          speaker: null,
          text: "Gwen rounds the corner, looking immaculate as always. She's checking her phone, a takeout coffee balanced precariously in her other hand.",
        },
        {
          speaker: "Gwen",
          text: "Morning, neighbor. You're up early.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "Trying to be. You look like you've been up for hours.",
        },
        {
          speaker: "Gwen",
          text: "The grind doesn't wait for beauty sleep. I've got a casting call across town in forty minutes.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She stops at her door, fumbling with her keys while trying not to spill her coffee.",
        },
        { speaker: "Gwen", text: "Ugh. Multitasking is a myth.", expression: "neutral" },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Take the coffee for her (Helpful/Submissive)",
              affectionChange: 1,
              nextDialogueId: "gwen_event_2_help",
            },
            {
              text: "Tease her struggle (Playful/Dominant)",
              affectionChange: 1,
              nextDialogueId: "gwen_event_2_tease",
            },
          ],
        },
      ],
    },
  },
  {
    id: "gwen_event_3_playful",
    name: "The Playful Shift",
    description: "Gwen asks for a wardrobe opinion.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["gwen_event_2_routine"],
    },
    dialogue: {
      id: "gwen_event_3_playful",
      lines: [
        {
          speaker: null,
          text: "Gwen waved you in when you walked past. Her apartment is a chaotic mix of expensive clothes and fitness gear.",
        },
        {
          speaker: null,
          text: "She is standing in front of a full-length mirror, holding up two different tops against herself.",
        },
        {
          speaker: "Gwen",
          text: "Okay, neighbor. I need a male opinion. And don't just say 'they both look fine'.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She holds up a conservative blouse, then a much daring, sheer top.",
        },
        {
          speaker: "Gwen",
          text: "I'm meeting some... friends later. I want to look like I'm not trying too hard, but also like I'm the best thing in the room.",
          expression: "neutral",
        },
        { speaker: "You", text: "That's a specific vibe." },
        { speaker: "Gwen", text: "It's my brand. So? Which one?", expression: "happy" },
        {
          speaker: "You",
          text: "What do you say?",
          choices: [
            {
              text: "The sheer top. It shows off your confidence. (Bold/Lust Hint)",
              affectionChange: 2,
              moodChange: 1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_event_3_sheer",
            },
            {
              text: "The blouse. Make them work for it. (Teasing/Dominant)",
              affectionChange: 2,
              moodChange: 1,
              setFlags: ["gwenSubPath"],
              nextDialogueId: "gwen_event_3_blouse",
            },
          ],
        },
      ],
    },
  },
  {
    id: "gwen_event_4_tension",
    name: "High Tension",
    description: "A near miss in the hallway late at night.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 15,
      minTrust: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["gwen_event_3_playful"],
    },
    dialogue: {
      id: "gwen_event_4_tension",
      lines: [
        {
          speaker: null,
          text: "It's late. You're heading back to your apartment when you nearly collide with Gwen coming out of hers.",
        },
        { speaker: "Gwen", text: "Whoa!", expression: "surprised" },
        {
          speaker: null,
          text: "She stumbles back on a high heel. Instinctively, you reach out to catch her, grabbing her waist to steady her.",
        },
        {
          speaker: null,
          text: "She grips your shoulders, her breath hitching.",
        },
        {
          speaker: null,
          text: "For a moment, neither of you moves. She is pressed against you, the scent of her perfume--something spicy and sweet--filling your senses.",
        },
        {
          speaker: "Gwen",
          text: "I... I didn't see you there.",
          expression: "neutral",
        },
        { speaker: "You", text: "I noticed. You okay?" },
        {
          speaker: null,
          text: "She doesn't step back immediately. Her hands tighten slightly on your shoulders.",
        },
        { speaker: "Gwen", text: "Yeah. I'm... yeah.", expression: "neutral" },
        {
          speaker: null,
          text: "The air between you feels heavy, charged with static. You could lean in right now. It would be so easy.",
        },
        {
          speaker: "Gwen",
          text: "You have really strong hands, {playerName}.",
          expression: "shy",
        },
        { speaker: null, text: "She whispers it, almost to herself. Then, the moment breaks." },
        {
          speaker: "Gwen",
          text: "Thanks for the save. I really need to stop wearing these shoes.",
          expression: "happy",
        },
      ],
    },
  },
  {
    id: "gwen_chapter_1_finale_dom",
    name: "Chapter 1 Finale (Teasing Gwen)",
    description: "Gwen rewards you with a teasing kiss.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 20,
      minTrust: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["gwen_event_4_tension"],
      requiredFlags: ["gwenDomPath"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale_dom",
      lines: [
        { speaker: null, text: "Gwen is leaning against her doorframe, waiting." },
        {
          speaker: "Gwen",
          text: "You know, you've been a very good neighbor lately. I think you've earned a little reward.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She walks up and hooks a finger into your belt loop, pulling you close with a playful smirk.",
        },
        {
          speaker: "Gwen",
          text: "Don't get used to this, Professor.",
          expression: "seductive",
        },
        {
          speaker: null,
          text: "She kisses you--a skilled, teasing kiss that leaves you wanting more.",
        },
        { speaker: "Gwen", text: "I... I can't. This is too much.", expression: "surprised" },
        { speaker: null, text: "She fumbles with her door and slams it shut." },
      ],
    },
  },
  {
    id: "gwen_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Sincere Gwen)",
    description: "Gwen opens up and shares a tender moment.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 20,
      minTrust: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["gwen_event_4_tension"],
      requiredFlags: ["gwenSubPath"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale_sub",
      lines: [
        { speaker: null, text: "Gwen is leaning against her doorframe, waiting." },
        {
          speaker: "Gwen",
          text: "I'm tired of the mask, {playerName}. I just want someone to look at me and actually... see me.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She looks up at you, her eyes glistening. You reach out, gently cupping her face.",
        },
        { speaker: "You", text: "I see you, Gwen." },
        {
          speaker: null,
          text: "You lean in for a slow, tender kiss. She shudders in your arms, clutching your shirt as if you're her only anchor.",
        },
        { speaker: "Gwen", text: "I... I can't. This is too much.", expression: "surprised" },
        { speaker: null, text: "She fumbles with her door and slams it shut." },
      ],
    },
  },
];
