import { takeEvery, fork, put, all, call, select } from 'redux-saga/effects';

// Login Redux States
import {
  LOGIN_USER,
  LOGOUT_USER
} from './actionTypes';

import {
  loginUserSuccess,
  loginUserFail,
  logoutUserSuccess,
  logoutUserFail
} from './actions';

import {
  loginUserService,
  logoutUserService
} from '../../../helpers/auth';


function* loginUser({ payload: { request } }) {
  try {
    const response = yield call(loginUserService, request);
    yield put(loginUserSuccess(response));
    this.props.history.push('/dashboard');
  } catch (error) {
    yield put(loginUserFail(error));
  }
}

function* logoutUser({ payload: { request } }) {
  try {
    const response = yield call(logoutUserService, request);
    yield put(logoutUserSuccess(response));
    this.props.history.push('/login');
  } catch (error) {
    yield put(logoutUserFail(error));
  }
}


export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
  yield all([
    fork(watchUserLogin),
    fork(watchUserLogout),
  ]);
}

export default authSaga;