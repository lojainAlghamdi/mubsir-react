// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDLrfx2hVxnlPnABoa1QK3IijOjY5NVBU4",
    authDomain: "mubsir-fbece.firebaseapp.com",
    projectId: "mubsir-fbece",
    storageBucket: "mubsir-fbece.firebasestorage.app",
    messagingSenderId: "422711446290",
    appId: "1:422711446290:web:173f907e94ec67015981cb",
    measurementId: "G-1DPCBTCBM9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 
const analytics = getAnalytics(app);

export { auth, provider };