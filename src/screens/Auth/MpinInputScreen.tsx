import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthHeader from "../../components/AuthHeader";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import AuthService from "../../api/services/auth.service";
import { useUser } from "../../context/UserContext";
import { getDeviceId } from "../../utils/deviceId";

const MpinInputScreen = ({ navigation }: any) => {
  const [mpin, setMpin] = useState("");
  const [confirmMpin, setConfirmMpin] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateUser } = useUser();

  const handleContinue = async () => {
    setError(null);
    if (mpin.length !== 6) {
      setError("MPIN must be 6 digits.");
      return;
    }
    if (mpin !== confirmMpin) {
      setError("MPINs do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const deviceId = await getDeviceId();
      const response = await AuthService.mpinSetup({
        deviceId,
        mpin,
      });

      if (response.success && response.data) {
        await updateUser({ accessToken: response.data.token });
        navigation.navigate("Onboarding");
      } else {
        setError(response.message || "Could not set up MPIN.");
      }
    } catch (err: any) {
      console.error("MPIN Setup Error:", err);
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong during MPIN setup.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
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

        {/* ── Inline Error Banner ── */}
        {error !== null && (
          <View className="rounded-2xl mb-6 overflow-hidden border bg-red-50 border-red-200">
            <View className="flex-row items-start px-4 pt-4 pb-3">
              <View className="w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5 flex-shrink-0 bg-red-100">
                <Ionicons name="alert-circle-outline" size={18} color="#DC2626" />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-semibold mb-0.5 text-red-800">Setup Failed</Text>
                <Text className="text-xs leading-relaxed text-red-700">{error}</Text>
              </View>

              <TouchableOpacity
                onPress={() => setError(null)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                className="ml-2 mt-0.5"
              >
                <Ionicons name="close" size={16} color="#FCA5A5" />
              </TouchableOpacity>
            </View>
          </View>
        )}

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
        <TouchableOpacity
          className="bg-primary rounded-xl p-4 items-center shadow-lg shadow-primary/20"
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-bold tracking-tight">Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MpinInputScreen;
