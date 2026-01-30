import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";
import GoogleSignInButton from "../../components/GoogleSignInButton";

const LoginScreen = ({ navigation }: any) => {
  const handleGoogleLogin = () => {
    console.log("Google Login");
    navigation.navigate("Home");
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
            <GoogleSignInButton onPress={handleGoogleLogin} />

            {/* Trust Text */}
            <Text className="text-xs text-neutral-gray500 text-center mt-4">
              Secure sign-in powered by Google
            </Text>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-12">
            <Text className="text-sm text-neutral-gray600">Don’t have an account?</Text>
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
