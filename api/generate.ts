import type { Look } from "@/lib/mock/types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Mock generation. Swapped for a real provider call (via an Edge Function)
// in Phase 2 behind this same interface.
export async function generate(look: Look, inputUri: string): Promise<string> {
  await delay(2200);
  // Mock result: the look's curated "after" example stands in for the output.
  void inputUri;
  return look.afterImage;
}
