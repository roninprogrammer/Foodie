import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD0TqH4DqGOg75e-fSBMWOIDdjJVy5pEVI",
    authDomain: "foodie-9560b.firebaseapp.com",
    databaseURL: "https://foodie-9560b.firebaseio.com",
    projectId: "foodie-9560b",
    storageBucket: "foodie-9560b.appspot.com",
    messagingSenderId: "976241573731",
    appId: "1:976241573731:web:93d041d899a96d95"

  };

 const firebaseApp = firebase.initializeApp(firebaseConfig) ;
 export default firebaseApp;