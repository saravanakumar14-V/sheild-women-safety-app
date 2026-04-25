import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDol5ZoS-YPdDiHSUpFeKhQagtZR1K8W7c",
  authDomain: "sheild-app-e3bd9.firebaseapp.com",
  projectId: "sheild-app-e3bd9",
  storageBucket: "sheild-app-e3bd9.firebasestorage.app",
  messagingSenderId: "1005830658570",
  appId: "1:1005830658570:web:854c30f0623a390f4dddf3",
  measurementId: "G-4YQ06ZCMJP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
