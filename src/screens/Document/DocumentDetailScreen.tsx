import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DUMMY_DOCUMENTS } from "../../data/dummyData";

const DocumentDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { documentId } = route.params || {};

  const document = DUMMY_DOCUMENTS.find((doc) => doc.id === documentId);

  if (!document) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Document not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Header */}
      <View className="px-6 flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Document Review</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Document Image Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 relative">
          <Image source={document.image} className="w-full h-48 rounded-xl" resizeMode="contain" />
          <TouchableOpacity className="absolute right-4 top-1/2 -mt-6 w-12 h-12 bg-blue-100 rounded-full items-center justify-center shadow-sm">
            <Ionicons name="chevron-forward" size={24} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        {/* Document Information */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Document Information</Text>

          <InfoRow label="Id Name" value={document.details.idName} isBold />
          <InfoRow label="Gender" value={document.details.gender} isBold />
          <InfoRow label="Aadhaar Number" value={document.details.idNumber} isBold />
          <InfoRow label="State" value={document.details.state} isBold />
          <InfoRow label="Year of getting" value={document.details.yearOfGetting} isBold />
        </View>

        {/* Address */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-2">Address</Text>
          <Text className="text-gray-900 leading-6 font-medium">{document.details.address}</Text>
        </View>

        {/* Folder */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-2">Folder</Text>
          <View className="bg-[#F8F9FE] p-4 rounded-xl">
            <Text className="text-gray-400">{document.details.folder}</Text>
          </View>
        </View>

        {/* Tags */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-bold text-gray-900">Tags</Text>
            <TouchableOpacity>
              <Ionicons name="add" size={24} color="#6C63FF" />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap mb-4">
            {document.details.tags.map((tag, index) => (
              <View
                key={index}
                className="bg-[#E8EBFF] px-4 py-2 rounded-full mr-2 mb-2 border border-[#C5CAE9]"
              >
                <Text className="text-gray-700 text-xs font-semibold">{tag}</Text>
              </View>
            ))}
          </View>
          <View className="bg-[#F8F9FE] p-4 rounded-xl">
            <TextInput placeholder="Enter the tag" placeholderTextColor="#999" />
          </View>
        </View>

        {/* Timeline */}
        <View className="mb-10">
          <Text className="text-lg font-bold text-gray-900 mb-4">Time line</Text>
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-amber-100 rounded-full items-center justify-center">
              <Ionicons name="cloud-upload-outline" size={24} color="#F59E0B" />
            </View>
            <View className="ml-4">
              <Text className="text-gray-900 font-bold">Uploaded</Text>
              <Text className="text-gray-500 text-xs">Today , 2025 at 10:30 AM</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between mb-10">
          <TouchableOpacity className="w-[48%] py-4 rounded-xl border border-blue-600 items-center">
            <Text className="text-blue-600 font-bold text-lg">Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] py-4 rounded-xl bg-blue-600 items-center">
            <Text className="text-white font-bold text-lg">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ label, value, isBold }: { label: string; value: string; isBold?: boolean }) => (
  <View className="flex-row justify-between py-3">
    <Text className="text-gray-400 text-base">{label}</Text>
    <Text className={`text-gray-900 text-base ${isBold ? "font-bold" : ""}`}>{value}</Text>
  </View>
);

export default DocumentDetailScreen;
