import type { Dialogue } from "../../dialogues";
import { CharacterEvent } from "../types";

const rubyTrainerOfferAccept: Dialogue = {
  id: "ruby_trainer_offer_accept",
  lines: [
    { speaker: "You", text: "Yeah, alright. I could use the guidance." },
    { speaker: "You", text: "Better than learning the hard way." },
    { speaker: "Ruby", text: "Smart answer. I like smart answers.", expression: "happy" },
    {
      speaker: "Ruby",
      text: "We'll start with basics. Fix your form, build a real foundation.",
      expression: "happy",
    },
    {
      speaker: "Ruby",
      text: "No ego lifting, no skipping leg day, no whining after the first set.",
      expression: "neutral",
    },
    { speaker: "You", text: "You drive a hard bargain." },
    {
      speaker: "Ruby",
      text: "This isn't a bargain. It's a commitment.",
      expression: "excited",
    },
    {
      speaker: "Ruby",
      text: "You show up, you listen, you work. I handle the rest. Deal?",
      expression: "excited",
    },
    { speaker: "You", text: "Deal." },
    {
      speaker: "Ruby",
      text: "Good. Finish your water, then meet me by the squat rack.",
      expression: "happy",
    },
    {
      speaker: "Ruby",
      text: "If you're going to do this, we're doing it right.",
      expression: "happy",
    },
  ],
};

const rubyTrainerOfferDecline: Dialogue = {
  id: "ruby_trainer_offer_decline",
  lines: [
    {
      speaker: "You",
      text: "I appreciate the offer, but I kind of wanted to figure it out on my own first.",
    },
    { speaker: "Ruby", text: "Huh. One of those.", expression: "annoyed" },
    { speaker: null, text: "Ruby studies you for a moment, then shrugs." },
    {
      speaker: "Ruby",
      text: "Your call. It's your body you're gambling with.",
      expression: "neutral",
    },
    {
      speaker: "Ruby",
      text: "If you change your mind, I'm here most days. Look for the one actually using the equipment right.",
      expression: "happy",
    },
    { speaker: "You", text: "I'll keep that in mind." },
    { speaker: "Ruby", text: "Do that.", expression: "neutral" },
  ],
};

const rubyEvent2Push: Dialogue = {
  id: "ruby_event_2_push",
  lines: [
    { speaker: "You", text: "I'm on it. Watch this." },
    {
      speaker: null,
      text: "You grit your teeth and shoulder the weight. It's heavier than usual, but you force out the reps.",
    },
    {
      speaker: "Ruby",
      text: "Lower! Control it! Don't let it crush you!",
      expression: "angry",
    },
    {
      speaker: null,
      text: "She's spotting you, but her eyes are intense, almost desperate. She's shouting cues that feel like they're about more than just the weights.",
    },
    {
      speaker: "Ruby",
      text: "Push! Come on! You have to be stronger than that! Don't be weak!",
      expression: "angry",
    },
    {
      speaker: null,
      text: "You slam the weights back onto the rack, gasping for air. Ruby stares at you, chest heaving, before she seems to realize where she is.",
    },
    { speaker: "Ruby", text: "Right. Good. That was... acceptable.", expression: "neutral" },
    {
      speaker: null,
      text: "She turns away quickly, rubbing the back of her neck.",
    },
    {
      speaker: "Ruby",
      text: "I... sorry. I didn't mean to snap.",
      expression: "sad",
    },
    {
      speaker: "Ruby",
      text: "I just... I have to go.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She grabs her bag and walks away quickly, leaving you alone by the rack, wondering what just happened.",
    },
  ],
};

const rubyEvent2Break: Dialogue = {
  id: "ruby_event_2_break",
  lines: [
    { speaker: "You", text: "Whoa, easy there, tiger. Did someone piss in your protein shake?" },
    {
      speaker: null,
      text: "You try to give her a disarming smile. It doesn't work.",
    },
    {
      speaker: "Ruby",
      text: "Do you think this is funny? You think my time is a joke?",
      expression: "angry",
    },
    {
      speaker: null,
      text: "She glares at you, her eyes glassy. For a second, she looks like she might actually cry, but she swallows it down instantly.",
    },
    {
      speaker: "Ruby",
      text: "Ugh. Forget it. Just... forget it.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She waves a hand dismissively, turning her back to you.",
    },
    {
      speaker: "Ruby",
      text: "Take five if you're going to whine. I don't care.",
      expression: "neutral",
    },
  ],
};

