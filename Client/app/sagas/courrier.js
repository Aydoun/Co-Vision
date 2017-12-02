import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  MAIL_MESSAGE_LOADING,
  SEND_MESSAGE,
  SEND_JOIN_REQUEST
} from 'constants/courrier';
import {
  GetMessages,
  saveMessage
} from 'actions/courrier';
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
    // yield put(saveMessage(res));
  } catch (err) {
    console.log(err);
  }
}

function* messageListSaga() {
    yield takeLatest(MAIL_MESSAGE_LOADING, getMessageList);
}

function* sendMessageSaga() {
    yield takeLatest(SEND_MESSAGE, sendMessage);
}

function* sendRequestSaga() {
    yield takeLatest(SEND_JOIN_REQUEST, sendRequest);
}


export default [
  fork(messageListSaga),
  fork(sendMessageSaga),
  fork(sendRequestSaga)
];
