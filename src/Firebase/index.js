import firebase from 'firebase';
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyB6ntEM30xxycqoKcaOSg8o17sMNDSSkjo",
    authDomain: "vinyl-app-cfa79.firebaseapp.com",
    databaseURL: "https://vinyl-app-cfa79.firebaseio.com",
    projectId: "vinyl-app-cfa79",
    storageBucket: "vinyl-app-cfa79.appspot.com",
    messagingSenderId: "4907570206",
    appId: "1:4907570206:web:83f8b13c2dc92b2a6b8a0f",
    measurementId: "G-TTJLTYTGEW"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };