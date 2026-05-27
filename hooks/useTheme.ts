import { useColorScheme } from "nativewind";

import { useThemeStore, type ThemeMode } from "@/store/themeStore";
import { palette, type ColorScheme, type ThemeColors } from "@/theme/tokens";

export type UseThemeResult = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  scheme: ColorScheme;
  colors: ThemeColors;
};

export function useTheme(): UseThemeResult {
  const { colorScheme } = useColorScheme();
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const scheme: ColorScheme = colorScheme === "dark" ? "dark" : "light";

  return { mode, setMode, scheme, colors: palette[scheme] };
}
