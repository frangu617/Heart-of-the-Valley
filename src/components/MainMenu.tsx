import Image from "next/image";

interface Props {
  onNewGame: () => void;
  onContinue: () => void;
  hasSaveData: boolean;
  darkMode?: boolean;
}

export default function MainMenu({
  onNewGame,
  onContinue,
  hasSaveData,
  darkMode = true,
}: Props) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200"
      }`}
    >
      <div
        className={`backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border-4 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800/90 border-purple-700"
            : "bg-white/90 border-purple-300"
        }`}
      >
        {/* Title */}
        <div className="text-center mb-12">
          {/* <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-pulse">
            💖 Heart of the Valley
          </h1> */}
          <Image width={400} height={400} src="/images/logo.png" alt="Heart of the Valley" className="mx-auto" />
          <p
            className={`text-xl italic ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Your romantic adventure awaits...
          </p>
        </div>

        {/* Menu Options */}
        <div className="space-y-4">
          <button
            onClick={onNewGame}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-2xl py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl"
          >
            ✨ New Game
          </button>

          {hasSaveData && (
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-2xl py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              📂 Continue
            </button>
          )}

          {!hasSaveData && (
            <div
              className={`text-center italic py-4 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              No saved game found
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div
          className={`mt-12 text-center text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p>Build relationships • Make choices • Find love</p>
        </div>
      </div>
    </div>
  );
}
