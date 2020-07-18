import { takeEvery, fork, put, all, call, takeLatest } from 'redux-saga/effects';

// Master User Redux States
import {
  GET_MASTER_USER,
  SAVE_MASTER_USER,
  DELETE_MASTER_USER,
  UPDATE_MASTER_USER,
  GET_DETAIL_USER,
  CHANGE_PASSWORD_USER,
  CHANGE_PHOTO_USER,
} from './actionTypes';

import {
  getMasterUserSuccess,
  getMasterUserFail,
  saveMasterUserSuccess,
  saveMasterUserFail,
  deleteMasterUserSuccess,
  deleteMasterUserFail,
  updateMasterUserSuccess,
  updateMasterUserFail,
  getDetailUserSuccess,
  getDetailUserFail,
  changePasswordUserSuccess,
  changePasswordUserFail,
  changePhotoUserSuccess,
  changePhotoUserFail,

} from './actions';

import {
  getMasterUserServices,
  saveMasterUserService,
  deleteMasterUserService,
  updateMasterUserService,
  getDetailUserService,
  changePasswordUserService,
  changePhotoUserService,
} from '../../../helpers/master/user';


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

function* getDetailUserSaga({ payload: { request } }) {
  try {
    const response = yield call(getDetailUserService, request);
    yield put(getDetailUserSuccess(response));
  } catch (error) {
    yield put(getDetailUserFail(error));
  }
}

function* changePasswordUserSaga({ payload: { request } }) {
  try {
    const response = yield call(changePasswordUserService, request);
    yield put(changePasswordUserSuccess(response));
  } catch (error) {
    yield put(changePasswordUserFail(error));
  }
}

function* changePhotoUserSaga({ payload: { request } }) {
  try {
    const response = yield call(changePhotoUserService, request);
    yield put(changePhotoUserSuccess(response));
  } catch (error) {
    yield put(changePhotoUserFail(error));
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

export function* watchGetDetailUser() {
  yield takeEvery(GET_DETAIL_USER, getDetailUserSaga)
}

export function* watchChangePasswordUser() {
  yield takeEvery(CHANGE_PASSWORD_USER, changePasswordUserSaga)
}

export function* watchChangePhotoUser() {
  yield takeEvery(CHANGE_PHOTO_USER, changePhotoUserSaga)
}



function* MasterUserSaga() {
  yield all([
    fork(watchGetMasterUser),
    fork(watchSaveMasterUser),
    fork(watchDeleteMasterUser),
    fork(watchUpdateMasterUser),
    fork(watchGetDetailUser),
    fork(watchChangePasswordUser),
    fork(watchChangePhotoUser),
  ]);
}

export default MasterUserSaga;