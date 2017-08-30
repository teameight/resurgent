import React from 'react';

class SubHeader extends React.Component {
	render() {

    const user = this.props.users;
    console.log(user);

		return (
			<section className="subheader">
          <div className="welcome">
              <p>Welcome, {user.name}</p>
              <a href="#">My Account</a>
          </div>
          <p className="token-counter"><span>TOKENS: </span><span className="t-count">{user.tokens}</span></p>
      </section>
		)
	}
}

export default SubHeader;