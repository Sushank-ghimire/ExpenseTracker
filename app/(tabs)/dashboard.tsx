import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import SafeAreaBackground from "@/components/SafeAreaBackground";
import { useExpenseTrack } from "@/store/useExpense";

const ExpenseDashboard = () => {
  const { theme } = useTheme();
  const { addTransaction, isLoading } = useExpenseTrack();

  const dummyCategories = {
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

  const transactionTypes = [
    {
      id: "expense",
      label: "Expense",
      icon: <Feather name="arrow-up" size={20} color={theme.colors.text} />,
      color: "#F87171",
    },
    {
      id: "income",
      label: "Income",
      icon: <Feather name="arrow-down" size={20} color={theme.colors.text} />,
      color: "#4ADE80",
    },
  ];

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState<"expense" | "income">(
    "expense"
  );
  const [selectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = dummyCategories[selectedType];

  const cardScale = useSharedValue(0.95);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    cardScale.value = withSpring(1);
    cardOpacity.value = withSpring(1);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const handleSelectType = (type: any) => {
    setSelectedType(type);
    setSelectedCategory("");
  };

  const handleAlertMessageAndModel = (title: string, description: string) => {
    Alert.alert(title, description, [
      {
        text: "Sure",
      },
    ]);
  };

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      handleAlertMessageAndModel(
        "Invalid Amount",
        "Please enter a valid amount."
      );
      return;
    }

    if (!description.trim()) {
      handleAlertMessageAndModel(
        "Missing Description",
        "Please enter a description."
      );
      return;
    }
    if (!selectedCategory) {
      handleAlertMessageAndModel(
        "Missing Category",
        "Please select a category."
      );
      return;
    }
    addTransaction(+amount, description, selectedType, selectedCategory);
  };
  return (
    <SafeAreaBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16, position: "relative" }}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Daily Expense Track
            </Text>
          </View>
          <Animated.View
            style={[
              styles.card,
              { backgroundColor: theme.colors.card },
              cardAnimatedStyle,
            ]}
          >
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Amount
            </Text>
            <TextInput
              style={[
                styles.input,
                { color: theme.colors.text, borderColor: theme.colors.border },
              ]}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={theme.colors.textSecondary}
              value={amount}
              onChangeText={setAmount}
            />
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Description
            </Text>
            <TextInput
              style={[
                styles.input,
                { color: theme.colors.text, borderColor: theme.colors.border },
              ]}
              placeholder="e.g. Lunch, Salary..."
              placeholderTextColor={theme.colors.textSecondary}
              value={description}
              onChangeText={setDescription}
            />
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Transaction Type
            </Text>
            <View style={styles.typeContainer}>
              {transactionTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        selectedType === type.id
                          ? type.color
                          : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => handleSelectType(type.id)}
                >
                  {type.icon}
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color:
                          selectedType === type.id ? "#fff" : theme.colors.text,
                      },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Category
            </Text>
            <View style={styles.typeContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        selectedCategory === cat.id
                          ? cat.color
                          : theme.colors.card,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  {cat.icon}
                  <Text style={[styles.typeText, { color: theme.colors.text }]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Date
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text style={{ color: theme.colors.text }}>
                {selectedDate.toDateString()}
              </Text>
              <Feather
                name="calendar"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>Save Transaction</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaBackground>
  );
};

export default ExpenseDashboard;

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
    fontSize: 28,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  saveButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
