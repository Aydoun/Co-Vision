import { call, put, takeLatest , fork } from 'redux-saga/effects';
import {
  VISION_LOADING ,
  VISION_LIST_LOADING ,
  SAVE_CONTRIBUTION_LOADING ,
  DUPLICATE_VISION_ACTION,
  VISION_HISTORY_LOADING
} from 'constants/visionConstants';

import { visionSaved , showVisionList , saveContribution , showHistoryList } from 'actions/visionAction';

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
    params: returnedData.playload
  }

  try {
    const res = yield call(request, GetOptions);
    yield put(showVisionList(res));
  } catch (err) {
    console.log(err);
  }
}


function* listHistory(returnedData) {

  const requestURL = config.apiBase + '/vision/' + returnedData.playload.id + '/history';
  console.log(returnedData , 'returnedData');
  console.log(requestURL , 'requestURL');
  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.playload
  }

  try {
    const res = yield call(request, GetOptions);
    yield put(showHistoryList(res));
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

function* _visionHistoryList() {
    yield takeLatest(VISION_HISTORY_LOADING, listHistory);
}

function* _saveContribution() {
    yield takeLatest(SAVE_CONTRIBUTION_LOADING, createContribution);
}

export default [
  fork(_saveVisionSaga),
  fork(_listVisionSaga),
  fork(_visionHistoryList),
  fork(_saveContribution)
]
