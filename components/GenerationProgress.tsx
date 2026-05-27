import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/ui";
import { gradients } from "@/theme/tokens";
import { LinearGradient } from "expo-linear-gradient";

export function GenerationProgress() {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(1, { duration: 1100, easing: Easing.linear }),
      -1,
    );
  }, [rotate]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 360}deg` }],
  }));

  return (
    <View className="items-center justify-center gap-4 py-8">
      <Animated.View style={spinStyle}>
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="h-12 w-12 rounded-full bg-background" />
        </LinearGradient>
      </Animated.View>
      <View className="items-center gap-1">
        <Text variant="heading">Creating your magic…</Text>
        <Text variant="caption">This usually takes a few seconds</Text>
      </View>
    </View>
  );
}
