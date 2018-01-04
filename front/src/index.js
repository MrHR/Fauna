/** @format */

import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import logger from './js/logger';


import LandingApp from './js/Component/Landing/LandingApp'
import NoMatch from './js/Component/General/NoMatch'
import FeedApp from './js/Component/Feed/FeedApp'

const history = createBrowserHistory();
logger('foo');
const loggerMiddleWare = createLogger({
  logger:{log:logger('redux-logger')},
  collapsed:true
});


ReactDOM.render(
    <Router history={history}>
      <div>
        <Route path="/" component={LandingApp} />
      </div>
    </Router>,
  document.getElementById('root')
);
