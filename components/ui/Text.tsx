import { Text as RNText, type TextProps as RNTextProps } from "react-native";

type Variant = "display" | "title" | "heading" | "body" | "caption" | "label";

const variantClass: Record<Variant, string> = {
  display: "font-bold text-[34px] leading-[40px] text-text",
  title: "font-bold text-[24px] leading-[30px] text-text",
  heading: "font-semibold text-[18px] leading-[24px] text-text",
  body: "font-sans text-[15px] leading-[22px] text-text",
  caption: "font-sans text-[13px] leading-[18px] text-text-muted",
  label: "font-medium text-[13px] leading-[16px] text-text-muted",
};

export type TextProps = RNTextProps & {
  variant?: Variant;
  className?: string;
};

export function Text({ variant = "body", className, ...props }: TextProps) {
  return (
    <RNText className={`${variantClass[variant]} ${className ?? ""}`} {...props} />
  );
}
