import type { Dialogue } from "../../dialogues";
import { CharacterEvent } from "../types";

const irisIntroStayStill: Dialogue = {
  id: "iris_intro_stay_still",
  lines: [
    {
      speaker: null,
      text: "She drops to one knee to scoop up your papers. Her pink blouse pulls tight across her chest as she leans forward, buttons straining, black lace bra spilling into view--deep cleavage on full, shameless display. The short white skirt hikes up her thick thighs, fishnets stretching over soft, full curves.",
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
      text: "She reaches out, fingers splaying across the wet patch on your chest, thumb dragging slowly down the soaked fabric like she's tracing muscle.",
    },
    {
      speaker: "Iris",
      text: "This one's toast now. Shame... it fit you so well.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her hand lingers, warm through the damp cloth, before she finally pulls away with a tiny, almost satisfied smile.",
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
      text: "First day? Oh, honey, that's brutal. I basically ruined your big debut.",
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
      text: "She pulls out her phone, smile wide and a little wicked.",
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
      text: "I'm Iris--I teach Advanced Bio here. Still, I hate that I soaked you on your first day. That shirt was doing you favors.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "Her eyes slide over the wet stain, then back up your body.",
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
      text: "You still look a little dazed. Coffee shock... or something else?",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She lets the question hang with a tiny, teasing smile, clearly aware of the way your gaze has been drifting.",
    },
    { speaker: null, text: "Busted. Great." },
    { speaker: "You", text: "Definitely the coffee. Mostly." },
    { speaker: "Iris", text: "Uh-huh. Sure it is.", expression: "happy" },
    {
      speaker: null,
      text: "She winks, quick and playful, then pulls her phone from her pocket.",
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
      text: "She taps a few times, and your phone buzzes almost instantly with a text: Iris - don't forget tomorrow. And sorry again about the shirt... sort of.",
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

const irisHallwayInviteDom: Dialogue = {
  id: "iris_hallway_invite_dom",
  lines: [
    { speaker: "Iris", text: "Great! Come on in.", expression: "happy" },
    {
      speaker: null,
      text: "Iris's apartment is warm and lived-in. Books are stacked on every surface, and there's a faint smell of vanilla.",
    },
    { speaker: "Iris", text: "Dawn? Come say hi!", expression: "happy" },
    { speaker: null, text: "Silence." },
    { speaker: "Iris", text: "Dawn?", expression: "neutral" },
    {
      speaker: null,
      text: "She checks the other room and comes back with a sigh.",
    },
    {
      speaker: "Iris",
      text: "Of course. She must be at her friend's place down the hall. I completely forgot.",
      expression: "happy",
    },
    { speaker: "You", text: "The myth remains a myth." },
    { speaker: "Iris", text: "Sorry about that. But... since you're here...", expression: "neutral" },
    {
      speaker: null,
      text: "She leans against the kitchen counter, looking at you. The atmosphere shifts slightly without the kid around.",
    },
    {
      speaker: "Iris",
      text: "It's actually nice to have you to myself for a minute.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "You know, you look different outside of the university. Less... stiff.",
      expression: "happy",
    },
    { speaker: "You", text: "I try to leave the elbow patches at the office." },
    {
      speaker: null,
      text: "She laughs, stepping closer. She enters your personal space naturally.",
    },
    { speaker: "Iris", text: "Good. I like this version.", expression: "happy" },
    {
      speaker: null,
      text: "She reaches out, straightening your collar. Her fingers linger against your neck.",
    },
    { speaker: "Iris", text: "You have a little tension right here. You should be careful.", expression: "neutral" },
    { speaker: "Iris", text: "Stress is a killer. You need someone to help you relax.", expression: "neutral" },
    { speaker: "You", text: "Are you volunteering?" },
    {
      speaker: "Iris",
      text: "Maybe. I'm very good at anatomy, remember? I know exactly where the pressure points are.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She drops her voice, her eyes locking onto yours.",
    },
    {
      speaker: "Iris",
      text: "Don't be a stranger, {playerName}. My door is unlocked for you.",
      expression: "seductive",
    },
    {
      speaker: null,
      text: "You step back into the hallway, her words lingering.",
      choices: [
        {
          text: "Head home",
          affectionChange: 1,
          setFlags: ["irisDomPath"],
        },
      ],
    },
  ],
};

const irisHallwayInviteSub: Dialogue = {
  id: "iris_hallway_invite_sub",
  lines: [
    {
      speaker: "Iris",
      text: "I promise. Come on.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "Iris's apartment is warm and lived-in. Books are stacked on every surface, and there's a faint smell of vanilla.",
    },
    { speaker: "Iris", text: "Dawn? Come say hi!", expression: "happy" },
    { speaker: null, text: "Silence." },
    { speaker: "Iris", text: "Dawn?", expression: "neutral" },
    {
      speaker: null,
      text: "She checks the other room and comes back with a sigh.",
    },
    {
      speaker: "Iris",
      text: "Of course. She must be at her friend's place down the hall. I completely forgot.",
      expression: "happy",
    },
    { speaker: "You", text: "The myth remains a myth." },
    { speaker: "Iris", text: "Sorry about that. But... since you're here...", expression: "neutral" },
    {
      speaker: null,
      text: "She leans against the kitchen counter, looking at you. The atmosphere shifts slightly without the kid around.",
    },
    {
      speaker: null,
      text: "Iris tucks a strand of hair behind her ear, looking a little flushed.",
    },
    {
      speaker: "Iris",
      text: "It's... actually kind of nice that she's not here. It's been a long week.",
      expression: "shy",
    },
    { speaker: null, text: "She glances at you, then quickly looks away." },
    {
      speaker: "Iris",
      text: "I don't usually invite neighbors in like this. I hope it's not weird.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "It's not weird. You look great. (Flirt)",
          affectionChange: 2,
          trustChange: 1,
          nextDialogueId: "iris_hallway_invite_sub_flirt",
        },
        {
          text: "It's fine. Nice place. (Friendly)",
          affectionChange: 1,
          trustChange: 1,
          nextDialogueId: "iris_hallway_invite_sub_friendly",
        },
      ],
    },
  ],
};

const irisHallwayInviteSubFlirt: Dialogue = {
  id: "iris_hallway_invite_sub_flirt",
  lines: [
    {
      speaker: "You",
      text: "It's not weird at all. Besides, it gives me a chance to see you relax.",
    },
    { speaker: "You", text: "You look great, Iris." },
    { speaker: null, text: "She blinks, her face turning pink." },
    {
      speaker: "Iris",
      text: "Oh! Thank you. I... I wasn't expecting...",
      expression: "surprised",
    },
    { speaker: null, text: "She smiles, biting her lip." },
    {
      speaker: "Iris",
      text: "I'm glad you came in. Really.",
      expression: "happy",
    },
    {
      speaker: "Iris",
      text: "Well... I shouldn't keep you. I'm sure you have things to do.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But maybe we can do this again? Intentionally next time?",
      expression: "shy",
    },
    { speaker: "You", text: "I'd like that." },
    {
      speaker: null,
      text: "You step back into the hallway, her smile still warming your chest.",
      choices: [
        {
          text: "Head home",
          affectionChange: 0,
          setFlags: ["irisSubPath"],
        },
      ],
    },
  ],
};

const irisHallwayInviteSubFriendly: Dialogue = {
  id: "iris_hallway_invite_sub_friendly",
  lines: [
    { speaker: "You", text: "Not weird. You have a nice place here." },
    { speaker: "Iris", text: "Thanks. It's chaotic, but it's home.", expression: "happy" },
    {
      speaker: "Iris",
      text: "Well... I shouldn't keep you. I'm sure you have things to do.",
      expression: "neutral",
    },
    {
      speaker: "Iris",
      text: "But maybe we can do this again? Intentionally next time?",
      expression: "shy",
    },
    { speaker: "You", text: "I'd like that." },
    {
      speaker: null,
      text: "You step back into the hallway, her voice still in your ears.",
      choices: [
        {
          text: "Head home",
          affectionChange: 0,
          setFlags: ["irisSubPath"],
        },
      ],
    },
  ],
};

const irisFinaleDomChallenge: Dialogue = {
  id: "iris_finale_dom_challenge",
  lines: [
    {
      speaker: null,
      text: "Iris laughs softly, though it sounds a bit breathless.",
    },
    {
      speaker: "Iris",
      text: "Maybe I am. Maybe I'm tired of being polite neighbors.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She steps closer, invading your personal space. She reaches out, her hand resting flat against your chest, right over your heart.",
    },
    {
      speaker: null,
      text: "Her fingers curl slightly into the fabric, as if she's testing the boundary.",
    },
    { speaker: "Iris", text: "Your heart is beating fast.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Lean into her touch.",
          affectionChange: 2,
          nextDialogueId: "iris_finale_dom_success",
        },
        {
          text: "Step back.",
          affectionChange: -1,
          nextDialogueId: "iris_finale_dom_fail_back",
        },
      ],
    },
  ],
};

