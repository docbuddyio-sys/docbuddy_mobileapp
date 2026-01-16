import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";
import CustomButton from "../../components/CustomButton";

const OTPScreen = ({ navigation }: any) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow single digit
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    console.log("OTP Code:", otpCode);
    // Handle OTP verification logic
    navigation.navigate("CreateMpin");
  };

  const handleResendOTP = () => {
    console.log("Resend OTP");
    // Handle resend OTP logic
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
        <View className="px-6 pt-8 pb-10">
          {/* Title */}
          <Text className="text-4xl font-bold text-gray-900 mb-6">OTP Verification</Text>

          {/* Subtitle */}
          <Text className="text-base text-gray-600 mb-8">
            Enter the OTP sent to <Text className="font-bold text-gray-900">+91 9879987333</Text>
          </Text>

          {/* OTP Input Boxes */}
          <View className="flex-row justify-between mb-4 px-4">
            {otp.map((digit, index) => (
              <View key={index} className="flex-1 mx-2">
                <TextInput
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  className="border-b-2 border-gray-300 text-center text-4xl font-semibold text-gray-900 pb-2"
                  style={{ borderBottomColor: digit ? "#2563EB" : "#D1D5DB" }}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              </View>
            ))}
          </View>

          {/* Resend OTP */}
          <View className="flex-row justify-center mb-12">
            <Text className="text-gray-400 text-sm">Didn't you receive the OTP? </Text>
            <TouchableOpacity onPress={handleResendOTP}>
              <Text className="text-blue-600 text-sm font-semibold">Resend OTP</Text>
            </TouchableOpacity>
          </View>

          {/* Verify Button */}
          <CustomButton title="Verify" onPress={handleVerify} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;
