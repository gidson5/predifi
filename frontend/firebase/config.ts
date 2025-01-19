// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore,updateDoc } from "firebase/firestore";
//import { doc, getFirestore, setDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBs3rH_4KQnO1FO7xqigU33uv654_aFI5E",
  authDomain: "realtor-clone-ad19c.firebaseapp.com",
  projectId: "realtor-clone-ad19c",
  storageBucket: "realtor-clone-ad19c.appspot.com",
  messagingSenderId: "347563487697",
  appId: "1:347563487697:web:ecc1c0eff0221f743f30f0",
};

// Initialize Firestore with custom settings
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export async function siteMetrics() {
  try {
    //Write metrics to the Firestore document
    const data = {
      totalBet: 0,
      totalUsers: 0,
      totalAccounts: 0,
    };
    const updatedData = doc(db, "predifi", "metrics");
    await updateDoc(updatedData, data);

    console.log("Metrics successfully written.");
  } catch (error) {
    console.error("Error writing metrics:", error);
  }
}

export default app;
