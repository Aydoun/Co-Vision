import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from 'views/App';
import Welcome from 'views/WelcomePage';
import VisionRoutes from './vision';
import DiscoverRoutes from './discover';
import UserRoute from './user';
import MailRoute from './mail';
import NotFound from 'views/NotFoundPage';

function loginCheck(nextState, replace) {
    const token = localStorage.getItem('token');
    if (!token) {
      return replace({
          pathname : '/welcome',
          state : {}
      });
    }

    return true;
}

function IsLogin(nextState, replace) {
  const token = localStorage.getItem('token');
  if (nextState.location.pathname.indexOf('/welcome') >= 0 && token) {
    return replace({
        pathname : '/app',
        state : {}
    });
  }
  return true;
}

export default () => (
  <Route>
    <Route path="/app" onEnter={loginCheck}>
      <IndexRedirect to="vision" />
      <Route component={App} >
        {VisionRoutes}
        {UserRoute}
        {DiscoverRoutes}
        {MailRoute}
      </Route>
    </Route>
    <Route path="/" onEnter={IsLogin}>
      <IndexRedirect to="welcome" />
      <Route path="/welcome" component={Welcome} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
