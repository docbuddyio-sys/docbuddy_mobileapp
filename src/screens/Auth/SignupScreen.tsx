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

  const handleGoogleSignup = async () => {
    alert("Backend Integration in Progress");
    navigation.navigate("OTP");
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
