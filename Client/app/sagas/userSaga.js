import { call, put, takeLatest , fork } from 'redux-saga/effects';
//import {reportError , cancelError} from 'actions/errorAction';
import {
  USER_LOGIN_LOADING,
  DUPLICATE_USER_ACTION
} from 'constants/userConstants';

import {
        saveUser
} from 'actions/userAction';

import request from 'utils/request';

function* userLogin(returnedData) {
  const requestURL = config.apiBase + '/contributor/login';

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  }

  try {
    const res = yield call(request, PostOptions);
    yield put(saveUser(res));
  } catch (err) {
    console.log(err);
  }
}

function* _userLogin() {
    yield takeLatest(USER_LOGIN_LOADING, userLogin);
}

export default [
  fork(_userLogin)
]
