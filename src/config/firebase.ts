import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCS0AUECWEoRKfo4bDAJgzfK7IFsqAsqU4",
  authDomain: "cumulonimbus-cloud-firebase.firebaseapp.com",
  projectId: "cumulonimbus-cloud-firebase",
  storageBucket: "cumulonimbus-cloud-firebase.appspot.com",
  messagingSenderId: "1090397435126",
  appId: "1:1090397435126:web:2cf99ea7b5ef46d82428d7",
  measurementId: "G-YGKCMR6P34"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);