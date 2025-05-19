import { create } from "zustand";
import { ExpenseStore, Transaction } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "expenseData";

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useExpenseTrack = create<ExpenseStore>((set, get) => {
  return {
    transactions: [],
    error: null,
    isLoading: false,

    getTransactions: async () => {
      set({ isLoading: true });
      try {
        const storedData = await AsyncStorage.getItem("expenseData");
        const data: Transaction[] = storedData ? JSON.parse(storedData) : [];
        set({ transactions: data });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to get the transactions",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    addTransaction: async (amount, description, type, category) => {
      set({ isLoading: true, error: null });

      try {
        const newTransaction: Transaction = {
          id: generateId(),
          amount,
          description,
          type,
          category,
          date: new Date().toISOString(),
        };

        const currentTransactions = get().transactions;
        const updatedTransactions = [...currentTransactions, newTransaction];

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedTransactions)
        );

        set({ transactions: updatedTransactions });
        return true;
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to add transaction",
        });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    deleteTransaction: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const currentTransactions = get().transactions;
        const updatedTransactions = currentTransactions.filter(
          (t) => t.id !== id
        );

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedTransactions)
        );

        set({ transactions: updatedTransactions });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to delete transaction",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    resetAllData: async () => {
      set({ isLoading: true, error: null });
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        set({ transactions: [] });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to reset your data",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    exportData: async () => {
      set({ isLoading: true, error: null });
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        const data = storedData ? JSON.parse(storedData) : [];
        const jsonString = JSON.stringify(data, null, 2);
        console.log(jsonString);
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to export your data",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    addCategory: async (category: string) => {
      set({ isLoading: true });
      try {
        console.log(`Category added: ${category}`);
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Failed to add category",
        });
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },
    getTotalExpenseAndIncome: async () => {
      const { transactions } = get();

      const totals = transactions.reduce(
        (acc, tx) => {
          if (tx.type === "income") {
            acc.income += tx.amount;
          } else if (tx.type === "expense") {
            acc.expense += tx.amount;
          }
          return acc;
        },
        { income: 0, expense: 0 }
      );
      return totals;
    },
  };
});
