import React from 'react';
import Header from './Header';
import Login from './Login';
import base from '../base';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import styles from '../css/style.css';
import plugins from '../js/plugins.js';
// import transformicons from '../js/transformicons.js';
import flickity from '../js/flickity.min.js';
import main from '../js/main.js';

class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			providers: {},
			areas: {}
		}

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
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<div className="resurgent-app">
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