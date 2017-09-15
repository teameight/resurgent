import React from 'react';
import { Route, Router } from 'react-router-dom';
import Header from './Header';
import SubHeader from './SubHeader';
import Login from './Login';
import Start from './Start'; //dummy login page for now
import firebase from '../fire';
import fbAuth from '../fire';
//import Auth from '../Auth/Auth';
import Notices from './Notices';
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
			user: null,
			categories: {},
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
		this.refUser = this.refUser.bind(this);
		this.updateReviews = this.updateReviews.bind(this);
		this.setUser = this.setUser.bind(this);
		this.initUser = this.initUser.bind(this);
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

	login() {
		this.props.auth.login();
	}
	setLogin() {
		this.setState({
    	loggedOut: false
    });
	}

	logout() {
		firebase.auth().signOut().then(function() {
			this.setState({
				authed: false,
				user:null
			});
		}).catch(function(error) {
		  // An error happened.
		});
	}

	updateReviews(data, ckey, akey, pkey) {
		let categories = this.state.categories;
		const catRef = firebase.database().ref('categories');

		const formValues = data;
		const tRef = firebase.database().ref('transactions');

		const ukey = this.state.user.uid;
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

			const cInRef = firebase.database().ref('categories/'+ckey+'/areas/'+akey+'/providers/'+pkey);
			// cInRef.on('value', (snapshot) => {
			//   let items = snapshot.val();
			//   console.log(items);
			// });

			cInRef.update({ratingArr:ratingArr, rating:percentage});

		}

		if ( formValues.message ) {
			let reviews = categories[ckey]["areas"][akey]["providers"][pkey].reviews ? categories[ckey]["areas"][akey]["providers"][pkey].reviews : [];
			let headline = formValues.headline ? formValues.headline : '';
			reviews.push({ headline: headline, message: formValues.message });
			categories[ckey]["areas"][akey]["providers"][pkey].reviews = reviews;

			review = { headline: headline, message: formValues.message };
		}
		this.setState({categories});

		const transaction = {
			area: akey,
			category: ckey,
			provider: pkey,
			date: timestamp,
			rating: rating,
			review: review,
			type: "rating-review",
			uid: ukey
		}

		tRef.push().set(transaction);

		this.setNotice({
			type: 'success',
			message: 'Your review and/or rating has been saved.'
		});
	}

	bookSessionTransaction(pTokens, ckey, akey, pkey) {
		const users = this.state.users;
		const usersRef = firebase.database().ref('users');
		const tRef = firebase.database().ref('transactions');

		const subtractTokens = pTokens;
		const ukey = this.state.user.uid;
		// console.log(ukey);
		const timestamp = Date.now();

		if ( subtractTokens ) {
			let currentTokens = users[ukey].tokens;
			let newTokens = currentTokens - subtractTokens;
			usersRef.child(ukey).update({ "tokens":newTokens });
			users[ukey].tokens = newTokens;
		}

		this.setState({users});

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
		 
		this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
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
			var name, email, photoUrl, uid, emailVerified;

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

				var usersRef = firebase.database().ref('users/' + uid );
				usersRef.on('value', function(snapshot) {
				  let users = snapshot.val();

				  initUser(users, userObj);

				});
			}
		}
  }

  initUser(userMeta, userObj){

  	const uid = userObj.uid;

		if(userMeta){

			userObj.tokens = userMeta.tokens;

		}else{
			const usersRef = firebase.database().ref('users');

			let userMeta = {
				tokens: 50,
				uid: uid
			};

			usersRef.child(uid).set(userMeta);
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

		if(this.props.location.pathname === '/terms' || this.props.location.pathname === '/privacy-policy' || this.props.location.pathname === '/about' || this.props.location.pathname === '/help'){
			wrapClassName += ' page';
		}

		if(!isAuthed) {
			wrapClassName += ' flow-login';
		}

		const notices = this.state.notices;

		return (
			<div className={wrapClassName}>
				<Header user={this.state.user} logOut={this.logout} isModal={this.state.isModal} />
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
	          	<Login clearNotices={this.clearNotices} notices={this.state.notices} setNotice={this.setNotice} />
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
								<Route path="/area/:slug/:cat" render={(props) =>
									<ProviderPicker
									 	clearNotices={this.clearNotices} 
										user={this.state.user}
										setModal={this.setModal}
										selectProvider={this.selectProvider}
										updateReviews={this.updateReviews}
										bookSessionTransaction={this.bookSessionTransaction}
										categories={this.state.categories}
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
										user={this.state.user} 
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