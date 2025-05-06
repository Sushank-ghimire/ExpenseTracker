import { StyleSheet,  View } from "react-native";
import React from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import ThemeText from "@/components/ThemeText";

const ExpenseNotifcations = () => {
  return (
    <SafeAreaBackground>
      <View style={{}}>
        <ThemeText text="Notification Page" isPrimary={true} />
      </View>
    </SafeAreaBackground>
  );
};

export default ExpenseNotifcations;

const styles = StyleSheet.create({});
