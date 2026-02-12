import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDocuments } from "../../context/DocumentContext";

const { width } = Dimensions.get("window");

interface DocumentListScreenProps {
  categoryName?: string | null;
  onBack?: () => void;
}

const DocumentListScreen: React.FC<DocumentListScreenProps> = ({
  categoryName: categoryProps,
  onBack,
}) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { getDocumentsByCategory, searchDocuments, deleteDocument, documents } = useDocuments();

  // Determine category from props or route params
  const initialCategory = categoryProps || (route.params?.categoryName ?? "Documents");
  const [searchQuery, setSearchQuery] = useState("");

  // Get filtered documents
  const getFilteredDocuments = () => {
    if (searchQuery) {
      return searchDocuments(searchQuery);
    }
    if (initialCategory === "Documents" || initialCategory === null) {
      return documents;
    }
    return getDocumentsByCategory(initialCategory);
  };

  const filteredDocuments = getFilteredDocuments();
  const displayTitle = initialCategory || "Documents";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const handleDeleteDocument = (id: string, name: string) => {
    Alert.alert("Delete Document", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deleteDocument(id);
          if (success) {
            Alert.alert("Success", "Document deleted successfully");
          } else {
            Alert.alert("Error", "Failed to delete document");
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-[#F9F9FF]">
      {/* Header */}
      <View className="bg-[#0066FF] pt-12 pb-24 px-6 rounded-b-[40px] relative">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">{displayTitle}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View className="absolute bottom-[-25px] left-6 right-6 bg-white rounded-xl flex-row items-center px-4 py-3 shadow-lg">
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Search Documents..."
            className="flex-1 ml-3 text-base text-gray-800"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View className="flex-1 px-6 pt-12">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-gray-900">
            {searchQuery ? "Search Results" : "Documents"}
          </Text>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={24} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {filteredDocuments.map((doc, index) => (
            <View key={doc.id}>
              <TouchableOpacity
                className="flex-row items-center py-4"
                onPress={() => navigation.navigate("DocumentDetail", { documentId: doc.id })}
              >
                <Image
                  source={{ uri: doc.imageUri }}
                  className="w-16 h-12 rounded-lg bg-gray-200"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-base font-bold text-gray-900">{doc.name}</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {new Date(doc.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    , {doc.size}
                  </Text>
                  <Text className="text-xs text-gray-500">{doc.pages} Pages</Text>
                </View>
                <View className="flex-row items-center">
                  <TouchableOpacity className="mr-4">
                    <Ionicons name="share-social-outline" size={24} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteDocument(doc.id, doc.name)}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {index < filteredDocuments.length - 1 && (
                <View className="h-[1px] bg-gray-200 w-full" />
              )}
            </View>
          ))}
          {filteredDocuments.length === 0 && (
            <View className="items-center justify-center py-10">
              <Text className="text-gray-500 text-base">No documents found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default DocumentListScreen;
