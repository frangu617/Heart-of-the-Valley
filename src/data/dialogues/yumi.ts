import type { Dialogue } from "./index";

const makeDialogue = (id: string, lines: Dialogue["lines"]): Dialogue => ({
  id,
  requiresFirstTimeOnly: true,
  lines,
});

const yumiChatChapter1 = makeDialogue("yumi_chat_ch1", [
  {
    speaker: "Yumi",
    text: "Professor {playerName}, do you have a minute?",
    expression: "neutral",
  },
  {
    speaker: "Yumi",
    text: "I wanted your take on a problem set before I lock in my answer.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "You walk through it together. She listens intensely and relaxes when you nod.",
  },
]);

const yumiFlirtChapter1 = makeDialogue("yumi_flirt_ch1", [
  { speaker: "You", text: "You get even sharper when you're trying to impress me." },
  {
    speaker: "Yumi",
    text: "Maybe I am trying to impress you.",
    expression: "shy",
  },
  {
    speaker: null,
    text: "She says it quickly, then pretends to check her notes.",
  },
]);

const yumiKissChapter1 = makeDialogue("yumi_kiss_ch1", [
  {
    speaker: null,
    text: "You move in and Yumi freezes before taking a step back.",
  },
  {
    speaker: "Yumi",
    text: "I want this, but not like this. Not before we're clear.",
    expression: "sad",
  },
  {
    speaker: null,
    text: "Her voice shakes, but her boundary is firm.",
  },
]);

const yumiChatChapter2 = makeDialogue("yumi_chat_ch2", [
  {
    speaker: "Yumi",
    text: "I've been following the rules we set. It's harder than I expected.",
    expression: "neutral",
  },
  {
    speaker: "Yumi",
    text: "I still want this. I just don't want to lose myself in it.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "You talk through boundaries like partners, not strangers.",
  },
]);

const yumiFlirtChapter2 = makeDialogue("yumi_flirt_ch2", [
  { speaker: "You", text: "You're getting bold." },
  {
    speaker: "Yumi",
    text: "Only with you. Everyone else gets the careful version.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She smiles in a way that feels private even in public.",
  },
]);

const yumiKissChapter2 = makeDialogue("yumi_kiss_ch2", [
  {
    speaker: null,
    text: "Yumi steadies herself, then kisses you with deliberate focus.",
  },
  {
    speaker: "Yumi",
    text: "I chose that. I needed you to know I chose it.",
    expression: "love",
  },
  {
    speaker: null,
    text: "When she pulls away, she is smiling and breathing hard.",
  },
]);

const yumiChatChapter3 = makeDialogue("yumi_chat_ch3", [
  {
    speaker: "Yumi",
    text: "I don't feel split anymore. The pieces are finally fitting together.",
    expression: "happy",
  },
  {
    speaker: "Yumi",
    text: "I can want this and still respect myself.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She sounds more certain than she did at the start.",
  },
]);

const yumiFlirtChapter3 = makeDialogue("yumi_flirt_ch3", [
  { speaker: "You", text: "You know exactly what that look does." },
  {
    speaker: "Yumi",
    text: "I studied the effect thoroughly.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "Her confidence shows up as teasing instead of hesitation.",
  },
]);

const yumiKissChapter3 = makeDialogue("yumi_kiss_ch3", [
  {
    speaker: null,
    text: "The kiss turns slow and intimate, neither rushed nor hidden.",
  },
  {
    speaker: "Yumi",
    text: "This doesn't feel forbidden anymore. It feels right.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She stays close, eyes half-lidded and calm.",
  },
]);

const yumiChatChapter4 = makeDialogue("yumi_chat_ch4", [
  {
    speaker: "Yumi",
    text: "The stakes are higher now, but I don't want to go backward.",
    expression: "neutral",
  },
  {
    speaker: "Yumi",
    text: "If we keep choosing this, we do it with discipline and trust.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "The conversation feels strategic and intimate at the same time.",
  },
]);

const yumiFlirtChapter4 = makeDialogue("yumi_flirt_ch4", [
  { speaker: "You", text: "You sound terrifyingly composed." },
  {
    speaker: "Yumi",
    text: "Composed, yes. Harmless, no.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She says it with a playful tilt of her head.",
  },
]);

const yumiKissChapter4 = makeDialogue("yumi_kiss_ch4", [
  {
    speaker: null,
    text: "Yumi takes your collar and kisses you like she already decided the outcome.",
  },
  {
    speaker: "Yumi",
    text: "No second-guessing. Not tonight.",
    expression: "love",
  },
  {
    speaker: null,
    text: "The tension between you settles into certainty.",
  },
]);

const yumiChatChapter5 = makeDialogue("yumi_chat_ch5", [
  {
    speaker: "Yumi",
    text: "I used to think desire and stability could not coexist. I was wrong.",
    expression: "happy",
  },
  {
    speaker: "Yumi",
    text: "You helped me build something that can hold both.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She looks proud of what you both survived.",
  },
]);

const yumiFlirtChapter5 = makeDialogue("yumi_flirt_ch5", [
  { speaker: "You", text: "Still trying to outplay me?" },
  {
    speaker: "Yumi",
    text: "Trying? I thought that part was settled.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "Her laugh is bright, confident, and a little smug.",
  },
]);

const yumiKissChapter5 = makeDialogue("yumi_kiss_ch5", [
  {
    speaker: null,
    text: "The kiss is deep and effortless, as if your rhythms finally aligned.",
  },
  {
    speaker: "Yumi",
    text: "I don't want less than this ever again.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She lingers close with a contented smile.",
  },
]);

export const yumiDialogues: Record<string, Dialogue> = {
  Chat: yumiChatChapter1,
  Flirt: yumiFlirtChapter1,
  Kiss: yumiKissChapter2,
  Chat_Chapter1: yumiChatChapter1,
  Flirt_Chapter1: yumiFlirtChapter1,
  Kiss_Chapter1: yumiKissChapter1,
  Chat_Chapter2: yumiChatChapter2,
  Flirt_Chapter2: yumiFlirtChapter2,
  Kiss_Chapter2: yumiKissChapter2,
  Chat_Chapter3: yumiChatChapter3,
  Flirt_Chapter3: yumiFlirtChapter3,
  Kiss_Chapter3: yumiKissChapter3,
  Chat_Chapter4: yumiChatChapter4,
  Flirt_Chapter4: yumiFlirtChapter4,
  Kiss_Chapter4: yumiKissChapter4,
  Chat_Chapter5: yumiChatChapter5,
  Flirt_Chapter5: yumiFlirtChapter5,
  Kiss_Chapter5: yumiKissChapter5,
};
