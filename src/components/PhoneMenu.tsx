import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "@/components/FallbackImage";
import { getTimeOfDayLabel } from "@/lib/time";
import { giftById } from "@/data/gifts";
import { PlayerStats } from "../data/characters";
import { Girl } from "../data/characters";
import { DayOfWeek } from "../data/gameConstants";
import { getPortraitObjectPosition } from "@/lib/portraitFraming";
import type { GameplayFlag } from "@/data/events/types";
import type {
  GalleryUnlock,
  PhoneMessage,
  PhoneMessageAction,
} from "@/lib/phoneMessages";
import type {
  CalendarDateEntry,
  CalendarMilestoneEntry,
} from "@/lib/calendar";
import { getMilestoneLabel } from "@/lib/calendar";

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
  messagesByCharacter?: Record<string, PhoneMessage[]>;
  galleryUnlocks?: GalleryUnlock[];
  onSendMessageAction?: (
    characterName: string,
    action: PhoneMessageAction,
  ) => void;
  darkMode?: boolean;
  onClose: () => void;
  onSave?: () => void;
  onLogout?: () => void;
  isMobile?: boolean;
  dayOfWeek?: DayOfWeek;
  dayCount?: number;
  quests?: QuestItem[];
  calendarPlannedDates?: CalendarDateEntry[];
  calendarMilestones?: CalendarMilestoneEntry[];
}

type PhoneTab =
  | "home"
  | "stats"
  | "inventory"
  | "contacts"
  | "gallery"
  | "messages"
  | "todo"
  | "calendar";

const MESSAGE_ACTION_ORDER: PhoneMessageAction[] = [
  "chat",
  "flirt",
  "sext",
  "date",
];
type AppTab = Exclude<PhoneTab, "home">;

type HomeScreenApp = {
  tab: AppTab;
  label: string;
  icon: string;
  accentClass: string;
};

const PHONE_TAB_TITLES: Record<PhoneTab, string> = {
  home: "Home",
  stats: "Stats",
  todo: "To-Do",
  calendar: "Calendar",
  inventory: "Items",
  contacts: "Contacts",
  gallery: "Gallery",
  messages: "Messages",
};

const HOME_SCREEN_APPS: HomeScreenApp[] = [
  {
    tab: "messages",
    label: "Messages",
    icon: "💬",
    accentClass: "from-green-400 to-emerald-600",
  },
  {
    tab: "contacts",
    label: "Contacts",
    icon: "👥",
    accentClass: "from-blue-400 to-cyan-600",
  },
  {
    tab: "gallery",
    label: "Gallery",
    icon: "📷",
    accentClass: "from-pink-400 to-rose-600",
  },
  {
    tab: "stats",
    label: "Stats",
    icon: "📊",
    accentClass: "from-purple-400 to-indigo-600",
  },
  {
    tab: "inventory",
    label: "Items",
    icon: "🎒",
    accentClass: "from-amber-400 to-orange-600",
  },
  {
    tab: "todo",
    label: "To-Do",
    icon: "💡",
    accentClass: "from-violet-400 to-fuchsia-600",
  },
  {
    tab: "calendar",
    label: "Calendar",
    icon: "CAL",
    accentClass: "from-cyan-400 to-blue-600",
  },
];

type InventoryEntry = {
  id: string;
  name: string;
  count: number;
  description: string;
  details: string;
};

type CalendarTimelineEntry = {
  id: string;
  dayCount: number;
  dayOfWeek: DayOfWeek;
  hour: number;
  title: string;
  detail: string;
  kind: "date" | "milestone";
};

const formatClockHour = (value: number) => {
  if (value === 0) return "12:00 AM";
  if (value === 12) return "12:00 PM";
  if (value > 12) return `${value - 12}:00 PM`;
  return `${value}:00 AM`;
};

const getRelativeDayLabel = (currentDayCount: number, targetDayCount: number) => {
  const offset = targetDayCount - currentDayCount;
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  if (offset > 1) return `In ${offset} days`;
  if (offset === -1) return "Yesterday";
  return `${Math.abs(offset)} days ago`;
};

