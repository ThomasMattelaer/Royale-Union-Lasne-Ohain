import { View } from "react-native";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LoginForm />
    </View>
  );
}
