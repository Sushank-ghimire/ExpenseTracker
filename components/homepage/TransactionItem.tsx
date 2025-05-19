import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Transaction } from "@/types";
import { useTheme } from "@/providers/ThemeProvider";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useExpenseTrack } from "@/store/useExpense";
import { Alert } from "react-native";

interface TransactionItemProps {
  transaction: Transaction;
  isLast?: boolean;
}

export default function TransactionItem({
  transaction,
  isLast = false,
}: TransactionItemProps) {
  const { theme } = useTheme();

  const categories = {
    expense: [
      {
        id: "food",
        name: "Food",
        icon: (
          <MaterialCommunityIcons
            name="food"
            size={16}
            color={theme.colors.text}
          />
        ),
        color: "#f97316",
      },
      {
        id: "transport",
        name: "Transport",
        icon: <Feather name="truck" size={16} color={theme.colors.text} />,
        color: "#6366f1",
      },
      {
        id: "shopping",
        name: "Shopping",
        icon: (
          <AntDesign name="shoppingcart" size={16} color={theme.colors.text} />
        ),
        color: "#FFCE56",
      },
      {
        id: "personal",
        name: "Personal",
        icon: (
          <MaterialIcons
            name="private-connectivity"
            size={16}
            color={theme.colors.text}
          />
        ),
        color: "#3b8aae",
      },
      {
        id: "others",
        name: "Others",
        icon: <AntDesign name="meh" size={16} color={theme.colors.text} />,
        color: "#3b3abc",
      },
    ],
    income: [
      {
        id: "salary",
        name: "Salary",
        icon: (
          <FontAwesome5
            name="money-bill-wave"
            size={16}
            color={theme.colors.text}
          />
        ),
        color: "#10b981",
      },
      {
        id: "freelance",
        name: "Freelance",
        icon: <Feather name="briefcase" size={16} color={theme.colors.text} />,
        color: "#3b82f6",
      },
      {
        id: "personal",
        name: "Personal",
        icon: (
          <MaterialIcons
            name="private-connectivity"
            size={16}
            color={theme.colors.text}
          />
        ),
        color: "#3b8aae",
      },
      {
        id: "others",
        name: "Others",
        icon: <AntDesign name="meh" size={16} color={theme.colors.text} />,
        color: "#3b3abc",
      },
    ],
  };

  const { deleteTransaction } = useExpenseTrack();

  const handleLongPress = async (transactionId: string) => {
    Alert.alert(
      "Transaction Aciton",
      "Do you really want to delete this transaction ?",
      [
        {
          text: "Yes",
          onPress: async () => await deleteTransaction(transactionId),
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const isIncome = transaction.type === "income";
  const categoryList = isIncome ? categories.income : categories.expense;
  const category = categoryList.find((c) => c.id === transaction.category);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !isLast && {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
      ]}
      onLongPress={() => handleLongPress(transaction.id)}
    >
      <View
        style={[
          styles.categoryIcon,
          { backgroundColor: category?.color || "#9CA3AF", borderRadius: 20 },
        ]}
      >
        {category?.icon}
      </View>

      <View style={styles.content}>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {transaction.description}
        </Text>
        <Text style={[styles.details, { color: theme.colors.textSecondary }]}>
          {transaction.category} •{" "}
          {new Date(transaction.date).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <View style={styles.amount}>
          {isIncome ? (
            <AntDesign
              name="arrowup"
              style={styles.indicator}
              size={14}
              color={theme.colors.success}
            />
          ) : (
            <AntDesign
              name="arrowdown"
              style={styles.indicator}
              size={14}
              color={theme.colors.error}
            />
          )}
          <Text
            style={[
              styles.amountText,
              { color: isIncome ? theme.colors.success : theme.colors.error },
            ]}
          >
            ${transaction.amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  description: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    marginBottom: 2,
  },
  details: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  indicator: {
    marginRight: 4,
  },
  amountText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  menuButton: {
    padding: 4,
  },
});
