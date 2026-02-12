import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDocuments } from "../../context/DocumentContext";
import { DEFAULT_CATEGORIES } from "../../types/types";
import { COMMON_TAGS, getTagsForCategory } from "../../data/commonTags";

interface AddDocumentScreenProps {
  imageUri: string;
  onClose: () => void;
  onSave: (doc: any) => void;
  onViewDocument: (id: string) => void;
}

type Step = "edit" | "success";

const AddDocumentScreen: React.FC<AddDocumentScreenProps> = ({
  imageUri,
  onClose,
  onSave,
  onViewDocument,
}) => {
  const { createDocument } = useDocuments();
  const [step, setStep] = useState<Step>("edit");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Identity");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [savedDocumentId, setSavedDocumentId] = useState<string>("");

  useEffect(() => {
    if (step === "edit") {
      setIsExtracting(true);
      const timer = setTimeout(() => setIsExtracting(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSave = async () => {
    if (!fileName.trim()) {
      Alert.alert("Error", "Please enter a file name");
      return;
    }

    try {
      setIsSaving(true);

      // Calculate approximate file size (this is a mock, in real app you'd get actual size)
      const fileSize = "2.5 MB";

      const newDocument = await createDocument({
        name: fileName.trim(),
        description: description.trim(),
        category: selectedCategory,
        imageUri: imageUri,
        size: fileSize,
        pages: 1,
        tags: tags,
        uploadDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });

      setSavedDocumentId(newDocument.id);
      setStep("success");
      onSave(newDocument);
    } catch (error) {
      console.error("Error saving document:", error);
      Alert.alert("Error", "Failed to save document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      setShowTagModal(false);
    }
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
        <Text className="text-lg font-bold text-gray-900 mb-2">File Name *</Text>
        <View className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <TextInput
            placeholder="Enter the file name"
            placeholderTextColor="#9CA3AF"
            value={fileName}
            onChangeText={setFileName}
            className="text-gray-900"
          />
        </View>
      </View>

      {/* Category Selection */}
      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-2">Category *</Text>
        <TouchableOpacity
          onPress={() => setShowCategoryModal(true)}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row justify-between items-center"
        >
          <Text className="text-gray-900">{selectedCategory}</Text>
          <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
        </TouchableOpacity>
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
          <TouchableOpacity onPress={() => setShowTagModal(true)}>
            <Ionicons name="add" size={24} color="#6C63FF" />
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap mb-4">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="bg-[#E8EBFF] px-4 py-2 rounded-full mr-2 mb-2 border border-[#C5CAE9] flex-row items-center"
            >
              <Text className="text-gray-700 text-xs font-semibold mr-2">{tag}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                <Ionicons name="close-circle" size={16} color="#6C63FF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Suggested Tags */}
        <Text className="text-sm font-semibold text-gray-600 mb-2">Suggested Tags:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {getTagsForCategory(selectedCategory).map(
            (tag, index) =>
              !tags.includes(tag) && (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAddTag(tag)}
                  className="bg-white px-3 py-1.5 rounded-full mr-2 border border-gray-200"
                >
                  <Text className="text-gray-600 text-xs">+ {tag}</Text>
                </TouchableOpacity>
              ),
          )}
        </ScrollView>
      </View>

      {/* Timeline */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-4">Timeline</Text>
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-amber-100 rounded-2xl items-center justify-center">
            <Ionicons name="cloud-upload-outline" size={24} color="#F59E0B" />
          </View>
          <View className="ml-4">
            <Text className="text-gray-900 font-bold">Uploaded</Text>
            <Text className="text-gray-500 text-xs">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
              at {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mb-10">
        <TouchableOpacity
          onPress={onClose}
          className="w-[48%] py-4 rounded-xl border border-gray-300 items-center justify-center"
        >
          <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSave}
          disabled={isSaving}
          className="w-[48%] py-4 rounded-xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-300"
        >
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Save</Text>
          )}
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
        onPress={() => onViewDocument(savedDocumentId)}
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
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Add Document</Text>
          <View style={{ width: 24 }} />
        </View>
      )}

      {step === "edit" && renderEditStep()}
      {step === "success" && renderSuccessStep()}

      {/* Category Selection Modal */}
      <Modal visible={showCategoryModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 pb-10">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-900">Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-96 pb-5" showsVerticalScrollIndicator={false}>
              {DEFAULT_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => {
                    setSelectedCategory(cat.name);
                    setShowCategoryModal(false);
                  }}
                  className="py-4 border-b border-gray-100 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center">
                    <Ionicons name={cat.icon as any} size={24} color="#3B82F6" />
                    <Text className="text-gray-900 text-base ml-3">{cat.name}</Text>
                  </View>
                  {selectedCategory === cat.name && (
                    <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Tag Selection Modal */}
      <Modal visible={showTagModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6 pb-10">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-900">Add Tag</Text>
              <TouchableOpacity onPress={() => setShowTagModal(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Custom Tag Input */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Custom Tag</Text>
              <View className="flex-row">
                <TextInput
                  placeholder="Enter custom tag"
                  value={newTag}
                  onChangeText={setNewTag}
                  className="flex-1 bg-gray-100 p-3 rounded-xl mr-2"
                />
                <TouchableOpacity
                  onPress={handleAddCustomTag}
                  className="bg-blue-600 px-4 rounded-xl items-center justify-center"
                >
                  <Text className="text-white font-bold">Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Common Tags */}
            <Text className="text-sm font-semibold text-gray-600 mb-2">Common Tags</Text>
            <ScrollView className="max-h-80">
              <View className="flex-row flex-wrap">
                {Object.entries(COMMON_TAGS).map(([category, categoryTags]) => (
                  <View key={category} className="w-full mb-4">
                    <Text className="text-xs font-bold text-gray-400 mb-2">{category}</Text>
                    <View className="flex-row flex-wrap">
                      {categoryTags.map(
                        (tag, index) =>
                          !tags.includes(tag) && (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                handleAddTag(tag);
                                setShowTagModal(false);
                              }}
                              className="bg-blue-50 px-3 py-2 rounded-full mr-2 mb-2 border border-blue-200"
                            >
                              <Text className="text-blue-600 text-xs font-semibold">{tag}</Text>
                            </TouchableOpacity>
                          ),
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddDocumentScreen;
