import { create } from "zustand";
import { DatabaseType, Transaction } from "@/types";
import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("tracker");
const categories = await SQLite.openDatabaseAsync("categories");

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
};

interface ExpenseStore {
  transactions: Transaction[];
  getTransactions: () => void;
  deleteTransaction: (id: string) => void;
  getMonthlyBudget: () => void;
  budget: number | 0;
  resetAllData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  exportData: () => Promise<void>;
  addTransaction: (
    amount: number,
    description: string,
    type: "income" | "expense",
    category: string
  ) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
}

export const useExpenseTrack = create<ExpenseStore>((set) => ({
  transactions: [],
  budget: 0,
  error: null,
  isLoading: false,
  getTransactions: () => {
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
  deleteTransaction: (id) => {
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
  getMonthlyBudget: () => {},
  resetAllData: async () => {
    set({ isLoading: true });
    try {
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to reset your data",
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
          error instanceof Error ? error.message : "Failed to add transaction",
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
          error instanceof Error ? error.message : "Failed to export your data",
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
}));
