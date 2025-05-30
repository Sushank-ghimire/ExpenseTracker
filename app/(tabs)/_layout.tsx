import HeaderLeft from "@/components/homepage/HeaderLeft";
import TabBarIcons from "@/components/TabBarIcons";
import { useTheme } from "@/providers/ThemeProvider";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { StatusBar } from "react-native";

const TabsLayout = () => {
  const { theme, isDarkMode } = useTheme();
  const mobileTheme = useColorScheme();

  return (
    <>
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
    </>
  );
};

export default TabsLayout;
