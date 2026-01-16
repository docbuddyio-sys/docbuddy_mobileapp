import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import CustomButton from "../../components/CustomButton";

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: any; // You can use require() or import for local images
}

const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamic array of onboarding slides
  const slides: OnboardingSlide[] = [
    {
      id: 1,
      title: "Auto Categorization",
      subtitle: "Organized Without Effort",
      description:
        "Passports, bills, certificates—everything is automatically sorted into smart categories for easy access.",
      image: require("../../../assets/onboarding/auto-categorization.png"), // Replace with actual path
    },
    {
      id: 2,
      title: "Quick Access & Search",
      subtitle: "Find Anything in Seconds",
      description:
        "Use smart search to instantly locate any document using tags, AI metadata, or category filters.",
      image: require("../../../assets/onboarding/quick-search.png"), // Replace with actual path
    },
    {
      id: 3,
      title: "Metadata Extraction",
      subtitle: "Important Details, Auto-Detected",
      description:
        "Names, dates, ID numbers, and key information are extracted instantly so you never have to type manually.",
      image: require("../../../assets/onboarding/metadata-extraction.png"), // Replace with actual path
    },
    {
      id: 4,
      title: "Secure Storage",
      subtitle: "Your Documents, Safely Protected",
      description:
        "Your files are encrypted and securely saved, ensuring only you can access them anytime, anywhere.",
      image: require("../../../assets/onboarding/secure-storage.png"), // Replace with actual path
    },
    {
      id: 5,
      title: "Smart OCR Scan",
      subtitle: "Capture & Convert Instantly",
      description:
        "Scan any document with a single tap and let the system automatically detect text with precision.",
      image: require("../../../assets/onboarding/ocr-scan.png"), // Replace with actual path
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle completion - navigate to Home
      console.log("Onboarding completed");
      navigation.navigate("Home");
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Content Container */}
      <View className="flex-1 px-6 pt-16">
        {/* Blue accent bar */}
        <View className="w-1 h-24 bg-blue-600 rounded-full mb-4" />

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-2">{currentSlide.title}</Text>

        {/* Subtitle */}
        <Text className="text-lg font-semibold text-gray-900 mb-3">{currentSlide.subtitle}</Text>

        {/* Description */}
        <Text className="text-sm text-gray-600 leading-6 mb-8">{currentSlide.description}</Text>

        {/* Illustration */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={currentSlide.image}
            style={{ width: "100%", height: 320 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Section - Pagination Dots and Next Button */}
      <View className="px-6 pb-12 flex-row items-center justify-between">
        {/* Pagination Dots */}
        <View className="flex-row items-center">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === currentIndex ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </View>

        {/* Next Button */}
        <CustomButton title="Next" onPress={handleNext} className="py-3 px-8" />
      </View>
    </View>
  );
};

export default OnboardingScreen;
