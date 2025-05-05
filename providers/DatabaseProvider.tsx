import { SQLiteProvider } from "expo-sqlite";

const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SQLiteProvider databaseName="user">
      <SQLiteProvider databaseName="expenses">{children}</SQLiteProvider>;
    </SQLiteProvider>
  );
};

export default DatabaseProvider;
