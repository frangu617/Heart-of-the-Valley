import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 6: Chapter 1 Finale (Gwen Boundaries)
// Descriptions: Gwen sets terms for a real connection. | Gwen proposes a clear casual arrangement.

const gwenFinaleDomRespect: Dialogue = {
  id: "gwen_finale_dom_respect",
  lines: [
    {
      speaker: "You",
      text: "I hear you. No games, no pressure, no mixed signals.",
    },
    {
      speaker: null,
      text: "Some of the tension leaves her shoulders. She looks relieved that she does not have to fight to be understood.",
    },
    {
      speaker: "Gwen",
      text: "Good. Because I do not do guessing games well.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Rule one: you do not show up at my work acting entitled.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Rule two: if something feels off, we say it the same day.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "Rule three: no disappearing for a week and then pretending it is casual.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Those are fair rules.",
    },
    {
      speaker: "Gwen",
      text: "Then tell me yours.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you ground the moment?",
      choices: [
        {
          text: "Honesty first, even when inconvenient.",
          affectionChange: 2,
          dominanceChange: -1,
          nextDialogueId: "gwen_finale_dom_close_warm",
        },
        {
          text: "One rule each, starting tonight.",
          affectionChange: 1,
          dominanceChange: 1,
          nextDialogueId: "gwen_finale_dom_close_warm",
        },
        {
          text: "Start with a kiss. Then we talk like adults.",
          affectionChange: 0,
          lustChange: 2,
          nextDialogueId: "gwen_finale_dom_close_burn",
        },
      ],
    },
  ],
};

const gwenFinaleDomAssertive: Dialogue = {
  id: "gwen_finale_dom_assertive",
  lines: [
    {
      speaker: "You",
      text: "Set the pace. I can keep up.",
    },
    {
      speaker: null,
      text: "Gwen smirks, but her eyes stay serious. She takes one step into your apartment and waits for you to close the door.",
    },
    {
      speaker: "Gwen",
      text: "Confidence is cute. Overconfidence is expensive.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "I like intensity. I do not like being managed.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "So answer cleanly. Are you into me, or into the story about me?",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "You. Not the fantasy.",
          affectionChange: 2,
          nextDialogueId: "gwen_finale_dom_close_warm",
        },
        {
          text: "Both, if we are being honest.",
          affectionChange: 1,
          lustChange: 1,
          nextDialogueId: "gwen_finale_dom_close_burn",
        },
        {
          text: "Tonight I want the heat first.",
          affectionChange: 0,
          lustChange: 2,
          dominanceChange: 1,
          nextDialogueId: "gwen_finale_dom_close_burn",
        },
      ],
    },
  ],
};

const gwenFinaleDomCloseWarm: Dialogue = {
  id: "gwen_finale_dom_close_warm",
  lines: [
    {
      speaker: null,
      text: "She watches you for a long second, then nods like she just made a difficult decision in your favor.",
    },
    {
      speaker: "Gwen",
      text: "Okay. Then we do this slow enough to mean it.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "No pretending this is casual if it stops feeling casual.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Agreed.",
    },
    {
      speaker: null,
      text: "She steps closer until your knees almost touch, her voice dropping to something softer than her usual bravado.",
    },
    {
      speaker: "Gwen",
      text: "I like you. That is rare enough that I am trying not to wreck it.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "How do you seal it tonight?",
      choices: [
        {
          text: "Kiss her softly and keep your hand at her waist.",
          affectionChange: 2,
          lustChange: 1,
          nextDialogueId: "gwen_finale_dom_epilogue",
        },
        {
          text: "Pull her into a slow hug first.",
          affectionChange: 2,
          moodChange: 1,
          nextDialogueId: "gwen_finale_dom_epilogue",
        },
        {
          text: "Brush her jaw and let her choose the pace.",
          affectionChange: 1,
          dominanceChange: -1,
          nextDialogueId: "gwen_finale_dom_epilogue",
        },
      ],
    },
  ],
};

