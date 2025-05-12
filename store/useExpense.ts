import { create } from "zustand";
import { ExpenseStore, Transaction } from "@/types";
import * as SQLite from "expo-sqlite";

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
        const db = await SQLite.openDatabaseAsync("tracker.db");
        const transactions = (await db.getAllAsync(
          "SELECT * FROM transactions"
        )) as Transaction[];
        set({ transactions: transactions });
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
        const db: SQLite.SQLiteDatabase = await SQLite.openDatabaseAsync(
          "tracker.db"
        );
        const result = await db.runAsync(
          "DELETE FROM transactions WHERE id = ?",
          id
        );
        console.log(result);

        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
          error: null,
        }));
        const newTransactions = (await db.getAllAsync(
          "SELECT * FROM transactions"
        )) as Transaction[];
        set({
          transactions: newTransactions,
          error: null,
        });
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
        const db = await SQLite.openDatabaseAsync("tracker.db");
        await db.execAsync("DROP TABLE IF EXISTS transactions");
        await db.execAsync("DROP TABLE IF EXISTS category");
        await db.execAsync(
          "id TEXT PRIMARY KEY,  amount REAL NOT NULL, description TEXT NOT NULL, TEXT CHECK(type IN ('income', 'expense')) NOT NULL,category TEXT NOT NULL, date TEXT NOT NULL"
        );
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
        const db = await SQLite.openDatabaseAsync("tracker.db");
        console.log(db);

        await db.runAsync(
          "INSERT INTO transactions(id, amount, description,type, category, date) VALUES(?, ?, ?, ?, ?, ?)",
          generateId(),
          amount,
          description,
          type,
          category,
          Date.now()
        );
        const transactions = (await db.getAllAsync(
          "SELECT * FROM transactions"
        )) as Transaction[];
        set({ transactions });
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
        const db = await SQLite.openDatabaseAsync("tracker.db");
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
        const db = await SQLite.openDatabaseAsync("tracker.db");
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