const irisFinaleDomDeflect: Dialogue = {
  id: "iris_finale_dom_deflect",
  lines: [
    {
      speaker: "Iris",
      text: "Work, work, work. You need to learn when to switch off.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She steps closer, invading your personal space. She reaches out, her hand resting flat against your chest, right over your heart.",
    },
    {
      speaker: null,
      text: "Her fingers curl slightly into the fabric, as if she's testing the boundary.",
    },
    { speaker: "Iris", text: "Your heart is beating fast.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Lean into her touch.",
          affectionChange: 1,
          nextDialogueId: "iris_finale_dom_fail_lean",
        },
        {
          text: "Step back.",
          affectionChange: -1,
          nextDialogueId: "iris_finale_dom_fail_back",
        },
      ],
    },
  ],
};

const irisFinaleDomSuccess: Dialogue = {
  id: "iris_finale_dom_success",
  lines: [
    {
      speaker: null,
      text: "You don't pull away. You lean slightly forward, letting her feel the rhythm.",
    },
    { speaker: "You", text: "You have that effect on people." },
    { speaker: null, text: "Her eyes darken, her resolve slipping." },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "seductive",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "seductive",
    },
    { speaker: null, text: "She grips your shirt, pulling you down. It's impulsive, almost rough." },
    { speaker: "Iris", text: "I shouldn't do this. I really shouldn't.", expression: "shy" },
    { speaker: "Iris", text: "But I want to.", expression: "shy" },
    {
      speaker: null,
      text: "Before you can respond, she kisses you. It's not a question; it's a demand.",
    },
    {
      speaker: null,
      text: "Her lips are hungry, pressing against yours with a desperate energy. It feels like she's losing a fight with herself, and you're the collateral damage.",
    },
    { speaker: null, text: "For a moment, you surrender to it, the heat between you spiking." },
    { speaker: null, text: "Then, she breaks the kiss abruptly." },
    {
      speaker: null,
      text: "She stares at you, chest heaving, eyes wide as the reality of what she just did crashes in.",
    },
    { speaker: "Iris", text: "I... oh god.", expression: "surprised" },
    {
      speaker: "Iris",
      text: "I didn't mean to... I mean, I did, but...",
      expression: "surprised",
    },
    { speaker: null, text: "She panics, turning on her heel." },
    { speaker: "Iris", text: "I have to go!", expression: "surprised" },
    {
      speaker: null,
      text: "She sprints back to her apartment, slamming the door shut behind her.",
    },
  ],
};

