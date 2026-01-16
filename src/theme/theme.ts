/**
 * Professional Design System for Doc Buddy
 * Centralized theme constants for colors, typography, and spacing.
 */

export const COLORS = {
  primary: {
    DEFAULT: "#3B82F6", // Professional Blue
    light: "#EBF3FF",
    dark: "#2563EB",
    brand: "#6C63FF", // Branding Purple accent
  },
  secondary: {
    DEFAULT: "#F59E0B", // Professional Amber/Orange
    light: "#FFFBEB",
    dark: "#D97706",
  },
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
  },
  semantic: {
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
};

export const TYPOGRAPHY = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  h3: "text-2xl font-bold",
  h4: "text-xl font-bold",
  bodyLarge: "text-lg font-medium",
  body: "text-base font-normal",
  bodySmall: "text-sm font-normal",
  caption: "text-xs font-medium uppercase tracking-wider",
};

export const SPACING = {
  container: "px-6",
  section: "mb-8",
  item: "mb-4",
};

export const RADIUS = {
  none: "rounded-none",
  sm: "rounded-sm",
  base: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  premium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 12,
  },
};

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
};
