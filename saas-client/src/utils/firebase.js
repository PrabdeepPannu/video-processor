// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Either paste it directly…
const firebaseConfig = {
  //paste your secret here
  "storageBucket": "gs://video-processor-d7410.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
