// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBM1SBuSDniRwX6sQD6M4_9U_d7BiZq0Qc',
  authDomain: 'my-shopping-13a37.firebaseapp.com',
  projectId: 'my-shopping-13a37',
  storageBucket: 'my-shopping-13a37.appspot.com',
  messagingSenderId: '970598550386',
  appId: '1:970598550386:web:90af864b916c33b57b6beb',
  measurementId: 'G-YFDPTG19C6'
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export default firebase
