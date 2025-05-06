import React from "react";
import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerBlurEffect: "regular",
        }}
      />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="profileImage" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OnboardingLayout;
