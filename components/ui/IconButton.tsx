import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export type IconButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: string;
  variant?: "plain" | "surface";
  accessibilityLabel?: string;
};

export function IconButton({
  name,
  onPress,
  size = 22,
  color,
  variant = "plain",
  accessibilityLabel,
}: IconButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      className={`items-center justify-center ${
        variant === "surface"
          ? "h-11 w-11 rounded-full bg-surface border border-border"
          : ""
      }`}
    >
      <Ionicons name={name} size={size} color={color ?? colors.text} />
    </Pressable>
  );
}
