import React from 'react';
import { Route } from 'react-router';
import MailPage from 'views/MailPage';

export default (
  <Route>
      <Route path="/mail" component={MailPage} />
  </Route>
)
