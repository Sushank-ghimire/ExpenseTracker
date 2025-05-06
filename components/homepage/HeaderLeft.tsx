import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@/store/useUser";
import { Image } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter } from "expo-router";

const HeaderLeft = () => {
  const router = useRouter();
  const { getUserDetails } = useUser();
  const { name, profileImage } = getUserDetails();
  const { theme } = useTheme();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
    >
      <TouchableOpacity
        onLongPress={() => {
          router.push("/profileImage");
        }}
      >
        <Image
          source={{
            uri:
              profileImage ||
              "https://images.pexels.com/photos/8873476/pexels-photo-8873476.jpeg",
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 10,
          }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: 12,
          }}
        >
          {greeting},
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {name || "User"}
        </Text>
      </View>
    </View>
  );
};

export default HeaderLeft;
