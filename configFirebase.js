// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDocs, where, getFirestore, collection, query } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB81-vUvv6husM7TbM311G1YK0qt3_RG9k",
    authDomain: "micare-55692.firebaseapp.com",
    projectId: "micare-55692",
    storageBucket: "micare-55692.appspot.com",
    messagingSenderId: "762783224313",
    appId: "1:762783224313:web:284831ce70beeb81056d28",
    measurementId: "G-SGZ5L3ME73"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
} else {
    app = getApp()
}

const auth = getAuth(app)
const db = getFirestore(app)
const currentUser = {
    authId: null,
    dbId: null,
    fullname: null,
    username: null,
    email: null,
}

async function onAuthChanged() {
    const user = auth.currentUser

    if (user) {

        const q = query(collection(db, "users"), where("email", "==", user.email));
        const queryResult = await getDocs(q);

        const result = []

        queryResult.forEach((record) => {
            result.push(record.data())
        })

        if (result.length !== 0) {
            currentUser.authId = user.uid
            currentUser.fullname = result[0].fullname
            currentUser.username = result[0].username
            currentUser.email = result[0].email
        }

    } else {
        currentUser.authId = null
        currentUser.dbId = null
        currentUser.fullname = null
        currentUser.username = null
        currentUser.email = null
    }
};

export { auth, db, onAuthChanged, currentUser }