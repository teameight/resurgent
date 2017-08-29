import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
          menuOpen: false,
      };

      this.toggleMenu= this.toggleMenu.bind(this);
      
  }

	toggleMenu() {
      this.setState(prevState => ({
	      menuOpen: !prevState.menuOpen
	    }));
  };

	render() {
		const { isAuthenticated } = this.props.auth;
		const isModal = this.props.isModal;

		let headerClass = 'header-main';
		let actionButton = '';

		if (!isAuthenticated){
			headerClass += ' logged-out';
		}

		if(isAuthenticated && isModal) {
			actionButton = 
				<button type="button" className="tcon tcon-remove" aria-label="remove item">
          <span className="tcon-visuallyhidden">remove item</span>
        </button>
		}

		if(isAuthenticated && !isModal) {

			actionButton = 
				<button type="button" className={this.state.menuOpen ? 'tcon tcon-menu--xcross tcon-transform': 'tcon tcon-menu--xcross'} aria-label="toggle menu" onClick={this.toggleMenu} >
	        <span className="tcon-menu__lines" aria-hidden="true"></span>
	        <span className="tcon-visuallyhidden">menu</span>
	      </button>
		}

		return (
			<header className={ headerClass }>
        <div className="logo">
          <a href="#"><img src="img/logo.png" alt="Resurgent - Legal Outplacement" /></a>
        </div>
        <div className="menu-icon" >
          { actionButton }
        </div>
				{ isAuthenticated && !isModal && (
					<nav className={this.state.menuOpen ? 'main-menu open': 'main-menu'}>
            <ul>
                <li><button type="button" onClick={() => this.props.history.push('/')}>Home</button></li>
                <li><button type="button" onClick={() => this.props.history.push('/my-account')}>My Account</button></li>
                <li><button type="button" onClick={() => this.props.history.push('/about')}>About</button></li>
                <li><button type="button" onClick={() => this.props.history.push('/help')}>Help</button></li>
                <li><button type="button" onClick={() => this.props.history.push('/sign-out')}>Sign Out</button></li>
            </ul>
        	</nav>
				)}
    	</header>
		)
	}
}

export default withRouter(Header);