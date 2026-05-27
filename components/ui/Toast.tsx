import { View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useToastStore } from "@/store/toastStore";
import { Text } from "./Text";

export function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", left: 0, right: 0, bottom: insets.bottom + 24 }}
      className="items-center px-5 gap-2"
    >
      {toasts.map((t) => (
        <Animated.View
          key={t.id}
          entering={FadeInUp}
          exiting={FadeOutDown}
          className="px-4 py-3 rounded-2xl bg-text"
        >
          <Text variant="label" className="text-background">
            {t.message}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
}
