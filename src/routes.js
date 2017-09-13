import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './components/App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
// import Auth from './Auth/Auth';
import history from './history';

// const auth = new Auth();

// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// }

export const makeMainRoutes = () => {
  return (
      <Router history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App {...props} />} />
        </div>
      </Router>
  );
}
