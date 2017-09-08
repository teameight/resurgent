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
			transactions: {},
			pages: {},
			selectedProvider: null,
			loggedOut : false,
			isModal: false
		}

		this.selectProvider = this.selectProvider.bind(this);
		this.setModal = this.setModal.bind(this);
		this.logout = this.logout.bind(this);
		this.setLogin = this.setLogin.bind(this);
		this.updateReviews = this.updateReviews.bind(this);
		this.bookSessionTransaction = this.bookSessionTransaction.bind(this);

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
	}

	logout() {
		this.props.auth.logout();
		this.setState({
    	loggedOut: true
    });
	}

	updateReviews(data, ckey, akey, pkey) {
		const categories = this.state.categories;
		const formValues = data;
		const transactions = this.state.transactions;
		const ukey = 'user-1' // TODO: replace with current user key
		const date = new Date();
		const timestamp = Date.now();
		let rating = '';
		let review = '';

		if ( formValues.newRating ) {
			let ratingArr = categories[ckey]["areas"][akey]["providers"][pkey].ratingArr ? categories[ckey]["areas"][akey]["providers"][pkey].ratingArr : [];
			ratingArr.push(formValues.newRating)
			categories[ckey]["areas"][akey]["providers"][pkey].ratingArr = ratingArr;
			rating = formValues.newRating;

			let sum = ratingArr.reduce((a, b) => a + b, 0 );
			let percentage = Math.round((sum / ratingArr.length)/.05);
			categories[ckey]["areas"][akey]["providers"][pkey].rating = percentage;
		}

		if ( formValues.message ) {
			let reviews = categories[ckey]["areas"][akey]["providers"][pkey].reviews ? categories[ckey]["areas"][akey]["providers"][pkey].reviews : [];
			let headline = formValues.headline ? formValues.headline : '';
			reviews.push({ headline: headline, message: formValues.message });
			categories[ckey]["areas"][akey]["providers"][pkey].reviews = reviews;

			review = { headline: headline, message: formValues.message };
		}

		this.setState({categories});

		transactions[ukey]["t-" + timestamp] = {
			area: akey,
			category: ckey,
			provider: pkey,
			date: date,
			rating: rating,
			review: review,
			type: "rating-review"
		}

		this.setState({transactions});
	}

	bookSessionTransaction(pTokens, ckey, akey, pkey) {
		const users = this.state.users;
		const transactions = this.state.transactions;
		const subtractTokens = pTokens;
		const ukey = 'user-1' // TODO: replace with current user key
		const date = new Date();
		const timestamp = Date.now();

		if ( subtractTokens ) {
			let currentTokens = users[ukey].tokens;
			users[ukey].tokens = currentTokens - subtractTokens;
		}

		this.setState({users});

		transactions[ukey]["t-" + timestamp] = {
			area: akey,
			category: ckey,
			cost: pTokens,
			provider: pkey,
			date: date,
			type: "book-a-session"
		}

		this.setState({transactions});

		// TODO: Send email to provider and confirmation to user. Also admin?
	}

	componentWillMount() {
		this.ref = base.syncState(`users`, {
			context: this,
			state: 'users'
		});

		this.ref = base.syncState(`pages`, {
			context: this,
			state: 'pages'
		});

		this.ref = base.syncState(`transactions`, {
			context: this,
			state: 'transactions'
		});

		this.ref = base.syncState(`categories`, {
			context: this,
			state: 'categories'
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
              	<Route exact path="/" render={(props) => <SubHeader users={this.state.users} />} />
								<Route path="/area" render={(props) => <SubHeader users={this.state.users} />} />
								<Route exact path="/" render={(props) => 
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
										updateReviews={this.updateReviews}
										bookSessionTransaction={this.bookSessionTransaction}
										categories={this.state.categories}
										{...props}
									/>}
								/>
								<Route path="/my-account" auth={this.props.auth} render={(props) => <MyAccount categories={this.state.categories} transactions={this.state.transactions} users={this.state.users} />} />
								<Route path="/terms" render={(props) => <Page page={this.state.pages["terms"]} />} />
								<Route path="/about" render={(props) => <Page page={this.state.pages["about"]} />} />
								<Route path="/help" render={(props) => <Page page={this.state.pages["help"]} />} />
              </div>
            )
        }
				<Footer auth={this.props.auth} />
			</div>
		)
	}
}

export default App;