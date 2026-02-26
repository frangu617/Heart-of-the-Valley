import { FormEvent, useState } from "react";
import Image from "@/components/FallbackImage";

interface Props {
  onLogin: (username: string, password: string) => boolean;
  communicationEmail: string;
  darkMode?: boolean;
}

export default function LoginScreen({
  onLogin,
  communicationEmail,
  darkMode = true,
}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ok = onLogin(username.trim(), password);
    if (!ok) {
      setError("Invalid username or password.");
      return;
    }

    setError("");
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
          <Image
            src="/images/logo.png"
            alt="Heart of the Valley"
            width={128}
            height={128}
            className="h-32 w-32 mx-auto"
          />
          <p
            className={`text-xl mt-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Login Required
          </p>
          
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            autoComplete="username"
            className={`w-full text-lg py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
              darkMode
                ? "bg-gray-700 border-purple-700 text-gray-200 placeholder-gray-500 focus:border-purple-500"
                : "bg-white border-purple-300 text-gray-800 placeholder-gray-400 focus:border-purple-500"
            } outline-none`}
            required
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className={`w-full text-lg py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
              darkMode
                ? "bg-gray-700 border-purple-700 text-gray-200 placeholder-gray-500 focus:border-purple-500"
                : "bg-white border-purple-300 text-gray-800 placeholder-gray-400 focus:border-purple-500"
            } outline-none`}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xl py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl"
          >
            Sign In
          </button>
        </form>

        
      </div>
    </div>
  );
}
