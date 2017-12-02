import {
  MAIL_MESSAGE_LOADING,
  DUPLICATE_COURRIER_ACTION,
  SEND_MESSAGE,
  SAVE_SENT_MESSAGE,
  SEND_JOIN_REQUEST
} from 'constants/courrier';

export function preMessage(params = {}) {
  return {
    type: MAIL_MESSAGE_LOADING,
    payload: params
  };
}

export function preSend(params = {}) {
  return {
    type: SEND_MESSAGE,
    payload: params
  };
}

export function sendRequest(params = {}) {
  return {
    type: SEND_JOIN_REQUEST,
    payload: params
  };
}

export function GetMessages(res) {
  return {
    type: DUPLICATE_COURRIER_ACTION,
    mailList: res.data.response
  };
}

export function saveMessage(res) {
  const response = res.data.response;
  const lastMessage = response.messages[response.messages.length - 1];

  return {
    type: SAVE_SENT_MESSAGE,
    lastMessage,
    conversationId: response._id
  };
}
