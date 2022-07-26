import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const appConfig = {
 
};

const app = initializeApp(appConfig);
export const auth = getAuth(app);