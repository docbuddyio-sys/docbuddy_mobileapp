import React from "react";
import { View, Text } from "react-native";

const AuthHeader = () => {
  return (
    <View className="bg-primary pt-12 pb-16 px-6 relative overflow-hidden rounded-b-[40px]">
      {/* Background patterns for premium feel */}
      <View className="absolute top-0 right-0 w-32 h-32 bg-primary-dark opacity-20 rounded-full -mr-16 -mt-16" />
      <View className="absolute bottom-0 left-0 w-24 h-24 bg-primary-dark opacity-10 rounded-full -ml-8 -mb-8" />

      {/* Logo Container */}
      <View className="items-center justify-center mt-4">
        <View className="bg-white rounded-[24px] p-5 shadow-2xl">
          <View className="w-16 h-16 bg-primary rounded-xl items-center justify-center relative">
            <View className="absolute top-2 right-2 w-8 h-8 bg-blue-300 rounded-md opacity-40" />
            <View className="w-6 h-8 bg-white rounded-sm opacity-90" />
            <View
              className="absolute bottom-3 left-1/2 w-2 h-2 bg-primary-dark rounded-full"
              style={{ transform: [{ translateX: -4 }] }}
            />
          </View>
        </View>

        <Text className="text-white text-2xl font-bold mt-4 tracking-tight">Doc Buddy</Text>
      </View>
    </View>
  );
};

export default AuthHeader;
