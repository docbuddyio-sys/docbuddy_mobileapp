import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Document, Category } from "../types/types";
import { documentStorage } from "../services/documentStorage";

interface DocumentContextType {
  documents: Document[];
  categories: Category[];
  tags: string[];
  loading: boolean;
  refreshDocuments: () => Promise<void>;
  createDocument: (doc: Omit<Document, "id" | "createdAt" | "updatedAt">) => Promise<Document>;
  updateDocument: (id: string, updates: Partial<Document>) => Promise<Document | null>;
  deleteDocument: (id: string) => Promise<boolean>;
  getDocumentById: (id: string) => Document | undefined;
  getDocumentsByCategory: (category: string) => Document[];
  searchDocuments: (query: string) => Document[];
  getRecentDocuments: (limit?: number) => Document[];
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
};

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize storage and load data
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      await documentStorage.initialize();
      await refreshDocuments();
    } catch (error) {
      console.error("Error initializing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshDocuments = async () => {
    try {
      const [docs, cats, allTags] = await Promise.all([
        documentStorage.getAllDocuments(),
        documentStorage.getCategories(),
        documentStorage.getAllTags(),
      ]);
      setDocuments(docs);
      setCategories(cats);
      setTags(allTags);
    } catch (error) {
      console.error("Error refreshing documents:", error);
    }
  };

  const createDocument = async (doc: Omit<Document, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newDoc = await documentStorage.createDocument(doc);
      await refreshDocuments();
      return newDoc;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  };

  const updateDocument = async (id: string, updates: Partial<Document>) => {
    try {
      const updatedDoc = await documentStorage.updateDocument(id, updates);
      if (updatedDoc) {
        await refreshDocuments();
      }
      return updatedDoc;
    } catch (error) {
      console.error("Error updating document:", error);
      return null;
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const success = await documentStorage.deleteDocument(id);
      if (success) {
        await refreshDocuments();
      }
      return success;
    } catch (error) {
      console.error("Error deleting document:", error);
      return false;
    }
  };

  const getDocumentById = (id: string) => {
    return documents.find((doc) => doc.id === id);
  };

  const getDocumentsByCategory = (category: string) => {
    return documents.filter((doc) => doc.category === category);
  };

  const searchDocuments = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return documents.filter(
      (doc) =>
        doc.name.toLowerCase().includes(lowerQuery) ||
        doc.description?.toLowerCase().includes(lowerQuery) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  };

  const getRecentDocuments = (limit: number = 10) => {
    return [...documents].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);
  };

  const value: DocumentContextType = {
    documents,
    categories,
    tags,
    loading,
    refreshDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
    getDocumentsByCategory,
    searchDocuments,
    getRecentDocuments,
  };

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
};
