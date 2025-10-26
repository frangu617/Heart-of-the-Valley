import { useState } from "react";
interface Props {
  onNameSubmit: (name: string) => void;
  darkMode?: boolean;
}

export default function NameInput({ onNameSubmit, darkMode = false }: Props) {
  const [name, setName] = useState("Frank");

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed.length > 0) {
      onNameSubmit(trimmed);
    }
  };

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
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            💖 Heart of the Valley
          </h1>
          <p
            className={`text-xl mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            What's your name?
          </p>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter your name..."
            maxLength={20}
            className={`w-full text-2xl text-center py-4 px-6 rounded-xl border-4 font-semibold transition-all ${
              darkMode
                ? "bg-gray-700 border-purple-700 text-gray-200 placeholder-gray-500 focus:border-purple-500"
                : "bg-white border-purple-300 text-gray-800 placeholder-gray-400 focus:border-purple-500"
            } outline-none`}
            autoFocus
          />

          <button
            onClick={handleSubmit}
            disabled={name.trim().length === 0}
            className={`w-full font-bold text-2xl py-6 px-8 rounded-2xl transition-all duration-300 transform shadow-xl ${
              name.trim().length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 hover:shadow-2xl"
            } text-white`}
          >
            ✨ Begin Your Journey
          </button>
        </div>

        <div
          className={`mt-8 text-center text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p>You can change this later in settings</p>
        </div>
      </div>
    </div>
  );
}
