import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { useUser } from "@/store/useUser";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { useExpenseTrack } from "@/store/useExpense";

const appVersion =
  Constants.expoConfig?.version || Constants.manifest?.version || "1.0.0";

const settings = () => {
  const { getUserDetails, updateProfile } = useUser();

  const router = useRouter();

  const { resetAllData, setBudget } = useExpenseTrack();

  const { name, profileImage } = getUserDetails();

  const [isEditing, setIsEditing] = useState(false);

  const [budget, setUserBudget] = useState(0);

  const onLongPress = () => {
    router.push("/(onboarding)/profileImage");
  };

  const [userName, setUsername] = useState("");

  const [image, setProfileImage] = useState("");

  const { theme } = useTheme();

  const updateUserProfile = async () => {
    updateProfile(image, userName);
    await setBudget(budget);
  };

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
      setProfileImage(result.assets[0].uri);
    }
  };

  const exportData = async () => {};

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

  const dropDatabase = async () => {
    Alert.alert(
      "Data deletion",
      "Are you sure you want to delete your all data from app ? Note : Data cannot be recovered again",
      [
        {
          text: "Yes",
          onPress: async () => await resetAllData(),
        },
        {
          text: "Cancel",
          onPress: async () => null,
        },
      ]
    );
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
        <View
          style={[
            styles.profileSection,
            { backgroundColor: theme.colors.card },
          ]}
        >
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => {
              if (isEditing) {
                pickImage();
              }
            }}
            onLongPress={onLongPress}
          >
            <Image
              source={{
                uri:
                  image ||
                  profileImage ||
                  "https://images.pexels.com/photos/8873476/pexels-photo-8873476.jpeg",
              }}
              style={styles.profileImage}
            />
            <View style={styles.cameraButton}>
              <AntDesign name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* Name or Editable TextInput */}
          {isEditing ? (
            <TextInput
              value={userName}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#ccc"
              style={[
                {
                  padding: 13,
                  width: "80%",
                  margin: "auto",
                  flex: 1,
                  backgroundColor: theme.colors.background,
                  borderRadius: 2,
                  color: "white",
                },
              ]}
            />
          ) : (
            <Text
              style={[
                { color: theme.colors.text, fontSize: 20, textAlign: "left" },
              ]}
            >
              {name}
            </Text>
          )}

          {isEditing && (
            <TextInput
              placeholder="Enter your budget"
              placeholderTextColor="#ccc"
              keyboardType="number-pad"
              value={String(budget)}
              onChangeText={(text) => setUserBudget(Number(text))}
              style={[
                {
                  padding: 13,
                  width: "80%",
                  margin: "auto",
                  flex: 1,
                  backgroundColor: theme.colors.background,
                  borderRadius: 2,
                  color: "white",
                  marginTop: 8,
                },
              ]}
            />
          )}

          {/* Edit / Save Button */}
          <TouchableOpacity
            onPress={() => {
              setIsEditing((prev) => !prev);
              if (isEditing) {
                updateUserProfile();
              }
            }}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={dropDatabase} style={styles.settingItem}>
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

          <Text
            style={[styles.versionText, { color: theme.colors.textSecondary }]}
          >
            Version {appVersion}
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
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
  versionText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: "50%",
    marginHorizontal: "auto",
    textAlign: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
