import {
  SEND_FEEDBACK
} from 'constants/feedback';

export function sendFeedback(data) {
  return {
    type: SEND_FEEDBACK,
    playload: data
  };
}
