"use client";
import React from "react";

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: unknown };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }
  componentDidCatch(error: unknown, info: unknown) {
    console.error("UI Error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
          <p className="opacity-80 mb-4">
            You can reload or return to the main menu.
          </p>
          <button
            className="rounded bg-white/10 px-3 py-2 mr-2"
            onClick={() => location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
