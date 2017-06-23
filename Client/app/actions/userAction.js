import {
  USER_LOGIN_LOADING,
  USER_REGISTER_LOADING,
  DUPLICATE_USER_ACTION
} from 'constants/userConstants';
import cookie from 'js-cookie';

export function preLogin(params) {
  return {
    type: USER_LOGIN_LOADING,
    playload : params
  };
}

export function preRegister(params){
    return {
      type : USER_REGISTER_LOADING,
      playload : params
    }
}

export function authenticateUser(res) {
  var response = res.data.response;
  cookie.set('signedIn' , 1);
  cookie.set('currentUser' , response._id);

  return {
    type: DUPLICATE_USER_ACTION,
    userGeneralInfo : response,
  };
}

export function registerUser(res) {
  var response = res.data.response;
  cookie.set('signedIn' , 1);
  cookie.set('currentUser' , response._id);

  return {
    type: DUPLICATE_USER_ACTION,
    userGeneralInfo : response,
  };
}
