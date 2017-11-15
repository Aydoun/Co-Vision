import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Vision from 'views/VisionPage';
import VisionList from 'views/VisionPage/visionList';
import createVision from 'views/VisionPage/createVision';
import visionLab from 'views/VisionPage/visionLab';
import visionHistory from 'views/VisionPage/visionHistory';
import visionFs from 'views/VisionPage/visionFS';

export default (
  <Route>
      <Route path="/vision" component={Vision}>
        <IndexRedirect to="list" />
        <Route path="/vision/list" component={VisionList} />
        <Route path="/vision/create" component={createVision} />
        <Route path="/vision/lab" component={visionLab} />
        <Route path="/vision/:id/history" component={visionHistory} />
        <Route path="/vision/:id/content" component={visionFs} />
      </Route> 
  </Route>
)
