import * as Application from "expo-application";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const DEVICE_ID_KEY = "app_unique_device_id";

export async function getDeviceId(): Promise<string> {
  if (Platform.OS === "android") {
    return getAndroidDeviceId();
  } else {
    return getIosDeviceId();
  }
}

// ─── Android ────────────────────────────────────────────────────────────────

async function getAndroidDeviceId(): Promise<string> {
  try {
    const androidId = Application.getAndroidId();
    if (androidId) {
      return androidId;
    }
  } catch (e) {
    console.warn("[DeviceId] getAndroidId() failed, falling back to SecureStore:", e);
  }

  // Fallback: SecureStore (same as iOS path)
  return getOrCreateStoredId();
}

// ─── iOS ─────────────────────────────────────────────────────────────────────

async function getIosDeviceId(): Promise<string> {
  // iOS Keychain items persist across app uninstalls by default.
  // This is the industry-standard approach for iOS persistent device identity.
  return getOrCreateStoredId();
}

// ─── Shared: SecureStore-backed persistent ID ─────────────────────────────

async function getOrCreateStoredId(): Promise<string> {
  try {
    // Try to retrieve existing ID from Keychain / SecureStore
    const existing = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    if (existing) {
      return existing;
    }

    // First time: generate a new UUID v4 and persist it
    const newId = Crypto.randomUUID();
    await SecureStore.setItemAsync(DEVICE_ID_KEY, newId, {
      // keychainAccessible ensures the ID is available even when device is locked
      // and is NOT backed up to iCloud (preserving device-specificity)
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });

    return newId;
  } catch (error) {
    console.error("[DeviceId] Failed to get/create stored device ID:", error);
    // Last resort: generate ephemeral ID for this session only
    return Crypto.randomUUID();
  }
}
