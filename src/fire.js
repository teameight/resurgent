import firebase from 'firebase';

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyBF04nU57cZAp_QoLZacQ_RuqjP6zZkcxw",
  authDomain: "resurgent-prod.firebaseapp.com",
  databaseURL: "https://resurgent-prod.firebaseio.com",
  projectId: "resurgent-prod",
  storageBucket: "resurgent-prod.appspot.com",
  messagingSenderId: "454296414996"
};
firebase.initializeApp(config);

// export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const fbAuth = firebase.auth();