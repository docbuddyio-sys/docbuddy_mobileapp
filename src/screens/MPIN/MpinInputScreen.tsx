import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const MpinInputScreen = ({ navigation }: any) => {
  const [mpin, setMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState(false);

  const handleContinue = () => {
    // if (mpin.length !== 6) {
    //   console.log("MPIN must be 6 digits");
    //   return;
    // }
    // if (mpin !== confirmMpin) {
    //   console.log("MPINs do not match");
    //   return;
    // }
    // console.log("MPIN created successfully:", mpin);
    // // Handle MPIN creation logic
    navigation.navigate("Onboarding");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header with gradient background */}
        <View className="bg-blue-600 rounded-b-3xl pt-12 pb-16 px-6 relative overflow-hidden">
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
        <View className="flex-1 px-6 pt-8 pb-10">
          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 mb-4">Create a MPIN</Text>

          {/* Subtitle */}
          <Text className="text-sm text-gray-600 mb-8">
            To set up your PIN code 6 digit code then confirm it below
          </Text>

          {/* MPIN Input */}
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-3">Mpin</Text>
            <View className="bg-gray-50 rounded-xl px-4 py-4 flex-row items-center border border-gray-100">
              <TextInput
                className="flex-1 text-base text-gray-900"
                value={mpin}
                onChangeText={setMpin}
                secureTextEntry={!showMpin}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="*** ***"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity onPress={() => setShowMpin(!showMpin)} className="ml-2">
                <Ionicons
                  name={showMpin ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm MPIN Input */}
          <View className="mb-8">
            <Text className="text-base font-semibold text-gray-900 mb-3">Confirm Mpin</Text>
            <View className="bg-gray-50 rounded-xl px-4 py-4 flex-row items-center border border-gray-100">
              <TextInput
                className="flex-1 text-base text-gray-900"
                value={confirmMpin}
                onChangeText={setConfirmMpin}
                secureTextEntry={!showConfirmMpin}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="*** ***"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmMpin(!showConfirmMpin)}
                className="ml-2"
              >
                <Ionicons
                  name={showConfirmMpin ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 items-center"
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MpinInputScreen;
