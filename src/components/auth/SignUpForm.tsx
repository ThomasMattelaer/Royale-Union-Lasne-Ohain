import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState(""); 
  const [loafing, setLoading]   = useState(false);


  async function handleSignUp() {
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error){
      alert(error.message);
      setLoading(false);
      return; 
    }

  if (data.user) {
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        username: userName,
        full_name: fullName,
        updated_at: new Date(),
      })
      .eq("id", data.user.id);

    if (updateError) console.error(updateError);
    router.replace('/')
  }

    setLoading(false)
  }
  

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Input
        label="Full Name"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        placeholder="John Doe"
        autoCapitalize={"none"}
      />
      </View>
      
      <View style={[styles.verticallySpaced]}>
      <Input
        label="Username"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        onChangeText={(text) => setUserName(text)}
        value={userName}
        placeholder="johndoe"
        autoCapitalize={"none"}
      />
      </View>
      
      <View style={[styles.verticallySpaced]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email"
          autoCapitalize={"none"}
        />
      </View>
      <Input
        label="Password"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="*******"
        autoCapitalize={"none"}
      />
      <Button
        style={[styles.verticallySpaced, styles.mt20]}
        title="Sign up"
        onPress={handleSignUp}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text>
          Already have an account?{" "}
          <Text style={{ color: "blue" }} onPress={() => router.push("/login")}>
            Sign in
          </Text>
        </Text>
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
