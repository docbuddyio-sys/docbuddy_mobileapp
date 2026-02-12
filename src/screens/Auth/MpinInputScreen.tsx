import React, { useState } from "react";
import { View, Text } from "react-native";
import AuthHeader from "../../components/AuthHeader";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const MpinInputScreen = () => {
  const [mpin, setMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState(false);

  const handleContinue = () => {
    if (mpin.length !== 6) {
      console.log("MPIN must be 6 digits");
      return;
    }
    if (mpin !== confirmMpin) {
      console.log("MPINs do not match");
      return;
    }
    console.log("MPIN created successfully:", mpin);
    // Handle MPIN creation logic
  };

  return (
    <View className="flex-1 bg-white">
      <AuthHeader />

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Title */}
        <Text className="text-3xl font-bold text-gray-900 mb-4">Create a MPIN</Text>

        {/* Subtitle */}
        <Text className="text-sm text-gray-600 mb-8">
          To set up your PIN code 6 digit code then confirm it below
        </Text>

        {/* MPIN Input */}
        <CustomInput
          label="Mpin"
          value={mpin}
          onChangeText={setMpin}
          secureTextEntry={!showMpin}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="*** ***"
          rightIcon={<Text className="text-2xl">{showMpin ? "👁️" : "👁️‍🗨️"}</Text>}
          onRightIconPress={() => setShowMpin(!showMpin)}
        />

        {/* Confirm MPIN Input */}
        <CustomInput
          label="Confirm Mpin"
          value={confirmMpin}
          onChangeText={setConfirmMpin}
          secureTextEntry={!showConfirmMpin}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="*** ***"
          rightIcon={<Text className="text-2xl">{showConfirmMpin ? "👁️" : "👁️‍🗨️"}</Text>}
          onRightIconPress={() => setShowConfirmMpin(!showConfirmMpin)}
          className="mb-8"
        />

        {/* Continue Button */}
        <CustomButton title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default MpinInputScreen;
