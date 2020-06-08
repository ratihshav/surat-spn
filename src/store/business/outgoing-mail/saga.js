import { takeEvery, fork, put, all, call, select, takeLatest } from 'redux-saga/effects';

// Master Group Redux States
import {
  CREATE_OUTGOING_MAIL,
  SEARCH_USER
} from './actionTypes';

import {
  createOutgoingMailSuccess,
  createOutgoingMailFail,
  searchUserSuccess,
  searchUserFail
} from './actions';

import {
  createOutgoingMailService,
  searchUserService
} from '../../../helpers/master/mail';


function* createOutgoingMailSaga({ payload: { request } }) {
  try {
    const response = yield call(createOutgoingMailService, request);
    yield put(createOutgoingMailSuccess(response));
  } catch (error) {
    yield put(createOutgoingMailFail(error));
  }
}

function* searchUserSaga({ payload: { request } }) {
  try {
    const response = yield call(searchUserService, request);
    yield put(searchUserSuccess(response));
  } catch (error) {
    yield put(searchUserFail(error));
  }
}

export function* watchCreateOutgoingMail() {
  yield takeEvery(CREATE_OUTGOING_MAIL, createOutgoingMailSaga)
}

export function* watchSearchUser() {
  yield takeEvery(SEARCH_USER, searchUserSaga)
}

function* OutgoingMailSaga() {
  yield all([
    fork(watchCreateOutgoingMail),
    fork(watchSearchUser)
  ]);
}

export default OutgoingMailSaga;