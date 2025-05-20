import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWB2xJuFfIrevkVP_X6DYAokf2ORh6BQE",
  authDomain: "aparecida-web.firebaseapp.com",
  projectId: "aparecida-web",
  storageBucket: "aparecida-web.firebasestorage.app",
  messagingSenderId: "292102714535",
  appId: "1:292102714535:web:564e7bde2abd7f1e525782",
  measurementId: "G-J5PRME4EEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };