import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import OrDivider from "../../components/OrDivider";
import SocialLoginButtons from "../../components/SocialLoginButtons";

const LoginScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    // Handle login logic
    console.log("Phone Number:", phoneNumber);
    // Navigate directly to Home screen
    navigation.navigate("Home");
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log("Login with:", provider);
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <AuthHeader />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Content */}
        <View className="px-6 pt-10 pb-12">
          {/* Login Title */}
          <Text className="text-4xl font-bold text-neutral-gray900 mb-2 tracking-tight">
            Welcome back
          </Text>
          <Text className="text-base text-neutral-gray500 mb-10">
            Sign in to access your documents.
          </Text>

          {/* Form */}
          <View className="mb-8">
            {/* Phone Number Input */}
            <CustomInput
              label="Phone Number"
              placeholder="Enter your Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* Submit Button */}
          <CustomButton title="Login" onPress={handleSubmit} className="mb-6" />

          {/* Sign Up Link */}
          <View className="flex-row justify-center mb-10">
            <Text className="text-neutral-gray600 text-sm font-medium">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className="text-primary text-sm font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>

          <OrDivider />

          <SocialLoginButtons onPress={handleSocialLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
