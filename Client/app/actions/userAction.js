import {
  USER_LOGIN_LOADING,
  DUPLICATE_USER_ACTION
} from 'constants/userConstants';

export function preLogin(params) {
  return {
    type: USER_LOGIN_LOADING,
    playload : params
  };
}

export function saveUser(res) {
  var response = res.data.response;
  return {
    type: DUPLICATE_VISION_ACTION,
    historyList : response,
  };
}
