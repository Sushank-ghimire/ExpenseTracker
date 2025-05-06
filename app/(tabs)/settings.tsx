import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";

const settings = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { theme, isDarkMode, toggleTheme } = useTheme();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to upload a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      console.log(result);
    }
  };

  const exportData = async () => {};

  const handleCustomTheme = () => {
    setShowColorPicker(true);
  };

  const handleExport = async () => {
    try {
      const result = await exportData();
      Alert.alert(
        "Data Exported",
        `Your data has been exported successfully to: ${result}`
      );
    } catch (error) {
      if (error instanceof Error) Alert.alert("Export Failed", error.message);
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Settings
          </Text>
        </View>

        {/* User Profile */}

        {/* Appereance */}
        <View style={styles.sectionTitle}>
          <Text
            style={[
              styles.sectionTitleText,
              { color: theme.colors.textSecondary },
            ]}
          >
            Appearance
          </Text>
        </View>
        <View
          style={[styles.settingsGroup, { backgroundColor: theme.colors.card }]}
        >
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <View
                style={[
                  styles.settingIconContainer,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                {isDarkMode ? (
                  <Ionicons
                    name="moon"
                    size={20}
                    color={theme.colors.primary}
                  />
                ) : (
                  <Feather name="sun" size={20} color={theme.colors.primary} />
                )}
              </View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: theme.colors.primaryLight }}
              thumbColor={isDarkMode ? theme.colors.primary : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.sectionTitle}>
          <Text
            style={[
              styles.sectionTitleText,
              { color: theme.colors.textSecondary },
            ]}
          >
            Data Management
          </Text>
        </View>

        <View
          style={[styles.settingsGroup, { backgroundColor: theme.colors.card }]}
        >
          {/* Data Export */}
          <TouchableOpacity style={styles.settingItem} onPress={handleExport}>
            <View style={styles.settingLabelContainer}>
              <View
                style={[
                  styles.settingIconContainer,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                <Feather
                  name="download"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Export Data
              </Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Data Import */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <View
                style={[
                  styles.settingIconContainer,
                  { backgroundColor: theme.colors.primaryLight },
                ]}
              >
                <Feather name="upload" size={20} color={theme.colors.primary} />
              </View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Import Data
              </Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Reset All Data */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <View
                style={[
                  styles.settingIconContainer,
                  { backgroundColor: "#FECACA" },
                ]}
              >
                <Feather name="trash-2" size={20} color="#DC2626" />
              </View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Reset All Data
              </Text>
            </View>
            <Feather
              name="chevron-right"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: theme.colors.error },
            ]}
          >
            <AntDesign name="logout" size={20} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text
            style={[styles.versionText, { color: theme.colors.textSecondary }]}
          >
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4F46E5",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  profileName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  sectionTitle: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  sectionTitleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    textTransform: "uppercase",
  },
  settingsGroup: {
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
  versionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
});
