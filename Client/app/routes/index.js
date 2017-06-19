import React from 'react';
import {Router, Route , IndexRedirect } from 'react-router';

import App from 'views/App';
import Vision from 'views/VisionPage';
import CreateVision from 'views/VisionPage/createVision'
import Home from 'views/HomePage';
import NotFound from 'views/NotFoundPage';

export default ()=> (
  <Route>
      <Route path="/">
        <IndexRedirect to="home" />
        <Route component={App} >
            <Route path="/vision" component={Vision}>

            </Route>
            <Route path="/vision/create" component={CreateVision} />
            <Route path="/home" component={Home}>
            </Route>
        </Route>

      </Route>
      <Route path="*" component={NotFound} />
    </Route>
)
