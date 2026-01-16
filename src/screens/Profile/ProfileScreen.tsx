import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import SectionHeader from "../../components/SectionHeader";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

interface ProfileScreenProps {
  onBack?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("Berlin Smith");
  const [email, setEmail] = useState("berlin.smith@example.com");
  const [phoneNumber, setPhoneNumber] = useState("+91 9876543210");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    // In a real app, you would clear the auth token here
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save profile data would go here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-neutral-gray50"
    >
      <SectionHeader title="My Profile" showSearch={false} onBackPress={onBack} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      >
        <View className="px-6 pt-10">
          {/* Profile Avatar Section */}
          <View className="items-center mb-10">
            <View className="relative">
              <View className="w-32 h-32 rounded-[40px] bg-white items-center justify-center shadow-md border-4 border-white overflow-hidden">
                {profileImage ? (
                  <Image source={{ uri: profileImage }} className="w-full h-full" />
                ) : (
                  <Text className="text-7xl">👨</Text>
                )}
              </View>
              <TouchableOpacity
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-2xl items-center justify-center border-4 border-white shadow-sm"
                activeOpacity={0.8}
                onPress={pickImage}
              >
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold text-neutral-gray900 mt-4">{name}</Text>
            <Text className="text-sm text-neutral-gray500">Free Plan Member</Text>
          </View>

          {/* Form Fields */}
          <View className="bg-white rounded-[32px] p-6 shadow-sm border border-neutral-gray100 mb-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-neutral-gray900">Personal Info</Text>
              {!isEditing && (
                <TouchableOpacity onPress={() => setIsEditing(true)}>
                  <Text className="text-primary font-bold">Edit</Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="space-y-4">
              <CustomInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                editable={isEditing}
                placeholder="Enter your name"
              />
              <CustomInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                editable={isEditing}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              <CustomInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={isEditing}
                placeholder="Enter your phone"
                keyboardType="phone-pad"
              />
            </View>

            {isEditing && (
              <View className="mt-8 flex-row space-x-4">
                <View className="flex-1">
                  <CustomButton
                    title="Cancel"
                    onPress={() => setIsEditing(false)}
                    className="bg-neutral-gray200"
                  />
                </View>
                <View className="flex-1">
                  <CustomButton title="Save Changes" onPress={handleSave} />
                </View>
              </View>
            )}
          </View>

          {/* Additional Settings/Info */}
          <View className="bg-white rounded-[32px] p-6 shadow-sm border border-neutral-gray100">
            <Text className="text-xl font-bold text-neutral-gray900 mb-6">Account Settings</Text>

            <ProfileOption icon="shield-checkmark-outline" label="Account Security" value="High" />
            <ProfileOption icon="notifications-outline" label="Notifications" value="On" />
            <ProfileOption icon="color-palette-outline" label="Theme" value="Light" />
            <ProfileOption icon="help-circle-outline" label="Support" />
            <ProfileOption
              icon="log-out-outline"
              label="Logout"
              color="text-red-500"
              iconColor="#EF4444"
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

interface ProfileOptionProps {
  icon: any;
  label: string;
  value?: string;
  color?: string;
  iconColor?: string;
  onPress?: () => void;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  icon,
  label,
  value,
  color = "text-neutral-gray900",
  iconColor = "#3B82F6",
  onPress,
}) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4 border-b border-neutral-gray50 last:border-0"
    onPress={onPress}
  >
    <View className="flex-row items-center">
      <View className="w-10 h-10 bg-neutral-gray50 rounded-xl items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text className={`text-base font-semibold ${color}`}>{label}</Text>
    </View>
    <View className="flex-row items-center">
      {value && <Text className="text-sm text-neutral-gray400 mr-2">{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
    </View>
  </TouchableOpacity>
);

export default ProfileScreen;
