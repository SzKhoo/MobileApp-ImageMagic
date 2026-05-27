import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme } from "nativewind";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "system" | "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
  hydrated: boolean;
  setMode: (mode: ThemeMode) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "system",
      hydrated: false,
      setMode: (mode) => {
        colorScheme.set(mode);
        set({ mode });
      },
    }),
    {
      name: "image-magic-theme",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        colorScheme.set(state?.mode ?? "system");
        useThemeStore.setState({ hydrated: true });
      },
    },
  ),
);
