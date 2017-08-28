import React from 'react';
import Header from './Header';
import Login from './Login';
import base from '../base';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import styles from '../css/style.css';
import sampleAreas from '../sample-areas';
import AreaPicker from './AreaPicker';

class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			providers: {},
			areas: {}
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

		this.ref = base.syncState(`areas`, {
			context: this,
			state: 'areas'
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	loadSamples() {
		this.setState({
			areas: sampleAreas
		});
	}

	render() {
		const { isAuthenticated } = this.props.auth;

		return (
			<div className="resurgent-app">
				<AreaPicker areas={this.state.areas} />
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