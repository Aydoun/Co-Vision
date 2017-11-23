import React from 'react';
import { Router } from 'react-router';
import 'antd/dist/antd.min.css';
import allRoutes from './routes';
import 'global-styles.js';
import config from './config';
import { history } from './store';

window.config = config;

export default props => (
  <Router history={history}>
    {allRoutes()}
  </Router>
);
