import { initializeApp } from "firebase/app"
import * as firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAGVTcQkM2p1_pFlekCZhZbAWWA51hzf3I",
    authDomain: "app-meau.firebaseapp.com",
    projectId: "app-meau",
    storageBucket: "app-meau.appspot.com",
    messagingSenderId: "998058412235",
    appId: "1:998058412235:web:5c100529b52224b4d6f34e"
  };

let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const auth = firebase.auth();

export { auth }