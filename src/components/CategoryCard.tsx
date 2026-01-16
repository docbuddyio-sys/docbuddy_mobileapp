import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CategoryCardProps {
  id: number;
  name: string;
  count?: number;
  icon: string;
  color: string;
  onPress?: () => void;
  isAddButton?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon,
  count = 0,
  color,
  onPress,
  isAddButton = false,
}) => {
  if (isAddButton) {
    return (
      <TouchableOpacity
        className="w-full bg-white rounded-2xl p-1 items-center justify-center border-2 border-dashed border-blue-400 h-12"
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View className="flex-row items-center">
          <Ionicons name="add" size={24} color="#3B82F6" className="mr-2" />
          <Text className="text-sm font-bold text-blue-600 text-center">
            Add Your Personal{"\n"}Category
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 items-center justify-center border border-neutral-gray100 shadow-sm mr-3"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="mb-2">
        <Ionicons name={icon as any} size={20} color="#3B82F6" />
      </View>
      <Text className="text-neutral-gray900 text-sm font-bold text-center" numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
