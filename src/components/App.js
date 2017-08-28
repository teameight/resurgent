import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import base from '../base';
import Auth from '../Auth/Auth';
import styles from '../css/style.css';
import AreaPicker from './AreaPicker';
import ProviderPicker from './ProviderPicker';


class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			providers: {},
			areas: {}
		}

		// this.loadSamples = this.loadSamples.bind(this);

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

		this.ref = base.syncState(`areas`, {
			context: this,
			state: 'areas'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// loadSamples() {
	// 	this.setState({
	// 		areas: sampleAreas
	// 	});
	// }

	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<div className="resurgent-app">
				<Route exact path="/" render={(props) => <AreaPicker goTo={this.goTo} areas={this.state.areas} {...props} />} />
				<Route path="/providers" render={(props) => <ProviderPicker providers={this.state.providers} {...props} />} />
				{
					!isAuthenticated() && (
						<button className="btn" onClick={this.login.bind(this)}>Log in</button>
					)
				}
				{
					isAuthenticated() && (
						<button className="btn" onClick={this.logout.bind(this)}>Log out</button>
					)
				}

			</div>
		)
	}
}

export default App;