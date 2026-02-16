import type { Dialogue } from "./index";

const makeDialogue = (id: string, lines: Dialogue["lines"]): Dialogue => ({
  id,
  requiresFirstTimeOnly: true,
  lines,
});

const gwenChatChapter1 = makeDialogue("gwen_chat_ch1", [
  {
    speaker: "Gwen",
    text: "{playerName}! Perfect timing.",
    expression: "happy",
  },
  {
    speaker: "Gwen",
    text: "I found a place with loud music and terrible decisions. My favorite kind of night.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She talks fast, laughs often, and keeps looking at you to see if you can keep up.",
  },
]);

const gwenFlirtChapter1 = makeDialogue("gwen_flirt_ch1", [
  { speaker: "You", text: "You always look like trouble in the best way." },
  {
    speaker: "Gwen",
    text: "Good. If I ever look predictable, stage an intervention.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She bumps your shoulder and grins like she just won a game.",
  },
]);

const gwenKissChapter1 = makeDialogue("gwen_kiss_ch1", [
  {
    speaker: null,
    text: "You move in, but Gwen stops you with one hand on your chest.",
  },
  {
    speaker: "Gwen",
    text: "Not yet. Earn it, don't assume it.",
    expression: "neutral",
  },
  {
    speaker: null,
    text: "She steps back with a smirk that promises the answer is not no forever.",
  },
]);

const gwenChatChapter2 = makeDialogue("gwen_chat_ch2", [
  {
    speaker: "Gwen",
    text: "You handled my chaos better than most people do.",
    expression: "neutral",
  },
  {
    speaker: "Gwen",
    text: "That makes me curious what you'd do when things get messier.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "Her tone is playful, but she is clearly testing whether you stay steady under pressure.",
  },
]);

const gwenFlirtChapter2 = makeDialogue("gwen_flirt_ch2", [
  { speaker: "You", text: "You only flirt when you want leverage." },
  {
    speaker: "Gwen",
    text: "Wrong. I flirt when I like someone and leverage is a bonus.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She holds your stare like a dare.",
  },
]);

const gwenKissChapter2 = makeDialogue("gwen_kiss_ch2", [
  {
    speaker: null,
    text: "Gwen closes the distance and kisses you first, quick and confident.",
  },
  {
    speaker: "Gwen",
    text: "There. Now we're done pretending this is casual.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She pulls back with a breathless laugh.",
  },
]);

const gwenChatChapter3 = makeDialogue("gwen_chat_ch3", [
  {
    speaker: "Gwen",
    text: "I still want the noise and the rush. I just don't want to do all of it alone.",
    expression: "neutral",
  },
  {
    speaker: "Gwen",
    text: "You make wild plans feel less reckless.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "For once, she sounds grounded without losing her spark.",
  },
]);

const gwenFlirtChapter3 = makeDialogue("gwen_flirt_ch3", [
  { speaker: "You", text: "You are trying to behave today." },
  {
    speaker: "Gwen",
    text: "No, I'm choosing my targets more carefully.",
    expression: "love",
  },
  {
    speaker: null,
    text: "Her smile makes it clear you are the target.",
  },
]);

const gwenKissChapter3 = makeDialogue("gwen_kiss_ch3", [
  {
    speaker: null,
    text: "The kiss starts playful, then slows when she realizes neither of you wants to break it.",
  },
  {
    speaker: "Gwen",
    text: "Okay. That one actually got to me.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She says it like a confession and a challenge at once.",
  },
]);

const gwenChatChapter4 = makeDialogue("gwen_chat_ch4", [
  {
    speaker: "Gwen",
    text: "I used to run on impulse. Now I actually think about where this ends.",
    expression: "neutral",
  },
  {
    speaker: "Gwen",
    text: "That is new for me. You did that.",
    expression: "happy",
  },
  {
    speaker: null,
    text: "She still sounds bold, but the sincerity slips through.",
  },
]);

const gwenFlirtChapter4 = makeDialogue("gwen_flirt_ch4", [
  { speaker: "You", text: "You are dangerous when you mean what you say." },
  {
    speaker: "Gwen",
    text: "Good. I am done with half-measures.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She says it with calm certainty.",
  },
]);

const gwenKissChapter4 = makeDialogue("gwen_kiss_ch4", [
  {
    speaker: null,
    text: "She catches your jacket and kisses you hard enough to shut down every other thought.",
  },
  {
    speaker: "Gwen",
    text: "If this is us, then let it be us for real.",
    expression: "love",
  },
  {
    speaker: null,
    text: "You can feel how serious she is under the swagger.",
  },
]);

const gwenChatChapter5 = makeDialogue("gwen_chat_ch5", [
  {
    speaker: "Gwen",
    text: "I still want a life with stories worth retelling. I just want you in all of them.",
    expression: "happy",
  },
  {
    speaker: "Gwen",
    text: "Turns out stability can be hot if you choose it.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She laughs and reaches for your hand like it is the easiest thing in the world.",
  },
]);

const gwenFlirtChapter5 = makeDialogue("gwen_flirt_ch5", [
  { speaker: "You", text: "You are still impossible." },
  {
    speaker: "Gwen",
    text: "Only for everyone else.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She gives you a look that lands somewhere between teasing and devotion.",
  },
]);

const gwenKissChapter5 = makeDialogue("gwen_kiss_ch5", [
  {
    speaker: null,
    text: "The kiss is familiar now, but never dull; she still kisses like she means to leave a mark.",
  },
  {
    speaker: "Gwen",
    text: "Yeah. This is exactly where I want to be.",
    expression: "love",
  },
  {
    speaker: null,
    text: "She stays close, smiling into your shoulder.",
  },
]);

export const gwenDialogues: Record<string, Dialogue> = {
  Chat: gwenChatChapter1,
  Flirt: gwenFlirtChapter1,
  Kiss: gwenKissChapter2,
  Chat_Chapter1: gwenChatChapter1,
  Flirt_Chapter1: gwenFlirtChapter1,
  Kiss_Chapter1: gwenKissChapter1,
  Chat_Chapter2: gwenChatChapter2,
  Flirt_Chapter2: gwenFlirtChapter2,
  Kiss_Chapter2: gwenKissChapter2,
  Chat_Chapter3: gwenChatChapter3,
  Flirt_Chapter3: gwenFlirtChapter3,
  Kiss_Chapter3: gwenKissChapter3,
  Chat_Chapter4: gwenChatChapter4,
  Flirt_Chapter4: gwenFlirtChapter4,
  Kiss_Chapter4: gwenKissChapter4,
  Chat_Chapter5: gwenChatChapter5,
  Flirt_Chapter5: gwenFlirtChapter5,
  Kiss_Chapter5: gwenKissChapter5,
};
