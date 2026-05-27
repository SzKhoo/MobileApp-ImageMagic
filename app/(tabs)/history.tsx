import { View } from "react-native";

import { Screen, Text } from "@/components/ui";

export default function HistoryScreen() {
  return (
    <Screen className="px-5">
      <View className="pt-2 pb-4">
        <Text variant="title">History</Text>
      </View>
    </Screen>
  );
}
