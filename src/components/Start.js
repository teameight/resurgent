import React from 'react';
import { withRouter } from 'react-router-dom';

class Start extends React.Component {
  render() {

    return (
      <section className="main sign-in">
          <header>
              <h1 className="page-title">Sign In</h1>
              <p className="subtitle">Enter your details below</p>
          </header>
          <form>
              <input name="email" type="email" placeholder="e-mail" />
              <input name="password" type="text" placeholder="password" />
              <input className="btn" onClick={() => this.props.history.push('/home')} value="Sign In" />
          </form>
          <div className="prefooter">
            <p>Need Help?</p>
            <p><a href="mailto:emily@districtlegalstaffing.com">contact the administrator</a></p>
          </div>
      </section>
    )
  }
}

export default withRouter(Start);