import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { useCategories, useLooks } from "@/api/looks";
import { CategoryChips } from "@/components/feed/CategoryChips";
import { LookCard } from "@/components/feed/LookCard";
import { EmptyState, Screen, SearchBar, Skeleton, Text } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import type { Look } from "@/lib/mock/types";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const categories = useCategories();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const { data, isLoading, refetch, isRefetching } = useLooks({
    categorySlug: category,
    query,
  });

  const header = (
    <View className="gap-4 pb-4">
      <View className="px-5 pt-2 gap-3">
        <View>
          <Text variant="title">Image Magic</Text>
          <Text variant="caption">Pick a look. Make it yours.</Text>
        </View>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>
      <CategoryChips
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />
    </View>
  );

  if (isLoading) {
    return (
      <Screen>
        {header}
        <View className="flex-row flex-wrap px-5 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-[47%]" />
          ))}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList<Look>
        data={data ?? []}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={header}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => (
          <LookCard
            look={item}
            onPress={() => router.push(`/look/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No looks found"
            subtitle="Try a different category or search."
          />
        }
      />
    </Screen>
  );
}
