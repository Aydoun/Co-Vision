import { call, put, takeLatest , cancel , take , fork } from 'redux-saga/effects';
import { VISION_LOADING , VISION_LIST_LOADING , SAVE_CONTRIBUTION_LOADING , DUPLICATE_VISION_ACTION } from 'constants/visionConstants';
import { visionSaved , showVisionList , saveContribution } from 'actions/visionAction';

import request from 'utils/request';


function* createVision(returnedData) {
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

function* createContribution(returnedData) {
  const requestURL = config.apiBase + '/vision/' + returnedData.id + '/contribute';

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  }

  try {
    const res = yield call(request, PostOptions);
    yield put(saveContribution(res));
  } catch (err) {
    console.log(err);
  }

}

function* listVision(returnedData) {
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

function* _saveVisionSaga() {
    yield takeLatest(VISION_LOADING, createVision);
}

function* _listVisionSaga() {
    yield takeLatest(VISION_LIST_LOADING, listVision);
}

function* _saveContribution() {
    yield takeLatest(SAVE_CONTRIBUTION_LOADING, createContribution);
}

export default [
  fork(_saveVisionSaga),
  fork(_listVisionSaga),
  fork(_saveContribution)
]
