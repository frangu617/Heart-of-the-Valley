import type { Dialogue } from "../../../dialogues";

// Dawn Chapter 1 Event 1: "First Introduction"
// Description: Two days after the university callout, Dawn texts the player at 23:00
// and summons him to Velvet for a proper introduction.
// Trigger: handled programmatically in page.tsx (time-based, not location-based)
//
// ─── FLOW MAP ────────────────────────────────────────────────────────────────
// EVENT ENTRY: dawn_ch1_ev1_text  (programmatic, 23:00)
//   └─ (auto) → dawn_ch1_ev1_arrive
//        ├─ ["I want a name this time."]           → dawn_ch1_ev1_who
//        │    └─ (auto) → dawn_ch1_ev1_name_land
//        └─ ["Why a text?"]                        → dawn_ch1_ev1_why
//             └─ (auto) → dawn_ch1_ev1_name_give
//                  └─ (auto) → dawn_ch1_ev1_name_land
//                       ├─ ["Was the mystery routine necessary?"] → dawn_ch1_ev1_theatrics → dawn_ch1_ev1_continue
//                       ├─ ["Should I be impressed?"]            → dawn_ch1_ev1_impressed  → dawn_ch1_ev1_continue
//                       └─ ["Just Dawn?"]                        → dawn_ch1_ev1_just_dawn  → dawn_ch1_ev1_continue
//                            └─ all three → dawn_ch1_ev1_continue
//                                 ├─ ["I don't love being observed"] → dawn_ch1_ev1_watched → dawn_ch1_ev1_offer
//                                 └─ ["What do you want from me?"]   → dawn_ch1_ev1_want   → dawn_ch1_ev1_offer
//                                      └─ both → dawn_ch1_ev1_offer
//                                           ├─ ["Fine. Talk."]               → dawn_ch1_ev1_talk    → dawn_ch1_ev1_reveal
//                                           └─ ["Villain aesthetic comment"] → dawn_ch1_ev1_villain → dawn_ch1_ev1_reveal
//                                                └─ both → dawn_ch1_ev1_reveal
//                                                     ├─ ["Alright. I'm in."]    → dawn_ch1_ev1_accept → dawn_ch1_ev1_end  END
//                                                     ├─ ["Why should I trust?"] → dawn_ch1_ev1_trust  → dawn_ch1_ev1_end  END
//                                                     └─ ["This is insane..."]   → dawn_ch1_ev1_insane → dawn_ch1_ev1_end  END
// ─────────────────────────────────────────────────────────────────────────────

const dawn_ch1_ev1_text: Dialogue = {
  id: "dawn_ch1_ev1_text",
  lines: [
    {
      speaker: null,
      text: "23:00. Your phone lights up. You know who it is before you see the screen.",
    },
    {
      speaker: "Unknown Number",
      text: "Velvet. Tonight. You already know you're coming.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I do know. Annoyingly.",
      isThought: true,
    },
    {
      speaker: null,
      text: "You go anyway.",
      nextDialogueId: "dawn_ch1_ev1_arrive",
    },
  ],
};

