import { View } from "react-native";

import { Screen, Text } from "@/components/ui";

export default function HomeScreen() {
  return (
    <Screen className="px-5">
      <View className="pt-2 pb-4">
        <Text variant="title">Image Magic</Text>
        <Text variant="caption">Pick a look. Make it yours.</Text>
      </View>
    </Screen>
  );
}
