import { Image } from "expo-image";
import { useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/ui";

export type BeforeAfterProps = {
  beforeUri: string;
  afterUri: string;
  // Animate an automatic reveal on first layout (the "magic moment").
  autoReveal?: boolean;
  className?: string;
};

export function BeforeAfter({
  beforeUri,
  afterUri,
  autoReveal = false,
  className,
}: BeforeAfterProps) {
  const [width, setWidth] = useState(0);
  const widthSv = useSharedValue(0);
  const reveal = useSharedValue(autoReveal ? 0 : 0.5);

  const pan = Gesture.Pan().onUpdate((e) => {
    const w = widthSv.value;
    if (w <= 0) return;
    const ratio = Math.min(1, Math.max(0, e.x / w));
    reveal.value = ratio;
  });

  const afterStyle = useAnimatedStyle(() => ({
    width: reveal.value * widthSv.value,
  }));
  const handleStyle = useAnimatedStyle(() => ({
    left: reveal.value * widthSv.value,
  }));

  return (
    <View
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        setWidth(w);
        widthSv.value = w;
        if (autoReveal) {
          reveal.value = withTiming(0.5, { duration: 900 });
        }
      }}
      className={`w-full aspect-[3/4] rounded-2xl overflow-hidden bg-surface-muted ${className ?? ""}`}
    >
      <Image
        source={beforeUri}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />
      <Animated.View
        style={[
          { position: "absolute", top: 0, bottom: 0, left: 0, overflow: "hidden" },
          afterStyle,
        ]}
      >
        {width > 0 ? (
          <Image
            source={afterUri}
            style={{ width, height: "100%" }}
            contentFit="cover"
          />
        ) : null}
      </Animated.View>

      <View className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/50">
        <Text variant="label" className="text-white">
          Before
        </Text>
      </View>
      <View className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50">
        <Text variant="label" className="text-white">
          After
        </Text>
      </View>

      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            { position: "absolute", top: 0, bottom: 0, width: 40, marginLeft: -20 },
            handleStyle,
          ]}
        >
          <View className="flex-1 items-center justify-center">
            <View className="w-1 flex-1 bg-white/90" />
            <View className="absolute h-9 w-9 rounded-full bg-white items-center justify-center shadow">
              <View className="h-3 w-3 rounded-full bg-primary" />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
