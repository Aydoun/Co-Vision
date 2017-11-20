import React from 'react';
import {Route } from 'react-router';
import discover from 'views/DiscoverPage';

export default (
  <Route>
      <Route path="/app/discover" component={discover}>
      </Route>
  </Route>
)
