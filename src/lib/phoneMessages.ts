import type { DayOfWeek } from "@/data/gameConstants";

export type PhoneMessageAction = "chat" | "flirt" | "sext" | "date";
export type PhoneMessageSender = "player" | "character";

export type PhoneMessage = {
  id: string;
  characterName: string;
  sender: PhoneMessageSender;
  text: string;
  action: PhoneMessageAction;
  dayOfWeek: DayOfWeek;
  dayCount: number;
  hour: number;
};

export type GalleryUnlock = {
  id: string;
  characterName: string;
  title: string;
  caption: string;
  imagePath: string;
  dayOfWeek: DayOfWeek;
  dayCount: number;
  hour: number;
  source: "message";
  action: PhoneMessageAction;
};

const clampChapterTier = (chapter: number) => Math.max(1, Math.min(5, chapter));

const PLAYER_TEXT_BY_ACTION: Record<PhoneMessageAction, string> = {
  chat: "Hey, got a minute to talk?",
  flirt: "You have been on my mind all day.",
  sext: "Want to get a little less polite over text?",
  date: "Want to go out with me soon?",
};

const CHARACTER_REPLIES: Record<string, Record<PhoneMessageAction, string[]>> = {
  Iris: {
    chat: [
      "I can talk for a bit. Keep it brief before I get pulled into grading.",
      "I like hearing from you more than I expected.",
      "You message at the exact moment I needed a break. Impressive.",
      "Still steady. Still thoughtful. I appreciate that.",
      "You feel like home now. Yes, I had a minute for you.",
    ],
    flirt: [
      "Careful. I still blush too easily.",
      "You are getting bolder with me.",
      "That line should not have worked. It did.",
      "You know exactly what to say now, don't you?",
      "If you keep texting me like this, I will stop pretending to behave.",
    ],
    sext: [
      "Not yet. Build that trust first.",
      "You are tempting me, and I do not dislike it.",
      "That was dangerous. Keep going.",
      "You are very good at this when you focus.",
      "Tonight, you are not sleeping early. Understood?",
    ],
    date: [
      "I am not ready for that yet.",
      "Yes. Pick somewhere quiet and sensible.",
      "Yes. I want a real evening with you.",
      "Absolutely. I want it to feel deliberate.",
      "Yes. No mixed messages this time.",
    ],
  },
  Yumi: {
    chat: [
      "Sure. I was reviewing notes anyway.",
      "I like these little check-ins with you.",
      "I can breathe easier when we talk like this.",
      "This is becoming my favorite part of the day.",
      "You always know when to reach out.",
    ],
    flirt: [
      "That is distracting. I have work to do.",
      "You are making it hard to stay professional.",
      "I should call that unfair. I won't.",
      "You sound confident tonight. I like it.",
      "Careful. I might return fire properly.",
    ],
    sext: [
      "Too soon for that with me.",
      "You are pushing, but not in a bad way.",
      "Okay. Keep typing exactly like that.",
      "I am done pretending this does not affect me.",
      "You are getting me worked up from one room away.",
    ],
    date: [
      "Not yet. I need more trust first.",
      "Yes, but keep it low-key.",
      "Yes. I want time with you outside pressure.",
      "Yes. I want a real date, not an excuse.",
      "Yes. I am all in.",
    ],
  },
  Gwen: {
    chat: [
      "Always. What trouble are we planning?",
      "You text, I answer. Easy.",
      "I was hoping you would hit me up first.",
      "You are the one person I never mute.",
      "You really are my favorite interruption.",
    ],
    flirt: [
      "Bold opening. I respect it.",
      "You are getting better at this game.",
      "That was smooth. Annoyingly smooth.",
      "Keep talking. I like where this is going.",
      "You want me smiling at my phone in public, huh?",
    ],
    sext: [
      "Not there yet. Earn it.",
      "You are tempting me and I hate how well it works.",
      "Okay, now we are having fun.",
      "If we were in the same room this chat would be over already.",
      "You are playing with fire. Keep going.",
    ],
    date: [
      "Not yet. We are still calibrating.",
      "Yes. Pick somewhere with good energy.",
      "Yes. I want the full night with you.",
      "Yes. Make it memorable.",
      "Yes. No half-measures.",
    ],
  },
  Ruby: {
    chat: [
      "Yeah, I can talk. What's up?",
      "Thanks for checking in. I needed this.",
      "You always text when my head is noisy.",
      "I like this rhythm we have.",
      "You still make me feel calm fast.",
    ],
    flirt: [
      "You are impossible.",
      "That was smooth. Annoying, but smooth.",
      "Okay, that gave me butterflies.",
      "You are very hard to ignore now.",
      "Keep that up and I am skipping the gym for you.",
    ],
    sext: [
      "Not yet. I need more comfort first.",
      "You are making me blush in public.",
      "Okay. That definitely got my attention.",
      "I am trying to act normal and failing.",
      "I need you close, like now.",
    ],
    date: [
      "Not yet, I am not there.",
      "Yes. Keep it simple and real.",
      "Yes, I'd like that a lot.",
      "Yes. I want a proper night with you.",
      "Yes. Set it up and I am there.",
    ],
  },
  Dawn: {
    chat: [
      "You finally texted first. Good.",
      "I had a feeling you would message.",
      "You are easier to read than you think.",
      "At this point, I expected your message.",
      "I like this version of us.",
    ],
    flirt: [
      "You trying to provoke me?",
      "Confident. I approve.",
      "You are learning my language quickly.",
      "That message had intent. Keep it.",
      "You sound deliciously certain tonight.",
    ],
    sext: [
      "Not yet. Build more trust.",
      "Mm. Better.",
      "That was dangerous in a good way.",
      "You are not subtle anymore. I prefer that.",
      "Keep typing. I am not done with you.",
    ],
    date: [
      "Not yet.",
      "Yes. Choose somewhere worth my time.",
      "Yes. I want to see what you plan.",
      "Yes. Impress me.",
      "Yes. Make it count.",
    ],
  },
};

