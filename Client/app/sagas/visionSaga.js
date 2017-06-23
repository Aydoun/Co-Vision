import { call, put, takeLatest , fork } from 'redux-saga/effects';
import {reportError , cancelError} from 'actions/errorAction';
import {
  VISION_SAVE_LOADING ,
  VISION_LIST_LOADING ,
  SAVE_CONTRIBUTION_LOADING ,
  DUPLICATE_VISION_ACTION,
  VISION_HISTORY_LOADING,
  BRANCH_LIST_LOADING,
  FILE_READ_LOADING,
  VISION_FS_LOADING
} from 'constants/visionConstants';


import {
        visionSaved,
        showVisionList,
        saveContribution,
        showHistoryList,
        showContentList,
        showBranchList,
        fileContent
} from 'actions/visionAction';

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

//listBranch

function* listBranch(returnedData) {

  const requestURL = config.apiBase + '/vision/' + returnedData.playload.id + '/branch';

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.playload
  }

  try {
    const res = yield call(request, GetOptions);
    yield put(showBranchList(res));
  } catch (err) {
    console.log(err);
  }
}

function* listContent(returnedData) {

  const requestURL = config.apiBase + '/vision/' + returnedData.playload.id + '/tree';

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.playload
  }

  try {
    const res = yield call(request, GetOptions);
    yield put(showContentList(res));
  } catch (err) {
    console.log(err);
  }
}

function* listFileContent(returnedData) {

  const requestURL = config.apiBase + '/vision/' + returnedData.playload.id + '/file';

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.playload
  }

  try {
    var res = yield call(request, GetOptions);
    yield put(fileContent(res));
  } catch (err) {
    yield put(reportError(err))
    yield put(cancelError())
  }
}

function* _saveVisionSaga() {
    yield takeLatest(VISION_SAVE_LOADING, createVision);
}

function* _listVisionSaga() {
    yield takeLatest(VISION_LIST_LOADING, listVision);
}

function* _branchList() {
    yield takeLatest(BRANCH_LIST_LOADING, listBranch);
}

function* _readFile() {
    yield takeLatest(FILE_READ_LOADING, listFileContent);
}

function* _visionHistoryList() {
    yield takeLatest(VISION_HISTORY_LOADING, listHistory);
}

function* _saveContribution() {
    yield takeLatest(SAVE_CONTRIBUTION_LOADING, createContribution);
}

function* _visionContent() {
    yield takeLatest(VISION_FS_LOADING, listContent);
}

export default [
  fork(_saveVisionSaga),
  fork(_listVisionSaga),
  fork(_visionHistoryList),
  fork(_visionContent),
  fork(_branchList),
  fork(_readFile),
  fork(_saveContribution)
]
