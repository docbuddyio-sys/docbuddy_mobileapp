import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { Document, Category, DEFAULT_CATEGORIES, UserProfile } from "../types/types";

const DOCUMENTS_KEY = "@docbuddy_documents";
const TAGS_KEY = "@docbuddy_tags";
const PROFILE_KEY = "@docbuddy_profile";

// File system directory for storing document images
const DOCUMENTS_DIR = `${FileSystem.documentDirectory}docbuddy_documents/`;

// Initialize documents directory
const initializeStorage = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(DOCUMENTS_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(DOCUMENTS_DIR, { intermediates: true });
    }
  } catch (error) {
    console.error("Error initializing storage:", error);
  }
};

// Document CRUD Operations
export const documentStorage = {
  // Initialize storage
  initialize: async () => {
    await initializeStorage();
  },

  // Get all documents
  getAllDocuments: async (): Promise<Document[]> => {
    try {
      const documentsJson = await AsyncStorage.getItem(DOCUMENTS_KEY);
      return documentsJson ? JSON.parse(documentsJson) : [];
    } catch (error) {
      console.error("Error getting documents:", error);
      return [];
    }
  },

  // Get document by ID
  getDocumentById: async (id: string): Promise<Document | null> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      return documents.find((doc) => doc.id === id) || null;
    } catch (error) {
      console.error("Error getting document by ID:", error);
      return null;
    }
  },

  // Get documents by category
  getDocumentsByCategory: async (category: string): Promise<Document[]> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      return documents.filter((doc) => doc.category === category);
    } catch (error) {
      console.error("Error getting documents by category:", error);
      return [];
    }
  },

  // Search documents
  searchDocuments: async (query: string): Promise<Document[]> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      const lowerQuery = query.toLowerCase();
      return documents.filter(
        (doc) =>
          doc.name.toLowerCase().includes(lowerQuery) ||
          doc.description?.toLowerCase().includes(lowerQuery) ||
          doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      );
    } catch (error) {
      console.error("Error searching documents:", error);
      return [];
    }
  },

  // Save image to file system
  saveImage: async (imageUri: string, documentId: string): Promise<string> => {
    try {
      await initializeStorage();
      const fileExtension = imageUri.split(".").pop() || "jpg";
      const fileName = `${documentId}_${Date.now()}.${fileExtension}`;
      const newPath = `${DOCUMENTS_DIR}${fileName}`;

      await FileSystem.copyAsync({
        from: imageUri,
        to: newPath,
      });

      return newPath;
    } catch (error) {
      console.error("Error saving image:", error);
      throw error;
    }
  },

  // Delete image from file system
  deleteImage: async (imageUri: string): Promise<void> => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(imageUri);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  },

  // Create document
  createDocument: async (
    document: Omit<Document, "id" | "createdAt" | "updatedAt">,
  ): Promise<Document> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = Date.now();

      // Save image to file system
      const savedImageUri = await documentStorage.saveImage(document.imageUri, id);

      const newDocument: Document = {
        ...document,
        id,
        imageUri: savedImageUri,
        createdAt: now,
        updatedAt: now,
      };

      documents.push(newDocument);
      await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));

      // Update tag usage counts
      await documentStorage.updateTagUsage(document.tags);

      return newDocument;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },

  // Update document
  updateDocument: async (id: string, updates: Partial<Document>): Promise<Document | null> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      const index = documents.findIndex((doc) => doc.id === id);

      if (index === -1) {
        return null;
      }

      const oldDocument = documents[index];
      const updatedDocument: Document = {
        ...oldDocument,
        ...updates,
        id, // Ensure ID doesn't change
        updatedAt: Date.now(),
      };

      documents[index] = updatedDocument;
      await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));

      // Update tag usage if tags changed
      if (updates.tags) {
        await documentStorage.updateTagUsage(updates.tags);
      }

      return updatedDocument;
    } catch (error) {
      console.error("Error updating document:", error);
      return null;
    }
  },

  // Delete document
  deleteDocument: async (id: string): Promise<boolean> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      const document = documents.find((doc) => doc.id === id);

      if (!document) {
        return false;
      }

      // Delete image from file system
      await documentStorage.deleteImage(document.imageUri);

      // Remove document from array
      const filteredDocuments = documents.filter((doc) => doc.id !== id);
      await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(filteredDocuments));

      return true;
    } catch (error) {
      console.error("Error deleting document:", error);
      return false;
    }
  },

  // Get categories with document counts
  getCategories: async (): Promise<Category[]> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      const categoryCounts: { [key: string]: number } = {};

      documents.forEach((doc) => {
        categoryCounts[doc.category] = (categoryCounts[doc.category] || 0) + 1;
      });

      return DEFAULT_CATEGORIES.map((cat) => ({
        ...cat,
        count: categoryCounts[cat.name] || 0,
      }));
    } catch (error) {
      console.error("Error getting categories:", error);
      return DEFAULT_CATEGORIES.map((cat) => ({ ...cat, count: 0 }));
    }
  },

  // Get all unique tags
  getAllTags: async (): Promise<string[]> => {
    try {
      const tagsJson = await AsyncStorage.getItem(TAGS_KEY);
      return tagsJson ? JSON.parse(tagsJson) : [];
    } catch (error) {
      console.error("Error getting tags:", error);
      return [];
    }
  },

  // Update tag usage
  updateTagUsage: async (tags: string[]): Promise<void> => {
    try {
      const existingTags = await documentStorage.getAllTags();
      const tagSet = new Set([...existingTags, ...tags]);
      await AsyncStorage.setItem(TAGS_KEY, JSON.stringify(Array.from(tagSet)));
    } catch (error) {
      console.error("Error updating tag usage:", error);
    }
  },

  // Get recent documents
  getRecentDocuments: async (limit: number = 10): Promise<Document[]> => {
    try {
      const documents = await documentStorage.getAllDocuments();
      return documents.sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
    } catch (error) {
      console.error("Error getting recent documents:", error);
      return [];
    }
  },

  // Clear all documents (for testing/reset)
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(DOCUMENTS_KEY);
      await AsyncStorage.removeItem(TAGS_KEY);

      // Delete all images
      const dirInfo = await FileSystem.getInfoAsync(DOCUMENTS_DIR);
      if (dirInfo.exists) {
        await FileSystem.deleteAsync(DOCUMENTS_DIR);
      }

      await initializeStorage();
    } catch (error) {
      console.error("Error clearing all documents:", error);
    }
  },

  // Get storage statistics
  getStats: async () => {
    try {
      const documents = await documentStorage.getAllDocuments();
      const categories = await documentStorage.getCategories();
      const tags = await documentStorage.getAllTags();

      return {
        totalDocuments: documents.length,
        totalCategories: categories.filter((cat) => cat.count > 0).length,
        totalTags: tags.length,
        totalSize: documents.reduce((acc, doc) => {
          const sizeMatch = doc.size.match(/(\d+\.?\d*)\s*(MB|KB|GB)/i);
          if (sizeMatch) {
            const value = parseFloat(sizeMatch[1]);
            const unit = sizeMatch[2].toUpperCase();
            const mbValue = unit === "GB" ? value * 1024 : unit === "KB" ? value / 1024 : value;
            return acc + mbValue;
          }
          return acc;
        }, 0),
      };
    } catch (error) {
      console.error("Error getting stats:", error);
      return {
        totalDocuments: 0,
        totalCategories: 0,
        totalTags: 0,
        totalSize: 0,
      };
    }
  },

  // User Profile Operations
  getUserProfile: async (): Promise<UserProfile | null> => {
    try {
      const profileJson = await AsyncStorage.getItem(PROFILE_KEY);
      return profileJson ? JSON.parse(profileJson) : null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  },

  saveUserProfile: async (profile: UserProfile): Promise<void> => {
    try {
      let profileToSave = { ...profile };

      // If there's a new profile image (local URI), save it to permanent storage
      if (profile.profileImage && !profile.profileImage.startsWith("file://")) {
        // This is a bit tricky since we don't have a documentId, let's use 'profile'
        const savedPath = await documentStorage.saveImage(profile.profileImage, "user_profile");
        profileToSave.profileImage = savedPath;
      }

      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profileToSave));
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw error;
    }
  },
};
