import { useEffect } from "react";
import { router } from "expo-router";
import { useAuthContext } from "../hooks/useAuth";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function IndexPage() {
  const { isLoggedIn, profile, isLoading } = useAuthContext();

  useEffect(() => {
    console.log("is Loading index:", isLoading);
    if (isLoading) return;
    console.log("User logged In :", isLoggedIn);

    if (!isLoggedIn) {
      router.replace("/(auth)/login");
      return;
    }

    console.log("User profile:", profile);
    if (profile?.role === "player") router.replace("/authenticated/player");
    else if (profile?.role === "admin") router.replace("/authenticated/admin");
    else if (profile?.role === "bar") router.replace("/authenticated/bar");
  }, [isLoggedIn, profile, isLoading]);

    return(
      <ScrollView style={styles.container}>
        <View >
          <Text >Hello @Name of the player 👋</Text>
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign Out"
            onPress={async () => {
              await supabase.auth.signOut();
              router.replace("/login");
            }}
          />
        </View>
      </ScrollView>
    );
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
