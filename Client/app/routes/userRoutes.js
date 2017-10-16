import React from 'react';
import {Route } from 'react-router';
import UserProfile from 'views/UserPage';

export default (
  <Route>
      <Route path="/user/profile" component={UserProfile}>
      </Route>
  </Route>
)
