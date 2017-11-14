import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import 'antd/dist/antd.min.css';
import 'global-styles.js';
import config from 'config';

import store , { history } from './store';
import allRoutes from './routes';

window.config = config;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {allRoutes()}
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept()
}
