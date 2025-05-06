import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Feather";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import Storage from "expo-sqlite/kv-store";

export default function SplashScreen() {
  const [isFirstLaunch] = useState(Storage.getItemSync("isVisited"));
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) }),
      withDelay(1500, withTiming(0, { duration: 400 }))
    );

    scale.value = withSequence(
      withTiming(1.2, { duration: 800, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.cubic) }),
      withDelay(1200, withTiming(0.8, { duration: 400 }))
    );

    textOpacity.value = withSequence(
      withDelay(300, withTiming(1, { duration: 800 })),
      withDelay(1200, withTiming(0, { duration: 400 }))
    );

    const timeout = setTimeout(() => {
      if (isFirstLaunch) {
        router.push("/(onboarding)/welcome");
      } else {
        router.push("/(tabs)");
      }
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaBackground>
      <View style={[styles.container]}>
        <Animated.View style={iconAnimatedStyle}>
          <Icon name="credit-card" size={80} color="#007AFF" />
        </Animated.View>
        <Animated.Text
          style={[styles.title, { color: "white" }, textAnimatedStyle]}
        >
          WalletWise
        </Animated.Text>
      </View>
    </SafeAreaBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    letterSpacing: 1,
  },
});
