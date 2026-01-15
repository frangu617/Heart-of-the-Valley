import { Dialogue } from "./index";

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

export const irisDialogues: Record<string, Dialogue> = {
  Chat: {
    id: "iris_chat",
    requiresFirstTimeOnly: true,
    lines: [
      {
        speaker: "Iris",
        text: "Oh, {playerName}! I didn't expect to see you here...",
        expression: "neutral",
      },
      {
        speaker: "Iris",
        text: "How... how was your morning class?",
        expression: "neutral",
      },
      {
        speaker: "You",
        text: "How do you respond?",
        choices: [
          {
            text: "It was great! The students were really engaged today.",
            affectionChange: 2,
            moodChange: 1,
          },
          {
            text: "Same as always. Nothing special.",
            affectionChange: -1,
            moodChange: -1,
          },
          {
            text: "It would be better if I could spend more time with you.",
            affectionChange: 3,
            moodChange: 2,
            trustChange: 1,
          },
        ],
      },
      {
        speaker: "Iris",
        text: "I... I see. That's... that's good to hear.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "Iris seems pleased with your answer. You notice a slight blush on her cheeks.",
      },
    ],
  },
  Hug: {
    id: "iris_hug",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: "You", text: "Can I give you a hug?" },
      { speaker: "Iris", text: "A hug? I... um...", expression: "neutral" },
      {
        speaker: null,
        text: "Iris looks uncertain, glancing around nervously.",
      },
      {
        speaker: "Iris",
        text: "I suppose that would be... alright.",
        expression: "happy",
      },
      {
        speaker: null,
        text: "You embrace Iris gently. She seems to relax slightly in your arms.",
      },
      {
        speaker: "Iris",
        text: "Thank you, {playerName}. That was... nice.",
        expression: "love",
      },
    ],
  },
  Kiss: {
    id: "iris_kiss",
    requiresFirstTimeOnly: true,
    lines: [
      { speaker: null, text: "You lean in closer to Iris." },
      {
        speaker: "Iris",
        text: "{playerName}, what are you...?",
        expression: "neutral",
      },
      {
        speaker: null,
        text: "You kiss her softly. Her eyes widen in surprise.",
      },
      {
        speaker: "Iris",
        text: "We... we shouldn't... Dawn might...",
        expression: "sad",
      },
      {
        speaker: "You",
        text: "What do you say?",
        choices: [
          {
            text: "You're right, I'm sorry. This was a mistake.",
            affectionChange: -5,
            moodChange: -10,
            trustChange: -3,
          },
          {
            text: "Don't worry about Dawn. This is about us.",
            affectionChange: 5,
            moodChange: 5,
            trustChange: 2,
          },
          {
            text: "We can take this slow. No pressure.",
            affectionChange: 8,
            moodChange: 8,
            trustChange: 5,
          },
        ],
      },
    ],
  },
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