// FROM: dawn_ch1_ev1_text → (auto Continue)
const dawn_ch1_ev1_arrive: Dialogue = {
  id: "dawn_ch1_ev1_arrive",
  lines: [
    {
      speaker: null,
      text: "Velvet is quieter than usual. Half-empty floor, music sitting low, the kind of night that invites things to be said that actually matter. She's already at the bar — seated, back straight, one drink untouched in front of her like a prop. Watching you walk in like she timed the walk from the entrance.",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    {
      speaker: "Dawn",
      text: "Forty-three seconds from the front door. I expected forty-five.",
      expression: "smug",
    },
    {
      speaker: "You",
      text: "Were you counting?",
    },
    {
      speaker: "Dawn",
      text: "Estimating. The counting was automatic.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "What do you lead with?",
      choices: [
        {
          text: "\"I want a name this time. A real one.\"",
          affectionChange: 0,
          nextDialogueId: "dawn_ch1_ev1_who",
        },
        {
          text: "\"Why a text? You seem to enjoy the unannounced entrance.\"",
          affectionChange: 1,
          nextDialogueId: "dawn_ch1_ev1_why",
        },
      ],
    },
  ],
};

// FROM: dawn_ch1_ev1_arrive → ["I want a name this time."]
const dawn_ch1_ev1_who: Dialogue = {
  id: "dawn_ch1_ev1_who",
  lines: [
    {
      speaker: "You",
      text: "I want a name. A real one.",
    },
    {
      speaker: "Dawn",
      text: "I know.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She doesn't say anything else. Just waits.",
    },
    {
      speaker: "Dawn",
      text: "Dawn.",
      expression: "neutral",
      nextDialogueId: "dawn_ch1_ev1_name_land",
    },
  ],
};

// FROM: dawn_ch1_ev1_arrive → ["Why a text?"]
const dawn_ch1_ev1_why: Dialogue = {
  id: "dawn_ch1_ev1_why",
  lines: [
    {
      speaker: "You",
      text: "Why a text? You're capable of showing up anywhere unannounced. You seem to enjoy that.",
    },
    {
      speaker: "Dawn",
      text: "I could appear anywhere. I wanted to see if you would choose to come.",
      expression: "smug",
    },
    {
      speaker: "You",
      text: "I didn't feel like I had much of a choice.",
    },
    {
      speaker: "Dawn",
      text: "Everyone has a choice. You made yours in forty-three seconds.",
      expression: "smug",
      nextDialogueId: "dawn_ch1_ev1_name_give",
    },
  ],
};

// FROM: dawn_ch1_ev1_why → (auto Continue)
const dawn_ch1_ev1_name_give: Dialogue = {
  id: "dawn_ch1_ev1_name_give",
  lines: [
    {
      speaker: "Dawn",
      text: "Dawn.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She says it simply. Like it's something she's been deciding whether to hand over.",
      nextDialogueId: "dawn_ch1_ev1_name_land",
    },
  ],
};

// FROM: dawn_ch1_ev1_who → (auto Continue) / dawn_ch1_ev1_name_give → (auto Continue)
const dawn_ch1_ev1_name_land: Dialogue = {
  id: "dawn_ch1_ev1_name_land",
  lines: [
    {
      speaker: "Dawn",
      text: "Not 'the woman from Velvet.' Not '???.' Dawn.",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "You can update your phone.",
      expression: "smug",
    },
    {
      speaker: null,
      text: "She says this as though it's a minor administrative task you were already getting around to.",
    },
    {
      speaker: "You",
      text: "How do you take that?",
      choices: [
        {
          text: "\"Was the whole mystery routine strictly necessary?\"",
          affectionChange: 0,
          nextDialogueId: "dawn_ch1_ev1_theatrics",
        },
        {
          text: "\"Should I be impressed it took you this long?\"",
          affectionChange: 1,
          nextDialogueId: "dawn_ch1_ev1_impressed",
        },
        {
          text: "\"Just Dawn?\"",
          affectionChange: 0,
          nextDialogueId: "dawn_ch1_ev1_just_dawn",
        },
      ],
    },
  ],
};

// FROM: dawn_ch1_ev1_name_land → ["Was the whole mystery routine strictly necessary?"]
const dawn_ch1_ev1_theatrics: Dialogue = {
  id: "dawn_ch1_ev1_theatrics",
  lines: [
    {
      speaker: "You",
      text: "Was all of this necessary? You could have introduced yourself at the university.",
    },
    {
      speaker: "Dawn",
      text: "Yes.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then why didn't you?",
    },
    {
      speaker: "Dawn",
      text: "Because you remember everything about tonight. You would not have remembered a hallway introduction the same way.",
      expression: "smug",
    },
    {
      speaker: "You",
      text: "I already remembered you.",
    },
    {
      speaker: null,
      text: "A pause. Something shifts in her expression — brief, small, almost real.",
      imageSlide: "/images/characters/dawn/date/happy.webp",
    },
    {
      speaker: "Dawn",
      text: "Good.",
      expression: "neutral",
      nextDialogueId: "dawn_ch1_ev1_continue",
    },
  ],
};

// FROM: dawn_ch1_ev1_name_land → ["Should I be impressed it took you this long?"]
const dawn_ch1_ev1_impressed: Dialogue = {
  id: "dawn_ch1_ev1_impressed",
  lines: [
    {
      speaker: "You",
      text: "Should I be impressed it took you this long to just say your name?",
    },
    {
      speaker: "Dawn",
      text: "Honestly? Yes.",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "Most people do not get it until I decide they have earned it. You did something to earn it. I am still calculating what.",
      expression: "smug",
      nextDialogueId: "dawn_ch1_ev1_continue",
    },
  ],
};

// FROM: dawn_ch1_ev1_name_land → ["Just Dawn?"]
const dawn_ch1_ev1_just_dawn: Dialogue = {
  id: "dawn_ch1_ev1_just_dawn",
  lines: [
    {
      speaker: "You",
      text: "Just Dawn.",
    },
    {
      speaker: "Dawn",
      text: "For now.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "That's ominous.",
    },
    {
      speaker: "Dawn",
      text: "Yes. I find it encouraging when people notice.",
      expression: "smug",
      nextDialogueId: "dawn_ch1_ev1_continue",
    },
  ],
};

// FROM: dawn_ch1_ev1_theatrics → (auto Continue) / dawn_ch1_ev1_impressed → (auto Continue) / dawn_ch1_ev1_just_dawn → (auto Continue)
const dawn_ch1_ev1_continue: Dialogue = {
  id: "dawn_ch1_ev1_continue",
  lines: [
    {
      speaker: "Dawn",
      text: "I know things about you, Professor. Things that are useful, inconvenient, or both.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "I noticed that already.",
    },
    {
      speaker: "Dawn",
      text: "I pay attention to interesting problems. Most people do not bother.",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "You are interesting. Interesting things get watched.",
      expression: "smug",
    },
    {
      speaker: "You",
      text: "What do you push back with?",
      choices: [
        {
          text: "\"I don't love being observed without being asked.\"",
          affectionChange: 0,
          nextDialogueId: "dawn_ch1_ev1_watched",
        },
        {
          text: "\"What exactly do you want from me?\"",
          affectionChange: 0,
          nextDialogueId: "dawn_ch1_ev1_want",
        },
      ],
    },
  ],
};

// FROM: dawn_ch1_ev1_continue → ["I don't love being observed without being asked."]
const dawn_ch1_ev1_watched: Dialogue = {
  id: "dawn_ch1_ev1_watched",
  lines: [
    {
      speaker: "You",
      text: "I don't love being watched without being asked first.",
    },
    {
      speaker: "Dawn",
      text: "I understand.",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "You can ask me to stop.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Will you stop?",
    },
    {
      speaker: "Dawn",
      text: "Probably not. But I will be more honest about it going forward. That is a concession.",
      expression: "smug",
      nextDialogueId: "dawn_ch1_ev1_offer",
    },
  ],
};

// FROM: dawn_ch1_ev1_continue → ["What exactly do you want from me?"]
const dawn_ch1_ev1_want: Dialogue = {
  id: "dawn_ch1_ev1_want",
  lines: [
    {
      speaker: "You",
      text: "What is it you actually want from me?",
    },
    {
      speaker: "Dawn",
      text: "Right now? I want to confirm whether you are as interesting as the data suggests.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "And?",
    },
    {
      speaker: "Dawn",
      text: "The answer is borderline. In your favor.",
      expression: "smug",
      nextDialogueId: "dawn_ch1_ev1_offer",
    },
  ],
};

// FROM: dawn_ch1_ev1_watched → (auto Continue) / dawn_ch1_ev1_want → (auto Continue)
const dawn_ch1_ev1_offer: Dialogue = {
  id: "dawn_ch1_ev1_offer",
  lines: [
    {
      speaker: "Dawn",
      text: "I am going to tell you something, and you are going to sit there and hear it.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "And if I get up and leave right now?",
    },
    {
      speaker: "Dawn",
      text: "Then you walk out with half a story, a contact you cannot explain, and exactly zero leverage over a situation that will keep moving whether you are in it or not.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She's not wrong. You sit.",
    },
    {
      speaker: "You",
      text: "How do you play this?",
      choices: [
        {
          text: "\"Fine. Talk.\"",
          affectionChange: 1,
          nextDialogueId: "dawn_ch1_ev1_talk",
        },
        {
          text: "\"You're very committed to this villain aesthetic.\"",
          affectionChange: 2,
          nextDialogueId: "dawn_ch1_ev1_villain",
        },
      ],
    },
  ],
};

// FROM: dawn_ch1_ev1_offer → ["Fine. Talk."]
const dawn_ch1_ev1_talk: Dialogue = {
  id: "dawn_ch1_ev1_talk",
  lines: [
    {
      speaker: "You",
      text: "Fine. I'm listening.",
    },
    {
      speaker: "Dawn",
      text: "I know you are. I would not have texted otherwise.",
      expression: "smug",
      nextDialogueId: "dawn_ch1_ev1_reveal",
    },
  ],
};

// FROM: dawn_ch1_ev1_offer → ["You're very committed to this villain aesthetic."]
const dawn_ch1_ev1_villain: Dialogue = {
  id: "dawn_ch1_ev1_villain",
  lines: [
    {
      speaker: "You",
      text: "The timed text. The bar positioning. The slow name reveal. You know the mysterious villain routine is a bit, right?",
    },
    {
      speaker: "Dawn",
      text: "...",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "A bit.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "You're not even going to deny it.",
    },
    {
      speaker: "Dawn",
      text: "I had six days to plan this introduction. It would be embarrassing to deny it at this point.",
      expression: "shy",
    },
    {
      speaker: null,
      text: "The corner of her mouth moves. Just slightly. Something real, gone in three seconds.",
      imageSlide: "/images/characters/dawn/date/happy.webp",
    },
    {
      speaker: "Dawn",
      text: "You are observant. That is going to be inconvenient for me.",
      expression: "neutral",
      nextDialogueId: "dawn_ch1_ev1_reveal",
    },
  ],
};

// FROM: dawn_ch1_ev1_talk → (auto Continue) / dawn_ch1_ev1_villain → (auto Continue)
const dawn_ch1_ev1_reveal: Dialogue = {
  id: "dawn_ch1_ev1_reveal",
  lines: [
    {
      speaker: "Dawn",
      text: "I have contacts at three institutions that overlap with your current situation. What I know about you, others know differently — or incompletely.",
      expression: "neutral",
      imageSlide: "/images/characters/dawn/date/neutral.webp",
    },
    {
      speaker: "Dawn",
      text: "That gap is currently useful. The question is whether you want someone in your corner who actually knows what she is doing.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Why would you do that? Help me.",
    },
    {
      speaker: "Dawn",
      text: "Because interesting problems need the right people working them.",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "And because I am tired of watching someone underestimate you.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "That lands somewhere you were not expecting it to.",
    },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "\"Alright. I'm in.\"",
          affectionChange: 5,
          nextDialogueId: "dawn_ch1_ev1_accept",
        },
        {
          text: "\"Why should I trust you?\"",
          affectionChange: 3,
          nextDialogueId: "dawn_ch1_ev1_trust",
        },
        {
          text: "\"This is objectively insane. But okay.\"",
          affectionChange: 4,
          lustChange: 1,
          nextDialogueId: "dawn_ch1_ev1_insane",
        },
      ],
    },
  ],
};

