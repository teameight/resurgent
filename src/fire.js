import firebase from 'firebase';

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyBnqHJKZ3shP1bRfo3wvHVl15lyXn-bfig",
	authDomain: "resurgent-test.firebaseapp.com",
	databaseURL: "https://resurgent-test.firebaseio.com"
};
firebase.initializeApp(config);

// export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const fbAuth = firebase.auth();