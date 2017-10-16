import React from 'react';
import {Route } from 'react-router';
import invitation from 'views/InvitationPage';

export default (
  <Route>
      <Route path="/invitation" component={invitation}>
      </Route>
  </Route>
)
