import { Pressable } from "react-native";

import { Text } from "./Text";

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-9 px-4 rounded-full items-center justify-center border ${
        selected
          ? "bg-primary border-primary"
          : "bg-surface border-border"
      }`}
    >
      <Text
        variant="label"
        className={selected ? "text-on-primary" : "text-text-muted"}
      >
        {label}
      </Text>
    </Pressable>
  );
}
