import { StyleSheet } from "react-native";
import React from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import ThemeText from "@/components/ThemeText";

const ExpenseDashboard = () => {
  return (
    <SafeAreaBackground>
      <ThemeText text="Dashboard Page" isPrimary={true} />
    </SafeAreaBackground>
  );
};

export default ExpenseDashboard;

const styles = StyleSheet.create({});
