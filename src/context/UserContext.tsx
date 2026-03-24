import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "../types/types";
import { storage } from "../utils/storage";

interface UserContextType {
  user: UserProfile;
  loading: boolean;
  /** Call this after a successful login/signup to update context + storage together */
  loginUser: (profile: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  clearUser: () => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  name: "",
  email: "",
  phoneNumber: "",
  profileImage: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Load from SecureStore (saved by auth.service after login/signup)
      const storedUser = await storage.getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Called right after a successful signup/login so the whole app
   * immediately reflects the authenticated user's data.
   */
  const loginUser = (profile: UserProfile) => {
    setUser(profile);
    // storage.saveUser is already called by auth.service, but we refresh
    // state synchronously so no screen flickers with stale data.
  };

  const updateUser = async (updates: Partial<UserProfile>) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await storage.saveUser(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  const clearUser = async () => {
    setUser(DEFAULT_USER);
    await storage.clearAll();
  };

  return (
    <UserContext.Provider value={{ user, updateUser, loginUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
