import React from "react";
import { View, Text, ImageBackground } from "react-native";

const AuthHeader = () => {
  return (
    <ImageBackground
      source={require("../../assets/pattern.png")}
      resizeMode="cover"
      className="bg-primary px-6 pt-14 pb-12 rounded-b-3xl overflow-hidden"
    >
      <View className="items-center">
        <View className="bg-white rounded-2xl w-14 h-14 items-center justify-center mb-4">
          <View className="w-6 h-8 bg-primary rounded-md" />
        </View>

        <Text className="text-white text-2xl font-semibold tracking-tight">Doc Buddy</Text>

        <Text className="text-white/70 text-sm mt-1">Professional document management</Text>
      </View>
    </ImageBackground>
  );
};

export default AuthHeader;
