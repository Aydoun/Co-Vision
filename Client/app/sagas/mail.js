import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  MAIL_MESSAGE_LOADING,
  SEND_MESSAGE
} from 'constants/mail';
import {
  GetMessages,
  saveMessage
} from 'actions/mail';
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
    data: returnedData.playload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(saveMessage(res));
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

export default [
  fork(messageListSaga),
  fork(sendMessageSaga)
];
