import type { Dialogue } from "./index";

const makeDialogue = (id: string, lines: Dialogue["lines"]): Dialogue => ({
  id,
  requiresFirstTimeOnly: true,
  lines,
});

const rubyChatChapter1 = makeDialogue("ruby_chat_ch1", [
  {
    speaker: "Ruby",
    text: "{playerName}! Ready for another session?",
    expression: "happy",
  },
  {
    speaker: "Ruby",
    text: "You are improving. Don't let it go to your head yet.",
    expression: "neutral",
  },
  {
    speaker: null,
    text: "She keeps it playful, but watches your reaction closely.",
  },
]);

const rubyFlirtChapter1 = makeDialogue("ruby_flirt_ch1", [
  { speaker: "You", text: "You look unfairly good in coach mode." },
  {
    speaker: "Ruby",
    text: "Focus. Flattery does not count as cardio.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She tries to stay strict, but a smile slips through.",
  },
]);

const rubyKissChapter1 = makeDialogue("ruby_kiss_ch1", [
  {
    speaker: null,
    text: "You lean in and Ruby steps back, startled.",
  },
  {
    speaker: "Ruby",
    text: "Too fast. I need trust before that.",
    expression: "sad",
  },
  {
    speaker: null,
    text: "She exhales and resets her stance.",
  },
]);

const rubyChatChapter2 = makeDialogue("ruby_chat_ch2", [
  {
    speaker: "Ruby",
    text: "Thanks for not bailing when things got messy.",
    expression: "neutral",
  },
  {
    speaker: "Ruby",
    text: "I am trying to stop running from every hard conversation.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "Her honesty lands harder than her usual bravado.",
  },
]);

const rubyFlirtChapter2 = makeDialogue("ruby_flirt_ch2", [
  { speaker: "You", text: "You are stronger than you think." },
  {
    speaker: "Ruby",
    text: "Maybe. But I still like hearing you say it.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She nudges your arm, blushing just enough to notice.",
  },
]);

const rubyKissChapter2 = makeDialogue("ruby_kiss_ch2", [
  {
    speaker: null,
    text: "Ruby hesitates, then tips up into your kiss and relaxes.",
  },
  {
    speaker: "Ruby",
    text: "Okay... yeah. I wanted that.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She stays close a little longer than she meant to.",
  },
]);

const rubyChatChapter3 = makeDialogue("ruby_chat_ch3", [
  {
    speaker: "Ruby",
    text: "I'm rebuilding everything from scratch, but it finally feels like mine.",
    expression: "neutral",
  },
  {
    speaker: "Ruby",
    text: "You make hard days feel less heavy.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She sounds steadier with each word.",
  },
]);

const rubyFlirtChapter3 = makeDialogue("ruby_flirt_ch3", [
  { speaker: "You", text: "Coach voice is cute when you're flustered." },
  {
    speaker: "Ruby",
    text: "Keep talking and I'll add extra reps.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "The threat is fake, the grin is not.",
  },
]);

const rubyKissChapter3 = makeDialogue("ruby_kiss_ch3", [
  {
    speaker: null,
    text: "She meets your kiss with confidence this time, no hesitation left.",
  },
  {
    speaker: "Ruby",
    text: "I don't want to second-guess this anymore.",
    expression: "love",
  },
  {
    speaker: null,
    text: "Her hands settle at your waist, grounded and sure.",
  },
]);

const rubyChatChapter4 = makeDialogue("ruby_chat_ch4", [
  {
    speaker: "Ruby",
    text: "I used to think surviving was enough. Now I want something better than survival.",
    expression: "neutral",
  },
  {
    speaker: "Ruby",
    text: "I want a life that actually feels good to wake up to.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "You talk through plans instead of emergencies.",
  },
]);

const rubyFlirtChapter4 = makeDialogue("ruby_flirt_ch4", [
  { speaker: "You", text: "You are allowed to want more than stability." },
  {
    speaker: "Ruby",
    text: "Then I'm allowed to want you too.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She says it softly, but without retreat.",
  },
]);

const rubyKissChapter4 = makeDialogue("ruby_kiss_ch4", [
  {
    speaker: null,
    text: "Ruby kisses you first, decisive and warm.",
  },
  {
    speaker: "Ruby",
    text: "No panic. No spiraling. Just this.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She smiles against your lips before pulling back.",
  },
]);

const rubyChatChapter5 = makeDialogue("ruby_chat_ch5", [
  {
    speaker: "Ruby",
    text: "You stayed through every ugly part. I won't forget that.",
    expression: "happy",
  },
  {
    speaker: "Ruby",
    text: "I finally feel like I can breathe.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She looks lighter, like she believes her own future now.",
  },
]);

const rubyFlirtChapter5 = makeDialogue("ruby_flirt_ch5", [
  { speaker: "You", text: "Still going to boss me around?" },
  {
    speaker: "Ruby",
    text: "Only when you need it. Which is often.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She laughs and squeezes your hand.",
  },
]);

const rubyKissChapter5 = makeDialogue("ruby_kiss_ch5", [
  {
    speaker: null,
    text: "The kiss is deep and unhurried, the kind built on trust.",
  },
  {
    speaker: "Ruby",
    text: "This feels like home now.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She rests her forehead against yours, calm and content.",
  },
]);

export const rubyDialogues: Record<string, Dialogue> = {
  Chat: rubyChatChapter1,
  Flirt: rubyFlirtChapter1,
  Kiss: rubyKissChapter2,
  Chat_Chapter1: rubyChatChapter1,
  Flirt_Chapter1: rubyFlirtChapter1,
  Kiss_Chapter1: rubyKissChapter1,
  Chat_Chapter2: rubyChatChapter2,
  Flirt_Chapter2: rubyFlirtChapter2,
  Kiss_Chapter2: rubyKissChapter2,
  Chat_Chapter3: rubyChatChapter3,
  Flirt_Chapter3: rubyFlirtChapter3,
  Kiss_Chapter3: rubyKissChapter3,
  Chat_Chapter4: rubyChatChapter4,
  Flirt_Chapter4: rubyFlirtChapter4,
  Kiss_Chapter4: rubyKissChapter4,
  Chat_Chapter5: rubyChatChapter5,
  Flirt_Chapter5: rubyFlirtChapter5,
  Kiss_Chapter5: rubyKissChapter5,
};
