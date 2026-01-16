import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import OTPScreen from "../screens/Auth/OTPScreen";
import CreateMpinScreen from "../screens/MPIN/CreateMpinScreen";
import MpinInputScreen from "../screens/MPIN/MpinInputScreen";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import HomeWithNavigation from "../screens/Home/HomeWithNavigation";
import DocumentListScreen from "../screens/Document/DocumentListScreen";
import DocumentDetailScreen from "../screens/Document/DocumentDetailScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="CreateMpin" component={CreateMpinScreen} />
        <Stack.Screen name="MpinInput" component={MpinInputScreen} />
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
