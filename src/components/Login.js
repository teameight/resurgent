import React from 'react';
import firebase from '../fire';
import fbAuth from '../fire';

class Login extends React.Component {

  constructor() {
    super();

    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);

  }

	login() {
		this.props.auth.login();
	}

  toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }

  render() {
  	let pTitle = 'Sign In';
  	let pMessage = 'Enter your details below';

  	if(this.props.loggedOut){
  		pTitle = 'Success!';
  		pMessage = 'You have been signed out';
  	}

    return (
      <section className="main sign-in">
          <header>
              <h1 className="page-title">{pTitle}</h1>
              <p className="subtitle">{pMessage}</p>
          </header>
          <form>
              <input type="text" id="email" name="email" placeholder="Email"/>
              <input type="password" id="password" name="password" placeholder="Password"/>
              <button className="btn" id="quickstart-sign-in" onClick={  (e) => this.toggleSignIn() } type="button" name="signup">Sign in</button>
          </form>
          <div className="prefooter">
            <p>Need Help?</p>
            <p><a href="#">contact the administrator</a></p>
          </div>
      </section>
    )
  }
}

export default Login;