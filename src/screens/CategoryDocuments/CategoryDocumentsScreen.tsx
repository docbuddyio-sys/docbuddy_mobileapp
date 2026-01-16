import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SectionHeader from "../../components/SectionHeader";
import DocumentCard from "../../components/DocumentCard";

interface Document {
  id: number;
  name: string;
  date: string;
  size: string;
  pages: number;
  thumbnail: any;
}

interface CategoryDocumentsScreenProps {
  route?: {
    params?: {
      categoryName: string;
      categoryIcon: string;
      categoryColor: string;
    };
  };
  navigation?: any;
}

const CategoryDocumentsScreen: React.FC<CategoryDocumentsScreenProps> = ({ route, navigation }) => {
  // Get category info from navigation params or use defaults
  const categoryName = route?.params?.categoryName || "Identity";
  const categoryIcon = route?.params?.categoryIcon || "person";
  const categoryColor = route?.params?.categoryColor || "#3B82F6";

  // Sample documents data - in a real app, this would be filtered by category
  const documents: Document[] = [
    {
      id: 1,
      name: "Berlin Pan Card",
      date: "15 May 2035",
      size: "5 MB",
      pages: 2,
      thumbnail: null,
    },
    {
      id: 2,
      name: "Berlin Aadhar Card",
      date: "15 May 2035",
      size: "12 MB",
      pages: 2,
      thumbnail: null,
    },
    {
      id: 3,
      name: "Driving Lic",
      date: "15 May 2035",
      size: "5 MB",
      pages: 2,
      thumbnail: null,
    },
    {
      id: 4,
      name: "Berlin Pan Card",
      date: "15 May 2035",
      size: "5 MB",
      pages: 2,
      thumbnail: null,
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <SectionHeader title={categoryName} onBackPress={() => navigation?.goBack()} />

      {/* Main Content */}
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Recent Uploads Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-gray-900">Recent Uploads</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="filter" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Documents List */}
        <View className="mb-24">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              name={doc.name}
              date={doc.date}
              size={doc.size}
              pages={doc.pages}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryDocumentsScreen;
