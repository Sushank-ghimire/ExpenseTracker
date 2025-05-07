import { StyleSheet, View } from "react-native";
import React from "react";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import { useState } from "react";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

const periods = ["Week", "Month", "Year"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ExpenseAnalytics = () => {
  const { theme } = useTheme();

  const [selectedPeriod, setSelectedPeriod] = useState("Month");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const renderPeriodTitle = () => {
    if (selectedPeriod === "Week") return "This Week";
    if (selectedPeriod === "Month")
      return `${months[selectedMonth]} ${selectedYear}`;
    return selectedYear.toString();
  };

  const handlePrevious = () => {
    if (selectedPeriod === "Month") {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else if (selectedPeriod === "Year") {
      setSelectedYear(selectedYear - 1);
    }
  };

  const handleNext = () => {
    if (selectedPeriod === "Month") {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    } else if (selectedPeriod === "Year") {
      setSelectedYear(selectedYear + 1);
    }
  };
  return (
    <SafeAreaBackground>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Analytics
        </Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodButtonText,
                {
                  color:
                    selectedPeriod === period
                      ? "#fff"
                      : theme.colors.textSecondary,
                },
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dateNavigator}>
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: theme.colors.card }]}
            onPress={handlePrevious}
          >
            <AntDesign
              name="leftcircleo"
              style={{ fontWeight: "bold" }}
              color={theme.colors.text}
              size={19}
            />
          </TouchableOpacity>

          <View
            style={[
              styles.currentPeriod,
              { backgroundColor: theme.colors.card },
            ]}
          >
            <Fontisto
              name="date"
              style={{ fontWeight: "bold" }}
              color={theme.colors.text}
              size={17}
            />
            <Text
              style={[styles.currentPeriodText, { color: theme.colors.text }]}
            >
              {renderPeriodTitle()}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: theme.colors.card }]}
            onPress={handleNext}
          >
            <AntDesign
              name="rightcircleo"
              style={{ fontWeight: "bold" }}
              color={theme.colors.text}
              size={19}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaBackground>
  );
};

export default ExpenseAnalytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
  },
  periodSelector: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  periodButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  dateNavigator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  currentPeriod: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  currentPeriodText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  chartCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  chartTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginBottom: 16,
  },
  lineChartContainer: {
    height: 200,
    flexDirection: "row",
  },
  yAxis: {
    width: 40,
  },
  chartContent: {
    flex: 1,
    position: "relative",
  },
  lineChart: {
    flex: 1,
  },
  overlayChart: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  dateLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 10,
  },
  dateLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    textAlign: "center",
  },
  barChart: {
    height: 180,
    marginTop: 8,
  },
  categoryLegend: {
    marginTop: 16,
  },
  categoryLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    flex: 1,
  },
  categoryAmount: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  summaryCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
  },
  summaryTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
  },
  balanceContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  balanceLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 4,
  },
  balanceValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
});
