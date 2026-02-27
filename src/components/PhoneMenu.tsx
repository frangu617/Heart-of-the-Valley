import { useMemo, useState } from "react";
import Image from "@/components/FallbackImage";
import { getTimeOfDayLabel } from "@/lib/time";
import { giftById } from "@/data/gifts";
import { PlayerStats } from "../data/characters";
import { Girl } from "../data/characters";
import { DayOfWeek } from "../data/gameConstants";
import { getPortraitObjectPosition } from "@/lib/portraitFraming";
import type { GameplayFlag } from "@/data/events/types";

type QuestItem = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  timing?: string;
  characterName?: string;
};

interface Props {
  player: PlayerStats;
  hour: number;
  girls: Girl[];
  gameplayFlags?: Set<GameplayFlag>;
  darkMode?: boolean;
  onClose: () => void;
  onSave?: () => void;
  onLogout?: () => void;
  isMobile?: boolean;
  dayOfWeek?: DayOfWeek;
  quests?: QuestItem[];
}

type PhoneTab =
  | "stats"
  | "inventory"
  | "contacts"
  | "gallery"
  | "messages"
  | "todo";

type InventoryEntry = {
  id: string;
  name: string;
  count: number;
  description: string;
  details: string;
};

type StatBarProps = {
  label: string;
  value: number;
  icon: string;
  max?: number;
  darkMode: boolean;
};

const getStatColor = (value: number, max: number = 100) => {
  const percentage = (value / max) * 100;
  if (percentage >= 70) return "bg-green-500";
  if (percentage >= 40) return "bg-yellow-500";
  return "bg-red-500";
};

const INVENTORY_ITEM_DETAILS: Record<
  string,
  { description: string; details: string }
> = {
  "Gift Card": {
    description: "A prepaid mall gift card you found.",
    details:
      "Currently a collectible item. Keep it in case future events or dialogue checks need it.",
  },
};

const formatGiftEffects = (
  effects: Partial<{ affection: number; lust: number; mood: number; love: number }>,
) => {
  const parts: string[] = [];

  if (typeof effects.affection === "number") {
    parts.push(
      `Affection ${effects.affection >= 0 ? "+" : ""}${effects.affection}`,
    );
  }
  if (typeof effects.lust === "number") {
    parts.push(`Lust ${effects.lust >= 0 ? "+" : ""}${effects.lust}`);
  }
  if (typeof effects.mood === "number") {
    parts.push(`Mood ${effects.mood >= 0 ? "+" : ""}${effects.mood}`);
  }
  if (typeof effects.love === "number") {
    parts.push(`Love ${effects.love >= 0 ? "+" : ""}${effects.love}`);
  }

  return parts.join(", ");
};

