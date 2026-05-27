import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const FREE_LIMIT = 10;

type QuotaState = {
  used: number;
  limit: number;
  isPro: boolean;
  remaining: () => number;
  canGenerate: () => boolean;
  consume: () => void;
  setPro: (isPro: boolean) => void;
};

export const useQuotaStore = create<QuotaState>()(
  persist(
    (set, get) => ({
      used: 0,
      limit: FREE_LIMIT,
      isPro: false,
      remaining: () => Math.max(0, get().limit - get().used),
      canGenerate: () => get().isPro || get().used < get().limit,
      consume: () => {
        if (get().isPro) return;
        set((s) => ({ used: s.used + 1 }));
      },
      setPro: (isPro) => set({ isPro }),
    }),
    {
      name: "image-magic-quota",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ used: s.used, limit: s.limit, isPro: s.isPro }),
    },
  ),
);
