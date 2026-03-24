import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import OTPScreen from "../screens/Auth/OTPScreen";
import CreateMpinScreen from "../screens/MPIN/CreateMpinScreen";
import MpinInputScreen from "../screens/MPIN/MpinInputScreen";
import MpinLoginScreen from "../screens/MPIN/MpinLoginScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import HomeWithNavigation from "../screens/Home/HomeWithNavigation";
import DocumentListScreen from "../screens/Document/DocumentListScreen";
import DocumentDetailScreen from "../screens/Document/DocumentDetailScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { useUser } from "../context/UserContext";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0F4CCD" />
      </View>
    );
  }

  // If user has an email or userId, they are considered logged in
  const isLoggedIn = !!(user?.email || user?.userId);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName={isLoggedIn ? "MpinLogin" : "Login"}
      >
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateMpin" component={CreateMpinScreen} />
        <Stack.Screen name="MpinInput" component={MpinInputScreen} />
        <Stack.Screen name="MpinLogin" component={MpinLoginScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeWithNavigation} />
        <Stack.Screen name="DocumentList" component={DocumentListScreen} />
        <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
