import React from 'react';

class Header extends React.Component {
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
				<button type="button" className="tcon tcon-menu--xcross" aria-label="toggle menu">
	        <span className="tcon-menu__lines" aria-hidden="true"></span>
	        <span className="tcon-visuallyhidden">menu</span>
	      </button>
		}

		return (
			<header className={ headerClass }>
        <div className="logo">
          <a href="#"><img src="img/logo.png" alt="Resurgent - Legal Outplacement" /></a>
        </div>
        <div className="menu-icon">
          { actionButton }
        </div>
				{ isAuthenticated && !isModal && (
					<nav className="main-menu">
            <ul>
                <li><a href="../resurgent/index.html">Home</a></li>
                <li><a href="../resurgent/my-account.html">My Account</a></li>
                <li><a href="../resurgent/about.html">About</a></li>
                <li><a href="../resurgent/help.html">Help</a></li>
                <li><a href="../resurgent/logout.html">Sign Out</a></li>
            </ul>
        	</nav>
				)}
    	</header>
		)
	}
}

export default Header;