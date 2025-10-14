import { Girl, GirlStats } from "../data/characters";
import { PlayerStats } from "../data/characters";
import { Interaction, interactionMenu } from "../data/interactions";
import { Dispatch, SetStateAction } from "react";
import {
  characterDialogues,
  getDefaultDialogue,
  Dialogue,
} from "../data/dialogues/index";

interface Props {
  girl: Girl;
  location: string;
  player: PlayerStats;
  setPlayer: Dispatch<SetStateAction<PlayerStats>>;
  spendTime: (amount: number) => void;
  onClose: () => void;
  onStartDialogue: (
    dialogue: Dialogue,
    characterImage: string,
    girlEffects?: Partial<GirlStats>
  ) => void;
}

export default function CharacterOverlay({
  girl,
  location,
  player,
  setPlayer,
  spendTime,
  onClose,
  onStartDialogue,
}: Props) {
  const interact = (action: Interaction) => {
    // Check requirements
    if (
      action.requiresItem &&
      !player.inventory.includes(action.requiresItem)
    ) {
      alert(`You need a ${action.requiresItem} for this action!`);
      return;
    }

    if (action.locationContext && action.locationContext !== location) {
      alert(`This action can only be done at ${action.locationContext}`);
      return;
    }

    // Check affection requirements for intimate actions
    if (action.label === "Hug") {
      if (girl.stats.affection < 20) {
        alert(`${girl.name} doesn't seem comfortable with that right now...`);
        // Apply negative effect
        const updatedStats = { ...player };
        updatedStats.mood = Math.max(0, updatedStats.mood - 10);
        setPlayer(updatedStats);
        return;
      }
    }

    if (action.label === "Kiss") {
      if (girl.stats.affection < 40 || girl.stats.mood < 50) {
        alert(`${girl.name} pulls away. The timing doesn't seem right...`);
        const updatedStats = { ...player };
        updatedStats.mood = Math.max(0, updatedStats.mood - 15);
        setPlayer(updatedStats);
        return;
      }
    }

    // Check mood requirements for positive interactions
    if (
      girl.stats.mood < 30 &&
      (action.label === "Hug" || action.label === "Kiss")
    ) {
      alert(`${girl.name} doesn't seem in the mood for that right now...`);
      return;
    }

    // Apply stat effects
    const updatedStats = { ...player };
    Object.entries(action.statEffects || {}).forEach(([key, value]) => {
      const statKey = key as keyof PlayerStats;
      if (statKey !== "inventory" && typeof value === "number") {
        (updatedStats[statKey] as number) += value;
      }
    });
    setPlayer(updatedStats);
    spendTime(action.timeCost);

    // Get dialogue for this interaction
    const dialogue =
      characterDialogues[girl.name]?.[action.label] ||
      getDefaultDialogue(girl.name, action.label);
    const characterImage = `/images/characters${girl.name.toLowerCase()}/faces/${getFacialExpression()}.png`;

    // Show what stats will change
    if (action.girlEffects) {
      const changes = Object.entries(action.girlEffects)
        .filter(([_, value]) => value !== 0)
        .map(([key, value]) => {
          const emoji =
            key === "affection"
              ? "💕"
              : key === "lust"
              ? "🔥"
              : key === "trust"
              ? "🤝"
              : key === "mood"
              ? "😊"
              : "💖";
          return `${emoji} ${value > 0 ? "+" : ""}${value}`;
        })
        .join(", ");

      console.log(`✨ ${action.label} with ${girl.name}: ${changes}`);
    }

    onStartDialogue(dialogue, characterImage, action.girlEffects);
  };

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

  // Get facial expression based on relationship stats
  const getFacialExpression = () => {
    const { affection, mood, love } = girl.stats;
    const totalPositive = affection + love;

    // You can place different facial expression images like:
    // /images/faces/{charactername}_happy.png
    // /images/faces/{charactername}_neutral.png
    // /images/faces/{charactername}_sad.png
    // /images/faces/{charactername}_love.png
    // /images/faces/{charactername}_angry.png

    if (love >= 50 || totalPositive >= 80) return "love";
    if (affection >= 40 && mood >= 60) return "happy";
    if (mood < 30) return "sad";
    if (affection < 10) return "neutral";
    return "neutral";
  };

  const expression = getFacialExpression();

  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-xl p-6 border-4 border-purple-200 sticky top-4 animate-slideUp">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all z-10 shadow-lg"
      >
        ✕
      </button>

      {/* Character Face Portrait */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative group mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
          <img
            src={`/images/characters/${girl.name.toLowerCase()}/faces/${expression}.png`}
            alt={`${girl.name} - ${expression}`}
            onError={(e) => {
              // Fallback to neutral if expression image doesn't exist
              e.currentTarget.src = `neutral.png`;
              e.currentTarget.onerror = () => {
                // Final fallback if no face images exist
                e.currentTarget.src =
                  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><circle cx="100" cy="100" r="100" fill="%23e879f9"/><circle cx="70" cy="80" r="10" fill="white"/><circle cx="130" cy="80" r="10" fill="white"/><path d="M 60 130 Q 100 150 140 130" stroke="white" stroke-width="5" fill="none"/></svg>';
              };
            }}
            className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
          />
        </div>

        <h3 className="text-2xl font-bold text-purple-800 mb-1">{girl.name}</h3>
        <p className="text-gray-600 italic mb-2 text-sm">
          &quot;{girl.personality}&quot;
        </p>

        <div className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold text-xs shadow-lg">
          {girl.relationship}
        </div>
      </div>

      {/* Character Stats */}
      <div className="bg-white rounded-xl p-4 mb-4 space-y-2 shadow-md">
        <h4 className="font-bold text-purple-700 text-center mb-2 text-sm">
          Relationship
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between items-center px-2 py-1 bg-pink-50 rounded">
            <span className="font-semibold text-gray-700">💕 Affection</span>
            <span className="font-bold text-pink-600">
              {girl.stats.affection}
            </span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-red-50 rounded">
            <span className="font-semibold text-gray-700">🔥 Lust</span>
            <span className="font-bold text-red-600">{girl.stats.lust}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-yellow-50 rounded">
            <span className="font-semibold text-gray-700">😊 Mood</span>
            <span className="font-bold text-yellow-600">{girl.stats.mood}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-blue-50 rounded">
            <span className="font-semibold text-gray-700">🤝 Trust</span>
            <span className="font-bold text-blue-600">{girl.stats.trust}</span>
          </div>
          <div className="flex justify-between items-center px-2 py-1 bg-purple-50 rounded col-span-2">
            <span className="font-semibold text-gray-700">💖 Love</span>
            <span className="font-bold text-purple-600">{girl.stats.love}</span>
          </div>
        </div>
      </div>

      {/* Interaction Menu */}
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-purple-800 mb-3 text-center">
          💝 Actions
        </h4>

        {interactionMenu.map((action) => {
          const isDisabled = Boolean(
            (action.requiresItem &&
              !player.inventory.includes(action.requiresItem)) ||
              (action.locationContext && action.locationContext !== location)
          );

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
                <span className="text-xs opacity-75">{action.timeCost}h</span>
              </div>

              {!isDisabled && (
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tip */}
      <div className="mt-4 bg-white rounded-lg p-3 border-2 border-purple-200 shadow">
        <p className="text-xs text-gray-600 text-center">
          <span className="font-semibold text-purple-600">💡</span> Different
          actions affect {girl.name}&apos;s feelings toward you!
        </p>
      </div>
    </div>
  );
}
