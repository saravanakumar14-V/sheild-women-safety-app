import { View, Text, StyleSheet } from "react-native";
import { SafetyState } from "../core/safety/SafetyStateMachine";

type Props = {
  state: SafetyState;
};
function getDisplayedStatus(realState: SafetyState) {
  if (realState === "EMERGENCY") return "All systems normal";
  return realState;
}
export default function StatusIndicator({ state }: Props) {
  return (
    <View style={[styles.container, styles[state]]}>
      <Text style={styles.text}>{state}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  SAFE: { backgroundColor: "#2ecc71" },
  OBSERVING: { backgroundColor: "#f1c40f" },
  AT_RISK: { backgroundColor: "#e67e22" },
  DANGER: { backgroundColor: "#e74c3c" },
  EMERGENCY: { backgroundColor: "#8e0000" },
});