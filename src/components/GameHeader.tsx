import Image from "next/image";

type Props = {
  darkMode: boolean;
  isMobile: boolean;
  onShowTutorial: () => void;
  onShowPhone: () => void;
  onOpenMenu: () => void;
};

export default function GameHeader({
  darkMode,
  isMobile,
  onShowTutorial,
  onShowPhone,
  onOpenMenu,
}: Props) {
  return (
    <header
      className={`${
        darkMode
          ? "bg-gradient-to-r from-purple-900 to-pink-900"
          : "bg-gradient-to-r from-pink-500 to-purple-600"
      } text-white py-4 md:py-6 shadow-lg transition-colors duration-300`}
    >
      {isMobile ? (
        <div className="container mx-auto px-4 flex justify-center items-center">
          <span className="sr-only">Heart of the Valley</span>
          <div className="flex gap-2 md:gap-3 items-center">
            <button
              type="button"
              onClick={onShowTutorial}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center"
              aria-label="Help"
              title="Help"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onShowPhone}
              className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
                isMobile ? "animate-pulse" : ""
              }`}
              aria-label="Open phone"
              title="Open phone"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                <path d="M11 18h2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onOpenMenu}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center"
              aria-label="Open menu"
              title="Open menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            <span className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Heart of the Valley"
                width={50}
                height={50}
              />
              Heart of the Valley
            </span>
          </h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={onShowTutorial}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
              title="Help"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="hidden sm:inline">Help</span>
            </button>
            <button
              onClick={onShowPhone}
              className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                isMobile ? "animate-pulse" : ""
              }`}
              title="Open phone"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                <path d="M11 18h2" />
              </svg>
              <span className="hidden sm:inline">Phone</span>
            </button>
            <button
              onClick={onOpenMenu}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
              <span className="hidden md:inline">Menu</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
