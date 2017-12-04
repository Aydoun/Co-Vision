import { call, put, takeLatest, fork } from 'redux-saga/effects';
import * as C from 'constants/courrier';
import {
  GetMessages,
  saveMessage,
  GetRequestsList
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

  try {
    const res = yield call(request, PostOptions);
    yield put(saveMessage(res));
  } catch (err) {
    console.log(err);
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


export default [
  fork(messageListSaga),
  fork(sendMessageSaga),
  fork(sendRequestSaga),
  fork(requestsListSaga)
];
