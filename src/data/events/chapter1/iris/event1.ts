import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Coffee Collision
// Description: Iris spills coffee on you in the university hallway.

const irisIntroStayStill: Dialogue = {
  id: "iris_intro_stay_still",
  lines: [
    {
      speaker: null,
      text: "She drops to one knee to scoop up your papers. Her pink blouse pulls tight across her chest as she leans forward, buttons straining, black lace bra briefly visible. The short white skirt rides up her thighs, fishnets stretching as she reaches.",
    },
    {
      speaker: null,
      text: "She tilts her head back to look up at you, amber eyes locking onto yours through her glasses, lips parted slightly.",
    },
    {
      speaker: null,
      text: "Jesus Christ. Coffee's burning my skin and all I can think about is how those tits look like they'd overflow my hands. Focus, idiot.",
    },
    { speaker: "You", text: "Nah, I'm okay. Just... really fucking hot coffee." },
    {
      speaker: null,
      text: "First day and I'm drenched, hard as a rock already, and staring at the hottest woman I've seen since I moved here. Great job, me.",
    },
    {
      speaker: "Iris",
      text: "I'm Iris, by the way--I teach Advanced Bio here. I was nose-deep in my book and didn't see you coming. I feel terrible about this shirt.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She reaches out, fingers splaying across the wet patch on your chest, checking the damage.",
    },
    {
      speaker: "Iris",
      text: "This one's toast now. It did fit you well.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She pulls her hand away quickly, expression apologetic.",
    },
    { speaker: "You", text: "It'll wash. Probably. Maybe." },
    {
      speaker: "Iris",
      text: "Still, I owe you. What's your name? I should at least know who I just marked with my coffee.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I'm {playerName}. New instructor. Apparently christened with caffeine on day one.",
    },
    {
      speaker: "Iris",
      text: "First day? That's brutal. I basically ruined your big debut.",
      expression: "surprised",
    },
    {
      speaker: "Iris",
      text: "Let me fix it. There's a great little cafe off campus--I'll buy you a fresh one, no more wardrobe casualties. Deal?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Yeah, that sounds good",
          affectionChange: 1,
          nextDialogueId: "iris_intro_stay_accept",
        },
        {
          text: "Maybe another time",
          affectionChange: 0,
          nextDialogueId: "iris_intro_stay_decline",
        },
      ],
    },
  ],
};

const irisIntroStayAccept: Dialogue = {
  id: "iris_intro_stay_accept",
  lines: [
    {
      speaker: null,
      text: "She's offering coffee and bending over backward--literally. I'd be an idiot to say no to more time staring at that body.",
    },
    {
      speaker: "You",
      text: "You know what? Yeah. I could use something hot that isn't currently glued to my nipples.",
    },
    {
      speaker: "Iris",
      text: "Perfect! Give me your number so we don't lose each other.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She pulls out her phone, smile warm and a little embarrassed.",
    },
    { speaker: "You", text: "Tomorrow? I should be dry by then." },
    {
      speaker: "Iris",
      text: "Tomorrow works great. I'll text you the spot.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You swap numbers and head off to class, still smelling like coffee.",
    },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeAccepted"],
        },
      ],
    },
  ],
};

const irisIntroStayDecline: Dialogue = {
  id: "iris_intro_stay_decline",
  lines: [
    {
      speaker: "You",
      text: "Appreciate it, but I'm still trying to figure out where the hell everything is.",
    },
    {
      speaker: "Iris",
      text: "Totally get it. No rush.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But the offer's always open. Bio wing, room 304--if you need a map, a book, or just... company.",
      expression: "neutral",
    },
    { speaker: "You", text: "Thanks. I'll remember." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeDeclined"],
        },
      ],
    },
  ],
};

const irisIntroStepBack: Dialogue = {
  id: "iris_intro_step_back",
  lines: [
    { speaker: null, text: "You pull your arm away. Her hand drops without fuss." },
    {
      speaker: null,
      text: "She bends to grab the papers, skirt riding high on thick thighs, fishnets digging into soft flesh.",
    },
    {
      speaker: null,
      text: "Coffee all over me and now this view. Fuck my life.",
    },
    { speaker: "You", text: "It's fine. Just coffee." },
    {
      speaker: "Iris",
      text: "I'm Iris--I teach Advanced Bio here. Still, I hate that I soaked you on your first day. That shirt fit you well.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her eyes flick to the wet stain, then back to your face.",
    },
    { speaker: "You", text: "{playerName}. New here." },
    {
      speaker: "Iris",
      text: "Well, welcome to the circus, {playerName}. If you ever want a coffee that stays where it belongs, cafe's close. I'd love to make this right.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you say?",
      choices: [
        {
          text: "Yeah, I'd like that",
          affectionChange: 1,
          nextDialogueId: "iris_intro_step_accept",
        },
        {
          text: "Maybe another time",
          affectionChange: 0,
          nextDialogueId: "iris_intro_step_decline",
        },
        {
          text: "Not right now",
          affectionChange: 0,
          nextDialogueId: "iris_intro_step_not_now",
        },
      ],
    },
  ],
};

