export type GiftEffect = {
  affection?: number;
  lust?: number;
  trust?: number;
  mood?: number;
  love?: number;
};

export type Gift = {
  id: string;
  name: string;
  description: string;
  cost: number;
  effects: GiftEffect;
};

export type GiftEntry = {
  gift: Gift;
  count: number;
};

export const gifts: Gift[] = [
  {
    id: "Handwritten Letter",
    name: "Handwritten Letter",
    description: "A simple, personal note.",
    cost: 5,
    effects: { affection: 3 },
  },
  {
    id: "Chocolate Box",
    name: "Chocolate Box",
    description: "Sweet and easy to love.",
    cost: 15,
    effects: { affection: 4, lust: 1 },
  },
  {
    id: "Rose Bouquet",
    name: "Rose Bouquet",
    description: "Classic romance.",
    cost: 25,
    effects: { affection: 6 },
  },
  {
    id: "Silk Scarf",
    name: "Silk Scarf",
    description: "Soft, elegant, and a little flirty.",
    cost: 45,
    effects: { affection: 4, lust: 4 },
  },
  {
    id: "Perfume",
    name: "Perfume",
    description: "A scent she will remember.",
    cost: 65,
    effects: { lust: 6 },
  },
  {
    id: "Lingerie",
    name: "Lingerie",
    description: "Bold and intimate.",
    cost: 120,
    effects: { lust: 10 },
  },
];

export const giftById: Record<string, Gift> = gifts.reduce(
  (acc, gift) => {
    acc[gift.id] = gift;
    return acc;
  },
  {} as Record<string, Gift>
);

export const getGiftEntriesFromInventory = (
  inventory: string[]
): GiftEntry[] => {
  const counts: Record<string, number> = {};
  for (const item of inventory) {
    if (!giftById[item]) continue;
    counts[item] = (counts[item] ?? 0) + 1;
  }

  return Object.entries(counts).map(([id, count]) => ({
    gift: giftById[id],
    count,
  }));
};

export const hasGiftInInventory = (inventory: string[]): boolean =>
  inventory.some((item) => Boolean(giftById[item]));
