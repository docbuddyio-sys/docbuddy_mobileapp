/**
 * Google Sign-In Configuration for Expo
 *
 * Replace these placeholders with your actual Client IDs from the Google Cloud Console.
 * 1. Go to https://console.cloud.google.com/
 * 2. Create/Select a project.
 * 3. Go to APIs & Services > Credentials.
 * 4. Create an "OAuth 2.0 Client ID" for Web Application.
 *
 * IMPORTANT:
 * - For Expo, you only need the WEB_CLIENT_ID
 * - Add the redirect URI to your Google Cloud Console:
 *   https://auth.expo.io/@YOUR_EXPO_USERNAME/docbuddy
 */

export const GOOGLE_AUTH_CONFIG = {
  androidClientId: "846550826824-kb4qqtumi3h8kv317f240vs6m4l5ckct.apps.googleusercontent.com", // Dummy client ID for now, replace in production
  webClientId: "846550826824-04tbo57p6grjeu8kb4epu99tvlug6l9h.apps.googleusercontent.com", // Dummy client ID for now, replace in production
};