const irisFinaleDomFailBack: Dialogue = {
  id: "iris_finale_dom_fail_back",
  lines: [
    { speaker: null, text: "You take a half-step back." },
    { speaker: "You", text: "Iris, what are you doing?" },
    {
      speaker: null,
      text: "She frowns, frustration flashing across her face, but she steps forward again to close the gap.",
    },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "sad",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "sad",
    },
    { speaker: null, text: "She searches your face, then sighs, the moment breaking." },
    {
      speaker: "Iris",
      text: "Never mind. I'm just... tired. Forget I said anything.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She walks past you, heading back to her room without looking back.",
    },
  ],
};

const irisFinaleDomFailLean: Dialogue = {
  id: "iris_finale_dom_fail_lean",
  lines: [
    {
      speaker: null,
      text: "You don't pull away. You lean slightly forward, letting her feel the rhythm.",
    },
    { speaker: "You", text: "You have that effect on people." },
    { speaker: null, text: "Her eyes darken, her resolve slipping." },
    {
      speaker: null,
      text: "She moves her hand up to your neck, her thumb grazing your pulse point. Her voice drops, thick with something she's trying to suppress.",
    },
    {
      speaker: "Iris",
      text: "I've been thinking about you. About how much you hold back.",
      expression: "sad",
    },
    {
      speaker: "Iris",
      text: "I hate it when you hold back.",
      expression: "sad",
    },
    { speaker: null, text: "She searches your face, then sighs, the moment breaking." },
    {
      speaker: "Iris",
      text: "Never mind. I'm just... tired. Forget I said anything.",
      expression: "sad",
    },
    {
      speaker: null,
      text: "She walks past you, heading back to her room without looking back.",
    },
  ],
};

