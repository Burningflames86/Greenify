import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyB9rxoBfs51ZP2COwyCxH6qFwqr3grvKsE",
  authDomain: "greenify-dc70f.firebaseapp.com",
  projectId: "greenify-dc70f",
  storageBucket: "greenify-dc70f.appspot.com",
  messagingSenderId: "1009696340360",
  appId: "1:1009696340360:web:0c402254318638da44e23d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export {db};