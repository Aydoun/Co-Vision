import { call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from 'constants/courrier';
import {
  GetMessages,
  saveMessage,
  GetRequestsList,
  preRequests
} from 'actions/courrier';
import { notify } from 'actions/notif';
import request from 'utils/request';


function* getMessageList() {
  const requestURL = `${config.apiBase}/message`;
  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: {}
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(GetMessages(res));
  } catch (err) {
    console.log(err);
  }
}

function* getRequestsList() {
  const requestURL = `${config.apiBase}/invitation`;
  const GetOptions = {
    method: 'GET',
    url: requestURL,
    params: {}
  };

  try {
    const res = yield call(request, GetOptions);
    yield put(GetRequestsList(res));
  } catch (err) {
    console.log(err);
  }
}

function* sendMessage(returnedData) {
  const requestURL = `${config.apiBase}/message`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.payload
  };
  const isExternal = typeof returnedData.payload.external !== 'undefined';

  try {
    const res = yield call(request, PostOptions);
    yield put(saveMessage(res, isExternal));
    if (isExternal) {
      yield put(notify({
        status: res.data.status,
        message: 'Message Successfully Sent'
      }));
    }
  } catch (err) {
    yield put(notify({
      status: false,
      message: err.message
    }));
  }
}

function* sendRequest(returnedData) {
  const requestURL = `${config.apiBase}/invitation`;
  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(notify({
      status: res.data.status,
      message: 'Request Successfully Sent'
    }));
  } catch (err) {
    yield put(notify({
      status: false,
      message: 'Couldn\'t Send Your Request, Check Your Network Connection'
    }));
  }
}

function* answerRequest(returnedData) {
  const requestURL = `${config.apiBase}/invitation/answer`;
  const PutOptions = {
    method: 'PUT',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    yield call(request, PutOptions);
    yield put(preRequests());
  } catch (err) {
    yield put(notify({
      status: false,
      message: 'Couldn\'t Perform Action, Check Your Network Connection'
    }));
  }
}

function* messageListSaga() {
    yield takeLatest(C.MAIL_MESSAGE_LOADING, getMessageList);
}

function* sendMessageSaga() {
    yield takeLatest(C.SEND_MESSAGE, sendMessage);
}

function* requestsListSaga() {
    yield takeLatest(C.REQUEST_LIST_LOADING, getRequestsList);
}

function* sendRequestSaga() {
    yield takeLatest(C.SEND_JOIN_REQUEST, sendRequest);
}

function* answerRequestSaga() {
    yield takeLatest(C.ANSWER_JOIN_REQUEST, answerRequest);
}


export default [
  fork(messageListSaga),
  fork(sendMessageSaga),
  fork(sendRequestSaga),
  fork(requestsListSaga),
  fork(answerRequestSaga)
];
