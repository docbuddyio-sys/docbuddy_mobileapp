import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface SocialLoginButtonsProps {
  onPress: (provider: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onPress }) => {
  return (
    <View className="flex-row justify-between px-2">
      {/* Google */}
      <TouchableOpacity
        className="border border-gray-200 rounded-xl px-8 py-4 items-center justify-center flex-1 mr-2"
        onPress={() => onPress("Google")}
        activeOpacity={0.7}
      >
        <View className="w-8 h-8 items-center justify-center">
          <Text className="text-2xl">G</Text>
        </View>
      </TouchableOpacity>

      {/* Facebook */}
      <TouchableOpacity
        className="border border-gray-200 rounded-xl px-8 py-4 items-center justify-center flex-1 mx-2"
        onPress={() => onPress("Facebook")}
        activeOpacity={0.7}
      >
        <View className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center">
          <Text className="text-white text-xl font-bold">f</Text>
        </View>
      </TouchableOpacity>

      {/* Twitter/X */}
      <TouchableOpacity
        className="border border-gray-200 rounded-xl px-8 py-4 items-center justify-center flex-1 ml-2"
        onPress={() => onPress("Twitter")}
        activeOpacity={0.7}
      >
        <View className="w-8 h-8 items-center justify-center">
          <Text className="text-2xl font-bold">𝕏</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginButtons;