const rubyEvent3Flirt: Dialogue = {
  id: "ruby_event_3_flirt",
  lines: [
    { speaker: "You", text: "Just admiring the view. You work hard for it." },
    {
      speaker: null,
      text: "Ruby laughs, a flush rising on her cheeks that isn't just from the exercise.",
    },
    {
      speaker: "Ruby",
      text: "Damn right I do. And if you keep working this hard, maybe you'll look half as good as me someday.",
      expression: "excited",
    },
  ],
};

const rubyEvent3Sincere: Dialogue = {
  id: "ruby_event_3_sincere",
  lines: [
    { speaker: "You", text: "I'm just impressed. You're a great teacher, Ruby." },
    { speaker: null, text: "She lowers her arms, looking suddenly bashful." },
    {
      speaker: "Ruby",
      text: "Oh. Well... thanks. I try. Most people just want a cheerleader, not a coach.",
      expression: "shy",
    },
  ],
};

const rubyEvent3Comfort: Dialogue = {
  id: "ruby_event_3_comfort",
  lines: [
    { speaker: "You", text: "Hey. I... uh, I'm here. You don't have to do this alone." },
    {
      speaker: null,
      text: "You slide closer, feeling a bit out of your depth but wanting to help. You lower your voice so it's just the two of you inside the noise.",
    },
    { speaker: "Ruby", text: "I... I hate crying in public.", expression: "shy" },
    {
      speaker: "You",
      text: "Right. Okay. Just... breathe? I'll sit right here. I'll block the view so nobody sees.",
    },
    {
      speaker: null,
      text: "She exhales, shaky, and leans into your side immediately, as if her legs gave out.",
    },
    {
      speaker: "Ruby",
      text: "He keeps saying it's just... business. Like I'm a product. Like if I loved him I'd... I'd just do it.",
      expression: "sad",
    },
    {
      speaker: "Ruby",
      text: "He says he believes in me. That he sees my potential. And then... then he tells me I'm wasting it by saying no.",
      expression: "sad",
    },
    {
      speaker: "Ruby",
      text: "I start to hear his voice in my head even when he's not there.",
      expression: "sad",
    },
    { speaker: "You", text: "That sounds... that doesn't sound like love. That sounds like he's just trying to control you." },
    {
      speaker: null,
      text: "She nods, pressing her forehead against your shoulder, hiding her face.",
    },
    {
      speaker: "Ruby",
      text: "I act like I'm tough all day. With clients... with everyone. But I'm... I'm tired of being tough.",
      expression: "shy",
    },
    {
      speaker: "Ruby",
      text: "I'm tired of performing for him, for the gym, for every room I walk into.",
      expression: "shy",
    },
    { speaker: "You", text: "You don't have to... do that with me. The performing thing. You can just be... you." },
    {
      speaker: null,
      text: "She breaks then, quiet and full, clutching your shirt tightly as she cries.",
    },
    { speaker: "You", text: "Hey. It's... it's okay. I'm not going anywhere." },
    {
      speaker: null,
      text: "You awkwardly pat her back, unsure what to do with your hands, but she melts into the touch anyway.",
    },
    {
      speaker: "Ruby",
      text: "Thanks for not telling me what to do. Thanks for just... staying.",
      expression: "shy",
    },
    { speaker: "You", text: "Anytime. We can... figure it out. One step at a time." },
    {
      speaker: null,
      text: "She doesn't let go of your shirt. She looks up, eyes red but searching yours.",
    },
    {
      speaker: "Ruby",
      text: "Don't leave yet. Please. I just... I can't go home right now. Just stay?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I'm not going anywhere. We can stay as long as you need.",
    },
    {
      speaker: null,
      text: "You signal the bartender for another round of water. The two of you sit in the booth for some time, the noise of the bar fading into the background as you just let her exist without expectations.",
    },
  ],
};

