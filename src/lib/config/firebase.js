import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const appConfig = {
  apiKey: "AIzaSyAIF0h0NSEotP5jCINdl__wyPaa3NWlXBw",
  authDomain: "misdar-blog.firebaseapp.com",
  projectId: "misdar-blog",
  storageBucket: "misdar-blog.appspot.com",
  messagingSenderId: "327499720236",
  appId: "1:327499720236:web:7049c883ff0eb8c8791389"
};


const app = initializeApp(appConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);