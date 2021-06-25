import firebase from "firebase/app";
import "firebase/firebase-database"

var firebaseConfig = {
    apiKey: "AIzaSyB1SrxUHMtamDSz47kAicK6v8aApK1lDpg",
    authDomain: "react-crud-ac491.firebaseapp.com",
    databaseURL: "https://react-crud-ac491-default-rtdb.firebaseio.com",
    projectId: "react-crud-ac491",
    storageBucket: "react-crud-ac491.appspot.com",
    messagingSenderId: "766094499186",
    appId: "1:766094499186:web:b6e6d10c74ee25af6891eb"
};
// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();