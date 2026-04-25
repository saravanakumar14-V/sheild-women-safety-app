import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getLogs } from "../utils/activityStore";

export default function Activity() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity History</Text>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#888" }}>
            No activity yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  card: {
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  message: { fontWeight: "bold" },
  time: { color: "#666", marginTop: 4 },
});