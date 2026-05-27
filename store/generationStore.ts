import { create } from "zustand";

export type GenerationStatus = "idle" | "running" | "done" | "error";

type GenerationState = {
  lookId: string | null;
  inputUri: string | null;
  outputUri: string | null;
  status: GenerationStatus;
  start: (lookId: string, inputUri: string) => void;
  succeed: (outputUri: string) => void;
  fail: () => void;
  reset: () => void;
};

export const useGenerationStore = create<GenerationState>((set) => ({
  lookId: null,
  inputUri: null,
  outputUri: null,
  status: "idle",
  start: (lookId, inputUri) =>
    set({ lookId, inputUri, outputUri: null, status: "running" }),
  succeed: (outputUri) => set({ outputUri, status: "done" }),
  fail: () => set({ status: "error" }),
  reset: () =>
    set({
      lookId: null,
      inputUri: null,
      outputUri: null,
      status: "idle",
    }),
}));
