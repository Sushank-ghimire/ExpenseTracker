import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Transaction } from "@/types";
import { useTheme } from "@/providers/ThemeProvider";

interface TransactionItemProps {
  transaction: Transaction;
  isLast?: boolean;
}

export default function TransactionItem({
  transaction,
  isLast = false,
}: TransactionItemProps) {
  const { theme } = useTheme();

  const isIncome = transaction.type === "income";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !isLast && {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.categoryIcon,
          // { backgroundColor: category?.color || "#9CA3AF" },
        ]}
      >
        {/* {category?.icon} */}
      </View>

      <View style={styles.content}>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {transaction.description}
        </Text>
        <Text style={[styles.details, { color: theme.colors.textSecondary }]}>
          {/* {category?.name} • {formatDate(transaction.date)} */}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        {/* <View style={styles.amount}>
          {isIncome ? (
            <ArrowDown
              size={14}
              color={theme.colors.success}
              style={styles.indicator}
            />
          ) : (
            <ArrowUp
              size={14}
              color={theme.colors.error}
              style={styles.indicator}
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
        </View> */}
        <TouchableOpacity style={styles.menuButton}>
          {/* <MoreVertical size={16} color={theme.colors.textSecondary} /> */}
        </TouchableOpacity>
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
