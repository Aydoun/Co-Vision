import React from 'react';
import {Router, Route , IndexRedirect } from 'react-router';
import cookie from 'js-cookie';

import App from 'views/App';
import SignIn from 'views/UserPage/login';
import VisionRoutes from './visionRoutes';
import HomeRoutes from './homeRoutes';
import UserRoute from './userRoutes';
import NotFound from 'views/NotFoundPage';

function loginCheck(){
    console.log('everything is cool');
    return true;
    // const hasCertification = canEnter();
    // if(status) {
    //   if(hasCertification) {
    //     return true
    //   }else {
    //     replace({
    //         pathname: '/certification',
    //         state: { nextPathname: nextState.location.pathname }
    //     })
    //   }
    //
    // }else {
    //   replace({
    //       pathname: '/error',
    //       state: { nextPathname: nextState.location.pathname }
    //   })
    // }

}

export default ()=> (
  <Route>
      <Route path="/" onEnter={loginCheck}>
        <IndexRedirect to="home" />
        <Route component={App} >
            {VisionRoutes}
            {HomeRoutes}
            {UserRoute}
        </Route>
      </Route>
      <Route path="/login" component={SignIn} />
      <Route path="*" component={NotFound} />

  </Route>
)
