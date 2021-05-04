import { takeEvery, fork, put, call } from 'redux-saga/effects';

// Login Redux States
import {
  LOGIN_USER,
} from './actionTypes';

import {
  loginUserSuccess,
  loginUserFail,
} from './actions';

import {
  loginUserService,
} from '../../../helpers/auth';


function* loginUserSaga({ payload: { request } }) {
  try {
    const response = yield call(loginUserService, request);
    yield put(loginUserSuccess(response));
    this.props.history.push('/dashboard', 'fromLogin')
  } catch (error) {
    yield put(loginUserFail(error));
  }
}


export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUserSaga)
}


function* authSaga() {
  yield (
    fork(watchUserLogin)
  );
}

export default authSaga;