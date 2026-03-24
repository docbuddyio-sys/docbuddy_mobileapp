import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AuthHeader from "../../components/AuthHeader";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import AuthService from "../../api/services/auth.service";
import { GOOGLE_AUTH_CONFIG } from "../../api/config/google-auth.config";
import { useUser } from "../../context/UserContext";

const LoginScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loginUser } = useUser();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_CONFIG.webClientId,
    });
  }, []);

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = (userInfo as any).data?.idToken ?? (userInfo as any).idToken;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      const response = await AuthService.googleLogin({ idToken });

      console.log("response", response);
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
        setError(response.message || "Could not sign you in. Please try again.");
      }
    } catch (err: any) {
      console.error("Google Login Error:", err);
      setError(err?.message || "Something went wrong during Google Sign-In.");
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

            <Text className="text-sm text-neutral-gray600 leading-relaxed mb-8">
              Sign in to Doc Buddy and continue managing your documents securely and professionally.
            </Text>

            {/* ── Inline Error Banner ── */}
            {error !== null && (
              <View className="rounded-2xl mb-6 overflow-hidden border bg-red-50 border-red-200">
                <View className="flex-row items-start px-4 pt-4 pb-3">
                  <View className="w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5 flex-shrink-0 bg-red-100">
                    <Ionicons name="alert-circle-outline" size={18} color="#DC2626" />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold mb-0.5 text-red-800">Login Failed</Text>
                    <Text className="text-xs leading-relaxed text-red-700">{error}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setError(null)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    className="ml-2 mt-0.5"
                  >
                    <Ionicons name="close" size={16} color="#FCA5A5" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

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
