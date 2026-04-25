// utils/contactsStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Contact = {
  id: string;
  name: string;
  phone: string;
};

const STORAGE_KEY = "EMERGENCY_CONTACTS";

let contacts: Contact[] = [];

// Load contacts from AsyncStorage on initialization
export const loadContacts = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    contacts = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load contacts", e);
    contacts = [];
  }
  return contacts;
};

// Save contacts to AsyncStorage
const saveContacts = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.error("Failed to save contacts", e);
  }
};

// Get all contacts
export const getContacts = () => contacts.map(c => c.phone); // return only phone numbers

// Add a contact
export const addContact = async (name: string, phone: string) => {
  const newContact: Contact = {
    id: Date.now().toString(),
    name,
    phone,
  };
  contacts = [newContact, ...contacts];
  await saveContacts();
};

// Remove a contact by id
export const removeContact = async (id: string) => {
  contacts = contacts.filter(c => c.id !== id);
  await saveContacts();
};

// Get full contact objects (optional, for display in Contacts screen)
export const getAllContacts = () => contacts;