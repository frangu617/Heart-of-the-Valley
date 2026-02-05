import type { Dialogue } from "../../dialogues";
import { CharacterEvent } from "../types";

const gwenIntroPlayAlong: Dialogue = {
  id: "gwen_intro_play_along",
  lines: [
    { speaker: "You", text: "I was going to ask what the price was." },
    { speaker: "Gwen", text: "See? It's working already.", expression: "annoyed" },
    { speaker: null, text: "She checks you with a quick, appraising look." },
    {
      speaker: "Gwen",
      text: "Alright, mystery neighbor. You're a good sport.",
      expression: "happy",
      nextDialogueId: "gwen_intro_after_choice",
    },
  ],
};

const gwenIntroCallOut: Dialogue = {
  id: "gwen_intro_call_out",
  lines: [
    { speaker: "You", text: "You don't have to run a line on me. Just tell me what you need." },
    {
      speaker: "Gwen",
      text: "I do what works. Saves time and gets answers.",
      expression: "annoyed",
    },
    {
      speaker: "Gwen",
      text: "I keep weird hours. I prefer the neighbor knowing that up front.",
      expression: "neutral",
      nextDialogueId: "gwen_intro_after_choice",
    },
  ],
};

const gwenIntroNeighborly: Dialogue = {
  id: "gwen_intro_neighborly",
  lines: [
    { speaker: "You", text: "No worries. I'm not the complaint type." },
    { speaker: "Gwen", text: "Good. I'll keep the power tools to a minimum.", expression: "happy" },
    {
      speaker: "Gwen",
      text: "You and I will get along just fine.",
      expression: "neutral",
      nextDialogueId: "gwen_intro_after_choice",
    },
  ],
};

const gwenIntroAfterChoice: Dialogue = {
  id: "gwen_intro_after_choice",
  lines: [
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
      expression: "annoyed",
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
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Try not to stay one for too long.",
      expression: "happy",
    },
  ],
};

const gwenEvent2DoorSupportive: Dialogue = {
  id: "gwen_event_2_door_supportive",
  lines: [
    { speaker: "You", text: "Come on. Let's get you to the right door." },
    {
      speaker: "Gwen",
      text: "You're annoyingly helpful, you know that?",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Don't tell anyone about this. I have a reputation to maintain.",
      expression: "neutral",
    },
    { speaker: "You", text: "Your secret's safe." },
    {
      speaker: null,
      text: "She gets her key into the right lock on the first try this time, shooting you a quick, triumphant grin before slipping inside.",
    },
  ],
};

const gwenEvent2DoorAngry: Dialogue = {
  id: "gwen_event_2_door_angry",
  lines: [
    { speaker: "You", text: "You just woke me up. Don't do that again." },
    {
      speaker: "Gwen",
      text: "Yeah. Fine.",
      expression: "annoyed",
    },
    {
      speaker: "Gwen",
      text: "We're square.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She gets her key into the right lock on the first try this time and slips inside without looking back.",
    },
  ],
};

const gwenEvent3ApologySupportive: Dialogue = {
  id: "gwen_event_3_apology_supportive",
  lines: [
    { speaker: "You", text: "You're good. It was a weird night." },
    {
      speaker: "Gwen",
      text: "Good. I don't like owing people.",
      expression: "neutral",
    },
    { speaker: "You", text: "Call it even." },
    { speaker: "Gwen", text: "It is now.", expression: "happy" },
  ],
};

const gwenEvent3ApologyIrritated: Dialogue = {
  id: "gwen_event_3_apology_irritated",
  lines: [
    { speaker: "You", text: "You woke me up. Don't do that again." },
    {
      speaker: "Gwen",
      text: "Noted.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Won't happen.",
      expression: "neutral",
    },
  ],
};

const gwenEvent5Discreet: Dialogue = {
  id: "gwen_event_5_discreet",
  lines: [
    { speaker: "You", text: "Your secret's safe." },
    {
      speaker: "Gwen",
      text: "Good. Then listen.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "In here, I'm working. Out there, we're neighbors.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Keep it that clean and we're fine.",
      expression: "annoyed",
    },
    {
      speaker: null,
      text: "She studies you for a beat, then nods.",
      nextDialogueId: "gwen_event_5_after",
    },
  ],
};

