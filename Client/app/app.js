import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import 'babel-polyfill';
import store , {history} from 'store';
import allRoutes from 'routes';

import 'global-styles.js';
import config from 'config';

window.config = config;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {allRoutes()}
    </Router>
  </Provider>,
  document.getElementById('app')
);
