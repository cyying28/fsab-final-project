import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBdHuzcpRqFxY17V3BlIzv8G_8oUZjeYD0",
    authDomain: "full-stack-app-de3ec.firebaseapp.com",
    projectId: "full-stack-app-de3ec",
    storageBucket: "full-stack-app-de3ec.appspot.com",
    messagingSenderId: "25391795936",
    appId: "1:25391795936:web:5b0b8dded094091f810a85",
    measurementId: "G-YSMCLDYVR6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };