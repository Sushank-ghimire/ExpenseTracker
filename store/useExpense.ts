import { create } from "zustand";
import { ExpenseStore } from "@/types";

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
};

export const useExpenseTrack = create<ExpenseStore>((set) => {
  return {
    transactions: [],
    error: null,
    isLoading: false,

    getTransactions: async () => {
      set({ isLoading: true });
      try {
        // Use `db` when ready
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
      try {
        console.log(amount, description, type, category, Date.now());
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to add transaction",
        });
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

    addCategory: async () => {
      set({ isLoading: true });
      try {
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Failed to add category",
        });
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
