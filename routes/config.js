// Import the necessary Firebase modules.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration object with your app's credentials.
const firebaseConfig = {
    apiKey: "AIzaSyApJjWS7iYmdftpEjNaPKqQLoE3EjOm-Pw",
    authDomain: "routes-c2a1c.firebaseapp.com",
    databaseURL: "https://routes-c2a1c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "routes-c2a1c",
    storageBucket: "routes-c2a1c.appspot.com",
    messagingSenderId: "6516729919",
    appId: "1:6516729919:web:ed36024fc274d878d2708a",
    measurementId: "G-3J37ER2X05"
  };

// Check if Firebase app is already initialized to avoid reinitialization.
if (!firebase.apps.length) {
  // Initialize Firebase with the provided configuration.
  firebase.initializeApp(firebaseConfig);
}

// Export the initialized Firebase instance for use in other parts of your application.
export { firebase };












