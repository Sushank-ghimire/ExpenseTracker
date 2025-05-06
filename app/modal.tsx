import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import ThemeText from "@/components/ThemeText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/providers/ThemeProvider";

const ExpenseNotifcations = () => {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <SafeAreaBackground>
      <ScrollView style={{ flex: 1, position: "relative" }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ padding: 8, marginLeft: 4 }}
            onPress={() => {
              if (router.canGoBack()) {
                router.push("/(tabs)");
              }
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <Text style={{ color: theme.colors.text, fontSize: 23 }}>Home</Text>
        </View>
        <View style={{ position: "relative", height: "100%", padding: 10 }}>
          <ThemeText text="Notification Page" isPrimary={true} />
        </View>
      </ScrollView>
    </SafeAreaBackground>
  );
};

export default ExpenseNotifcations;

const styles = StyleSheet.create({});
