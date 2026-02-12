export interface Document {
  id: string;
  name: string;
  description?: string;
  category: string;
  uploadDate: string;
  size: string;
  pages: number;
  imageUri: string; // Local file system URI
  tags: string[];
  metadata?: {
    idName?: string;
    gender?: string;
    idNumber?: string;
    state?: string;
    yearOfGetting?: string;
    address?: string;
    folder?: string;
    [key: string]: any; // Allow additional custom fields
  };
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
  usageCount: number;
}

export const DEFAULT_CATEGORIES: Omit<Category, "count">[] = [
  { id: "1", name: "Identity", icon: "person", color: "#3B82F6" },
  { id: "2", name: "Finance", icon: "trending-up", color: "#3B82F6" },
  { id: "3", name: "Health", icon: "heart", color: "#3B82F6" },
  { id: "4", name: "Travel", icon: "airplane", color: "#3B82F6" },
  { id: "5", name: "Work", icon: "briefcase", color: "#3B82F6" },
  { id: "6", name: "Legal", icon: "document-text", color: "#3B82F6" },
  { id: "7", name: "Insurance", icon: "shield-checkmark", color: "#3B82F6" },
];
