import React from 'react';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './App'
import MapPage from './App/MapPage';
import Budget from './App/BudgetPage'

import reducers from './reducers';

var ReactRouter = require('react-router');
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
import { browserHistory } from 'react-router';

const logger = createLogger({collapsed: true});
const createStoreWithMiddleware = applyMiddleware(promise, logger)(createStore);

ReactDOM.render((
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component = {App} >
				<IndexRoute component = {MapPage} />
				<Route path="/budget" component={Budget} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('root'));
