import React from 'react';
import {Route } from 'react-router';
import UserProfile from 'views/UserPage';

export default (
  <Route>
      <Route path="/app/user/profile" component={UserProfile}>
      </Route>
  </Route>
)