type GalleryActionBucket = "flirt" | "sext";

const MESSAGE_IMAGE_PATHS: Record<string, Record<GalleryActionBucket, string[]>> = {
  Iris: {
    flirt: [
      "/images/characters/iris/casual/flirty.webp",
      "/images/characters/iris/casual/happy.webp",
      "/images/characters/iris/casual/shy.webp",
    ],
    sext: [
      "/images/characters/iris/casual/seductive.webp",
      "/images/characters/iris/casual/kissMC.webp",
      "/images/characters/iris/university/seductive.webp",
    ],
  },
  Yumi: {
    flirt: [
      "/images/characters/yumi/casual/flirty.webp",
      "/images/characters/yumi/casual/happy.webp",
      "/images/characters/yumi/casual/shy.webp",
    ],
    sext: [
      "/images/characters/yumi/casual/seductive.webp",
      "/images/characters/yumi/casual/kissMC.jpg",
      "/images/characters/yumi/university/seductive.webp",
    ],
  },
  Gwen: {
    flirt: [
      "/images/characters/gwen/casual/shy.webp",
      "/images/characters/gwen/casual/happy.webp",
      "/images/characters/gwen/casual/surprised.webp",
    ],
    sext: [
      "/images/characters/gwen/casual/seductive.webp",
      "/images/characters/gwen/casual/kissMC.webp",
      "/images/characters/gwen/work/image.jpg",
    ],
  },
  Ruby: {
    flirt: [
      "/images/characters/ruby/casual/cuteFlirt.webp",
      "/images/characters/ruby/casual/happy.webp",
      "/images/characters/ruby/casual/shy.webp",
    ],
    sext: [
      "/images/characters/ruby/casual/seductive.webp",
      "/images/characters/ruby/casual/kissMC.jpg",
      "/images/characters/ruby/gym/flirty.webp",
    ],
  },
  Dawn: {
    flirt: [
      "/images/characters/dawn/casual/flirty.png",
      "/images/characters/dawn/casual/happy.png",
      "/images/characters/dawn/casual/shy.png",
    ],
    sext: [
      "/images/characters/dawn/casual/seductive.png",
      "/images/characters/dawn/casual/horny2.png",
      "/images/characters/dawn/date/seductive.webp",
    ],
  },
};

export const getPlayerMessageText = (action: PhoneMessageAction) =>
  PLAYER_TEXT_BY_ACTION[action];

export const getCharacterMessageReply = (
  characterName: string,
  action: PhoneMessageAction,
  chapter: number,
) => {
  const byCharacter = CHARACTER_REPLIES[characterName] ?? CHARACTER_REPLIES.Iris;
  const replies = byCharacter[action];
  const tier = clampChapterTier(chapter);
  return replies[tier - 1] ?? replies[0];
};

export const shouldUnlockMessageImage = (
  action: PhoneMessageAction,
  chapter: number,
) => {
  void chapter;
  return action === "sext";
};

export const buildMessageGalleryUnlock = (
  characterName: string,
  action: PhoneMessageAction,
  chapter: number,
  dayOfWeek: DayOfWeek,
  dayCount: number,
  hour: number,
): GalleryUnlock | null => {
  if (!shouldUnlockMessageImage(action, chapter)) {
    return null;
  }

  const bucket: GalleryActionBucket = action === "sext" ? "sext" : "flirt";
  const byCharacter = MESSAGE_IMAGE_PATHS[characterName];
  if (!byCharacter) return null;

  const imagePool = byCharacter[bucket];
  if (!imagePool || imagePool.length === 0) return null;

  const tier = clampChapterTier(chapter);
  const imagePath = imagePool[(tier - 1) % imagePool.length];
  const id = `msg_img_${characterName}_${action}_${dayCount}_${hour}_${Date.now()}`;

  return {
    id,
    characterName,
    title: `${characterName} sent a ${action === "sext" ? "spicy" : "cute"} photo`,
    caption:
      action === "sext"
        ? "Saved from your private chat."
        : "Saved from your text thread.",
    imagePath,
    dayOfWeek,
    dayCount,
    hour,
    source: "message",
    action,
  };
};
