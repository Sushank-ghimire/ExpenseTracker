import TabBarIcons from "@/components/TabBarIcons";
import DatabaseProvider from "@/providers/DatabaseProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";

const TabsLayout = () => {
  const { theme } = useTheme();
  return (
    <DatabaseProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: "shift",
          tabBarStyle: {
            height: 60,
            backgroundColor: theme.colors.primary,
          },
          tabBarInactiveTintColor: "#CBD5E1",
          tabBarActiveTintColor: "#FFFFFF",
        }}
      >
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle={"dark-content"}
          animated
          translucent
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: true,
            headerShadowVisible: false,
            tabBarIcon: ({ color, focused, size }) => (
              <TabBarIcons
                iconName={"home"}
                color={color}
                size={size}
                focused={focused}
              />
            ),
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
    </DatabaseProvider>
  );
};

export default TabsLayout;
