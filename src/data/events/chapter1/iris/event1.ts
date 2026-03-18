import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 1: Coffee Collision
// Description: Iris spills coffee on you in the university hallway.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT START: iris_university_intro  (University Hallway, any time, day 1)
//   ├─ [Let it linger]           → iris_intro_stay_still
//   │    ├─ [Accept coffee]      → iris_intro_stay_accept     END [irisCoffeeAccepted]
//   │    └─ [Maybe another time] → iris_intro_stay_decline    END [irisCoffeeDeclined]
//   └─ [Step back]               → iris_intro_step_back
//        ├─ [Yeah, I'd like that]→ iris_intro_step_accept     END [irisCoffeeAccepted]
//        ├─ [Maybe another time] → iris_intro_step_decline    END [irisCoffeeDeclined]
//        └─ [Not right now]      → iris_intro_step_not_now    END [irisCoffeeDeclined]
// Rewards on all paths: hasMetIris, irisNeedsNewShirt
// ─────────────────────────────────────────────────────────────────────────────

// FROM: iris_university_intro → [Let it linger]
const irisIntroStayStill: Dialogue = {
  id: "iris_intro_stay_still",
  lines: [
    {
      speaker: null,
      text: "She drops straight to one knee and starts gathering his papers without asking. He gets a look before she glances up. He does not look away quickly enough.",
    },
    {
      speaker: null,
      text: "She tilts her head back and finds him already watching. Amber eyes through her glasses. A beat.",
    },
    {
      speaker: "You",
      text: "Nah, I'm okay. Just... really fucking hot coffee.",
      isThought: false,
    },
    {
      speaker: null,
      text: "The coffee is still burning through his shirt and that is genuinely the least of what he is currently thinking about.",
      isThought: false,
    },
    {
      speaker: "Iris",
      text: "I'm Iris. I teach Bio here. I had my nose in a book and I just -- I'm really sorry about your shirt.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She stands and reaches out, fingers pressing gently against the wet patch on his chest, checking the damage.",
    },
    {
      speaker: "Iris",
      text: "Yeah, that's not coming out.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She catches herself touching a stranger's chest and pulls her hand back.",
    },
    {
      speaker: "Iris",
      text: "Sorry. I just -- it did fit you well.",
      expression: "neutral",
    },
    { speaker: "You", text: "It'll wash. Probably." },
    {
      speaker: "Iris",
      text: "Still. What's your name? I should at least know who I just ruined.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I'm {playerName}. New instructor. Baptized in caffeine on day one, apparently.",
    },
    {
      speaker: "Iris",
      text: "First day?",
      expression: "surprised",
    },
    {
      speaker: null,
      text: "She tilts her head, something shifting in her expression.",
    },
    {
      speaker: "Iris",
      text: "Interesting people always seem to find their way to me eventually. I just didn't expect it to happen quite this fast.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Let me fix it. There's a coffee shop I like off campus -- I'll buy you a fresh one. No more wardrobe disasters.",
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

// FROM: iris_intro_stay_still → [Yeah, that sounds good]
const irisIntroStayAccept: Dialogue = {
  id: "iris_intro_stay_accept",
  lines: [
    {
      speaker: "You",
      text: "Yeah, sounds good. I could use something that stays where it's put.",
    },
    {
      speaker: "Iris",
      text: "Excellent. And achievable.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She laughs -- low and brief, like she surprised herself with it.",
    },
    {
      speaker: "Iris",
      text: "Give me your number so I can send you the address. I have a class in ten minutes and I'm already pushing it.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She pulls out her phone, screen already open.",
    },
    {
      speaker: null,
      text: "You type in your number and hand the phone back. She glances at it, types something, and your phone buzzes almost immediately.",
    },
    {
      speaker: null,
      text: "You check. It's her: Iris -- coffee, whenever you're ready. And I'm sorry about the shirt.",
    },
    {
      speaker: "Iris",
      text: "There. Now you have mine too.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She pockets her phone, gathers her book from the floor, and looks at him once more before she goes.",
    },
    {
      speaker: "Iris",
      text: "Try not to get ruined by anyone else today.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She moves off through the crowd. He watches her go longer than he strictly needed to.",
    },
    {
      speaker: "You",
      text: "Shirt's ruined, I'm late, and somehow that's already the best thing that's happened today. I should find a mall at some point.",
      isThought: true,
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

// FROM: iris_intro_stay_still → [Maybe another time]
const irisIntroStayDecline: Dialogue = {
  id: "iris_intro_stay_decline",
  lines: [
    {
      speaker: "You",
      text: "Appreciate it. I'm still figuring out where everything is.",
    },
    {
      speaker: "Iris",
      text: "Fair enough. No pressure.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She gathers her book from the floor. Composed. She's not embarrassed by the no.",
    },
    {
      speaker: "Iris",
      text: "My office is in the bio wing if you change your mind, need anything, or just want somewhere to be that isn't a flooded hallway.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I'll keep that in mind.",
    },
    {
      speaker: "Iris",
      text: "Good luck with the first day.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She moves off, already pulling out her phone.",
    },
    {
      speaker: "You",
      text: "Turned her down, shirt's still wrecked, and I'm going to be late. Could have been worse. Could have been better. I should find a mall.",
      isThought: true,
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

// FROM: iris_university_intro → [Step back]
const irisIntroStepBack: Dialogue = {
  id: "iris_intro_step_back",
  lines: [
    {
      speaker: null,
      text: "You pull your arm away. Her hand drops without fuss.",
    },
    {
      speaker: null,
      text: "She crouches to gather the papers and he watches her do it. He looks away.",
    },
    { speaker: "You", text: "It's fine. Just coffee." },
    {
      speaker: "Iris",
      text: "It's really not fine. I soaked you.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I'm Iris. I teach Bio here. And I'm sorry about the shirt.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She stands and hands back his papers, her eyes going to the stain and then back up.",
    },
    { speaker: "You", text: "{playerName}. New here." },
    {
      speaker: null,
      text: "She looks at him. Takes a moment she doesn't try to hide.",
    },
    {
      speaker: "Iris",
      text: "You're new. People worth knowing always end up in front of me sooner or later.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She says it like it's just how things work. Like she's stating weather.",
    },
    {
      speaker: "Iris",
      text: "Coffee off campus, if you want to let me make up for this. There's a place I like.",
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

// FROM: iris_intro_step_back → [Yeah, I'd like that]
const irisIntroStepAccept: Dialogue = {
  id: "iris_intro_step_accept",
  lines: [
    {
      speaker: "You",
      text: "Yeah. Sure.",
    },
    {
      speaker: null,
      text: "He said that faster than he meant to.",
    },
    {
      speaker: "You",
      text: "I mean -- yeah. Coffee sounds like a reasonable trade.",
    },
    {
      speaker: "Iris",
      text: "Gracious of you.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She tilts her head with a small smile, studying him.",
    },
    {
      speaker: "Iris",
      text: "You still look a little stunned. Coffee shock?",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Definitely the coffee.",
    },
    {
      speaker: "Iris",
      text: "Uh-huh.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She doesn't push it. She just pulls out her phone.",
    },
    {
      speaker: "Iris",
      text: "Here -- put your number in. I'm not letting you forget this before I've actually fixed it.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She holds the phone out, screen already open to contacts. He types in the number and hands it back.",
    },
    {
      speaker: null,
      text: "She types something and his phone buzzes: Iris -- don't stand me up. Sorry again about the shirt.",
    },
    {
      speaker: "Iris",
      text: "There. Now you're stuck with me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She pockets her phone, picks up her book, and goes. The crowd swallows her quickly.",
    },
    {
      speaker: "You",
      text: "First day. Shirt's wrecked, I'm late, and I just gave my number to the most disarming person I've met in a long time. Not how I expected this to go. I should find a mall.",
      isThought: true,
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

// FROM: iris_intro_step_back → [Maybe another time]
const irisIntroStepDecline: Dialogue = {
  id: "iris_intro_step_decline",
  lines: [
    {
      speaker: "You",
      text: "Appreciate it, but I'm still finding my feet here.",
    },
    {
      speaker: "Iris",
      text: "Of course. First day.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She says it without any disappointment in it. She straightens her book, shifts her bag.",
    },
    {
      speaker: "Iris",
      text: "My office is in the bio wing if you change your mind. Or just need a familiar face.",
      expression: "neutral",
    },
    { speaker: "You", text: "Thanks. I'll keep that in mind." },
    {
      speaker: null,
      text: "She nods and moves off into the crowd, already somewhere else in her head.",
    },
    {
      speaker: "You",
      text: "Clean no. She took it without a flinch. Shirt's still ruined. I should find a mall.",
      isThought: true,
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

// FROM: iris_intro_step_back → [Not right now]
const irisIntroStepNotNow: Dialogue = {
  id: "iris_intro_step_not_now",
  lines: [
    {
      speaker: "You",
      text: "Not today. I'm already losing a fight with my own syllabi.",
    },
    {
      speaker: null,
      text: "She laughs. Not politely — actually laughs, like he caught her off guard.",
    },
    {
      speaker: "Iris",
      text: "That's fair. The syllabi win a lot.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She picks up her book and adjusts her bag, still smiling.",
    },
    {
      speaker: "Iris",
      text: "The offer doesn't expire. Bio wing, when you're ready.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She heads off into the crowd. He watches her go. She doesn't look back.",
    },
    {
      speaker: "You",
      text: "She laughed. Genuinely. Shirt's still wrecked and I'm going to be late, but that was a better start than expected. I should find a mall.",
      isThought: true,
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
          text: "The hallway is a mess of morning -- students shoulder-checking each other, classroom doors swinging open and shut, the whole place smelling like cheap coffee and barely-managed stress.",
        },
        {
          speaker: "You",
          text: "Late on the first damn day. Perfect.",
          isThought: true,
        },
        {
          speaker: null,
          text: "He's got a map in one hand and a stack of syllabi that's one nudge from airborne, trying to carve a line through the crowd.",
        },
        {
          speaker: null,
          text: "He rounds the corner --",
        },
        { speaker: "You", text: "Oh, for fuck's sake--" },
        {
          speaker: null,
          text: "Scalding coffee detonates across his chest. Papers scatter like they've been waiting for an excuse. For one moment neither of them moves.",
        },
        {
          speaker: "Iris",
          text: "Oh my god. Are you alright? Did it burn you?",
          expression: "surprised",
        },
        {
          speaker: null,
          text: "Her hand closes around his forearm -- warm, immediate, checking.",
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
