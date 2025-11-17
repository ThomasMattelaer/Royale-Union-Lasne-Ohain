import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { Session } from "@supabase/supabase-js";

export default function PlayerDashboard(){

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
