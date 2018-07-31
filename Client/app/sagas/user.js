import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import * as C from 'constants/user';
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
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(authenticateUser(res));
    // Login Successfull
    saveUserData(res.data.response);
    browserHistory.push('/app');
  } catch (err) {
    console.log(err);
  }
}

function* userRegister(returnedData) {
  const requestURL = `${config.apiBase}/register`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(authenticateUser(res));
    //  Regtistration Successfull
    saveUserData(res.data.response);
    browserHistory.push('/app');
  } catch (err) {
    console.log(err);
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

function* saveProfile(returnedData) {
  const requestURL = `${config.apiBase}/user`;
  const PostOptions = {
    method: 'PUT',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    
  } catch (err) {
    console.log(err);
  }
}

function* _userLogin() {
    yield takeLatest(C.USER_LOGIN_LOADING, userLogin);
}

function* _userRegister() {
    yield takeLatest(C.USER_REGISTER_LOADING, userRegister);
}

function* getUserProfile() {
    yield takeLatest(C.USER_PROFILE_LOADING, getProfile);
}

function* saveProfileSaga() {
    yield takeLatest(C.USER_SAVE_PROFILE, saveProfile);
}

export default [
  fork(_userLogin),
  fork(_userRegister),
  fork(getUserProfile),
  fork(saveProfileSaga)
];
