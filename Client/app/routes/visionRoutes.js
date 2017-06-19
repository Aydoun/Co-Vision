import React from 'react';
import {Route } from 'react-router';
import Vision from 'views/VisionPage';
import createVision from 'views/VisionPage/createVision';
import visionLab from 'views/VisionPage/visionLab';
import visionHistory from 'views/VisionPage/visionHistory';
import visionFs from 'views/VisionPage/visionFS';

export default (
  <Route>
      <Route path="/vision" component={Vision}>
      </Route>
      <Route path="/vision/create" component={createVision} />
      <Route path="/vision/:id/lab" component={visionLab} />
      <Route path="/vision/:id/history" component={visionHistory} />
      <Route path="/vision/:id/content" component={visionFs} />
  </Route>
)
