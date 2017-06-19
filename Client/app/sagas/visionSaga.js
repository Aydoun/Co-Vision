import { call, put, takeLatest , cancel , take , fork } from 'redux-saga/effects';
import { VISION_SAVED , VISION_LOADING , VISION_LIST , VISION_LIST_LOADING } from 'constants/visionConstants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { visionSaved , showVisionList } from 'actions/visionAction';

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
    data: returnedData.playload
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

export default [
  fork(saveVisionSaga),
  fork(listVisionSaga)
]