const irisFinaleSubStepCloser: Dialogue = {
  id: "iris_finale_sub_step_closer",
  lines: [
    {
      speaker: null,
      text: "You close the distance between you. She doesn't retreat; she looks up at you, eyes wide.",
    },
    { speaker: "Iris", text: "I just... wanted to see you.", expression: "shy" },
    {
      speaker: null,
      text: "She looks at her feet, then back up at you, biting her lip.",
    },
    {
      speaker: "Iris",
      text: "Every time I see you, I feel like... like I'm waiting for something to happen.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Take charge. (Touch her chin)",
          affectionChange: 2,
          nextDialogueId: "iris_finale_sub_success",
        },
        {
          text: "Ask her. 'What do you want to happen?'",
          affectionChange: 0,
          nextDialogueId: "iris_finale_sub_fail_ask",
        },
      ],
    },
  ],
};

const irisFinaleSubStayBack: Dialogue = {
  id: "iris_finale_sub_stay_back",
  lines: [
    { speaker: "Iris", text: "Yeah. Here you are.", expression: "shy" },
    {
      speaker: null,
      text: "She looks at her feet, then back up at you, biting her lip.",
    },
    {
      speaker: "Iris",
      text: "Every time I see you, I feel like... like I'm waiting for something to happen.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "What do you do?",
      choices: [
        {
          text: "Take charge. (Touch her chin)",
          affectionChange: 1,
          nextDialogueId: "iris_finale_sub_fail_take_charge",
        },
        {
          text: "Ask her. 'What do you want to happen?'",
          affectionChange: 0,
          nextDialogueId: "iris_finale_sub_fail_ask",
        },
      ],
    },
  ],
};

const irisFinaleSubSuccess: Dialogue = {
  id: "iris_finale_sub_success",
  lines: [
    {
      speaker: null,
      text: "You reach out, gently lifting her chin so she has to look at you.",
    },
    { speaker: "You", text: "Then let's make something happen." },
    { speaker: null, text: "She shudders under your touch, her breath hitching." },
    { speaker: "You", text: "Iris. Look at me." },
    {
      speaker: null,
      text: "You don't give her time to overthink. You wrap an arm around her waist and pull her into you.",
    },
    { speaker: "Iris", text: "Oh--!", expression: "surprised" },
    {
      speaker: null,
      text: "You kiss her deeply, swallowing her surprise. You kiss her with intent, possessive and firm, letting her know exactly where she stands.",
    },
    {
      speaker: null,
      text: "She melts instantly, her hands clutching your shoulders, making a soft, desperate sound against your mouth.",
    },
    {
      speaker: null,
      text: "When you finally pull back, she looks completely unraveled. Her face is flushed, her lips swollen.",
    },
    { speaker: "Iris", text: "I...", expression: "surprised" },
    {
      speaker: null,
      text: "She touches her lips, looking at you with a mix of desire and total panic.",
    },
    { speaker: "Iris", text: "I can't... this is...", expression: "surprised" },
    { speaker: null, text: "Overwhelmed, she spins around." },
    { speaker: "Iris", text: "Goodnight!", expression: "surprised" },
    {
      speaker: null,
      text: "She practically runs back to her apartment, the door clicking shut a second later.",
    },
  ],
};

