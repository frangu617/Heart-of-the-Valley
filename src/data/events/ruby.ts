import { CharacterEvent } from "./types";

export const rubyEvents: CharacterEvent[] = [
  {
  "id": "ruby_trainer_offer_event",
  "name": "Trainer Offer",
  "description": "Ruby offers to train you after spotting your form.",
  "priority": 240,
  "repeatable": false,
  "conditions": {
    "minAffection": 0,
    "minTrust": 0,
    "minHour": 0,
    "maxHour": 24,
    "requiredLocation": "Gym"
  },
  "dialogue": {
    "id": "ruby_trainer_offer_event",
    "lines": [
      {
        "speaker": null,
        "text": "The gym hums with low music and the steady rhythm of clanking metal."
      },
      {
        "speaker": null,
        "text": "Sweat runs down your neck as you rack the weights and shake out your arms."
      },
      {
        "speaker": "Ruby",
        "text": "Heyyy. Mind if I steal your rack? …Kidding. Unless you’re offering to let me pin you right here~",
        "expression": "happy"
      },
      {
        "speaker": null,
        "text": "You turn and—fuck. A redheaded bombshell with a towel slung over her shoulder, standing like she knows every eye in the room is already on her."
      },
      {
        "speaker": null,
        "text": "Those thick, sculpted thighs, that tiny turquoise crop unzipped just enough to tease deep cleavage, abs carved like they could crush steel… Christ, my dick twitches hard before I can even think. Get it together, you animal—she’s looking right at you."
      },
      {
        "speaker": "Ruby",
        "text": "I’m Ruby. I coach here. Very… hands-on when someone’s worth the effort.",
        "expression": "neutral"
      },
      {
        "speaker": "Ruby",
        "text": "You’re putting in work, I’ll give you that. All that sweat dripping down your neck? Kinda hot, rookie.",
        "expression": "happy"
      },
      {
        "speaker": "Ruby",
        "text": "Buuut your form’s a mess. Keep going like that and you’ll blow something… and not in the fun way.",
        "expression": "annoyed"
      },
      {
        "speaker": "You",
        "text": "Ouch. That bad, huh?"
      },
      {
        "speaker": "Ruby",
        "text": "Relax, big guy. I’m not here to scare you away… just to get you all worked up and paying attention~",
        "expression": "happy"
      },
      {
        "speaker": "Ruby",
        "text": "I love watching someone push themselves. All that straining, grunting, muscles popping… mmm. But good form means you get to keep coming back for more.",
        "expression": "neutral"
      },
      {
        "speaker": null,
        "text": "She drags her gaze down your body—slow, shameless—like she’s already picturing exactly where her hands would go to 'correct' you. That playful glint in her green eyes says she knows exactly what she’s doing to you."
      },
      {
        "speaker": null,
        "text": "Fuck. My heart’s hammering and it’s definitely not from the set. She’s close enough now I can smell her—sweat, citrus body spray, pure trouble. If she spots me I’m done for."
      },
      {
        "speaker": "Ruby",
        "text": "You’ve got some real potential under there. Raw. Hungry. I like that.",
        "expression": "excited"
      },
      {
        "speaker": "Ruby",
        "text": "Want a trainer who’ll get real personal with you? Keep those knees and back safe… while I make sure every rep feels worth it?",
        "expression": "excited"
      },
      {
        "speaker": "Ruby",
        "text": "If you’re interested, I’m usually around… and I don’t bite. Unless you ask nicely.",
        "expression": "neutral"
      },
      {
        "speaker": "You",
        "text": "What do you say?",
        "choices": [
          {
            "text": "Accept Ruby's help",
            "affectionChange": 1,
            "setFlags": ["rubyTrainerAccepted"],
            "nextDialogueId": "ruby_trainer_offer_accept"
          },
          {
            "text": "Decline politely",
            "affectionChange": 0,
            "setFlags": ["rubyTrainerDeclined"],
            "nextDialogueId": "ruby_trainer_offer_decline"
          }
        ]
      }
    ]
  },
  "rewards": {
    "setFlags": ["hasMetRuby"],
    "unlockCharacters": ["Ruby"]
  }
}
  {
    id: "ruby_hire_trainer_event",
    name: "Hire Ruby",
    description: "Come back and accept Ruby's training offer.",
    priority: 235,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredFlags: ["rubyTrainerDeclined"],
      blockedByFlags: ["rubyTrainerAccepted"],
    },
    dialogue: {
      id: "ruby_hire_trainer_event",
      lines: [
        { speaker: "You", text: "Hey, Ruby. About that offer..." },
        { speaker: "Ruby", text: "Realized you couldn't do it alone?", expression: "annoyed" },
        { speaker: "You", text: "Yeah. I hit a wall. I need your help." },
        {
          speaker: "Ruby",
          text: "Thought so. Alright, same deal as before. You listen, I lead.",
          expression: "happy",
        },
        { speaker: "Ruby", text: "Let's get to work.", expression: "happy" },
      ],
    },
    rewards: {
      setFlags: ["rubyTrainerAccepted"],
    },
  },
  {
    id: "ruby_event_2_routine",
    name: "The Routine",
    description: "Ruby pushes you through a tough circuit.",
    priority: 230,
    repeatable: false,
    conditions: {
      minAffection: 5,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredPreviousEvents: ["ruby_trainer_offer_event"],
      requiredFlags: ["rubyTrainerAccepted"],
    },
    dialogue: {
      id: "ruby_event_2_routine",
      lines: [
        {
          speaker: null,
          text: "The gym is sweltering today. Ruby has you running circuits, and she isn't showing any mercy.",
        },
        {
          speaker: "Ruby",
          text: "Come on! Two more reps! Don't you dare quit on me now!",
          expression: "annoyed",
        },
        {
          speaker: null,
          text: "Her voice cuts through the noise of the gym. She's standing over you, arms crossed, looking like a drill sergeant.",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Push through the pain (Dominant/Determined)",
              affectionChange: 1,
              nextDialogueId: "ruby_event_2_push",
            },
            {
              text: "Ask for a break (Submissive/Weak)",
              affectionChange: 0,
              nextDialogueId: "ruby_event_2_break",
            },
          ],
        },
      ],
    },
  },
  {
    id: "ruby_event_3_playful",
    name: "The Playful Shift",
    description: "A playful moment after training.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredPreviousEvents: ["ruby_event_2_routine"],
      requiredFlags: ["rubyTrainerAccepted"],
    },
    dialogue: {
      id: "ruby_event_3_playful",
      lines: [
        {
          speaker: null,
          text: "The workout is over. You're both sitting on a bench, catching your breath. Ruby is wiping sweat from her neck with a towel.",
        },
        {
          speaker: "Ruby",
          text: "Not bad today. You're actually starting to keep up with me.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "She stretches her arms over her head, her shirt riding up slightly to reveal toned abs. She catches you looking and doesn't pull it down.",
        },
        {
          speaker: "Ruby",
          text: "See something you like? Or just jealous of the core strength?",
          expression: "happy",
        },
        {
          speaker: "You",
          text: "What do you say?",
          choices: [
            {
              text: "Jealous? I'm just admiring the view. (Flirt/Lust Hint)",
              affectionChange: 2,
              moodChange: 1,
              nextDialogueId: "ruby_event_3_flirt",
            },
            {
              text: "You're a great teacher. (Sincere/Affectionate)",
              affectionChange: 2,
              moodChange: 1,
              nextDialogueId: "ruby_event_3_sincere",
            },
          ],
        },
      ],
    },
  },
  {
    id: "ruby_event_4_tension",
    name: "High Tension",
    description: "A close moment while spotting.",
    priority: 210,
    repeatable: false,
    conditions: {
      minAffection: 15,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredPreviousEvents: ["ruby_event_3_playful"],
      requiredFlags: ["rubyTrainerAccepted"],
    },
    dialogue: {
      id: "ruby_event_4_tension",
      lines: [
        {
          speaker: null,
          text: "Ruby is spotting you on the bench press. It's a heavy set, heavier than you're used to.",
        },
        {
          speaker: "Ruby",
          text: "Control it. Down slow... and up!",
          expression: "neutral",
        },
        { speaker: null, text: "You struggle with the last rep. The bar stalls halfway up." },
        { speaker: "Ruby", text: "I got you.", expression: "neutral" },
        {
          speaker: null,
          text: "She leans over, grabbing the bar. Her chest brushes against your arm, her face inches from yours as she helps you rack the weight.",
        },
        {
          speaker: null,
          text: "She doesn't pull back immediately after the bar clicks into place. She stays hovering over you, her breathing heavy, her eyes locked onto yours.",
        },
        {
          speaker: null,
          text: "The gym noise fades into the background. It's just the two of you, sweating and close.",
        },
        {
          speaker: "Ruby",
          text: "You okay? You stopped breathing for a second there.",
          expression: "neutral",
        },
        { speaker: "You", text: "Yeah. Just... heavy." },
        { speaker: "Ruby", text: "Yeah.", expression: "neutral" },
        {
          speaker: null,
          text: "She licks her lips, her gaze dropping to your mouth for a split second before she straightens up.",
        },
        {
          speaker: "Ruby",
          text: "Good set. Let's... let's call it a day.",
          expression: "shy",
        },
      ],
    },
  },
  {
    id: "ruby_chapter_1_finale",
    name: "Chapter 1 Finale",
    description: "Ruby breaks the tension with a kiss, then panics.",
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 20,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
      requiredPreviousEvents: ["ruby_event_4_tension"],
      requiredFlags: ["rubyTrainerAccepted"],
    },
    dialogue: {
      id: "ruby_chapter_1_finale",
      lines: [
        {
          speaker: null,
          text: "The gym is nearly empty. You're packing up your bag in the locker area when Ruby walks in.",
        },
        {
          speaker: null,
          text: "She walks straight up to you, no hesitation, no jokes.",
        },
        { speaker: "Ruby", text: "I can't focus.", expression: "neutral" },
        { speaker: "You", text: "What?" },
        {
          speaker: "Ruby",
          text: "I can't focus on my workout. I can't focus on my other clients. Because I keep thinking about earlier.",
          expression: "neutral",
        },
        { speaker: null, text: "She grabs the front of your shirt, yanking you forward." },
        { speaker: "Ruby", text: "I need to get this out of my system.", expression: "annoyed" },
        {
          speaker: null,
          text: "She kisses you hard, pushing you back against the lockers. It tastes like sports drink and adrenaline.",
        },
        {
          speaker: null,
          text: "Her hands roam over your shoulders, testing the muscles she helped build.",
        },
        { speaker: null, text: "Just as you start to respond, she shoves you away." },
        { speaker: "Ruby", text: "Damn it.", expression: "surprised" },
        {
          speaker: "Ruby",
          text: "I can't do this. I'm your trainer. This is... this is against the rules.",
          expression: "surprised",
        },
        { speaker: null, text: "She looks furious with herself." },
        { speaker: "Ruby", text: "Forget this happened. Seriously.", expression: "annoyed" },
        {
          speaker: null,
          text: "She storms out of the locker room, leaving you leaning against the cold metal lockers.",
        },
      ],
    },
  },
];
