import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { useLook } from "@/api/looks";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Button, EmptyState, IconButton, Screen, Skeleton, Text } from "@/components/ui";

export default function LookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: look, isLoading } = useLook(id);

  return (
    <Screen className="px-5" edges={["top", "left", "right"]}>
      <View className="flex-row items-center justify-between py-2">
        <IconButton
          name="chevron-back"
          variant="surface"
          onPress={() => router.back()}
          accessibilityLabel="Back"
        />
      </View>

      {isLoading ? (
        <Skeleton className="aspect-[3/4] w-full" />
      ) : !look ? (
        <EmptyState icon="alert-circle-outline" title="Look not found" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <BeforeAfter beforeUri={look.beforeImage} afterUri={look.afterImage} />
          <View className="py-4 gap-1">
            <Text variant="title">{look.title}</Text>
            <Text variant="caption">{look.tagline}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="sparkles-outline" size={16} color="#A77BE6" />
            <Text variant="caption">Drag the slider to compare</Text>
          </View>
        </ScrollView>
      )}

      {look ? (
        <View className="py-4">
          <Button
            label="Use this look"
            onPress={() => router.push(`/generate/${look.id}`)}
          />
        </View>
      ) : null}
    </Screen>
  );
}
