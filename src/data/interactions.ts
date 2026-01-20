import { PlayerStats } from "./characters";

export type InteractionType = "Chat" | "Romance" | "Gift" | "Date" | "Context";

export type Interaction = {
  type: InteractionType;
  label: string;
  timeCost: number; // in game hours
  statEffects?: Partial<PlayerStats>; // effects on player
  girlEffects?: {
    affection?: number;
    lust?: number;
    mood?: number;
    trust?: number;
    love?: number;
  }; // effects on girl
  requiresItem?: string; // optional inventory requirement
  locationContext?: string; // optional location-specific trigger
};

export const interactionMenu: Interaction[] = [
  {
    type: "Chat",
    label: "Chat",
    timeCost: 1,
    statEffects: { mood: +5 },
    girlEffects: { mood: +5, affection: +2 },
  },
  {
    type: "Romance",
    label: "Flirt",
    timeCost: 1,
    statEffects: { style: +1 },
    girlEffects: { lust: +5, trust: +3 },
  },
  {
    type: "Romance",
    label: "Kiss",
    timeCost: 1,
    statEffects: { mood: +3 },
    girlEffects: { affection: +7, lust: +5 },
  },
  {
    type: "Gift",
    label: "Give Gift",
    timeCost: 1,
  },
  {
    type: "Date",
    label: "Invite on Date",
    timeCost: 2,
    statEffects: { energy: -10, money: -20 },
    girlEffects: { affection: +8, love: +4 },
  },
  {
    type: "Context",
    label: "Cook Together",
    timeCost: 2,
    locationContext: "Kitchen",
    statEffects: { hunger: -20 },
    girlEffects: { trust: +5, affection: +6 },
  },
];
