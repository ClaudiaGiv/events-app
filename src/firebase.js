import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

// const settings = { timestampsInSnapshots: true };
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDllwALs0-0dYoJs_Btdn2zZPyIOtEvZx0",
    authDomain: "eventsapp-f8428.firebaseapp.com",
    projectId: "eventsapp-f8428",
    storageBucket: "eventsapp-f8428.appspot.com",
    messagingSenderId: "785101958720",
    appId: "1:785101958720:web:f5118a17fb279437d6f9a5",
    measurementId: "G-NN15C89PB6"
};

// const analytics = getAnalytics(app);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db, auth, updateProfile};
