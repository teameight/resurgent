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
      this.closeModal = this.closeModal.bind(this);
  }

	toggleMenu() {
      this.setState(prevState => ({
	      menuOpen: !prevState.menuOpen
	    }));
  }

  closeModal() {
  	if(this.props.location.pathname == '/book-confirm' || this.props.location.pathname == '/write-review' ){
  		this.props.history.go(-2);
  	}else{
	  	this.props.history.goBack();
	  }
  }


	closeMenu() {
      this.setState(prevState => ({
	      menuOpen: false
	    }));
  };

  processLink(e, path) {
  	e.preventDefault();
  	this.closeMenu();
  	this.props.history.push(path);
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
				<button type="button" className="tcon tcon-remove" aria-label="remove item" onClick={(this.closeModal)}>
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
          <a href="#" onClick={	(e) => this.processLink(e, '/home') }><img src="img/logo.png" alt="Resurgent - Legal Outplacement" /></a>
        </div>
        <div className="menu-icon" >
          { actionButton }
        </div>
				{ isAuthenticated && !isModal && (
					<nav className={this.state.menuOpen ? 'main-menu open': 'main-menu'}>
            <ul>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/home') }>Home</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/my-account')}>My Account</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/about')}>About</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/help')}>Help</button></li>
                <li><button type="button" onClick={	(e) => this.processLink(e, '/')}>Sign Out</button></li>

            </ul>
        	</nav>
				)}
    	</header>
		)
	}
}

export default withRouter(Header);