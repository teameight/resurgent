import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'team-eight.auth0.com',
    clientID: '7BAfpkOWkjutM4v5inP1ZcTIj7T6UxOp',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://team-eight.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  userProfile;

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken() {
  	const accessToken = localStorage.getItem('access_token');
  	if (!accessToken) {
  		throw new Error('No access token found');
  	}
  	return accessToken;
  }

  getProfile(cb) {
  	let accessToken = this.getAccessToken();
  	this.auth0.client.userInfo(accessToken, (err, profile) => {
  		if (profile) {
  			this.userProfile = profile;
  		}
  		cb(err, profile);
  	});
  }
}