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
  rightIcon,
  onRightIconPress,
  className = "",
  ...props
}) => {
  return (
    <View className={`mb-5 ${className}`}>
      {/* Label */}
      <Text className="text-xs font-medium text-neutral-gray600 mb-1 ml-1">{label}</Text>

      {/* Input Container */}
      <View className="flex-row items-center bg-white border border-neutral-gray300 rounded-xl px-4 h-12">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className="flex-1 text-base text-neutral-gray900"
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} activeOpacity={0.7} className="ml-3">
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
