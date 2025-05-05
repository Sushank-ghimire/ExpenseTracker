import { create } from "zustand";
import * as SQLite from "expo-sqlite";
import { UserProfile } from "@/types";

const db = await SQLite.openDatabaseAsync("user");

await db.execAsync(`
   CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      profileImage TEXT
    );
 `);

type User = {
  id: number;
  name: string;
  profileImage: string;
};

export const useUser = create<UserProfile>((set) => ({
  name: "User",
  profileImage: null,
  getUserData: async () => {
    const user = (await db.getFirstAsync("SELECT * FROM user")) as User;
    if (!user) {
      await db.runAsync(
        "INSERT INTO user (name, profileImage) VALUES (?, ?)",
        "Guest",
        ""
      );
      set({ name: "Guest", profileImage: null });
    }
    set({
      name: user.name,
      profileImage: user.profileImage,
    });
  },
  updateProfile: async (image: string, name?: string) => {
    if (image) {
      await db.runAsync(
        "UPDATE user SET profileImage = ? WHERE id = 1;",
        image
      );
      set({ profileImage: image });
    }
    if (image && name) {
      await db.runAsync(
        "UPDATE user SET profileImage = ?, name = ? WHERE id = 1;",
        image,
        name
      );
      set({ profileImage: image, name: name });
    }
    set({ name: name });
  },
}));
