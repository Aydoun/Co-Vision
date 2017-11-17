import React from 'react';
import {Router, Route , IndexRedirect } from 'react-router';

import App from 'views/App';
import SignIn from 'views/UserPage/login';
import Register from 'views/UserPage/register';
import VisionRoutes from './visionRoutes';
import HomeRoutes from './homeRoutes';
import DiscoverRoutes from './discoverRoutes';
import UserRoute from './userRoutes';
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
      <Route path="/" onEnter={loginCheck}>
        <IndexRedirect to="vision" />
        <Route component={App} >
            {VisionRoutes}
            {HomeRoutes}
            {UserRoute}
            {DiscoverRoutes}
        </Route>
      </Route>
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={Register} />
      <Route path="*" component={NotFound} />
  </Route>
)