const SOURCE_LABEL_BY_DATE_ENTRY_SOURCE: Record<CalendarDateEntry["source"], string> = {
  player: "Player planned",
  npc: "She asked",
  story: "Story event",
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
  messagesByCharacter = {},
  galleryUnlocks = [],
  onSendMessageAction,
  darkMode = true,
  onClose,
  onSave,
  onLogout,
  isMobile = false,
  dayOfWeek,
  dayCount = 0,
  quests = [],
  calendarPlannedDates = [],
  calendarMilestones = [],
}: Props) {
  const [activeTab, setActiveTab] = useState<PhoneTab>("home");
  const [activeMessageContact, setActiveMessageContact] = useState<string>("");
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

  const isIdentityHidden = useCallback(
    (girl: Girl) =>
      girl.name === "Dawn" &&
      !gameplayFlags.has("metDawn") &&
      !gameplayFlags.has("hasMetDawn"),
    [gameplayFlags],
  );

  const messageContacts = useMemo(
    () => girls.filter((girl) => !isIdentityHidden(girl)),
    [girls, isIdentityHidden],
  );

  useEffect(() => {
    if (messageContacts.length === 0) {
      if (activeMessageContact) {
        setActiveMessageContact("");
      }
      return;
    }

    if (!activeMessageContact) {
      setActiveMessageContact(messageContacts[0].name);
      return;
    }

    const stillExists = messageContacts.some(
      (girl) => girl.name === activeMessageContact,
    );
    if (!stillExists) {
      setActiveMessageContact(messageContacts[0].name);
    }
  }, [activeMessageContact, messageContacts]);

  const activeThread = activeMessageContact
    ? messagesByCharacter[activeMessageContact] ?? []
    : [];
  const calendarTimelineEntries = useMemo<CalendarTimelineEntry[]>(() => {
    const dateEntries: CalendarTimelineEntry[] = calendarPlannedDates.map((entry) => ({
      id: `date_${entry.id}`,
      dayCount: entry.dayCount,
      dayOfWeek: entry.dayOfWeek,
      hour: entry.hour,
      title: `${entry.characterName} - ${entry.location}`,
      detail: `${SOURCE_LABEL_BY_DATE_ENTRY_SOURCE[entry.source]} - ${entry.label}`,
      kind: "date",
    }));
    const milestoneEntries: CalendarTimelineEntry[] = calendarMilestones.map(
      (entry) => ({
        id: `milestone_${entry.id}`,
        dayCount: entry.dayCount,
        dayOfWeek: entry.dayOfWeek,
        hour: entry.hour,
        title: `${entry.characterName} - ${getMilestoneLabel(entry.type)}`,
        detail: entry.note,
        kind: "milestone",
      }),
    );

    return [...dateEntries, ...milestoneEntries].sort((left, right) => {
      if (left.dayCount !== right.dayCount) return left.dayCount - right.dayCount;
      if (left.hour !== right.hour) return left.hour - right.hour;
      return left.title.localeCompare(right.title);
    });
  }, [calendarMilestones, calendarPlannedDates]);
  const activeTabTitle = PHONE_TAB_TITLES[activeTab];

  const openTab = (tab: AppTab) => setActiveTab(tab);
  const goBack = () => setActiveTab("home");
  const pressHomeButton = () => {
    if (activeTab === "home") {
      handleClose();
      return;
    }
    setActiveTab("home");
  };

  return (
    <div
      className={`fixed inset-0 z-[2100] flex ${
        isMobile
          ? "items-stretch justify-stretch bg-black p-0"
          : "items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      } ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      {/* Phone Frame */}
      <div
        className={`
        ${isMobile ? "h-full w-full rounded-none shadow-none" : "h-[720px] w-96 rounded-[2.25rem] shadow-2xl border-8 border-black"}
        ${darkMode ? "bg-gray-950" : "bg-gray-100"}
        ${isMobile ? "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]" : ""}
        relative overflow-hidden flex flex-col
        ${isClosing ? "animate-slideDown" : "animate-slideUp"}
      `}
      >
        {!isMobile && (
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-4 w-24 -translate-x-1/2 rounded-full bg-black/90" />
        )}

        <div
          className={`relative flex-1 min-h-0 flex flex-col ${
            darkMode
              ? "bg-gradient-to-b from-slate-800 via-slate-900 to-black"
              : "bg-gradient-to-b from-sky-200 via-indigo-100 to-rose-100"
          }`}
        >
          {/* Phone Header */}
          <div className="px-4 pt-4 pb-3 shrink-0 text-white">
            <div className="flex items-center justify-between text-[11px] font-medium tracking-wide">
              <span>
                {dayOfWeek || "Monday"} {hour}:00 {timeOfDayLabel}
              </span>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                <span className="h-2 w-4 rounded-sm border border-white/80" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={activeTab === "home"}
                className={`h-9 w-9 rounded-full text-lg font-bold transition ${
                  activeTab === "home"
                    ? "cursor-default opacity-0"
                    : "bg-white/15 hover:bg-white/25"
                }`}
                aria-label="Back"
              >
                {"<"}
              </button>

              <div className="text-center">
                <h2 className="text-lg font-bold leading-tight">My Phone</h2>
                <p className="text-xs uppercase tracking-[0.22em] text-white/75">
                  {activeTabTitle}
                </p>
              </div>

              <div className="h-9 w-9" />
            </div>
          </div>

          {/* Phone Content */}
          <div
            className={`mx-4 mb-3 flex-1 min-h-0 overflow-y-auto overflow-x-hidden rounded-2xl border p-4 ${
              darkMode
                ? "border-white/10 bg-black/35 text-gray-100"
                : "border-white/60 bg-white/70 text-gray-900"
            }`}
          >
            {activeTab === "home" && (
              <div className="animate-slideUp space-y-5">
                <div
                  className={`rounded-2xl border px-4 py-3 ${
                    darkMode
                      ? "border-white/15 bg-white/5"
                      : "border-indigo-200 bg-white/80"
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.18em] opacity-70">
                    Welcome
                  </div>
                  <div className="mt-1 text-sm font-semibold">
                    Tap an app icon to open it.
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {HOME_SCREEN_APPS.map((app) => (
                    <button
                      key={app.tab}
                      type="button"
                      onClick={() => openTab(app.tab)}
                      className="flex flex-col items-center gap-2 text-center transition hover:scale-105"
                    >
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-lg ${app.accentClass}`}
                      >
                        {app.icon}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {app.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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

          {/* Calendar Tab */}
          {activeTab === "calendar" && (
            <div className="space-y-4 animate-slideUp">
              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Calendar
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Planned dates and relationship milestones.
              </p>

              {calendarTimelineEntries.length === 0 ? (
                <div
                  className={`rounded-xl border-2 p-4 text-sm ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 text-gray-400"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  Nothing scheduled yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {calendarTimelineEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className={`rounded-xl border-2 p-3 ${
                        darkMode
                          ? "border-purple-700 bg-gray-800"
                          : "border-purple-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div
                            className={`text-sm font-semibold ${
                              darkMode ? "text-gray-200" : "text-gray-800"
                            }`}
                          >
                            {entry.title}
                          </div>
                          <div
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {entry.detail}
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                            entry.kind === "date"
                              ? darkMode
                                ? "bg-cyan-900 text-cyan-200"
                                : "bg-cyan-100 text-cyan-700"
                              : darkMode
                                ? "bg-purple-900 text-purple-200"
                                : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {entry.kind === "date" ? "Date" : "Milestone"}
                        </span>
                      </div>
                      <div
                        className={`mt-2 text-xs ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {getRelativeDayLabel(dayCount, entry.dayCount)} -{" "}
                        {entry.dayOfWeek} {formatClockHour(entry.hour)}
                      </div>
                    </div>
                  ))}
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
            <div className="space-y-3 animate-slideUp pb-2">
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
                    overflow-hidden
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
            <div className="animate-slideUp pb-2">
              <h3
                className={`text-lg font-bold mb-4 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Photo Gallery
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-5">
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
                  );
                })}
              </div>

              <h4
                className={`text-sm font-semibold mb-3 ${
                  darkMode ? "text-purple-300" : "text-purple-700"
                }`}
              >
                Saved Message Photos
              </h4>
              {galleryUnlocks.length === 0 ? (
                <div
                  className={`rounded-xl border-2 p-4 text-sm ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 text-gray-400"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  No photos received yet. Flirt or sext through Messages to unlock shots.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {galleryUnlocks.map((entry) => (
                    <div
                      key={entry.id}
                      className={`rounded-xl border-2 overflow-hidden ${
                        darkMode
                          ? "border-purple-700 bg-gray-800"
                          : "border-purple-200 bg-white"
                      }`}
                    >
                      <div className="relative h-32">
                        <Image
                          src={entry.imagePath}
                          alt={entry.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-2">
                        <div
                          className={`text-xs font-semibold ${
                            darkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {entry.characterName}
                        </div>
                        <div
                          className={`text-[11px] ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {entry.caption}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              {messageContacts.length === 0 ? (
                <div
                  className={`rounded-xl border-2 p-4 text-sm ${
                    darkMode
                      ? "border-gray-700 bg-gray-800 text-gray-400"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  No contacts available yet.
                </div>
              ) : (
                <div className="space-y-3">
                  <select
                    value={activeMessageContact}
                    onChange={(event) => setActiveMessageContact(event.target.value)}
                    className={`w-full p-3 rounded-xl border-2 text-sm ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  >
                    {messageContacts.map((girl) => (
                      <option key={girl.name} value={girl.name}>
                        {girl.name}
                      </option>
                    ))}
                  </select>

                  <div
                    className={`rounded-xl border-2 p-3 h-64 overflow-y-auto space-y-2 ${
                      darkMode
                        ? "bg-gray-900 border-purple-800"
                        : "bg-gray-50 border-purple-200"
                    }`}
                  >
                    {activeThread.length === 0 ? (
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Start the conversation.
                      </p>
                    ) : (
                      activeThread.map((message) => (
                        <div
                          key={message.id}
                          className={`rounded-lg px-3 py-2 text-sm ${
                            message.sender === "player"
                              ? "bg-purple-600 text-white ml-8"
                              : darkMode
                                ? "bg-gray-700 text-gray-100 mr-8"
                                : "bg-white text-gray-800 border border-gray-200 mr-8"
                          }`}
                        >
                          <div>{message.text}</div>
                          <div className="mt-1 text-[10px] opacity-70">
                            {message.dayOfWeek} {message.hour}:00
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {MESSAGE_ACTION_ORDER.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() =>
                          activeMessageContact &&
                          onSendMessageAction?.(activeMessageContact, action)
                        }
                        className={`rounded-lg py-2 text-sm font-semibold transition ${
                          darkMode
                            ? "bg-purple-700 text-white hover:bg-purple-600"
                            : "bg-purple-500 text-white hover:bg-purple-600"
                        }`}
                      >
                        {action === "date"
                          ? "Ask for Date"
                          : action.charAt(0).toUpperCase() + action.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

          {/* Phone Home Button */}
          <div
            className={`mx-4 mb-4 shrink-0 rounded-2xl border p-3 flex items-center justify-center ${
              darkMode
                ? "border-white/10 bg-black/35"
                : "border-white/60 bg-white/70"
            }`}
          >
            <button
              type="button"
              onClick={pressHomeButton}
              className={`flex h-10 w-24 items-center justify-center rounded-full border transition ${
                darkMode
                  ? "border-white/40 bg-white/10 hover:bg-white/20"
                  : "border-gray-400 bg-gray-100 hover:bg-gray-200"
              }`}
              aria-label={activeTab === "home" ? "Close phone" : "Return to phone home"}
            >
              <span className="h-1.5 w-12 rounded-full bg-current opacity-70" />
            </button>
          </div>
      </div>
      </div>
    </div>
  );
}

