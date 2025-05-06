import { create } from "zustand";
import { Storage } from "expo-sqlite/kv-store";

interface UserProfile {
  name: string;
  profileImage: string | null;
}

interface UseUserTypes {
  updateProfile: (profileImage: string, name: string) => Promise<void>;
  getUserDetails: () => UserProfile;
}

export const useUser = create<UseUserTypes>(() => ({
  updateProfile: async (image?: string, name?: string) => {
    if (image) Storage.setItemSync("image", image);
    if (name) Storage.setItemSync("name", name);
  },
  getUserDetails: () => {
    const profileImage =
      Storage.getItemSync("image") ||
      "https://images.pexels.com/photos/8873476/pexels-photo-8873476.jpeg";
    const name = Storage.getItemSync("name") || "User";
    return {
      profileImage,
      name,
    };
  },
}));
