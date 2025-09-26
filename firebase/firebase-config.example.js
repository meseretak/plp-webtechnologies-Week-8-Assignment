/* Example Firebase config file. To use Firestore storage for the contact form:
  1. Create a Firebase project at https://console.firebase.google.com/
  2. Add a web app and copy the firebaseConfig values
  3. Save this file as firebase-config.js in the firebase/ folder
  4. Uncomment the SDK <script> tags in contact.html
*/

// paste your config below and export as window.firebaseConfig
window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// then initialize (example):
// const app = firebase.initializeApp(window.firebaseConfig);
// const db = firebase.firestore();
