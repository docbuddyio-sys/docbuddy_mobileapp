import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DocumentCardProps {
  id: number | string;
  name: string;
  date: string;
  size: string;
  pages: number;
  onPress?: () => void;
  onDelete?: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  name,
  date,
  size,
  pages,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-[24px] p-4 mb-4 flex-row items-center border border-neutral-gray100 shadow-sm"
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Premium Document Thumbnail */}
      <View className="w-16 h-20 bg-primary-light rounded-2xl mr-4 items-center justify-center border border-white shadow-sm overflow-hidden">
        <Ionicons name="document-text" size={32} color="#3B82F6" />
        <View className="absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-20" />
      </View>

      {/* Document Info */}
      <View className="flex-1">
        <Text
          className="text-md font-bold text-neutral-gray900 mb-1 tracking-tight"
          numberOfLines={1}
        >
          {name}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-xs font-bold text-neutral-gray500 uppercase tracking-wider">
            {date}
          </Text>
          <View className="w-1 h-1 rounded-full bg-neutral-gray300 mx-2" />
          <Text className="text-xs font-bold text-primary uppercase">{size}</Text>
        </View>
        <View className="mt-2 flex-row items-center">
          <View className="bg-neutral-gray100 px-2 py-1 rounded-md">
            <Text className="text-[10px] font-bold text-neutral-gray600 uppercase">
              {pages} Pages
            </Text>
          </View>
        </View>
      </View>

      {/* Refined Action Buttons */}
      <View className="flex-row items-center ml-2">
        <TouchableOpacity
          onPress={onDelete}
          className="w-10 h-10 items-center justify-center bg-red-50 rounded-xl mr-2"
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 items-center justify-center bg-neutral-gray50 rounded-xl">
          <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentCard;