const StatBar = ({
  label,
  value,
  icon,
  max = 100,
  darkMode,
}: StatBarProps) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <span
        className={`text-sm font-medium ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {icon} {label}
      </span>
      <span
        className={`text-sm font-bold ${
          darkMode ? "text-purple-400" : "text-purple-600"
        }`}
      >
        {value}
      </span>
    </div>
    <div
      className={`w-full rounded-full h-2 overflow-hidden ${
        darkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ${getStatColor(
          value,
          max
        )}`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

export default function PhoneMenu({
  player,
  hour,
  girls,
  gameplayFlags = new Set<GameplayFlag>(),
  darkMode = true,
  onClose,
  onSave,
  onLogout,
  isMobile = false,
  dayOfWeek,
  quests = [],
}: Props) {
  const [activeTab, setActiveTab] = useState<PhoneTab>("stats");
  const [isClosing, setIsClosing] = useState(false);
  const closeDelayMs = 200;
  const hungerBarValue = Math.max(0, Math.min(100, 100 - player.hunger));

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(onClose, closeDelayMs);
  };

  const timeOfDayLabel = getTimeOfDayLabel(hour);
  const inventoryEntries = useMemo<InventoryEntry[]>(() => {
    const counts: Record<string, number> = {};
    player.inventory.forEach((itemId) => {
      counts[itemId] = (counts[itemId] ?? 0) + 1;
    });

    return Object.entries(counts)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([itemId, count]) => {
        const gift = giftById[itemId];
        if (gift) {
          const effectsText = formatGiftEffects(gift.effects);
          return {
            id: itemId,
            name: gift.name,
            count,
            description: gift.description,
            details: effectsText
              ? `Use: Give it as a gift (${effectsText}).`
              : "Use: Give it as a gift.",
          };
        }

        const knownDetails = INVENTORY_ITEM_DETAILS[itemId];
        return {
          id: itemId,
          name: itemId,
          count,
          description:
            knownDetails?.description ?? "An item in your inventory.",
          details:
            knownDetails?.details ??
            "No specific effect is defined yet, but it may be used by future events.",
        };
      });
  }, [player.inventory]);

  const isIdentityHidden = (girl: Girl) =>
    girl.name === "Dawn" &&
    !gameplayFlags.has("metDawn") &&
    !gameplayFlags.has("hasMetDawn");

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      {/* Phone Frame */}
      <div
        className={`
        ${isMobile ? "w-full h-full" : "w-96 h-[700px]"}
        ${darkMode ? "bg-gray-900" : "bg-white"}
        rounded-3xl shadow-2xl overflow-hidden flex flex-col
        ${!isMobile && "border-8 border-gray-800"}
        ${isClosing ? "animate-slideDown" : "animate-slideUp"}
      `}
      >
        {/* Phone Header */}
        <div
          className={`
          ${
            darkMode
              ? "bg-gradient-to-r from-purple-900 to-pink-900"
              : "bg-gradient-to-r from-purple-500 to-pink-500"
          }
          text-white p-4 flex items-center justify-between
        `}
        >
          <div>
            <h2 className="text-xl font-bold">My Phone</h2>
            <p className="text-xs opacity-90">
              {dayOfWeek || "Monday"} - {hour}:00 {timeOfDayLabel}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Phone Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div className="space-y-4 animate-slideUp">
              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Your Stats
              </h3>

              <StatBar
                label="Energy"
                value={player.energy}
                icon="⚡"
                darkMode={darkMode}
              />
              <StatBar
                label="Hunger"
                value={hungerBarValue}
                icon="🍔"
                darkMode={darkMode}
              />
              <StatBar
                label="Fitness"
                value={player.fitness}
                icon="🏋️"
                max={50}
                darkMode={darkMode}
              />
              <StatBar
                label="Intelligence"
                value={player.intelligence}
                icon="🧠"
                max={50}
                darkMode={darkMode}
              />
              <StatBar
                label="Style"
                value={player.style}
                icon="💅"
                max={50}
                darkMode={darkMode}
              />

              <div
                className={`rounded-xl p-4 border-2 ${
                  darkMode
                    ? "bg-yellow-900/50 border-yellow-700"
                    : "bg-yellow-100 border-yellow-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-lg font-semibold ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    💰 Money
                  </span>
                  <span
                    className={`text-2xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    ${player.money}
                  </span>
                </div>
              </div>

              {onSave && (
                <button
                  onClick={onSave}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  💾 Quick Save
                </button>
              )}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg"
                >
                  Log Out
                </button>
              )}
            </div>
          )}

          {/* To-Do Tab */}
          {activeTab === "todo" && (
            <div className="space-y-4 animate-slideUp">
              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                To-Do
              </h3>

              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Your current objectives:
              </p>

              {quests.length > 0 ? (
                <div className="space-y-3">
                  {quests.map((quest) => (
                    <div
                      key={quest.id}
                      className={`
                        w-full text-left p-4 rounded-xl transition-all duration-200 border-2
                        ${
                          darkMode
                            ? "bg-gray-800 border-purple-700"
                            : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                        }
                        shadow-md
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div
                            className={`font-bold ${
                              darkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {quest.title}
                          </div>
                          {quest.description && (
                            <div
                              className={`text-xs mt-1 ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {quest.description}
                            </div>
                          )}
                          {(quest.location || quest.timing || quest.characterName) && (
                            <div
                              className={`text-xs mt-2 ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {quest.location && (
                                <div>Location: {quest.location}</div>
                              )}
                              {quest.timing && (
                                <div>Time: {quest.timing}</div>
                              )}
                              {quest.characterName && (
                                <div>Character: {quest.characterName}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`
                    text-center py-12
                    ${darkMode ? "text-gray-500" : "text-gray-400"}
                  `}
                >
                  <div className="text-6xl mb-4">TODO</div>
                  <p>No active to-dos right now</p>
                  <p className="text-sm mt-2">
                    Check back after you meet new conditions
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === "inventory" && (
            <div className="space-y-4 animate-slideUp">
              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Inventory
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Everything you are carrying and what each item does.
              </p>

              {inventoryEntries.length > 0 ? (
                <div className="space-y-3">
                  {inventoryEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className={`rounded-xl border-2 p-4 ${
                        darkMode
                          ? "bg-gray-800 border-purple-700"
                          : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div
                            className={`font-bold ${
                              darkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {entry.name}
                          </div>
                          <div
                            className={`mt-1 text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {entry.description}
                          </div>
                          <div
                            className={`mt-2 text-xs ${
                              darkMode ? "text-purple-300" : "text-purple-700"
                            }`}
                          >
                            {entry.details}
                          </div>
                        </div>
                        {entry.count > 1 && (
                          <div
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              darkMode
                                ? "bg-purple-900 text-purple-200"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            x{entry.count}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`
                    text-center py-12
                    ${darkMode ? "text-gray-500" : "text-gray-400"}
                  `}
                >
                  <div className="text-6xl mb-4">🎒</div>
                  <p>Your inventory is empty.</p>
                  <p className="text-sm mt-2">
                    Buy gifts at the mall or find items through events.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <div className="space-y-3 animate-slideUp">
              <h3
                className={`text-lg font-bold mb-4 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Contacts
              </h3>
              {girls.map((girl) => {
                const hiddenIdentity = isIdentityHidden(girl);
                const displayName = hiddenIdentity ? "???" : girl.name;
                const displayPersonality = hiddenIdentity
                  ? "Unknown"
                  : girl.personality;
                const displayLocation = hiddenIdentity ? "Unknown" : girl.location;
                return (
                <div
                  key={girl.name}
                  className={`
                    rounded-xl p-4 border-2 transition-all
                    ${
                      darkMode
                        ? "bg-gray-800 border-purple-700 hover:border-purple-500"
                        : "bg-gradient-to-r from-pink-50 to-purple-50 border-purple-200 hover:border-purple-400"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`relative w-12 h-12 rounded-full overflow-hidden border-2 ${
                      darkMode
                        ? "bg-purple-700 border-purple-500"
                        : "bg-purple-300 border-purple-200"
                    }`}
                  >
                    <Image
                      src={`/images/characters/${girl.name.toLowerCase()}/faces/portrait.webp`}
                      alt={`${displayName} portrait`}
                      layout="fill"
                      objectFit="cover"
                      style={{
                        objectPosition: getPortraitObjectPosition(girl.name, 50),
                      }}
                    />
                  </div>
                    <div className="flex-1">
                      <h4
                        className={`font-bold ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {displayName}
                      </h4>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {displayPersonality}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`flex justify-between px-2 py-1 rounded ${
                        darkMode ? "bg-pink-900/50" : "bg-pink-100"
                      }`}
                    >
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        💕 Affection
                      </span>
                      <span
                        className={`font-bold ${
                          darkMode ? "text-pink-400" : "text-pink-600"
                        }`}
                      >
                        {hiddenIdentity ? "??" : girl.stats.affection}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between px-2 py-1 rounded ${
                        darkMode ? "bg-red-900/50" : "bg-red-100"
                      }`}
                    >
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        🔥 Lust
                      </span>
                      <span
                        className={`font-bold ${
                          darkMode ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        {hiddenIdentity ? "??" : girl.stats.lust}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between px-2 py-1 rounded ${
                        darkMode ? "bg-purple-900/50" : "bg-purple-100"
                      }`}
                    >
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        💖 Love
                      </span>
                      <span
                        className={`font-bold ${
                          darkMode ? "text-purple-400" : "text-purple-600"
                        }`}
                      >
                        {hiddenIdentity ? "??" : girl.stats.love}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-2 text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    📍 Currently at:{" "}
                    <span className="font-semibold">{displayLocation}</span>
                  </div>
                </div>
              )})}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="animate-slideUp">
              <h3
                className={`text-lg font-bold mb-4 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Photo Gallery
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {girls.map((girl) => {
                  const hiddenIdentity = isIdentityHidden(girl);
                  const displayName = hiddenIdentity ? "???" : girl.name;
                  return (
                  <div key={girl.name} className="relative group">
                    <div
                      className={`
                      aspect-square rounded-xl overflow-hidden border-2
                      ${darkMode ? "border-purple-700" : "border-purple-300"}
                    `}
                    >
                      <Image
                        src={`/images/characters/${girl.name.toLowerCase()}/faces/portrait.webp`}
                        alt={displayName}
                        layout="fill"
                        objectFit="cover"
                        style={{
                          objectPosition: getPortraitObjectPosition(girl.name, 50),
                        }}
                      />
                    </div>
                    <p
                      className={`text-center text-sm font-semibold mt-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {displayName}
                    </p>
                  </div>
                )})}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="animate-slideUp">
              <h3
                className={`text-lg font-bold mb-4 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Messages
              </h3>
              <div
                className={`
                text-center py-12
                ${darkMode ? "text-gray-500" : "text-gray-400"}
              `}
              >
                <div className="text-6xl mb-4">💬</div>
                <p>Coming soon!</p>
                <p className="text-sm mt-2">
                  Future feature: Text characters directly
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Phone Navigation */}
        <div
          className={`
          ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }
          border-t-2 p-2 flex justify-around
        `}
        >
          <button
            onClick={() => setActiveTab("stats")}
            className={`
              flex-1 py-3 px-1 rounded-lg transition-all
              ${
                activeTab === "stats"
                  ? darkMode
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-white"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            <div className="text-xl">📊</div>
            <div className="text-[10px]">Stats</div>
          </button>

          <button
            onClick={() => setActiveTab("todo")}
            className={`
              flex-1 py-3 px-1 rounded-lg transition-all
              ${
                activeTab === "todo"
                  ? darkMode
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-white"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            <div className="text-xl">💡</div>
            <div className="text-[10px]">To-Do</div>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`
              flex-1 py-3 px-1 rounded-lg transition-all
              ${
                activeTab === "inventory"
                  ? darkMode
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-white"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            <div className="text-xl">🎒</div>
            <div className="text-[10px]">Items</div>
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`
              flex-1 py-3 px-1 rounded-lg transition-all
              ${
                activeTab === "contacts"
                  ? darkMode
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-white"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            <div className="text-xl">👥</div>
            <div className="text-[10px]">Contacts</div>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`
              flex-1 py-3 px-1 rounded-lg transition-all
              ${
                activeTab === "gallery"
                  ? darkMode
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-white"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            <div className="text-xl">📷</div>
            <div className="text-[10px]">Gallery</div>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`
              flex-1 py-3 px-1 rounded-lg transition-all
              ${
                activeTab === "messages"
                  ? darkMode
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-white"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            <div className="text-xl">💬</div>
            <div className="text-[10px]">Messages</div>
          </button>
        </div>
      </div>
    </div>
  );
}
