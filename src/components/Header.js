import React from 'react';

class Header extends React.Component {
	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<header className="header-main">
        <div class="logo">
          <a href="#"><img src="img/logo.png" alt="Resurgent - Legal Outplacement" /></a>
        </div>
        {
					isAuthenticated() && (
			        <div class="menu-icon">
			          <button type="button" class="tcon tcon-menu--xcross" aria-label="toggle menu">
			            <span class="tcon-menu__lines" aria-hidden="true"></span>
			            <span class="tcon-visuallyhidden">menu</span>
			          </button>
			        </div>
	        )
        }

    	</header>
		)
	}
}

export default Header;