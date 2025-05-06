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

export default function SettingsScreen({
  // Theme related props
  isDarkMode = false,
  toggleTheme = () => {},
  colors = {
    background: "#FFFFFF",
    text: "#000000",
    textSecondary: "#6B7280",
    card: "#F3F4F6",
    primary: "#4F46E5",
    primaryLight: "#E0E7FF",
    error: "#EF4444",
  },
  // Database related props
  user = {
    name: "User",
    email: "user@example.com",
    profileImage: null,
  },
  updateUserProfile = () => {},
  exportData = async () => {},
  importData = async () => {},
  resetAllData = () => {},
  onLogout = () => {},
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);

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
    }

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

    const handleImport = async () => {
      try {
        await importData();
        Alert.alert(
          "Data Imported",
          "Your data has been imported successfully."
        );
      } catch (error) {
        if (error instanceof Error) Alert.alert("Import Failed", error.message);
      }
    };

    const handleReset = () => {
      Alert.alert(
        "Reset All Data",
        "Are you sure you want to reset all data? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Reset",
            style: "destructive",
            onPress: () => {
              resetAllData();
              Alert.alert(
                "Data Reset",
                "All data has been reset successfully."
              );
            },
          },
        ]
      );
    };

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Settings
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[styles.profileSection, { backgroundColor: colors.card }]}
          >
            <TouchableOpacity
              style={styles.profileImageContainer}
              onPress={pickImage}
            >
              <Image
                source={{
                  uri:
                    user.profileImage ||
                    "https://images.pexels.com/photos/8873476/pexels-photo-8873476.jpeg",
                }}
                style={styles.profileImage}
              />
              <View style={styles.cameraButton}>
                <FontAwesome name="camera" size={16} color="#fff" />
              </View>
            </TouchableOpacity>

            <Text style={[styles.profileName, { color: colors.text }]}>
              {user.name}
            </Text>
            <Text
              style={[styles.profileEmail, { color: colors.textSecondary }]}
            >
              {user.email}
            </Text>
          </View>

          <View style={styles.sectionTitle}>
            <Text
              style={[styles.sectionTitleText, { color: colors.textSecondary }]}
            >
              Appearance
            </Text>
          </View>

          <View
            style={[styles.settingsGroup, { backgroundColor: colors.card }]}
          >
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <View
                  style={[
                    styles.settingIconContainer,
                    { backgroundColor: colors.primaryLight },
                  ]}
                >
                  {isDarkMode ? (
                    <Ionicons name="moon" size={20} color={colors.primary} />
                  ) : (
                    <Feather name="sun" size={20} color={colors.primary} />
                  )}
                </View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#767577", true: colors.primaryLight }}
                thumbColor={isDarkMode ? colors.primary : "#f4f3f4"}
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleCustomTheme}
            >
              <View style={styles.settingLabelContainer}>
                <View
                  style={[
                    styles.settingIconContainer,
                    { backgroundColor: colors.primaryLight },
                  ]}
                >
                  <MaterialIcons
                    name="color-lens"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Custom Theme
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionTitle}>
            <Text
              style={[styles.sectionTitleText, { color: colors.textSecondary }]}
            >
              Data Management
            </Text>
          </View>

          <View
            style={[styles.settingsGroup, { backgroundColor: colors.card }]}
          >
            <TouchableOpacity style={styles.settingItem} onPress={handleExport}>
              <View style={styles.settingLabelContainer}>
                <View
                  style={[
                    styles.settingIconContainer,
                    { backgroundColor: colors.primaryLight },
                  ]}
                >
                  <Feather name="download" size={20} color={colors.primary} />
                </View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Export Data
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem} onPress={handleImport}>
              <View style={styles.settingLabelContainer}>
                <View
                  style={[
                    styles.settingIconContainer,
                    { backgroundColor: colors.primaryLight },
                  ]}
                >
                  <Feather name="upload" size={20} color={colors.primary} />
                </View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Import Data
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem} onPress={handleReset}>
              <View style={styles.settingLabelContainer}>
                <View
                  style={[
                    styles.settingIconContainer,
                    { backgroundColor: "#FECACA" },
                  ]}
                >
                  <Feather name="trash-2" size={20} color="#DC2626" />
                </View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Reset All Data
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error }]}
            onPress={onLogout}
          >
            <AntDesign name="logout" size={20} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            Version 1.0.0
          </Text>
        </ScrollView>

        {/* <ThemeColorPicker
        visible={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        onSelectColor={(color) => {
          setCustomColor(color);
          setShowColorPicker(false);
        }}
      /> */}
      </SafeAreaView>
    );
  };
}

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
    fontSize: 20,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  sectionTitle: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  sectionTitleText: {
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
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
  versionText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
});
