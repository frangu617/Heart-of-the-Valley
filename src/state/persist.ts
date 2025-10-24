import { persist, createJSONStorage } from "zustand/middleware";

export const SAVE_VERSION = 3;

export function withPersist<T extends object>(key: string, initial: T) {
  return persist<T>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get, _api) => initial,
    {
      name: key,
      version: SAVE_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: (data: any, fromVersion: number) => {
        let d = data?.state ?? data; // zustand stores state under .state
        if (!d) return data;

        // Example migrations (adjust to your fields):
        if (fromVersion < 2) {
          d.flags = d.flags ?? {};
        }
        if (fromVersion < 3) {
          if (d.player && d.player.energy == null) d.player.energy = 100;
        }
        return { ...data, state: d };
      },
      partialize: (state) => state, // customize if you want to exclude volatile UI
    }
  );
}
