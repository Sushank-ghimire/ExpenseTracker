import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const exportData = async () => {
  try {
    const storedData = await AsyncStorage.getItem("expenseData");
    const transactions = storedData ? JSON.parse(storedData) : [];

    const json = JSON.stringify(transactions, null, 2);

    const fileUri = FileSystem.documentDirectory + "expenseData.json";
    await FileSystem.writeAsStringAsync(fileUri, json, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.log("Sharing not available on this platform.");
    }

    return true;
  } catch (error) {
    console.error("Export failed:", error);
    return false;
  }
};
