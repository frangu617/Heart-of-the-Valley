import type { Dialogue } from "../../../dialogues";
import type { CharacterEvent } from "../../types";

// Event 4: The Turning Point
// Description: Route-specific fallout after "No More Hiding", before the nightclub date.
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// All events require: irisCh2Ev3_Done, University Hallway, 9–18h
// All dialogues are fully inline (no nextDialogueId sub-dialogues).
//
// EVENT START: iris_ch2_ev4_sub_accepted     (dominance ≤ -10, irisSchoolKissUnlocked)
//   → iris_ch2_ev4_sub_accepted_dialogue          END [irisCh2Ev4_Done, irisDatePlanned]
//
// EVENT START: iris_ch2_ev4_sub_denied       (dominance ≤ -10, irisPublicRefused)
//   → iris_ch2_ev4_sub_denied_dialogue            END [irisCh2Ev4_Done, irisDatePlanned]
//
// EVENT START: iris_ch2_ev4_dom_accepted     (dominance ≥ 10, irisSchoolKissUnlocked)
//   → iris_ch2_ev4_dom_accepted_dialogue          END [irisCh2Ev4_Done, irisDatePlanned, irisDomAcceptedKissLoopActive]
//
// EVENT START: iris_ch2_ev4_dom_denied_start (dominance ≥ 10, irisPublicRefused)
//   → iris_ch2_ev4_dom_denied_start_dialogue      END [irisCh2Ev4_Done, irisDomDeniedKissLoopActive]
//   NOTE: No irisDatePlanned here — feeds into the dom-denied random kiss loop chain instead.
//
// EVENT START: iris_ch2_ev4_balanced_accepted (dominance -9 to 9, irisSchoolKissUnlocked)
//   → iris_ch2_ev4_balanced_accepted_dialogue     END [irisCh2Ev4_Done, irisDatePlanned]
//
// EVENT START: iris_ch2_ev4_balanced_denied  (dominance -9 to 9, irisPublicRefused)
//   → iris_ch2_ev4_balanced_denied_dialogue       END [irisCh2Ev4_Done, irisDatePlanned]
// ─────────────────────────────────────────────────────────────────────────────

