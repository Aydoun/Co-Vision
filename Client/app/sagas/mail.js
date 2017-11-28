import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  MAIL_MESSAGE_LOADING
} from 'constants/mail';
import {
  GetMessages
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

function* messageListSaga() {
    yield takeLatest(MAIL_MESSAGE_LOADING, getMessageList);
}

export default [
  fork(messageListSaga)
];
