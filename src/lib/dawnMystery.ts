import type { Dialogue, DialogueLine } from "@/data/dialogues/index";
import type { GameplayFlag } from "@/data/events/types";

const DAWN_INTEL_MARKER = "__DAWN_INTEL_LINES__";

export const isDawnIdentityHidden = (
  girlName: string,
  gameplayFlags: Set<GameplayFlag>,
) =>
  girlName === "Dawn" &&
  !gameplayFlags.has("metDawn") &&
  !gameplayFlags.has("hasMetDawn");

export const getGirlDisplayName = (
  girlName: string,
  gameplayFlags: Set<GameplayFlag>,
) => (isDawnIdentityHidden(girlName, gameplayFlags) ? "???" : girlName);

type IntelStage = 0 | 1 | 2 | 3 | 4 | 5;

const hasAny = (flags: Set<string>, candidates: readonly string[]) =>
  candidates.some((flag) => flags.has(flag));

const hasSexLikeFlag = (flags: Set<string>, characterPrefix: string) => {
  for (const flag of flags) {
    const normalized = flag.toLowerCase();
    if (!normalized.startsWith(characterPrefix)) continue;
    if (/(sex|ntr|hookup|slept|fuck|intimate)/i.test(normalized)) {
      return true;
    }
  }
  return false;
};

const resolveIrisStage = (flags: Set<string>): IntelStage => {
  if (hasSexLikeFlag(flags, "iris") || flags.has("irisNtrSeeded")) return 5;
  if (flags.has("irisCh2Complete") || flags.has("irisDatePlanned")) return 4;
  if (flags.has("irisCh1FinaleComplete") || flags.has("irisSchoolKissUnlocked")) return 3;
  if (flags.has("irisCoffeeMet")) return 2;
  if (flags.has("hasMetIris")) return 1;
  return 0;
};

const resolveYumiStage = (flags: Set<string>): IntelStage => {
  if (hasSexLikeFlag(flags, "yumi")) return 5;
  if (flags.has("yumi_chapter_2_date") || flags.has("yumi_chapter_2_completed")) return 4;
  if (flags.has("yumi_chapter_1_completed")) return 3;
  if (
    hasAny(flags, [
      "yumi_relationship_secret",
      "yumi_relationship_secret_dom",
      "yumi_relationship_secret_neutral",
      "yumi_c2_event_2_completed",
    ])
  ) {
    return 2;
  }
  if (flags.has("hasMetYumi")) return 1;
  return 0;
};

const resolveGwenStage = (flags: Set<string>): IntelStage => {
  if (hasSexLikeFlag(flags, "gwen")) return 5;
  if (flags.has("gwen_chapter_1_completed")) return 4;
  if (flags.has("gwenDomPath") || flags.has("gwenSubPath") || flags.has("gwenRevealDone")) return 3;
  if (flags.has("gwenApologyDone") || flags.has("gwenRumorHeard")) return 2;
  if (flags.has("hasMetGwen")) return 1;
  return 0;
};

const resolveRubyStage = (flags: Set<string>): IntelStage => {
  if (hasSexLikeFlag(flags, "ruby")) return 5;
  if (flags.has("ruby_chapter_1_completed")) return 4;
  if (flags.has("rubyExConflictStarted")) return 3;
  if (flags.has("rubyCh1Ev3Done") || flags.has("rubyCh1Ev4Done")) return 2;
  if (flags.has("hasMetRuby")) return 1;
  return 0;
};

const lineForStage = (character: "Iris" | "Yumi" | "Gwen" | "Ruby", stage: IntelStage): string => {
  if (stage === 5) {
    if (character === "Iris") return "Mom: you two are already negotiating indulgence like it is a research grant.";
    if (character === "Yumi") return "Yumi: not just tension anymore. You crossed a line and called it honesty.";
    if (character === "Gwen") return "Gwen: the line with her is gone. You only pretend it is still blurry.";
    return "Ruby: you are far past innocent with her, and you both know it.";
  }

  if (stage === 4) {
    if (character === "Iris") return "Mom: date nights, rules, and 'structure' like that keeps fire from spreading.";
    if (character === "Yumi") return "Yumi: real dates now. Public enough to count, private enough to deny.";
    if (character === "Gwen") return "Gwen: full chapter complete. You did not just flirt and leave.";
    return "Ruby: you made it a real date, not a coincidence.";
  }

  if (stage === 3) {
    if (character === "Iris") return "Mom: you kiss her like nobody can see, then act shocked when someone does.";
    if (character === "Yumi") return "Yumi: you kissed your student and kept moving.";
    if (character === "Gwen") return "Gwen: you gave her enough heat to lock a lane.";
    return "Ruby: the kiss was intentional, not a slip.";
  }

  if (stage === 2) {
    if (character === "Iris") return "Mom: coffee became hallway signals and controlled damage.";
    if (character === "Yumi") return "Yumi: secrecy and leverage. You still call it caution.";
    if (character === "Gwen") return "Gwen: apologies, rumors, and you still stayed in orbit.";
    return "Ruby: trainer drama and emotional triage. You leaned in anyway.";
  }

  if (stage === 1) {
    if (character === "Iris") return "Mom: you met her and started orbiting immediately.";
    if (character === "Yumi") return "Yumi: contact established. Not random.";
    if (character === "Gwen") return "Gwen: you noticed her, and she noticed back.";
    return "Ruby: first contact at the gym, and you kept coming back.";
  }

  return "";
};

export const buildDawnIntelLines = (gameplayFlags: Set<GameplayFlag>): string[] => {
  const flags = gameplayFlags as unknown as Set<string>;
  const lines: string[] = [];

  const stageByCharacter: Array<["Iris" | "Yumi" | "Gwen" | "Ruby", IntelStage]> = [
    ["Iris", resolveIrisStage(flags)],
    ["Yumi", resolveYumiStage(flags)],
    ["Gwen", resolveGwenStage(flags)],
    ["Ruby", resolveRubyStage(flags)],
  ];

  stageByCharacter.forEach(([character, stage]) => {
    const line = lineForStage(character, stage);
    if (line) lines.push(line);
  });

  if (flags.has("playerKissedAnotherGirl")) {
    lines.push("And yes, I know about the extra kiss too. You are not subtle.");
  }

  if (lines.length === 0) {
    lines.push("You move like somebody who thinks no one is watching. That is adorable.");
  }

  return lines;
};

export const injectDawnIntelLines = (
  dialogue: Dialogue,
  gameplayFlags: Set<GameplayFlag>,
): Dialogue => {
  const hasMarker = dialogue.lines.some((line) => line.text === DAWN_INTEL_MARKER);
  if (!hasMarker) {
    return dialogue;
  }

  const intelLines = buildDawnIntelLines(gameplayFlags);
  const resolvedLines: DialogueLine[] = [];

  dialogue.lines.forEach((line) => {
    if (line.text !== DAWN_INTEL_MARKER) {
      resolvedLines.push(line);
      return;
    }

    intelLines.forEach((text, index) => {
      resolvedLines.push({
        speaker: "???",
        text,
        expression: index === 0 ? "smug" : "neutral",
      });
    });
  });

  return {
    ...dialogue,
    lines: resolvedLines,
  };
};
