import { Stack } from "expo-router";
import { useAuthContext } from "../hooks/useAuth";
import AuthProvider from "../providers/auth-providers";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
      </Stack>
    </AuthProvider>
  );
}
