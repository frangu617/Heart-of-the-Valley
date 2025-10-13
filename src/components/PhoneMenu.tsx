import { useState } from "react";
import { PlayerStats } from "../data/characters";
import { Girl } from "../data/characters";


interface Props {
  player: PlayerStats;
  hour: number;
  girls: Girl[];
  darkMode?: boolean;
  onClose: () => void;
  onSave?: () => void;
  isMobile?: boolean;
}

type PhoneTab = "stats" | "contacts" | "gallery" | "messages";

export default function PhoneMenu({
  player,
  hour,
  girls,
  darkMode = false,
  onClose,
  onSave,
  isMobile = false,
}: Props) {
  const [activeTab, setActiveTab] = useState<PhoneTab>("stats");

  const getTimeOfDay = () => {
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };

  const getStatColor = (value: number, max: number = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const StatBar = ({
    label,
    value,
    icon,
    max = 100,
  }: {
    label: string;
    value: number;
    icon: string;
    max?: number;
  }) => (
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      {/* Phone Frame */}
      <div
        className={`
        ${isMobile ? "w-full h-full" : "w-96 h-[700px]"}
        ${darkMode ? "bg-gray-900" : "bg-white"}
        rounded-3xl shadow-2xl overflow-hidden flex flex-col
        ${!isMobile && "border-8 border-gray-800"}
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
              {dayOfWeek || "Monday"} - {hour}:00 {getTimeOfDay()}
            </p>
          </div>
          <button
            onClick={onClose}
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

              <StatBar label="Energy" value={player.energy} icon="⚡" />
              <StatBar label="Mood" value={player.mood} icon="😊" />
              <StatBar label="Hunger" value={player.hunger} icon="🍔" />
              <StatBar
                label="Fitness"
                value={player.fitness}
                icon="🏋️"
                max={50}
              />
              <StatBar
                label="Intelligence"
                value={player.intelligence}
                icon="🧠"
                max={50}
              />
              <StatBar label="Style" value={player.style} icon="💅" max={50} />

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
              {girls.map((girl) => (
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
                      className={`w-12 h-12 rounded-full ${
                        darkMode ? "bg-purple-700" : "bg-purple-300"
                      } flex items-center justify-center text-2xl`}
                    >
                      {girl.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-bold ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {girl.name}
                      </h4>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {girl.personality}
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
                        {girl.stats.affection}
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
                        {girl.stats.lust}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between px-2 py-1 rounded ${
                        darkMode ? "bg-blue-900/50" : "bg-blue-100"
                      }`}
                    >
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        🤝 Trust
                      </span>
                      <span
                        className={`font-bold ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {girl.stats.trust}
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
                        {girl.stats.love}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-2 text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    📍 Currently at:{" "}
                    <span className="font-semibold">{girl.location}</span>
                  </div>
                </div>
              ))}
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
                {girls.map((girl) => (
                  <div key={girl.name} className="relative group">
                    <div
                      className={`
                      aspect-square rounded-xl overflow-hidden border-2
                      ${darkMode ? "border-purple-700" : "border-purple-300"}
                    `}
                    >
                      <img
                        src={`/images/${girl.name.toLowerCase()}.png`}
                        alt={girl.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23e879f9" width="200" height="200"/><text x="50%" y="50%" font-size="60" text-anchor="middle" dy=".3em" fill="white">?</text></svg>';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p
                      className={`text-center text-sm font-semibold mt-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {girl.name}
                    </p>
                  </div>
                ))}
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
              flex-1 py-3 px-2 rounded-lg transition-all
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
            <div className="text-2xl">📊</div>
            <div className="text-xs">Stats</div>
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`
              flex-1 py-3 px-2 rounded-lg transition-all
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
            <div className="text-2xl">👥</div>
            <div className="text-xs">Contacts</div>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`
              flex-1 py-3 px-2 rounded-lg transition-all
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
            <div className="text-2xl">📷</div>
            <div className="text-xs">Gallery</div>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`
              flex-1 py-3 px-2 rounded-lg transition-all
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
            <div className="text-2xl">💬</div>
            <div className="text-xs">Messages</div>
          </button>
        </div>
      </div>
    </div>
  );
}