const gwenEvent5Lead: Dialogue = {
  id: "gwen_event_5_lead",
  lines: [
    { speaker: "You", text: "Give me the rules." },
    {
      speaker: "Gwen",
      text: "Smart answer. I call the shots.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "In here, I'm working. Out there, we talk if I say so.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She tilts her chin, waiting to see if you flinch.",
      nextDialogueId: "gwen_event_5_after",
    },
  ],
};

const gwenEvent5Blackmail: Dialogue = {
  id: "gwen_event_5_blackmail",
  lines: [
    { speaker: "You", text: "Maybe. Depends what I get out of it." },
    {
      speaker: "Gwen",
      text: "That's what we're doing? Seriously?",
      expression: "annoyed",
    },
    {
      speaker: "Gwen",
      text: "Fine. You want leverage, you got it. But don't push it.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her stare is steady, the smile gone.",
      nextDialogueId: "gwen_event_5_after_blackmail",
    },
  ],
};

const gwenEvent5After: Dialogue = {
  id: "gwen_event_5_after",
  lines: [
    {
      speaker: null,
      text: "Her voice drops, the performer gone.",
    },
    {
      speaker: "Gwen",
      text: "I'm not looking for a savior. I just need discretion.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "If you can do that, maybe we can talk when I'm off the clock.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She taps your chest once, then slips backstage.",
    },
  ],
};

const gwenEvent5AfterBlackmail: Dialogue = {
  id: "gwen_event_5_after_blackmail",
  lines: [
    {
      speaker: "Gwen",
      text: "You keep quiet, we both keep breathing. That's the deal.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She turns to leave, then pauses.",
    },
    {
      speaker: "Gwen",
      text: "Don't make me regret letting you in on this.",
      expression: "neutral",
    },
  ],
};

const gwenFinaleSupportive: Dialogue = {
  id: "gwen_finale_supportive",
  lines: [
    {
      speaker: "You",
      text: "You can trust me.",
    },
    {
      speaker: "Gwen",
      text: "I didn't think I could, but... I do.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She closes the space and kisses you. It's quick, real, and not for show.",
    },
  ],
};

const gwenFinaleHush: Dialogue = {
  id: "gwen_finale_hush",
  lines: [
    { speaker: "You", text: "Then show me you mean it." },
    {
      speaker: "Gwen",
      text: "Clear enough.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She kisses you once, controlled and transactional.",
    },
    {
      speaker: "Gwen",
      text: "Now keep your word.",
      expression: "neutral",
    },
  ],
};

export const gwenStoryDialogues: Record<string, Dialogue> = {
  gwen_intro_play_along: gwenIntroPlayAlong,
  gwen_intro_call_out: gwenIntroCallOut,
  gwen_intro_neighborly: gwenIntroNeighborly,
  gwen_intro_after_choice: gwenIntroAfterChoice,
  gwen_event_2_door_supportive: gwenEvent2DoorSupportive,
  gwen_event_2_door_angry: gwenEvent2DoorAngry,
  gwen_event_3_apology_supportive: gwenEvent3ApologySupportive,
  gwen_event_3_apology_irritated: gwenEvent3ApologyIrritated,
  gwen_event_5_discreet: gwenEvent5Discreet,
  gwen_event_5_lead: gwenEvent5Lead,
  gwen_event_5_blackmail: gwenEvent5Blackmail,
  gwen_event_5_after: gwenEvent5After,
  gwen_event_5_after_blackmail: gwenEvent5AfterBlackmail,
  gwen_finale_supportive: gwenFinaleSupportive,
  gwen_finale_hush: gwenFinaleHush,
};

