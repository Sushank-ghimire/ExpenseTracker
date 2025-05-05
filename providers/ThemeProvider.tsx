import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import { Theme, darkTheme, lightTheme, createCustomTheme } from "@/theme";

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setCustomColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [customColor, setCustomColor] = useState<string | null>(null);

  // Get the appropriate theme based on mode and custom color
  const getTheme = (): Theme => {
    if (customColor) {
      return createCustomTheme(customColor, isDarkMode);
    }
    return isDarkMode ? darkTheme : lightTheme;
  };

  const [theme, setTheme] = useState<Theme>(getTheme());

  // Update theme when color scheme changes
  useEffect(() => {
    setTheme(getTheme());
  }, [isDarkMode, customColor]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Set a custom primary color
  const handleSetCustomColor = (color: string) => {
    setCustomColor(color);
  };

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    setCustomColor: handleSetCustomColor,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
