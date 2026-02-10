import type { Dialogue } from "../../../dialogues";
import { CharacterEvent } from "../../types";

// Event 2: Public Encounter
// Description: You run into Iris outside of work.

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

export const irisEvent2Dialogues: Record<string, Dialogue> = {
  iris_ch2_ev2_sub_dialogue: iris_ch2_ev2_sub_dialogue,
  iris_ch2_ev2_dom_dialogue: iris_ch2_ev2_dom_dialogue,
  iris_ch2_ev2_neutral_dialogue: iris_ch2_ev2_neutral_dialogue,
};

export const irisEvent2Events: CharacterEvent[] = [
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
];
