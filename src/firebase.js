import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDgUqMPYn4d8Gp09uJ1YV69twzmbdMaqQI",
  authDomain: "document-app-6b035.firebaseapp.com",
  projectId: "document-app-6b035",
  storageBucket: "document-app-6b035.appspot.com", 
  messagingSenderId: "688441370024",
  appId: "1:688441370024:web:4433b4628717ef1d44699d",
  measurementId: "G-30ZBSMSEQE"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getFirestore(app);
export const storage = getStorage(app); 