const gwenFinaleDomCloseBurn: Dialogue = {
  id: "gwen_finale_dom_close_burn",
  lines: [
    {
      speaker: null,
      text: "The air shifts. The conversation is still careful, but the space between you is charged.",
    },
    {
      speaker: "Gwen",
      text: "Fine. We can do heat. We still do rules.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "I do not want to be handled. I want to be met.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then we meet in the middle.",
    },
    {
      speaker: null,
      text: "She smiles at that, slow and dangerous, then rests her hand against your chest like she is checking if your words hold up under pressure.",
    },
    {
      speaker: "You",
      text: "How do you take the lead?",
      choices: [
        {
          text: "Ask before touching and hold her gaze.",
          affectionChange: 1,
          lustChange: 1,
          nextDialogueId: "gwen_finale_dom_epilogue",
        },
        {
          text: "Guide her by the waist and wait for her nod.",
          affectionChange: 1,
          lustChange: 2,
          dominanceChange: 1,
          nextDialogueId: "gwen_finale_dom_epilogue",
        },
        {
          text: "Let the tension breathe. Do not kiss yet.",
          affectionChange: 2,
          moodChange: 1,
          nextDialogueId: "gwen_finale_dom_epilogue",
        },
      ],
    },
  ],
};

const gwenFinaleDomEpilogue: Dialogue = {
  id: "gwen_finale_dom_epilogue",
  lines: [
    {
      speaker: null,
      text: "When your lips finally meet, it is deliberate, not rushed. Not performative. A choice made with both eyes open.",
    },
    {
      speaker: null,
      text: "The kiss breaks on a shared breath. Gwen stays close, forehead against yours, smiling like she is surprised she let herself trust this much.",
    },
    {
      speaker: "Gwen",
      text: "All right. We do this properly.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "No hiding. No pretending. No chaos for the sake of chaos.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then we are on the same page.",
    },
    {
      speaker: "Gwen",
      text: "Good.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She steals one last kiss at your door, then slips back into the hallway with a look that promises this is only the beginning.",
    },
  ],
};

const gwenFinaleCasualSteady: Dialogue = {
  id: "gwen_finale_casual_steady",
  lines: [
    {
      speaker: "You",
      text: "Simple and honest works for me.",
    },
    {
      speaker: null,
      text: "Gwen exhales like she was bracing for an argument that never came.",
    },
    {
      speaker: "Gwen",
      text: "Thank you. Casual does not mean careless.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "I can do fun. I can do clean. I just cannot do mind games.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Then we structure it.",
    },
    {
      speaker: "Gwen",
      text: "Pick your first rule.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "What do you set first?",
      choices: [
        {
          text: "If feelings change, we say it immediately.",
          affectionChange: 2,
          nextDialogueId: "gwen_finale_casual_close_slow",
        },
        {
          text: "One planned night a week. No ghosting.",
          affectionChange: 1,
          dominanceChange: 1,
          nextDialogueId: "gwen_finale_casual_close_slow",
        },
        {
          text: "No crossing into each other's work without an invite.",
          affectionChange: 1,
          nextDialogueId: "gwen_finale_casual_close_space",
        },
      ],
    },
  ],
};

const gwenFinaleCasualTease: Dialogue = {
  id: "gwen_finale_casual_tease",
  lines: [
    {
      speaker: "You",
      text: "Fun first. If feelings show up, we talk then.",
    },
    {
      speaker: "Gwen",
      text: "Dangerous answer. I like it.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She leans against your doorframe, arms folded, looking amused and focused at the same time.",
    },
    {
      speaker: "Gwen",
      text: "If we do this, we do not punish each other for wanting different things on different days.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Fair.",
    },
    {
      speaker: "You",
      text: "How do you frame it?",
      choices: [
        {
          text: "Keep the flirt. Drop the drama.",
          affectionChange: 1,
          lustChange: 1,
          nextDialogueId: "gwen_finale_casual_close_slow",
        },
        {
          text: "Public distance, private honesty.",
          affectionChange: 2,
          nextDialogueId: "gwen_finale_casual_close_space",
        },
        {
          text: "No promises tonight. Just chemistry.",
          affectionChange: 0,
          lustChange: 2,
          nextDialogueId: "gwen_finale_casual_close_space",
        },
      ],
    },
  ],
};