// FROM: dawn_ch1_ev1_reveal → ["Alright. I'm in."]
const dawn_ch1_ev1_accept: Dialogue = {
  id: "dawn_ch1_ev1_accept",
  lines: [
    {
      speaker: "You",
      text: "Alright. I'm in.",
    },
    {
      speaker: "Dawn",
      text: "Good.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She doesn't smile. Doesn't react visibly. Just picks up her untouched drink for the first time all night.",
      nextDialogueId: "dawn_ch1_ev1_end",
    },
  ],
};

// FROM: dawn_ch1_ev1_reveal → ["Why should I trust you?"]
const dawn_ch1_ev1_trust: Dialogue = {
  id: "dawn_ch1_ev1_trust",
  lines: [
    {
      speaker: "You",
      text: "Why should I trust you?",
    },
    {
      speaker: "Dawn",
      text: "You shouldn't.",
      expression: "neutral",
    },
    {
      speaker: "Dawn",
      text: "Not yet. Trust is something I will need to earn from you. I am telling you now so you know it is something I intend to do.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You sit with that for a moment. It's a more honest answer than you expected.",
    },
    {
      speaker: "You",
      text: "Okay.",
      nextDialogueId: "dawn_ch1_ev1_end",
    },
  ],
};

// FROM: dawn_ch1_ev1_reveal → ["This is objectively insane. But okay."]
const dawn_ch1_ev1_insane: Dialogue = {
  id: "dawn_ch1_ev1_insane",
  lines: [
    {
      speaker: "You",
      text: "This is objectively insane. But okay.",
    },
    {
      speaker: "Dawn",
      text: "...",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "A beat. Then something real — brief, warm, and clearly not part of any plan she made six days ago.",
      imageSlide: "/images/characters/dawn/date/happy.webp",
    },
    {
      speaker: "Dawn",
      text: "Thank you for keeping up.",
      expression: "happy",
      nextDialogueId: "dawn_ch1_ev1_end",
    },
  ],
};

