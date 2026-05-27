import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { generate } from "@/api/generate";
import { useLook } from "@/api/looks";
import { GenerationProgress } from "@/components/GenerationProgress";
import { ImageDropzone } from "@/components/ImageDropzone";
import { QuotaPill } from "@/components/QuotaPill";
import { Button, EmptyState, IconButton, Screen, Skeleton, Text } from "@/components/ui";
import { useGenerationStore } from "@/store/generationStore";
import { useHistoryStore } from "@/store/historyStore";
import { useQuotaStore } from "@/store/quotaStore";

export default function GenerateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: look, isLoading } = useLook(id);
  const [inputUri, setInputUri] = useState<string | null>(null);
  const status = useGenerationStore((s) => s.status);
  const startGen = useGenerationStore((s) => s.start);
  const succeed = useGenerationStore((s) => s.succeed);
  const fail = useGenerationStore((s) => s.fail);
  const addHistory = useHistoryStore((s) => s.add);
  const canGenerate = useQuotaStore((s) => s.canGenerate);
  const consume = useQuotaStore((s) => s.consume);

  const isRunning = status === "running";

  const onGenerate = async () => {
    if (!look || !inputUri) return;
    if (!canGenerate()) {
      router.push("/paywall");
      return;
    }
    startGen(look.id, inputUri);
    try {
      const outputUri = await generate(look, inputUri);
      consume();
      succeed(outputUri);
      addHistory({
        lookId: look.id,
        lookTitle: look.title,
        inputUri,
        outputUri,
      });
      router.replace(`/result/${look.id}`);
    } catch {
      fail();
    }
  };

  return (
    <Screen className="px-5" edges={["top", "left", "right"]}>
      <View className="flex-row items-center justify-between py-2">
        <IconButton
          name="chevron-back"
          variant="surface"
          onPress={() => router.back()}
          accessibilityLabel="Back"
        />
        <QuotaPill />
      </View>

      {isLoading ? (
        <Skeleton className="aspect-[3/4] w-full" />
      ) : !look ? (
        <EmptyState icon="alert-circle-outline" title="Look not found" />
      ) : isRunning ? (
        <View className="flex-1 justify-center">
          <GenerationProgress />
        </View>
      ) : (
        <View className="flex-1">
          <View className="pb-4 gap-1">
            <Text variant="title">{look.title}</Text>
            <Text variant="caption">Add a photo to transform</Text>
          </View>
          <ImageDropzone uri={inputUri} onPick={setInputUri} />
        </View>
      )}

      {look && !isRunning ? (
        <View className="py-4">
          <Button
            label={inputUri ? "Generate" : "Add a photo first"}
            disabled={!inputUri}
            onPress={onGenerate}
          />
        </View>
      ) : null}
    </Screen>
  );
}
