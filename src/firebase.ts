import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBDNhp8_L2LdvSxoC01DzvMoWgk3nyX2YTc",
  authDomain: "silahkodlari.firebaseapp.com",
  projectId: "silahkodlari",
  storageBucket: "silahkodlari.appspot.com",
  messagingSenderId: "31679816010",
  appId: "1:31679816010:web:872194d0b48adf6394a1b3"
  // measurementId: "G-KD57SH9GCP" // Analytics kullanmayacaksan gerek yok
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); 