import { create } from "zustand";
import { ExpenseStore, Transaction } from "@/types";

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useExpenseTrack = create<ExpenseStore>((set) => {
  return {
    transactions: [],
    error: null,
    isLoading: false,

    getTransactions: async () => {
      set({ isLoading: true });
      try {
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

    deleteTransaction: async (id) => {
      set({ isLoading: true });
      try {
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to delete transaction",
        });
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },

    resetAllData: async () => {
      set({ isLoading: true });
      try {
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

    addTransaction: async (amount, description, type, category) => {
      set({ isLoading: true });
      console.log(amount, description, type, category);

      try {
        return true;
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to add transaction",
        });
        console.log(error);
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    exportData: async () => {
      set({ isLoading: true });
      try {
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
  };
});
