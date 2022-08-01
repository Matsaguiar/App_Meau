
import { initializeApp } from "firebase/app"
// import * as firebase from "firebase"
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAGVTcQkM2p1_pFlekCZhZbAWWA51hzf3I",
    authDomain: "app-meau.firebaseapp.com",
    projectId: "app-meau",
    storageBucket: "app-meau.appspot.com",
    messagingSenderId: "998058412235",
    appId: "1:998058412235:web:5c100529b52224b4d6f34e"
  };

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

// export {auth}
export { auth, db }


////////////////////////////////////////////////////////////////////// OUTRO DB //////////////////////////////////////////////////////////////////////

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app"
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// // import { getFirestore } from "firebase/firestore";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAkLOsniosfRJ0b3V4S2THEGNW92RNFPYY",
//   authDomain: "appmeau-15b57.firebaseapp.com",
//   projectId: "appmeau-15b57",
//   storageBucket: "appmeau-15b57.appspot.com",
//   messagingSenderId: "1049101518274",
//   appId: "1:1049101518274:web:5e58a2058129a42517c25b"
// };

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// }else{
//   app = firebase.app();
// }

// const db = firebase.firestore();
// const auth = firebase.auth();

// export { auth, db }