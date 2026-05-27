import { type ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

export type ScreenProps = {
  children: ReactNode;
  className?: string;
  edges?: readonly Edge[];
};

export function Screen({
  children,
  className,
  edges = ["top", "left", "right"],
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-background">
      <View className={`flex-1 ${className ?? ""}`}>{children}</View>
    </SafeAreaView>
  );
}
