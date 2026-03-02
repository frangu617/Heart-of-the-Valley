import Image from "@/components/FallbackImage";
// src/components/CharacterOverlay.tsx - Updated with event system
import { Girl, GirlStats, PlayerStats } from "../data/characters";
import { Interaction, interactionMenu } from "../data/interactions";
import { Dispatch, SetStateAction, useEffect, useState, useCallback } from "react";
import {
  characterDialogues,
  getDefaultDialogue,
  Dialogue,
} from "../data/dialogues/index";
import { DayOfWeek } from "@/data/gameConstants";
import { CharacterEventState, GameplayFlag } from "@/data/events/types";
import { findTriggeredEvent } from "@/lib/eventSystem";
import { getCharacterEvents } from "@/data/events/chapter1";
import { applyCharacterEventRewards } from "@/lib/rewards";
import {
  applyPlayerStatDelta,
  STARVING_HUNGER_THRESHOLD,
} from "@/lib/playerStats";
import { showGameNotice } from "@/lib/gameUi";
// import { firstMeetingDialogues } from "../data/dialogues/index";
import DatePlanner from "./DatePlanner";
import { DateLocation } from "@/data/dates";
import { getCharacterImage } from "@/lib/images";
import GiftModal from "./GiftModal";
import { Gift, getGiftEntriesFromInventory } from "@/data/gifts";
import { getPortraitVerticalOffsetPx } from "@/lib/portraitFraming";
import { TESTING_LOCATION_NAME } from "@/data/locations";
import { injectDawnIntelLines } from "@/lib/dawnMystery";
// import { get } from "http";

const ALWAYS_VISIBLE_INTERACTIONS = new Set([
  "Chat",
  "Flirt",
  "Give Gift",
  "Sext",
]);
const IRIS_KISS_EXPRESSION = "kissingMC";
const KISS_AFFECTION_REQUIREMENT = 15;
const KISS_LUST_REQUIREMENT = 25;
const KISS_REJECTION_EFFECTS: Partial<GirlStats> = { affection: -2, lust: -2 };
const KISS_UNLOCK_FLAG_BY_CHARACTER: Partial<Record<string, GameplayFlag>> = {
  Iris: "irisCh1FinaleComplete",
  Dawn: "hasMetDawn",
  Gwen: "gwen_chapter_1_completed",
  Ruby: "ruby_chapter_1_completed",
  Yumi: "yumi_chapter_1_completed",
};
const CHAPTER_ONE_FINALE_EVENT_IDS_BY_CHARACTER: Partial<Record<string, string[]>> = {
  Iris: ["iris_chapter_1_finale_dom", "iris_chapter_1_finale_sub"],
  Gwen: ["gwen_chapter_1_finale", "gwen_chapter_1_finale_sub"],
  Ruby: ["ruby_ch1_ev5_mall_sub", "ruby_ch1_ev5_mall_dom"],
  Yumi: ["yumi_chapter_1_finale_dom", "yumi_chapter_1_finale_sub"],
};
const CHAPTER_TWO_UNLOCK_FLAG_BY_CHARACTER: Partial<Record<string, GameplayFlag>> = {
  Iris: "irisCh1FinaleComplete",
  Dawn: "hasMetDawn",
  Gwen: "gwen_chapter_1_completed",
  Ruby: "ruby_chapter_1_completed",
  Yumi: "yumi_chapter_1_completed",
};
const CHAPTER_THREE_UNLOCK_FLAG_BY_CHARACTER: Partial<Record<string, GameplayFlag>> = {
  Iris: "irisCh2Complete",
  Yumi: "yumi_chapter_2_completed",
};
const TEST_CHAT_EMOTIONS = [
  "neutral",
  "happy",
  "sad",
  "shy",
  "love",
  "annoyed",
  "angry",
  "surprised",
  "excited",
  "seductive",
  "smug",
  "blushing",
  "hopeful",
  "worried",
] as const;
type InteractionChapter = 1 | 2 | 3 | 4 | 5;

const hasKissUnlockedByFlag = (
  characterName: string,
  gameplayFlags: Set<GameplayFlag>
): boolean => {
  const requiredFlag = KISS_UNLOCK_FLAG_BY_CHARACTER[characterName];
  if (!requiredFlag) return false;
  return gameplayFlags.has(requiredFlag);
};

const shouldUseIrisKissEventImage = (eventId: string, dialogueId?: string): boolean => {
  const normalizedEventId = eventId.toLowerCase();
  const normalizedDialogueId = dialogueId?.toLowerCase() ?? "";
  return normalizedEventId.includes("kiss") || normalizedDialogueId.includes("kiss");
};

