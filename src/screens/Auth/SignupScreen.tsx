import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AuthHeader from "../../components/AuthHeader";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import AuthService from "../../api/services/auth.service";
import { GOOGLE_AUTH_CONFIG } from "../../api/config/google-auth.config";
import { useUser } from "../../context/UserContext";

type ErrorState =
  | { type: "already_exists"; message: string }
  | { type: "generic"; message: string }
  | null;

const SignupScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState>(null);
  const { loginUser } = useUser();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_CONFIG.webClientId,
    });
  }, []);

  /** Detect "already registered" from message string (API-agnostic) */
  const isAlreadyExistsError = (message: string) => {
    const lower = message.toLowerCase();
    return (
      lower.includes("already") ||
      lower.includes("exists") ||
      lower.includes("registered") ||
      lower.includes("duplicate")
    );
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = (userInfo as any).data?.idToken ?? (userInfo as any).idToken;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      const response = await AuthService.googleSignup({ idToken });

      if (response.success && response.data) {
        loginUser({
          userId: response.data.user_id,
          googleUserId: response.data.googleUserId,
          name: response.data.name,
          email: response.data.email,
          phoneNumber: "",
          profileImage: null,
          accessToken: response.data.access_token,
        });

        navigation.navigate("CreateMpin");
      } else {
        // API returned success: false — classify the error
        const msg = response.message || "Could not create your account.";
        setError({
          type: isAlreadyExistsError(msg) ? "already_exists" : "generic",
          message: msg,
        });
      }
    } catch (err: any) {
      console.error("Google Signup Error:", err);
      const msg =
        err?.response?.data?.message || err.message || "Something went wrong. Please try again.";
      setError({
        type: isAlreadyExistsError(msg) ? "already_exists" : "generic",
        message: msg,
      });
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

            {/* ── Inline Error Banner ── */}
            {error !== null && (
              <View
                className={`rounded-2xl mb-6 overflow-hidden border ${
                  error.type === "already_exists"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {/* Top row: icon + message + dismiss */}
                <View className="flex-row items-start px-4 pt-4 pb-3">
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                      error.type === "already_exists" ? "bg-blue-100" : "bg-red-100"
                    }`}
                  >
                    <Ionicons
                      name={
                        error.type === "already_exists"
                          ? "person-circle-outline"
                          : "alert-circle-outline"
                      }
                      size={18}
                      color={error.type === "already_exists" ? "#2563EB" : "#DC2626"}
                    />
                  </View>

                  <View className="flex-1">
                    <Text
                      className={`text-sm font-semibold mb-0.5 ${
                        error.type === "already_exists" ? "text-blue-800" : "text-red-800"
                      }`}
                    >
                      {error.type === "already_exists"
                        ? "Account already exists"
                        : "Sign up failed"}
                    </Text>
                    <Text
                      className={`text-xs leading-relaxed ${
                        error.type === "already_exists" ? "text-blue-700" : "text-red-700"
                      }`}
                    >
                      {error.type === "already_exists"
                        ? "This Google account is already linked to a Doc Buddy account."
                        : error.message}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setError(null)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    className="ml-2 mt-0.5"
                  >
                    <Ionicons
                      name="close"
                      size={16}
                      color={error.type === "already_exists" ? "#93C5FD" : "#FCA5A5"}
                    />
                  </TouchableOpacity>
                </View>

                {/* CTA row — only shown for already_exists */}
                {error.type === "already_exists" && (
                  <View className="flex-row px-4 pb-4 gap-2">
                    <TouchableOpacity
                      className="flex-1 bg-primary rounded-xl py-3 items-center"
                      activeOpacity={0.85}
                      onPress={() => {
                        setError(null);
                        navigation.navigate("Login");
                      }}
                    >
                      <Text className="text-white text-sm font-semibold">Log in instead</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 bg-blue-100 rounded-xl py-3 items-center"
                      activeOpacity={0.85}
                      onPress={() => setError(null)}
                    >
                      <Text className="text-blue-700 text-sm font-semibold">Try again</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

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

          {/* Footer */}
          <View className="flex-row justify-center mt-12">
            <Text className="text-sm text-neutral-gray600">Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} className="ml-1">
              <Text className="text-sm font-semibold text-primary">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
