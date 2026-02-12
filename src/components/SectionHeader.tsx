import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SectionHeaderProps {
  title?: string;
  userName?: string;
  showSearch?: boolean;
  onBackPress?: () => void;
  onAvatarPress?: () => void;
  rightElement?: React.ReactNode;
  isHome?: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  userImageUrl?: string | null;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  userName,
  showSearch = true,
  onBackPress,
  onAvatarPress,
  rightElement,
  isHome = false,
  searchValue,
  onSearchChange,
  userImageUrl,
}) => {
  return (
    <View className="bg-primary pt-14 pb-8 px-6 relative overflow-hidden rounded-b-[32px]">
      {/* Subtle glassmorphism/gradient effect */}
      <View
        className="absolute top-0 left-0 right-0 bottom-0 bg-primary-dark opacity-10"
        style={{ transform: [{ rotate: "-15deg" }, { scale: 1.5 }] }}
      />

      {isHome ? (
        <View className="flex-row items-center justify-between mb-8 z-10">
          <View className="flex-row items-center">
            {/* Avatar matching image */}
            <TouchableOpacity
              onPress={onAvatarPress}
              activeOpacity={0.8}
              className="w-16 h-16 rounded-2xl bg-neutral-gray50 items-center justify-center mr-4 shadow-sm overflow-hidden"
            >
              {userImageUrl ? (
                <Image source={{ uri: userImageUrl }} className="w-full h-full" />
              ) : (
                <Text className="text-4xl">👨</Text>
              )}
            </TouchableOpacity>
            <View>
              <Text className="text-white text-sm font-medium opacity-90">Hello!</Text>
              <Text className="text-white text-3xl font-bold tracking-tight">{userName}</Text>
            </View>
          </View>
          {rightElement || (
            <TouchableOpacity className="w-12 h-12 items-center justify-center">
              <Ionicons name="notifications" size={28} color="white" />
              <View className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-primary" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View className="flex-row items-center mb-8 z-10">
          {onBackPress && (
            <TouchableOpacity
              onPress={onBackPress}
              className="w-12 h-12 bg-white/10 rounded-2xl items-center justify-center mr-4 border border-white/20"
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          )}
          <Text className="text-white text-2xl font-bold flex-1 tracking-tight">{title}</Text>
          {rightElement}
        </View>
      )}

      {showSearch && (
        <View className="bg-white rounded-2xl px-4 py-1 flex-row items-center z-10 shadow-lg shadow-black/10">
          <Ionicons name="search-outline" size={22} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-base text-neutral-gray900 font-medium"
            placeholder="Search Documents..."
            placeholderTextColor="#9CA3AF"
            value={searchValue}
            onChangeText={onSearchChange}
          />
        </View>
      )}
    </View>
  );
};

export default SectionHeader;
