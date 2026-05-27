import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type HistoryItem = {
  id: string;
  lookId: string;
  lookTitle: string;
  inputUri: string;
  outputUri: string;
  createdAt: number;
};

type HistoryState = {
  items: HistoryItem[];
  add: (item: Omit<HistoryItem, "id" | "createdAt">) => HistoryItem;
  clear: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) => {
        const entry: HistoryItem = {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: Date.now(),
        };
        set((s) => ({ items: [entry, ...s.items] }));
        return entry;
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "image-magic-history",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
