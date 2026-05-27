import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { Text } from "./Text";

export type EmptyStateProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
};

export function EmptyState({
  icon = "search-outline",
  title,
  subtitle,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center px-8 py-16 gap-2">
      <Ionicons name={icon} size={40} color={colors.textMuted} />
      <Text variant="heading" className="text-center">
        {title}
      </Text>
      {subtitle ? (
        <Text variant="caption" className="text-center">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
