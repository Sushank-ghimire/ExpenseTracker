export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    secondaryLight: string;
    accent: string;
    accentLight: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    error: string;
    success: string;
    warning: string;
  };
}

// Light theme
export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#4F46E5", // Indigo-600
    primaryLight: "#E0E7FF", // Indigo-100
    secondary: "#0D9488", // Teal-600
    secondaryLight: "#CCFBF1", // Teal-100
    accent: "#F59E0B", // Amber-500
    accentLight: "#FEF3C7", // Amber-100
    background: "#F9FAFB", // Gray-50
    card: "#FFFFFF",
    text: "#1F2937", // Gray-800
    textSecondary: "#6B7280", // Gray-500
    border: "#E5E7EB", // Gray-200
    notification: "#EF4444", // Red-500
    error: "#EF4444", // Red-500
    success: "#10B981", // Emerald-500
    warning: "#F59E0B", // Amber-500
  },
};

// Dark theme
export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#6366F1", // Indigo-500
    primaryLight: "#312E81", // Indigo-900
    secondary: "#14B8A6", // Teal-500
    secondaryLight: "#134E4A", // Teal-900
    accent: "#F59E0B", // Amber-500
    accentLight: "#78350F", // Amber-900
    background: "#111827", // Gray-900
    card: "#1F2937", // Gray-800
    text: "#F9FAFB", // Gray-50
    textSecondary: "#9CA3AF", // Gray-400
    border: "#374151", // Gray-700
    notification: "#EF4444", // Red-500
    error: "#F87171", // Red-400
    success: "#34D399", // Emerald-400
    warning: "#FBBF24", // Amber-400
  },
};

// Create a custom theme based on a color
export const createCustomTheme = (color: string, isDark: boolean): Theme => {
  // For a real app, this would generate a proper color palette
  const baseTheme = isDark ? darkTheme : lightTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: color,
      primaryLight: isDark
        ? adjustColor(color, -40, -40, -40, 0.85) // Darker shade for dark mode
        : adjustColor(color, 40, 40, 40, 0.2), // Lighter shade for light mode
    },
  };
};

// Simple color adjustment helper
function adjustColor(
  color: string,
  rDiff: number,
  gDiff: number,
  bDiff: number,
  alpha: number
): string {
  // Convert hex to rgb
  const hex = color.replace("#", "");
  const r = Math.min(
    255,
    Math.max(0, parseInt(hex.substring(0, 2), 16) + rDiff)
  );
  const g = Math.min(
    255,
    Math.max(0, parseInt(hex.substring(2, 4), 16) + gDiff)
  );
  const b = Math.min(
    255,
    Math.max(0, parseInt(hex.substring(4, 6), 16) + bDiff)
  );

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
