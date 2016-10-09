import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAdhdS2BHGNfSnjZ2C9LSvMpvSibExRfcs",
  authDomain: "blog-1c523.firebaseapp.com",
  databaseURL: "https://blog-1c523.firebaseio.com",
  storageBucket: "blog-1c523.appspot.com",
  messagingSenderId: "795061346481"
}

const firebaseRef = firebase.initializeApp(firebaseConfig)
const FirebaseBaseRef = firebaseRef.database()

export { FirebaseBaseRef, firebaseRef }

