import { useState, useRef } from "react";
import Storage from "expo-sqlite/kv-store";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Animated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const screens = [
  {
    id: 1,
    title: "Track Your Money",
    description:
      "Keep track of your income and expenses with intuitive tools and visualizations.",
    icon: "credit-card",
  },
  {
    id: 2,
    title: "Analyze Your Spending",
    description:
      "View detailed analytics to understand your financial habits and make better decisions.",
    icon: "bar-chart-2",
  },
  {
    id: 3,
    title: "Get Timely Reminders",
    description:
      "Receive notifications for budget alerts and payment reminders.",
    icon: "bell",
  },
  {
    id: 4,
    title: "Customize Your Experience",
    description:
      "Personalize themes, categories, and other settings to match your preferences.",
    icon: "settings",
  },
];

// Dummy function to simulate onboarding complete
const completeOnboarding = () => {
  Storage.setItemSync("isVisited", "true");
};

export default function WelcomeScreen() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const [alreadyUsed] = useState(
    Storage.getItemSync("isVisited")
  );
  
  if (alreadyUsed) {
    router.push("/(tabs)");
  }

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
      scrollViewRef.current?.scrollTo({
        x: width * (currentScreen + 1),
        animated: true,
      });
    } else {
      completeOnboarding();
      router.replace("/(tabs)");
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
      <View style={styles.header}>
        <Text style={[styles.appTitle, { color: "#007AFF" }]}>WalletWise</Text>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: "#888888" }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
      >
        {screens.map((screen, index) => (
          <Animated.View
            key={screen.id}
            style={styles.screenContainer}
            entering={index === currentScreen ? SlideInRight : undefined}
            exiting={index === currentScreen ? SlideOutLeft : undefined}
          >
            <Animated.View
              style={[styles.iconContainer, { backgroundColor: "#E0F0FF" }]}
              entering={FadeIn.duration(600)}
            >
              <Icon name={screen.icon} size={64} color="#007AFF" />
            </Animated.View>

            <Animated.Text
              style={[styles.title, { color: "#222222" }]}
              entering={FadeIn.delay(300).duration(600)}
            >
              {screen.title}
            </Animated.Text>

            <Animated.Text
              style={[styles.description, { color: "#666666" }]}
              entering={FadeIn.delay(600).duration(600)}
            >
              {screen.description}
            </Animated.Text>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {screens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentScreen
                  ? [styles.paginationDotActive, { backgroundColor: "#007AFF" }]
                  : { backgroundColor: "#CCCCCC" },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: "#007AFF" }]}
          onPress={handleNext}
        >
          <Icon
            name={
              currentScreen < screens.length - 1
                ? "arrow-right"
                : "check-circle"
            }
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  appTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  screenContainer: {
    width,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paginationDotActive: {
    width: 24,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
