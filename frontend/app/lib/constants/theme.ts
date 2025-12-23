export const THEME = {
  colors: {
    black: "#000000",
    green: "#97d22a",
    blue: "#017eff",
    gray: "#dedede",
    white: "#ffffff",
    grayBackground: "rgba(222, 222, 222, 0.14)",
    blueBackground: "rgba(1, 126, 255, 0.08)",
  },
  shadows: {
    default: "0px 4px 4px 0px #00000040",
    card: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
} as const;

export type ThemeColors = typeof THEME.colors;
export type ThemeShadows = typeof THEME.shadows;
