import { type ReactNode } from "react";
import { Pressable, View, type ViewProps } from "react-native";

export type CardProps = ViewProps & {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
};

export function Card({ children, onPress, className, ...props }: CardProps) {
  const classes = `bg-surface rounded-2xl border border-border ${className ?? ""}`;

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={classes} {...props}>
        {children}
      </Pressable>
    );
  }

  return (
    <View className={classes} {...props}>
      {children}
    </View>
  );
}
