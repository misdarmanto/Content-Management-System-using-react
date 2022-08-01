import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const appConfig = {
 
};


const app = initializeApp(appConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);