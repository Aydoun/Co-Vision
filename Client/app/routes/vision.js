import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Vision from 'views/VisionPage';
import VisionList from 'views/VisionPage/visionList';
import createVision from 'views/VisionPage/createVision';
import visionLab from 'views/VisionPage/visionLab';
import visionHistory from 'views/VisionPage/visionHistory';
import visionContent from 'views/VisionPage/visionContent';
import visionSummary from 'views/VisionPage/visionSummary';
import visionEdit from 'views/VisionPage/visionEdit';
import feedback from 'views/FeedbackPage';

export default (
  <Route>
    <Route path="/app/vision" component={Vision}>
      <IndexRedirect to="list" />
      <Route path="/app/vision/list" component={VisionList} />
      <Route path="/app/vision/create" component={createVision} />
      <Route path="/app/vision/lab" component={visionLab} />
      <Route path="/app/vision/:id/history" component={visionHistory} />
      <Route path="/app/vision/:id/lab" component={visionLab} />
      <Route path="/app/vision/:id/content" component={visionContent} />
      <Route path="/app/vision/:id/edit" component={visionEdit} />
      <Route path="/app/vision/:id/summary" component={visionSummary} />
      <Route path="/app/feedback" component={feedback} />
    </Route>
  </Route>
);
