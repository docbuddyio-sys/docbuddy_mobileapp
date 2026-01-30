import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import GoogleIcon from "./GoogleIcon"; // adjust path if needed

interface GoogleSignInButtonProps {
  onPress: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="flex-row items-center justify-center h-12 rounded-xl border border-neutral-gray300 bg-white"
    >
      <GoogleIcon width={20} height={20} />
      <Text className="ml-3 text-base font-medium text-neutral-gray900">Continue with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;
