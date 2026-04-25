// app/contacts.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import {
  loadContacts,
  addContact,
  removeContact,
  getAllContacts,
  Contact,
} from "../utils/contactsStore";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const init = async () => {
      await loadContacts(); // load saved contacts from AsyncStorage
      fetchContacts();
    };
    init();
  }, []);

  const fetchContacts = () => {
    setContacts(getAllContacts());
  };

  const handleAddContact = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Please enter both name and phone number.");
      return;
    }
    await addContact(name, phone);
    setName("");
    setPhone("");
    fetchContacts();
  };

  const handleRemoveContact = async (id: string) => {
    await removeContact(id);
    fetchContacts();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Phone"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAddContact}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Add Contact</Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.phone}</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                Alert.alert("Delete?", `Delete ${item.name}?`, [
                  { text: "Cancel" },
                  { text: "Delete", onPress: () => handleRemoveContact(item.id) },
                ])
              }
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  addBtn: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});