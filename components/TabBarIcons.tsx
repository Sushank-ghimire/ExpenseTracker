import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface TabBarIconsProps {
  size: number;
  color: string;
  focused: boolean;
  iconName: "home" | "analytics" | "dashboard" | "settings";
}

const TabBarIcons = ({ size, color, focused, iconName }: TabBarIconsProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(focused ? 1.2 : 1, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const renderIcon = () => {
    switch (iconName) {
      case "home":
        return <AntDesign name="home" color={color} size={size} />;
      case "analytics":
        return <MaterialCommunityIcons name="chart-line" color={color} size={size} />;
      case "dashboard":
        return <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />;
      case "settings":
        return <Ionicons name="settings-outline" color={color} size={size} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderIcon()}
    </Animated.View>
  );
};

export default TabBarIcons;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    maxWidth: 64,
    width: "100%",
    flex: 1,
    overflow: "hidden",
  },
});
