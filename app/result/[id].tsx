import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

import { ActionButton } from "@/components/ActionButton";
import { BeforeAfter } from "@/components/BeforeAfter";
import { EmptyState, IconButton, Screen, Text } from "@/components/ui";
import { saveToLibrary, shareImage } from "@/lib/save";
import { useGenerationStore } from "@/store/generationStore";
import { toast } from "@/store/toastStore";

export default function ResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const inputUri = useGenerationStore((s) => s.inputUri);
  const outputUri = useGenerationStore((s) => s.outputUri);
  const reset = useGenerationStore((s) => s.reset);

  const goHome = () => {
    reset();
    router.dismissAll();
    router.replace("/");
  };

  const onSave = async () => {
    if (!outputUri) return;
    try {
      const ok = await saveToLibrary(outputUri);
      toast(ok ? "Saved to your library" : "Photo permission needed");
    } catch {
      toast("Couldn't save image");
    }
  };

  const onShare = async () => {
    if (!outputUri) return;
    try {
      await shareImage(outputUri);
    } catch {
      toast("Couldn't open share sheet");
    }
  };

  if (!inputUri || !outputUri) {
    return (
      <Screen className="px-5">
        <View className="flex-row py-2">
          <IconButton name="close" variant="surface" onPress={goHome} accessibilityLabel="Close" />
        </View>
        <EmptyState
          icon="image-outline"
          title="Nothing to show"
          subtitle="Start a new transformation from a look."
        />
      </Screen>
    );
  }

  return (
    <Screen className="px-5" edges={["top", "left", "right"]}>
      <View className="flex-row items-center justify-between py-2">
        <IconButton name="close" variant="surface" onPress={goHome} accessibilityLabel="Close" />
        <Text variant="heading">Your result</Text>
        <View className="w-11" />
      </View>

      <View className="flex-1 justify-center">
        <BeforeAfter beforeUri={inputUri} afterUri={outputUri} autoReveal />
      </View>

      <View className="flex-row gap-2 py-5">
        <ActionButton icon="download-outline" label="Save" onPress={onSave} />
        <ActionButton icon="share-outline" label="Share" onPress={onShare} />
        <ActionButton
          icon="refresh-outline"
          label="Redo"
          onPress={() => router.replace(`/generate/${id}`)}
        />
        <ActionButton icon="grid-outline" label="More looks" onPress={goHome} />
      </View>
    </Screen>
  );
}
