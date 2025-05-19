import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMonthlyChartData = async (year: number, month: number) => {
  const raw = await AsyncStorage.getItem("expenseData");
  const transactions = raw ? JSON.parse(raw) : [];

  const filtered = transactions.filter((txn: any) => {
    const date = new Date(txn.date);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      txn.type === "expense"
    );
  });

  const dailyTotals: { [day: number]: number } = {};
  filtered.forEach((txn: any) => {
    const date = new Date(txn.date);
    const day = date.getDate(); // Get day of month (1–31)
    dailyTotals[day] = (dailyTotals[day] || 0) + txn.amount;
  });

  // Create sorted chart data
  const data = Object.entries(dailyTotals)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([day, value]) => ({
      label: day.toString(),
      value: value,
    }));

  return data;
};
