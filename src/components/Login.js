import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form name="login-form" className="login-form">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button type="submit">Log in</button>
      </form>
    )
  }
}

export default Login;