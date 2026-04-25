// utils/sendEmergencySMS.ts
import { Linking, Alert } from "react-native";
import { getAllContacts, Contact } from "./contactsStore";

export const sendEmergencySMS = (latitude: number, longitude: number) => {
  const contacts: Contact[] = getAllContacts();

  if (contacts.length === 0) {
    Alert.alert("No Contacts", "You have no emergency contacts to send SMS.");
    return;
  }

  const message = `🚨 EMERGENCY ALERT 🚨
I need help immediately!
https://www.google.com/maps?q=${latitude},${longitude}`;

  contacts.forEach((contact) => {
    Linking.openURL(`sms:${contact.phone}?body=${encodeURIComponent(message)}`);
  });

  Alert.alert("Alert Sent", "Emergency SMS sent to all contacts.");
};