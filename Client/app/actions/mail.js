import {
  MAIL_MESSAGE_LOADING,
  DUPLICATE_MAIL_ACTION,
  SEND_MESSAGE,
  SAVE_SENT_MESSAGE
} from 'constants/mail';

export function preMessage(params = {}) {
  return {
    type: MAIL_MESSAGE_LOADING,
    playload: params
  };
}

export function preSend(params = {}) {
  return {
    type: SEND_MESSAGE,
    playload: params
  };
}

export function GetMessages(res) {
  return {
    type: DUPLICATE_MAIL_ACTION,
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
