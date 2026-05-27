import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import { useQuotaStore } from "@/store/quotaStore";

export function QuotaPill() {
  const { colors } = useTheme();
  const isPro = useQuotaStore((s) => s.isPro);
  const used = useQuotaStore((s) => s.used);
  const limit = useQuotaStore((s) => s.limit);
  const remaining = Math.max(0, limit - used);

  return (
    <View className="flex-row items-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-surface border border-border">
      <Ionicons
        name={isPro ? "infinite" : "flash-outline"}
        size={14}
        color={colors.primary}
      />
      <Text variant="label" className="text-text">
        {isPro ? "Unlimited" : `${remaining} / ${limit} left`}
      </Text>
    </View>
  );
}
