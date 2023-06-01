// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfVCtjY2W8BTzSZ_ScvDxAB61sHezrUFk',
  authDomain: 'vue-firebase-12889.firebaseapp.com',
  projectId: 'vue-firebase-12889',
  storageBucket: 'vue-firebase-12889.appspot.com',
  messagingSenderId: '534398401036',
  appId: '1:534398401036:web:7023fe749da3938efe0c29',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Authentification
const auth = getAuth();

export default { analytics, db, auth };
