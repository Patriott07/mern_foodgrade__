// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHyFTi1O0aIz-tbnQZaUgfuAgNFosiBhE",
  authDomain: "belajar2-85049.firebaseapp.com",
  projectId: "belajar2-85049",
  storageBucket: "belajar2-85049.appspot.com",
  messagingSenderId: "905417792650",
  appId: "1:905417792650:web:7022f9b9cdba733fb56173"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
