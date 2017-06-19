import React from 'react';
import {Route } from 'react-router';
import Vision from 'views/VisionPage';
import CreateVision from 'views/VisionPage/createVision';
import visionLab from 'views/VisionPage/visionLab';

export default (
  <Route>
      <Route path="/vision" component={Vision}>
      </Route>
      <Route path="/vision/create" component={CreateVision} />
      <Route path="/vision/:id/lab" component={visionLab} />
  </Route>
)
