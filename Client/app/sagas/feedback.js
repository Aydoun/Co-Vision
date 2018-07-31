import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  SEND_FEEDBACK
} from 'constants/feedback';
import request from 'utils/request';

function* sendFeedback(returnedData) {
  const requestURL = `${config.apiBase}/feedback`;

  const PostOptions = {
    method: 'POST',
    url: requestURL,
    data: returnedData.payload
  };

  try {
    const res = yield call(request, PostOptions);
    
  } catch (err) {
    console.log(err);
  }
}

function* sendFeedbackSaga() {
    yield takeLatest(SEND_FEEDBACK, sendFeedback);
}

export default [
  fork(sendFeedbackSaga)
];
