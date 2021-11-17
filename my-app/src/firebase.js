
import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseApp=firebase.initializeApp(
    {
        apiKey: "AIzaSyAUMeQY040TOefso-9Zgm2ISRTtShg-LHo",
        authDomain: "todo-21e63.firebaseapp.com",
        projectId: "todo-21e63",
        storageBucket: "todo-21e63.appspot.com",
        messagingSenderId: "111032237509",
        appId: "1:111032237509:web:f4b48f24d442e95c7b1fac",
        measurementId: "G-P7GRZDRMXM"
      }
);

const db=firebaseApp.firestore();

export default db;
