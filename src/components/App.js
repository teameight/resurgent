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
import sampleProviders from '../sample-providers.js';
import BookSession from './BookSession';
import BookConfirm from './BookConfirm';
import Rating from './Rating';
import WriteReview from './WriteReview';
import MyAccount from './MyAccount';
import EditAccount from './EditAccount';
import Footer from './Footer';


class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			providers: {},
			areas1: {},
			areas2: {},
			areas3: {},
			areas4: {},
			users: {},
			selectedProvider: null,
			isModal: false
		}

		this.loadSamples = this.loadSamples.bind(this);
		this.selectProvider = this.selectProvider.bind(this);
		this.setModal = this.setModal.bind(this);

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
		this.ref = base.syncState(`providers`, {
			context: this,
			state: 'providers'
		});

		this.ref = base.syncState(`areas1`, {
			context: this,
			state: 'areas1'
		});

		this.ref = base.syncState(`areas2`, {
			context: this,
			state: 'areas2'
		});

		this.ref = base.syncState(`areas3`, {
			context: this,
			state: 'areas3'
		});

		this.ref = base.syncState(`areas4`, {
			context: this,
			state: 'areas4'
		});

		this.ref = base.syncState(`users`, {
			context: this,
			state: 'users'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	loadSamples() {
		this.setState({
			providers: sampleProviders
		});
	}

	selectProvider(keyId) {
    this.setState({
    	selectedProvider: keyId
    });
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

		if(this.props.location.pathname == '/book-session' || this.props.location.pathname == '/book-confirm'){
			wrapClassName += ' flow-book-session';
			// this.state.isModal = true;
		}

		if(this.props.location.pathname == '/rating' || this.props.location.pathname == '/write-review'){
			wrapClassName += ' flow-rating';
			// this.state.isModal = true;
		}

		if(this.props.location.pathname == '/edit-account'){
			// this.state.isModal = true;
		}

		if(this.state.isModal){
			wrapClassName += ' modal';
		}

		if(this.props.location.pathname == '/'){
			wrapClassName += ' flow-login';
		}

		if(this.props.location.pathname == '/my-account' || this.props.location.pathname == '/edit-account'){
			wrapClassName += ' flow-account';
		}

		return (
			<div className={wrapClassName}>
				<Header auth={this.props.auth} logOut={this.logout} isModal={this.state.isModal} />
				<Route exact path="/home" render={(props) => <SubHeader users={this.state.users} />} />
				<Route path="/providers/:slug" render={(props) => <SubHeader users={this.state.users} />} />
				<Route exact path="/home" render={(props) => <AreaPicker loadSamples={this.loadSamples} areas1={this.state.areas1} areas2={this.state.areas2} areas3={this.state.areas3} areas4={this.state.areas4} {...props} />} />
				<Route path="/providers/:slug" render={(props) => 
					<ProviderPicker 
						users={this.state.users}
						setModal={this.setModal} 
						selectProvider={this.selectProvider} 
						providers={this.state.providers} 
						{...props} 
					/>} 
				/>

				<Route path="/book-session" render={(props) => <BookSession users={this.state.users} selectedProvider={this.state.selectedProvider} providers={this.state.providers} {...props} />} />
				<Route path="/book-confirm" render={(props) => <BookConfirm users={this.state.users} selectedProvider={this.state.selectedProvider} providers={this.state.providers} {...props} />} />

				<Route path="/rating" render={(props) => <Rating users={this.state.users} />} />
				<Route path="/write-review" render={(props) => <WriteReview users={this.state.users} />} />

				<Route path="/my-account" render={(props) => <MyAccount users={this.state.users} />} />
				<Route path="/edit-account" render={(props) => <EditAccount users={this.state.users} />} />

				<Route exact path="/" render={(props) => <Start />} />

				{ !this.state.isModal && (
					<Footer auth={this.props.auth} />
					)
				}

			</div>
		)
	}
}

export default App;