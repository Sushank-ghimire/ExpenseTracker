import { FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import FlatListHeader from "@/components/homepage/FlatListHeader";
import { Platform } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { useExpenseTrack } from "@/store/useExpense";
import TransactionItem from "@/components/homepage/TransactionItem";

const Index = () => {
  const { getTransactions, transactions } = useExpenseTrack();
  const { theme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate a network request or data refresh
    try {
      await getTransactions();
      console.log(transactions);
    } catch (error) {
      console.log("Getting error while fetching the transactions");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, [getTransactions]);

  return (
    <SafeAreaBackground>
      <FlatList
        ListHeaderComponent={() => <FlatListHeader />}
        data={transactions ? transactions : []}
        renderItem={({ index, item }) => (
          <TransactionItem key={index} transaction={item} />
        )}
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
