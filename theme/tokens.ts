// Raw token values for JS consumers (gradients, icons, status bar, native props)
// that cannot read NativeWind classes. Keep in sync with global.css.

export type ColorScheme = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryEnd: string;
  onPrimary: string;
  accent: string;
};

export const palette: Record<ColorScheme, ThemeColors> = {
  light: {
    background: "#F3EEFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F7F4FC",
    border: "#EBE6F5",
    text: "#1A1625",
    textMuted: "#787185",
    primary: "#F25FB0",
    primaryEnd: "#A77BE6",
    onPrimary: "#FFFFFF",
    accent: "#A77BE6",
  },
  dark: {
    background: "#12101A",
    surface: "#1E1B29",
    surfaceMuted: "#262233",
    border: "#302B40",
    text: "#F5F3FA",
    textMuted: "#A59EB5",
    primary: "#F25FB0",
    primaryEnd: "#A77BE6",
    onPrimary: "#FFFFFF",
    accent: "#C8AAFF",
  },
};

export const gradients = {
  primary: ["#F25FB0", "#A77BE6"] as readonly [string, string],
};
