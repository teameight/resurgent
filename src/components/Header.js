import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
          menuOpen: false,
      };

      this.toggleMenu= this.toggleMenu.bind(this);
      this.closeMenu= this.closeMenu.bind(this);
      this.processLink= this.processLink.bind(this);
  }

	toggleMenu() {
      this.setState(prevState => ({
	      menuOpen: !prevState.menuOpen
	    }));
  }

	closeMenu() {
      this.setState(prevState => ({
	      menuOpen: false
	    }));
  };

  processLink(e, path) {
  	e.preventDefault();
  	this.closeMenu();
  	if(path == 'logout'){
  		this.props.auth.logout();
  	}else{
	  	this.props.history.push(path);
  	}
  };

	render() {
		const { isAuthenticated } = this.props.auth;

		let headerClass = 'header-main';

		if (!isAuthenticated()){
			headerClass += ' logged-out';
		}

		return (
			<header className={ headerClass }>
        <div className="logo">
          <a href="#" onClick={	(e) => this.processLink(e, '/home') }><img src={require('../img/logo.png')} alt="Resurgent - Legal Outplacement" /></a>
        </div>
        { isAuthenticated() && (
        	<div className="menu-icon" >
		        <button type="button" className={this.state.menuOpen ? 'tcon tcon-menu--xcross tcon-transform': 'tcon tcon-menu--xcross'} aria-label="toggle menu" onClick={this.toggleMenu} >
			        <span className="tcon-menu__lines" aria-hidden="true"></span>
			        <span className="tcon-visuallyhidden">menu</span>
		      	</button>
	        </div>
				)}
	      { isAuthenticated() && (
					<nav className={this.state.menuOpen ? 'main-menu open': 'main-menu'}>
            <ul>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/home') }>Home</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/my-account')}>My Account</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/about')}>About</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/help')}>Help</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, 'logout')}>Sign Out</button></li>

            </ul>
        	</nav>
				)}
    	</header>
		)
	}
}

export default withRouter(Header);