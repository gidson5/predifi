// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs3rH_4KQnO1FO7xqigU33uv654_aFI5E",
  authDomain: "realtor-clone-ad19c.firebaseapp.com",
  projectId: "realtor-clone-ad19c",
  storageBucket: "realtor-clone-ad19c.appspot.com",
  messagingSenderId: "347563487697",
  appId: "1:347563487697:web:ecc1c0eff0221f743f30f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const db = getFirestore();
export default app;


// pub struct PoolDetails {
// // basic pool details
// address: starknet::ContractAddress,

// poolDescription: ByteArray,

// // pool timings: start time, lock time, end time
// poolStartTime: felt252,

// // pool options, the options that users can bet on
// option1: felt252,
// option2: felt252,
// // betamounts in strk
// minBetAmount: u8,
// maxBetAmount: u8,
// // the fee that the creator gets
// creatorFee: u8,
// status: Status,