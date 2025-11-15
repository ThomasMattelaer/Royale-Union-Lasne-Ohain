import { StyleSheet, View, Alert, Text, Button } from "react-native";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

export default function PlayerDashboard() {

  return(
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Player Dashboard</Text>
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
    </View>
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
