import React from "react";
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from "react-native";

interface CustomInputProps extends TextInputProps {
  label: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "sentences",
  className = "",
  ...props
}) => {
  return (
    <View className={`mb-6 ${className}`}>
      <Text className="text-sm font-bold text-neutral-gray800 mb-2 ml-1">{label}</Text>
      <View className="bg-neutral-gray50 rounded-2xl border border-neutral-gray200 px-4 py-4 shadow-sm">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className="text-neutral-gray900 text-base font-medium"
          {...props}
        />
      </View>
    </View>
  );
};

export default CustomInput;
