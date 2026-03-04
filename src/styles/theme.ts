// src/styles/theme.ts
export const theme = {
  colors: {
    primary: "#6534F4",
    primaryAlt: "#8F00FF",
    bg: "#050A1F",
    bgSoft: "#05081C",
    textLight: "#FFFFFF",
    textMuted: "#A7B0C5",
    cardBg: "rgba(9, 14, 40, 0.9)",
    borderSoft: "rgba(255, 255, 255, 0.08)",
  },
  layout: {
    maxWidth: "1200px",
    headerHeight: "72px",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  fonts: {
    body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    heading:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};

export type AppTheme = typeof theme;
