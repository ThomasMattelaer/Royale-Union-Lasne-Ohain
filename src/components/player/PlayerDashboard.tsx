import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { useAuthContext } from "../../hooks/useAuth";

export default function PlayerDashboard() {
  const { session, profile, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}> 
        <Text style={styles.loading}>Chargement des informations...</Text>
      </View>
    );
  }

  if (!profile || !session) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Aucune information de joueur trouvée.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hello, {profile.username} 👋</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.value}>{profile.full_name || profile.username || 'Non renseigné'}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Email :</Text>
        <Text style={styles.value}>{session.user.email || 'Non renseigné'}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Balance :</Text>
        <Text style={styles.balance}>{profile.balance != null ? `${profile.balance} €` : 'N/A'}</Text>
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
    flex: 1,
    padding: 24,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#2c3e50',
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#2980b9',
    fontWeight: '400',
  },
  balance: {
    fontSize: 18,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
});
