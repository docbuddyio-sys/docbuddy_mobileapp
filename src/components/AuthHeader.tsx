import React from "react";
import { View, Text } from "react-native";

const AuthHeader = () => {
  return (
    <View className="bg-primary px-6 pt-14 pb-12 rounded-b-3xl">
      <View className="items-center">
        {/* Logo */}
        <View className="bg-white rounded-2xl w-14 h-14 items-center justify-center mb-4">
          {/* Minimal logo mark */}
          <View className="w-6 h-8 bg-primary rounded-md" />
        </View>

        {/* App Name */}
        <Text className="text-white text-2xl font-semibold tracking-tight">Doc Buddy</Text>

        {/* Tagline (optional but premium) */}
        <Text className="text-white/70 text-sm mt-1">Professional document management</Text>
      </View>
    </View>
  );
};

export default AuthHeader;
