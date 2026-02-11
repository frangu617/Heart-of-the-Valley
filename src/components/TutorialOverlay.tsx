import React from "react";

interface Props {
  onClose: () => void;
  isMobile: boolean;
  darkMode: boolean;
}

export default function TutorialOverlay({ onClose, isMobile, darkMode }: Props) {
  return (
    <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-3xl w-full rounded-2xl shadow-2xl p-6 md:p-8 border-2 ${
          darkMode
            ? "bg-gray-800 border-purple-500 text-gray-100"
            : "bg-white border-purple-300 text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Game Guide
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-500/20 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 text-lg">
          {isMobile ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-xl bg-purple-500/10">
                <span className="text-3xl">📱</span>
                <div>
                  <strong className="block text-purple-400">Top Bar</strong>
                  Access your <strong>Phone</strong> (Quests, Messages) and the <strong>Menu</strong>.
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-xl bg-purple-500/10">
                <span className="text-3xl">📍</span>
                <div>
                  <strong className="block text-purple-400">Center Screen</strong>
                  Shows your current <strong>Location</strong> and characters present.
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-xl bg-purple-500/10">
                <span className="text-3xl">⚡</span>
                <div>
                  <strong className="block text-purple-400">Activities</strong>
                  Tap the <strong>Activities</strong> dropdown below the image to interact or train.
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-xl bg-purple-500/10">
                <span className="text-3xl">🗺️</span>
                <div>
                  <strong className="block text-purple-400">Navigation</strong>
                  Tap <strong>Where to go?</strong> below the image to travel.
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-purple-500/10">
                <strong className="block text-purple-400 text-xl mb-2">📊 Left Panel</strong>
                Your <strong>Stats</strong>: Energy, Hunger, and Money. Keep an eye on these!
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10">
                <strong className="block text-purple-400 text-xl mb-2">⚡ Right Panel</strong>
                <strong>Activities</strong> available in this location, or Character details when talking.
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10">
                <strong className="block text-purple-400 text-xl mb-2">📍 Center</strong>
                The current <strong>Location</strong> view. <strong>Navigation</strong> options are directly below the image.
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10">
                <strong className="block text-purple-400 text-xl mb-2">📱 Top Right</strong>
                <strong>Phone</strong> (Quests, Messages) and <strong>Menu</strong>.
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg transform transition hover:scale-105"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}