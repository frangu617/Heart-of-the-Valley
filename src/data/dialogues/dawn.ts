import type { Dialogue } from "./index";

const makeDialogue = (id: string, lines: Dialogue["lines"]): Dialogue => ({
  id,
  requiresFirstTimeOnly: true,
  lines,
});

const dawnChatChapter1 = makeDialogue("dawn_chat_ch1", [
  {
    speaker: "Dawn",
    text: "You look like you're thinking too hard, {playerName}.",
    expression: "happy",
  },
  {
    speaker: "Dawn",
    text: "Most people overcomplicate what they already want.",
    expression: "neutral",
  },
  {
    speaker: null,
    text: "She says it lightly, but watches your reaction like it matters.",
  },
]);

const dawnFlirtChapter1 = makeDialogue("dawn_flirt_ch1", [
  { speaker: "You", text: "You always sound very sure of yourself." },
  {
    speaker: "Dawn",
    text: "Confidence is just deciding before fear gets a vote.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "Her smile is playful, but the eye contact is deliberate.",
  },
]);

const dawnKissChapter1 = makeDialogue("dawn_kiss_ch1", [
  {
    speaker: null,
    text: "You lean in and Dawn stops you with a fingertip under your chin.",
  },
  {
    speaker: "Dawn",
    text: "Not yet. I want you choosing this with your eyes open.",
    expression: "neutral",
  },
  {
    speaker: null,
    text: "She steps back, amused by how quickly she can shift the pace.",
  },
]);

const dawnChatChapter2 = makeDialogue("dawn_chat_ch2", [
  {
    speaker: "Dawn",
    text: "People keep pretending restraint is noble. I think it's usually fear.",
    expression: "neutral",
  },
  {
    speaker: "Dawn",
    text: "You don't have to answer now. Just notice what feels true.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "It sounds casual, but she is clearly shaping the frame.",
  },
]);

const dawnFlirtChapter2 = makeDialogue("dawn_flirt_ch2", [
  { speaker: "You", text: "You enjoy pushing people." },
  {
    speaker: "Dawn",
    text: "Only the ones who pretend they can't be moved.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She smiles like she already knows your next thought.",
  },
]);

const dawnKissChapter2 = makeDialogue("dawn_kiss_ch2", [
  {
    speaker: null,
    text: "Dawn tilts her head and kisses you first, brief but intentional.",
  },
  {
    speaker: "Dawn",
    text: "There. No confusion now.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She pulls away before you can answer, pleased with the effect.",
  },
]);

const dawnChatChapter3 = makeDialogue("dawn_chat_ch3", [
  {
    speaker: "Dawn",
    text: "I know I come off certain, but certainty is expensive.",
    expression: "neutral",
  },
  {
    speaker: "Dawn",
    text: "I pay for it every time someone refuses to understand the point I'm making.",
    expression: "sad",
  },
  {
    speaker: null,
    text: "For a moment, the bravado drops and something more human slips through.",
  },
]);

const dawnFlirtChapter3 = makeDialogue("dawn_flirt_ch3", [
  { speaker: "You", text: "You don't have to weaponize every smile." },
  {
    speaker: "Dawn",
    text: "Maybe not. But it gets results.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She laughs softly, then lets the silence sit without filling it.",
  },
]);

const dawnKissChapter3 = makeDialogue("dawn_kiss_ch3", [
  {
    speaker: null,
    text: "The kiss is slower this time, less about proving a point and more about being present.",
  },
  {
    speaker: "Dawn",
    text: "I can still be intentional without turning everything into a test.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She stays close, reflective instead of triumphant.",
  },
]);

const dawnChatChapter4 = makeDialogue("dawn_chat_ch4", [
  {
    speaker: "Dawn",
    text: "We're past easy conversations now.",
    expression: "neutral",
  },
  {
    speaker: "Dawn",
    text: "If we keep moving forward, it has to be on purpose and in daylight.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She sounds like someone negotiating terms she is willing to honor.",
  },
]);

const dawnFlirtChapter4 = makeDialogue("dawn_flirt_ch4", [
  { speaker: "You", text: "You finally sound a little unsure." },
  {
    speaker: "Dawn",
    text: "Unsure, yes. Weak, no.",
    expression: "love",
  },
  {
    speaker: null,
    text: "The confidence is still there, just less performative.",
  },
]);

const dawnKissChapter4 = makeDialogue("dawn_kiss_ch4", [
  {
    speaker: null,
    text: "She takes your hand first, then kisses you with measured intensity.",
  },
  {
    speaker: "Dawn",
    text: "No games. Not this time.",
    expression: "love",
  },
  {
    speaker: null,
    text: "When it ends, she doesn't look away.",
  },
]);

const dawnChatChapter5 = makeDialogue("dawn_chat_ch5", [
  {
    speaker: "Dawn",
    text: "I used to think winning the argument was the same as being right.",
    expression: "neutral",
  },
  {
    speaker: "Dawn",
    text: "Now I'd rather build something real than just be correct.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "Her voice is softer, but more credible than ever.",
  },
]);

const dawnFlirtChapter5 = makeDialogue("dawn_flirt_ch5", [
  { speaker: "You", text: "You still know exactly how to pull me in." },
  {
    speaker: "Dawn",
    text: "I do. I just stopped pretending it's accidental.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She smiles with zero apology.",
  },
]);

const dawnKissChapter5 = makeDialogue("dawn_kiss_ch5", [
  {
    speaker: null,
    text: "The kiss is deep and steady, with none of the old push-pull left.",
  },
  {
    speaker: "Dawn",
    text: "This is the first time it has felt simple in the best way.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She exhales and keeps hold of your hand.",
  },
]);

export const dawnDialogues: Record<string, Dialogue> = {
  Chat: dawnChatChapter1,
  Flirt: dawnFlirtChapter1,
  Kiss: dawnKissChapter2,
  Chat_Chapter1: dawnChatChapter1,
  Flirt_Chapter1: dawnFlirtChapter1,
  Kiss_Chapter1: dawnKissChapter1,
  Chat_Chapter2: dawnChatChapter2,
  Flirt_Chapter2: dawnFlirtChapter2,
  Kiss_Chapter2: dawnKissChapter2,
  Chat_Chapter3: dawnChatChapter3,
  Flirt_Chapter3: dawnFlirtChapter3,
  Kiss_Chapter3: dawnKissChapter3,
  Chat_Chapter4: dawnChatChapter4,
  Flirt_Chapter4: dawnFlirtChapter4,
  Kiss_Chapter4: dawnKissChapter4,
  Chat_Chapter5: dawnChatChapter5,
  Flirt_Chapter5: dawnFlirtChapter5,
  Kiss_Chapter5: dawnKissChapter5,
};
