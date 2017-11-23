import React from 'react';
import { Route } from 'react-router';
import MailPage from 'views/MailPage';
import invitation from 'views/InvitationPage';

export default (
  <Route>
    <Route path="/app/mail" component={MailPage} />
    <Route path="/app/invitation" component={invitation} />
  </Route>
);
