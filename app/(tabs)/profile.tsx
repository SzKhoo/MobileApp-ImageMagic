import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import { QuotaPill } from "@/components/QuotaPill";
import { Button, Card, Screen, Segmented, Text } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";
import { useThemeStore, type ThemeMode } from "@/store/themeStore";
import { useQuotaStore } from "@/store/quotaStore";

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <Text variant="body">{label}</Text>
      {value ? <Text variant="caption">{value}</Text> : null}
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const isPro = useQuotaStore((s) => s.isPro);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-2 pb-4">
          <Text variant="title">Profile</Text>
        </View>

        <Card className="p-4 flex-row items-center gap-3">
          <View className="h-14 w-14 rounded-full bg-surface-muted items-center justify-center">
            <Ionicons name="person" size={26} color={colors.textMuted} />
          </View>
          <View className="flex-1 gap-1">
            <Text variant="heading">You</Text>
            <QuotaPill />
          </View>
        </Card>

        {!isPro ? (
          <View className="pt-4">
            <Button label="Go unlimited" onPress={() => router.push("/paywall")} />
          </View>
        ) : null}

        <Text variant="label" className="pt-6 pb-2">
          APPEARANCE
        </Text>
        <Card className="p-4 gap-3">
          <Text variant="body">Theme</Text>
          <Segmented options={THEME_OPTIONS} value={mode} onChange={setMode} />
        </Card>

        <Text variant="label" className="pt-6 pb-2">
          ABOUT
        </Text>
        <Card className="px-4">
          <Row label="Terms of Service" />
          <View className="h-px bg-border" />
          <Row label="Privacy Policy" />
          <View className="h-px bg-border" />
          <Row label="Version" value="1.0.0" />
        </Card>
      </ScrollView>
    </Screen>
  );
}
