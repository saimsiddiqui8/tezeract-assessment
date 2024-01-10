import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLKqarTvwEi1ZxCOvUUxyZF2w47WU98ig",
  authDomain: "tezeract-assessment.firebaseapp.com",
  projectId: "tezeract-assessment",
  storageBucket: "tezeract-assessment.appspot.com",
  messagingSenderId: "928960757046",
  appId: "1:928960757046:web:91bf1c0e16d703cb200797"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db ;