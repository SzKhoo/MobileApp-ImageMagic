import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

export type ActionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export function ActionButton({ icon, label, onPress }: ActionButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} className="items-center gap-1.5 flex-1">
      <View className="h-12 w-12 rounded-full bg-surface border border-border items-center justify-center">
        <Ionicons name={icon} size={20} color={colors.text} />
      </View>
      <Text variant="label" className="text-text">
        {label}
      </Text>
    </Pressable>
  );
}
