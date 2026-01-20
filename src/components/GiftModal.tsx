import { Gift, GiftEntry } from "@/data/gifts";

type GiftModalMode = "buy" | "give";

type Props = {
  title: string;
  mode: GiftModalMode;
  entries: GiftEntry[];
  playerMoney?: number;
  onSelect: (gift: Gift) => void;
  onCancel: () => void;
  darkMode?: boolean;
};

const formatGiftEffects = (effects: Gift["effects"]) => {
  const parts: string[] = [];

  if (typeof effects.affection === "number") {
    parts.push(`Affection ${effects.affection >= 0 ? "+" : ""}${effects.affection}`);
  }
  if (typeof effects.lust === "number") {
    parts.push(`Lust ${effects.lust >= 0 ? "+" : ""}${effects.lust}`);
  }
  if (typeof effects.trust === "number") {
    parts.push(`Trust ${effects.trust >= 0 ? "+" : ""}${effects.trust}`);
  }
  if (typeof effects.mood === "number") {
    parts.push(`Mood ${effects.mood >= 0 ? "+" : ""}${effects.mood}`);
  }
  if (typeof effects.love === "number") {
    parts.push(`Love ${effects.love >= 0 ? "+" : ""}${effects.love}`);
  }

  return parts.join(", ");
};

export default function GiftModal({
  title,
  mode,
  entries,
  playerMoney = 0,
  onSelect,
  onCancel,
  darkMode = true,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div
        className={`max-w-3xl w-full rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto ${
          darkMode
            ? "bg-gray-900 border-2 border-purple-700"
            : "bg-white border-2 border-purple-300"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-purple-300" : "text-purple-800"
            }`}
          >
            {title}
          </h2>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center transition-all"
          >
            X
          </button>
        </div>

        {mode === "buy" && (
          <div
            className={`mb-4 rounded-xl p-3 ${
              darkMode ? "bg-purple-900/50" : "bg-purple-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Money
              </span>
              <span
                className={`text-xl font-bold ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                ${playerMoney}
              </span>
            </div>
          </div>
        )}

        {entries.length === 0 && (
          <div
            className={`text-center py-10 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No gifts available.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {entries.map(({ gift, count }) => {
            const canAfford = mode !== "buy" || playerMoney >= gift.cost;
            const effectsText = formatGiftEffects(gift.effects);

            return (
              <button
                key={gift.id}
                onClick={() => onSelect(gift)}
                disabled={!canAfford}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  canAfford
                    ? darkMode
                      ? "border-gray-700 bg-gray-800 hover:border-purple-600"
                      : "border-gray-300 bg-white hover:border-purple-400"
                    : "opacity-50 cursor-not-allowed border-gray-600 bg-gray-800"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div
                      className={`font-bold ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {gift.name}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {gift.description}
                    </div>
                  </div>
                  <div className="text-right text-sm font-semibold">
                    {mode === "buy" ? `$${gift.cost}` : count > 1 ? `x${count}` : ""}
                  </div>
                </div>
                {effectsText && (
                  <div className="text-xs opacity-75 mt-2">{effectsText}</div>
                )}
                {mode === "buy" && !canAfford && (
                  <div className="text-xs text-red-400 mt-2">
                    Not enough money.
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
