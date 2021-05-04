import { takeEvery, fork, put, all, call, takeLatest } from 'redux-saga/effects';

// Master Group Redux States
import {
  CREATE_OUTGOING_MAIL,
  GET_OUTGOING_MAIL,
  GET_DETAIL_OUTGOING_MAIL,
  CREATE_DISPOSE_OUTGOING_MAIL
} from './actionTypes';

import {
  createOutgoingMailSuccess,
  createOutgoingMailFail,
  getOutgoingMailSuccess,
  getOutgoingMailFail,
  getDetailOutgoingMailSuccess,
  getDetailOutgoingMailFail,
  createDisposeOutgoingMailSuccess,
  createDisposeOutgoingMailFail
} from './actions';

import {
  createOutgoingMailService,
  getOutgoingMailService,
  getDetailOutgoingMailService,
  createDisposeOutgoingMailService
} from '../../../helpers/master/outgoingMail';


function* createOutgoingMailSaga({ payload: { request } }) {
  try {
    const response = yield call(createOutgoingMailService, request);
    yield put(createOutgoingMailSuccess(response));
  } catch (error) {
    yield put(createOutgoingMailFail(error));
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

function* createDisposeOutgoingMailSaga({ payload: { request } }) {
  try {
    const response = yield call(createDisposeOutgoingMailService, request);
    yield put(createDisposeOutgoingMailSuccess(response));
  } catch (error) {
    yield put(createDisposeOutgoingMailFail(error));
  }
}

export function* watchCreateOutgoingMail() {
  yield takeEvery(CREATE_OUTGOING_MAIL, createOutgoingMailSaga)
}

export function* watchGetOutgoingMail() {
  yield takeLatest(GET_OUTGOING_MAIL, getOutgoingMailSaga)
}

export function* watchGetDetailOutgoingMail() {
  yield takeLatest(GET_DETAIL_OUTGOING_MAIL, getDetailOutgoingMailSaga)
}

export function* watchCreateDisposeOutgoingMail() {
  yield takeEvery(CREATE_DISPOSE_OUTGOING_MAIL, createDisposeOutgoingMailSaga)
}

function* OutgoingMailSaga() {
  yield all([
    fork(watchCreateOutgoingMail),
    fork(watchGetOutgoingMail),
    fork(watchGetDetailOutgoingMail),
    fork(watchCreateDisposeOutgoingMail)
  ]);
}

export default OutgoingMailSaga;