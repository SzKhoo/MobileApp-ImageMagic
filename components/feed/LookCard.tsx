import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import type { Look } from "@/lib/mock/types";

export type LookCardProps = {
  look: Look;
  onPress: () => void;
};

export function LookCard({ look, onPress }: LookCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-2xl overflow-hidden bg-surface border border-border"
    >
      <View className="aspect-[3/4] w-full">
        <Image
          source={look.afterImage}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={200}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.65)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "55%",
          }}
        />
        <View className="absolute bottom-0 left-0 right-0 p-3">
          <Text variant="heading" className="text-white" numberOfLines={1}>
            {look.title}
          </Text>
          <Text
            variant="caption"
            className="text-white/80"
            numberOfLines={1}
          >
            {look.tagline}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
