import { call, put, takeLatest, fork } from 'redux-saga/effects';
import {
  SEND_FEEDBACK
} from 'constants/feedback';
import { notify } from 'actions/notif';
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
    yield put(notify({
      status: res.data.status,
      message: 'FeedBack Received, Thanks'
    }));
  } catch (err) {
    yield put(notify({
      status: false,
      message: 'Network Error, Check your are Connected to the Internet'
    }));
  }
}

function* sendFeedbackSaga() {
    yield takeLatest(SEND_FEEDBACK, sendFeedback);
}

export default [
  fork(sendFeedbackSaga)
];
