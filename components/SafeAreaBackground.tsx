import { useTheme } from "@/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaBackground = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaBackground;
