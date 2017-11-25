import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { reportError } from 'actions/error';
import {
  USER_LOGIN_LOADING,
  USER_REGISTER_LOADING,
  USER_PROFILE_LOADING
} from 'constants/user';
import {
  authenticateUser,
  UserProfile
} from 'actions/user';
import request from 'utils/request';
import { saveUserData } from 'utils';

function* userLogin(returnedData) {
  const requestURL = `${config.apiBase}/login`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(authenticateUser(res));
    // Login Successfull
    saveUserData(res.data.response);
    browserHistory.push('/app');
  } catch (err) {
    yield put(reportError(err));
  }
}

function* userRegister(returnedData) {
  const requestURL = `${config.apiBase}/register`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.playload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(authenticateUser(res));
    //  Regtistration Successfull
    saveUserData(res.data.response);
    browserHistory.push('/app');
  } catch (err) {
    yield put(reportError(err));
  }
}

function* getProfile() {
  const requestURL = `${config.apiBase}/user`;
  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: {}
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(UserProfile(res));
  } catch (err) {
    console.log(err);
  }
}

function* _userLogin() {
    yield takeLatest(USER_LOGIN_LOADING, userLogin);
}

function* _userRegister() {
    yield takeLatest(USER_REGISTER_LOADING, userRegister);
}

function* getUserProfile() {
    yield takeLatest(USER_PROFILE_LOADING, getProfile);
}

export default [
  fork(_userLogin),
  fork(_userRegister),
  fork(getUserProfile)
];
