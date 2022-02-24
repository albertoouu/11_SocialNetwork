// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC536o8WHka0hBXDjzpjjIBcgIKYNS8kHo",
  authDomain: "social-network-28ee5.firebaseapp.com",
  projectId: "social-network-28ee5",
  storageBucket: "gs://social-network-28ee5.appspot.com",
  messagingSenderId: "432013311140",
  appId: "1:432013311140:web:1f4ca09728c15e5be1fa31",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
