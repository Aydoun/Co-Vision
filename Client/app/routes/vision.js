import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Vision from 'views/VisionPage';
import VisionList from 'views/VisionPage/visionList';
import createVision from 'views/VisionPage/createVision';
import visionLab from 'views/VisionPage/visionLab';
import visionHistory from 'views/VisionPage/visionHistory';
import visionFs from 'views/VisionPage/visionFS';

import feedback from 'views/FeedbackPage';

export default (
  <Route>
    <Route path="/app/vision" component={Vision}>
      <IndexRedirect to="list" />
      <Route path="/app/vision/list" component={VisionList} />
      <Route path="/app/vision/create" component={createVision} />
      <Route path="/app/vision/lab" component={visionLab} />
      <Route path="/app/vision/:id/history" component={visionHistory} />
      <Route path="/app/vision/:id/content" component={visionFs} />
      <Route path="/app/feedback" component={feedback} />
    </Route>
  </Route>
);
