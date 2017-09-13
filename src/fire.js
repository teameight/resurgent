import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyBnqHJKZ3shP1bRfo3wvHVl15lyXn-bfig",
	authDomain: "resurgent-test.firebaseapp.com",
	databaseURL: "https://resurgent-test.firebaseio.com"
};
var fire = firebase.initializeApp(config);
export default fire;