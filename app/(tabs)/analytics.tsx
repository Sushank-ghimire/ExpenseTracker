import { StyleSheet } from "react-native";
import React from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import ThemeText from "@/components/ThemeText";

const ExpenseAnalytics = () => {
  return (
    <SafeAreaBackground>
      <ThemeText text="Analytics Page" isPrimary={true} />
    </SafeAreaBackground>
  );
};

export default ExpenseAnalytics;

const styles = StyleSheet.create({});
