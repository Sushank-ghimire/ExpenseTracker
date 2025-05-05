import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import ThemeProvider from "@/providers/ThemeProvider";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    // "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    // "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    // "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after fonts have loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar backgroundColor={"#4F46E5"} barStyle={"light-content"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(onboarding)"
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="(tabs)" options={{ animation: "simple_push" }} />
        <Stack.Screen name="+not-found" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