const irisIntroStepAccept: Dialogue = {
  id: "iris_intro_step_accept",
  lines: [
    {
      speaker: null,
      text: "She's offering coffee and looking at me like that. Brain says run, dick says stay. Fuck it.",
    },
    {
      speaker: "You",
      text: "You know what? Yeah... yeah, that actually sounds really good right now.",
    },
    {
      speaker: "You",
      text: "I mean, after this mess, I could use something warm that isn't burning holes in my shirt.",
    },
    {
      speaker: "Iris",
      text: "See? I knew you'd come around.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She laughs softly, the sound low and warm, then tilts her head, studying you with those amber eyes.",
    },
    {
      speaker: "Iris",
      text: "You still look a little dazed. Coffee shock, maybe?",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She lets the question hang with a small smile, waiting for your answer.",
    },
    { speaker: null, text: "Busted. Great." },
    { speaker: "You", text: "Definitely the coffee. Mostly." },
    { speaker: "Iris", text: "Uh-huh. Sure it is.", expression: "happy" },
    {
      speaker: null,
      text: "She gives a quick, playful smile, then pulls her phone from her pocket.",
    },
    {
      speaker: "Iris",
      text: "Here--put your number in so we don't lose each other. I don't want you escaping before I can buy you that replacement coffee.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She holds the phone out to you, screen already open to contacts.",
    },
    { speaker: null, text: "You type it in and hand the phone back." },
    { speaker: "Iris", text: "Perfect.", expression: "happy" },
    {
      speaker: null,
      text: "She taps a few times, and your phone buzzes almost instantly with a text: Iris - don't forget tomorrow. And sorry again about the shirt.",
    },
    {
      speaker: "Iris",
      text: "There. Now you've got mine too. I'll text you the cafe details tonight.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She pockets her phone, smile lingering like she knows exactly how much she's thrown you off balance.",
    },
    { speaker: "You", text: "Got it. Tomorrow then." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeAccepted"],
        },
      ],
    },
  ],
};

const irisIntroStepDecline: Dialogue = {
  id: "iris_intro_step_decline",
  lines: [
    {
      speaker: "You",
      text: "Appreciate it, but I'm still trying to figure out where the hell everything is.",
    },
    {
      speaker: "Iris",
      text: "Totally get it. No rush.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But the offer's always open. Bio wing, room 304--if you need a map, a book, or just... company.",
      expression: "neutral",
    },
    { speaker: "You", text: "Thanks. I'll remember." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeDeclined"],
        },
      ],
    },
  ],
};

const irisIntroStepNotNow: Dialogue = {
  id: "iris_intro_step_not_now",
  lines: [
    { speaker: "You", text: "Thanks, but I'm swamped getting my shit together." },
    { speaker: "Iris", text: "No problem at all.", expression: "neutral" },
    {
      speaker: "Iris",
      text: "But if you change your mind, Bio wing, room 304. Door's open.",
      expression: "neutral",
    },
    { speaker: "You", text: "Got it." },
    {
      speaker: null,
      text: "Shirt's fucked, dick's half-hard, and I just met the hottest disaster in my life. I should head to the mall for a new shirt.",
      choices: [
        {
          text: "Head to class",
          affectionChange: 0,
          setFlags: ["irisCoffeeDeclined"],
        },
      ],
    },
  ],
};

export const irisEvent1Dialogues: Record<string, Dialogue> = {
  iris_intro_stay_still: irisIntroStayStill,
  iris_intro_stay_accept: irisIntroStayAccept,
  iris_intro_stay_decline: irisIntroStayDecline,
  iris_intro_step_back: irisIntroStepBack,
  iris_intro_step_accept: irisIntroStepAccept,
  iris_intro_step_decline: irisIntroStepDecline,
  iris_intro_step_not_now: irisIntroStepNotNow,
};

export const irisEvent1Events: CharacterEvent[] = [
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
          speaker: "You",
          text: "Late on the first damn day. Perfect. This campus hates me already.",
          isThought: true,
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
              text: "Let it linger",
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
      setFlags: ["hasMetIris", "irisNeedsNewShirt"],
    },
  },
];
