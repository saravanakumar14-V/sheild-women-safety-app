import "./firebaseConfig";
import { Text, View } from "react-native";

console.log("🔥 NEW TEST LOG");

export default function App() {
  console.log("🔥 INSIDE APP COMPONENT");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>App.tsx is running</Text>
    </View>
  );
}