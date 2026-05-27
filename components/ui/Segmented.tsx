import { Pressable, View } from "react-native";

import { Text } from "./Text";

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: SegmentedProps<T>) {
  return (
    <View className="flex-row p-1 rounded-2xl bg-surface-muted border border-border">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`flex-1 h-9 items-center justify-center rounded-xl ${
              selected ? "bg-surface" : ""
            }`}
          >
            <Text
              variant="label"
              className={selected ? "text-text" : "text-text-muted"}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
