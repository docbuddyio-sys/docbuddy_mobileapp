import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AuthHeader from "../../components/AuthHeader";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import AuthService from "../../api/services/auth.service";
import { GOOGLE_AUTH_CONFIG } from "../../api/config/google-auth.config";

// Required for web browser to close properly after auth
WebBrowser.maybeCompleteAuthSession();

const SignupScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  // Configure Google Auth Request
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_AUTH_CONFIG.webClientId,
  });

  // Handle Google Sign-In response
  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleSignupWithToken(id_token);
    } else if (response?.type === "error") {
      Alert.alert("Authentication Error", "Failed to sign in with Google. Please try again.");
    }
  }, [response]);

  const handleGoogleSignupWithToken = async (idToken: string) => {
    try {
      setIsLoading(true);

      // Call our backend API with the real idToken
      const apiResponse = await AuthService.googleSignup({ idToken });

      console.log("Signup success:", apiResponse);

      // Check if we got a token back (user is authenticated)
      if (apiResponse.token) {
        // Token is already saved by AuthService, navigate to main app
        // You can replace "OTP" with your main app screen (e.g., "Home", "Dashboard")
        navigation.navigate("OTP");
      } else {
        Alert.alert("Signup Error", "Authentication successful but no token received.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      Alert.alert(
        "Signup Failed",
        error.message || "An error occurred during Google signup. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      // Trigger the Google Sign-In flow
      await promptAsync();
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      Alert.alert("Error", "Failed to initiate Google sign-in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <AuthHeader />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-10 pb-10 justify-between">
          <View>
            <Text className="text-2xl font-semibold text-neutral-gray900 tracking-tight">
              Create your account
            </Text>

            <Text className="text-base text-neutral-gray600 mt-2 mb-8 leading-relaxed">
              Join Doc Buddy to manage your documents securely and professionally.
            </Text>

            {isLoading ? (
              <View className="h-12 items-center justify-center">
                <ActivityIndicator color="#0F4CCD" />
              </View>
            ) : (
              <GoogleSignInButton onPress={handleGoogleSignup} />
            )}

            <Text className="text-xs text-neutral-gray500 text-center mt-3">
              Secure sign-in powered by Google
            </Text>
          </View>

          <View className="pt-8">
            <View className="flex-row justify-center">
              <Text className="text-sm text-neutral-gray600">Already have an account? </Text>
              <TouchableOpacity disabled={isLoading} onPress={() => navigation.navigate("Login")}>
                <Text
                  className={`text-sm font-medium ${isLoading ? "text-neutral-gray400" : "text-primary"}`}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
