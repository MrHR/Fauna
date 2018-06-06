/** @format */

import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import './css/style.css';
import createSagaMiddleware from 'redux-saga'

import filter from './js/functions/functions';
import Reducers from './js/Reducers/'
import Sagas from './js/Sagas/'

import logger from './js/logger';

import ReadApp from './js/Component/Read/ReadApp';
import CreateApp from './js/Component/Create/CreateApp'
import EditApp from './js/Component/Edit/EditApp'
import LoginApp from './js/Component/User/LoginApp';

const history = createBrowserHistory();

const loggerMiddleWare = createLogger({
  collapsed:true
});

import Auth from './js/Modules/Auth'
import RegisterApp from './js/Component/User/RegisterApp';


const sagaMiddleware = createSagaMiddleware()
let store = createStore(Reducers, applyMiddleware(loggerMiddleWare), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(Sagas)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={ReadApp} />
        <Route path="/login" exact component={LoginApp} />
        <Route path="/register" exact component={RegisterApp} />
        <Route path="/create" exact component={Auth.isUserAuthenticated() ? CreateApp : LoginApp} />
        <Route path="/create/:uuid" exact component={Auth.isUserAuthenticated() ? CreateApp : LoginApp} />
        <Route path="/edit/:uuid/:encounteruuid?" exact component={Auth.isUserAuthenticated() ? EditApp : LoginApp} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
