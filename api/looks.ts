import { useQuery } from "@tanstack/react-query";

import { CATEGORIES, LOOKS } from "@/lib/mock/looks";
import type { Category, Look } from "@/lib/mock/types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useCategories(): Category[] {
  return CATEGORIES;
}

export type LooksFilter = {
  categorySlug?: string;
  query?: string;
};

async function fetchLooks({ categorySlug, query }: LooksFilter): Promise<Look[]> {
  await delay(500);
  let looks = LOOKS;
  if (categorySlug && categorySlug !== "all") {
    looks = looks.filter((l) => l.categorySlug === categorySlug);
  }
  if (query?.trim()) {
    const q = query.trim().toLowerCase();
    looks = looks.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.tagline.toLowerCase().includes(q),
    );
  }
  return looks;
}

export function useLooks(filter: LooksFilter) {
  return useQuery({
    queryKey: ["looks", filter.categorySlug ?? "all", filter.query ?? ""],
    queryFn: () => fetchLooks(filter),
  });
}

async function fetchLook(id: string): Promise<Look | undefined> {
  await delay(200);
  return LOOKS.find((l) => l.id === id);
}

export function useLook(id: string) {
  return useQuery({
    queryKey: ["look", id],
    queryFn: () => fetchLook(id),
    enabled: !!id,
  });
}