// FROM: dawn_ch1_ev1_accept → (auto Continue) / dawn_ch1_ev1_trust → (auto Continue) / dawn_ch1_ev1_insane → (auto Continue)
const dawn_ch1_ev1_end: Dialogue = {
  id: "dawn_ch1_ev1_end",
  lines: [
    {
      speaker: null,
      text: "She sets her phone face down on the bar between you. A gesture. You understand it.",
    },
    {
      speaker: "Dawn",
      text: "I will be in touch.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "You leave Velvet somewhere after midnight. At some point between her third line and your last choice, you stopped feeling like you were summoned and started feeling like you chose to stay.",
    },
    {
      speaker: null,
      text: "Your phone buzzes once in your pocket.",
    },
    {
      speaker: "Dawn",
      text: "Save it correctly this time.",
      expression: "smug",
    },
    {
      speaker: null,
      text: "You open your contacts. Her name is already there.",
    },
  ],
};

export const dawn_ch1_ev1_text_dialogue = dawn_ch1_ev1_text;

export const dawnCh1Ev1Dialogues: Record<string, Dialogue> = {
  dawn_ch1_ev1_text,
  dawn_ch1_ev1_arrive,
  dawn_ch1_ev1_who,
  dawn_ch1_ev1_why,
  dawn_ch1_ev1_name_give,
  dawn_ch1_ev1_name_land,
  dawn_ch1_ev1_theatrics,
  dawn_ch1_ev1_impressed,
  dawn_ch1_ev1_just_dawn,
  dawn_ch1_ev1_continue,
  dawn_ch1_ev1_watched,
  dawn_ch1_ev1_want,
  dawn_ch1_ev1_offer,
  dawn_ch1_ev1_talk,
  dawn_ch1_ev1_villain,
  dawn_ch1_ev1_reveal,
  dawn_ch1_ev1_accept,
  dawn_ch1_ev1_trust,
  dawn_ch1_ev1_insane,
  dawn_ch1_ev1_end,
};
