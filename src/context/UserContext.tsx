import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "../types/types";
import { documentStorage } from "../services/documentStorage";

interface UserContextType {
  user: UserProfile;
  loading: boolean;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  name: "Berlin Smith",
  email: "berlin.smith@example.com",
  phoneNumber: "+91 9876543210",
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
      const storedUser = await documentStorage.getUserProfile();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<UserProfile>) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await documentStorage.saveUserProfile(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, loading }}>{children}</UserContext.Provider>
  );
};
