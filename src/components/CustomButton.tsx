import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, className = "", ...props }) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-xl p-2 text-xs items-center shadow-lg shadow-primary/20 ${className}`}
      activeOpacity={0.8}
      {...props}
    >
      <Text className="text-white text-sm font-bold tracking-tight">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
