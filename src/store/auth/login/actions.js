import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL
} from './actionTypes';

export const loginUser = (request) => {

  return {
    type: LOGIN_USER,
    payload: { request }
  }
};

export const loginUserSuccess = response => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: response
  }
};

export const loginUserFail = error => {
  return {
    type: LOGIN_USER_FAIL,
    payload: error
  }
}

export const logoutUser = request => {
  return {
    type: LOGOUT_USER,
    payload: { request }
  }
}

export const logoutUserSuccess = response => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: response
  }
}

export const logoutUserFail = error => {
  return {
    type: LOGOUT_USER_FAIL,
    payload: error
  }
}
