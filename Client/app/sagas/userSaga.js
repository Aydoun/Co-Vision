import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { reportError, cancelError } from 'actions/errorAction';
import {
  USER_LOGIN_LOADING,
  USER_REGISTER_LOADING
} from 'constants/userConstants';

import {
        authenticateUser,
        registerUser
} from 'actions/userAction';

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
    console.log('Pushing', res.data.response);
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
    yield put(registerUser(res));

    //  Regtistration Successfull
    saveUserData(res.data.response);
    console.log('Pushing');
    browserHistory.push('/app');
  } catch (err) {
    yield put(reportError(err));
  }
}

function* _userLogin() {
    yield takeLatest(USER_LOGIN_LOADING, userLogin);
}

function* _userRegister() {
    yield takeLatest(USER_REGISTER_LOADING, userRegister);
}

export default [
  fork(_userLogin),
  fork(_userRegister),
];