const gwenFinaleCasualBoundaries: Dialogue = {
  id: "gwen_finale_casual_boundaries",
  lines: [
    {
      speaker: "You",
      text: "I can do casual, but only with very clear boundaries.",
    },
    {
      speaker: "Gwen",
      text: "That is the first smart thing anyone has said to me about casual in a long time.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "Clarity keeps this from turning into a mess.",
      expression: "neutral",
    },
    {
      speaker: null,
      text: "She nods toward your kitchen table like this is suddenly a negotiation she actually respects.",
    },
    {
      speaker: "Gwen",
      text: "Pick one line we do not cross.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Which line do you set?",
      choices: [
        {
          text: "Text before you knock late.",
          affectionChange: 1,
          dominanceChange: 1,
          nextDialogueId: "gwen_finale_casual_close_space",
        },
        {
          text: "No mixing club talk with hallway gossip.",
          affectionChange: 1,
          nextDialogueId: "gwen_finale_casual_close_space",
        },
        {
          text: "If either feels disrespected, we pause everything.",
          affectionChange: 0,
          dominanceChange: 1,
          nextDialogueId: "gwen_finale_casual_close_space",
        },
      ],
    },
  ],
};

const gwenFinaleCasualCloseSlow: Dialogue = {
  id: "gwen_finale_casual_close_slow",
  lines: [
    {
      speaker: null,
      text: "Her expression softens. For once, Gwen looks less like she is performing confidence and more like she is choosing it carefully.",
    },
    {
      speaker: "Gwen",
      text: "This might be casual, but I still want it to feel good to come home to you.",
      expression: "shy",
    },
    {
      speaker: "You",
      text: "Then we keep it good.",
    },
    {
      speaker: "Gwen",
      text: "Say that again next week and I might believe you.",
      expression: "happy",
    },
    {
      speaker: "You",
      text: "How do you leave it tonight?",
      choices: [
        {
          text: "Soft kiss, then call it a night.",
          affectionChange: 2,
          lustChange: 1,
          nextDialogueId: "gwen_finale_casual_epilogue",
        },
        {
          text: "Hold her close, no kiss.",
          affectionChange: 2,
          moodChange: 1,
          nextDialogueId: "gwen_finale_casual_epilogue",
        },
        {
          text: "Let her choose the pace at the door.",
          affectionChange: 1,
          dominanceChange: -1,
          nextDialogueId: "gwen_finale_casual_epilogue",
        },
      ],
    },
  ],
};

const gwenFinaleCasualCloseSpace: Dialogue = {
  id: "gwen_finale_casual_close_space",
  lines: [
    {
      speaker: null,
      text: "She nods once, satisfied, like the structure itself makes her feel safer than a romantic speech would.",
    },
    {
      speaker: "Gwen",
      text: "Good. Light does not have to mean shallow.",
      expression: "neutral",
    },
    {
      speaker: "Gwen",
      text: "We keep it easy, we keep it respectful, and we see what grows on its own.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "Works for me.",
    },
    {
      speaker: "You",
      text: "How do you close the night?",
      choices: [
        {
          text: "Quick kiss, no strings tonight.",
          affectionChange: 1,
          lustChange: 2,
          nextDialogueId: "gwen_finale_casual_epilogue",
        },
        {
          text: "Touch her hand and keep distance.",
          affectionChange: 2,
          nextDialogueId: "gwen_finale_casual_epilogue",
        },
        {
          text: "Tell her you will follow her lead.",
          affectionChange: 1,
          dominanceChange: -1,
          nextDialogueId: "gwen_finale_casual_epilogue",
        },
      ],
    },
  ],
};

const gwenFinaleCasualEpilogue: Dialogue = {
  id: "gwen_finale_casual_epilogue",
  lines: [
    {
      speaker: null,
      text: "The moment stays light but real, balanced between attraction and restraint.",
    },
    {
      speaker: "Gwen",
      text: "Okay. This I can do.",
      expression: "happy",
    },
    {
      speaker: "Gwen",
      text: "No drama. No ownership. Just two adults being honest.",
      expression: "neutral",
    },
    {
      speaker: "You",
      text: "And if it changes, we say it.",
    },
    {
      speaker: "Gwen",
      text: "Exactly.",
      expression: "happy",
    },
    {
      speaker: null,
      text: "She gives you one last look in the doorway, playful and measured at once, then heads back to her apartment with the night still humming between you.",
    },
  ],
};

