import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDocuments } from "../../context/DocumentContext";
import { DEFAULT_CATEGORIES } from "../../types/types";
import { COMMON_TAGS, getTagsForCategory } from "../../data/commonTags";

const DocumentDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { documentId } = route.params || {};
  const { getDocumentById, updateDocument, deleteDocument } = useDocuments();

  const document = getDocumentById(documentId);

  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  useEffect(() => {
    if (document) {
      setFileName(document.name);
      setDescription(document.description || "");
      setSelectedCategory(document.category);
      setTags(document.tags || []);
    }
  }, [document]);

  if (!document) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Ionicons name="document-text-outline" size={64} color="#9CA3AF" />
        <Text className="text-gray-500 mt-4 text-lg">Document not found</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-6 bg-blue-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSave = async () => {
    try {
      await updateDocument(documentId, {
        name: fileName.trim(),
        description: description.trim(),
        category: selectedCategory,
        tags: tags,
      });
      setIsEditing(false);
      Alert.alert("Success", "Document updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update document");
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Document", `Are you sure you want to delete "${document.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deleteDocument(documentId);
          if (success) {
            navigation.goBack();
            Alert.alert("Success", "Document deleted successfully");
          } else {
            Alert.alert("Error", "Failed to delete document");
          }
        },
      },
    ]);
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

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Header */}
      <View className="px-6 flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">
          {isEditing ? "Edit Document" : "Document Details"}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Document Image Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 relative">
          <Image
            source={{ uri: document.imageUri }}
            className="w-full h-48 rounded-xl"
            resizeMode="contain"
          />
        </View>

        {/* File Name */}
        {isEditing ? (
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-2">File Name</Text>
            <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <TextInput
                placeholder="Enter the file name"
                placeholderTextColor="#9CA3AF"
                value={fileName}
                onChangeText={setFileName}
                className="text-gray-900"
              />
            </View>
          </View>
        ) : (
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-2">File Name</Text>
            <Text className="text-gray-700 text-base">{document.name}</Text>
          </View>
        )}

        {/* Category */}
        {isEditing ? (
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-2">Category</Text>
            <TouchableOpacity
              onPress={() => setShowCategoryModal(true)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row justify-between items-center"
            >
              <Text className="text-gray-900">{selectedCategory}</Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-2">Category</Text>
            <Text className="text-gray-700 text-base">{document.category}</Text>
          </View>
        )}

        {/* Description */}
        {isEditing ? (
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
        ) : (
          document.description && (
            <View className="mb-6">
              <Text className="text-lg font-bold text-gray-900 mb-2">Description</Text>
              <Text className="text-gray-700 text-base leading-6">{document.description}</Text>
            </View>
          )
        )}

        {/* Document Information */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Document Information</Text>
          <InfoRow label="Size" value={document.size} />
          <InfoRow label="Pages" value={`${document.pages} pages`} />
          <InfoRow
            label="Upload Date"
            value={new Date(document.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          />
          {document.updatedAt !== document.createdAt && (
            <InfoRow
              label="Last Modified"
              value={new Date(document.updatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            />
          )}
        </View>

        {/* Tags */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-bold text-gray-900">Tags</Text>
            {isEditing && (
              <TouchableOpacity onPress={() => setShowTagModal(true)}>
                <Ionicons name="add" size={24} color="#6C63FF" />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-row flex-wrap mb-4">
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <View
                  key={index}
                  className="bg-[#E8EBFF] px-4 py-2 rounded-full mr-2 mb-2 border border-[#C5CAE9] flex-row items-center"
                >
                  <Text className="text-gray-700 text-xs font-semibold mr-2">{tag}</Text>
                  {isEditing && (
                    <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                      <Ionicons name="close-circle" size={16} color="#6C63FF" />
                    </TouchableOpacity>
                  )}
                </View>
              ))
            ) : (
              <Text className="text-gray-400 text-sm">No tags added</Text>
            )}
          </View>

          {/* Suggested Tags when editing */}
          {isEditing && (
            <>
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
            </>
          )}
        </View>

        {/* Timeline */}
        <View className="mb-10">
          <Text className="text-lg font-bold text-gray-900 mb-4">Timeline</Text>
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-amber-100 rounded-full items-center justify-center">
              <Ionicons name="cloud-upload-outline" size={24} color="#F59E0B" />
            </View>
            <View className="ml-4">
              <Text className="text-gray-900 font-bold">Uploaded</Text>
              <Text className="text-gray-500 text-xs">
                {new Date(document.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                at{" "}
                {new Date(document.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between mb-10">
          {isEditing ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(false);
                  // Reset to original values
                  setFileName(document.name);
                  setDescription(document.description || "");
                  setSelectedCategory(document.category);
                  setTags(document.tags || []);
                }}
                className="w-[48%] py-4 rounded-xl border border-gray-300 items-center"
              >
                <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="w-[48%] py-4 rounded-xl bg-blue-600 items-center shadow-lg shadow-blue-300"
              >
                <Text className="text-white font-bold text-lg">Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="w-[48%] py-4 rounded-xl border border-gray-300 items-center"
              >
                <Text className="text-gray-700 font-bold text-lg">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                className="w-[48%] py-4 rounded-xl bg-blue-600 items-center shadow-lg shadow-blue-300"
              >
                <Text className="text-white font-bold text-lg">Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

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
            <ScrollView className="max-h-96">
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

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-3 border-b border-gray-100">
    <Text className="text-gray-400 text-base">{label}</Text>
    <Text className="text-gray-900 text-base font-semibold">{value}</Text>
  </View>
);

export default DocumentDetailScreen;
