import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  DISCOVER_LIST_LOADING
} from 'constants/discover';
import { getDicoverList } from 'actions/discover';
import request from 'utils/request';

function* getDiscoverList(returnedData) {
  const requestURL = `${config.apiBase}/discover`;

  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: returnedData.payload
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(getDicoverList(res));
  } catch (err) {
    console.log(err);
  }
}

function* getDiscoverListSaga() {
    yield takeLatest(DISCOVER_LIST_LOADING, getDiscoverList);
}

export default [
  fork(getDiscoverListSaga)
];
