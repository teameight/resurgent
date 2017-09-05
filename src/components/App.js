import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './Header';
import SubHeader from './SubHeader';
import Login from './Login';
import Start from './Start'; //dummy login page for now
import base from '../base';
import Auth from '../Auth/Auth';
import styles from '../css/style.css';
import AreaPicker from './AreaPicker';
import ProviderPicker from './ProviderPicker';
import MyAccount from './MyAccount';
import Footer from './Footer';


class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			users: {},
			categories: {},
			selectedProvider: null,
			isModal: false
		}

		this.selectProvider = this.selectProvider.bind(this);
		this.setModal = this.setModal.bind(this);
		this.logout = this.logout.bind(this);

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

	logout() {
		this.props.auth.logout();
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
		let wrapClassName = 'resurgent-app';
		// this.state.isModal = false;


		if(this.props.location.pathname == '/'){
			wrapClassName += ' flow-login';
		}

		if(this.props.location.pathname == '/my-account'){
			wrapClassName += ' flow-account';
		}

		if(!isAuthenticated()){
			wrapClassName += ' flow-login';
		}

		return (
			<div className={wrapClassName}>
				<Header auth={this.props.auth} logOut={this.logout} isModal={this.state.isModal} />

				{
          !isAuthenticated() && (
	          	<Login auth={this.props.auth} />
            )
        }
        {
          isAuthenticated() && (
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
								<Route path="/my-account" render={(props) => <MyAccount users={this.state.users} />} />
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