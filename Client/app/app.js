import React from 'react';
import { Router } from 'react-router';
import 'babel-polyfill';
import 'antd/dist/antd.min.css';
import allRoutes from './routes';
import 'global-styles.js';
import config from './config';
import { history } from './store';

window.config = config;

export default () => (
  <Router history={history}>
    {allRoutes()}
  </Router>
);
