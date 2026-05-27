import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search looks",
}: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-2 h-12 px-4 rounded-2xl bg-surface border border-border">
      <Ionicons name="search" size={18} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        className="flex-1 font-sans text-[15px] text-text"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}
