import firebase from 'firebase';


// STAGING CONFIG
var config = { 
  apiKey: "AIzaSyBnqHJKZ3shP1bRfo3wvHVl15lyXn-bfig",
	authDomain: "resurgent-test.firebaseapp.com",
	databaseURL: "https://resurgent-test.firebaseio.com"
};

// PRODUCTION CONFIG
// var config = {
//     apiKey: "AIzaSyBF04nU57cZAp_QoLZacQ_RuqjP6zZkcxw",
//     authDomain: "resurgent-prod.firebaseapp.com",
//     databaseURL: "https://resurgent-prod.firebaseio.com",
//     projectId: "resurgent-prod",
//     storageBucket: "resurgent-prod.appspot.com",
//     messagingSenderId: "454296414996"
//   };

firebase.initializeApp(config);

// export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const fbAuth = firebase.auth();