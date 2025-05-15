import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  // Paste your firebase secreat here
  "storageBucket": "gs://video-processor-d7410.firebasestorage.app",
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