export const gwenEvents: CharacterEvent[] = [
  {
    id: "gwen_hallway_intro_event",
    name: "Hallway Intro",
    description: "Meet Gwen for the first time in the hallway.",
    quest: {
      title: "Meet the Neighbor",
      description:
        "Check the hallway after you've met Iris, Yumi, and Ruby.",
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
          speaker: null,
          text: "She says it a little too brightly, like she's testing a line.",
        },
        {
          speaker: "Gwen",
          text: "I mean--new neighbors are good. For the building. Strong start, Gwen.",
          expression: "neutral",
        },
        { speaker: "You", text: "I'll pretend I didn't hear that." },
        { speaker: "Gwen", text: "Appreciated. I'm Gwen.", expression: "happy" },
        {
          speaker: "Gwen",
          text: "I live right down the hall. If you get lost, locked out... lonely...",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "Her smile goes a touch too polished, like she wants the line to land.",
        },
        {
          speaker: "Gwen",
          text: "I'm an occasional rescuer of lone neighbors.",
          expression: "excited",
        },
        { speaker: "Gwen", text: "For a price.", expression: "happy" },
        {
          speaker: null,
          text: "She holds your gaze, the flirt settling into place.",
        },
        {
          speaker: "Gwen",
          text: "It's my job to make first impressions land.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "Truth is, I keep weird hours. Better you know that now.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Play along with the flirt.",
              affectionChange: 1,
              nextDialogueId: "gwen_intro_play_along",
            },
            {
              text: "Call it out gently.",
              affectionChange: 0,
              nextDialogueId: "gwen_intro_call_out",
            },
            {
              text: "Keep it neighborly.",
              affectionChange: 0,
              nextDialogueId: "gwen_intro_neighborly",
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
  {
    id: "gwen_event_2_door_mixup",
    name: "Door Mixup",
    description: "Gwen mistakes your door for hers after a late night.",
    quest: {
      title: "Late-Night Mixup",
      description: "Be in the hallway late at night (10 PM–midnight).",
    },
    priority: 235,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minHour: 22,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenIntroDone"],
    },
    dialogue: {
      id: "gwen_event_2_door_mixup",
      lines: [
        {
          speaker: null,
          text: "A heavy thud jars you awake. Another. Then a frustrated sigh outside your door.",
        },
        {
          speaker: null,
          text: "You crack it open to find Gwen swaying slightly, purse on one arm, keys in the other, squinting at your lock like it owes her money.",
        },
        { speaker: "Gwen", text: "Okay, door. Don't do this to me right now.", expression: "annoyed" },
        { speaker: "You", text: "Uh... Gwen?" },
        {
          speaker: "Gwen",
          text: "Why are you in my apartment?",
          expression: "annoyed",
        },
        { speaker: "You", text: "I'm not. This is my door." },
        {
          speaker: "Gwen",
          text: "No, it isn't. My door does this sticky thing. It's... a feature.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She leans in, peering past you like she's expecting to see her living room behind you.",
        },
        { speaker: "You", text: "You're on the wrong side of the hall." },
        {
          speaker: "Gwen",
          text: "I'm on the right side of the night.",
          expression: "happy",
        },
        { speaker: "You", text: "You're also a little drunk." },
        {
          speaker: "Gwen",
          text: "I'm... socially lubricated. There's a difference.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She frowns at the number on the door, then at you, then at the number again.",
        },
        {
          speaker: "Gwen",
          text: "Fine. Maybe you're in my apartment adjacent.",
          expression: "annoyed",
        },
        { speaker: "You", text: "Close enough. Let me walk you to the right one." },
        {
          speaker: null,
          text: "She hesitates, then allows it, letting you guide her two steps down the hall.",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Be understanding and walk her to the right door.",
              affectionChange: 1,
              nextDialogueId: "gwen_event_2_door_supportive",
            },
            {
              text: "Get on her for waking you up.",
              affectionChange: -1,
              nextDialogueId: "gwen_event_2_door_angry",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwenDoorMixupDone"],
    },
  },
  {
    id: "gwen_event_3_apology",
    name: "Quick Apology",
    description: "Gwen stops by after the door mixup.",
    quest: {
      title: "Gwen's Apology",
      description: "Check the hallway during the day (8 AM–8 PM).",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minHour: 8,
      maxHour: 20,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenDoorMixupDone"],
    },
    dialogue: {
      id: "gwen_event_3_apology",
      lines: [
        {
          speaker: null,
          text: "A soft knock in the afternoon pulls you to the door.",
        },
        {
          speaker: null,
          text: "Gwen stands there in sunglasses, hair up, a coffee in hand.",
        },
        {
          speaker: "Gwen",
          text: "About the other night. I woke you up.",
          expression: "neutral",
        },
        { speaker: "You", text: "You were trying to open my door." },
        {
          speaker: "Gwen",
          text: "Yeah. That one's on me.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "Just making sure we're good.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "We're good.",
              affectionChange: 1,
              nextDialogueId: "gwen_event_3_apology_supportive",
            },
            {
              text: "Don't let it happen again.",
              affectionChange: -1,
              nextDialogueId: "gwen_event_3_apology_irritated",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwenApologyDone"],
    },
  },
  {
    id: "gwen_event_4_rumor",
    name: "The Rumor",
    description: "You hear about a dancer at the strip club.",
    quest: {
      title: "A Bar Rumor",
      description: "Visit the bar in the evening (6 PM–midnight).",
    },
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredFlags: ["gwenApologyDone"],
    },
    dialogue: {
      id: "gwen_event_4_rumor",
      lines: [
        {
          speaker: null,
          text: "Later that week, you're at the bar when a pair of patrons lean in, whispering over their drinks.",
        },
        {
          speaker: null,
          text: "They talk about a dancer at the Strip Club who 'owns the room' and doesn't even have to try.",
        },
        {
          speaker: null,
          text: "Someone mentions she goes by G and only does a couple sets a night.",
        },
        {
          speaker: null,
          text: "The name sticks. So does the image of Gwen in heels, moving like she owns the hallway.",
        },
        {
          speaker: null,
          text: "Curiosity scratches at you the rest of the night.",
        },
      ],
    },
    rewards: {
      setFlags: ["gwenRumorHeard"],
    },
  },
  {
    id: "gwen_event_5_reveal",
    name: "The Reveal",
    description: "The dancer turns out to be Gwen.",
    quest: {
      title: "Strip Club Visit",
      description: "Go to the strip club late (8 PM–midnight).",
    },
    priority: 205,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 5,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Strip Club",
      requiredFlags: ["gwenRumorHeard"],
    },
    dialogue: {
      id: "gwen_event_5_reveal",
      lines: [
        {
          speaker: null,
          text: "The Strip Club is all neon and bass, a low thrum in your ribs.",
        },
        {
          speaker: null,
          text: "You take a seat, half-expecting to leave bored. Then she steps on stage.",
        },
        {
          speaker: null,
          text: "The dancer moves like she owns the light. And then you recognize her.",
        },
        {
          speaker: null,
          text: "After the set, she appears at your table in a robe, makeup still sharp, eyes sharper.",
        },
        { speaker: "Gwen", text: "{playerName}? What are you doing here?", expression: "annoyed" },
        { speaker: "You", text: "I didn't know it was you." },
        {
          speaker: "Gwen",
          text: "Keep your voice down. This is my work.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "Are you going to make this a problem?",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Your secret's safe.",
              affectionChange: 2,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_event_5_discreet",
            },
            {
              text: "Give me the rules.",
              affectionChange: 1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_event_5_lead",
            },
            {
              text: "Maybe. Depends what I get out of it.",
              affectionChange: -2,
              setFlags: ["gwenSubPath"],
              nextDialogueId: "gwen_event_5_blackmail",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwenRevealDone"],
    },
  },
  {
    id: "gwen_chapter_1_finale",
    name: "Chapter 1 Finale (Gwen Leads)",
    description: "Gwen sets the terms.",
    quest: {
      title: "Gwen's Terms",
      description: "Check the hallway late (8 PM–midnight).",
    },
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 10,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenDomPath", "gwenRevealDone"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale",
      lines: [
        {
          speaker: null,
          text: "A late-night knock pulls you to the door.",
        },
        {
          speaker: null,
          text: "Gwen stands there in a hoodie, hair damp, the edge gone from her voice.",
        },
        {
          speaker: "Gwen",
          text: "You kept your mouth shut. That buys trust.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "If this is a thing, I set the pace.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "And... I'm starting to like you more than a neighbor should.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "You can trust me.",
              affectionChange: 2,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_finale_supportive",
            },
            {
              text: "Whatever you need, I'm here.",
              affectionChange: 1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_finale_supportive",
            },
          ],
        },
      ],
    },
  },
  {
    id: "gwen_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Keep Quiet)",
    description: "Gwen keeps it transactional.",
    quest: {
      title: "Keep Quiet",
      description: "Check the hallway late (8 PM–midnight).",
    },
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 10,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenSubPath", "gwenRevealDone"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale_sub",
      lines: [
        {
          speaker: null,
          text: "You hear a knock and open the door to find Gwen, jaw tight, eyes level.",
        },
        {
          speaker: "Gwen",
          text: "You wanted something for your silence. Here it is.",
          expression: "neutral",
          nextDialogueId: "gwen_finale_hush",
        },
      ],
    },
  },
];