const hasCompletedChapterOneByHistory = (
  characterName: string,
  eventState: CharacterEventState
): boolean => {
  const finaleEventIds = CHAPTER_ONE_FINALE_EVENT_IDS_BY_CHARACTER[characterName];
  if (!finaleEventIds || finaleEventIds.length === 0) return false;

  return finaleEventIds.some((eventId) =>
    eventState.eventHistory.some(
      (historyEntry) =>
        historyEntry.eventId === eventId && historyEntry.timesTriggered > 0
    )
  );
};

const getCharacterInteractionChapter = (
  characterName: string,
  gameplayFlags: Set<GameplayFlag>,
  eventState: CharacterEventState
): InteractionChapter => {
  // Allow future chapter flag names without blocking interaction routing.
  const hasFlag = (flag: string) => (gameplayFlags as Set<string>).has(flag);
  const normalizedCharacterName = characterName.toLowerCase();
  const chapterTwoFlag = CHAPTER_TWO_UNLOCK_FLAG_BY_CHARACTER[characterName];
  const chapterThreeFlag = CHAPTER_THREE_UNLOCK_FLAG_BY_CHARACTER[characterName];

  const chapterTwoReached =
    (chapterTwoFlag ? gameplayFlags.has(chapterTwoFlag) : false) ||
    hasCompletedChapterOneByHistory(characterName, eventState) ||
    hasFlag(`${normalizedCharacterName}_chapter_1_completed`);

  const chapterThreeReached =
    (chapterThreeFlag ? gameplayFlags.has(chapterThreeFlag) : false) ||
    hasFlag(`${normalizedCharacterName}_chapter_2_completed`);

  const chapterFourReached = hasFlag(
    `${normalizedCharacterName}_chapter_3_completed`
  );
  const chapterFiveReached = hasFlag(
    `${normalizedCharacterName}_chapter_4_completed`
  );

  if (chapterFiveReached) return 5;
  if (chapterFourReached) return 4;
  if (chapterThreeReached) return 3;
  if (chapterTwoReached) return 2;
  return 1;
};

const getChapterAwareInteractionDialogue = (
  characterName: string,
  actionLabel: string,
  gameplayFlags: Set<GameplayFlag>,
  eventState: CharacterEventState
): Dialogue => {
  const dialogueSet = characterDialogues[characterName];
  if (!dialogueSet) {
    return getDefaultDialogue(characterName, actionLabel);
  }

  const chapter = getCharacterInteractionChapter(
    characterName,
    gameplayFlags,
    eventState
  );
  const chapterKey = `${actionLabel}_Chapter${chapter}`;
  if (dialogueSet[chapterKey]) {
    return dialogueSet[chapterKey];
  }

  for (let fallbackChapter = chapter - 1; fallbackChapter >= 1; fallbackChapter -= 1) {
    const fallbackKey = `${actionLabel}_Chapter${fallbackChapter}`;
    if (dialogueSet[fallbackKey]) {
      return dialogueSet[fallbackKey];
    }
  }

  if (dialogueSet[actionLabel]) {
    return dialogueSet[actionLabel];
  }

  return getDefaultDialogue(characterName, actionLabel);
};

const getTestEmotionDialogue = (characterName: string): Dialogue => ({
  id: `${characterName.toLowerCase()}_test_emotions`,
  lines: TEST_CHAT_EMOTIONS.map((emotion) => ({
    speaker: characterName,
    text: `this is a test, this is ${emotion}`,
    expression: emotion,
  })),
});

const getChapterTierLabel = (chapter: InteractionChapter) =>
  chapter <= 1 ? "early" : chapter <= 3 ? "mid" : "late";

