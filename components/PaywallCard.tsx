import { View } from "react-native";

import { Card, Text } from "@/components/ui";

export type PaywallPlan = {
  id: string;
  title: string;
  price: string;
  caption: string;
  badge?: string;
};

export type PaywallCardProps = {
  plan: PaywallPlan;
  selected: boolean;
  onPress: () => void;
};

export function PaywallCard({ plan, selected, onPress }: PaywallCardProps) {
  return (
    <Card
      onPress={onPress}
      className={`p-4 flex-row items-center justify-between ${
        selected ? "border-primary border-2" : ""
      }`}
    >
      <View className="gap-0.5">
        <View className="flex-row items-center gap-2">
          <Text variant="heading">{plan.title}</Text>
          {plan.badge ? (
            <View className="px-2 py-0.5 rounded-full bg-primary">
              <Text variant="label" className="text-on-primary">
                {plan.badge}
              </Text>
            </View>
          ) : null}
        </View>
        <Text variant="caption">{plan.caption}</Text>
      </View>
      <Text variant="heading">{plan.price}</Text>
    </Card>
  );
}
