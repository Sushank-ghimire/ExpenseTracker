import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import { useUser } from "@/store/useUser";
import { useTheme } from "@/providers/ThemeProvider";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const ImageView = () => {
  const { theme } = useTheme();
  const { getUserDetails } = useUser();
  const { profileImage } = getUserDetails();

  const router = useRouter();

  return (
    <SafeAreaBackground>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.colors.card }]}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        >
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>

        {/* Profile Image */}
        <Image
          source={{
            uri:
              profileImage ||
              "https://images.pexels.com/photos/8873476/pexels-photo-8873476.jpeg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </SafeAreaBackground>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
  },
  image: {
    height: height * 0.5,
    width: "100%",
  },
});
