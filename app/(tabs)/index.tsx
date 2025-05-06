import { StyleSheet } from "react-native";
import React from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import ThemeText from "@/components/ThemeText";

const HomePage = () => {
  return (
    <SafeAreaBackground>
      <ThemeText text="Index Page" isPrimary={true} />
    </SafeAreaBackground>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
