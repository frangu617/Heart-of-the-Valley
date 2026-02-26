import type { Dialogue } from "./index";

const makeDialogue = (id: string, lines: Dialogue["lines"]): Dialogue => ({
  id,
  requiresFirstTimeOnly: true,
  lines,
});

const irisChatChapter1 = makeDialogue("iris_chat_ch1", [
  {
    speaker: "Iris",
    text: "Oh, {playerName}. I didn't expect to run into you here.",
    expression: "neutral",
  },
  {
    speaker: "Iris",
    text: "How are classes treating you today?",
    expression: "neutral",
  },
  {
    speaker: null,
    text: "The conversation stays light and warm, and she lingers a little longer than she planned.",
  },
]);

const irisFlirtChapter1 = makeDialogue("iris_flirt_ch1", [
  { speaker: "You", text: "You look great today, Iris." },
  {
    speaker: "Iris",
    text: "That is kind of you to say. Keep your voice down before I blush in public.",
    expression: "shy",
  },
  {
    speaker: null,
    text: "She smiles despite herself, then looks away like she is trying not to encourage you too much.",
  },
]);

const irisKissChapter1 = makeDialogue("iris_kiss_ch1", [
  { speaker: null, text: "You step in and test the moment." },
  {
    speaker: "Iris",
    text: "Not here. I want this to feel deliberate, not rushed.",
    expression: "sad",
  },
  {
    speaker: null,
    text: "You both reset, the tension still there.",
  },
]);

const irisChatChapter2 = makeDialogue("iris_chat_ch2", [
  {
    speaker: "Iris",
    text: "I keep replaying that late-night hallway conversation in my head.",
    expression: "neutral",
  },
  {
    speaker: "Iris",
    text: "I am still careful. Just... less afraid of being honest with you.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "Her voice is steadier now, but the vulnerability is still real.",
  },
]);

const irisFlirtChapter2 = makeDialogue("iris_flirt_ch2", [
  { speaker: "You", text: "You are getting dangerous when you smile like that." },
  {
    speaker: "Iris",
    text: "Dangerous? Maybe. I have started enjoying how much that unsettles you.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She holds your gaze for a beat longer than before.",
  },
]);

const irisKissChapter2 = makeDialogue("iris_kiss_ch2", [
  {
    speaker: null,
    text: "Iris glances around, then closes the distance first.",
  },
  {
    speaker: "Iris",
    text: "If we do this, we do it because we chose it. Together.",
    expression: "kissingMC",
  },
  {
    speaker: null,
    text: "The kiss is soft and certain, unhurried from start to finish.",
  },
]);

const irisChatChapter3 = makeDialogue("iris_chat_ch3", [
  {
    speaker: "Iris",
    text: "I have stopped pretending this is a phase. It is not.",
    expression: "neutral",
  },
  {
    speaker: "Iris",
    text: "What we are building feels stable. That matters to me.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "You talk about practical things and private things in the same breath.",
  },
]);

const irisFlirtChapter3 = makeDialogue("iris_flirt_ch3", [
  { speaker: "You", text: "You are not shy anymore." },
  {
    speaker: "Iris",
    text: "I am still shy. I am just done hiding behind it.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She bumps your shoulder with a tiny smile that says she knows exactly what she is doing.",
  },
]);

const irisKissChapter3 = makeDialogue("iris_kiss_ch3", [
  {
    speaker: null,
    text: "You pull her in and she meets you with confidence instead of hesitation.",
  },
  {
    speaker: "Iris",
    text: "That felt like a promise.",
    expression: "kissingMC",
  },
  {
    speaker: null,
    text: "Neither of you moves right away when it ends.",
  },
]);

const irisChatChapter4 = makeDialogue("iris_chat_ch4", [
  {
    speaker: "Iris",
    text: "Whatever comes next, I do not want it to be half-true.",
    expression: "neutral",
  },
  {
    speaker: "Iris",
    text: "If we keep going, we keep going honestly.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "The conversation feels like planning a future, not surviving a moment.",
  },
]);

const irisFlirtChapter4 = makeDialogue("iris_flirt_ch4", [
  { speaker: "You", text: "You are impossible to resist." },
  {
    speaker: "Iris",
    text: "Good. I am done making myself easy to ignore.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She says it calmly, like a decision already made.",
  },
]);

const irisKissChapter4 = makeDialogue("iris_kiss_ch4", [
  {
    speaker: null,
    text: "She cups your face before you can speak and kisses you like she has chosen this path fully.",
  },
  {
    speaker: "Iris",
    text: "No more mixed signals.",
    expression: "kissingMC",
  },
  {
    speaker: null,
    text: "The moment lands heavy in the best way.",
  },
]);

const irisChatChapter5 = makeDialogue("iris_chat_ch5", [
  {
    speaker: "Iris",
    text: "We made it through the hard part. I would like to keep the good part.",
    expression: "happy",
  },
  {
    speaker: "Iris",
    text: "No performance. Just us, choosing this on purpose.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She sounds lighter than she has in a long time.",
  },
]);

const irisFlirtChapter5 = makeDialogue("iris_flirt_ch5", [
  { speaker: "You", text: "You know you still make me nervous." },
  {
    speaker: "Iris",
    text: "Keep that. I like when you look at me like I still surprise you.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She laughs softly, fully at ease.",
  },
]);

const irisKissChapter5 = makeDialogue("iris_kiss_ch5", [
  {
    speaker: null,
    text: "The kiss is easy now, practiced without feeling routine.",
  },
  {
    speaker: "Iris",
    text: "This is what I wanted. Something real that still feels alive.",
    expression: "kissingMC",
  },
  {
    speaker: null,
    text: "You stay close, like there is nowhere else to be.",
  },
]);

export const irisDialogues: Record<string, Dialogue> = {
  Chat: irisChatChapter1,
  Flirt: irisFlirtChapter1,
  Kiss: irisKissChapter2,
  Chat_Chapter1: irisChatChapter1,
  Flirt_Chapter1: irisFlirtChapter1,
  Kiss_Chapter1: irisKissChapter1,
  Chat_Chapter2: irisChatChapter2,
  Flirt_Chapter2: irisFlirtChapter2,
  Kiss_Chapter2: irisKissChapter2,
  Chat_Chapter3: irisChatChapter3,
  Flirt_Chapter3: irisFlirtChapter3,
  Kiss_Chapter3: irisKissChapter3,
  Chat_Chapter4: irisChatChapter4,
  Flirt_Chapter4: irisFlirtChapter4,
  Kiss_Chapter4: irisKissChapter4,
  Chat_Chapter5: irisChatChapter5,
  Flirt_Chapter5: irisFlirtChapter5,
  Kiss_Chapter5: irisKissChapter5,
};
