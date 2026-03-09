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

const SignupScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_CONFIG.webClientId,
    });
  }, []);

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      if (!tokens.idToken) {
        throw new Error("No ID token received from Google");
      }

      await AuthService.googleSignup({ idToken: tokens.idToken });
      
      navigation.navigate("OTP");
    } catch (error: any) {
      console.error("Google Signup Error:", error);
      Alert.alert("Signup Failed", error.message || "Something went wrong during Google Sign-In.");
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
