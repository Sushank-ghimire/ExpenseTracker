import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/providers/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useExpenseTrack } from "@/store/useExpense";

const FlatListHeader = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({
    income: 0,
    expense: 0,
    budget: 0,
  });

  const [mounted, setMounted] = useState(false);

  const { getTotalExpenseAndIncome, userBudget } = useExpenseTrack();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTotalExpenseAndIncome();

      const expenseData = {
        expense: data.expense,
        income: data.income,
        budget: 0,
      };
      setUserData(expenseData);
    };
    fetchData();
    setMounted(true);
  }, []);
  return (
    <View>
      <Animated.View
        style={[styles.budgetCard, { backgroundColor: theme.colors.card }]}
        entering={mounted ? FadeInDown.delay(100).duration(500) : undefined}
      >
        <View style={[styles.budgetContent]}>
          <View>
            <Text style={[styles.budgetTitle, { color: theme.colors.text }]}>
              Monthly Budget
            </Text>
            <View style={styles.budgetValues}>
              <Text
                style={[styles.spentAmount, { color: theme.colors.primary }]}
              >
                Rs. {userData.expense.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.totalBudget,
                  { color: theme.colors.textSecondary },
                ]}
              >
                / Rs. {userBudget.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
      <View style={styles.summaryRow}>
        <Animated.View
          style={[
            styles.summaryCard,
            { backgroundColor: theme.colors.success },
          ]}
          entering={mounted ? FadeInDown.delay(200).duration(500) : undefined}
        >
          <View style={styles.summaryIconContainer}>
            <AntDesign name="arrowup" size={24} style={{ color: "#fff" }} />
          </View>
          <View>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryValue}>
              Rs. {userData.income.toFixed(2)}
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.summaryCard, { backgroundColor: theme.colors.error }]}
          entering={mounted ? FadeInDown.delay(300).duration(500) : undefined}
        >
          <View style={styles.summaryIconContainer}>
            <AntDesign name="arrowdown" size={24} style={{ color: "#fff" }} />
          </View>
          <View>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={styles.summaryValue}>
              Rs. {userData.expense.toFixed(2)}
            </Text>
          </View>
        </Animated.View>
      </View>
      <Animated.View
        style={styles.recentTransactionsContainer}
        entering={mounted ? FadeInDown.delay(500).duration(500) : undefined}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Transactions
          </Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
              View All
            </Text>
            <AntDesign name="right" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default FlatListHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greeting: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  userName: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  budgetCard: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    backgroundColor: "#F0F8FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  budgetContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  budgetValues: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    marginTop: 8,
  },
  spentAmount: {
    fontFamily: "Poppins-Bold",
    fontSize: 26,
  },
  totalBudget: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
    gap: 16,
  },
  summaryCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#fff",
  },
  summaryValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#fff",
  },
  chartContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  chartTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pieChartContainer: {
    width: 120,
    height: 120,
  },
  pieChart: {
    height: 120,
  },
  legendContainer: {
    flex: 1,
    marginLeft: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    flex: 1,
  },
  legendAmount: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  recentTransactionsContainer: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    marginRight: 4,
  },
});
