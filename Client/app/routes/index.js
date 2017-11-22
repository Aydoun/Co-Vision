import React from 'react';
import {Router, Route , IndexRedirect } from 'react-router';

import App from 'views/App';
import Welcome from 'views/WelcomePage';
import VisionRoutes from './visionRoutes';
import DiscoverRoutes from './discoverRoutes';
import UserRoute from './userRoutes';
import MailRoute from './mailRoutes';
import NotFound from 'views/NotFoundPage';

function loginCheck(nextState, replace){
    const token = localStorage.getItem('token');
    if (!token) {
      replace({
          pathname : '/welcome',
          state : {}
      })
    } else {
      return true;
    }
}

function IsLogin(nextState, replace) {
  const token = localStorage.getItem('token');
  if (nextState.location.pathname.indexOf('/welcome') >= 0 && token) {
    replace({
        pathname : '/app',
        state : {}
    })
  } else {
    return true;
  }
}

export default ()=> (
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
)
