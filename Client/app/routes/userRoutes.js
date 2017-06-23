import React from 'react';
import {Route } from 'react-router';
import SignIn from 'views/UserPage/login';

export default (
  <Route>
      <Route path="/user/:id/profile" component={SignIn}>
      </Route>
  </Route>
)
