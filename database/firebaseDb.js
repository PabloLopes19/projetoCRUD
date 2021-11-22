// database/firebaseDb.js

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwa8t3zgxKaBl-OzKviGHk5ZcYkjx0f5Q",
  authDomain: "projetocrud-ef7be.firebaseapp.com",
  projectId: "projetocrud-ef7be",
  storageBucket: "projetocrud-ef7be.appspot.com",
  messagingSenderId: "1062026984799",
  appId: "1:1062026984799:web:df1d804602068489d34aea",
  measurementId: "G-0R7654020S"
};
// Initialize Firebase
//const app = initializeApp(firebaseConfig);


firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;