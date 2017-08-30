import React from 'react';
import { withRouter } from 'react-router-dom';

class SubHeader extends React.Component {

  constructor(props) {
      super(props);
      
      this.processLink= this.processLink.bind(this);
      
  }

  processLink(e, path) {
    e.preventDefault();
    this.props.history.push(path);
  };

	render() {

    const user = this.props.users;
    // console.log(user);

		return (
			<section className="subheader">
          <div className="welcome">
              <p>Welcome, {user.name}</p>
              <a href="#" onClick={  (e) => this.processLink(e, '/my-account') }>My Account</a>
          </div>
          <p className="token-counter"><span>TOKENS: </span><span className="t-count">{user.tokens}</span></p>
      </section>
		)
	}
}

export default withRouter(SubHeader);