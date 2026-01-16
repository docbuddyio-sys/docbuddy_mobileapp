import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SectionHeader from "../../components/SectionHeader";
import CategoryCard from "../../components/CategoryCard";
import DocumentCard from "../../components/DocumentCard";
import { DUMMY_DOCUMENTS } from "../../data/dummyData";

interface HomeScreenProps {
  onCategoryPress?: (categoryName: string) => void;
  onAvatarPress?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onCategoryPress, onAvatarPress }) => {
  const navigation = useNavigation<any>();
  const userName = "Berlin";

  const handleCategoryPress = (categoryName: string) => {
    if (onCategoryPress) {
      onCategoryPress(categoryName);
    } else {
      navigation.navigate("DocumentList", { categoryName });
    }
  };

  // Categories data
  const categories = [
    { id: 1, name: "Identity", icon: "person", color: "#3B82F6", count: 2 },
    { id: 2, name: "Finance", icon: "trending-up", color: "#3B82F6", count: 1 },
    { id: 3, name: "Health", icon: "heart", color: "#3B82F6", count: 1 },
    { id: 4, name: "Travel", icon: "airplane", color: "#3B82F6", count: 1 },
    { id: 5, name: "Work", icon: "briefcase", color: "#3B82F6", count: 1 },
    { id: 6, name: "Legal", icon: "document-text", color: "#3B82F6", count: 1 },
    { id: 7, name: "Insurance", icon: "shield-checkmark", color: "#3B82F6", count: 1 },
  ];

  // Get recent 3 documents
  const recentDocuments = DUMMY_DOCUMENTS.slice(0, 3);

  return (
    <View className="flex-1 bg-neutral-gray50">
      <SectionHeader
        isHome
        userName="Berlin Smith"
        showSearch={true}
        onAvatarPress={onAvatarPress}
      />

      <ScrollView className="flex-1 px-6 pt-8 pb-32" showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
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
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text className="text-primary text-sm font-bold">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-36">
            {recentDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                id={parseInt(doc.id)}
                name={doc.name}
                date={doc.uploadDate}
                size={doc.size}
                pages={doc.pages}
                onPress={() => navigation.navigate("DocumentDetail", { documentId: doc.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