const getSextDialogue = (
  characterName: string,
  chapter: InteractionChapter,
): Dialogue => {
  const tier = getChapterTierLabel(chapter);
  const id = `${characterName.toLowerCase()}_sext_ch${chapter}`;

  if (characterName === "Iris") {
    if (tier === "early") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You test the waters with a suggestive message." },
          {
            speaker: "Iris",
            text: "Careful. I am not ready to go that far yet.",
            expression: "shy",
          },
        ],
      };
    }
    if (tier === "mid") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You send something a little less innocent." },
          {
            speaker: "Iris",
            text: "You are going to make me lose focus if you keep that up.",
            expression: "seductive",
          },
        ],
      };
    }
    return {
      id,
      lines: [
        { speaker: "You", text: "Your message is direct and deliberate." },
        {
          speaker: "Iris",
          text: "Good. Keep that tone for tonight.",
          expression: "seductive",
        },
      ],
    };
  }

  if (characterName === "Yumi") {
    if (tier === "early") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You send a teasing line and wait." },
          {
            speaker: "Yumi",
            text: "That is... a lot for where we are right now.",
            expression: "shy",
          },
        ],
      };
    }
    if (tier === "mid") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You keep the message bold but controlled." },
          {
            speaker: "Yumi",
            text: "You know exactly what you are doing to me.",
            expression: "seductive",
          },
        ],
      };
    }
    return {
      id,
      lines: [
        { speaker: "You", text: "You stop pretending and send what you want." },
        {
          speaker: "Yumi",
          text: "I am done playing shy. Keep going.",
          expression: "seductive",
        },
      ],
    };
  }

  if (characterName === "Gwen") {
    if (tier === "early") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You send a risky tease." },
          {
            speaker: "Gwen",
            text: "Ambitious. You are not there yet.",
            expression: "neutral",
          },
        ],
      };
    }
    if (tier === "mid") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You push the tone hotter." },
          {
            speaker: "Gwen",
            text: "There we go. I knew you had a spine.",
            expression: "seductive",
          },
        ],
      };
    }
    return {
      id,
      lines: [
        { speaker: "You", text: "You send a message that leaves no ambiguity." },
        {
          speaker: "Gwen",
          text: "Good. No half-measures.",
          expression: "seductive",
        },
      ],
    };
  }

  if (characterName === "Ruby") {
    if (tier === "early") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You test a flirtier text than usual." },
          {
            speaker: "Ruby",
            text: "Whoa. Slow down a little.",
            expression: "shy",
          },
        ],
      };
    }
    if (tier === "mid") {
      return {
        id,
        lines: [
          { speaker: "You", text: "You text something spicy." },
          {
            speaker: "Ruby",
            text: "Okay... that definitely worked on me.",
            expression: "seductive",
          },
        ],
      };
    }
    return {
      id,
      lines: [
        { speaker: "You", text: "You text with confidence and no backpedal." },
        {
          speaker: "Ruby",
          text: "You are not letting me sleep early tonight, huh?",
          expression: "seductive",
        },
      ],
    };
  }

  if (tier === "early") {
    return {
      id,
      lines: [
        { speaker: "You", text: "You send a suggestive message." },
        {
          speaker: "Dawn",
          text: "Not yet. Build it first.",
          expression: "neutral",
        },
      ],
    };
  }
  if (tier === "mid") {
    return {
      id,
      lines: [
        { speaker: "You", text: "You send something less polite." },
        {
          speaker: "Dawn",
          text: "Better. Keep going.",
          expression: "seductive",
        },
      ],
    };
  }
  return {
    id,
    lines: [
      { speaker: "You", text: "You send exactly what you are thinking." },
      {
        speaker: "Dawn",
        text: "That is the honesty I wanted from you.",
        expression: "seductive",
      },
    ],
  };
};

const getGiftThanksLine = (characterName: string, chapter: InteractionChapter) => {
  const tier = getChapterTierLabel(chapter);

  if (characterName === "Iris") {
    if (tier === "early") return "You didn't have to. That was thoughtful.";
    if (tier === "mid") return "You remember the small things. I notice that.";
    return "You always know exactly how to make me soften.";
  }
  if (characterName === "Yumi") {
    if (tier === "early") return "This is really kind of you.";
    if (tier === "mid") return "You keep surprising me in the best way.";
    return "You spoil me, and I'm not complaining.";
  }
  if (characterName === "Gwen") {
    if (tier === "early") return "Okay, this is cute. I like it.";
    if (tier === "mid") return "You brought me this? Yeah, you're dangerous.";
    return "This is exactly my taste. You know me too well.";
  }
  if (characterName === "Ruby") {
    if (tier === "early") return "Thanks... seriously, this means a lot.";
    if (tier === "mid") return "You made my whole mood better with this.";
    return "You always know how to take care of me.";
  }
  if (tier === "early") return "Interesting choice. I approve.";
  if (tier === "mid") return "You are paying attention. Good.";
  return "Perfect. You understand leverage and affection.";
};

