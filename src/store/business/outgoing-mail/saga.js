import { takeEvery, fork, put, all, call, select, takeLatest } from 'redux-saga/effects';

// Master Group Redux States
import {
  CREATE_OUTGOING_MAIL,
  SEARCH_USER,
  GET_OUTGOING_MAIL,
  GET_DETAIL_OUTGOING_MAIL
} from './actionTypes';

import {
  createOutgoingMailSuccess,
  createOutgoingMailFail,
  searchUserSuccess,
  searchUserFail,
  getOutgoingMailSuccess,
  getOutgoingMailFail,
  getDetailOutgoingMailSuccess,
  getDetailOutgoingMailFail
} from './actions';

import {
  createOutgoingMailService,
  searchUserService,
  getOutgoingMailService,
  getDetailOutgoingMailService
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

function* getOutgoingMailSaga({ payload: { request } }) {
  try {
    const response = yield call(getOutgoingMailService, request);

    yield put(getOutgoingMailSuccess(response));
  } catch (error) {
    yield put(getOutgoingMailFail(error));
  }
}

function* getDetailOutgoingMailSaga({ payload: { request } }) {
  try {
    const response = yield call(getDetailOutgoingMailService, request);

    yield put(getDetailOutgoingMailSuccess(response));
  } catch (error) {
    yield put(getDetailOutgoingMailFail(error));
  }
}

export function* watchCreateOutgoingMail() {
  yield takeEvery(CREATE_OUTGOING_MAIL, createOutgoingMailSaga)
}

export function* watchSearchUser() {
  yield takeEvery(SEARCH_USER, searchUserSaga)
}

export function* watchGetOutgoingMail() {
  yield takeLatest(GET_OUTGOING_MAIL, getOutgoingMailSaga)
}

export function* watchGetDetailOutgoingMail() {
  yield takeLatest(GET_DETAIL_OUTGOING_MAIL, getDetailOutgoingMailSaga)
}

function* OutgoingMailSaga() {
  yield all([
    fork(watchCreateOutgoingMail),
    fork(watchSearchUser),
    fork(watchGetOutgoingMail),
    fork(watchGetDetailOutgoingMail)
  ]);
}

export default OutgoingMailSaga;