const rubyEvent3WalkAway: Dialogue = {
  id: "ruby_event_3_walk_away",
  lines: [
    { speaker: "You", text: "I'm sorry, Ruby. I can't get in the middle of this." },
    { speaker: "Ruby", text: "Yeah. That's fair.", expression: "neutral" },
    {
      speaker: null,
      text: "She wipes her face fast, like she's embarrassed the tears showed at all.",
    },
    {
      speaker: "Ruby",
      text: "I shouldn't have pulled you into it.",
      expression: "sad",
    },
    { speaker: "You", text: "I hope things get better." },
    {
      speaker: null,
      text: "She forces a small smile that doesn't reach her eyes.",
    },
    {
      speaker: "Ruby",
      text: "Me too. Drive safe, okay?",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You step away. The music swells back up between you, warm and loud and indifferent.",
    },
    {
      speaker: null,
      text: "At the door you pause, hand on the handle, and hear her take a slow, shaky breath.",
    },
    {
      speaker: null,
      text: "You could turn around...",
      choices: [
        {
          text: "Turn around (Comfort her)",
          nextDialogueId: "ruby_event_3_turn_around",
          affectionChange: 1,
          setFlags: ["rubyBarComforted"],
        },
        {
          text: "Keep walking",
          nextDialogueId: "ruby_event_3_really_leave",
          affectionChange: 0,
        },
      ],
    },
  ],
};

const rubyEvent3ReallyLeave: Dialogue = {
  id: "ruby_event_3_really_leave",
  lines: [
    {
      speaker: null,
      text: "You push the door open and step out. You don't look back.",
    },
    {
      speaker: null,
      text: "Outside, the night air is cold. The text you don't send sits heavy in your pocket.",
    },
  ],
};

const rubyEvent3TurnAround: Dialogue = {
  id: "ruby_event_3_turn_around",
  lines: [
    {
      speaker: null,
      text: "You let go of the handle. You can't just leave her like this.",
    },
    {
      speaker: null,
      text: "You turn back and slide into the booth across from her. She looks up, eyes wide and wet.",
    },
    {
      speaker: "Ruby",
      text: "You... you came back?",
      expression: "surprised",
    },
    {
      speaker: "You",
      text: "Yeah. I couldn't leave you alone.",
    },
    {
      speaker: null,
      text: "She lets out a shuddering breath and nods.",
      nextDialogueId: "ruby_event_3_comfort",
    },
  ],
};

export const rubyStoryDialogues: Record<string, Dialogue> = {
  ruby_trainer_offer_accept: rubyTrainerOfferAccept,
  ruby_trainer_offer_decline: rubyTrainerOfferDecline,
  ruby_event_2_push: rubyEvent2Push,
  ruby_event_2_break: rubyEvent2Break,
  ruby_event_3_flirt: rubyEvent3Flirt,
  ruby_event_3_sincere: rubyEvent3Sincere,
  ruby_event_3_comfort: rubyEvent3Comfort,
  ruby_event_3_walk_away: rubyEvent3WalkAway,
  ruby_event_3_really_leave: rubyEvent3ReallyLeave,
  ruby_event_3_turn_around: rubyEvent3TurnAround,
};

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
          text: "Hey... *hic*... sorry for the weird text. I just... I really needed to get out of my head.",
          expression: "neutral",
        },
        {
          speaker: "Ruby",
          text: "I couldn't call my friends... *hic*. They all know him. They'd just... make it a thing.",
          expression: "sad",
        },
        {
          speaker: "Ruby",
          text: "You're the only one who's... removed from it all. Safe.",
          expression: "neutral",
        },
        {
          speaker: null,
          text: "She tries for her usual grin, but it slips fast. Her eyes are glassy, unfocused.",
        },
        {
          speaker: "Ruby",
          text: "My boyfriend... he's been in my head nonstop. Keeps tearing me down... then acting like he's helping.",
          expression: "annoyed",
        },
        {
          speaker: "Ruby",
          text: "Now he's pushing me to do things... things I don't want to do. Like I'm just... content he can cash out on.",
          expression: "annoyed",
        },
        {
          speaker: null,
          text: "Her voice cracks, slurring slightly. The tough coach act falls apart.",
        },
        {
          speaker: "Ruby",
          text: "I know I can handle myself... usually. But he makes me feel small. Like I'm stupid for not... for not listening.",
          expression: "shy",
        },
        {
          speaker: null,
          text: "She wipes at her eyes aggressively, then the tears start anyway.",
        },
        {
          speaker: "Ruby",
          text: "I hate that it gets to me. I hate that I'm even saying this... out loud.",
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
