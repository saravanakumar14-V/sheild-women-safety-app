import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafetyOrb } from "../components/SafetyOrb";
import { colors } from "../theme/colors";
import "../src/firebaseConfig";
import { auth } from "../firebaseConfig";

export function HomeScreen() {
  useEffect(() => {
    console.log("Firebase connected:", auth.app.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 UI CONNECTED 🔥</Text>
      <SafetyOrb state="SAFE" />
      <Text style={styles.subtitle}>
        Monitoring silently. You are protected.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 24,
    color: colors.textSecondary,
  },
});