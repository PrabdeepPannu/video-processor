import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import * as fs from "fs";
import * as path from "path";

// Load the service account key
const serviceAccountKeyPath =  "/opt/app/src/utils/serviceAccountKey.json";
const serviceAccountKey = JSON.parse(fs.readFileSync(serviceAccountKeyPath, "utf8"));

initializeApp({
  credential: cert(serviceAccountKey),
  storageBucket: "gs://video-processor-d7410.firebasestorage.app",
});

export const bucket = getStorage().bucket();