import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavProps> = ({ activeTab = "home", onTabChange }) => {
  const insets = useSafeAreaInsets();

  const handleTabPress = (tab: string) => {
    onTabChange?.(tab);
  };

  const handleScanPress = () => {
    onTabChange?.("scan");
  };

  const leftTabs = [
    { id: "home", icon: "home", label: "Home" },
    { id: "documents", icon: "document-text-outline", label: "Documents" },
  ];

  const rightTabs = [
    { id: "share", icon: "share-social-outline", label: "Share" },
    { id: "profile", icon: "person-outline", label: "Profile" },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0">
      {/* Floating Action Button - Positioned above the nav bar */}
      <View className="absolute -top-8 left-0 right-0 items-center z-20">
        <TouchableOpacity
          className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center shadow-lg"
          onPress={handleScanPress}
          activeOpacity={0.8}
          style={{
            shadowColor: "#3B82F6",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="scan" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar with Curved Notch */}
      <View
        className="relative"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 20,
        }}
      >
        {/* SVG Curved Background */}
        <View className="absolute top-0 bottom-0 left-0 right-0 bg-transparent z-0">
          <Svg height="80" width="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
            <Path
              d="M 0,20 L 140,20 Q 150,20 160,30 Q 170,40 180,45 Q 190,50 200,50 Q 210,50 220,45 Q 230,40 240,30 Q 250,20 260,20 L 400,20 L 400,80 L 0,80 Z"
              fill="white"
            />
          </Svg>
          {/* Solid background covering the rest of the height including insets */}
          <View className="bg-white flex-1" />
        </View>

        {/* Navigation Content */}
        <View className="pt-10 px-4 z-10" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <View className="flex-row items-center justify-between">
            {/* Left Tabs */}
            <View className="flex-row flex-1 justify-around">
              {leftTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    className="items-center justify-center"
                    onPress={() => handleTabPress(tab.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={tab.icon as any}
                      size={24}
                      color={isActive ? "#3B82F6" : "#9CA3AF"}
                    />
                    <Text
                      className={`text-xs mt-1 ${
                        isActive ? "text-blue-600 font-semibold" : "text-gray-400"
                      }`}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Center Spacer for FAB */}
            <View className="w-16" />

            {/* Right Tabs */}
            <View className="flex-row flex-1 justify-around">
              {rightTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    className="items-center justify-center"
                    onPress={() => handleTabPress(tab.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={tab.icon as any}
                      size={24}
                      color={isActive ? "#3B82F6" : "#9CA3AF"}
                    />
                    <Text
                      className={`text-xs mt-1 ${
                        isActive ? "text-blue-600 font-semibold" : "text-gray-400"
                      }`}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomNavigation;
