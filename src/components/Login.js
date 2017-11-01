import React from 'react';
import firebase from '../fire';

class Login extends React.Component {

  constructor() {
    super();

    this.toggleSignIn = this.toggleSignIn.bind(this);

  }

  componentWillUnmount () {
    this.props.clearNotices();
  }

	login() {
		this.props.auth.login();
	}

  toggleSignIn(e) {
    e.preventDefault();

    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = this.email.value;
      var password = this.password.value;
      if (email.length < 4) {
        this.props.setNotice({
          type: 'warning',
          message: 'Please enter an email address.'
        });
        return;
      }
      if (password.length < 4) {
        this.props.setNotice({
          type: 'warning',
          message: 'Please enter a password.'
        });
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      let that = this;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          that.props.setNotice({
            type: 'warning',
            message: 'The email or password is invalid.'
          });
        } else {
          that.props.setNotice({
            type: 'warning',
            message: ' ' + errorMessage
          });
        }
      });
      // [END authwithemail]
    }
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
          <form ref={(input) => this.signinForm = input}onSubmit={(e) => this.toggleSignIn(e)}>
                <input ref={(input) => this.email = input}name="email" type="text" placeholder="email" required />
                <input ref={(input) => this.password = input}name="password" type="password" placeholder="password" required />
                <input className="btn" type="submit" value="Sign In" />
              </form>
          <div className="prefooter">
            <p>Need Help?</p>
            <p><a href="mailto:emily@districtlegalstaffing.com">contact the administrator</a></p>
          </div>
      </section>
    )
  }
}
export default Login;