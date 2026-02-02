import type { Dialogue } from "../../dialogues";
import { CharacterEvent } from "../types";

// --- DIALOGUE DEFINITIONS FOR CHAPTER 2 ---

// --- REVISED EVENT 1 DIALOGUES (BRANCHED) ---
const iris_ch2_ev1_intro: Dialogue = {
  id: "iris_ch2_ev1_intro",
  lines: [
    {
      speaker: null,
      text: "Late morning in the university hallway, you round a corner and almost bump into Iris.",
    },
    { speaker: null, text: "She looks like she has been waiting for you." },
    { speaker: "Iris", text: "Oh. I was actually looking for you.", expression: "neutral" },
    { speaker: "Iris", text: "About last night.", expression: "shy" },
    {
      speaker: "Iris",
      text: "I keep replaying it and I do not know if I am relieved or terrified.",
      expression: "neutral",
    },
    { speaker: "Iris", text: "I do not usually do impulsive.", expression: "neutral" },
    { speaker: "Iris", text: "It felt good. It also felt reckless.", expression: "shy" },
    { speaker: "Iris", text: "So tell me the truth.", expression: "neutral" },
    { speaker: "Iris", text: "What did it feel like to you?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you answer?",
      choices: [
        {
          text: "Take the lead. \"It felt right, and I want more.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_intro",
        },
        {
          text: "Offer her control. \"If you want to lead, I am listening.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 2,
          nextDialogueId: "iris_ch2_ev1_dom_intro",
        },
        {
          text: "Be calm and adult. \"I do not regret it, but we should be smart.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_dialogue",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_intro: Dialogue = {
  id: "iris_ch2_ev1_sub_intro",
  lines: [
    { speaker: null, text: "She swallows, then nods once." },
    { speaker: "Iris", text: "Direct. I can work with direct.", expression: "neutral" },
    {
      speaker: "Iris",
      text: "Part of me wanted you to take the lead.",
      expression: "shy",
    },
    { speaker: "Iris", text: "It made me feel... chosen.", expression: "shy" },
    {
      speaker: "Iris",
      text: "But I need to know if that is real or just heat.",
      expression: "neutral",
    },
    { speaker: "Iris", text: "Say it clearly.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Be warm. \"It felt right, and I want it again.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_reassure",
        },
        {
          text: "Neg her. \"You were a mess, but I could work with it.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_give_space",
        },
        {
          text: "Stay neutral. \"It happened. We can keep control.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_react_neutral",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_reassure: Dialogue = {
  id: "iris_ch2_ev1_sub_reassure",
  lines: [
    { speaker: "Iris", text: "That helps.", expression: "happy" },
    { speaker: "Iris", text: "I was worried you would laugh it off.", expression: "shy" },
    { speaker: null, text: "She fidgets with her keys, then starts talking too fast." },
    { speaker: "Iris", text: "I have a lot to juggle. Students. Papers. A kid at home.", expression: "neutral" },
    { speaker: "Iris", text: "If this becomes gossip, it stops being ours.", expression: "neutral" },
    { speaker: "Iris", text: "And I hate that I even have to say that.", expression: "shy" },
    { speaker: "Iris", text: "But I also do not want to pretend nothing happened.", expression: "neutral" },
    { speaker: "Iris", text: "So I am talking too much. Sorry.", expression: "shy" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond to the ramble?",
      choices: [
        {
          text: "Be kind. \"You are allowed to want this.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be sharp. \"Stop overthinking. Just trust me.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you ramble.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_give_space: Dialogue = {
  id: "iris_ch2_ev1_sub_give_space",
  lines: [
    { speaker: "Iris", text: "That is... blunt.", expression: "neutral" },
    { speaker: "Iris", text: "I can take blunt, but do not make me feel small.", expression: "neutral" },
    { speaker: null, text: "She straightens, steadying herself." },
    { speaker: "Iris", text: "I am not a toy you pick up when convenient.", expression: "neutral" },
    { speaker: "Iris", text: "I still have rules. I still have a life.", expression: "neutral" },
    { speaker: "Iris", text: "If this happens again, it has to mean something.", expression: "shy" },
    { speaker: "Iris", text: "I am rambling because I am nervous.", expression: "shy" },
    { speaker: "Iris", text: "And because I want this and that scares me.", expression: "shy" },
    { speaker: "Iris", text: "So say what you actually want.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"You are not small. I want you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be harsh. \"Then stop wobbling and decide.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Call it cute. \"You are adorable when you spiral.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_sub_react_neutral",
  lines: [
    { speaker: "Iris", text: "Step by step. That is fair.", expression: "neutral" },
    { speaker: "Iris", text: "That is probably the smartest answer in the building.", expression: "happy" },
    { speaker: null, text: "She exhales, then keeps talking anyway." },
    { speaker: "Iris", text: "I am juggling a lot. Students, grading, home.", expression: "neutral" },
    { speaker: "Iris", text: "If this turns into gossip, it gets messy.", expression: "neutral" },
    { speaker: "Iris", text: "But I also do not want to pretend it never happened.", expression: "shy" },
    { speaker: "Iris", text: "So I am stuck between careful and honest.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me where you want this to go.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want you, and I will be careful.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_nice",
        },
        {
          text: "Be sharp. \"Then let me decide and follow.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_sub_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you plan.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_sub_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_sub_final_nice: Dialogue = {
  id: "iris_ch2_ev1_sub_final_nice",
  lines: [
    { speaker: "Iris", text: "Okay. Carefully, then.", expression: "happy" },
    { speaker: "Iris", text: "But if you are taking the lead, then take it.", expression: "shy" },
    { speaker: null, text: "You close the distance." },
    { speaker: null, text: "You steal a kiss, slow and certain." },
    { speaker: "Iris", text: "Okay.", expression: "shy" },
    { speaker: null, text: "She leans into you, breathless." },
  ],
};

const iris_ch2_ev1_sub_final_mean: Dialogue = {
  id: "iris_ch2_ev1_sub_final_mean",
  lines: [
    { speaker: "Iris", text: "Then be consistent.", expression: "neutral" },
    { speaker: "Iris", text: "No games. No disappearing.", expression: "neutral" },
    { speaker: null, text: "You lift her chin and close the gap." },
    { speaker: null, text: "You take a kiss, firm and unapologetic." },
    { speaker: "Iris", text: "Do not make me regret that.", expression: "neutral" },
    { speaker: null, text: "She does not pull away." },
  ],
};

const iris_ch2_ev1_sub_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_sub_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute is... one way to put it.", expression: "happy" },
    { speaker: "Iris", text: "Fine. I will take cute.", expression: "happy" },
    { speaker: null, text: "You grin and pull her close." },
    { speaker: null, text: "You steal a quick kiss that turns slower." },
    { speaker: "Iris", text: "We should not do this in the hallway.", expression: "happy" },
    { speaker: null, text: "You agree and let her go." },
  ],
};

const iris_ch2_ev1_dom_intro: Dialogue = {
  id: "iris_ch2_ev1_dom_intro",
  lines: [
    { speaker: null, text: "She studies you, a spark of approval in her eyes." },
    { speaker: "Iris", text: "So you want me to lead.", expression: "neutral" },
    { speaker: "Iris", text: "I did not hate taking control.", expression: "seductive" },
    { speaker: "Iris", text: "It felt... honest.", expression: "neutral" },
    { speaker: "Iris", text: "But I will not do it if you are going to flinch.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Encourage her. \"I liked you taking control.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_playful",
        },
        {
          text: "Push back. \"You were too much.\"",
          affectionChange: -1,
          lustChange: -1,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_direct",
        },
        {
          text: "Stay neutral. \"I want clarity, not a power trip.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_dom_react_neutral",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_playful: Dialogue = {
  id: "iris_ch2_ev1_dom_playful",
  lines: [
    { speaker: "Iris", text: "Good. I do not want to pretend I am timid.", expression: "happy" },
    { speaker: "Iris", text: "I like when you listen.", expression: "seductive" },
    { speaker: null, text: "She steps closer, voice low." },
    { speaker: "Iris", text: "I have limits. Work is work.", expression: "neutral" },
    { speaker: "Iris", text: "If we do this, it is on our terms.", expression: "neutral" },
    { speaker: "Iris", text: "And I will not chase you.", expression: "neutral" },
    { speaker: "Iris", text: "That is me rambling again.", expression: "shy" },
    { speaker: "Iris", text: "Tell me if that scares you.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"It does not scare me. I trust you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Do not push too far.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"You are scary and cute.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_direct: Dialogue = {
  id: "iris_ch2_ev1_dom_direct",
  lines: [
    { speaker: "Iris", text: "Too much?", expression: "neutral" },
    { speaker: "Iris", text: "Then say that before you let me get that close.", expression: "neutral" },
    { speaker: null, text: "Her expression hardens for a moment." },
    { speaker: "Iris", text: "I am not apologizing for wanting you.", expression: "neutral" },
    { speaker: "Iris", text: "But I will not push someone who does not want it.", expression: "neutral" },
    { speaker: "Iris", text: "So be clear.", expression: "neutral" },
    { speaker: "Iris", text: "Do you want this, or do you want distance?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want it. Just slower.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Do not test me.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"Distance is not what I want.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_dom_react_neutral",
  lines: [
    { speaker: "Iris", text: "Clarity. I can do that.", expression: "neutral" },
    { speaker: "Iris", text: "I do not want a power trip either.", expression: "neutral" },
    { speaker: null, text: "She nods, thinking." },
    { speaker: "Iris", text: "I want something honest, not performative.", expression: "neutral" },
    { speaker: "Iris", text: "If we do this, it is because we both want it.", expression: "neutral" },
    { speaker: "Iris", text: "And because we can handle it.", expression: "neutral" },
    { speaker: "Iris", text: "So tell me where you stand.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"I want it. And I trust you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_nice",
        },
        {
          text: "Be sharp. \"Then do not push your luck.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -2,
          nextDialogueId: "iris_ch2_ev1_dom_final_mean",
        },
        {
          text: "Laugh it off. \"I stand right here.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 1,
          nextDialogueId: "iris_ch2_ev1_dom_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_dom_final_nice: Dialogue = {
  id: "iris_ch2_ev1_dom_final_nice",
  lines: [
    { speaker: "Iris", text: "Then listen.", expression: "seductive" },
    { speaker: "Iris", text: "We keep it discreet, and I take the lead when we are alone.", expression: "neutral" },
    { speaker: null, text: "She hooks a finger under your collar." },
    { speaker: null, text: "She steals a kiss, slow and deliberate." },
    { speaker: "Iris", text: "That is ours.", expression: "happy" },
    { speaker: null, text: "She pulls back with a satisfied smile." },
  ],
};

const iris_ch2_ev1_dom_final_mean: Dialogue = {
  id: "iris_ch2_ev1_dom_final_mean",
  lines: [
    { speaker: "Iris", text: "Do not provoke me and then act surprised.", expression: "neutral" },
    { speaker: "Iris", text: "If you want distance, ask. If you want me, be honest.", expression: "neutral" },
    { speaker: null, text: "She closes the gap and kisses you anyway, testing your reaction." },
    { speaker: "Iris", text: "That is your warning.", expression: "neutral" },
    { speaker: null, text: "You do not stop her." },
    { speaker: null, text: "She leaves you a little breathless." },
  ],
};

const iris_ch2_ev1_dom_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_dom_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute, huh?", expression: "happy" },
    { speaker: "Iris", text: "Then you will survive this.", expression: "happy" },
    { speaker: null, text: "She steps in, taking a kiss while you laugh." },
    { speaker: "Iris", text: "We are not doing this in the hallway again.", expression: "neutral" },
    { speaker: null, text: "She brushes her thumb over your lip." },
    { speaker: null, text: "She walks away like she owns the moment." },
  ],
};

const iris_ch2_ev1_neutral_dialogue: Dialogue = {
  id: "iris_ch2_ev1_neutral_dialogue",
  lines: [
    { speaker: null, text: "She lets out a slow breath." },
    { speaker: "Iris", text: "Thank you for saying it like an adult.", expression: "neutral" },
    { speaker: "Iris", text: "I liked the kiss. That is the truth.", expression: "shy" },
    { speaker: "Iris", text: "I also like my job and my sanity.", expression: "neutral" },
    { speaker: "Iris", text: "So I want something careful and real.", expression: "neutral" },
    { speaker: "Iris", text: "Tell me what you want.", expression: "neutral" },
    {
      speaker: "You",
      text: "What do you say about the kiss?",
      choices: [
        {
          text: "Be warm. \"I liked it. I want more.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_react_nice",
        },
        {
          text: "Be mean. \"Do not make a big deal of it.\"",
          affectionChange: -1,
          lustChange: -1,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_react_mean",
        },
        {
          text: "Be neutral. \"I want us to be careful.\"",
          affectionChange: 0,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_react_neutral",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_react_nice: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_nice",
  lines: [
    { speaker: "Iris", text: "I am glad you said that.", expression: "happy" },
    { speaker: "Iris", text: "I was worried it would sound needy.", expression: "shy" },
    { speaker: null, text: "She laughs softly, then keeps talking." },
    { speaker: "Iris", text: "I overthink everything.", expression: "neutral" },
    { speaker: "Iris", text: "If this becomes a rumor, it hurts both of us.", expression: "neutral" },
    { speaker: "Iris", text: "But pretending it did not happen feels worse.", expression: "shy" },
    { speaker: "Iris", text: "So I am trying to be honest without being reckless.", expression: "neutral" },
    { speaker: "Iris", text: "Does that make sense?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"It makes sense. I am with you.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"Then stop spinning it out.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"You are cute when you worry.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_react_mean: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_mean",
  lines: [
    { speaker: "Iris", text: "Ouch.", expression: "neutral" },
    { speaker: "Iris", text: "You could have said that without the sting.", expression: "neutral" },
    { speaker: null, text: "She steadies her breath." },
    { speaker: "Iris", text: "I am not asking for a declaration. I am asking for respect.", expression: "neutral" },
    { speaker: "Iris", text: "If you do not want this, say so.", expression: "neutral" },
    { speaker: "Iris", text: "If you do, do not make me feel foolish.", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"You are not foolish. I want this.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"Then toughen up.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"I am not trying to be cruel.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_react_neutral: Dialogue = {
  id: "iris_ch2_ev1_neutral_react_neutral",
  lines: [
    { speaker: "Iris", text: "Fair.", expression: "neutral" },
    { speaker: "Iris", text: "That is probably the right speed.", expression: "neutral" },
    { speaker: null, text: "She starts to ramble anyway." },
    { speaker: "Iris", text: "I do not want to hide, but I also do not want a scene.", expression: "neutral" },
    { speaker: "Iris", text: "I want it to feel like ours.", expression: "neutral" },
    { speaker: "Iris", text: "Not a secret, just private.", expression: "neutral" },
    { speaker: "Iris", text: "So... where do we land?", expression: "neutral" },
    {
      speaker: "You",
      text: "How do you respond?",
      choices: [
        {
          text: "Be kind. \"We land together.\"",
          affectionChange: 1,
          lustChange: 1,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_nice",
        },
        {
          text: "Be sharp. \"We land if you stop hesitating.\"",
          affectionChange: -1,
          lustChange: 0,
          dominanceChange: -1,
          nextDialogueId: "iris_ch2_ev1_neutral_final_mean",
        },
        {
          text: "Laugh it off. \"We land somewhere nice.\"",
          affectionChange: 1,
          lustChange: 0,
          dominanceChange: 0,
          nextDialogueId: "iris_ch2_ev1_neutral_final_laugh",
        },
      ],
    },
  ],
};

const iris_ch2_ev1_neutral_final_nice: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_nice",
  lines: [
    { speaker: "Iris", text: "Okay. We take it slow.", expression: "happy" },
    { speaker: "Iris", text: "No sneaking, just choices.", expression: "neutral" },
    { speaker: null, text: "You lean in together." },
    { speaker: null, text: "The kiss is mutual and unhurried." },
    { speaker: "Iris", text: "We will figure it out.", expression: "happy" },
    { speaker: null, text: "You both step back, a little lighter." },
  ],
};

const iris_ch2_ev1_neutral_final_mean: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_mean",
  lines: [
    { speaker: "Iris", text: "Then we set a boundary.", expression: "neutral" },
    { speaker: "Iris", text: "No games. No half answers.", expression: "neutral" },
    { speaker: null, text: "You still close the distance, careful." },
    { speaker: null, text: "The kiss is brief, like a promise and a warning." },
    { speaker: "Iris", text: "Do not make me regret being honest.", expression: "neutral" },
    { speaker: null, text: "You nod." },
  ],
};

const iris_ch2_ev1_neutral_final_laugh: Dialogue = {
  id: "iris_ch2_ev1_neutral_final_laugh",
  lines: [
    { speaker: "Iris", text: "Cute is acceptable.", expression: "happy" },
    { speaker: "Iris", text: "I can live with cute.", expression: "happy" },
    { speaker: null, text: "You both laugh, then lean in at the same time." },
    { speaker: null, text: "The kiss is mutual and a little shy." },
    { speaker: "Iris", text: "We should go before someone sees.", expression: "happy" },
    { speaker: null, text: "You agree." },
  ],
};

// --- NEW EVENT 2 DIALOGUES ---
const iris_ch2_ev2_sub_dialogue: Dialogue = {
    id: "iris_ch2_ev2_sub_dialogue",
    lines: [
        { speaker: null, text: "You spot Iris at the mall, staring blankly at a shop window. She seems lonely, lost in her own world." },
        { speaker: "Iris", text: "Oh. Hey, {playerName}.", expression: "surprised" },
        { speaker: "Iris", text: "I did not hear you walk up.", expression: "shy" },
        { speaker: "You", text: "How do you approach her?", choices: [
            { text: "Be gentle. \"You okay?\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 },
            { text: "Be teasing. \"Daydreaming again?\"", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "Be neutral. \"Long day?\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "I was just thinking. It is been a while since I wandered around by myself.", expression: "sad" },
        { speaker: "Iris", text: "After last night, I could not focus on work.", expression: "neutral" },
        { speaker: "Iris", text: "I kept replaying it.", expression: "shy" },
        { speaker: "Iris", text: "Part of me felt brave. Part of me felt reckless.", expression: "neutral" },
        { speaker: "You", text: "How do you answer?", choices: [
            { text: "Reassure her. \"It felt right.\"", affectionChange: 1, lustChange: 1, dominanceChange: -1 },
            { text: "Keep it light. \"We did not hurt anyone.\"", affectionChange: 0, lustChange: 0, dominanceChange: 0 },
            { text: "Be careful. \"We should be smart about it.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Thank you. I needed a normal answer.", expression: "shy" },
        { speaker: "Iris", text: "I am not used to letting someone see me like that.", expression: "neutral" },
        { speaker: "Iris", text: "Especially you.", expression: "shy" },
        { speaker: "Iris", text: "Do you regret it?", expression: "neutral" },
        { speaker: "You", text: "What do you say?", choices: [
            { text: "No. \"Not even a little.\"", affectionChange: 1, lustChange: 1, dominanceChange: -1 },
            { text: "Not sure. \"I am still sorting it out.\"", affectionChange: 0, lustChange: 0, dominanceChange: 0 },
            { text: "Cautious. \"It was nice, but risky.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Okay. I can work with that.", expression: "neutral" },
        { speaker: "Iris", text: "I do not want to hide. I just want to be careful.", expression: "neutral" },
        { speaker: "Iris", text: "So maybe we keep it small for now.", expression: "shy" },
        { speaker: null, text: "She glances back at the window, then at you." },
        { speaker: "Iris", text: "Do you want to walk with me?", expression: "shy" },
        { speaker: "You", text: "Your answer?", choices: [
            { text: "Of course. \"I am here.\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 },
            { text: "Only if you relax a little.", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "I would like that.", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: null, text: "You walk together through the mall, letting the noise fill the quiet." },
        { speaker: "Iris", text: "Thank you for finding me.", expression: "happy" },
        { speaker: "Iris", text: "It feels less lonely.", expression: "shy" },
        { speaker: null, text: "Her smile softens, and the tension in her shoulders eases." },
        { speaker: "Iris", text: "We should get back. Classes will start soon.", expression: "neutral" },
        { speaker: "Iris", text: "But... not the last time, okay?", expression: "happy" },
        { speaker: null, text: "She hesitates, then gives you a small, hopeful nod." },
        { speaker: "You", text: "How do you leave it?", choices: [
            { text: "Promise. \"Not the last time.\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 },
            { text: "Tease. \"Only if you keep looking at me like that.\"", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "Neutral. \"We will see.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Text me later.", expression: "happy" },
        { speaker: null, text: "She slips back into the crowd, but the distance feels smaller now." }
    ]
};

const iris_ch2_ev2_dom_dialogue: Dialogue = {
    id: "iris_ch2_ev2_dom_dialogue",
    lines: [
        { speaker: null, text: "You spot Iris at a cafe, confidently reading a book and sipping a latte." },
        { speaker: null, text: "She looks up as if sensing you, and a slow smirk spreads across her face." },
        { speaker: "Iris", text: "Fancy seeing you here, Professor.", expression: "happy" },
        { speaker: "Iris", text: "Come on. Sit.", expression: "seductive" },
        { speaker: "You", text: "How do you respond?", choices: [
            { text: "Play along. \"Yes, ma'am.\"", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Tease. \"You saving a seat for me?\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Keep it cool. \"Sure.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "Good.", expression: "happy" },
        { speaker: "Iris", text: "I like it when you do not hesitate.", expression: "seductive" },
        { speaker: "Iris", text: "About last night...", expression: "neutral" },
        { speaker: "Iris", text: "I took control and you let me.", expression: "neutral" },
        { speaker: "Iris", text: "Tell me that was not a mistake.", expression: "neutral" },
        { speaker: "You", text: "What do you say?", choices: [
            { text: "Encourage her. \"It was not a mistake. I liked it.\"", affectionChange: 1, lustChange: 1, dominanceChange: 1 },
            { text: "Set limits. \"I liked it, but we go slow.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Push back. \"Do not get ahead of yourself.\"", affectionChange: -1, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "Good. Then we are clear.", expression: "neutral" },
        { speaker: "Iris", text: "Work is work. We keep that clean.", expression: "neutral" },
        { speaker: "Iris", text: "But outside of work?", expression: "seductive" },
        { speaker: "Iris", text: "I want to be honest with you.", expression: "neutral" },
        { speaker: "Iris", text: "And I want you to be honest back.", expression: "neutral" },
        { speaker: "You", text: "How do you reply?", choices: [
            { text: "Agree. \"You will get honesty.\"", affectionChange: 1, lustChange: 0, dominanceChange: 1 },
            { text: "Challenge her. \"Then show me.\"", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Neutral. \"We will keep it clean.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "That is better.", expression: "happy" },
        { speaker: "Iris", text: "You are easy to tempt.", expression: "seductive" },
        { speaker: null, text: "She taps the edge of your cup with her finger." },
        { speaker: "Iris", text: "I should get back to campus.", expression: "neutral" },
        { speaker: "Iris", text: "But before I go...", expression: "seductive" },
        { speaker: "You", text: "How do you handle it?", choices: [
            { text: "Let her lead.", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Meet her halfway.", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Playfully stop her.", affectionChange: -1, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: null, text: "Iris leans in and steals a kiss, slow and deliberate." },
        { speaker: null, text: "Her eyes linger on you for a beat longer than necessary." },
        { speaker: "Iris", text: "That is for later.", expression: "happy" },
        { speaker: "Iris", text: "Text me when you are free.", expression: "neutral" },
        { speaker: "You", text: "Your answer?", choices: [
            { text: "Soon.\"", affectionChange: 0, lustChange: 1, dominanceChange: 1 },
            { text: "Tonight.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "We will see.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "Do not keep me waiting.", expression: "seductive" },
        { speaker: null, text: "She leaves with a confident smile, and you finish your coffee slowly." }
    ]
};

const iris_ch2_ev2_neutral_dialogue: Dialogue = {
    id: "iris_ch2_ev2_neutral_dialogue",
    lines: [
        { speaker: null, text: "While browsing in a bookstore, you reach for a novel just as someone else does." },
        { speaker: null, text: "It is Iris. You both laugh." },
        { speaker: "Iris", text: "Great minds, I guess.", expression: "happy" },
        { speaker: "Iris", text: "Or we just have good taste.", expression: "happy" },
        { speaker: "You", text: "How do you respond?", choices: [
            { text: "Flirt. \"Then we should read together.\"", affectionChange: 1, lustChange: 1, dominanceChange: 0 },
            { text: "Tease. \"You are copying my shelf.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 },
            { text: "Neutral. \"I have good taste, yes.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "I could get used to this kind of coincidence.", expression: "happy" },
        { speaker: "Iris", text: "It has been a strange week.", expression: "neutral" },
        { speaker: "Iris", text: "Last night made it stranger.", expression: "shy" },
        { speaker: "Iris", text: "I keep thinking about it.", expression: "neutral" },
        { speaker: "Iris", text: "And I keep wondering if you regret it.", expression: "neutral" },
        { speaker: "You", text: "What do you say?", choices: [
            { text: "Honest. \"I do not regret it.\"", affectionChange: 1, lustChange: 1, dominanceChange: 0 },
            { text: "Careful. \"It was nice, but risky.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 },
            { text: "Playful. \"It is living rent free in my head too.\"", affectionChange: 1, lustChange: 0, dominanceChange: -1 }
        ]},
        { speaker: "Iris", text: "That makes me feel better.", expression: "happy" },
        { speaker: "Iris", text: "I want this to be good, not messy.", expression: "neutral" },
        { speaker: "Iris", text: "I do not want to rush it.", expression: "neutral" },
        { speaker: "Iris", text: "But I also do not want to pretend it did not happen.", expression: "shy" },
        { speaker: "Iris", text: "That is the part that keeps looping in my head.", expression: "neutral" },
        { speaker: null, text: "She brushes the edge of the book with her thumb." },
        { speaker: "Iris", text: "It is strange, being this honest with you.", expression: "shy" },
        { speaker: "Iris", text: "It also feels... good.", expression: "happy" },
        { speaker: "Iris", text: "So I keep asking myself what is fair to both of us.", expression: "neutral" },
        { speaker: "Iris", text: "And I ramble. Sorry.", expression: "shy" },
        { speaker: "You", text: "How do you respond?", choices: [
            { text: "Kind. \"I like hearing you talk.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Light. \"It is cute.\"", affectionChange: 0, lustChange: 0, dominanceChange: -1 },
            { text: "Direct. \"Say what you want.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "I want something honest and slow.", expression: "neutral" },
        { speaker: "Iris", text: "Coffee is easier than hallways.", expression: "happy" },
        { speaker: "Iris", text: "And books are easier than rumors.", expression: "neutral" },
        { speaker: null, text: "She smiles and taps the cover of the book you both reached for." },
        { speaker: "Iris", text: "Maybe we trade notes sometime.", expression: "happy" },
        { speaker: "You", text: "Your answer?", choices: [
            { text: "Yes. \"Pick a day.\"", affectionChange: 1, lustChange: 0, dominanceChange: 0 },
            { text: "Flirt. \"Only if you promise to behave.\"", affectionChange: 0, lustChange: 1, dominanceChange: 0 },
            { text: "Neutral. \"We will see.\"", affectionChange: 0, lustChange: 0, dominanceChange: 1 }
        ]},
        { speaker: "Iris", text: "Deal.", expression: "happy" },
        { speaker: null, text: "You part with an easy smile and a shared book in hand." }
    ]
};

// --- UNCHANGED EVENT 3 & 4 DIALOGUES ---
// These events (Professional Interlude & The Confession) work without mentioning Dawn.

// --- NEW EVENT 5 DIALOGUES ---
const iris_ch2_date_encounter_sub: Dialogue = {
    id: "iris_ch2_date_encounter_sub",
    lines: [
        { speaker: null, text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter." },
        { speaker: null, text: "A woman with Iris's dark hair is waiting near the spot, back to you." },
        { speaker: "You", text: "Iris?" },
        { speaker: null, text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a mischievous glint." },
        { speaker: "???", text: "...", expression: "happy"},
        { speaker: "You", text: "Oh, I'm so sorry. I thought you were someone else." },
        { speaker: null, text: "She doesn't respond. She just gives you a slow, knowing smile before turning and melting back into the crowd." }
    ]
};
const iris_ch2_date_encounter_dom: Dialogue = {
    id: "iris_ch2_date_encounter_dom",
    lines: [
        { speaker: null, text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter." },
        { speaker: null, text: "You spot a familiar silhouette and walk up behind her with a hand at her lower back." },
        { speaker: "You", text: "There you are." },
        { speaker: null, text: "The woman turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, but her eyes hold a challenging glint." },
        { speaker: "???", text: "...", expression: "happy"},
        { speaker: "You", text: "Oh. My mistake. I thought you were someone else." },
        { speaker: null, text: "She doesn't respond. She just gives you a slow, amused smile before turning and vanishing into the crowd." }
    ]
};
const iris_ch2_date_encounter_neutral: Dialogue = {
    id: "iris_ch2_date_encounter_neutral",
    lines: [
        { speaker: null, text: "You arrive at the bar a few minutes early. You and Iris agreed to meet by the counter." },
        { speaker: null, text: "Someone with the same dark hair is leaning there, and you step up beside her." },
        { speaker: "You", text: "Hey—ready to order?" },
        { speaker: null, text: "She turns. It's not Iris. It's a younger woman, her face framed by the same dark hair, her eyes filled with curiosity." },
        { speaker: "???", text: "...", expression: "happy"},
        { speaker: "You", text: "Sorry about that. I mistook you for my date." },
        { speaker: null, text: "She doesn't respond. She just gives you a small, friendly smile before turning and walking away." }
    ]
};

const iris_ch2_date_after_encounter: Dialogue = {
    id: "iris_ch2_date_after_encounter",
    lines: [
        { speaker: "Iris", text: "Hey! Sorry I'm a minute late. This place is packed. Did I miss anything?", expression: "happy" },
        { speaker: "You", text: "What do you tell her?", choices: [
            { text: "You won't believe this, but I just saw your twin.", affectionChange: 1 },
            { text: "Nothing, just admiring the view.", affectionChange: 0 }
        ]}
    ]
};

// --- DIALOGUE REGISTRY ---
export const irisStoryDialogues: Record<string, Dialogue> = {
    iris_ch2_ev1_intro, iris_ch2_ev1_sub_intro, iris_ch2_ev1_dom_intro,
    iris_ch2_ev1_sub_reassure, iris_ch2_ev1_sub_give_space, iris_ch2_ev1_sub_react_neutral,
    iris_ch2_ev1_sub_final_nice, iris_ch2_ev1_sub_final_mean, iris_ch2_ev1_sub_final_laugh,
    iris_ch2_ev1_dom_playful, iris_ch2_ev1_dom_direct, iris_ch2_ev1_dom_react_neutral,
    iris_ch2_ev1_dom_final_nice, iris_ch2_ev1_dom_final_mean, iris_ch2_ev1_dom_final_laugh,
    iris_ch2_ev1_neutral_dialogue,
    iris_ch2_ev1_neutral_react_nice, iris_ch2_ev1_neutral_react_mean, iris_ch2_ev1_neutral_react_neutral,
    iris_ch2_ev1_neutral_final_nice, iris_ch2_ev1_neutral_final_mean, iris_ch2_ev1_neutral_final_laugh,
    iris_ch2_ev2_sub_dialogue, iris_ch2_ev2_dom_dialogue, iris_ch2_ev2_neutral_dialogue,
    iris_ch2_date_encounter_sub, iris_ch2_date_encounter_dom, iris_ch2_date_encounter_neutral,
    iris_ch2_date_after_encounter
};


// --- REVISED CHARACTER EVENTS FOR CHAPTER 2 ---

export const irisEvents: CharacterEvent[] = [
  // --- EVENT 1 (ALL PATHS) ---
  {
    id: "iris_ch2_ev1",
    name: "The Morning After",
    description: "You see Iris for the first time since the kiss.",
    quest: { title: "The Morning After", description: "Find Iris at the university to clear the air." },
    priority: 190, repeatable: false,
    conditions: { requiredFlags: ["irisCh1FinaleComplete"], minAffection: 10, minLust: 10 },
    dialogue: iris_ch2_ev1_intro,
    rewards: { setFlags: ["irisCh2Ev1_Done"] },
  },

  // --- REVISED EVENT 2 (ALL PATHS) ---
  {
    id: "iris_ch2_ev2_sub",
    name: "Public Encounter",
    description: "You run into Iris outside of work.",
    quest: { title: "Chance Encounter", description: "You might run into Iris while out and about." },
    priority: 180, repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev1_Done"],
      requiredLocation: "Mall",
      minAffection: 15,
      minLust: 10,
      maxDominance: -10,
    },
    dialogue: iris_ch2_ev2_sub_dialogue,
    rewards: { girlStats: { affection: 2 }, setFlags: ["irisCh2Ev2_Done"] },
  },
  {
    id: "iris_ch2_ev2_dom",
    name: "Public Encounter",
    description: "You run into Iris outside of work.",
    quest: { title: "Chance Encounter", description: "You might run into Iris while out and about." },
    priority: 180, repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev1_Done"],
      requiredLocation: "Cafe",
      minAffection: 15,
      minLust: 10,
      minDominance: 10,
    },
    dialogue: iris_ch2_ev2_dom_dialogue,
    rewards: { girlStats: { affection: 1, lust: 1 }, setFlags: ["irisCh2Ev2_Done"] },
  },
    {
    id: "iris_ch2_ev2_neutral",
    name: "Public Encounter",
    description: "You run into Iris outside of work.",
    quest: { title: "Chance Encounter", description: "You might run into Iris while out and about." },
    priority: 180, repeatable: false,
    conditions: {
      requiredFlags: ["irisCh2Ev1_Done"],
      requiredLocation: "Mall",
      minAffection: 15,
      minLust: 10,
      minDominance: -9,
      maxDominance: 9,
    }, // Assuming a bookstore is in the mall
    dialogue: iris_ch2_ev2_neutral_dialogue,
    rewards: { girlStats: { affection: 2 }, setFlags: ["irisCh2Ev2_Done"] },
  },

  // --- UNCHANGED EVENT 3 & 4 (ALL PATHS) ---
  // For brevity, these events would be here, focusing on the professional/personal tension and leading to the date decision.
  // Their logic remains the same, just without any mention of Dawn.
  // ... (Events 3 and 4 for Sub, Dom, and Neutral paths would be defined here)

  // --- REVISED EVENT 5 (DATE) ---
  {
    id: "iris_ch2_ev5_sub_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: { title: "The Date", description: "You've planned a date with Iris. It's time for a fun night out." },
    priority: 150, repeatable: false,
    conditions: { requiredFlags: ["irisDatePlanned"], requiredLocation: "Nightclub", maxDominance: -10 },
    dialogue: { id: "iris_ch2_ev5_sub_date", lines: [
        { speaker: null, text: "You and Iris plan to meet at a trendy nightclub called 'Velvet'. It's dark and loud, the bass thumping through the walls." },
        { speaker: null, text: "You arrive a few minutes early and head to the bar where you said you'd meet." },
        { speaker: null, text: "You spot someone who looks like Iris from behind and walk over.", nextDialogueId: "iris_ch2_date_encounter_sub" },
        { speaker: null, text: "A moment later, Iris shows up.", nextDialogueId: "iris_ch2_date_after_encounter" },
        { speaker: "Iris", text: "It's... a lot. I haven't been to a place like this in years.", expression: "shy" },
        { speaker: "You", text: "Just stay with me. I'll keep you safe." },
        { speaker: null, text: "You find a quieter corner booth. After a while, she relaxes, enjoying being out with you." },
        { speaker: null, text: "The rest of the date is perfect, ending with a slow, trusting kiss at her door." }
    ]},
    rewards: { girlStats: { affection: 20, love: 5 }, setFlags: ["irisCh2Complete", "metMysteryGirl"] },
  },
  {
    id: "iris_ch2_ev5_dom_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: { title: "The Date", description: "You've planned a date with Iris. It's time for a fun night out." },
    priority: 150, repeatable: false,
    conditions: { requiredFlags: ["irisDatePlanned"], requiredLocation: "Nightclub", minDominance: 10 },
    dialogue: { id: "iris_ch2_ev5_dom_date", lines: [
        { speaker: null, text: "You and Iris plan to meet at a trendy nightclub called 'Velvet'. The bass is thumping and the line is long." },
        { speaker: null, text: "You arrive first and wait at the bar, scanning the crowd." },
        { speaker: null, text: "You spot a familiar silhouette and close the distance.", nextDialogueId: "iris_ch2_date_encounter_dom" },
        { speaker: null, text: "A moment later, Iris shows up.", nextDialogueId: "iris_ch2_date_after_encounter" },
        { speaker: "Iris", text: "I hope you can keep up, Professor.", expression: "seductive" },
        { speaker: null, text: "The night is a whirlwind of dancing and flirty banter." },
        { speaker: null, text: "The rest of the date is electric, ending with a fiery, possessive kiss at her door." }
    ]},
    rewards: { girlStats: { affection: 15, lust: 10 }, setFlags: ["irisCh2Complete", "metMysteryGirl"] },
  },
  {
    id: "iris_ch2_ev5_neutral_date",
    name: "The Nightclub Date",
    description: "You take Iris on a date to a nightclub.",
    quest: { title: "The Date", description: "You've planned a date with Iris. It's time for a fun night out." },
    priority: 150, repeatable: false,
    conditions: { requiredFlags: ["irisDatePlanned"], requiredLocation: "Nightclub", minDominance: -9, maxDominance: 9 },
    dialogue: { id: "iris_ch2_ev5_neutral_date", lines: [
        { speaker: null, text: "You and Iris plan to meet at a nightclub you both agreed on. It's lively, but the bar is easy to spot." },
        { speaker: null, text: "You get there early and wait by the counter." },
        { speaker: null, text: "Someone with the same dark hair is leaning there, and you step up beside her.", nextDialogueId: "iris_ch2_date_encounter_neutral" },
        { speaker: null, text: "A moment later, Iris shows up.", nextDialogueId: "iris_ch2_date_after_encounter" },
        { speaker: "Iris", text: "This is fun! It's nice to just feel like a normal person out on a Friday night.", expression: "happy" },
        { speaker: null, text: "The conversation is easy and balanced as you find a comfortable spot to talk and people-watch." },
        { speaker: null, text: "The date ends with a comfortable, intimate kiss at her door." }
    ]},
    rewards: { girlStats: { affection: 20, love: 5 }, setFlags: ["irisCh2Complete", "metMysteryGirl"] },
  },
];



