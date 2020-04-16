import { takeEvery, fork, put, all, call, select, takeLatest } from 'redux-saga/effects';

// Master User Redux States
import {
  GET_MASTER_USER,
  SAVE_MASTER_USER,
  DELETE_MASTER_USER,
  UPDATE_MASTER_USER
} from './actionTypes';

import {
  getMasterUserSuccess,
  getMasterUserFail,
  saveMasterUserSuccess,
  saveMasterUserFail,
  deleteMasterUserSuccess,
  deleteMasterUserFail,
  updateMasterUserSuccess,
  updateMasterUserFail
} from './actions';

import {
  getMasterUserServices,
  saveMasterUserService,
  deleteMasterUserService,
  updateMasterUserService
} from '../../../helpers/master';

//AUTH related methods
import { getFirebaseBackend } from '../../../helpers/authUtils';


function* getMasterUserSaga({ payload }) {
  try {
    const response = yield call(getMasterUserServices, payload);
    yield put(getMasterUserSuccess(response));
  } catch (error) {
    yield put(getMasterUserFail(error));
  }
}

function* saveMasterUserSaga({ payload: { request } }) {
  try {
    const response = yield call(saveMasterUserService, request);
    yield put(saveMasterUserSuccess(response));
  } catch (error) {
    yield put(saveMasterUserFail(error));
  }
}

function* deleteMasterUserSaga({ payload: { request } }) {
  try {
    const response = yield call(deleteMasterUserService, request);
    yield put(deleteMasterUserSuccess(response));
  } catch (error) {
    yield put(deleteMasterUserFail(error));
  }
}

function* updateMasterUserSaga({ payload: { request } }) {
  try {
    const response = yield call(updateMasterUserService, request);
    yield put(updateMasterUserSuccess(response));
  } catch (error) {
    yield put(updateMasterUserFail(error));
  }
}

export function* watchGetMasterUser() {
  yield takeLatest(GET_MASTER_USER, getMasterUserSaga)
}

export function* watchSaveMasterUser() {
  yield takeEvery(SAVE_MASTER_USER, saveMasterUserSaga)
}

export function* watchDeleteMasterUser() {
  yield takeEvery(DELETE_MASTER_USER, deleteMasterUserSaga)
}

export function* watchUpdateMasterUser() {
  yield takeEvery(UPDATE_MASTER_USER, updateMasterUserSaga)
}

function* MasterUserSaga() {
  yield all([
    fork(watchGetMasterUser),
    fork(watchSaveMasterUser),
    fork(watchDeleteMasterUser),
    fork(watchUpdateMasterUser)
  ]);
}

export default MasterUserSaga;