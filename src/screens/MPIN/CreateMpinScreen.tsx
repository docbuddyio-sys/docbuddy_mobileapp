import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const CreateMpinScreen = ({ navigation }: any) => {
  const [userName] = useState("Berlin Smith");

  const handleCreateMpin = () => {
    console.log("Navigate to MPIN creation");
    // Handle navigation to MPIN creation flow
    navigation.navigate("MpinInput");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header with gradient background */}
        <View className="bg-blue-600 rounded-b-3xl pt-12 pb-20 px-6 relative overflow-hidden">
          {/* Gradient effect - using absolute positioned views */}
          <View
            className="absolute top-0 left-0 right-0 bottom-0 bg-blue-700 opacity-30"
            style={{ transform: [{ rotate: "-15deg" }, { scale: 1.5 }] }}
          />

          {/* Logo */}
          <View className="items-center justify-center mt-8">
            <View className="bg-white rounded-2xl p-6 shadow-lg">
              <View className="w-16 h-16 bg-blue-500 rounded-lg items-center justify-center relative">
                <View className="absolute top-2 right-2 w-8 h-8 bg-blue-300 rounded opacity-50" />
                <View className="w-6 h-8 bg-blue-600 rounded-sm" />
                <View
                  className="absolute bottom-3 left-1/2 w-2 h-2 bg-white rounded-full"
                  style={{ transform: [{ translateX: -4 }] }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pt-12 pb-10 items-center">
          {/* Profile Avatar */}
          <View className="mb-6">
            <View className="w-24 h-24 rounded-full bg-orange-100 border-4 border-blue-500 items-center justify-center overflow-hidden">
              {/* Avatar placeholder - you can replace with actual image */}
              <View className="w-full h-full items-center justify-center bg-orange-200">
                <Text className="text-4xl">👨‍💼</Text>
              </View>
            </View>
          </View>

          {/* User Name */}
          <Text className="text-2xl font-bold text-gray-900 mb-4">{userName}</Text>

          {/* Subtitle */}
          <Text className="text-base text-gray-600 text-center mb-12 px-4">
            Hello , We Need You to Verify{"\n"}Your Profile
          </Text>

          {/* Create MPIN Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 px-12 w-full max-w-sm"
            onPress={handleCreateMpin}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold text-center">Create the Mpin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateMpinScreen;
