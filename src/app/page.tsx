// src/app/page.tsx
"use client";

import GameRoot from "./game/GameRoot";
import ErrorBoundary from "@/components/ErrorBoundary";

/**
 * Entry point for Heart of the Valley (refactor branch).
 * Renders the scene router (Menu, Dialogue, Exploration) via GameRoot.
 * All game/UI state comes from Zustand stores under src/state/*.
 */
export default function Page() {
  return (
    <ErrorBoundary>
      <GameRoot />
    </ErrorBoundary>
  );
}
