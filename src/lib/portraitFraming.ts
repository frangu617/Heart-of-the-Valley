const DEFAULT_VERTICAL_OFFSET_PX = 30;
const DEFAULT_SPRITE_HORIZONTAL_PERCENT = 50;

// Tune per character because source poses/crops vary.
const VERTICAL_OFFSET_BY_CHARACTER: Record<string, number> = {
  iris: 24,
  dawn: 49,
  gwen: 49,
  ruby: 30,
  yumi: 28,
};
const SPRITE_HORIZONTAL_PERCENT_BY_CHARACTER: Record<string, number> = {
  ruby: 56,
};

export const getPortraitVerticalOffsetPx = (
  characterName?: string,
): number => {
  if (!characterName) return DEFAULT_VERTICAL_OFFSET_PX;
  return (
    VERTICAL_OFFSET_BY_CHARACTER[characterName.trim().toLowerCase()] ??
    DEFAULT_VERTICAL_OFFSET_PX
  );
};

export const getPortraitObjectPosition = (
  characterName: string | undefined,
  basePercent: number,
): string =>
  `center calc(${basePercent}% + ${getPortraitVerticalOffsetPx(characterName)}px)`;

export const getSpriteHorizontalPercent = (characterName?: string): number => {
  if (!characterName) return DEFAULT_SPRITE_HORIZONTAL_PERCENT;
  return (
    SPRITE_HORIZONTAL_PERCENT_BY_CHARACTER[characterName.trim().toLowerCase()] ??
    DEFAULT_SPRITE_HORIZONTAL_PERCENT
  );
};

export const getSceneCharacterObjectPosition = (
  characterName?: string,
): string => `${getSpriteHorizontalPercent(characterName)}% top`;

export const getDialogueCharacterObjectPosition = (
  characterName: string | undefined,
  basePercent: number,
): string =>
  `${getSpriteHorizontalPercent(characterName)}% calc(${basePercent}% + ${getPortraitVerticalOffsetPx(characterName)}px)`;
