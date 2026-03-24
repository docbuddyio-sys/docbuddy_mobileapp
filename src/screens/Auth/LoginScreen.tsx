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
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AuthHeader from "../../components/AuthHeader";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import AuthService from "../../api/services/auth.service";
import { GOOGLE_AUTH_CONFIG } from "../../api/config/google-auth.config";
import { useUser } from "../../context/UserContext";

const LoginScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useUser();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_CONFIG.webClientId,
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = (userInfo as any).data?.idToken ?? (userInfo as any).idToken;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      const response = await AuthService.googleLogin({ idToken });
      console.log(response);

      if (response.success && response.data) {
        // Push the authenticated user into context so all screens reflect it
        loginUser({
          userId: response.data.user_id,
          googleUserId: response.data.googleUserId,
          name: response.data.name,
          email: response.data.email,
          phoneNumber: "",
          profileImage: null,
          accessToken: response.data.access_token,
        });

        navigation.navigate("MpinLogin");
      } else {
        Alert.alert("Login Failed", response.message || "Could not sign you in. Please try again.");
      }
    } catch (error: any) {
      console.error("Google Login Error:", error);
      Alert.alert("Login Failed", error.message || "Something went wrong during Google Sign-In.");
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
        <View className="flex-1 px-6 pt-16 pb-12 justify-between">
          {/* Top Content */}
          <View>
            <Text className="text-3xl font-bold text-neutral-gray900 tracking-tight mb-3">
              Welcome back
            </Text>

            <Text className="text-sm text-neutral-gray600 leading-relaxed mb-12">
              Sign in to Doc Buddy and continue managing your documents securely and professionally.
            </Text>

            {/* Google Login */}
            {isLoading ? (
              <View className="h-12 items-center justify-center">
                <ActivityIndicator color="#0F4CCD" />
              </View>
            ) : (
              <GoogleSignInButton onPress={handleGoogleLogin} />
            )}

            {/* Trust Text */}
            <Text className="text-xs text-neutral-gray500 text-center mt-4">
              Secure sign-in powered by Google
            </Text>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-12">
            <Text className="text-sm text-neutral-gray600">Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")} className="ml-1">
              <Text className="text-sm font-semibold text-primary">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