export const gwenEvent6Dialogues: Record<string, Dialogue> = {
  gwen_finale_dom_respect: gwenFinaleDomRespect,
  gwen_finale_dom_assertive: gwenFinaleDomAssertive,
  gwen_finale_dom_close_warm: gwenFinaleDomCloseWarm,
  gwen_finale_dom_close_burn: gwenFinaleDomCloseBurn,
  gwen_finale_dom_epilogue: gwenFinaleDomEpilogue,
  gwen_finale_casual_steady: gwenFinaleCasualSteady,
  gwen_finale_casual_tease: gwenFinaleCasualTease,
  gwen_finale_casual_boundaries: gwenFinaleCasualBoundaries,
  gwen_finale_casual_close_slow: gwenFinaleCasualCloseSlow,
  gwen_finale_casual_close_space: gwenFinaleCasualCloseSpace,
  gwen_finale_casual_epilogue: gwenFinaleCasualEpilogue,
};

export const gwenEvent6Events: CharacterEvent[] = [
  {
    id: "gwen_chapter_1_finale",
    name: "Chapter 1 Finale (Gwen Leads)",
    description: "Gwen sets terms for something real.",
    quest: {
      title: "Gwen's Terms",
      description: "Check the hallway late (8 PM-midnight).",
    },
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 8,
      minLust: 6,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenDomPath", "gwenRevealDone"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale",
      lines: [
        {
          speaker: null,
          text: "A late-night knock pulls you to the door.",
        },
        {
          speaker: null,
          text: "Gwen stands there in an oversized hoodie, hair damp, mascara finally washed off, looking less like G and more like the woman who lives across from you.",
        },
        {
          speaker: "Gwen",
          text: "You handled the club better than most people would.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "I liked that. I noticed it.",
          expression: "shy",
        },
        {
          speaker: "Gwen",
          text: "If this keeps going, I do not want half-truths and hallway guessing games.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "So I am here to set terms before this gets messy.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you respond?",
          choices: [
            {
              text: "I hear you. No games, no pressure.",
              affectionChange: 2,
              dominanceChange: -1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_finale_dom_respect",
            },
            {
              text: "Set the pace. I can keep up.",
              affectionChange: 1,
              lustChange: 1,
              dominanceChange: 1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_finale_dom_assertive",
            },
            {
              text: "Come in and spell it out. I am listening.",
              affectionChange: 1,
              lustChange: 2,
              dominanceChange: 1,
              setFlags: ["gwenDomPath"],
              nextDialogueId: "gwen_finale_dom_assertive",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwen_chapter_1_completed"],
    },
  },
  {
    id: "gwen_chapter_1_finale_sub",
    name: "Chapter 1 Finale (Keep It Casual)",
    description: "Gwen proposes a clear casual arrangement.",
    quest: {
      title: "Keep It Casual",
      description: "Check the hallway late (8 PM-midnight).",
    },
    priority: 200,
    repeatable: false,
    conditions: {
      minAffection: 8,
      minLust: 6,
      minHour: 20,
      maxHour: 24,
      requiredLocation: "Hallway",
      requiredFlags: ["gwenSubPath", "gwenRevealDone"],
    },
    dialogue: {
      id: "gwen_chapter_1_finale_sub",
      lines: [
        {
          speaker: null,
          text: "You open the door to find Gwen leaning against the frame, expression calm but deliberate.",
        },
        {
          speaker: "Gwen",
          text: "I have a proposal before either of us overcomplicates this.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "I am attracted to you. I also do not want to force this into a relationship script overnight.",
          expression: "neutral",
        },
        {
          speaker: "Gwen",
          text: "So if we keep going, we keep it casual and clean.",
          expression: "neutral",
        },
        {
          speaker: "You",
          text: "How do you answer?",
          choices: [
            {
              text: "Simple and honest works for me.",
              affectionChange: 2,
              dominanceChange: -1,
              setFlags: ["gwenSubPath"],
              nextDialogueId: "gwen_finale_casual_steady",
            },
            {
              text: "Fun first, feelings if they happen.",
              affectionChange: 1,
              lustChange: 1,
              setFlags: ["gwenSubPath"],
              nextDialogueId: "gwen_finale_casual_tease",
            },
            {
              text: "I can do casual with strict boundaries.",
              affectionChange: 1,
              dominanceChange: 1,
              setFlags: ["gwenSubPath"],
              nextDialogueId: "gwen_finale_casual_boundaries",
            },
          ],
        },
      ],
    },
    rewards: {
      setFlags: ["gwen_chapter_1_completed"],
    },
  },
];
