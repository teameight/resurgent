import React from 'react';
import { withRouter } from 'react-router-dom';

class Footer extends React.Component {

	render() {
		let footerContent = '';

		if(this.props.user && this.props.isReg) {
      footerContent =
	      <div className="wrap">
		      <a className="terms" href="/terms">Terms</a>
		      <div className="logo">
		          <a href="https://www.districtlegalstaffing.com/"><img src={require('../img/dls-logo.png')} alt="DLS - District Legal Staffing" /></a>
		      </div>
	      </div>
		}else{
			footerContent =
				<div className="wrap">
					<div className="logo">
	          <a href="https://www.districtlegalstaffing.com/"><img src={require('../img/dls-logo.png')} alt="DLS - District Legal Staffing" /></a>
	      	</div>
	      </div>
		}

		return (
				<footer className="footer-main">
					{ footerContent }
				</footer>
		)
	}
}

export default withRouter(Footer);