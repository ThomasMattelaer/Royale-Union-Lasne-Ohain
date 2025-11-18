import { useEffect } from "react";
import { router } from "expo-router";
import { useAuthContext } from "../hooks/useAuth";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function IndexPage() {
  const { isLoggedIn, profile, isLoading } = useAuthContext();

  useEffect(() => {
    console.log('IndexPage useEffect triggered:', { isLoggedIn, profile, isLoading });
    if (isLoading) return; 
    if (!isLoggedIn) {
      console.log('Not logged in, redirecting to login');
      router.replace("/(auth)/login");
      return;
    }
    if (profile?.role === "player") router.replace("/authenticated/player");
    else if (profile?.role === "admin") router.replace("/authenticated/admin");
    else if (profile?.role === "bar") router.replace("/authenticated/bar");
  }, [isLoggedIn, profile, isLoading]);

  if (isLoading) {
    // Show a loading indicator or blank screen while loading
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center", flex: 1 },
        ]}
      >
        <Text>Loading...</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
