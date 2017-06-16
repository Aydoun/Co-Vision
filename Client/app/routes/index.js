import React from 'react';
import {Router, Route , IndexRedirect } from 'react-router';

import App from 'views/App';
import Vision from 'views/VisionPage';
import Home from 'views/HomePage';

export default ()=> (
  <Route>
      <Route path="/">
        <IndexRedirect to="home" />
        <Route component={App} >
            <Route path="/vision" component={Vision}>
            </Route>
            <Route path="/home" component={Home}>
            </Route>
        </Route>
      </Route>
    </Route>
)
