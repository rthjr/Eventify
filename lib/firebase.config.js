import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
  apiKey: "AIzaSyA-RU2uCypljM7xIFpGfT_3Gvdj_fksv_w",
  authDomain: "eventify-e6b8b.firebaseapp.com",
  projectId: "eventify-e6b8b",
  storageBucket: "eventify-e6b8b.firebasestorage.app",
  messagingSenderId: "163100814666",
  appId: "1:163100814666:web:8d07dcb54e4658c0cfa5b3",
  measurementId: "G-7DPSRCN237"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { app, auth }

