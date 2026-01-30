import apiClient from "../client";
import { storage } from "../../utils/storage";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  // Add other user fields as per API spec if known
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface GoogleSignupRequest {
  idToken: string;
}

const AuthService = {
  /**
   * Registers a new user using Google ID Token.
   * Endpoint: POST /api/auth/google-signup
   */
  googleSignup: async (data: GoogleSignupRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/api/auth/google-signup", data);

      const { token, user } = response.data;

      // Persist token and user data
      if (token) {
        await storage.saveToken(token);
      }
      if (user) {
        await storage.saveUser(user);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout helper
   */
  logout: async () => {
    try {
      await storage.clearAll();
    } catch (error) {
      console.error("Error during logout", error);
      await storage.clearAll();
    }
  },
};

export default AuthService;
