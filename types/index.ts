export interface DatabaseContextType {
  isFirstLaunch: boolean;
  completeOnboarding: () => void;
  getUserProfile: () => UserProfile;
  updateUserProfile: (profile: UserProfile) => void;
  getTransactions: (limit?: number) => Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  getExpensesByCategory: () => {
    id: string;
    name: string;
    amount: number;
    color: string;
  }[];
  getMonthlyBudget: () => { spent: number; budget: number };
  getMonthlySummary: () => { income: number; expenses: number };
  getIncomeExpenseData: (
    period: string,
    month: number,
    year: number
  ) => {
    incomeData: number[];
    expenseData: number[];
    dates: string[];
  };
  getCategoryData: (
    period: string,
    month: number,
    year: number
  ) => {
    id: string;
    name: string;
    amount: number;
    color: string;
  }[];
  exportData: () => Promise<string>;
  importData: () => Promise<void>;
  resetAllData: () => void;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: string; // 'income' | 'expense'
  category: string; // Category ID
  date: string; // ISO date string
}

export interface UserProfile  {
  name: string;
  profileImage: string | null;
  getUserData: () => Promise<void>;
  updateProfile: (image: string, name?: string) => Promise<void>;
};

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  date: string; // ISO date string
}
