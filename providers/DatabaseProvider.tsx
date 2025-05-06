import { SQLiteProvider } from "expo-sqlite";
import { Platform } from "react-native";

const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === "web") {
    // Web platform - return children without SQLiteProvider
    return <>{children}</>;
  }

  // Mobile platforms (iOS/Android) - wrap with SQLiteProvider
  return (
    <SQLiteProvider databaseName="user.db">
      <SQLiteProvider databaseName="expenses.db">{children}</SQLiteProvider>
    </SQLiteProvider>
  );
};

export default DatabaseProvider;
