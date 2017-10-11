import React from 'react';
import firebase from '../fire';

class Registration extends React.Component {

  constructor() {
    super();

    this.state = {
      regCode:false,
      email:''
    };

    this.handleAuthString = this.handleAuthString.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.signIn = this.signIn.bind(this);

  }

  componentWillMount () {
    if(this.props.location.search){
      this.handleAuthString();
    }
  }

  handleAuthString() {
    const search = this.props.location.search;
    if(search.includes('oobCode=')){
      let code = ''; 
      let codeSplit = search.split("oobCode=")[1];
      code = codeSplit.split("&")[0];

      let that = this;
      firebase.auth().verifyPasswordResetCode(code)
      .then(function(email) {
        that.setState({
          regCode:code,
          email:email
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }

  handleRegister(e) {
    e.preventDefault();
    let code = this.state.regCode; 
    let newPassword = this.password.value;
    let that = this;
    firebase.auth().confirmPasswordReset(code, newPassword)
    .then(function() {
      // Success
      that.signIn(newPassword);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  signIn(password){
    let that = this;
    const email = this.state.email;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
      // Success
        that.props.setNotice({
          type: 'success',
          message: 'Your password has been set'
        });
        that.props.history.push('/');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        that.props.setNotice({
          type: 'warning',
          message: 'The email or password is invalid'
        });
      } else {
        that.props.setNotice({
          type: 'warning',
          message: ' ' + errorMessage
        });
      }
    });

  }

  handleInvite(e) {
    e.preventDefault();
    const emailAddress = this.email.value; //confirm from heroku before setting this
    let that = this;
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
      that.props.setNotice({
        type: 'success',
        message: 'An invitation has been resent to '+emailAddress
      });
    }).catch(function(error) {
      console.log(error);
      that.props.setNotice({
        type: 'warning',
        message: 'The email address provided is not associated with your account. Please enter the email address used for the original invitation.'
      });
    });
  }

  render() {

    let title = 'Registration';
    let subtitle = 'This registration token has expired. Please enter your email address below to receive a fresh invitation to your inbox.';

    if(this.state.regCode){
      title = 'Welcome';
      subtitle = 'Create a password to register.';
    }

    return (
      <section className="main sign-in">
          <header>
              <h1 className="page-title">{title}</h1>
              <p className="subtitle">{subtitle}</p>
          </header>
          {
            this.state.regCode && (
              <form ref={(input) => this.pwordForm = input}onSubmit={(e) => this.handleRegister(e)}>
                <input ref={(input) => this.password = input}name="password" type="password" placeholder="password" required />
                <input className="btn" type="submit" value="Register" />
              </form>
            )     
          }
          {
            !this.state.regCode && (
              <form ref={(input) => this.emailForm = input}onSubmit={(e) => this.handleInvite(e)}>
                <input ref={(input) => this.email = input}name="email" type="text" placeholder="email" required />
                <input className="btn" type="submit" value="Resend Invitation" />
              </form>
            )     
          }
          <div className="prefooter">
            <p>Need Help?</p>
            <p><a href="mailto:emily@districtlegalstaffing.com">contact the administrator</a></p>
          </div>
      </section>
    )
  }
}
export default Registration;