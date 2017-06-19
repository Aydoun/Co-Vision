import React from 'react';
import {Router, Route , IndexRedirect } from 'react-router';

import App from 'views/App';
import VisionRoutes from './visionRoutes';
import HomeRoutes from './homeRoutes';
import NotFound from 'views/NotFoundPage';

export default ()=> (
  <Route>
      <Route path="/">
        <IndexRedirect to="home" />
        <Route component={App} >
            {VisionRoutes}
            {HomeRoutes}
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
)
