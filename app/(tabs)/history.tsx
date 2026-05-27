import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, Pressable, View } from "react-native";

import { EmptyState, Screen, Text } from "@/components/ui";
import { useGenerationStore } from "@/store/generationStore";
import { useHistoryStore, type HistoryItem } from "@/store/historyStore";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function HistoryScreen() {
  const router = useRouter();
  const items = useHistoryStore((s) => s.items);
  const restore = useGenerationStore((s) => s.start);
  const succeed = useGenerationStore((s) => s.succeed);

  const open = (item: HistoryItem) => {
    restore(item.lookId, item.inputUri);
    succeed(item.outputUri);
    router.push(`/result/${item.lookId}`);
  };

  return (
    <Screen>
      <View className="px-5 pt-2 pb-4">
        <Text variant="title">History</Text>
        <Text variant="caption">Your past transformations</Text>
      </View>

      <FlatList<HistoryItem>
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => open(item)}
            className="flex-row items-center gap-3 p-3 rounded-2xl bg-surface border border-border"
          >
            <Image
              source={item.outputUri}
              style={{ width: 56, height: 56, borderRadius: 12 }}
              contentFit="cover"
            />
            <View className="flex-1">
              <Text variant="heading" numberOfLines={1}>
                {item.lookTitle}
              </Text>
              <Text variant="caption">{timeAgo(item.createdAt)}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="time-outline"
            title="No history yet"
            subtitle="Your transformations will show up here."
          />
        }
      />
    </Screen>
  );
}
