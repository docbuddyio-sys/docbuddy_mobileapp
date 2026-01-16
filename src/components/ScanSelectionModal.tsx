import React from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface ScanSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
}

const ScanSelectionModal: React.FC<ScanSelectionModalProps> = ({
  isVisible,
  onClose,
  onImageSelected,
}) => {
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera was denied");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
      onClose();
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery was denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
      onClose();
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        <Pressable className="bg-white rounded-t-3xl p-8 items-center">
          <View className="w-12 h-1 bg-gray-300 rounded-full mb-6" />
          <Text className="text-xl font-bold text-gray-900 mb-8">Select Document Source</Text>

          <View className="flex-row justify-around w-full mb-4">
            <TouchableOpacity className="items-center" onPress={handleTakePhoto}>
              <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mb-2">
                <Ionicons name="camera" size={32} color="#3B82F6" />
              </View>
              <Text className="text-gray-700 font-medium">Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center" onPress={handleChooseFromGallery}>
              <View className="w-16 h-16 bg-blue-100 rounded-2xl items-center justify-center mb-2">
                <Ionicons name="images" size={32} color="#3B82F6" />
              </View>
              <Text className="text-gray-700 font-medium">Gallery</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ScanSelectionModal;
