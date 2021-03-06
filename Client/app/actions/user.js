import {
  USER_LOGIN_LOADING,
  USER_REGISTER_LOADING,
  USER_PROFILE_LOADING,
  USER_SAVE_PROFILE,
  DUPLICATE_USER_ACTION
} from 'constants/user';

export function preLogin(params) {
  return {
    type: USER_LOGIN_LOADING,
    payload : params
  };
}

export function preRegister(params) {
    return {
      type : USER_REGISTER_LOADING,
      payload : params
    };
}

export function authenticateUser(res) {
  const response = res.data.response;
  return {
    type: DUPLICATE_USER_ACTION,
    authInfo : response
  };
}

export function preUserProfile(params) {
  return {
    type: USER_PROFILE_LOADING,
    payload : params
  };
}

export function saveProfile(params) {
  return {
    type: USER_SAVE_PROFILE,
    payload : params
  };
}

export function UserProfile(res) {
  const response = res.data.response;
  return {
    type: DUPLICATE_USER_ACTION,
    profile : response
  };
}
