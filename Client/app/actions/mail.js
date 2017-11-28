import {
  MAIL_MESSAGE_LOADING,
  DUPLICATE_MAIL_ACTION
} from 'constants/mail';

export function preMessage(params = {}) {
  return {
    type: MAIL_MESSAGE_LOADING,
    playload: params
  };
}

export function GetMessages(res) {
  return {
    type: DUPLICATE_MAIL_ACTION,
    mailList: res.data.response
  };
}