interface Props {
  girl: Girl;
  location: string;
  player: PlayerStats;
  gameplayFlags: Set<GameplayFlag>;
  setPlayer: Dispatch<SetStateAction<PlayerStats>>;
  spendTime: (
    amount: number,
    basePlayer?: PlayerStats,
    options?: {
      skipHungerGain?: boolean;
      hungerGainMultiplier?: number;
      scaleBasePlayerWithTime?: boolean;
    },
  ) => void;
  onClose: () => void;
  onStartDialogue: (
    dialogue: Dialogue,
    characterImage: string,
    girlEffects?: Partial<GirlStats>
  ) => void;
  dayOfWeek: DayOfWeek;
  dayCount: number;
  hour: number;
  eventState: CharacterEventState;
  onEventTriggered: (eventId: string, girlName?: string) => void;
  darkMode?: boolean; 
  onScheduleDate: (date: {
    characterName: string;
    location: DateLocation;
    day: DayOfWeek;
    hour: number;
    activities: string[];
    eventId: string;
    label: string;
  }) => void;
  onSetFlag?: (flag: GameplayFlag) => void
  onUnlockCharacter?: (characterName: string) => void
  hasInteractedToday?: (girlName: string, actionLabel: string) => boolean;
  onInteractionLogged?: (girlName: string, actionLabel: string) => void;
  characterImageLocation?: string;
  variant?: "sidebar" | "modal";
}

