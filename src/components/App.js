import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './Header';
import SubHeader from './SubHeader';
import Login from './Login';
import Start from './Start'; //dummy login page for now
import base from '../base';
import Auth from '../Auth/Auth';
import Callback from '../Callback/Callback';
import styles from '../css/style.css';
import AreaPicker from './AreaPicker';
import ProviderPicker from './ProviderPicker';
import MyAccount from './MyAccount';
import Page from './Page';
import Footer from './Footer';


class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			users: {},
			categories: {},
			pages: {},
			selectedProvider: null,
			loggedOut : false,
			isModal: false
		}

		this.selectProvider = this.selectProvider.bind(this);
		this.setModal = this.setModal.bind(this);
		this.logout = this.logout.bind(this);
		this.setLogin = this.setLogin.bind(this);

	}

	selectProvider(keyId) {
    this.setState({
    	selectedProvider: keyId
    });
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

	login() {
		this.props.auth.login();
	}
	setLogin() {
		this.setState({
    	loggedOut: false
    });
    console.log('logged in');
	}

	logout() {
		this.props.auth.logout();
		this.setState({
    	loggedOut: true
    });
    console.log('logged out');
	}

	componentWillMount() {
		this.ref = base.syncState(`categories`, {
			context: this,
			state: 'categories'
		});

		this.ref = base.syncState(`users`, {
			context: this,
			state: 'users'
		});

		this.ref = base.syncState(`pages`, {
			context: this,
			state: 'pages'
		});

	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

  setModal(mstate) {
  	this.setState({
    	isModal: mstate
    });
  }

	render() {
		const { isAuthenticated } = this.props.auth;
		if(isAuthenticated() && this.state.loggedOut){
			this.setLogin();
		}

		let wrapClassName = 'resurgent-app';
		// this.state.isModal = false;
		let categories = this.state.categories;
		let noData = (Object.keys(categories).length === 0 && categories.constructor === Object);
		// console.log(noData);

		if(this.props.location.pathname === '/'){
			wrapClassName += ' flow-login';
		}

		if(this.props.location.pathname === '/my-account'){
			wrapClassName += ' flow-account';
		}

		if(this.props.location.pathname === '/terms' || this.props.location.pathname === '/about' || this.props.location.pathname === '/help'){
			wrapClassName += ' page';
		}

		if(!isAuthenticated()){
			wrapClassName += ' flow-login';
		}

		return (
			<div className={wrapClassName}>
				<Header auth={this.props.auth} logOut={this.logout} isModal={this.state.isModal} />
					<Route path="/callback" render={(props) => <Callback />} />
				{ noData && (
					<Callback auth={this.props.auth} />
					)
				}
				{
          !isAuthenticated() && (
	          	<Login loggedOut={this.state.loggedOut} auth={this.props.auth} />
            )
        }
        {
          !noData && isAuthenticated() && (
          		<div>
              	<Route exact path="/" render={(props) => <Start />} />
              	<Route exact path="/home" render={(props) => <SubHeader users={this.state.users} />} />
								<Route path="/area" render={(props) => <SubHeader users={this.state.users} />} />
								<Route exact path="/home" render={(props) => 
									<AreaPicker 
										categories={this.state.categories} 
										{...props} 
									/>} 
								/>
								<Route path="/area/:slug/:cat" render={(props) => 
									<ProviderPicker 
										users={this.state.users}
										setModal={this.setModal} 
										selectProvider={this.selectProvider} 
										categories={this.state.categories} 
										{...props} 
									/>} 
								/>
								<Route path="/my-account" auth={this.props.auth} render={(props) => <MyAccount users={this.state.users} />} />
								<Route path="/terms" render={(props) => <Page page={this.state.pages["terms"]} />} />
								<Route path="/about" render={(props) => <Page page={this.state.pages["about"]} />} />
								<Route path="/help" render={(props) => <Page page={this.state.pages["help"]} />} />
              </div>
            )
        }

				{ !this.state.isModal && (
					<Footer auth={this.props.auth} />
					)
				}

			</div>
		)
	}
}

export default App;