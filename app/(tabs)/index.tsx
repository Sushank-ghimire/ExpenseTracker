import { FlatList, Text, RefreshControl } from "react-native";
import { useState } from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import FlatListHeader from "@/components/homepage/FlatListHeader";
import { Platform } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";

const Index = () => {
  const { theme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate a network request or data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Replace with real data fetch logic
  };

  return (
    <SafeAreaBackground>
      <FlatList
        ListHeaderComponent={() => <FlatListHeader />}
        data={[]} // Your data here
        renderItem={({}) => <Text>Items</Text>}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#6200EE"
            title={Platform.OS === "ios" ? "Refreshing..." : undefined}
            titleColor="#6200EE"
            colors={[theme.colors.primary]}
            progressBackgroundColor={theme.colors.background}
          />
        }
      />
    </SafeAreaBackground>
  );
};

export default Index;
