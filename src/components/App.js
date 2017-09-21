import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import SubHeader from './SubHeader';
import Login from './Login';
import firebase from '../fire';
import axios from 'axios';

import Notices from './Notices';
import Callback from '../Callback/Callback';
import AreaPicker from './AreaPicker';
import ProviderPicker from './ProviderPicker';
import MyAccount from './MyAccount';
import Page from './Page';
import Footer from './Footer';

import '../css/style.css';

class App extends React.Component {
	constructor() {
		super();

		// get initial state
		this.state = {
			users: {},
			user: null,
			categories: {},
			areas: {},
			providers: {},
			transactions: {},
			pages: {},
			selectedProvider: null,
			loggedOut : false,
			isModal: false,
			authed: false,
    	loading: true,
    	notices: []
		}

		this.selectProvider = this.selectProvider.bind(this);
		this.setModal = this.setModal.bind(this);
		this.logout = this.logout.bind(this);
		this.setLogin = this.setLogin.bind(this);
		this.setUser = this.setUser.bind(this);
		this.initUser = this.initUser.bind(this);
		this.refUser = this.refUser.bind(this);
		this.updateReviews = this.updateReviews.bind(this);
		this.bookSessionTransaction = this.bookSessionTransaction.bind(this);
    this.handleCloseNotice = this.handleCloseNotice.bind(this);
    this.setNotice = this.setNotice.bind(this);
    this.clearNotices = this.clearNotices.bind(this);

	}

	setNotice(notice) {
    let newNotices = [];
    newNotices.push(notice);
    this.setState({
      notices:newNotices
    });
  }

  handleCloseNotice(key) {
  	let newNotices = this.state.notices.slice();
    newNotices.splice(key, 1);
    this.setState(
      { notices: newNotices }
    );
  }

  clearNotices() {
  	this.setState({
    	notices:[]
    });
  }

	selectProvider(keyId) {
    this.setState({
    	selectedProvider: keyId
    });
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

	updateReviews(formValues, ckey, akey, pkey) {
		let providers = this.state.providers;
		const providersRef = firebase.database().ref('providers');
		const tRef = firebase.database().ref('transactions');
		const ukey = this.state.user.uid;
		const timestamp = Date.now();
		let rating = '';
		let newReview = '';

		if ( formValues.newRating ) {
			let ratingArr = providers[pkey].ratingArr ? providers[pkey].ratingArr : [];
			ratingArr.push(formValues.newRating)
			providers[pkey].ratingArr = ratingArr;
			rating = formValues.newRating;

			let sum = ratingArr.reduce((a, b) => a + b, 0 );
			let percentage = Math.round((sum / ratingArr.length)/.05);
			providers[pkey].rating = percentage;

			// const singleProviderRe = firebase.database().ref('categories/'+ckey+'/areas/'+akey+'/providers/'+pkey);
			// cInRef.on('value', (snapshot) => {
			//   let items = snapshot.val();
			//   console.log(items);
			// });

			providersRef.child(pkey).update({ratingArr:ratingArr, rating:percentage});

		}

	  // get user info
		axios.post('https://aqueous-eyrie-70803.herokuapp.com/review-submission', formValues)
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });


		if ( formValues.message ) {
			let reviewsArr = providers[pkey].reviews ? providers[pkey].reviews : [];
			let headline = formValues.headline ? formValues.headline : '';
			newReview = { headline: headline, message: formValues.message };
			reviewsArr.push(newReview);
			providers[pkey].reviews = reviewsArr;

			providersRef.child(pkey).set({reviews: reviewsArr});
		}
		this.setState({providers});

		const transaction = {
			area: akey,
			category: ckey,
			provider: pkey,
			date: timestamp,
			rating: rating,
			review: newReview,
			type: "rating-review",
			uid: ukey
		}

		tRef.push().set(transaction);

