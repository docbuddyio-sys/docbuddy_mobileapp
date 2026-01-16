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

const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    // Handle signup logic
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    // Navigate to OTP screen
    navigation.navigate("OTP");
  };

  const handleSocialLogin = (provider: string) => {
    console.log("Login with:", provider);
    navigation.navigate("OTP");
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
          {/* Title */}
          <Text className="text-4xl font-bold text-neutral-gray900 mb-2 tracking-tight">
            Create an account
          </Text>
          <Text className="text-base text-neutral-gray500 mb-10">
            Join Doc Buddy to manage your documents professionally.
          </Text>

          {/* Form */}
          <View className="mb-8">
            {/* Name Input */}
            <CustomInput
              label="Full Name"
              placeholder="Enter your Name"
              value={name}
              onChangeText={setName}
            />

            {/* Email Input */}
            <CustomInput
              label="Email Address"
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

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
          <CustomButton title="Create Account" onPress={handleSubmit} className="mb-6" />

          {/* Login Link */}
          <View className="flex-row justify-center mb-10">
            <Text className="text-neutral-gray600 text-sm font-medium">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-primary text-sm font-bold">Login</Text>
            </TouchableOpacity>
          </View>

          <OrDivider />

          <SocialLoginButtons onPress={handleSocialLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
