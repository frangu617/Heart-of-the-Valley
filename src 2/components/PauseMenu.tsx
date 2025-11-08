interface Props {
  onResume: () => void;
  onSave: () => void;
  onMainMenu: () => void;
}

export default function PauseMenu({ onResume, onSave, onMainMenu }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-purple-300 transform animate-slideUp">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-2">
            ⏸️ Paused
          </h2>
          <p className="text-gray-600">Take a break?</p>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          <button
            onClick={onResume}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>▶️</span>
            <span>Resume</span>
          </button>

          <button
            onClick={onSave}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>💾</span>
            <span>Save Game</span>
          </button>

          <button
            onClick={onMainMenu}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-xl py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            <span>Main Menu</span>
          </button>
        </div>

        {/* Hint */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Press <kbd className="px-2 py-1 bg-gray-200 rounded">ESC</kbd> to
            toggle pause
          </p>
        </div>
      </div>
    </div>
  );
}
