import React from 'react';
import {Router, Route , IndexRedirect } from 'react-router';

import App from 'views/App';
import SignIn from 'views/UserPage/login';
import Register from 'views/UserPage/register';
import VisionRoutes from './visionRoutes';
import HomeRoutes from './homeRoutes';
import DiscoverRoutes from './discoverRoutes';
import UserRoute from './userRoutes';
import MailRoute from './mailRoutes';
import NotFound from 'views/NotFoundPage';

function loginCheck(nextState, replace){
    const token = localStorage.getItem('token');
    return true;

    if (!token) {
      replace({
          pathname : '/login',
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
      <Route path="/" >
        <IndexRedirect to="home" />
        <Route path="/home" component={SignIn} />
      </Route>
      <Route path="*" component={NotFound} />
  </Route>
)
