// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB8aYPKpocC86gGGFxtTfASw-wcL3ADmIk",
    authDomain: "medisoft0338.firebaseapp.com",
    projectId: "medisoft0338",
    storageBucket: "medisoft0338.appspot.com",
    messagingSenderId: "129054705307",
    appId: "1:129054705307:web:ecc5564432edd89d2aa83e",
    measurementId: "G-G04QS0G7TQ"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
}
else {
    app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };