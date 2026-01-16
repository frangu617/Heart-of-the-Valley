import { CharacterEvent } from "./types";

export const irisEvents: CharacterEvent[] = [
  {
    id: "iris_university_intro",
    name: "Coffee Collision",
    description: "Iris spills coffee on you in the university hallway.",
    quest: {
      title: "Go to work at the university",
      description: "Head to the University Hallway to start your first day.",
    },
    priority: 300,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "University Hallway",
    },
    dialogue: {
      id: "iris_university_intro",
      lines: [
        {
          speaker: null,
          text: "The hallway throbs with morning chaos--students shoving past, lockers banging, the whole place smelling like cheap body spray and desperation.",
        },
        {
          speaker: null,
          text: "You think: Late on the first damn day. Perfect. This campus hates me already.",
        },
        {
          speaker: null,
          text: "You wrestle a wrinkled map and a stack of syllabi that's one bump from disaster, trying to carve a path through the crowd.",
        },
        { speaker: null, text: "You whip around the corner--" },
        { speaker: "You", text: "Oh, for fuck's sake!" },
        {
          speaker: null,
          text: "Scalding coffee explodes across your chest, soaking through the fabric in seconds. Papers flutter everywhere like they're trying to escape you.",
        },
        {
          speaker: "Iris",
          text: "Oh my god, I am so sorry! Are you alright? Did it burn you?",
          expression: "surprised",
        },
        {
          speaker: null,
          text: "Her hand clamps onto your forearm--warm, firm, fingers curling like she owns the contact.",
        },
        {
          speaker: "You",
          text: "How do you react?",
          choices: [
            {
              text: "Stay still",
              affectionChange: 2,
              nextDialogueId: "iris_intro_stay_still",
            },
            {
              text: "Step back",
              affectionChange: 0,
              nextDialogueId: "iris_intro_step_back",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetIris", "irisNeedsNewShirt", "iris_intro_done"],
    },
  },

  {
    id: "iris_coffee_meetup_event",
    name: "Coffee Meetup",
    description: "Meet Iris at the cafe after accepting her offer.",
    quest: {
      title: "Meet Iris for Coffee",
      description:
        "You agreed to meet Iris at the Cafe. She's waiting to make up for the coffee incident.",
    },
    priority: 250,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["iris_intro_done", "irisCoffeeAccepted"],
    },
    dialogue: {
      id: "iris_coffee_meetup_event",
      lines: [
        {
          speaker: null,
          text: "You arrive at the cafe, the hum of grinders and soft music wrapping around you. A familiar wave catches your eye.",
        },
        {
          speaker: "Iris",
          text: "Hey! Thanks for meeting me. I promise this coffee stays in the cup.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She lifts two drinks triumphantly, a playful smile easing any leftover awkwardness.",
        },
        {
          speaker: "Iris",
          text: "I took a guess and got you a dark roast. You looked like you needed something strong.",
          expression: "happy",
        },
        { speaker: "You", text: "Already an improvement over last time." },
        {
          speaker: "Iris",
          text: "I still feel bad about the shirt. Let me know what the dry cleaning costs, okay?",
          expression: "neutral",
        },
        {
          speaker: "Iris",
          text: "Also... I'm glad you said yes. Campus feels less intimidating when you know someone.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You take a seat by the window. The coffee is actually decent--strong, hot, and thankfully contained.",
        },
        {
          speaker: null,
          text: "You both settle into a corner table, trading first-day war stories as the morning rush swirls around you.",
        },
        {
          speaker: "You",
          text: "So, Biology, right? I assume that means you're the one dissecting frogs while the rest of us are just trying to get the projector to work.",
        },
        { speaker: null, text: "Iris laughs, relaxing into her chair." },
        {
          speaker: "Iris",
          text: "It's a little more complex than frogs. I teach Advanced Anatomy and Physiology.",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "It's fascinating, really. Understanding the mechanics of how we work. Every muscle, every nerve firing... it's like a perfect machine.",
          expression: "excited",
        },
        {
          speaker: null,
          text: "She pauses, realizing she's geeking out, her cheeks flushing slightly.",
        },
        {
          speaker: "Iris",
          text: "Sorry. I get a little carried away. My students usually glaze over by now.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "I like the passion (Flirt)",
              affectionChange: 3,
              moodChange: 1,
              trustChange: 1,
            },
            {
              text: "It sounds intense (Friendly)",
              affectionChange: 2,
              moodChange: 1,
            },
          ],
        },
        {
          speaker: "Iris",
          text: "Anyway, if you ever want to see the 'perfect machine' in action... or just need a quiet place to work...",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "My office is in the Science block. Room 304. It's usually quieter than the staff lounge.",
          expression: "happy",
        },
        { speaker: "You", text: "I might take you up on that." },
      ],
    },
    rewards: {
      setFlags: ["irisCoffeeMet", "iris_coffee_done"],
    },
  },

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
      minAffection: 5,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["iris_intro_done", "irisCoffeeDeclined"],
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
      setFlags: ["irisCoffeeMet", "iris_coffee_done"],
    },
  },

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
      minAffection: 10,
      minTrust: 0,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["iris_coffee_done"],
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
        {
          speaker: "You",
          text: "Hard to miss me. I'm the one making noise at 2 AM.",
        },
        {
          speaker: "Iris",
          text: "Actually, that's usually me. Grading papers.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She tosses the bag into the chute and wipes her hands.",
        },
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
              trustChange: 1,
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
    rewards: {
      setFlags: ["iris_hallway_invite_done"],
    },
  },

  {
    id: "iris_mall_bump_dom",
    name: "Mall Bump (Confident Iris)",
    description: "Run into Iris at the mall when she's feeling bold.",
    quest: {
      title: "A Day Out",
      description:
        "It's a good day to get out of the apartment. You never know who you might run into at the Mall.",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 5,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredFlags: [
        "iris_hallway_invite_done",
        "irisNeedsNewShirt",
        "irisDomPath",
      ],
    },
    dialogue: {
      id: "iris_mall_bump_dom",
      lines: [
        {
          speaker: null,
          text: "The mall is busy today, a wash of noise and fluorescent light.",
        },
        {
          speaker: null,
          text: "You're navigating the crowd near the fountain when you spot a familiar figure wrestling with too many shopping bags.",
        },
        {
          speaker: null,
          text: "Even from the back, the curve of her hips in those jeans is unmistakable.",
        },
        {
          speaker: null,
          text: "She turns, a bag slipping from her grip just as you step in to catch it. Your hands brush against hers--her skin is warm.",
        },
        { speaker: "You", text: "Careful. You're dropping the goods." },
        {
          speaker: "Iris",
          text: "I knew someone would come to my rescue if I looked helpless enough.",
          expression: "happy",
        },
        {
          speaker: "Iris",
          text: "Didn't expect it to be you, though. That's a nice bonus.",
          expression: "happy",
        },
        { speaker: "You", text: "So this was a trap?" },
        {
          speaker: "Iris",
          text: "Let's call it a strategy. I bought way too much.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She glances at the bag you caught. It has a distinct lace pattern on the packaging.",
        },
        {
          speaker: "Iris",
          text: "Especially that one. You have good reflexes.",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Tease her back (Flirty)",
              affectionChange: 2,
              moodChange: 1,
            },
            {
              text: "Just help her (Friendly)",
              affectionChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "You walk together towards the exit. She walks close to you, her shoulder brushing yours intentionally.",
        },
        {
          speaker: "Iris",
          text: "You know... since you've already handled the merchandise...",
          expression: "seductive",
        },
        {
          speaker: "Iris",
          text: "I bought a new outfit in there. Very little fabric. Very expensive.",
          expression: "seductive",
        },
        {
          speaker: "Iris",
          text: "I might need a second opinion on how it fits later.",
          expression: "seductive",
        },
        { speaker: "You", text: "I'm available for consultations." },
        { speaker: "Iris", text: "I'll bet you are.", expression: "seductive" },
      ],
    },
    rewards: {
      setFlags: ["iris_mall_bump_done"],
    },
  },

  {
    id: "iris_mall_bump_sub",
    name: "Mall Bump (Shy Iris)",
    description: "Run into Iris at the mall when she's flustered.",
    quest: {
      title: "A Day Out",
      description:
        "It's a good day to get out of the apartment. You never know who you might run into at the Mall.",
    },
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minLust: 5,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredFlags: [
        "iris_hallway_invite_done",
        "irisNeedsNewShirt",
        "irisSubPath",
      ],
    },
    dialogue: {
      id: "iris_mall_bump_sub",
      lines: [
        {
          speaker: null,
          text: "The mall is busy today, a wash of noise and fluorescent light.",
        },
        {
          speaker: null,
          text: "You're navigating the crowd near the fountain when you spot a familiar figure wrestling with too many shopping bags.",
        },
        {
          speaker: null,
          text: "Even from the back, the curve of her hips in those jeans is unmistakable.",
        },
        {
          speaker: null,
          text: "She turns, a bag slipping from her grip just as you step in to catch it. Your hands brush against hers--her skin is warm.",
        },
        { speaker: "You", text: "Careful. You're dropping the goods." },
        {
          speaker: "Iris",
          text: "Oh! {playerName}! I... I didn't see you there!",
          expression: "surprised",
        },
        {
          speaker: null,
          text: "She scrambles to adjust her grip, looking mortified that you caught her struggling.",
        },
        {
          speaker: "Iris",
          text: "I thought I could manage all this in one trip. Hubris, clearly.",
          expression: "shy",
        },
        { speaker: "You", text: "What did you buy? The whole store?" },
        {
          speaker: "Iris",
          text: "Just... things. Retail therapy got out of hand.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She notices you holding the bag you caught--the one with the lingerie logo--and her eyes go wide. She quickly tries to snatch it back.",
        },
        {
          speaker: "Iris",
          text: "That one isn't... it's just socks! Boring socks!",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "Take charge and help (Dominant/Flirty)",
              affectionChange: 2,
              moodChange: 1,
            },
            {
              text: "Be gentle (Friendly)",
              affectionChange: 1,
            },
          ],
        },
        {
          speaker: null,
          text: "You walk towards the exit. She stays close to your side, seemingly grateful for the protection from the crowd.",
        },
        {
          speaker: "Iris",
          text: "Thanks for the rescue. Again.",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "Um... about that bag you caught...",
          expression: "shy",
        },
        {
          speaker: "Iris",
          text: "It wasn't socks. It's... something for special occasions.",
          expression: "shy",
        },
        { speaker: null, text: "She glances up at you, then quickly away." },
        {
          speaker: "Iris",
          text: "Maybe... if you're lucky... you'll find out what it is someday.",
          expression: "shy",
        },
      ],
    },
    rewards: {
      setFlags: ["iris_mall_bump_done"],
    },
  },

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
      minAffection: 10,
      minLust: 10,
      minTrust: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["iris_mall_bump_done", "irisDomPath"],
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
        {
          speaker: "Iris",
          text: "Are you? You look restless.",
          expression: "neutral",
        },
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
      minAffection: 10,
      minLust: 10,
      minTrust: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["iris_mall_bump_done", "irisSubPath"],
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
        {
          speaker: "Iris",
          text: "I'm... actually glad I ran into you.",
          expression: "shy",
        },
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
