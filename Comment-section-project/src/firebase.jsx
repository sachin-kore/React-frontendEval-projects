// src/firebase.js
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAawCJxGaMQehu6qN1bPMOSNoL8-6ow-_M',
//   authDomain: 'comment-section-21600.web.app',
//   projectId: 'comment-section-21600',
//   storageBucket: 'comment-section-21600.appspot.com',
//   messagingSenderId: '399030636356',
//   appId: 'YOUR_APP_ID',
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAawCJxGaMQehu6qN1bPMOSNoL8-6ow-_M',
  authDomain: 'comment-section-21600.firebaseapp.com',
  projectId: 'comment-section-21600',
  storageBucket: 'comment-section-21600.appspot.com',
  messagingSenderId: '399030636356',
  appId: '1:399030636356:web:44f67fc194014f59ed1111',
  measurementId: 'G-J3YKYCPL81',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export { auth, provider, db, signInWithPopup, signOut }
