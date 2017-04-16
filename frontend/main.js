import React from 'react';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './App'
import MapPage from './App/MapPage';
import BudgetPage from './App/BudgetPage'
import TSPPage from './App/TSPPage'
import EditPage from './App/EditPage'
import AllocatingAidPage from './App/Alloc_Aid_Map_Page'

import reducers from './reducers';

var ReactRouter = require('react-router');
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
import { browserHistory } from 'react-router';
/*
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

put in render:

<Route path="/" component = {App} auth = {auth}>

  <IndexRoute component = {MapPage} />
  <Route path="/budget" component={BudgetPage} />
  <Route path="/tsp" component={TSPPage} />
  <Route path="/edit" component={EditPage} onEnter={requireAuth} />
	<Route path="login" component={Login} />

</Route>
*/

const logger = createLogger({collapsed: true});
const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);

ReactDOM.render((
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>

			<Route path="/" component = {App} >

				<IndexRoute component = {MapPage} />
				<Route path="/tsp" component={TSPPage} />
				//<Route path="/budget" component={BudgetPage} />
				<Route path="/edit" component={EditPage} />
				<Route path="/allocaid" component={AllocatingAidPage} />

			</Route>

		</Router>
	</Provider>
), document.getElementById('root'));
