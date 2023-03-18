import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCo2Q8cwL6-bDPLA-QTWamB4ZPbjc70KdU",
    authDomain: "eventmangementreactnative.firebaseapp.com",
    projectId: "eventmangementreactnative",
    storageBucket: "eventmangementreactnative.appspot.com",
    messagingSenderId: "885338744889",
    appId: "1:885338744889:web:f6e26359e1de49f47fc5e8",
    measurementId: "G-4TWH1C9YGH"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

const auth = firebase.auth();

export { auth };

