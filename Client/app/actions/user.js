import {
  USER_LOGIN_LOADING,
  USER_REGISTER_LOADING,
  USER_PROFILE_LOADING,
  DUPLICATE_USER_ACTION
} from 'constants/user';

export function preLogin(params) {
  return {
    type: USER_LOGIN_LOADING,
    playload : params
  };
}

export function preRegister(params) {
    return {
      type : USER_REGISTER_LOADING,
      playload : params
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
    playload : params
  };
}

export function UserProfile(res) {
  const response = res.data.response;
  return {
    type: DUPLICATE_USER_ACTION,
    profile : response
  };
}
