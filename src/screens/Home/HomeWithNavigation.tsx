import React, { useState, useCallback } from "react";
import { View, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import DocumentListScreen from "../Document/DocumentListScreen";
import ProfileScreen from "../Profile/ProfileScreen";
import BottomNavigation from "../../components/BottomNavigation";
import ScanSelectionModal from "../../components/ScanSelectionModal";
import AddDocumentScreen from "../Document/AddDocumentScreen";

const HomeWithNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScanModalVisible, setIsScanModalVisible] = useState(false);
  const [scannedImageUri, setScannedImageUri] = useState<string | null>(null);
  const [isAddingDocument, setIsAddingDocument] = useState(false);

  // Handle hardware back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (activeTab !== "home") {
          setActiveTab("home");
          setSelectedCategory(null);
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [activeTab]),
  );

  const handleTabChange = (tab: string) => {
    if (tab === "scan" || tab === "upload") {
      setIsScanModalVisible(true);
      return;
    }
    setActiveTab(tab);
    if (tab !== "documents") {
      setSelectedCategory(null);
    }
  };

  const handleImageSelected = (uri: string) => {
    setScannedImageUri(uri);
    setIsAddingDocument(true);
  };

  const handleDocumentSaved = (doc: any) => {
    setIsAddingDocument(false);
    setScannedImageUri(null);
    // In a real app, you'd add this to your data store
    setActiveTab("documents");
  };

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab("documents");
  };

  const handleAvatarPress = () => {
    setActiveTab("profile");
  };

  const renderContent = () => {
    if (isAddingDocument && scannedImageUri) {
      return (
        <AddDocumentScreen
          imageUri={scannedImageUri}
          onClose={() => {
            setIsAddingDocument(false);
            setScannedImageUri(null);
          }}
          onSave={handleDocumentSaved}
          onViewDocument={(id) => {
            setIsAddingDocument(false);
            setScannedImageUri(null);
            setActiveTab("documents");
          }}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            onCategoryPress={handleCategoryPress}
            onAvatarPress={handleAvatarPress}
            onSeeAllRecent={() => setActiveTab("documents")}
            onViewAllCategories={() => setActiveTab("documents")}
          />
        );
      case "documents":
        return (
          <DocumentListScreen
            categoryName={selectedCategory || "Documents"}
            onBack={() => {
              setActiveTab("home");
              setSelectedCategory(null);
            }}
          />
        );
      case "profile":
        return <ProfileScreen onBack={() => setActiveTab("home")} />;
      default:
        return (
          <HomeScreen onCategoryPress={handleCategoryPress} onAvatarPress={handleAvatarPress} />
        );
    }
  };

  return (
    <View className="flex-1">
      {/* Main Content */}
      <View className="flex-1">{renderContent()}</View>

      {/* Bottom Navigation */}
      {!isAddingDocument && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Scan Selection Modal */}
      <ScanSelectionModal
        isVisible={isScanModalVisible}
        onClose={() => setIsScanModalVisible(false)}
        onImageSelected={handleImageSelected}
      />
    </View>
  );
};

export default HomeWithNavigation;
