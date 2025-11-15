import { View } from "react-native";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <SignUpForm />
    </View>
  );
}
