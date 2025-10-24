import { create } from "zustand";

type UIStore = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;

  // Overlays / modals
  overlay: null | { kind: "pause" | "phone" | "gallery"; data?: unknown };
  setOverlay: (o: UIStore["overlay"]) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  darkMode: true,
  setDarkMode: (v) => set({ darkMode: v }),

  overlay: null,
  setOverlay: (o) => set({ overlay: o }),
}));
