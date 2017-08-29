import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './Header';
import SubHeader from './SubHeader';
import Login from './Login';
import base from '../base';
import Auth from '../Auth/Auth';
import styles from '../css/style.css';
import AreaPicker from './AreaPicker';
import ProviderPicker from './ProviderPicker';
import sampleAreas from '../sample-areas.js';
import BookSession from './BookSession';
import BookConfirm from './BookConfirm';
import Footer from './Footer';


class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			providers: {},
			providers1: {},
			providers2: {},
			providers3: {},
			providers4: {},
			providers5: {},
			providers6: {},
			providers7: {},
			providers8: {},
			providers9: {},
			providers10: {},
			providers11: {},
			providers12: {},
			providers13: {},
			providers14: {},
			providers15: {},
			providers16: {},
			providers17: {},
			areas1: {},
			areas2: {},
			areas3: {},
			areas4: {},
			isModal: false
		}

		this.loadSamples = this.loadSamples.bind(this);

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
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	loadSamples() {
		this.setState({
			areas4: sampleAreas
		});
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		let wrapClassName = 'resurgent-app';

		if(this.state.isModal){
			wrapClassName += ' modal';
		}
		if(this.props.location.pathname == '/book-session' || this.props.location.pathname == '/book-confirm'){
			wrapClassName += ' flow-book-session';
			this.state.isModal = true;
		}

		return (
			<div className={wrapClassName}>
				<Header auth={this.props.auth} logOut={this.logout} isOpen={this.isOpen} isModal={this.state.isModal} />
				<Route exact path="/" render={(props) => <SubHeader />} />
				<Route path="/providers/:slug" render={(props) => <SubHeader />} />
				<Route exact path="/" render={(props) => <AreaPicker loadSamples={this.loadSamples} areas1={this.state.areas1} areas2={this.state.areas2} areas3={this.state.areas3} areas4={this.state.areas4} {...props} />} />
				<Route path="/providers/:slug" render={(props) => <ProviderPicker providers={this.state.providers} {...props} />} />

				<Route path="/book-session" render={(props) => <BookSession />} />
				<Route path="/book-confirm" render={(props) => <BookConfirm />} />

				{ !this.state.isModal && (
					<Footer auth={this.props.auth} />
					)
				}

			</div>
		)
	}
}

export default App;