const irisFinaleSubFailTakeCharge: Dialogue = {
  id: "iris_finale_sub_fail_take_charge",
  lines: [
    {
      speaker: null,
      text: "You reach out, gently lifting her chin so she has to look at you.",
    },
    { speaker: "You", text: "Then let's make something happen." },
    { speaker: null, text: "She shudders under your touch, her breath hitching." },
    {
      speaker: null,
      text: "The moment hangs in the air, heavy and awkward, but neither of you moves to break it.",
    },
    { speaker: "Iris", text: "I should... probably go back inside. Dawn might wake up.", expression: "sad" },
    { speaker: "You", text: "Yeah. Goodnight, Iris." },
    { speaker: null, text: "She slips back into her apartment, leaving you in the hall." },
  ],
};

const irisFinaleSubFailAsk: Dialogue = {
  id: "iris_finale_sub_fail_ask",
  lines: [
    { speaker: "Iris", text: "I don't know... something.", expression: "shy" },
    {
      speaker: null,
      text: "The moment hangs in the air, heavy and awkward, but neither of you moves to break it.",
    },
    { speaker: "Iris", text: "I should... probably go back inside. Dawn might wake up.", expression: "sad" },
    { speaker: "You", text: "Yeah. Goodnight, Iris." },
    { speaker: null, text: "She slips back into her apartment, leaving you in the hall." },
  ],
};

export const irisIntroCoffeeDate: Dialogue = {
  id: "iris_intro_coffee_yes",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe. The morning air is crisp and refreshing.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: "Iris",
      text: "I... I'm glad you agreed to come with me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "You both order coffee and find a quiet corner table.",
    },
    {
      speaker: "Iris",
      text: "You know, {playerName}... we've worked together for a while now, but we rarely talk outside of work.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You're right. We should do this more often.",
    },
    {
      speaker: "Iris",
      text: "I'd... I'd like that very much.",
      expression: "love",
    },
    {
      speaker: null,
      text: "You spend a pleasant hour talking about books, teaching, and life. The conversation flows naturally.",
    },
    {
      speaker: "Iris",
      text: "Thank you for this, {playerName}. It means a lot to me.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "As you finish your coffee, you feel like this was the start of something special.",
    },
  ],
};

export const irisRegularCoffeeDate: Dialogue = {
  id: "iris_regular_coffee",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: null,
      text: "You enjoy a cup of coffee together",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
  ],
};

