import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SectionHeader from "../../components/SectionHeader";
import CategoryCard from "../../components/CategoryCard";
import DocumentCard from "../../components/DocumentCard";
import { useDocuments } from "../../context/DocumentContext";
import { useUser } from "../../context/UserContext";

interface HomeScreenProps {
  onCategoryPress?: (categoryName: string) => void;
  onAvatarPress?: () => void;
  onSeeAllRecent?: () => void;
  onViewAllCategories?: () => void;
  onUploadPress?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onCategoryPress,
  onAvatarPress,
  onSeeAllRecent,
  onViewAllCategories,
  onUploadPress,
}) => {
  const navigation = useNavigation<any>();
  const { categories, getRecentDocuments, searchDocuments, deleteDocument } = useDocuments();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const userName = user.name;

  const handleCategoryPress = (categoryName: string) => {
    if (onCategoryPress) {
      onCategoryPress(categoryName);
    } else {
      navigation.navigate("DocumentList", { categoryName });
    }
  };

  // Get recent 3 documents
  const recentDocuments = getRecentDocuments(3);

  const handleDeleteDocument = (id: string, name: string) => {
    Alert.alert("Delete Document", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteDocument(id);
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-neutral-gray50">
      <SectionHeader
        isHome
        userName={user.name}
        showSearch={true}
        onAvatarPress={onAvatarPress}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        userImageUrl={user.profileImage}
      />

      <ScrollView className="flex-1 px-6 pt-8 pb-32" showsVerticalScrollIndicator={false}>
        {searchQuery.length > 0 ? (
          /* Search Results Section */
          <View className="mb-10">
            <View className="flex-row justify-between items-end mb-6">
              <View>
                <Text className="text-2xl font-bold text-neutral-gray900 tracking-tight">
                  Search Results
                </Text>
                <Text className="text-sm text-neutral-gray500 mt-1">
                  Found {searchDocuments(searchQuery).length} documents for "{searchQuery}"
                </Text>
              </View>
            </View>

            <View className="mb-36">
              {searchDocuments(searchQuery).map((doc) => (
                <DocumentCard
                  key={doc.id}
                  id={parseInt(doc.id.split("_")[1] || "0")}
                  name={doc.name}
                  date={new Date(doc.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  size={doc.size}
                  pages={doc.pages}
                  onDelete={() => handleDeleteDocument(doc.id, doc.name)}
                  onPress={() => navigation.navigate("DocumentDetail", { documentId: doc.id })}
                />
              ))}
              {searchDocuments(searchQuery).length === 0 && (
                <View className="items-center justify-center py-20">
                  <Ionicons name="search-outline" size={64} color="#D1D5DB" />
                  <Text className="text-neutral-gray500 mt-4 text-center">
                    No documents found matching "{searchQuery}"
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <>
            {/* Categories Section */}
            <View className="mb-10">
              <View className="flex-row justify-between items-end mb-6">
                <View>
                  <Text className="text-2xl font-bold text-neutral-gray900 tracking-tight">
                    Categories
                  </Text>
                  <Text className="text-sm text-neutral-gray500 mt-1">
                    Organize your files efficiently
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onViewAllCategories}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text className="text-primary text-sm font-bold">View all</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-1">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    icon={category.icon as any}
                    color={category.color}
                    count={category.count}
                    onPress={() => handleCategoryPress(category.name)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Recent Uploads Section */}
            <View className="mb-10">
              <View className="flex-row justify-between items-end mb-6">
                <View>
                  <Text className="text-2xl font-bold text-neutral-gray900 tracking-tight">
                    Recent Uploads
                  </Text>
                  <Text className="text-sm text-neutral-gray500 mt-1">
                    Quick access to latest documents
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onSeeAllRecent}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text className="text-primary text-sm font-bold">See All</Text>
                </TouchableOpacity>
              </View>

              <View className="mb-36">
                {recentDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    id={parseInt(doc.id.split("_")[1] || "0")}
                    name={doc.name}
                    date={new Date(doc.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    size={doc.size}
                    pages={doc.pages}
                    onDelete={() => handleDeleteDocument(doc.id, doc.name)}
                    onPress={() => navigation.navigate("DocumentDetail", { documentId: doc.id })}
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
