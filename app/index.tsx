// app/index.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as SMS from "expo-sms";
import { useRouter } from "expo-router";

// Import functions from your contactsStore
import { getContacts, getAllContacts } from "../utils/contactsStore";

type Threat = "safe" | "warning" | "danger";

export default function Home() {
  const router = useRouter();
  const [threatLevel, setThreatLevel] = useState<Threat>("safe");

  // Animation for emergency pulse
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (threatLevel === "danger") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [threatLevel]);

  const getThreatColor = () => {
    switch (threatLevel) {
      case "safe":
        return "#16a34a";
      case "warning":
        return "#f59e0b";
      case "danger":
        return "#dc2626";
    }
  };

  // Panic button logic
  const handlePanic = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    const message = `🚨 EMERGENCY!\nhttps://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`;

    // Get all phone numbers from contactsStore
    const emergencyNumbers = getContacts(); // returns only phone numbers

    if (!emergencyNumbers || emergencyNumbers.length === 0) {
      Alert.alert(
        "No Emergency Contacts",
        "Please add emergency contacts in the Contacts page."
      );
      return;
    }

    // Check if SMS is available
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      try {
        await SMS.sendSMSAsync(emergencyNumbers, message);
        Alert.alert("Emergency", "Message sent to all emergency contacts!");
      } catch (err) {
        Alert.alert("Error", "Failed to send SMS. Please try manually.");
      }
    } else {
      Alert.alert(
        "SMS Not Available",
        "Your device cannot send SMS automatically."
      );
    }

    setThreatLevel("danger");
  };

  // Panic button press animation
  const buttonAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(buttonAnim, { toValue: 0.85, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(buttonAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SHEiLD Safety</Text>

      {/* Threat/State Card */}
      <Animated.View
        style={[
          styles.threatCard,
          { backgroundColor: getThreatColor(), transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Text style={styles.threatText}>{threatLevel.toUpperCase()} MODE</Text>
      </Animated.View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/map")}
        >
          <Text style={styles.actionText}>📍 Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/activity")}
        >
          <Text style={styles.actionText}>📜 Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/contacts")}
        >
          <Text style={styles.actionText}>📞 Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.actionText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Panic Button */}
      <View style={{ alignItems: "center" }}>
        <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.panicButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePanic}
          >
            <Ionicons name="alert" size={40} color="#fff" />
            <Text style={styles.panicText}>PANIC</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },

  threatCard: {
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  threatText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  actionBtn: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 10,
  },
  actionText: { fontSize: 12, fontWeight: "600" },

  panicButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  panicText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
});