		this.setNotice({
			type: 'success',
			message: 'Your review and/or rating has been saved.'
		});
	}

	bookSessionTransaction(pTokens, ckey, akey, pkey, formValues) {
		const users = this.state.users;
		const usersRef = firebase.database().ref('users');
		const tRef = firebase.database().ref('transactions');

		const subtractTokens = pTokens;
		const ukey = this.state.user.uid;
		const timestamp = Date.now();

		// subtract user tokens
		if ( subtractTokens ) {
			let currentTokens = users[ukey].tokens;
			let newTokens = currentTokens - subtractTokens;
			usersRef.child(ukey).update({ "tokens":newTokens });
			users[ukey].tokens = newTokens;
		}

		this.setState({users});

		// send email
		axios.post('https://aqueous-eyrie-70803.herokuapp.com/book-session', formValues)
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

	  // create transaction record
		const transaction = {
			area: akey,
			category: ckey,
			cost: pTokens,
			date: timestamp,
			provider: pkey,
			type: "book-a-session",
			uid: ukey
		};

		tRef.push().set(transaction);

		// TODO: Send email to provider and confirmation to user. Also admin?
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
		let that=this;
		firebase.auth().signOut().then(function() {
			that.setState({
				loggedOut:true,
				authed: false,
				user:null
			});
		}).catch(function(error) {
		});
	}

	componentWillMount() {

		const usersRef = firebase.database().ref('users');
		usersRef.on('value', (snapshot) => {
		  let items = snapshot.val();
		  this.setState({
		    users: items
		  });
		});

		const pagesRef = firebase.database().ref('pages');
		pagesRef.on('value', (snapshot) => {
		  let items = snapshot.val();
		  this.setState({
		    pages: items
		  });
		});

		const catRef = firebase.database().ref('categories');
		catRef.on('value', (snapshot) => {
		  let items = snapshot.val();
		  this.setState({
		    categories: items
		  });
		});

		const areaRef = firebase.database().ref('areas');
		areaRef.on('value', (snapshot) => {
		  let items = snapshot.val();
		  this.setState({
		    areas: items
		  });
		});

		const providerRef = firebase.database().ref('providers');
		providerRef.on('value', (snapshot) => {
		  let items = snapshot.val();
		  this.setState({
		    providers: items
		  });
		});

		this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
        this.refUser();
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null
        })
      }
    });

	}

	componentWillUnmount () {
    this.removeListener();
  }

  refUser () {
  	if(this.state.authed){
			var user = firebase.auth().currentUser;

			if (user != null) {

				const uid = user.uid;

			  let userObj = {
				  name: user.displayName,
				  email: user.email,
				  photoUrl: user.photoURL,
				  emailVerified: user.emailVerified,
				  uid: user.uid
				};

				let initUser = this.initUser;

				var userRef = firebase.database().ref('users/' + uid );
				userRef.on('value', function(snapshot) {
				  let userMeta = snapshot.val();

				  initUser(userMeta, userObj);

				});
			}
		}
  }

  initUser(userMeta, userObj){

  	const uid = userObj.uid;

		if(userMeta.name){

      userObj.tokens = userMeta.tokens;

    }else{
      var userRef = firebase.database().ref('users/' + uid );

      let userMeta = {
        tokens: 50,
        uid: uid,
        email: userObj.email,
        name: userObj.name,
        unregistered: true,
        expiration: ''
      };

      userRef.set(userMeta);
      userObj.tokens = 50;
    }

		this.setState({
      user: userObj
    })

		var that = this;

    const tRef = firebase.database().ref("transactions");

    tRef.orderByChild('uid').equalTo(uid).on("child_added", function(snapshot) {
      let items = snapshot.val();
      // console.log(items.type);
      if(items.type === "book-a-session"){
	      let currentTs = that.state.transactions;

	      currentTs[snapshot.key] = items;
	      that.setState({
	        transactions: currentTs
	      });
	    }
    });
  }

  setUser(userObj) {

		this.setState({
    	user: userObj
    });

  }

  setModal(mstate) {
  	this.setState({
    	isModal: mstate
    });
  }

	render() {

		// if(this.state.authed && this.state.loggedOut){
		// 	this.setLogin();
		// }  //cannot have this as it changes state mid-render

		let wrapClassName = 'resurgent-app';
		let categories = this.state.categories;

		// let noUser = this.state.user === null ? true : false;
		let noData = (Object.keys(categories).length === 0);

		let isAuthed = this.state.authed;

		if(this.props.location.pathname === '/my-account'){
			wrapClassName += ' flow-account';
		}

		if( ( isAuthed && this.props.location.pathname === '/terms' ) || this.props.location.pathname === '/privacy-policy' || this.props.location.pathname === '/about' || this.props.location.pathname === '/help'){
			wrapClassName += ' page';
		}

		if(!isAuthed) {
			wrapClassName += ' flow-login';
		}

		const notices = this.state.notices;

		return (
			<div className={wrapClassName}>
				<Header user={this.state.user} logOut={this.logout}  isModal={this.state.isModal} />
				{
          Object
            .keys(notices)
            .map(key =>
              <Notices key={key} id={key} handleCloseNotice={this.handleCloseNotice} notice={notices[key]} />
            )
        }
					<Route path="/callback" render={(props) => <Callback />} />
				{ noData && (
					<Callback />
					)
				}
				{
          !isAuthed &&  (
	          	<Login loggedOut={this.state.loggedOut} clearNotices={this.clearNotices} notices={this.state.notices} setNotice={this.setNotice} />
            )
        }
        {
          !noData && isAuthed && (
          		<div>
              	<Route exact path="/" render={(props) => <SubHeader user={this.state.user} />} />
								<Route path="/area" render={(props) => <SubHeader user={this.state.user} />} />
								<Route exact path="/" render={(props) =>
									<AreaPicker
										categories={this.state.categories}
										{...props}
									/>}
								/>
								<Route path="/area/:slug" render={(props) =>
									<ProviderPicker
									 	clearNotices={this.clearNotices}
										user={this.state.user}
										setModal={this.setModal}
										selectProvider={this.selectProvider}
										updateReviews={this.updateReviews}
										bookSessionTransaction={this.bookSessionTransaction}
										categories={this.state.categories}
										areas={this.state.areas}
										providers={this.state.providers}
										{...props}
									/>}
								/>
								<Route path="/my-account" render={(props) =>
									<MyAccount
									 	setNotice={this.setNotice}
										clearNotices={this.clearNotices}
										reauthed={this.state.reauthed}
										user={this.state.user}
										setUser={this.setUser}
										categories={this.state.categories}
										transactions={this.state.transactions}
										setModal={this.setModal}
									/>}
								/>
								<Route path="/terms" render={(props) => <Page page={this.state.pages["terms"]} />} />
								<Route path="/about" render={(props) => <Page page={this.state.pages["about"]} />} />
								<Route path="/help" render={(props) => <Page page={this.state.pages["help"]} />} />
								<Route path="/privacy-policy" render={(props) => <Page page={this.state.pages["privacy-policy"]} />} />
              </div>
            )
        }
				<Footer user={this.state.user} />
			</div>
		)
	}
}

export default App;