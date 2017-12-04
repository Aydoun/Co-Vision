import { call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from 'constants/vision';
import * as A from 'actions/vision';
import { saveDiscoverLike } from 'actions/discover';
import { notify } from 'actions/notif';
import request from 'utils/request';

function* createVision(returnedData) {
  const requestURL = `${config.apiBase}/vision`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(A.visionSaved(res));
    yield put(notify({
      status: res.data.status,
      message: 'Vision Created Successfully'
    }));
    yield put(A.prepareListing({}));
  } catch (err) {
    yield put(notify({
      status: false,
      message: 'Network Error'
    }));
  }
}

function* createBranch(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.payload.id}/branch`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(notify({
      status: res.data.status,
      message: 'Draft Created Successfully'
    }));
    yield put(A.preBranch({
      id: returnedData.payload.id
    }));
  } catch (err) {
    yield put(notify({
      status: false,
      message: 'Network Error'
    }));
  }
}

function* createContribution(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.id}/contribute`;

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(A.saveContribution(res));
  } catch (err) {
    console.log(err);
  }
}

function* listVision() {
  const requestURL = `${config.apiBase}/user/vision`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: {}
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(A.showVisionList(res));
  } catch (err) {
    console.log(err);
  }
}

function* listHistory(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.payload.id}/log`;
  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.payload
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(A.showHistoryList(res));
  } catch (err) {
    console.log(err);
  }
}

// listBranch
function* listBranch(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.payload.id}/branch`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.payload
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(A.showBranchList(res));
  } catch (err) {
    console.log(err);
  }
}

function* listContent(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.payload.id}/tree`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: {
      branchName: returnedData.payload.branchName
    }
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(A.showContentList(res));
  } catch (err) {
    console.log(err);
  }
}

function* listFileContent(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.payload.id}/file`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.payload
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(A.fileContent(res));
  } catch (err) {

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
    yield put(A.showAllVisionList(res));
  } catch (err) {
    console.log(err);
  }
}

// liststats

function* liststats(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.payload.id}/summary`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(A.getVisionStats(res));
  } catch (err) {

  }
}

function* unregisterUser(returnedData) {
  const requestURL =
  `${config.apiBase}/vision/${returnedData.payload.id}/unregister`;

  const PostOptions = {
    method: 'PUT',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    yield call(request, PostOptions);
    yield put(A.prepareListing({}));
  } catch (err) {
    yield put(notify({
      status: false,
      message: 'Network Error'
    }));
  }
}

function* userLikeVision(returnedData) {
  const requestURL = `${config.apiBase}/vision/${returnedData.payload.id}/like`;

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: {}
  };
  try {
    const res = yield call(request, PostOptions);
    if (returnedData.payload.discover) {
      yield put(saveDiscoverLike(res));
    } else {
      yield put(A.saveLike(res));
    }
  } catch (err) {
    console.log(err);
  }
}


function* _saveVisionSaga() {
    yield takeLatest(C.VISION_SAVE_LOADING, createVision);
}

function* _listVisionSaga() {
    yield takeLatest(C.VISION_LIST_LOADING, listVision);
}

function* allVisionSage() {
    yield takeLatest(C.ALL_VISION_LIST_LOADING, listAllVision);
}

function* _branchList() {
    yield takeLatest(C.BRANCH_LIST_LOADING, listBranch);
}

function* _readFile() {
    yield takeLatest(C.FILE_READ_LOADING, listFileContent);
}

function* _visionHistoryList() {
    yield takeLatest(C.VISION_HISTORY_LOADING, listHistory);
}

function* _saveContribution() {
    yield takeLatest(C.SAVE_CONTRIBUTION_LOADING, createContribution);
}

function* _visionContent() {
    yield takeLatest(C.VISION_FS_LOADING, listContent);
}

function* _visionStat() {
    yield takeLatest(C.VISION_STAT_LOADING, liststats);
}

function* unregiterVision() {
  yield takeLatest(C.VISION_UNREGISTER_USER, unregisterUser);
}

function* likeVision() {
  yield takeLatest(C.VISION_USER_LIKE, userLikeVision);
}

function* createBranchSaga() {
  yield takeLatest(C.SAVE_BRANCH, createBranch);
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
  fork(likeVision),
  fork(createBranchSaga)
];