// EVENT ENTRY: iris_ch2_ev4_sub_accepted (SUB PATH + SchoolKissUnlocked)
const iris_ch2_ev4_sub_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_sub_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "You find Iris in the hallway between classes. She is already watching for you before you speak, gaze lingering a beat too long.",
    },
    {
      speaker: "Iris",
      text: "I have been lighter all day.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I keep catching myself looking for you in every corridor, wondering if you'll pull me in again.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I know that sounds dangerous. I just feel steadier when you are close.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "You do not have to shrink around me.",
    },
    {
      speaker: "Iris",
      text: "I am trying not to lean too hard, but I like what we are becoming.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Warmly. Lean if you need to.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Playful. Careful, I might get used to that.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Grounded. Stay close, but keep your footing.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She exhales slowly, some of the tension leaving her shoulders.",
    },
    {
      speaker: "Iris",
      text: "I do not want to play detached anymore.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "When we pass each other and pretend nothing happened, it stings.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Then stop pretending with me.",
    },
    {
      speaker: "Iris",
      text: "Even hearing that helps.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I started memorizing your schedule without meaning to.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "That sounds like a confession.",
    },
    {
      speaker: "Iris",
      text: "It is one.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I wait for your footsteps more than I should.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Reassure her. I look for you too.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Tease gently. So I am a habit now.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Set balance. Wanting me is fine. Losing yourself is not.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I can still stand on my own. I just do not want distance anymore.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I like when you choose me clearly.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "A class bell rings nearby, and students begin to fill the hall.",
    },
    {
      speaker: "You",
      text: "Then hear this clearly.",
    },
    {
      speaker: "You",
      text: "We are done circling.",
    },
    {
      speaker: "Iris",
      text: "You sound certain.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I am.",
    },
    {
      speaker: "Iris",
      text: "Then say it plain.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Your answer?",
      choices: [
        {
          text: "You and me. Date. Soon.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Friday night. No excuses.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 2,
        },
        {
          text: "I am taking you out. Consider this settled.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "That almost sounded like an order.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "It is. No hiding, no dithering.",
    },
    {
      speaker: "Iris",
      text: "Good. Then I accept.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "What night works for you?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Pick the plan.",
      choices: [
        {
          text: "Late dinner, then we walk the city.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Drinks first. Keep it light.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Your call. I just want your time.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then I will be ready.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She trails her fingers across your hand a second longer than casual, smiling like she finally gets to stop pretending.",
    },
  ],
};

// EVENT ENTRY: iris_ch2_ev4_sub_denied (SUB PATH + PublicRefused)
const iris_ch2_ev4_sub_denied_dialogue: Dialogue = {
  id: "iris_ch2_ev4_sub_denied_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris meets you at the edge of the faculty hall, both hands around a cooling cup of coffee, lipstick faint on the rim.",
    },
    {
      speaker: "Iris",
      text: "About before... I know you said no to public. I heard you.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am not here to argue with that boundary.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You look like you rehearsed this.",
    },
    {
      speaker: "Iris",
      text: "I did. Twice in the parking lot.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I am not asking for drama. Just one clean chance.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Soften. You already have my attention.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Stay cautious. Say exactly what you want.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Lighten it. Rehearsed lines are usually good lines.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "Her grip on the cup loosens a little.",
    },
    {
      speaker: "Iris",
      text: "I am asking for one date where we both show up honestly, without pretending we do not want each other.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Quiet place. No campus eyes. No mixed signals.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "If you still do not want it after that, I will take the answer and move cleanly.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "No pressure?",
    },
    {
      speaker: "Iris",
      text: "No pressure. Just intent.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "One date sounds fair.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I need clear boundaries if we do this.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I can try again, if we keep it simple.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I can do careful.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I can do patient.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I just do not want silence deciding for us.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "A few students pass, and she waits until they are gone before speaking again.",
    },
    {
      speaker: "You",
      text: "Then pitch the date.",
    },
    {
      speaker: "Iris",
      text: "Dinner. Somewhere neutral.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "You can leave early if it feels wrong. No guilt trip.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Pick your tone.",
      choices: [
        {
          text: "I can do one real date.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I will try, but we stay honest all night.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "You are getting your chance. Do not waste it.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 2,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "That is all I asked for.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "One rule.",
    },
    {
      speaker: "Iris",
      text: "Name it.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "If something feels off, we say it immediately.",
    },
    {
      speaker: "Iris",
      text: "Agreed.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "When do we go?",
      choices: [
        {
          text: "Tomorrow night.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "End of the week, after classes.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "You choose the night. I will show up.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then it is a date.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "No drama. Just us trying again.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She leaves looking calmer than when she arrived, and your next step with her feels finally defined.",
    },
  ],
};

// EVENT ENTRY: iris_ch2_ev4_dom_accepted (DOM PATH + SchoolKissUnlocked)
const iris_ch2_ev4_dom_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_dom_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris catches your sleeve, backs you lightly toward the wall, and keeps you just out of hallway traffic.",
    },
    {
      speaker: "Iris",
      text: "We skipped a step.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "We kissed first and pretended that counted as planning.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "It does not.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You sound annoyed.",
    },
    {
      speaker: "Iris",
      text: "Focused, not annoyed.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Play along. All right professor. Fix the syllabus.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Challenge her. You can ask, you know.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Meet her energy. Then tell me the missing step.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "She smirks, clearly pleased you are not backing away.",
    },
    {
      speaker: "Iris",
      text: "From now on, if I want to kiss you, I will. No warning.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "Hallway, parking lot, wherever we cross paths.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "That sounds reckless.",
    },
    {
      speaker: "Iris",
      text: "That sounds honest.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you reply?",
      choices: [
        {
          text: "Try me.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
        },
        {
          text: "Warn me before you ruin my focus.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "Keep it subtle at school.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Good. Now the missing step is a date.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "A real one, not stolen minutes between obligations.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You are really not asking.",
    },
    {
      speaker: "Iris",
      text: "Correct.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "Students file past. She does not step back.",
    },
    {
      speaker: "Iris",
      text: "Pick a night.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "And do not hide behind your schedule.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "How do you commit?",
      choices: [
        {
          text: "Friday. I am not moving it.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "You pick the place. I will be there.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I will set the night. You bring the attitude.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 2,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Better.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Dress like you mean it.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "Anything else, professor?",
    },
    {
      speaker: "Iris",
      text: "Yes.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "When we cross paths before then, do not be surprised.",
      expression: "seductive",
    },
    {
      speaker: "You",
      text: "How do you leave it?",
      choices: [
        {
          text: "I am counting on it.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
        },
        {
          text: "Do your worst.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 2,
        },
        {
          text: "Keep me guessing.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "She steals a quick kiss anyway, thumb at your jaw, and lets you go with a satisfied smile.",
    },
    {
      speaker: "Iris",
      text: "Good. Date first. Nightclub after.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She steps back into the crowd like she just issued a formal directive and expects compliance.",
    },
  ],
};

// EVENT ENTRY: iris_ch2_ev4_dom_denied_start (DOM PATH + PublicRefused — seeds kiss loop, no date)
const iris_ch2_ev4_dom_denied_start_dialogue: Dialogue = {
  id: "iris_ch2_ev4_dom_denied_start_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris stops beside you after class, posture controlled, voice low.",
    },
    {
      speaker: "Iris",
      text: "I am not here to argue your boundary.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "You said no to public. I heard you.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am still upset. And still wound tight, if I am being honest.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "At me?",
    },
    {
      speaker: "Iris",
      text: "At timing. At myself. At how much I wanted that kiss.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "I never wanted to humiliate you.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "I set a line. I am not apologizing for that.",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: 2,
        },
        {
          text: "Then tell me what this did to you.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: null,
      text: "She watches your face for a long second before continuing.",
    },
    {
      speaker: "Iris",
      text: "That kiss opened something I had sealed for years, and it has not gone quiet since.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "Now every room feels charged.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I catch myself leaning into strangers just to burn it off.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You are telling me before it gets messy.",
    },
    {
      speaker: "Iris",
      text: "I am telling you because it is already messy.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Then slow down before you hurt yourself.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I cannot control that for you.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 2,
        },
        {
          text: "I would rather hear ugly truth than silence.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "I am not asking permission.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am warning you where my head is.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "A bell rings. Neither of you moves.",
    },
    {
      speaker: "You",
      text: "What do you need right now?",
    },
    {
      speaker: "Iris",
      text: "Space to be honest.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "And room to fail once or twice without a lecture.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Your answer?",
      choices: [
        {
          text: "I can give you room, not indifference.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Do what you need. I will not chase.",
          affectionChange: -1,
          lustChange: 1,
          dominanceChange: 2,
        },
        {
          text: "Be honest with me when it gets worse.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Good.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "If you see me cross a line, do not pretend you did not.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But do not claim ownership either.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "So this is unresolved.",
    },
    {
      speaker: "Iris",
      text: "Very.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "When I can say it clearly, I will come find you.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you leave it?",
      choices: [
        {
          text: "I will listen when you are ready.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Do not drag this forever.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Then we wait and see what survives.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "That is enough for now.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She steps away before either of you can pretend this is settled.",
    },
    {
      speaker: "Iris",
      text: "I am not done with this. I am just not clean about it yet.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Then she disappears into the hallway crowd, leaving the tension unresolved.",
    },
  ],
};

// EVENT ENTRY: iris_ch2_ev4_balanced_accepted (BALANCED PATH + SchoolKissUnlocked)
const iris_ch2_ev4_balanced_accepted_dialogue: Dialogue = {
  id: "iris_ch2_ev4_balanced_accepted_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris finds you in a quiet stretch of hallway and matches your pace, shoulder brushing yours every few steps.",
    },
    {
      speaker: "Iris",
      text: "I like where we landed.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Not reckless, not frozen. Just honest.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You sound relieved.",
    },
    {
      speaker: "Iris",
      text: "I am.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "For once we did not perform for fear or ego.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "We handled it like adults.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I like you better when you are this direct.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
        },
        {
          text: "Good. Keep it this clean.",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 1,
        },
      ],
    },
    {
      speaker: null,
      text: "She gives a small laugh and relaxes into the moment.",
    },
    {
      speaker: "Iris",
      text: "I want this to keep moving.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Not fast. Just deliberate.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then set the pace.",
    },
    {
      speaker: "Iris",
      text: "One real date. Phones down. No mixed signals.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Yes. One real date.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "Only if we keep school and personal separate.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I am in. You pick the tone.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Thank you.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I want clarity more than fireworks.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She adjusts the strap on her bag and glances down the hall.",
    },
    {
      speaker: "Iris",
      text: "At school, we stay careful.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "Outside school, I do not want to pretend you are nothing.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you reply?",
      choices: [
        {
          text: "Agreed. Quiet here, honest elsewhere.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I can do that if we stay consistent.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I do not mind a little ambiguity.",
          affectionChange: 0,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Good. Then we are aligned.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "And the date?",
    },
    {
      speaker: "Iris",
      text: "Soon.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Name the day.",
    },
    {
      speaker: "Iris",
      text: "Friday works if your schedule does.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Pick the plan.",
      choices: [
        {
          text: "Dinner and a long walk.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
        {
          text: "Cocktails and music.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
        },
        {
          text: "Simple coffee date, no pressure.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Perfect.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "No games. Just show up and stay close.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "I will be there on time.",
    },
    {
      speaker: "Iris",
      text: "Good. I am done second-guessing this.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You trade a steady look and part ways with an easy certainty between you.",
    },
  ],
};

// EVENT ENTRY: iris_ch2_ev4_balanced_denied (BALANCED PATH + PublicRefused)
const iris_ch2_ev4_balanced_denied_dialogue: Dialogue = {
  id: "iris_ch2_ev4_balanced_denied_dialogue",
  lines: [
    {
      speaker: null,
      text: "Iris catches you by the faculty door, expression steady but searching, as if she has decided not to flinch.",
    },
    {
      speaker: "Iris",
      text: "You said no to public. I respect that.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "I am not here to reopen that fight.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then why are you here?",
    },
    {
      speaker: "Iris",
      text: "A reset.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "One date, clear terms, no theatrics. Just chemistry and honesty.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "A reset sounds fair.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I need specifics before I agree.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Only if this stays simple.",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: null,
      text: "She nods, as if she expected you to ask for structure.",
    },
    {
      speaker: "Iris",
      text: "Quiet place. No campus. No mixed messages.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "We talk like adults and see if this still has traction.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "And if it feels off?",
    },
    {
      speaker: "Iris",
      text: "Then we end early. No guilt, no scene.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Good. Clean exits matter.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I can work with that.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I would rather try than overthink.",
          affectionChange: 2,
          lustChange: 1,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Exactly.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "I do not want distance to harden into habit.",
      expression: "shy",
    },
    {
      speaker: "Iris",
      text: "I would rather test this than guess forever.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Voices echo from a nearby classroom, then fade again.",
    },
    {
      speaker: "You",
      text: "What are you hoping for from this?",
    },
    {
      speaker: "Iris",
      text: "A chance to feel close without pressure.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "A night where neither of us performs.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you reply?",
      choices: [
        {
          text: "Then let us make it straightforward.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "I can meet you halfway, not all the way.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "I am in, but I need consistency from you.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Then we can do this.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Boundaries stay intact.",
    },
    {
      speaker: "Iris",
      text: "Yes.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "You get honesty. I get consistency.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Set the date.",
      choices: [
        {
          text: "Tomorrow evening.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
        },
        {
          text: "Friday after work.",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
        },
        {
          text: "Your pick. I will commit.",
          affectionChange: 2,
          lustChange: 0,
          dominanceChange: -1,
        },
      ],
    },
    {
      speaker: "Iris",
      text: "Done.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "No tragedy, no ultimatums. Just a date, and no pretending.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "Then we keep it simple and see what happens.",
    },
    {
      speaker: null,
      text: "She gives you a relieved nod and heads down the hall, looking lighter than when she arrived.",
    },
  ],
};

export const irisEvent4Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev4_sub_accepted_dialogue,
  iris_ch2_ev4_sub_denied_dialogue,
  iris_ch2_ev4_dom_accepted_dialogue,
  iris_ch2_ev4_dom_denied_start_dialogue,
  iris_ch2_ev4_balanced_accepted_dialogue,
  iris_ch2_ev4_balanced_denied_dialogue,
};

export const irisEvent4Events: CharacterEvent[] = [
  {
    id: "iris_ch2_ev4_sub_accepted",
    name: "The Turning Point",
    description: "Sub route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev4_sub_accepted_dialogue,
    rewards: {
      girlStats: { affection: 2, love: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_sub_denied",
    name: "The Turning Point",
    description: "Sub route denied branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev4_sub_denied_dialogue,
    rewards: {
      girlStats: { affection: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_dom_accepted",
    name: "The Turning Point",
    description: "Dom route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev4_dom_accepted_dialogue,
    rewards: {
      girlStats: { lust: 1, affection: 1 },
      setFlags: [
        "irisCh2Ev4_Done",
        "irisDatePlanned",
        "irisDomAcceptedKissLoopActive",
      ],
    },
  },
  {
    id: "iris_ch2_ev4_dom_denied_start",
    name: "The Turning Point",
    description: "Dom route denied branch starts the unresolved loop before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 160,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev4_dom_denied_start_dialogue,
    rewards: {
      girlStats: { lust: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDomDeniedKissLoopActive"],
    },
  },
  {
    id: "iris_ch2_ev4_balanced_accepted",
    name: "The Turning Point",
    description: "Balanced route accepted branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 161,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisSchoolKissUnlocked"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: iris_ch2_ev4_balanced_accepted_dialogue,
    rewards: {
      girlStats: { affection: 2, love: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
  {
    id: "iris_ch2_ev4_balanced_denied",
    name: "The Turning Point",
    description: "Balanced route denied branch before the date.",
    quest: {
      title: "The Turning Point",
      description: "Talk to Iris after your decision in No More Hiding.",
    },
    priority: 161,
    repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev3_Done", "irisPublicRefused"],
      blockedByFlags: ["irisDatePlanned", "irisCh2Complete"],
      requiredLocation: "University Hallway",
      minHour: 9,
      maxHour: 18,
      minDominance: -9,
      maxDominance: 9,
    },
    dialogue: iris_ch2_ev4_balanced_denied_dialogue,
    rewards: {
      girlStats: { affection: 1 },
      setFlags: ["irisCh2Ev4_Done", "irisDatePlanned"],
    },
  },
];
