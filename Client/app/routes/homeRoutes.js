import React from 'react';
import {Route } from 'react-router';
import Home from 'views/HomePage';

export default (
  <Route>
      <Route path="/home" component={Home} />
  </Route>
)
