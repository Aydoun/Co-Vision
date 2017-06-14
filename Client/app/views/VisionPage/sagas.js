import { call, put, takeLatest } from 'redux-saga/effects';
import { VISION_SAVED , VISION_LOADING } from './constants';
import { visionSaved } from './actions';

import request from 'utils/request';


export function* createVision(returnedData) {
  const requestURL = config.apiBase + '/vision';

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  }

  try {
    const visionId = yield call(request, PostOptions);
    yield put(visionSaved(visionId));
  } catch (err) {
    console.log(err);
  }
}

export function* saveVision() {
  yield takeLatest(VISION_LOADING, createVision);

}

// Bootstrap sagas
export default [
  saveVision
];
