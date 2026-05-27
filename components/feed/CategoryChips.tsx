import { ScrollView } from "react-native";

import { Chip } from "@/components/ui";
import type { Category } from "@/lib/mock/types";

export type CategoryChipsProps = {
  categories: Category[];
  selected: string;
  onSelect: (slug: string) => void;
};

export function CategoryChips({
  categories,
  selected,
  onSelect,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
    >
      {categories.map((c) => (
        <Chip
          key={c.slug}
          label={c.label}
          selected={c.slug === selected}
          onPress={() => onSelect(c.slug)}
        />
      ))}
    </ScrollView>
  );
}
