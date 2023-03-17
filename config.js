import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyAskZptCbPprWTMCWpWuDoRGFb7Y-Vd8WM",
//     authDomain: "it20278144lab04.firebaseapp.com",
//     projectId: "it20278144lab04",
//     storageBucket: "it20278144lab04.appspot.com",
//     messagingSenderId: "1035944649508",
//     appId: "1:1035944649508:web:8474e71585bd0b57cbc9b1",
//     measurementId: "G-6MC288WBYY"
//   };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

const auth = firebase.auth();

export { auth };

