/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          light: "#EBF3FF",
          dark: "#2563EB",
          brand: "#6C63FF",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          light: "#FFFBEB",
          dark: "#D97706",
        },
        neutral: {
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
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
