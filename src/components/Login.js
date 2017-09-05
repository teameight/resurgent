import React from 'react';

class Login extends React.Component {

	login() {
		this.props.auth.login();
	}

  render() {
  	let pTitle = 'Welcome';
  	let pMessage = '';

  	if(this.props.loggedOut){
  		pTitle = 'Success!';
  		pMessage = 'You have been logged out';
  	}

    return (
      <section className="main sign-in">
          <header>
              <h1 className="page-title">{pTitle}</h1>
              <p className="subtitle">{pMessage}</p>
          </header>
          <button type="button" className="btn" onClick={this.login.bind(this)}>Log In</button>
          <div className="prefooter">
            <p>Need Help?</p>
            <p><a href="#">contact the administrator</a></p>
          </div>
      </section>
    )
  }
}

export default Login;