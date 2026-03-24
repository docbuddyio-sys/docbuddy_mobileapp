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
  Alert,
  ActivityIndicator,
} from "react-native";
import AuthService from "../../api/services/auth.service";
import { useUser } from "../../context/UserContext";
import { getDeviceId } from "../../utils/deviceId";

const MpinLoginScreen = ({ navigation }: any) => {
  const [mpin, setMpin] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser, user } = useUser();

  const handleLogin = async () => {
    setError(null);
    if (mpin.length !== 6) {
      setError("MPIN must be 6 digits.");
      return;
    }

    try {
      setIsLoading(true);

      const deviceId = await getDeviceId();

      const response = await AuthService.mpinLogin({
        deviceId,
        mpin,
      });

      console.log("mpin login .........", response);

      if (response.token) {
        await updateUser({ accessToken: response.token });
        if (response.name) {
          await updateUser({ name: response.name, email: response.email });
        }
        navigation.navigate("Home");
      } else {
        setError("Invalid MPIN or unexpected response.");
      }
    } catch (err: any) {
      console.error("MPIN Login Error:", err);
      const msg =
        err?.response?.data?.errors || err?.errors || "Something went wrong during MPIN login.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
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
          <View
            className="absolute top-0 left-0 right-0 bottom-0 bg-blue-700 opacity-30"
            style={{ transform: [{ rotate: "-15deg" }, { scale: 1.5 }] }}
          />
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
          {user?.name ? (
            <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
              Welcome back, {user.name}
            </Text>
          ) : null}

          <Text className="text-3xl font-bold text-gray-900 mb-4">Enter MPIN</Text>
          <Text className="text-sm text-gray-600 mb-8">
            Please enter your 6-digit MPIN to access your account.
          </Text>

          {/* ── Inline Error Banner ── */}
          {error !== null && (
            <View className="rounded-2xl mb-6 overflow-hidden border bg-red-50 border-red-200">
              <View className="flex-row items-start px-4 pt-4 pb-3">
                <View className="w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5 flex-shrink-0 bg-red-100">
                  <Ionicons name="alert-circle-outline" size={18} color="#DC2626" />
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-semibold mb-0.5 text-red-800">
                    Login Failed
                  </Text>
                  <Text className="text-xs leading-relaxed text-red-700">
                    {error}
                  </Text>
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
          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-900 mb-3">MPIN</Text>
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
                autoFocus
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

          {/* Log In Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 items-center"
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-lg font-semibold">Log In</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MpinLoginScreen;
