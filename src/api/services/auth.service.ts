import apiClient from "../client";
import { storage } from "../../utils/storage";
import { UserProfile } from "../../types/types";

export interface GoogleSignupRequest {
  idToken: string;
}

export interface MpinRequest {
  deviceId: string;
  mpin: string;
}

export interface MpinSetupResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    token: string;
  };
  timestamp: string;
}

export interface MpinLoginResponse {
  token: string;
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  roles: string;
}

/**
 * Maps the raw API data to UserProfile used throughout the app.
 */
const mapToUserProfile = (data: any): UserProfile => ({
  userId: data.user_id,
  googleUserId: data.googleUserId,
  name: data.name,
  email: data.email,
  phoneNumber: "",
  profileImage: null,
  accessToken: data.access_token || data.token || data.accessToken,
});

const AuthService = {
  /**
   * Registers a new user using Google ID Token.
   * Endpoint: POST /api/v1/auth/google-signup
   */
  googleSignup: async (data: GoogleSignupRequest) => {
    try {
      const response = await apiClient.post("/api/v1/auth/google-signup", data);
      const apiResponse = response.data;

      if (apiResponse.success && apiResponse.data) {
        const extractedToken =
          apiResponse.data.access_token || apiResponse.data.token || apiResponse.data.accessToken;

        const userProfile = mapToUserProfile(apiResponse.data);

        if (extractedToken) {
          await storage.saveToken(extractedToken);
        }
        await storage.saveUser(userProfile);
      }

      return apiResponse;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Signs in an existing user using Google ID Token.
   * Endpoint: POST /api/v1/auth/google-login
   */
  googleLogin: async (data: GoogleSignupRequest) => {
    try {
      const response = await apiClient.post("/api/v1/auth/google-login", data);
      const apiResponse = response.data;

      if (apiResponse.success && apiResponse.data) {
        const extractedToken =
          apiResponse.data.access_token || apiResponse.data.token || apiResponse.data.accessToken;

        const userProfile = mapToUserProfile(apiResponse.data);

        if (extractedToken) {
          await storage.saveToken(extractedToken);
        }
        await storage.saveUser(userProfile);
      }

      return apiResponse;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Sets up MPIN for the user.
   * Reads the access_token saved during Google signup/login from storage
   * and passes it as the Authorization header.
   * Endpoint: POST /api/v1/auth/mpin-setup
   */
  mpinSetup: async (data: MpinRequest): Promise<MpinSetupResponse> => {
    try {
      const token = await storage.getToken();

      if (!token) {
        throw new Error("No access token found. Please sign in again.");
      }
      const response = await apiClient.post<MpinSetupResponse>("/api/v1/auth/mpin-setup", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiResponse = response.data;

      // After MPIN setup, backend returns a new token — save it
      if (apiResponse.success && apiResponse.data?.token) {
        await storage.saveToken(apiResponse.data.token);
      }

      return apiResponse;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logs in an existing user using MPIN.
   * Also reads token from storage — no need to pass it manually from the screen.
   * Endpoint: POST /api/v1/auth/mpin-login
   */
  mpinLogin: async (data: MpinRequest): Promise<MpinLoginResponse> => {
    try {
      const token = await storage.getToken();

      if (!token) {
        throw new Error("No access token found. Please sign in again.");
      }

      const response = await apiClient.post<MpinLoginResponse>("/api/v1/auth/mpin-login", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const apiResponse = response.data;

      console.log("MPIN apiResponse", apiResponse);

      if (apiResponse.token) {
        await storage.saveToken(apiResponse.token);
      }

      return apiResponse;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout helper – clears all SecureStore data.
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
