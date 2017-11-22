import React from 'react';
import { Route } from 'react-router';
import MailPage from 'views/MailPage';

export default (
  <Route>
    <Route path="/app/mail" component={MailPage} />
  </Route>
);
