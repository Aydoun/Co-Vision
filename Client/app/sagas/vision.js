import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { reportError, cancelError } from 'actions/error';
import {
  VISION_SAVE_LOADING,
  VISION_LIST_LOADING,
  SAVE_CONTRIBUTION_LOADING,
  VISION_HISTORY_LOADING,
  VISION_STAT_LOADING,
  BRANCH_LIST_LOADING,
  ALL_VISION_LIST_LOADING,
  FILE_READ_LOADING,
  VISION_FS_LOADING,
  VISION_UNREGISTER_USER,
  VISION_USER_LIKE
} from 'constants/vision';
import {
        visionSaved,
        showVisionList,
        saveContribution,
        showHistoryList,
        showContentList,
        showBranchList,
        showAllVisionList,
        fileContent,
        getVisionStats,
        saveLike
} from 'actions/vision';
import request from 'utils/request';

function* createVision(returnedData) {
  const requestURL = `${config.apiBase}/vision`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(visionSaved(null, res));
  } catch (err) {
    yield put(visionSaved(true, err.message));
  }
}

function* createContribution(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.id}/contribute`;

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(saveContribution(res));
  } catch (err) {
    console.log(err);
  }
}

function* listVision(returnedData) {
  const requestURL = `${config.apiBase}/user/vision`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: {}
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(showVisionList(res));
  } catch (err) {
    console.log(err);
  }
}


function* listHistory(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.playload.id}/log`;
  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.playload
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(showHistoryList(res));
  } catch (err) {
    console.log(err);
  }
}

// listBranch
function* listBranch(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.playload.id}/branch`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.playload
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(showBranchList(res));
  } catch (err) {
    console.log(err);
  }
}

function* listContent(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.playload.id}/tree`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: {
      branchName: returnedData.playload.branchName
    }
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(showContentList(res));
  } catch (err) {
    console.log(err);
  }
}

function* listFileContent(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.playload.id}/file`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.playload
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(fileContent(res));
  } catch (err) {
    yield put(reportError(err));
    yield put(cancelError());
  }
}

// list all visions

function* listAllVision() {
  const requestURL = `${config.apiBase}/vision`;
  const GetOptions = {
    method: 'GET',
    url: requestURL
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(showAllVisionList(res));
  } catch (err) {
    console.log(err);
  }
}

// liststats

function* liststats(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.playload.id}/summary`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(getVisionStats(res));
  } catch (err) {
    yield put(reportError(err));
    yield put(cancelError());
  }
}

function* unregisterUser(returnedData) {
  const requestURL =
  `${config.apiBase}/vision/${returnedData.playload.id}/unregister`;

  const PostOptions = {
    method: 'PUT',
    url: requestURL,
    data: returnedData.playload
  };

  try {
    yield call(request, PostOptions);
  } catch (err) {
    console.log(err);
  }
}

function* userLikeVision(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.playload.id}/like`;

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: {}
  };
  try {
    const res = yield call(request, PostOptions);
    yield put(saveLike(res));
  } catch (err) {
    console.log(err);
  }
}


function* _saveVisionSaga() {
    yield takeLatest(VISION_SAVE_LOADING, createVision);
}

function* _listVisionSaga() {
    yield takeLatest(VISION_LIST_LOADING, listVision);
}

function* allVisionSage() {
    yield takeLatest(ALL_VISION_LIST_LOADING, listAllVision);
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

function* _visionStat() {
    yield takeLatest(VISION_STAT_LOADING, liststats);
}

function* unregiterVision() {
  yield takeLatest(VISION_UNREGISTER_USER, unregisterUser);
}

function* likeVision() {
  yield takeLatest(VISION_USER_LIKE, userLikeVision);
}

export default [
  fork(_saveVisionSaga),
  fork(_listVisionSaga),
  fork(allVisionSage),
  fork(_visionHistoryList),
  fork(_visionContent),
  fork(_branchList),
  fork(_readFile),
  fork(_saveContribution),
  fork(_visionStat),
  fork(unregiterVision),
  fork(likeVision)
];
