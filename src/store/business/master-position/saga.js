import { takeEvery, fork, put, all, call, takeLatest } from 'redux-saga/effects';

// Master Position Redux States
import {
  GET_MASTER_POSITION,
  SAVE_MASTER_POSITION,
  DELETE_MASTER_POSITION,
  UPDATE_MASTER_POSITION,
  GET_DETAIL_POSITION
} from './actionTypes';

import {
  getMasterPositionSuccess,
  getMasterPositionFail,
  saveMasterPositionSuccess,
  saveMasterPositionFail,
  deleteMasterPositionSuccess,
  deleteMasterPositionFail,
  updateMasterPositionSuccess,
  updateMasterPositionFail,
  getDetailPositionSuccess,
  getDetailPositionFail
} from './actions';

import {
  getMasterPositionServices,
  saveMasterPositionService,
  deleteMasterPositionService,
  updateMasterPositionService,
  getDetailPositionService
} from '../../../helpers/master/position';


function* getMasterPositionSaga({ payload }) {
  try {
    const response = yield call(getMasterPositionServices, payload);
    yield put(getMasterPositionSuccess(response));
  } catch (error) {
    yield put(getMasterPositionFail(error));
  }
}

function* saveMasterPositionSaga({ payload: { request } }) {
  try {
    const response = yield call(saveMasterPositionService, request);
    yield put(saveMasterPositionSuccess(response));
  } catch (error) {
    yield put(saveMasterPositionFail(error));
  }
}

function* deleteMasterPositionSaga({ payload: { request } }) {
  try {
    const response = yield call(deleteMasterPositionService, request);
    yield put(deleteMasterPositionSuccess(response));
  } catch (error) {
    yield put(deleteMasterPositionFail(error));
  }
}

function* updateMasterPositionSaga({ payload: { request } }) {
  try {
    const response = yield call(updateMasterPositionService, request);
    yield put(updateMasterPositionSuccess(response));
  } catch (error) {
    yield put(updateMasterPositionFail(error));
  }
}

function* getDetailPositionSaga({ payload: { request } }) {
  try {
    const response = yield call(getDetailPositionService, request);
    yield put(getDetailPositionSuccess(response));
  } catch (error) {
    yield put(getDetailPositionFail(error));
  }
}

export function* watchGetMasterPosition() {
  yield takeLatest(GET_MASTER_POSITION, getMasterPositionSaga)
}

export function* watchSaveMasterPosition() {
  yield takeEvery(SAVE_MASTER_POSITION, saveMasterPositionSaga)
}

export function* watchDeleteMasterPosition() {
  yield takeEvery(DELETE_MASTER_POSITION, deleteMasterPositionSaga)
}

export function* watchUpdateMasterPosition() {
  yield takeEvery(UPDATE_MASTER_POSITION, updateMasterPositionSaga)
}

export function* watchGetDetailPosition() {
  yield takeEvery(GET_DETAIL_POSITION, getDetailPositionSaga)
}

function* MasterPositionSaga() {
  yield all([
    fork(watchGetMasterPosition),
    fork(watchSaveMasterPosition),
    fork(watchDeleteMasterPosition),
    fork(watchUpdateMasterPosition),
    fork(watchGetDetailPosition)
  ]);
}

export default MasterPositionSaga;