export default function CharacterOverlay({
  girl,
  location,
  player,
  setPlayer,
  spendTime,
  onClose,
  onStartDialogue,
  dayOfWeek,
  dayCount,
  hour,
  eventState,
  onEventTriggered,
  darkMode,
  onScheduleDate,
  gameplayFlags,
  onSetFlag,
  onUnlockCharacter,
  hasInteractedToday,
  onInteractionLogged,
  characterImageLocation,
  variant = "sidebar",
}: Props) {
  const [showDatePlanner, setShowDatePlanner] = useState(false);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [pendingGiftAction, setPendingGiftAction] = useState<Interaction | null>(
    null
  );
  const dawnIdentityKnown =
    gameplayFlags.has("metDawn") || gameplayFlags.has("hasMetDawn");
  const isDawnMysteryState = girl.name === "Dawn" && !dawnIdentityKnown;
  const interactionChapter = getCharacterInteractionChapter(
    girl.name,
    gameplayFlags,
    eventState,
  );
  const kissUnlocked =
    hasKissUnlockedByFlag(girl.name, gameplayFlags) ||
    hasCompletedChapterOneByHistory(girl.name, eventState);
  const canUseDatePlanner = !isDawnMysteryState;
  const visibleInteractions = isDawnMysteryState
    ? []
    : interactionMenu.filter((action) => {
        if (action.label === "Kiss") return kissUnlocked;
        return ALWAYS_VISIBLE_INTERACTIONS.has(action.label);
      });
  const giftEntries = getGiftEntriesFromInventory(player.inventory);
  const hasGifts = giftEntries.length > 0;
  const resolvedCharacterImageLocation = characterImageLocation ?? location;
  const isPlayerStarving = player.hunger >= STARVING_HUNGER_THRESHOLD;
  // Check for triggered events when component mounts or dependencies change
  // Check for first meeting or triggered events
  //Date handler
  const handleScheduleDate = (
    dateLocation: DateLocation,
    day: DayOfWeek,
    dateHour: number,
    activities: string[]
  ) => {
    if (isPlayerStarving) {
      showGameNotice("You're too hungry to do that right now. Eat something first.", {
        tone: "warning",
      });
      setShowDatePlanner(false);
      return;
    }

    // Check if she accepts (random chance based on affection)
    const acceptanceChance = Math.min(
      95,
      50 + girl.stats.affection / 2 + girl.stats.lust / 4
    );
    const roll = Math.random() * 100;

    if (roll > acceptanceChance) {
      showGameNotice(
        `${girl.name} politely declines. Maybe try again when you're closer?`,
        { tone: "info" },
      );
      setShowDatePlanner(false);
      return;
    }

    // She accepted! Create the date event
    const dateEvent = {
      characterName: girl.name,
      location: dateLocation,
      day: day,
      hour: dateHour,
      activities: activities,
      eventId: `date_${girl.name}_${dateLocation}_${Date.now()}`,
      label: `Date at ${dateLocation}`,
    };

    // Call parent's schedule function
    onScheduleDate(dateEvent);

    showGameNotice(
      `${girl.name} happily agrees! The date is set for ${day} at ${dateHour}:00!`,
      { tone: "success" },
    );
    setShowDatePlanner(false);
    spendTime(1); // Planning takes time
  };

  const handleGiveGift = (gift: Gift) => {
    const giftIndex = player.inventory.findIndex((item) => item === gift.id);
    if (giftIndex === -1) {
      showGameNotice("You do not have that gift.", { tone: "warning" });
      return;
    }

    const nextInventory = [...player.inventory];
    nextInventory.splice(giftIndex, 1);
    const nextPlayer = { ...player, inventory: nextInventory };
    spendTime(pendingGiftAction?.timeCost ?? 1, nextPlayer);

    const dialogue: Dialogue = {
      id: `give_gift_${gift.id.replace(/\s+/g, "_").toLowerCase()}`,
      lines: [
        {
          speaker: null,
          text: `You give ${girl.name} a ${gift.name}.`,
        },
        {
          speaker: girl.name,
          text: getGiftThanksLine(girl.name, interactionChapter),
          expression: "happy",
        },
      ],
    };

    const characterImage = getCharacterImage(
      girl,
      resolvedCharacterImageLocation,
      hour,
      getFacialExpression()
    );
    onStartDialogue(dialogue, characterImage, gift.effects);

    if (onInteractionLogged) {
      onInteractionLogged(girl.name, pendingGiftAction?.label ?? "Give Gift");
    }

    setShowGiftMenu(false);
    setPendingGiftAction(null);
  };

  const getFacialExpression = useCallback(() => {
    const { affection, mood, love } = girl.stats;
    const totalPositive = affection + love;

    if (love >= 50 || totalPositive >= 80) return "love";
    if (affection >= 40 && mood >= 60) return "happy";
    if (mood < 30) return "sad";
    if (affection < 10) return "neutral";
    return "neutral";
  }, [girl.stats]);
  
  useEffect(() => {
    if (location === TESTING_LOCATION_NAME) {
      return;
    }

    // Check for other triggered events
    const events = getCharacterEvents(girl.name);
    const triggeredEvent = findTriggeredEvent(
      events,
      girl,
      player,
      location,
      dayOfWeek,
      hour,
      eventState,
      gameplayFlags,
      dayCount,
    );

    if (triggeredEvent) {
      console.log(`🎉 Event triggered: ${triggeredEvent.name}`);

      const shouldUseKissImage =
        girl.name === "Iris" &&
        shouldUseIrisKissEventImage(triggeredEvent.id, triggeredEvent.dialogue?.id);
      const characterImage = getCharacterImage(
        girl,
        resolvedCharacterImageLocation,
        hour,
        shouldUseKissImage ? IRIS_KISS_EXPRESSION : getFacialExpression()
      );
      onEventTriggered(triggeredEvent.id, girl.name);
      onStartDialogue(
        injectDawnIntelLines(triggeredEvent.dialogue, gameplayFlags),
        characterImage,
        triggeredEvent.rewards?.girlStats
      );

      const updatedPlayer = applyCharacterEventRewards(
        player,
        triggeredEvent.rewards,
        {
          onSetFlag: (flag) => {
            if (onSetFlag) {
              onSetFlag(flag);
              console.log(`🚩 Flag set: ${flag}`);
            }
          },
          onUnlockCharacter: (characterName) => {
            if (onUnlockCharacter) {
              onUnlockCharacter(characterName);
              console.log(`🔓 ${characterName} unlocked!`);
            }
          },
        }
      );
      if (updatedPlayer !== player) {
        setPlayer(updatedPlayer);
      }
    }
  }, [girl, player, location, dayOfWeek, dayCount, hour, eventState, gameplayFlags, getFacialExpression, onEventTriggered, onStartDialogue, onSetFlag, onUnlockCharacter, resolvedCharacterImageLocation, setPlayer]);
  const interact = (action: Interaction) => {
    const isSandboxChat =
      location === TESTING_LOCATION_NAME && action.label === "Chat";

    if (isDawnMysteryState) {
      showGameNotice(
        "She watches you without introducing herself. No contact info. Not yet.",
        { tone: "info" },
      );
      return;
    }

    if (!isSandboxChat && isPlayerStarving) {
      showGameNotice("You're too hungry to do that right now. Eat something first.", {
        tone: "warning",
      });
      return;
    }

    if (
      location === "Classroom" &&
      girl.name === "Iris" &&
      !isSandboxChat
    ) {
      showGameNotice("Iris is busy teaching right now.", { tone: "warning" });
      return;
    }

    // ... rest of your existing interact function stays the same
    if (
      !isSandboxChat &&
      hasInteractedToday &&
      hasInteractedToday(girl.name, action.label)
    ) {
      showGameNotice(
        `You've already done "${action.label}" with ${girl.name} today. Try again tomorrow.`,
        { tone: "info" },
      );
      return;
    }

    if (action.label === "Give Gift") {
      if (!hasGifts) {
        showGameNotice("You do not have any gifts to give.", { tone: "warning" });
        return;
      }
      setPendingGiftAction(action);
      setShowGiftMenu(true);
      return;
    }
    // Check requirements
    if (
      action.requiresItem &&
      !player.inventory.includes(action.requiresItem)
    ) {
      showGameNotice(`You need a ${action.requiresItem} for this action!`, {
        tone: "warning",
      });
      return;
    }

    if (action.locationContext && action.locationContext !== location) {
      showGameNotice(
        `This action can only be done at ${action.locationContext}`,
        { tone: "warning" },
      );
      return;
    }

    if (action.label === "Kiss") {
      if (!kissUnlocked) {
        showGameNotice(
          `Kiss unlocks for ${girl.name} after finishing their Chapter 1 story.`,
          { tone: "info" },
        );
        return;
      }

      if (girl.stats.lust < KISS_LUST_REQUIREMENT) {
        const characterImage = getCharacterImage(
          girl,
          resolvedCharacterImageLocation,
          hour,
          getFacialExpression()
        );
        const rejectionDialogue: Dialogue = {
          id: `${girl.name.toLowerCase()}_kiss_rejected`,
          lines: [
            {
              speaker: null,
              text: `You lean in to kiss ${girl.name}, but the moment goes wrong.`,
            },
            {
              speaker: girl.name,
              text: "Not yet. That felt too sudden.",
              expression: "sad",
            },
          ],
        };
        onStartDialogue(rejectionDialogue, characterImage, KISS_REJECTION_EFFECTS);
        spendTime(action.timeCost);
        if (onInteractionLogged) {
          onInteractionLogged(girl.name, action.label);
        }
        return;
      }
    }

    if (action.label === "Kiss" && girl.name === "Iris") {
      const schoolLocations = new Set([
        "University",
        "University Hallway",
        "University Parking Lot",
      ]);
      if (
        schoolLocations.has(location) &&
        !gameplayFlags.has("irisSchoolKissUnlocked")
      ) {
        showGameNotice("Iris isn't ready to be that open at school.", {
          tone: "info",
        });
        return;
      }
    }

    if (action.label === "Sext") {
      if (interactionChapter < 2) {
        showGameNotice(
          `${girl.name} is not comfortable with that yet. Build more closeness first.`,
          { tone: "info" },
        );
        return;
      }

      if (girl.stats.affection < 20 || girl.stats.lust < 15) {
        showGameNotice(
          `${girl.name} isn't ready for sexting yet. Try again after deeper connection.`,
          { tone: "info" },
        );
        return;
      }
    }

    // Check affection requirements for intimate actions
    if (action.label === "Flirt") {
      if (girl.stats.affection < 10) {
        showGameNotice(
          `${girl.name} doesn't seem comfortable with that right now...`,
          { tone: "info" },
        );
        return;
      }
    }

    if (action.label === "Kiss") {
      if (girl.stats.affection < KISS_AFFECTION_REQUIREMENT) {
        showGameNotice(
          `${girl.name} pulls away. Build affection to ${KISS_AFFECTION_REQUIREMENT} first.`,
          { tone: "info" },
        );
        return;
      }
    }

    // Check mood requirements for positive interactions
    if (
      girl.stats.mood < 30 &&
      action.label === "Flirt"
    ) {
      showGameNotice(`${girl.name} doesn't seem in the mood for that right now...`, {
        tone: "info",
      });
      return;
    }

    const shouldQueueDawnSummon =
      action.label === "Kiss" &&
      girl.name === "Iris" &&
      gameplayFlags.has("irisCh3Ev2_Done") &&
      !gameplayFlags.has("dawnSummonQueued") &&
      !gameplayFlags.has("dawnSummonTriggered");

    if (shouldQueueDawnSummon) {
      onSetFlag?.("dawnSummonQueued");
      onSetFlag?.("dawnSummonQueuedFromKiss");
      onEventTriggered("iris_c3_ev2_kiss_arm", "Iris");
      showGameNotice("A blocked caller registers in your phone log.", {
        tone: "warning",
      });
    }

    // Apply stat effects outside sandbox chat
    if (!isSandboxChat) {
      const updatedStats = action.statEffects
        ? applyPlayerStatDelta(player, action.statEffects)
        : player;
      spendTime(action.timeCost, updatedStats, {
        skipHungerGain:
          typeof action.statEffects?.hunger === "number" &&
          action.statEffects.hunger < 0,
      });
    }

    // Get dialogue for this interaction
    const dialogue = isSandboxChat
      ? getTestEmotionDialogue(girl.name)
      : action.label === "Sext"
        ? getSextDialogue(girl.name, interactionChapter)
      : getChapterAwareInteractionDialogue(
          girl.name,
          action.label,
          gameplayFlags,
          eventState
        );
    const interactionExpression =
      action.label === "Sext"
        ? "seductive"
      : action.label === "Kiss" && girl.name === "Iris"
        ? IRIS_KISS_EXPRESSION
        : getFacialExpression();
    const characterImage = getCharacterImage(
      girl,
      resolvedCharacterImageLocation,
      hour,
      interactionExpression
    );

    // Show what stats will change
    if (action.girlEffects) {
      const changes = Object.entries(action.girlEffects)
        .filter(([, value]) => value !== 0)
        .map(([key, value]) => {
          const emoji =
            key === "affection"
              ? "💕"
              : key === "lust"
              ? "🔥"
              : key === "mood"
              ? "😊"
              : "💖";
          return `${emoji} ${value > 0 ? "+" : ""}${value}`;
        })
        .join(", ");

      console.log(`✨ ${action.label} with ${girl.name}: ${changes}`);
    }

    onStartDialogue(
      dialogue,
      characterImage,
      isSandboxChat ? undefined : action.girlEffects,
    );
    if (!isSandboxChat && onInteractionLogged) {
      onInteractionLogged(girl.name, action.label);
    }
  };

  // ... rest of your component (getActionIcon, getActionColor, getFacialExpression, etc.) stays the same

  const getActionIcon = (type: string) => {
    switch (type) {
      case "Chat":
        return "💬";
      case "Romance":
        return "❤️";
      case "Gift":
        return "🎁";
      case "Date":
        return "🌹";
      case "Context":
        return "✨";
      default:
        return "👋";
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case "Chat":
        return "from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700";
      case "Romance":
        return "from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700";
      case "Gift":
        return "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700";
      case "Date":
        return "from-red-400 to-red-600 hover:from-red-500 hover:to-red-700";
      case "Context":
        return "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700";
      default:
        return "from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700";
    }
  };

  const overlayPortraitSrc = `/images/characters/${girl.name.toLowerCase()}/faces/portrait.webp`;
  const shouldHideDawnFace = girl.name === "Dawn" && !gameplayFlags.has("hasMetDawn");
  const overlayPortraitOffsetPx =
    getPortraitVerticalOffsetPx(girl.name) + (shouldHideDawnFace ? -30 : 0);
  const displayGirlName = isDawnMysteryState ? "???" : girl.name;
  const displayPersonality = isDawnMysteryState ? "Unknown" : girl.personality;
  const displayRelationship = isDawnMysteryState ? "Unknown" : girl.relationship;

  const containerPosition =
    variant === "modal" ? "relative" : "sticky top-4";

  return (
    <div
      className={`bg-gradient-to-br ${
        darkMode
          ? "from-gray-800 via-purple-900 to-gray-900"
          : "from-pink-100 via-purple-100 to-blue-100"
      } rounded-2xl shadow-xl p-6 border-4 ${
        darkMode ? "border-purple-700" : "border-purple-200"
      } ${containerPosition} animate-slideUp`}
    >
      {" "}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all z-10 shadow-lg"
      >
        ✕
      </button>
      <div className="flex flex-col items-center mb-6">
        <div className="relative group mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
          <div className="relative w-50 h-60 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <Image
              src={overlayPortraitSrc}
              alt={`${girl.name} portrait`}
              layout="fill"
              objectFit="cover"
              style={{
                objectPosition: `center calc(50% + ${overlayPortraitOffsetPx}px)`,
              }}
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-purple-500 mb-1">{displayGirlName}</h3>
        <p className="text-gray-500 italic mb-2 text-sm">
          &quot;{displayPersonality}&quot;
        </p>

        <div className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold text-xs shadow-lg">
          {displayRelationship}
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 mb-4 space-y-2 shadow-md">
        <h4 className="font-bold text-purple-700 text-center mb-2 text-sm">
          Relationship
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between items-center px-2 py-1 bg-pink-50 rounded">
            <span className="font-semibold text-gray-700">💕 Affection</span>
            <span className="font-bold text-pink-600">
              {isDawnMysteryState ? "??" : girl.stats.affection}
            </span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-red-50 rounded">
            <span className="font-semibold text-gray-700">🔥 Lust</span>
            <span className="font-bold text-red-600">
              {isDawnMysteryState ? "??" : girl.stats.lust}
            </span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-yellow-50 rounded">
            <span className="font-semibold text-gray-700">😊 Mood</span>
            <span className="font-bold text-yellow-600">
              {isDawnMysteryState ? "??" : girl.stats.mood}
            </span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded col-span-2">
            <span className="font-semibold text-gray-700">💖 Love</span>
            <span className="font-bold text-purple-600">
              {isDawnMysteryState ? "??" : girl.stats.love}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h4
          className={`text-lg font-bold ${
            darkMode ? "text-purple-300" : "text-purple-800"
          } mb-3 text-center`}
        >
          {" "}
          💝 Actions
        </h4>
                <button
          onClick={() => {
            if (!canUseDatePlanner) {
              showGameNotice(
                "Date planning is not available for this character yet.",
                { tone: "info" },
              );
              return;
            }
            if (isPlayerStarving) {
              showGameNotice(
                "You're too hungry to do that right now. Eat something first.",
                { tone: "warning" },
              );
              return;
            }
            setShowDatePlanner(true);
          }}
          className={`relative overflow-hidden group w-full shadow-md hover:shadow-lg transform hover:scale-102 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm ${
            canUseDatePlanner
              ? "bg-gradient-to-r from-red-400 to-pink-600 hover:from-red-500 hover:to-pink-700"
              : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-500 hover:to-gray-600"
          }`}
        >
          <div className="flex items-center justify-between relative z-10">
            <span className="flex items-center gap-2">
              <span className="text-lg">Date</span>
              <span>Ask on Date</span>
            </span>
            <span className="text-xs opacity-75">
              {canUseDatePlanner ? "Plan" : "Locked"}
            </span>
          </div>
          {canUseDatePlanner && (
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          )}
        </button>

        {isDawnMysteryState && (
          <div className="rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs text-yellow-900">
            She has not shared her name or number yet. You cannot interact with her right now.
          </div>
        )}

        {visibleInteractions.map((action) => {
          const isSandboxChat =
            location === TESTING_LOCATION_NAME && action.label === "Chat";
          const giftDisabled = action.label === "Give Gift" && !hasGifts;
          const isDisabled = Boolean(
            (action.requiresItem &&
              !player.inventory.includes(action.requiresItem)) ||
              (action.locationContext && action.locationContext !== location) ||
              (!isSandboxChat &&
                hasInteractedToday &&
                hasInteractedToday(girl.name, action.label)) ||
              giftDisabled
          );
          const usedToday =
            !isSandboxChat &&
            hasInteractedToday &&
            hasInteractedToday(girl.name, action.label);

          return (
            <button
              key={action.label}
              onClick={() => interact(action)}
              disabled={isDisabled}
              className={`
                relative overflow-hidden group w-full
                ${
                  isDisabled
                    ? "bg-gray-300 cursor-not-allowed opacity-50"
                    : `bg-gradient-to-r ${getActionColor(
                        action.type
                      )} shadow-md hover:shadow-lg transform hover:scale-102`
                }
                text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm
              `}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="flex items-center gap-2">
                  <span className="text-lg">{getActionIcon(action.type)}</span>
                  <span>{action.label}</span>
                </span>
                <span className="text-xs opacity-75 flex items-center gap-1">
                  {usedToday && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-300 text-yellow-900 text-[10px] font-bold border border-yellow-500">
                      ✓
                    </span>
                  )}
                  {action.timeCost}h
                </span>
              </div>

              {!isDisabled && (
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 bg-white rounded-lg p-3 border-2 border-purple-200 shadow">
        <p className="text-xs text-gray-600 text-center">
          <span className="font-semibold text-purple-600">💡</span> Different
          actions affect {displayGirlName}&apos;s feelings toward you!
        </p>
      </div>
      {showDatePlanner && (
        <DatePlanner
          girl={girl}
          currentDay={dayOfWeek}
          currentHour={hour}
          playerMoney={player.money}
          onCancel={() => setShowDatePlanner(false)}
          onScheduleDate={handleScheduleDate}
          darkMode={darkMode}
        />
      )}
      {showGiftMenu && (
        <GiftModal
          title={`Give a Gift to ${girl.name}`}
          mode="give"
          entries={giftEntries}
          onCancel={() => {
            setShowGiftMenu(false);
            setPendingGiftAction(null);
          }}
          onSelect={handleGiveGift}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}


