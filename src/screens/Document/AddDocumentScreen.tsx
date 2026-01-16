import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddDocumentScreenProps {
  imageUri: string;
  onClose: () => void;
  onSave: (doc: any) => void;
  onViewDocument: (id: string) => void;
}

type Step = "edit" | "review" | "success";

const AddDocumentScreen: React.FC<AddDocumentScreenProps> = ({
  imageUri,
  onClose,
  onSave,
  onViewDocument,
}) => {
  const [step, setStep] = useState<Step>("edit");
  const [isExtracting, setIsExtracting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(["Identity", "2025"]);

  useEffect(() => {
    if (step === "edit") {
      setIsExtracting(true);
      const timer = setTimeout(() => setIsExtracting(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => {
    if (step === "edit") setStep("review");
    else if (step === "review") setStep("success");
  };

  const handleBack = () => {
    if (step === "edit") onClose();
    else if (step === "review") setStep("edit");
  };

  const renderEditStep = () => (
    <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
      {/* Image Preview */}
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 relative">
        <Image source={{ uri: imageUri }} className="w-full h-48 rounded-xl" resizeMode="contain" />
        {isExtracting && (
          <View className="absolute right-4 bottom-4 bg-blue-100 px-3 py-1.5 rounded-full flex-row items-center border border-blue-200">
            <ActivityIndicator size="small" color="#3B82F6" className="mr-2" />
            <Text className="text-blue-600 text-xs font-bold">Data Extracting...</Text>
          </View>
        )}
      </View>

      {/* File Name */}
      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-2">File Name</Text>
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <TextInput
            placeholder="Enter the file Name"
            placeholderTextColor="#9CA3AF"
            value={fileName}
            onChangeText={setFileName}
            className="text-gray-900"
          />
        </View>
      </View>

      {/* Description */}
      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-2">Description</Text>
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-32 justify-between">
          <TextInput
            multiline
            placeholder="Enter description..."
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            maxLength={200}
            className="text-gray-900 text-top"
          />
          <Text className="text-right text-gray-400 text-xs">{description.length}/200</Text>
        </View>
      </View>

      {/* Tags */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-gray-900">Tags</Text>
          <TouchableOpacity>
            <Ionicons name="add" size={24} color="#6C63FF" />
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="bg-[#E8EBFF] px-4 py-2 rounded-full mr-2 mb-2 border border-[#C5CAE9]"
            >
              <Text className="text-gray-700 text-xs font-semibold">{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Timeline */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-4">Time line</Text>
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-amber-100 rounded-2xl items-center justify-center">
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
        <TouchableOpacity
          onPress={handleBack}
          className="w-[48%] py-4 rounded-xl border border-blue-600 items-center justify-center flex-row"
        >
          <Ionicons name="add" size={20} color="#3B82F6" />
          <Text className="text-blue-600 font-bold text-lg ml-1">Add Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          className="w-[48%] py-4 rounded-xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-300"
        >
          <Text className="text-white font-bold text-lg">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderReviewStep = () => (
    <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
      <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 relative">
        <Image source={{ uri: imageUri }} className="w-full h-48 rounded-xl" resizeMode="contain" />
        <TouchableOpacity className="absolute right-4 top-1/2 -mt-6 w-12 h-12 bg-blue-100 rounded-full items-center justify-center shadow-sm">
          <Ionicons name="chevron-forward" size={24} color="#6C63FF" />
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-4">Document Information</Text>
        <InfoRow label="Id Name" value="Cristiano Ronaldo" isBold />
        <InfoRow label="Gender" value="Male" isBold />
        <InfoRow label="Aadhaar Number" value="9876 5432 1098" isBold />
        <InfoRow label="State" value="Bihar, India" isBold />
        <InfoRow label="Year of getting" value="2023" isBold />
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-2">Address</Text>
        <Text className="text-gray-900 leading-6 font-medium">
          Flat No. 204, Skyline Residency{"\n"}MG Road, Near Metro Station{"\n"}Hyderabad, Telangana
          - 500081{"\n"}India
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-2">Folder</Text>
        <View className="bg-[#F8F9FE] p-4 rounded-xl">
          <Text className="text-gray-400">Identity / Aadhaar card</Text>
        </View>
      </View>

      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-gray-900">Tags</Text>
          <TouchableOpacity>
            <Ionicons name="add" size={24} color="#6C63FF" />
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap mb-4">
          {["Identity", "Proof", "Aadhar"].map((tag, index) => (
            <View
              key={index}
              className="bg-[#E8EBFF] px-4 py-2 rounded-full mr-2 mb-2 border border-[#C5CAE9]"
            >
              <Text className="text-gray-700 text-xs font-semibold">{tag}</Text>
            </View>
          ))}
        </View>
        <View className="bg-[#F8F9FE] p-4 rounded-xl">
          <TextInput placeholder="Enter the tag" placeholderTextColor="#9CA3AF" />
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-4">Time line</Text>
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-amber-100 rounded-2xl items-center justify-center">
            <Ionicons name="cloud-upload-outline" size={24} color="#F59E0B" />
          </View>
          <View className="ml-4">
            <Text className="text-gray-900 font-bold">Uploaded</Text>
            <Text className="text-gray-500 text-xs">Today , 2025 at 10:30 AM</Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between mb-10">
        <TouchableOpacity
          onPress={() => setStep("edit")}
          className="w-[48%] py-4 rounded-xl border border-blue-600 items-center justify-center bg-blue-50"
        >
          <Text className="text-blue-600 font-bold text-lg">Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          className="w-[48%] py-4 rounded-xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-300"
        >
          <Text className="text-white font-bold text-lg">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderSuccessStep = () => (
    <View className="flex-1 items-center justify-center px-6">
      <TouchableOpacity onPress={onClose} className="absolute top-4 right-6">
        <Ionicons name="close" size={32} color="#3B82F6" />
      </TouchableOpacity>

      <View className="w-48 h-48 bg-blue-50 rounded-full items-center justify-center mb-8">
        <View className="w-32 h-32 bg-blue-100 rounded-full items-center justify-center">
          <Ionicons name="checkmark-circle" size={80} color="#3B82F6" />
        </View>
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-2">Document Saved Successfully</Text>
      <Text className="text-center text-gray-500 mb-12 px-8">
        Your document has been securely stored in{" "}
        <Text className="font-bold text-gray-900">Doc Buddy.</Text>
      </Text>

      <TouchableOpacity
        onPress={() => onViewDocument("new-id")}
        className="w-full py-4 rounded-xl border border-blue-600 items-center justify-center flex-row mb-4"
      >
        <Ionicons name="document-text" size={24} color="#3B82F6" className="mr-2" />
        <Text className="text-blue-600 font-bold text-lg ml-2">View Document</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClose}
        className="w-full py-4 rounded-xl bg-blue-600 items-center justify-center flex-row shadow-lg shadow-blue-300"
      >
        <Ionicons name="cloud-upload" size={24} color="white" className="mr-2" />
        <Text className="text-white font-bold text-lg ml-2">Upload Another</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white pt-12">
      {step !== "success" && (
        <View className="px-6 flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">
            {step === "edit" ? "Edit Document" : "Document Review"}
          </Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {step === "edit" && renderEditStep()}
      {step === "review" && renderReviewStep()}
      {step === "success" && renderSuccessStep()}
    </View>
  );
};

const InfoRow = ({ label, value, isBold }: { label: string; value: string; isBold?: boolean }) => (
  <View className="flex-row justify-between py-3">
    <Text className="text-gray-400 text-base">{label}</Text>
    <Text className={`text-gray-900 text-base ${isBold ? "font-bold" : ""}`}>{value}</Text>
  </View>
);

export default AddDocumentScreen;
