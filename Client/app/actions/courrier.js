import * as C from 'constants/courrier';

export function preMessage(params = {}) {
  return {
    type: C.MAIL_MESSAGE_LOADING,
    payload: params
  };
}

export function preSend(params = {}) {
  return {
    type: C.SEND_MESSAGE,
    payload: params
  };
}

export function preRequests(params = {}) {
  return {
    type: C.REQUEST_LIST_LOADING,
    payload: params
  };
}

export function sendRequest(params = {}) {
  return {
    type: C.SEND_JOIN_REQUEST,
    payload: params
  };
}

export function GetMessages(res) {
  return {
    type: C.DUPLICATE_COURRIER_ACTION,
    mailList: res.data.response
  };
}

export function GetRequestsList(res) {
  return {
    type: C.DUPLICATE_COURRIER_ACTION,
    requestList: res.data.response
  };
}

export function saveMessage(res) {
  const response = res.data.response;
  const lastMessage = response.messages[response.messages.length - 1];

  return {
    type: C.SAVE_SENT_MESSAGE,
    lastMessage,
    conversationId: response._id
  };
}
