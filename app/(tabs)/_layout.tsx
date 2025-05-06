import TabBarIcons from "@/components/TabBarIcons";
import DatabaseProvider from "@/providers/DatabaseProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { StatusBar, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const TabsLayout = () => {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const handleNotificationPress = () => {
    router.push("/modal");
  };
  return (
    <DatabaseProvider>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        animated
        translucent
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: "shift",
          tabBarStyle: {
            height: 60,
            backgroundColor: theme.colors.background,
          },
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarAllowFontScaling: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
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
            headerRight: ({ pressColor, pressOpacity }) => (
              <View
                style={{
                  width: "auto",
                  padding: 8,
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={handleNotificationPress}
                  style={{ shadowColor: pressColor, opacity: pressOpacity }}
                >
                  <Icon name="bells" color={theme.colors.text} size={28} />
                </TouchableOpacity>
              </View>
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
