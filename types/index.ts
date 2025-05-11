export interface ExpenseStore {
  transactions: Transaction[];
  getTransactions: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  resetAllData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  exportData: () => Promise<void>;
  addTransaction: (
    amount: number,
    description: string,
    type: "income" | "expense",
    category: string
  ) => Promise<boolean>;
  addCategory: (name: string) => Promise<void>;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: string | "income" | "expense"; // 'income' | 'expense'
  category: string; // Category ID
  date: string; // ISO date string
}

export interface UserProfile {
  name: string;
  profileImage: string | null;
  getUserData: () => Promise<void>;
  updateProfile: (image: string, name?: string) => Promise<void>;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  date: string;
}