export const irisSexyCoffeeDate: Dialogue = {
  id: "iris_sexy_coffee",
  lines: [
    {
      speaker: null,
      text: "You walk together to the nearby cafe.",
      imageSlide: "/images/locations/cafe/morning.png",
    },
    {
      speaker: null,
      text: "You enjoy a cup of coffee together",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
    {
      speaker: "Iris",
      text: "You're so sexy, {playerName}.",
    },
    {
      speaker: "Iris",
      text: "I want you so bad!",
      choices: [
        {
          text: "Lets get out of here.",
          affectionChange: 10,
          trustChange: 10,
          moodChange: 10,
          nextDialogueId: "iris_after_coffee_sex",
          condition: {
            minLove: 75,
          },
        },
        {
          text: "Not today.",
          affectionChange: -10,
          trustChange: -10,
          moodChange: -10,
        },
      ],
    },
  ],
};

export const irisAfterCoffeeSex: Dialogue = {
  id: "iris_after_coffee_sex",
  lines: [
    {
      speaker: null,
      text: "You walk away from the cafe.",
      imageSlide: "/images/locations/cafe/afternoon.png",
    },
    {
      speaker: "Iris",
      text: "I want you to fuck me so bad!",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
    {
      speaker: "Iris",
      text: "You're so big, I still can't get used to it",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
    {
      speaker: null,
      text: "You have sex with Iris",
      imageSlide: "images/events/Iris_living_room_sex.png",
    },
  ],
};

export const irisStoryDialogues: Record<string, Dialogue> = {
  iris_intro_stay_still: irisIntroStayStill,
  iris_intro_stay_accept: irisIntroStayAccept,
  iris_intro_stay_decline: irisIntroStayDecline,
  iris_intro_step_back: irisIntroStepBack,
  iris_intro_step_accept: irisIntroStepAccept,
  iris_intro_step_decline: irisIntroStepDecline,
  iris_intro_step_not_now: irisIntroStepNotNow,
  iris_hallway_invite_dom: irisHallwayInviteDom,
  iris_hallway_invite_sub: irisHallwayInviteSub,
  iris_hallway_invite_sub_flirt: irisHallwayInviteSubFlirt,
  iris_hallway_invite_sub_friendly: irisHallwayInviteSubFriendly,
  iris_finale_dom_challenge: irisFinaleDomChallenge,
  iris_finale_dom_deflect: irisFinaleDomDeflect,
  iris_finale_dom_success: irisFinaleDomSuccess,
  iris_finale_dom_fail_back: irisFinaleDomFailBack,
  iris_finale_dom_fail_lean: irisFinaleDomFailLean,
  iris_finale_sub_step_closer: irisFinaleSubStepCloser,
  iris_finale_sub_stay_back: irisFinaleSubStayBack,
  iris_finale_sub_success: irisFinaleSubSuccess,
  iris_finale_sub_fail_take_charge: irisFinaleSubFailTakeCharge,
  iris_finale_sub_fail_ask: irisFinaleSubFailAsk,
  iris_intro_coffee_yes: irisIntroCoffeeDate,
  iris_regular_coffee: irisRegularCoffeeDate,
  iris_sexy_coffee: irisSexyCoffeeDate,
  iris_after_coffee_sex: irisAfterCoffeeSex,
};

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
      setFlags: ["hasMetIris", "irisNeedsNewShirt"],
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
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["hasMetIris", "irisCoffeeAccepted"],
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
      setFlags: ["irisCoffeeMet"],
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
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Cafe",
      requiredFlags: ["hasMetIris", "irisCoffeeDeclined"],
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
      setFlags: ["irisCoffeeMet"],
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
      minAffection: 0,
      minTrust: 0,
      minHour: 18,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["irisCoffeeMet"],
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
        { speaker: "You", text: "Hard to miss me. I'm the one making noise at 2 AM." },
        { speaker: "Iris", text: "Actually, that's usually me. Grading papers.", expression: "happy" },
        { speaker: null, text: "She tosses the bag into the chute and wipes her hands." },
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
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredPreviousEvents: ["iris_hallway_invite_event"],
      requiredFlags: ["irisNeedsNewShirt", "irisDomPath"],
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
        { speaker: "Iris", text: "Let's call it a strategy. I bought way too much.", expression: "happy" },
        {
          speaker: null,
          text: "She glances at the bag you caught. It has a distinct lace pattern on the packaging.",
        },
        { speaker: "Iris", text: "Especially that one. You have good reflexes.", expression: "happy" },
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
        { speaker: "Iris", text: "You know... since you've already handled the merchandise...", expression: "seductive" },
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
      minAffection: 0,
      minTrust: 0,
      minHour: 0,
      maxHour: 24,
      requiredLocation: "Mall",
      requiredPreviousEvents: ["iris_hallway_invite_event"],
      requiredFlags: ["irisNeedsNewShirt", "irisSubPath"],
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
        { speaker: "Iris", text: "Just... things. Retail therapy got out of hand.", expression: "shy" },
        {
          speaker: null,
          text: "She notices you holding the bag you caught--the one with the lingerie logo--and her eyes go wide. She quickly tries to snatch it back.",
        },
        { speaker: "Iris", text: "That one isn't... it's just socks! Boring socks!", expression: "shy" },
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
        { speaker: "Iris", text: "Thanks for the rescue. Again.", expression: "shy" },
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
      minAffection: 0,
      minTrust: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["iris_hallway_invite_event", "iris_mall_bump_dom"],
      requiredFlags: ["irisDomPath"],
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
        { speaker: "Iris", text: "Are you? You look restless.", expression: "neutral" },
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
      minAffection: 0,
      minTrust: 0,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredPreviousEvents: ["iris_hallway_invite_event", "iris_mall_bump_sub"],
      requiredFlags: ["irisSubPath"],
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
        { speaker: "Iris", text: "I'm... actually glad I ran into you.", expression: "shy" },
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
