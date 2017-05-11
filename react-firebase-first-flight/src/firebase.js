// firebase SDK
import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBODI4XcCIU0ns6nEpr7yiZKZEtPqj6Cq4",
  authDomain: "first-flight-38625.firebaseapp.com",
  databaseURL: "https://first-flight-38625.firebaseio.com",
  projectId: "first-flight-38625",
  // storageBucket for larger files
  storageBucket: "first-flight-38625.appspot.com",
  messagingSenderId: "1039216274644"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();