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

    const user = this.props.user;

    let uName = '';
    let uTokens = '';

    if(user != null){
      uName = user.name;
      uTokens = user.tokens;
    }
    // console.log(user);

		return (
			<section className="subheader">
          <div className="welcome">
              <p>Welcome, {uName}</p>
              <a href="#" onClick={  (e) => this.processLink(e, '/my-account') }>My Account</a>
          </div>
          <p className="token-counter"><span>TOKENS: </span><span className="t-count">{uTokens}</span></p>
      </section>
		)
	}
}

export default withRouter(SubHeader);