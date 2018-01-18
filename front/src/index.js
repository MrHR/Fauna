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
import './css/style.css';
import filter from './js/functions/functions';

import logger from './js/logger';


import LandingApp from './js/Component/Landing/LandingApp'
import NoMatch from './js/Component/General/NoMatch'
import StoryApp from './js/Component/Story/StoryApp';

const history = createBrowserHistory();
logger('foo');
const loggerMiddleWare = createLogger({
  logger:{log:logger('redux-logger')},
  collapsed:true
});


ReactDOM.render(
    <Router history={history}>
      <div>
        <Route path="/" component={StoryApp} />
      </div>
    </Router>,
  document.getElementById('root')
);
