import { Location } from "../data/locations";
import { Girl } from "../data/characters";

interface Props {
  location: Location;
  onMove: (name: string) => void;
  girls: Girl[];
  darkMode?: boolean;
}

export default function LocationCard({
  location,
  onMove,
  girls,
  darkMode = false,
}: Props) {
  // Find which girls are at this location
  const girlsHere = girls.filter((girl) => girl.location === location.name);

  return (
    <div
      className={`group rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-purple-500"
          : "bg-white border-gray-200 hover:border-purple-400"
      }`}
    >
      <div
        className={`relative h-32 overflow-hidden ${
          darkMode
            ? "bg-gradient-to-b from-gray-700 to-gray-800"
            : "bg-gradient-to-b from-gray-100 to-white"
        }`}
      >
        <img
          src={`/images/locations/${location.name
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/'/g, "")}/afternoon.png`}
          alt={location.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {(location.cost > 0 || location.time > 0) && (
          <div className="absolute top-2 right-2 flex gap-1">
            {location.cost > 0 && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                ${location.cost}
              </span>
            )}
            {location.time > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                {location.time}h
              </span>
            )}
          </div>
        )}

        {/* Character indicators */}
        {girlsHere.length > 0 && (
          <div className="absolute top-2 left-2">
            <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg flex items-center gap-1 animate-pulse">
              <span>👥</span>
              <span>{girlsHere.length}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className={`font-bold mb-2 text-center ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {location.name}
        </h3>

        {/* Show who's there */}
        {girlsHere.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1 justify-center">
            {girlsHere.map((girl) => (
              <span
                key={girl.name}
                className={`text-xs px-2 py-1 rounded-full border ${
                  darkMode
                    ? "bg-pink-900/50 text-pink-300 border-pink-700"
                    : "bg-pink-100 text-pink-700 border-pink-300"
                }`}
              >
                {girl.name}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => onMove(location.name)}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          Go →
        </button>
      </div>
    </div>
  );
}
