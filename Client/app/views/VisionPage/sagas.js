import { call, put, takeLatest } from 'redux-saga/effects';
import { VISION_SAVED , VISION_LOADING , VISION_LIST , VISION_LIST_LOADING } from './constants';
import { visionSaved , showVisionList } from './actions';

import request from 'utils/request';


export function* createVision(returnedData) {
  const requestURL = config.apiBase + '/vision';

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  }

  try {
    const res = yield call(request, PostOptions);
    yield put(visionSaved(res));
  } catch (err) {
    console.log(err);
  }
}

export function* listVision(returnedData) {
  const requestURL = config.apiBase + '/vision';

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    //data: returnedData.playload
  }

  try {
    const res = yield call(request, GetOptions);
    yield put(showVisionList(res));
  } catch (err) {
    console.log(err);
  }
}

export function* saveVisionSaga() {
  yield takeLatest(VISION_LOADING, createVision);
}

export function* listVisionSaga() {
  yield takeLatest(VISION_LIST_LOADING, listVision);
}

// Bootstrap sagas
export default [
  saveVisionSaga,
  listVisionSaga
];
