// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxFZbctLaFQhf6i5X5puAH1WaDtgeqHsQ",
  authDomain: "shahmukhiacademia.firebaseapp.com",
  projectId: "shahmukhiacademia",
  storageBucket: "shahmukhiacademia.appspot.com",
  messagingSenderId: "499638445802",
  appId: "1:499638445802:web:bf47ffbc83a59996f69993"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig,{
    experimentalForceLongPolling: true
    })

  export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
    })

  export const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

export const ref1 = ref;
// export const authh = auth;
export const storage = getStorage(app);