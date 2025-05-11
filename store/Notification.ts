import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { requestPermissionsAsync } from "expo-notifications";

// Configure how notifications are shown when the app is foregrounded
Notifications.setNotificationHandler(null);

// Function to register for permissions
export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  } else {
    alert("Must use physical device for push notifications");
  }
}

// Schedule the daily reminder at 6 PM
export async function scheduleDailyReminder() {
  // Cancel previous schedules to avoid duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💰 Don’t forget!",
      body: "Add your daily expenses to stay on track.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 8,
    },
  });
}
