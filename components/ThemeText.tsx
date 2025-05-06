import { StyleSheet, Text } from "react-native";
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";

const ThemeText = ({
  text,
  isPrimary,
}: {
  text: string;
  isPrimary: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: isPrimary ? theme.colors.text : theme.colors.textSecondary,
      }}
    >
      {text}
    </Text>
  );
};

export default ThemeText;

const styles = StyleSheet.create({});
