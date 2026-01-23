import { CharacterEvent } from "./types";

export const rubyEvents: CharacterEvent[] = [
  {
    id: "ruby_trainer_offer_event",
    name: "Trainer Offer",
    description: "Ruby offers to train you after spotting your form.",
    priority: 240,
    repeatable: false,
    conditions: {
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Gym",
    },
    dialogue: {
      id: "ruby_trainer_offer_event",
      lines: [
        {
          speaker: null,
          text: "The gym hums with low music and the steady rhythm of clanking metal.",
        },
        {
          speaker: null,
          text: "Sweat runs down your neck as you rack the weights and shake out your arms.",
        },
        {
          speaker: "Ruby",
          text: "Hey. Mind if I steal your rack? Kidding. Unless you want me right here.",
          expression: "happy",
        },
        {
          speaker: null,
          text: "You turn to see a toned woman with a towel over her shoulder, posture relaxed and confident, like she owns the floor.",
        },
        {
          speaker: null,
          text: "Jesus. Sweat-slicked muscle and that easy swagger, and I'm already half-hard. Focus, idiot.",
        },
        { speaker: "Ruby", text: "I'm Ruby. I coach here. Hands-on when it counts.", expression: "neutral" },
        { speaker: "Ruby", text: "You're working hard, I'll give you that. Sweat looks good on you.", expression: "neutral" },
        {
          speaker: "Ruby",
          text: "But your form's all over the place. That's how people get hurt.",
          expression: "annoyed",
        },
        { speaker: "You", text: "Ouch. That bad, huh?" },
        {
          speaker: "Ruby",
          text: "Relax, rookie. I'm not trying to scare you off. Just get your attention.",
          expression: "happy",
        },
        {
          speaker: "Ruby",
          text: "I like effort. I like watching effort. But good mechanics keep you in one piece.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She looks you up and down, appraising more like a coach than anything else, but with a playful spark in her eyes.",
        },
        {
          speaker: null,
          text: "Her gaze drags slow, like she's already deciding how close she'll need to stand. My pulse jumps for reasons that have nothing to do with cardio.",
        },
        {
          speaker: "Ruby",
          text: "You've got decent potential. You just need direction.",
          expression: "excited",
        },
        {
          speaker: "Ruby",
          text: "You want a real trainer so you don't blow out your knees or your back?",
          expression: "excited",
        },
        {
          speaker: "Ruby",
          text: "If you need me, I'm usually here.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "What do you say?",
          choices: [
            {
              text: "Accept Ruby's help",
              affectionChange: 1,
              setFlags: ["rubyTrainerAccepted"],
              nextDialogueId: "ruby_trainer_offer_accept",
            },
            {
              text: "Decline politely",
              affectionChange: 0,
              setFlags: ["rubyTrainerDeclined"],
              nextDialogueId: "ruby_trainer_offer_decline",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["hasMetRuby"],
      unlockCharacters: ["Ruby"],
    },
  },
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
          text: "You walk into the gym ready for your session, but the vibe is off immediately.",
        },
        {
          speaker: null,
          text: "Ruby is standing by the squat rack, staring at her phone. Her knuckles are white as she grips it. She types a furious reply, deletes it, then shoves the phone into her bag like she wants to break it.",
        },
        {
          speaker: "Ruby",
          text: "You're here. Finally. Let's go. No warm-up talk today.",
          expression: "annoyed",
        },
        {
          speaker: null,
          text: "She doesn't wait for a response. She loads the bar—heavier than last time.",
        },
        {
          speaker: "Ruby",
          text: "Get under it. And don't give me that look. You want results? You work for them. Nobody hands you anything.",
          expression: "angry",
        },
        {
          speaker: null,
          text: "There's an edge to her voice that wasn't there before. The teasing is gone. Every cue is clipped, sharp.",
        },
        {
          speaker: "Ruby",
          text: "Well? Are you just going to stand there looking useless? Move!",
          expression: "angry",
        },
        {
          speaker: null,
          text: "You bite back a comment and set your stance. If she's off today, you can only keep up.",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Do the set without complaining. (Push through)",
              affectionChange: 1,
              nextDialogueId: "ruby_event_2_push",
            },
            {
              text: "Try to lighten the mood with a joke. (Deflect)",
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
    name: "The Bar Text",
    description: "Ruby asks you to meet her at the bar.",
    priority: 220,
    repeatable: false,
    conditions: {
      minAffection: 10,
      minTrust: 0,
      minHour: 21,
      maxHour: 24,
      requiredLocation: "Bar",
      requiredPreviousEvents: ["ruby_event_2_routine"],
      requiredFlags: ["rubyTrainerAccepted", "rubySoloWorkout3"],
    },
    dialogue: {
      id: "ruby_event_3_playful",
      lines: [
        {
          speaker: null,
          text: "After some solo sessions, you're starting to wonder where Ruby has been.",
        },
        {
          speaker: null,
          text: "Your phone buzzes with a new text from her: 'Hey... can you meet me at the bar? Just for a bit.'",
        },
        {
          speaker: null,
          text: "You find her tucked into a corner booth, a half-drunk drink sweating on the table.",
        },
        {
          speaker: "Ruby",
          text: "Hey. Sorry for the weird text. I just needed to get out of my head.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She tries for her usual grin, but it slips fast.",
        },
        {
          speaker: "Ruby",
          text: "My boyfriend's been in my head nonstop. He keeps tearing me down, then acting like he's helping.",
          expression: "annoyed",
        },
        {
          speaker: "Ruby",
          text: "Now he's pushing me to start an OnlyFans or go full pornstar, like I'm just content he can cash out on.",
          expression: "annoyed",
        },
        {
          speaker: null,
          text: "Her voice cracks. The tough coach act falls apart.",
        },
        {
          speaker: "Ruby",
          text: "I know I can handle myself, but he makes me feel small. Like I'm stupid for not doing what he wants.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She wipes at her eyes, then the tears start anyway.",
        },
        {
          speaker: "Ruby",
          text: "I hate that it gets to me. I hate that I'm even saying this out loud.",
          expression: "shy",
        },
        {
          speaker: "You",
          text: "What do you do?",
          choices: [
            {
              text: "Stay and comfort her.",
              affectionChange: 2,
              trustChange: 1,
              setFlags: ["rubyBarComforted"],
              nextDialogueId: "ruby_event_3_comfort",
            },
            {
              text: "Tell her you cannot get involved and leave.",
              affectionChange: 0,
              trustChange: -1,
              setFlags: ["rubyBarWalkedAway"],
              nextDialogueId: "ruby_event_3_walk_away",
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
