import { router } from "expo-router";
import { View } from "react-native";

import { Button, Screen, Text } from "@/components/ui";

export default function PaywallScreen() {
  return (
    <Screen className="px-5" edges={["top", "bottom", "left", "right"]}>
      <View className="flex-1 justify-center gap-3">
        <Text variant="title">Go unlimited</Text>
        <Text variant="caption">Unlock more transformations.</Text>
      </View>
      <View className="pb-4">
        <Button label="Maybe later" variant="secondary" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
