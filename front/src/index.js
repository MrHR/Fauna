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

const history = createBrowserHistory();

const loggerMiddleWare = createLogger({
  collapsed:true
});



const sagaMiddleware = createSagaMiddleware()
let store = createStore(Reducers, applyMiddleware(loggerMiddleWare), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(Sagas)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={ReadApp} />
        <Route path="/create" exact component={CreateApp} />
        <Route path="/edit/:uuid/:encounteruuid?" exact component={EditApp} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
