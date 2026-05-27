import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { PaywallCard, type PaywallPlan } from "@/components/PaywallCard";
import { Button, IconButton, Screen, Text } from "@/components/ui";
import { gradients } from "@/theme/tokens";
import { useQuotaStore } from "@/store/quotaStore";
import { toast } from "@/store/toastStore";

const PLANS: PaywallPlan[] = [
  { id: "weekly", title: "Weekly", price: "$4.99", caption: "Billed weekly" },
  { id: "monthly", title: "Monthly", price: "$9.99", caption: "Billed monthly" },
  {
    id: "yearly",
    title: "Yearly",
    price: "$59.99",
    caption: "Just $5/mo",
    badge: "Best value",
  },
];

const BENEFITS = [
  "Unlimited transformations",
  "Every look unlocked",
  "Priority generation",
  "No watermark",
];

export default function PaywallScreen() {
  const [selected, setSelected] = useState("yearly");
  const setPro = useQuotaStore((s) => s.setPro);

  const subscribe = () => {
    setPro(true);
    toast("You're all set — enjoy unlimited magic ✨");
    router.back();
  };

  return (
    <Screen className="px-5" edges={["top", "bottom", "left", "right"]}>
      <View className="flex-row justify-end py-2">
        <IconButton
          name="close"
          variant="surface"
          onPress={() => router.back()}
          accessibilityLabel="Close"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
        <View className="items-center gap-2 pt-2">
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: 64, height: 64, borderRadius: 20, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="sparkles" size={30} color="#FFFFFF" />
          </LinearGradient>
          <Text variant="title" className="text-center">
            Unlock Image Magic
          </Text>
          <Text variant="caption" className="text-center">
            Transform unlimited photos with every look.
          </Text>
        </View>

        <View className="gap-2">
          {BENEFITS.map((b) => (
            <View key={b} className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={20} color="#F25FB0" />
              <Text variant="body">{b}</Text>
            </View>
          ))}
        </View>

        <View className="gap-2">
          {PLANS.map((plan) => (
            <PaywallCard
              key={plan.id}
              plan={plan}
              selected={plan.id === selected}
              onPress={() => setSelected(plan.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="pt-3 gap-3">
        <Button label="Continue" onPress={subscribe} />
        <Pressable onPress={() => toast("Nothing to restore")}>
          <Text variant="label" className="text-center text-text-muted">
            Restore purchases
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
