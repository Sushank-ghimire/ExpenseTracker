import HeaderLeft from "@/components/homepage/HeaderLeft";
import TabBarIcons from "@/components/TabBarIcons";
import { useTheme } from "@/providers/ThemeProvider";
import { Tabs } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { useColorScheme } from "react-native";
import { StatusBar } from "react-native";

const TabsLayout = () => {
  const { theme, isDarkMode } = useTheme();
  const mobileTheme = useColorScheme();

  const handleDatabaseCreation = async (db: SQLiteDatabase) => {
    console.log("Database Initialized");
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `);
  };
  return (
    <SQLiteProvider databaseName="tracker.db" onInit={handleDatabaseCreation}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        animated
        translucent
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: mobileTheme === "light" ? "shift" : "none",
          tabBarStyle: {
            height: 60,
            backgroundColor: theme.colors.background,
          },
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarAllowFontScaling: true,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            headerShown: true,
            tabBarIcon: ({ color, focused, size }) => (
              <TabBarIcons
                iconName={"home"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTitleStyle: {
              color: theme.colors.text,
            },
            headerLeft: () => <HeaderLeft />,
            tabBarLabel: "Home",
            headerShadowVisible: false,
          }}
        />

        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color, focused, size }) => (
              <TabBarIcons
                iconName={"analytics"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, focused, size }) => (
              <TabBarIcons
                iconName={"dashboard"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused, size }) => (
              <TabBarIcons
                iconName={"settings"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </SQLiteProvider>
  );
};

export default TabsLayout;
