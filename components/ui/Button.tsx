import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Pressable,
  View,
  type PressableProps,
} from "react-native";

import { gradients } from "@/theme/tokens";
import { Text } from "./Text";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

export type ButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
};

const sizeClass: Record<Size, string> = {
  md: "h-12 px-5",
  lg: "h-14 px-6",
};

export function Button({
  label,
  variant = "primary",
  size = "lg",
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const base = `flex-row items-center justify-center rounded-2xl ${sizeClass[size]}`;

  const content = loading ? (
    <ActivityIndicator color={variant === "primary" ? "#FFFFFF" : "#F25FB0"} />
  ) : (
    <Text
      variant="heading"
      className={
        variant === "primary"
          ? "text-on-primary"
          : variant === "secondary"
            ? "text-text"
            : "text-primary"
      }
    >
      {label}
    </Text>
  );

  if (variant === "primary") {
    return (
      <Pressable
        disabled={isDisabled}
        className={`${isDisabled ? "opacity-50" : ""} ${className ?? ""}`}
        {...props}
      >
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={base}
          style={{ borderRadius: 16 }}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={isDisabled}
      className={`${base} ${
        variant === "secondary" ? "bg-surface border border-border" : ""
      } ${isDisabled ? "opacity-50" : ""} ${className ?? ""}`}
      {...props}
    >
      <View className="flex-row items-center justify-center">{content}</View>
    </Pressable>
  );
}
