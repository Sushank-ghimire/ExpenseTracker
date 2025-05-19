import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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

  const theme = useColorScheme();

  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <StatusBar backgroundColor={"#111827"} barStyle={"light-content"} />
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarAnimation: "fade",
            freezeOnBlur: true,
            headerTransparent: true,
            headerShadowVisible: false,
            animationTypeForReplace: "push",
            headerBackVisible: true,
            headerBlurEffect: "regular",
          }}
        >
          <Stack.Screen
            name="(onboarding)"
            options={{
              animation: theme === "light" ? "slide_from_bottom" : "default",
            }}
          />
          <Stack.Screen name="(tabs)" options={{ animation: "simple_push" }} />
          <Stack.Screen name="+not-found" options={{ presentation: "modal" }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
