import { create } from "zustand";
import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("expenses");

await db.execAsync(``);

export const useExpenseTrack = create((get) => ({}));
